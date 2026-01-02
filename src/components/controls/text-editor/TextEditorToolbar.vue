<template>
  <v-row
    v-if="editor"
    class="d-flex editor-toolbar"
    dense
    justify="start"
  >
    <text-editor-toolbar-button
      v-for="btn in filteredButtons"
      :key="btn.name"
      :active="btn.isActive(editor, showSource)"
      :icon="btn.icon"
      :name="t(btn.name)"
      @click="btn.action(editor)"
    />
  </v-row>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import TextEditorToolbarButton from '@/components/controls/text-editor/TextEditorToolbarButton.vue';
import { computed } from "vue";

const { t } = useI18n();

const { editor, showSource, editorFeatures } = defineProps<{
  editor: any;
  showSource?: boolean;
  editorFeatures?: string[];
}>();

const buttons = [
  {
    name: 'bold',
    icon: 'format-bold',
    action: (editor: any) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: any) => editor.isActive('bold'),
  },
  {
    name: 'italic',
    icon: 'format-italic',
    action: (editor: any) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: any) => editor.isActive('italic'),
  },
  {
    name: 'strike',
    icon: 'format-strikethrough',
    action: (editor: any) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: any) => editor.isActive('strike'),
  },
  {
    name: 'heading1',
    icon: 'format-header-1',
    action: (editor: any) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: any) => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'heading2',
    icon: 'format-header-2',
    action: (editor: any) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: any) => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'heading3',
    icon: 'format-header-3',
    action: (editor: any) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: any) => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'bulletList',
    icon: 'format-list-bulleted',
    action: (editor: any) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: any) => editor.isActive('bulletList'),
  },
  {
    name: 'orderedList',
    icon: 'format-list-numbered',
    action: (editor: any) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: any) => editor.isActive('orderedList'),
  },
  {
    name: 'code',
    icon: 'code-tags',
    action: (editor: any) => editor.chain().focus().toggleCode().run(),
    isActive: (editor: any) => editor.isActive('code'),
  },
  {
    name: 'blockquote',
    icon: 'format-quote-close',
    action: (editor: any) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor: any) => editor.isActive('blockquote'),
  },
  {
    name: 'insertTable',
    icon: 'table',
    action: (editor: any) => {
      editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run();
    },
    isActive: (editor: any) => editor.isActive('table'),
  },
  {
    name: 'addColumnBefore',
    icon: 'table-column-plus-before',
    action: (editor: any) => editor.chain().focus().addColumnBefore().run(),
    isActive: () => false,
  },
  {
    name: 'addColumnAfter',
    icon: 'table-column-plus-after',
    action: (editor: any) => editor.chain().focus().addColumnAfter().run(),
    isActive: () => false,
  },
  {
    name: 'addRowBefore',
    icon: 'table-row-plus-before',
    action: (editor: any) => editor.chain().focus().addRowBefore().run(),
    isActive: () => false,
  },
  {
    name: 'addRowAfter',
    icon: 'table-row-plus-after',
    action: (editor: any) => editor.chain().focus().addRowAfter().run(),
    isActive: () => false,
  },
  {
    name: 'deleteRow',
    icon: 'table-row-remove',
    action: (editor: any) => editor.chain().focus().deleteRow().run(),
    isActive: () => false,
  },
  {
    name: 'deleteColumn',
    icon: 'table-column-remove',
    action: (editor: any) => editor.chain().focus().deleteColumn().run(),
    isActive: () => false,
  },
  {
    name: 'deleteTable',
    icon: 'table-remove',
    action: (editor: any) => editor.chain().focus().deleteTable().run(),
    isActive: () => false,
  },

  {
    name: 'source',
    icon: 'code-braces',
    action: (editor: any) => {
      editor.emit('toggle-source');
    },
    isActive: (_editor: any, showSource?: boolean) => !!showSource,
  },
];

const filteredButtons = computed(() => {
  if (editorFeatures && editorFeatures.length > 0) {
    return buttons.filter((btn) => editorFeatures!.includes(btn.name));
  }
  return buttons;
});

</script>

<style lang="scss" scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 0;
  padding: 6px 10px;
  background-color: transparent;
  color: rgb(var(--v-theme-on-surface));
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.v-theme--dark .editor-toolbar {
  border-color: rgba(var(--v-theme-outline), 0.4);
  background-color: transparent;
}
</style>

<i18n lang="json">
{
  "en": {
    "bold": "Bold",
    "italic": "Italic",
    "strike": "Strike",
    "heading1": "H1",
    "heading2": "H2",
    "heading3": "H3",
    "bulletList": "Bullet List",
    "orderedList": "Ordered List",
    "code": "Code",
    "blockquote": "Blockquote",
    "source": "Source code",
    "insertTable": "Insert table",
    "addColumnBefore": "Add column before",
    "addColumnAfter": "Add column after",
    "addRowBefore": "Add row before",
    "addRowAfter": "Add row after",
    "deleteRow": "Delete row",
    "deleteColumn": "Delete column",
    "deleteTable": "Delete table"
  },
  "pl": {
    "bold": "Pogrubienie",
    "italic": "Kursywa",
    "strike": "Przekreślenie",
    "heading1": "Nagłówek 1",
    "heading2": "Nagłówek 2",
    "heading3": "Nagłówek 3",
    "bulletList": "Lista punktowana",
    "orderedList": "Lista numerowana",
    "code": "Kod",
    "blockquote": "Cytat",
    "source": "Kod źródłowy",
    "insertTable": "Wstaw tabelę",
    "addColumnBefore": "Dodaj kolumnę przed",
    "addColumnAfter": "Dodaj kolumnę po",
    "addRowBefore": "Dodaj wiersz przed",
    "addRowAfter": "Dodaj wiersz po",
    "deleteRow": "Usuń wiersz",
    "deleteColumn": "Usuń kolumnę",
    "deleteTable": "Usuń tabelę"
  }
}
</i18n>
