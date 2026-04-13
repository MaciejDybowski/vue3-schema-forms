<template>
  <div v-if="editor && !editorLoading">
    <v-input
      v-model="localModel"
      :rules="activeRules"
      v-bind="fieldProps"
    >
      <template #default>
        <v-row
          dense
          no-gutters
        >
          <v-col
            class="ma-0 pa-0"
            cols="12"
          >
            <text-editor-toolbar
              :editorFeatures="schema.editorFeatures"
              :editor="editor"
              :show-source="showSource"
            />
          </v-col>
          <v-col
            class="ma-0 pa-0"
            cols="12"
          >
            <v-field
              :active="!!localModel"
              :disabled="fieldProps.readonly"
              v-bind="fieldProps"
            >
              <template v-if="!showSource">
                <editor-content
                  :editor="editor"
                  class="vue-forms-text-editor"
                />
              </template>
              <template v-else>
                <textarea
                  v-model="sourceContent"
                  class="vue-forms-text-editor-source"
                  spellcheck="false"
                ></textarea>
              </template>
            </v-field>
          </v-col>
        </v-row>
      </template>
    </v-input>
    <input
      ref="imageInput"
      :accept="imageAccept"
      style="display: none"
      type="file"
      @change="onImageFileSelected"
    />
    <input
      ref="attachmentInput"
      :accept="fileAccept"
      style="display: none"
      type="file"
      @change="onAttachmentFileSelected"
    />
  </div>
</template>

<script lang="ts" setup>
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Markdown } from '@tiptap/markdown';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import axios from 'axios';

import { computed, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue';

import TextEditorToolbar from '@/components/controls/text-editor/TextEditorToolbar.vue';

import { useFormModel, useProps, useRules } from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { toast } from '@/main';
import { EngineTextEditorField } from '@/types/engine/controls';

interface UploadedFileResponse {
  fileId: string;
}

const { bindRules, rules, requiredInputClass } = useRules();
const { getValue, setValue } = useFormModel();
const { bindProps, fieldProps } = useProps();
const { onChange } = useEventHandler();
const { schema, model, validationsDisabled } = defineProps<{
  schema: EngineTextEditorField;
  model: object;
  validationsDisabled: boolean;
}>();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => validationsDisabled),
  rules,
});

const isUpdatingFromEditor = ref(false);
const editorLoading = ref(true);
const showSource = ref(false);
const sourceContent = ref('');
const imageInput = ref<HTMLInputElement | null>(null);
const attachmentInput = ref<HTMLInputElement | null>(null);

const contentType = schema.contentType || 'html';
const idReference = schema.idQueryParamName || 'id';
const uploadFileUrl =
  schema.url ||
  `/api/v1/features/{menuFeatureId}/files?dataId={dataId}&temporary=false&filePath=${schema.key}`;

const imageAccept = computed(() => extensionsToAccept(resolveAllowedExtensions(true)));
const fileAccept = computed(() => extensionsToAccept(resolveAllowedExtensions(false)));

const localModel = computed({
  get(): string | null {
    const value = getValue(model, schema);
    if (value == '' || value == undefined) {
      return null;
    }
    return value;
  },
  set(val: any) {
    if (contentType == 'html') {
      setValueForHtml(val);
    } else if (contentType == 'json') {
      setValueForJson(val);
    } else {
      setValue(val, schema);
    }
  },
});

function setValueForHtml(val: any) {
  if (val == '<p></p>') {
    setValue(null, schema);
  } else {
    setValue(val, schema);
  }
}

function setValueForJson(val: any) {
  if (
    JSON.stringify(val) ==
    JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    })
  ) {
    setValue(null, schema);
  } else {
    setValue(val, schema);
  }
}

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'vue-forms-text-editor',
    },
  },
  extensions: [
    StarterKit.configure({}),
    Link.configure({
      openOnClick: true,
    }),
    Image,
    Markdown,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  contentType: contentType,
  content: localModel.value,
  onUpdate({ editor }) {
    isUpdatingFromEditor.value = true;
    switch (contentType) {
      case 'markdown':
        localModel.value = editor.getMarkdown();
        break;
      case 'html':
        localModel.value = editor.getHTML();
        break;
      case 'json':
        localModel.value = editor.getJSON();
        break;
      default:
        console.warn(`Unknown contentType = ${contentType}`);
    }
    isUpdatingFromEditor.value = false;
  },
});

watch(
  () => localModel.value,
  (newValue) => {
    if (!isUpdatingFromEditor.value && editor.value && editor.value?.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue);
    }
    onChange(schema, model);
  },
);

onMounted(async () => {
  editorLoading.value = true;
  await bindProps(schema);
  await bindRules(schema);

  editor.value?.setEditable(!fieldProps.value.readonly);

  editor.value?.on('toggle-source' as any, () => {
    if (!showSource.value) {
      switch (contentType) {
        case 'markdown':
          sourceContent.value = editor.value?.getMarkdown() || '';
          break;
        case 'json':
          sourceContent.value = JSON.stringify(editor.value?.getJSON(), null, 2);
          break;
        default:
          sourceContent.value = editor.value?.getHTML() || '';
      }
      editor.value?.setEditable(false);
      showSource.value = true;
    } else {
      if (contentType === 'json') {
        try {
          const json = JSON.parse(sourceContent.value);
          editor.value?.commands.setContent(json);
        } catch (e) {
          console.warn('Invalid JSON');
        }
      } else if (contentType === 'markdown') {
        editor.value?.commands.setContent(sourceContent.value, {
          parseOptions: { preserveWhitespace: true },
        });
      } else {
        editor.value?.commands.setContent(sourceContent.value);
      }

      editor.value?.setEditable(!fieldProps.value.readonly);
      showSource.value = false;
    }
  });

  editor.value?.on('insert-image' as any, () => {
    if (fieldProps.value.readonly) {
      return;
    }
    imageInput.value?.click();
  });

  editor.value?.on('insert-file' as any, () => {
    if (fieldProps.value.readonly) {
      return;
    }
    attachmentInput.value?.click();
  });

  editorLoading.value = false;
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

function resolveAllowedExtensions(isImage: boolean): string[] {
  const raw = isImage
    ? schema.imageAvailableExtensions || 'png,jpg,jpeg,gif,webp,svg'
    : schema.fileAvailableExtensions || schema.options?.context?.fileAvailableExtensions || '';

  return raw
    .split(',')
    .map((ext: string) => ext.trim().toLowerCase())
    .filter(Boolean);
}

function extensionsToAccept(extensions: string[]): string {
  return extensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`)).join(',');
}

function currentEntityId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('dataId') ||
    params.get('taskId') ||
    params.get('processId') ||
    params.get(idReference)
  );
}

function resolveFeatureId(): string {
  return String(schema.options?.context?.menuFeatureId || 'unknown-feature-id');
}

function clearInputValue(input: HTMLInputElement | null) {
  if (input) {
    input.value = '';
  }
}

function extractExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

function validateSelectedFile(file: File, isImage: boolean): boolean {
  const allowedExt = resolveAllowedExtensions(isImage);
  const fileExt = extractExtension(file.name);
  if (allowedExt.length > 0 && fileExt && !allowedExt.includes(fileExt)) {
    showToastError(`Niedozwolone rozszerzenie pliku: ${fileExt}`);
    return false;
  }

  const maxFileSizeMb = schema.fileMaxSize;
  if (maxFileSizeMb && file.size > maxFileSizeMb * 1024 * 1024) {
    showToastError(`Plik przekracza maksymalny rozmiar ${maxFileSizeMb} MB`);
    return false;
  }

  return true;
}

async function uploadFile(file: File): Promise<string> {
  const entityId = currentEntityId();
  const resolvedUrl = uploadFileUrl
    .replace('{menuFeatureId}', resolveFeatureId())
    .replace('{dataId}', String(entityId || ''));

  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post<UploadedFileResponse>(resolvedUrl, formData);

  const [baseUrl, queryString] = resolvedUrl.split('?');
  return `${baseUrl}/${response.data.fileId}/content${queryString ? `?${queryString}` : ''}`;
}

function insertImageToEditor(url: string, alt: string) {
  if (!editor.value) {
    return;
  }

  switch (contentType) {
    case 'markdown':
      editor.value.chain().focus().insertContent(`![${alt}](${url})`).run();
      break;
    default:
      editor.value.chain().focus().setImage({ src: url, alt }).run();
  }
}

function insertFileToEditor(url: string, fileName: string) {
  if (!editor.value) {
    return;
  }

  switch (contentType) {
    case 'markdown':
      editor.value.chain().focus().insertContent(`[${fileName}](${url})`).run();
      break;
    default:
      editor.value
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${fileName}</a>`)
        .run();
  }
}

function showToastError(message: string) {
  if (toast != null) {
    // @ts-ignore
    toast.error(message);
  }
}

async function onImageFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  try {
    if (!validateSelectedFile(file, true)) {
      return;
    }
    const url = await uploadFile(file);
    insertImageToEditor(url, file.name);
  } catch (error: any) {
    console.error('Error uploading image:', error);
    showToastError(error?.message || 'Nie udalo sie przeslac obrazu');
  } finally {
    clearInputValue(input);
  }
}

async function onAttachmentFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  try {
    if (!validateSelectedFile(file, false)) {
      return;
    }
    const url = await uploadFile(file);
    insertFileToEditor(url, file.name);
  } catch (error: any) {
    console.error('Error uploading file:', error);
    showToastError(error?.message || 'Nie udalo sie przeslac pliku');
  } finally {
    clearInputValue(input);
  }
}
</script>

<style lang="scss" scoped>
:deep(.vue-forms-text-editor-source) {
  width: 100%;
  min-height: 176px;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: rgb(var(--v-theme-on-surface));
  white-space: pre;
  resize: none;
}

:deep(.vue-forms-text-editor) {
  width: 100%;
  min-height: 160px;
  padding: 8px 12px;

  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  font-size: 15px;
  line-height: 1.6;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  transition: all 0.25s ease;
  outline: none;

  p {
    margin: 0 0 8px;
  }

  ul,
  ol {
    margin: 8px 0 8px 16px;
  }

  h1,
  h2,
  h3 {
    margin-top: 12px;
    margin-bottom: 8px;
    font-weight: 600;
    color: rgb(var(--v-theme-primary));
  }

  code {
    background: rgba(var(--v-theme-primary), 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }

  blockquote {
    border-left: 4px solid rgb(var(--v-theme-primary));
    padding-left: 12px;
    margin: 8px 0;
    color: rgba(var(--v-theme-on-surface), 0.8);
    font-style: italic;
  }

  strong {
    font-weight: 600;
  }
}

:deep(.vue-forms-text-editor table) {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
}

:deep(.vue-forms-text-editor th),
:deep(.vue-forms-text-editor td) {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  padding: 6px 10px;
  text-align: left;
  vertical-align: middle;
}
:deep(.vue-forms-text-editor th) {
  background-color: rgba(var(--v-theme-primary), 0.05);
  font-weight: 600;
}

.v-theme--dark :deep(.vue-forms-text-editor) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;

  color: rgb(var(--v-theme-on-surface));

  code {
    background: none;
  }

  blockquote {
    border-left: none;
    color: rgba(var(--v-theme-on-surface), 0.85);
  }

  h1,
  h2,
  h3 {
    color: rgb(var(--v-theme-on-surface));
  }
}
.v-theme--dark :deep(.vue-forms-text-editor th),
.v-theme--dark :deep(.vue-forms-text-editor td) {
  border-color: rgba(var(--v-theme-on-surface), 0.15);
  background-color: transparent;
}
</style>
