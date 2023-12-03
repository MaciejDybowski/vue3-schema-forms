<template>
  <v-textarea
    v-model="localModel"
    :label="schema.label"
    :rules="vuetifyRules"
    v-bind="useProps(schema, 'text-area')"
    :class="bindClass(schema)"
    :hide-details="!(vuetifyRules.length > 0)"
  />
</template>

<script setup lang="ts">
import { EngineField } from "../../vocabulary/engine";
import { computed } from "vue";
import { bindClass, getValueFromModel, produceUpdateEvent } from "../../core/engine/utils";
import { useRules } from "../../core/composables/useRules";
import { useProps } from "../../core/composables/useProps";

const props = defineProps<{
  schema: EngineField,
  model: object
}>();

const localModel = computed({
  get(): string {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    produceUpdateEvent(val, props.schema);
  },
});

const vuetifyRules = useRules(props.schema);
</script>

<style scoped lang="css"></style>
