<template>
  <v-textarea
    v-model='localModel'
    :label='schema.label'
    :rules='vuetifyRules'
    v-bind="useProps(schema, 'text-area')"
    :class='bindClass(schema)'
    :hide-details='!(vuetifyRules.length > 0)'
  />
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { bindClass, getValueFromModel, produceUpdateEvent } from '@/core/engine/utils';
import { useRules } from '@/core/composables/useRules';
import { useProps } from '@/core/composables/useProps';
import { EngineProps } from '@/vocabulary/engine/controls';

const { model, schema } = defineProps<EngineProps>();

const localModel = computed({
  get(): string {
    return getValueFromModel(model, schema);
  },
  set(val: any) {
    produceUpdateEvent(val, schema);
  },
});

const vuetifyRules = useRules(schema);
</script>

<style scoped lang='css'></style>
