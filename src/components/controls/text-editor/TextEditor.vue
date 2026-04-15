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
import { useEventBus } from '@vueuse/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
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
  fileId: string | number;
}

interface UploadedFileResult {
  fileId: string;
  contentUrl: string;
  fileName: string;
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
const createdObjectUrls = new Set<string>();
const objectUrlToContentUrl = new Map<string, string>();
const contentUrlToObjectUrl = new Map<string, string>();
const pendingDeleteFileIds = new Set<string>();
const trackedFileIds = ref(new Set<string>());

const contentType = schema.contentType || 'html';
const idReference = schema.idQueryParamName || 'id';
const uploadFileUrl =
  schema.url || `/api/v1/features/{menuFeatureId}/files?dataId={dataId}&temporary=false`;
const actionHandlerEventBus = useEventBus<string>('form-action');

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
    let nextModelValue: any;
    switch (contentType) {
      case 'markdown':
        nextModelValue = mapBlobUrlsToContentUrlsInString(editor.getMarkdown());
        localModel.value = nextModelValue;
        break;
      case 'html':
        nextModelValue = mapBlobUrlsToContentUrlsInString(editor.getHTML());
        localModel.value = nextModelValue;
        break;
      case 'json':
        nextModelValue = mapBlobUrlsToContentUrlsInJson(editor.getJSON());
        localModel.value = nextModelValue;
        break;
      default:
        console.warn(`Unknown contentType = ${contentType}`);
    }

    if (nextModelValue != null) {
      void syncDeletedAttachments(nextModelValue);
    }

    isUpdatingFromEditor.value = false;
  },
});

watch(
  () => localModel.value,
  (newValue) => {
    if (
      !isUpdatingFromEditor.value &&
      editor.value &&
      !isEditorContentSyncedWithModel(newValue)
    ) {
      editor.value.commands.setContent(newValue);
    }
    onChange(schema, model);
  },
);

function getEditorContentMappedForModel(): any {
  if (!editor.value) {
    return null;
  }

  switch (contentType) {
    case 'markdown':
      return mapBlobUrlsToContentUrlsInString(editor.value.getMarkdown());
    case 'html':
      return mapBlobUrlsToContentUrlsInString(editor.value.getHTML());
    case 'json':
      return mapBlobUrlsToContentUrlsInJson(editor.value.getJSON());
    default:
      return editor.value.getHTML();
  }
}

function isEditorContentSyncedWithModel(modelValue: any): boolean {
  const editorMappedValue = getEditorContentMappedForModel();

  if (contentType === 'json') {
    return JSON.stringify(editorMappedValue) === JSON.stringify(modelValue);
  }

  return String(editorMappedValue ?? '') === String(modelValue ?? '');
}

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

  await rehydrateImageBlobsFromModel();
  trackedFileIds.value = extractReferencedFileIds(localModel.value);

  editorLoading.value = false;
});

onBeforeUnmount(() => {
  for (const objectUrl of createdObjectUrls) {
    URL.revokeObjectURL(objectUrl);
  }
  createdObjectUrls.clear();
  objectUrlToContentUrl.clear();
  contentUrlToObjectUrl.clear();
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
  return String(schema.options?.context?.menuFeatureId || '');
}

function refreshAttachments() {
  actionHandlerEventBus.emit('form-action', { code: 'refresh-attachments' });
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

async function uploadFile(file: File): Promise<UploadedFileResult> {
  const entityId = currentEntityId();
  const resolvedTemplate = uploadFileUrl
    .replace('{menuFeatureId}', resolveFeatureId())
    .replace('{dataId}', String(entityId || ''));

  const [baseUrl, queryString] = resolvedTemplate.split('?');
  const params = new URLSearchParams(queryString || '');
  params.set('filePath', file.name);
  const resolvedUrl = `${baseUrl}?${params.toString()}`;

  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post<UploadedFileResponse>(resolvedUrl, formData);
    const responseFileId = String(response.data.fileId);
    const contentUrl = `${baseUrl}/${encodePathSegment(responseFileId)}/content?${params.toString()}`;

    return {
      fileId: responseFileId,
      contentUrl,
      fileName: file.name,
    };
  } finally {
    refreshAttachments();
  }
}

function encodePathSegment(value: string): string {
  return encodeURIComponent(value);
}

function isPersistedImageContentUrl(value: string): boolean {
  try {
    const parsed = new URL(value, window.location.origin);
    const path = parsed.pathname;
    return path.includes('/api/v1/features/') && path.includes('/files/') && path.endsWith('/content');
  } catch (_error) {
    return false;
  }
}

function normalizeContentUrl(value: string): string {
  const parsed = new URL(value, window.location.origin);
  return `${parsed.pathname}${parsed.search}`;
}

function parseFileIdFromContentUrl(value: string): string | null {
  try {
    const parsed = new URL(value, window.location.origin);
    const match = parsed.pathname.match(/\/files\/([^/]+)\/content$/);
    if (!match?.[1]) {
      return null;
    }
    return decodeURIComponent(match[1]);
  } catch (_error) {
    return null;
  }
}

function extractPersistedFileUrlsFromHtml(html: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const values = new Set<string>();

  doc.querySelectorAll('img[src], a[href]').forEach((node) => {
    const attr = node.tagName.toLowerCase() === 'a' ? 'href' : 'src';
    const value = node.getAttribute(attr) || '';
    if (isPersistedImageContentUrl(value)) {
      values.add(normalizeContentUrl(value));
    }
  });

  return Array.from(values);
}

function extractPersistedFileUrlsFromMarkdown(markdown: string): string[] {
  const values = new Set<string>();
  const regex = /(?:!\[[^]]*]|\[[^]]*])\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match = regex.exec(markdown);

  while (match) {
    const value = match[1] || '';
    if (isPersistedImageContentUrl(value)) {
      values.add(normalizeContentUrl(value));
    }
    match = regex.exec(markdown);
  }

  return Array.from(values);
}

function extractPersistedFileUrlsFromJson(node: any, values: Set<string>) {
  if (Array.isArray(node)) {
    for (const item of node) {
      extractPersistedFileUrlsFromJson(item, values);
    }
    return;
  }

  if (!node || typeof node !== 'object') {
    return;
  }

  for (const [key, value] of Object.entries(node)) {
    const isUrlField = key === 'src' || key === 'href' || key === 'url';
    if (isUrlField && typeof value === 'string' && isPersistedImageContentUrl(value)) {
      values.add(normalizeContentUrl(value));
      continue;
    }
    extractPersistedFileUrlsFromJson(value, values);
  }
}

function extractReferencedFileIds(content: any): Set<string> {
  if (content == null) {
    return new Set<string>();
  }

  let urls: string[] = [];
  if (contentType === 'html') {
    urls = extractPersistedFileUrlsFromHtml(String(content));
  } else if (contentType === 'markdown') {
    urls = extractPersistedFileUrlsFromMarkdown(String(content));
  } else if (contentType === 'json') {
    const values = new Set<string>();
    extractPersistedFileUrlsFromJson(content, values);
    urls = Array.from(values);
  }

  const ids = new Set<string>();
  for (const url of urls) {
    const fileId = parseFileIdFromContentUrl(url);
    if (fileId) {
      ids.add(fileId);
    }
  }

  return ids;
}

async function deleteFileById(fileId: string) {
  if (!fileId || pendingDeleteFileIds.has(fileId)) {
    return;
  }

  const menuFeatureId = resolveFeatureId();
  if (!menuFeatureId) {
    throw new Error('Brak menuFeatureId dla usuwania pliku');
  }

  const dataId = currentEntityId();
  if (!dataId) {
    throw new Error('Brak dataId dla usuwania pliku');
  }

  pendingDeleteFileIds.add(fileId);
  const queryParams = new URLSearchParams();
  queryParams.set('dataId', dataId);
  const deleteUrl = `/api/v1/features/${encodePathSegment(menuFeatureId)}/files/${encodePathSegment(fileId)}?${queryParams.toString()}`;

  try {
    await axios.delete(deleteUrl);
  } finally {
    pendingDeleteFileIds.delete(fileId);
    refreshAttachments();
  }
}

async function syncDeletedAttachments(nextContent: any) {
  const nextIds = extractReferencedFileIds(nextContent);
  const removedIds = Array.from(trackedFileIds.value).filter((id) => !nextIds.has(id));

  trackedFileIds.value = nextIds;
  if (removedIds.length === 0) {
    return;
  }

  await Promise.all(
    removedIds.map(async (fileId) => {
      try {
        await deleteFileById(fileId);
      } catch (error) {
        console.error('Error deleting removed attachment:', error);
        showToastError((error as any)?.message || 'Nie udalo sie usunac pliku');
      }
    }),
  );
}

function mapBlobUrlsToContentUrlsInString(value: string): string {
  let mapped = value;
  for (const [objectUrl, contentUrl] of objectUrlToContentUrl.entries()) {
    mapped = mapped.split(objectUrl).join(contentUrl);
  }
  return mapped;
}

function mapBlobUrlsToContentUrlsInJson(node: any): any {
  if (typeof node === 'string') {
    return objectUrlToContentUrl.get(node) || node;
  }
  if (Array.isArray(node)) {
    return node.map((item) => mapBlobUrlsToContentUrlsInJson(item));
  }
  if (node && typeof node === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      result[key] = mapBlobUrlsToContentUrlsInJson(value);
    }
    return result;
  }
  return node;
}

function extractImageContentUrlsFromHtml(html: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const values = new Set<string>();
  doc.querySelectorAll('img[src]').forEach((node) => {
    const src = node.getAttribute('src') || '';
    if (isPersistedImageContentUrl(src)) {
      values.add(normalizeContentUrl(src));
    }
  });
  return Array.from(values);
}

function extractImageContentUrlsFromMarkdown(markdown: string): string[] {
  const values = new Set<string>();
  const regex = /!\[[^]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match = regex.exec(markdown);
  while (match) {
    const url = match[1] || '';
    if (isPersistedImageContentUrl(url)) {
      values.add(normalizeContentUrl(url));
    }
    match = regex.exec(markdown);
  }
  return Array.from(values);
}

function extractImageContentUrlsFromJson(node: any, values: Set<string>) {
  if (Array.isArray(node)) {
    for (const item of node) {
      extractImageContentUrlsFromJson(item, values);
    }
    return;
  }

  if (!node || typeof node !== 'object') {
    return;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'src' && typeof value === 'string' && isPersistedImageContentUrl(value)) {
      values.add(normalizeContentUrl(value));
      continue;
    }
    extractImageContentUrlsFromJson(value, values);
  }
}

function replaceImageContentUrlsInHtml(html: string, mapping: Map<string, string>): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('img[src]').forEach((node) => {
    const src = node.getAttribute('src') || '';
    if (!isPersistedImageContentUrl(src)) {
      return;
    }
    const mapped = mapping.get(normalizeContentUrl(src));
    if (mapped) {
      node.setAttribute('src', mapped);
    }
  });
  return doc.body.innerHTML;
}

function replaceImageContentUrlsInMarkdown(markdown: string, mapping: Map<string, string>): string {
  let replaced = markdown;
  for (const [contentUrl, objectUrl] of mapping.entries()) {
    replaced = replaced.split(contentUrl).join(objectUrl);
  }
  return replaced;
}

function replaceImageContentUrlsInJson(node: any, mapping: Map<string, string>): any {
  if (Array.isArray(node)) {
    return node.map((item) => replaceImageContentUrlsInJson(item, mapping));
  }
  if (node && typeof node === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === 'src' && typeof value === 'string' && isPersistedImageContentUrl(value)) {
        result[key] = mapping.get(normalizeContentUrl(value)) || value;
      } else {
        result[key] = replaceImageContentUrlsInJson(value, mapping);
      }
    }
    return result;
  }
  return node;
}

async function toBlobObjectUrl(contentUrl: string): Promise<string> {
  const normalizedUrl = normalizeContentUrl(contentUrl);
  const existing = contentUrlToObjectUrl.get(normalizedUrl);
  if (existing) {
    return existing;
  }

  let response: { data: Blob };
  try {
    response = await axios.get<Blob>(normalizedUrl, {
      responseType: 'blob',
    });
  } finally {
    refreshAttachments();
  }

  const objectUrl = URL.createObjectURL(response.data);
  createdObjectUrls.add(objectUrl);
  objectUrlToContentUrl.set(objectUrl, normalizedUrl);
  contentUrlToObjectUrl.set(normalizedUrl, objectUrl);
  return objectUrl;
}

async function rehydrateImageBlobsFromModel() {
  if (!editor.value || localModel.value == null) {
    return;
  }

  const currentContent = localModel.value as any;
  let contentUrls: string[] = [];

  if (contentType === 'html') {
    contentUrls = extractImageContentUrlsFromHtml(String(currentContent));
  } else if (contentType === 'markdown') {
    contentUrls = extractImageContentUrlsFromMarkdown(String(currentContent));
  } else if (contentType === 'json') {
    const values = new Set<string>();
    extractImageContentUrlsFromJson(currentContent, values);
    contentUrls = Array.from(values);
  }

  if (contentUrls.length === 0) {
    return;
  }

  const mapping = new Map<string, string>();
  await Promise.all(
    contentUrls.map(async (url) => {
      const objectUrl = await toBlobObjectUrl(url);
      mapping.set(normalizeContentUrl(url), objectUrl);
    }),
  );

  let hydratedContent: any = currentContent;
  if (contentType === 'html') {
    hydratedContent = replaceImageContentUrlsInHtml(String(currentContent), mapping);
  } else if (contentType === 'markdown') {
    hydratedContent = replaceImageContentUrlsInMarkdown(String(currentContent), mapping);
  } else if (contentType === 'json') {
    hydratedContent = replaceImageContentUrlsInJson(currentContent, mapping);
  }

  isUpdatingFromEditor.value = true;
  editor.value.commands.setContent(hydratedContent);
  isUpdatingFromEditor.value = false;
}

function buildFileContentUrl(fileId: string): string {
  const menuFeatureId = resolveFeatureId();
  if (!menuFeatureId) {
    throw new Error('Brak menuFeatureId dla pobierania obrazu');
  }

  const dataId = currentEntityId();
  if (!dataId) {
    throw new Error('Brak dataId dla pobierania obrazu');
  }

  const queryParams = new URLSearchParams();
  queryParams.set('dataId', dataId);

  return `/api/v1/features/${encodePathSegment(menuFeatureId)}/files/${encodePathSegment(fileId)}/content?${queryParams.toString()}`;
}

async function fetchImageBlobUrl(uploadedFile: UploadedFileResult): Promise<string> {
  if (!uploadedFile.fileId) {
    throw new Error('Brak fileId po uploadzie obrazu');
  }

  const contentUrl = buildFileContentUrl(uploadedFile.fileId);
  let response: { data: Blob };
  try {
    response = await axios.get<Blob>(contentUrl, {
      responseType: 'blob',
    });
  } finally {
    refreshAttachments();
  }

  const objectUrl = URL.createObjectURL(response.data);
  createdObjectUrls.add(objectUrl);
  objectUrlToContentUrl.set(objectUrl, contentUrl);
  contentUrlToObjectUrl.set(contentUrl, objectUrl);

  console.debug('[TextEditor] buildImagePreviewUrl', {
    fileName: uploadedFile.fileName,
    imageId: uploadedFile.fileId,
    contentUrl,
    finalUrl: objectUrl,
  });

  return objectUrl;
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
    const uploadedFile = await uploadFile(file);
    const imagePreviewUrl = await fetchImageBlobUrl(uploadedFile);
    insertImageToEditor(imagePreviewUrl, file.name);
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
    const uploadedFile = await uploadFile(file);
    insertFileToEditor(uploadedFile.contentUrl, file.name);
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
