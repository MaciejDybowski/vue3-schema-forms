<template>
  <div class="node-text-field">
    <v-text-field
      v-model="localModel"
      :class="bindClass(schema) + requiredInputClass"
      :label="label"
      :rules="!fieldProps.readonly ? rules : []"
      v-bind="fieldProps"
      @update:model-value="onChange(schema, model)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

import {
  useClass,
  useExpression,
  useFormModel,
  useLabel,
  useProps,
  useResolveVariables,
  useRules,
} from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { variableRegexp } from '@/core/engine/utils';
import { EngineTextField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { resolve } = useResolveVariables();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { resolveExpression } = useExpression();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const { fillPath } = useResolveVariables();

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

async function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== '') {
    const expression = fillPath(props.schema.path, props.schema.index, props.schema.expression);
    localModel.value = await resolveExpression(props.schema.key, expression, props.model);
  }
}

async function resolveIfLocalModelHasDependencies() {
  if (
    localModel.value &&
    typeof localModel.value == 'string' &&
    localModel.value.match(variableRegexp)
  ) {
    const result = await resolve(props.schema, localModel.value);
    if (result.allVariablesResolved) {
      localModel.value = result.resolvedText;
    }
  }
}

onMounted(async () => {
  await resolveIfLocalModelHasDependencies();
  await bindLabel(props.schema);
  await bindRules(props.schema);
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
