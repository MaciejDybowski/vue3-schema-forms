<template>
  <v-col
    v-if="shouldRender"
    v-show="!shouldHide && shouldRender"
    ref="colRef"
    :class="layoutCssClass"
    :cols="cols"
    :style="mr"
  >
    <component
      :is="`node-${schema.layout.component}`"
      :model="model"
      :schema="schema"
    />
  </v-col>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from "vue";

import { useConditionalRendering } from "@/core/composables";
import { useConditionalHide } from "@/core/composables/useConditionalHide";
import { useSchemaCols } from "@/core/composables/useSchemaCols";
import { EngineField } from "@/types/engine/EngineField";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender, shouldRenderField } = useConditionalRendering();
const { shouldHide, shouldHideField } = useConditionalHide();
const { cols, completionOfRow, isOffsetExist, offset, fillRow } = useSchemaCols(props.schema);

const layoutCssClass = computed(() => {
  let cssString = "";
  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }
  return cssString;
});

const mr = computed(() => {
  if (fillRow.value) {
    return `margin-right: ${(remainingSpace.value / 12) * 100}%!important`;
  }
});

const isLastInRow = ref(false);
const remainingSpace = ref(0);
const colRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await shouldRenderField(props.schema, props.model);
  await shouldHideField(props.schema, props.model);

  // TODO - method to refactor
  await nextTick(() => {
    if (colRef.value) {
      //@ts-ignore
      const el = colRef.value.$el as HTMLElement;
      let parentRow = el.closest(".v-row");
      if (!parentRow) return;

      let siblings = Array.from(parentRow.children) as HTMLElement[];
      let totalCols = 0;

      for (let i = 0; i < siblings.length; i++) {
        let sibling = siblings[i];
        let match = sibling.className.match(/col-(\d+)/);
        let offsetMatch = sibling.className.match(/offset-(\d+)/);
        let siblingCols = match ? parseInt(match[1]) : 0;
        let siblingOffset = offsetMatch ? parseInt(offsetMatch[1]) : 0;

        if (totalCols + siblingCols + siblingOffset > 12) {
          totalCols = 0;
        }
        totalCols += siblingCols + siblingOffset;
        if (sibling === el) {
          isLastInRow.value = totalCols === 12;
          remainingSpace.value = 12 - totalCols;
          /*console.debug(
            `Element: ${props.schema.key}, Last in row: ${isLastInRow.value}, Remaining space: ${remainingSpace.value}`,
          );*/
          break;
        }
      }
    }
  });
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
