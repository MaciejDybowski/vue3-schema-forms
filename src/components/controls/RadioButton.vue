<template>
  <v-radio-group
    v-model="localModel"
    :label="schema.label"
    v-bind="vuetifyProps"
    :rules="vuetifyRules"
    :class="bindClass(schema)"
    v-if="!loading"
    :hide-details="!(vuetifyRules.length > 0)"
  >
    <template
      v-for="(option, index) in data"
      :key="option[itemValue]"
    >
      <v-radio
        v-bind="vuetifyProps"
        :value="option[itemValue]"
        :class="index !== data.length - 1 && !vuetifyProps.inline ? 'mb-2' : ''"
      >
        <template #label="{ label }">
          <div class="mr-2">{{ option[itemText] }}</div>
        </template>
      </v-radio>
    </template>
  </v-radio-group>
</template>

<script setup lang="ts">
import { EngineSourceField } from "@/vocabulary/engine/controls";
import { computed, onMounted, watch } from "vue";
import { bindClass, getValueFromModel, produceUpdateEvent } from "@/core/engine/utils";
import { useApiData } from "@/core/composables/useApiData";
import { useRules } from "@/core/composables/useRules";
import { useProps } from "@/core/composables/useProps";

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const vuetifyProps = useProps(props.schema, "radio-button");

const localModel = computed({
  get(): string | number {
    if (props.schema.source.returnObject) {
      const obj = getValueFromModel(props.model, props.schema);
      return obj ? obj[itemValue.value] : null;
    } else {
      return getValueFromModel(props.model, props.schema);
    }
  },
  set(val: any) {
    if (props.schema.source.returnObject) {
      const obj = data.value.filter((item) => {
        return item[itemValue.value] === val;
      })[0];
      produceUpdateEvent(obj, props.schema);
    } else {
      produceUpdateEvent(val, props.schema);
    }
  },
});

const { itemText, itemValue, loading, data } = useApiData(props.schema.source);
const vuetifyRules = useRules(props.schema);

watch(loading, () => {
  if (data.value.length === 0) {
    console.warn(`Field ${props.schema.key} don't have any data/options/items`);
  }
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][itemValue.value];
  }
});

onMounted(() => {
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][itemValue.value];
  }
});
</script>

<style scoped lang="css">
:deep(.v-label) {
  margin-inline-start: 0 !important;
}

:deep(.v-selection-control-group) {
  padding-left: 0 !important;
}
</style>
