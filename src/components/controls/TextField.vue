<template>
  <div class='node-text-field'>
    <v-text-field
      v-model='localModel'
      :label='label'
      v-bind='fieldProps'
      :rules='rules(schema)'
      :class='bindClass(schema)'
      @update:model-value="onChange(schema, model)"
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';

import { useClass, useExpression, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { EngineTextField } from '@/types/engine/controls';
import { useEventHandler } from "@/core/composables/useEventHandler";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { bindClass } = useClass();
const { rules } = useRules();
const { bindProps, fieldProps } = useProps();
const { resolveExpression } = useExpression();
const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const {onChange} = useEventHandler()

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});


function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== '') {
    localModel.value = resolveExpression(props.schema.key, props.schema.expression, props.model);
  }
}

onMounted(() => {
  bindProps(props.schema);
  runExpressionIfExist();
});
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
