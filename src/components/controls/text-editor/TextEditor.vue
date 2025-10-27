<template>
  <div v-if="editor && !editorLoading">
    <text-editor-toolbar :editor="editor" />
    <editor-content
      :editor="editor"
      class="editor-content"
    />
  </div>
</template>

<script lang="ts" setup>
import { Markdown } from '@tiptap/markdown';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import TextEditorToolbar from '@/components/controls/text-editor/TextEditorToolbar.vue';

import { useFormModel, useProps, useRules } from '@/core/composables';
import { EngineTextEditorField } from '@/types/engine/controls';

const { bindRules, rules, requiredInputClass } = useRules();
const { getValue, setValue } = useFormModel();
const { bindProps, fieldProps } = useProps();
const { schema, model } = defineProps<{
  schema: EngineTextEditorField;
  model: object;
}>();

const editorLoading = ref(true);

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
    emptyValueForHtml(val);
    emptyValueFormJSON(val);
    setValue(val, schema);
  },
});

function emptyValueForHtml(val: any) {
  if (val == '<p></p>') {
    setValue(null, schema);
    return;
  }
}

function emptyValueFormJSON(val: any) {
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
    return;
  }
}

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'vue-forms-text-editor',
    },
  },
  extensions: [StarterKit, Markdown],
  contentType: contentType,
  content: localModel.value,
  onUpdate({ editor }) {
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
  },
});

onMounted(async () => {
  editorLoading.value = true;
  await bindProps(schema);
  await bindRules(schema);

  editor.value?.setEditable(!fieldProps.value.readonly);

  editorLoading.value = false;
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss" scoped>
:deep(.vue-forms-text-editor) {
  width: 100%;
  min-height: 160px;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid var(--v-theme-outline-variant);
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
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.15);

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

.v-theme--dark :deep(.vue-forms-text-editor) {
  background-color: rgb(var(--v-theme-surface-variant));
  border-color: rgba(var(--v-theme-outline), 0.4);
  color: rgb(var(--v-theme-on-surface));

  &:hover {
    border-color: rgb(var(--v-theme-primary));
  }

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.3);
  }

  code {
    background: rgba(var(--v-theme-primary), 0.2);
  }

  blockquote {
    border-left-color: rgb(var(--v-theme-primary));
    color: rgba(var(--v-theme-on-surface), 0.85);
  }
}
</style>
