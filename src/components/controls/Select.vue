<template>
  <v-select
    v-model="localModel"
    :label="label"
    v-bind="fieldProps"
    :rules="!fieldProps.readonly ? rules : []"
    :class="bindClass(schema) + requiredInputClass"
    :item-title="title"
    :item-value="value"
    :items="data"
    :loading="loading"
    :return-object="returnObject as any"
    @update:model-value="onChange(schema, model)"
    :multiple="multiple"
  ></v-select>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineSourceField } from '@/types/engine/controls';

import {
  useClass,
  useFormModel,
  useLabel,
  useProps,
  useRules,
  useSource,
} from '../../core/composables';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();
const { label, bindLabel } = useLabel(props.schema);
const { title, value, loading, data, returnObject, multiple } = useSource(props.schema.source);
const { bindProps, fieldProps } = useProps();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style scoped lang="css"></style>
