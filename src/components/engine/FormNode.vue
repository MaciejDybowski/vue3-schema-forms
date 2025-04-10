<template>
  <v-col
    v-if="shouldRender"
    v-show="!shouldHide && shouldRender"
    :class="layoutCssClass"
    :cols="cols"
  >
    <component
      :is="`node-${schema.layout.component}`"
      :model="model"
      :schema="schema"
    />
  </v-col>
  <div
    v-if="fillRow"
    class="fill-row"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";

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

onMounted(async () => {
  await shouldRenderField(props.schema, props.model);
  await shouldHideField(props.schema, props.model);
});
</script>

<style lang="css" scoped>
.fill-row {
  flex-basis: 100%;
  height: 0;
}
</style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
