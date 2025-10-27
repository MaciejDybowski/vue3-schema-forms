<template>
  <v-row
    v-if="editor"
    class="d-flex editor-toolbar"
    dense
    justify="start"
  >
    <text-editor-toolbar-button
      v-for="btn in buttons"
      :key="btn.name"
      :active="btn.isActive(editor)"
      :icon="btn.icon"
      :name="t(btn.name)"
      @click="btn.action(editor)"
    />
  </v-row>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import TextEditorToolbarButton from '@/components/controls/text-editor/TextEditorToolbarButton.vue';

const { t } = useI18n();

const { editor } = defineProps<{
  editor: any;
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
];
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
    "blockquote": "Blockquote"
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
    "blockquote": "Cytat"
  }
}
</i18n>
