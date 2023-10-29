<template>
  <div class='node-text-field'>
    <v-text-field
      :id='schema.key'
      v-model='localModel'
      :label='schema.label'
      v-bind='bindProps(schema)'
      :rules='mapRules(schema.required)'
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, onUpdated } from 'vue';
import { bindProps, getValueFromModel, mapRules, produceUpdateEvent } from '@/core/engine/utils';
import { EngineTextField } from '@/vocabulary/engine/controls';
import { useCalculation } from '@/core/composables/useCalculation';

const props = defineProps<{
  schema: EngineTextField
  model: object
}>();

const localModel = computed({
  get(): string | number {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    produceUpdateEvent(val, props.schema);
  },
});

onMounted(() => {
  console.debug(`[text-field] - ${props.schema.key} => mounted`);
  if (props.schema.calculation) {
    localModel.value = useCalculation(
      props.schema.key,
      props.schema.calculation,
      props.model,
    );
  }
});

onUpdated(() => {
  console.debug(
    `[text-field] - ${props.schema.key} => updated`,
    localModel.value,
  );
});
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
