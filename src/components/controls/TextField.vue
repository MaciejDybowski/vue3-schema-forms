<template>
  <div class="node-text-field">
    <v-text-field
      v-model="localModel"
      :class="bindClass(schema) + requiredInputClass"
      :label="label"
      :rules="rules"
      v-bind="fieldProps"
      @update:model-value="onChange(schema, model)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";

import { useClass, useExpression, useFormModel, useLabel, useProps, useRules } from "@/core/composables";
import { useEventHandler } from "@/core/composables/useEventHandler";
import { EngineTextField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { resolveExpression } = useExpression();
const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

async function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== "") {
    localModel.value = await  resolveExpression(props.schema.key, props.schema.expression, props.model);
  }
}

onMounted( async() => {
  bindRules(props.schema);
  await bindProps(props.schema);
  await runExpressionIfExist();
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
