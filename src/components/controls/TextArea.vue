<template>
  <v-textarea
    v-model="localModel"
    :label="label"
    :rules="rules(schema)"
    v-bind="bindProps(schema)"
    :class="bindClass(schema)"
  />
</template>

<script setup lang="ts">
import { EngineField } from "@/types/engine";
import { computed } from "vue";
import { useClass, useFormModel, useLabel, useProps, useRules } from "../../core/composables";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});
</script>

<style scoped lang="css"></style>
