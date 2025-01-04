<template>
  <v-col
    v-if="shouldRender"
    v-show="hideField && shouldRender"
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
import { computed, onMounted } from "vue";

import { useConditionalRendering } from "@/core/composables";
import { useSchemaCols } from "@/core/composables/useSchemaCols";
import { EngineField } from "@/types/engine/EngineField";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender, shouldRenderField } = useConditionalRendering();
const { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField } = useSchemaCols(props.schema);

const layoutCssClass = computed(() => {
  let cssString = "";

  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }

  return cssString;
});

const mr = computed(() => {
  if (fillRow.value) {
    return `margin-right: ${((12 - (offset + cols.value)) / 12) * 100}%!important`;
  }
});

onMounted(async () => {
  await shouldRenderField(props.schema, props.model);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
