<template>
  <div
    :class="'checkbox-root ' + bindClass(schema)"
    v-if="!loading"
  >
    <label class="v-label">
      {{ label }}
    </label>
    <template
      v-for="(option, index) in data"
      :key="option[value]"
    >
      <v-checkbox
        v-model="localModel"
        v-bind="bindProps(schema)"
        :rules="rules(schema)"
        :label="option[title]"
        :value="option[value]"
        :hide-details="index == data.length - 1 ? 'auto' : true"
      >
        <template #message="{ message }">
          <div class="ml-4">{{ message }}</div>
        </template>
      </v-checkbox>
    </template>
  </div>
</template>

<script setup lang="ts">
import { EngineSourceField } from "../../vocabulary/engine/controls";
import { computed } from "vue";
import { useClass, useFormModel, useLabel, useProps, useRules, useSource } from "@/core/composables";

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const { label } = useLabel(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { rules } = useRules();
const { bindProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string | number {
    if (returnObject) {
      return getValue(props.model, props.schema)?.map((item) => item[value]);
    } else {
      return getValue(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const arrayOfObj = data.value.filter((obj) => val?.includes(obj[value])).map((item) => item);
      setValue(arrayOfObj.length > 0 ? arrayOfObj : null, props.schema);
    } else {
      setValue(val.length > 0 ? val : null, props.schema);
    }
  },
});
</script>

<style scoped lang="css"></style>
