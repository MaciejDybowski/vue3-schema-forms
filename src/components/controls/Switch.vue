<template>
  <v-switch
    v-model="localModel"
    :class="bindClass(schema)"
    v-bind="bindProps(schema)"
    :color="primaryWhite"
    :label="label"
    :ref="(el) => (formSwitch[switchId] = el)"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTheme } from "vuetify";
import { VSwitch } from "vuetify/components";

import { useClass, useFormModel, useLabel, useProps } from "@/core/composables";
import { EngineField } from "@/types/engine/EngineField";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps } = useProps();
const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();

const theme = useTheme();

const primaryWhite = computed(() => (theme.current.value.dark ? "white" : "primary"));

const formSwitch = ref({});
const switchId = Math.random().toString().slice(2, 5);

const localModel = computed({
  get(): boolean {
    return getValue(props.model, props.schema);
  },
  set(val: boolean) {
    setValue(val, props.schema);
  },
});

onMounted(() => {
  if (!("default" in props.schema)) {
    console.debug(formSwitch.value[switchId].falseValue);
    let falseValue = formSwitch.value[switchId].falseValue;
    localModel.value = falseValue === undefined ? false : falseValue;
  }
});
</script>

<style scoped lang="css"></style>
