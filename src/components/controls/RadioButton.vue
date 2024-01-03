<template>
  <v-radio-group
    v-model='localModel'
    :label='schema.label'
    v-bind="useProps(schema)"
    :rules='vuetifyRules'
    :class='bindClass(schema)'
    v-if='!loading'
  >
    <template
      v-for='(option, index) in data'
      :key='option[value]'
    >
      <v-radio
        v-bind="useProps(schema)"
        :value='option[value]'
        :class="index !== data.length - 1 && !vuetifyProps.inline ? 'mb-2' : ''"
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
import { bindClass, getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { useSource } from '../../core/composables/useSource';
import { useRules } from '../../core/composables/useRules';
import { useProps } from '../../core/composables/useProps';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const vuetifyProps = useProps(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);

const localModel = computed({
  get(): string | number {
    if (returnObject) {
      const obj = getValueFromModel(props.model, props.schema);
      return obj ? obj[value] : null;
    } else {
      return getValueFromModel(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const obj = data.value.filter((item) => {
        return item[value] === val;
      })[0];
      produceUpdateEvent(obj, props.schema);
    } else {
      produceUpdateEvent(val, props.schema);
    }
  },
});


const vuetifyRules = useRules(props.schema);

watch(loading, () => {
  if (data.value.length === 0) {
    console.warn(`Field ${props.schema.key} don't have any data/options/items`);
  }
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][value];
  }
});

onMounted(async () => {
  //await load();

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
