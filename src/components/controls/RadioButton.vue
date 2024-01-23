<template>
  <v-radio-group
    v-model='localModel'
    :label='label'
    v-bind='bindProps(schema)'
    :rules='rules(schema)'
    :class='bindClass(schema)'
    v-if='!loading'
  >
    <template
      v-for='(option, index) in data'
      :key='option[value]'
    >
      <v-radio
        v-bind='bindProps(schema)'
        :value='option[value]'
        :class="index !== data.length - 1 && !bindProps(schema).inline ? 'mb-2' : ''"
      >
        <template #label='{ label }'>
          <div class='mr-2'>{{ option[title] }}</div>
        </template>
      </v-radio>
    </template>
  </v-radio-group>
</template>

<script setup lang='ts'>
import { EngineSourceField } from '../../vocabulary/engine/controls';
import { computed, onMounted, watch } from 'vue';
import { useClass, useFormModel, useLabel, useProps, useRules, useSource } from '../../core/composables';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { bindProps } = useProps();
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string | number {
    if (returnObject) {
      const obj = getValue(props.model, props.schema);
      return obj ? obj[value] : null;
    } else {
      return getValue(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const obj = data.value.filter((item) => {
        return item[value] === val;
      })[0];
      setValue(obj, props.schema);
    } else {
      setValue(val, props.schema);
    }
  },
});

const { rules } = useRules();

watch(loading, () => {
  if (data.value.length === 0) {
    console.warn(`Field ${props.schema.key} don't have any data/options/items`);
  }
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][value];
  }
});

onMounted(async () => {
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][value];
  }
});
</script>

<style scoped lang='css'>
:deep(.v-label) {
  margin-inline-start: 0 !important;
}

:deep(.v-selection-control-group) {
  padding-left: 0 !important;
}
</style>
