<template>
  <v-select
    v-model='localModel'
    :label='label'
    v-bind='bindProps(schema)'
    :rules='rules(schema)'
    :class='bindClass(schema)'
    :item-title='title'
    :item-value='value'
    :items='data'
    :loading='loading'
    :return-object='returnObject as any'
  ></v-select>
</template>

<script setup lang='ts'>

import { computed } from 'vue';
import {  getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { EngineSourceField } from '../..//vocabulary/engine/controls';
import { useProps } from '../../core/composables/useProps';
import { useRules } from '../../core/composables/useRules';
import { useSource } from '../../core/composables/useSource';
import { useLabel } from '@/core/composables/useLabel';
import { useClass } from '@/core/composables/useClass';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindProps } = useProps();
const { rules } = useRules();
const { bindClass } = useClass();

const localModel = computed({
  get(): string | number {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    produceUpdateEvent(val, props.schema);
  },
});

</script>

<style scoped lang='css'>

</style>
