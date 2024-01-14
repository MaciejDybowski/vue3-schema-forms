<template>
  <v-textarea
    v-model='localModel'
    :label='label'
    :rules='rules(schema)'
    v-bind='bindProps(schema)'
    :class='bindClass(schema)'
  />
</template>

<script setup lang='ts'>
import { EngineField } from '../../vocabulary/engine';
import { computed } from 'vue';
import {  getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { useRules } from '../../core/composables/useRules';
import { useProps } from '../../core/composables/useProps';
import { useLabel } from '@/core/composables/useLabel';
import { useClass } from '@/core/composables/useClass';

const props = defineProps<{
  schema: EngineField,
  model: object
}>();
const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindProps } = useProps();
const { bindClass } = useClass();

const localModel = computed({
  get(): string {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    produceUpdateEvent(val, props.schema);
  },
});


</script>

<style scoped lang='css'></style>
