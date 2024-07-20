<template>
  <v-btn
    :class="bindClass(schema)"
    v-bind="bindProps(schema)"
    :color="primaryWhite"
  >
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
import { useClass, useLabel, useProps } from "@/core/composables";
import { EngineField } from "@/types/engine";
import { computed } from "vue";
import { useTheme } from "vuetify";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps } = useProps();
const { label } = useLabel(props.schema);

const theme = useTheme();

const primaryWhite = computed(() => (theme.current.value.dark ? "white" : "primary"));
</script>

<style scoped lang="css"></style>
