<template>
  <v-select
    v-model='localModel'
    :label='schema.label'
    v-bind="useProps(props.schema, props.model, 'select')"
    :rules='vuetifyRules'
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
import { bindClass, getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { EngineSourceField } from '../..//vocabulary/engine/controls';
import { useProps } from '../../core/composables/useProps';
import { useRules } from '../../core/composables/useRules';
import { useSource } from '../../core/composables/useSource';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();
const { title, value, loading, data, returnObject } = useSource(props.schema.source);

const vuetifyRules = useRules(props.schema);

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
