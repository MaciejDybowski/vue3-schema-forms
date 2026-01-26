<template>
  <div v-if="editor && !editorLoading">
    <v-input
      v-model="localModel"
      :rules="!fieldProps.readonly ? rules : []"
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
  </div>
</template>

<script lang="ts" setup>
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import { Markdown } from '@tiptap/markdown';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import TextEditorToolbar from '@/components/controls/text-editor/TextEditorToolbar.vue';

import { useFormModel, useProps, useRules } from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineTextEditorField } from '@/types/engine/controls';

const { bindRules, rules, requiredInputClass } = useRules();
const { getValue, setValue } = useFormModel();
const { bindProps, fieldProps } = useProps();
const { onChange } = useEventHandler();
const { schema, model } = defineProps<{
  schema: EngineTextEditorField;
  model: object;
}>();

const isUpdatingFromEditor = ref(false);
const editorLoading = ref(true);
const showSource = ref(false);
const sourceContent = ref('');

const contentType = schema.contentType || 'html';

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

  editorLoading.value = false;
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
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
