<template>
  <v-row class="form-root">
    <form-node
      v-for="node in nodes"
      :key="node.key"
      :model="model"
      :schema="node"
    ></form-node>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { EngineField } from "@/types/engine/EngineField";
import { EngineOptions } from "@/types/engine/EngineOptions";
import { NodeUpdateEvent } from "@/types/engine/NodeUpdateEvent";
import { Schema } from "@/types/schema/Schema";
import { SchemaField } from "@/types/schema/SchemaField";
import { SchemaOptions } from "@/types/schema/SchemaOptions";

import { useResolveDependency } from "../../core/composables/useResolveDependency";
import { variableRegexp } from "../../core/engine/utils";
import FormNode from "./FormNode.vue";

const { locale, t } = useI18n();

let nodes = ref([] as Array<EngineField>);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
  formId: string;
}>();

const emit = defineEmits<{
  (e: "update:model", val: any): void;
}>();

function objectToArray(obj: Schema, prefix = ""): Array<EngineField> {
  const result: Array<EngineField> = [];

  for (const key in obj.properties) {
    const property: SchemaField = obj.properties[key];
    const newKey: string = prefix ? `${prefix}.${key}` : key;
    if (property.properties) {
      const nestedProperties = objectToArray(property as unknown as Schema, newKey);
      result.push(...nestedProperties);
    } else {
      result.push({
        formId: props.formId,
        key: newKey,
        ...property,
        on: {
          input: (e: NodeUpdateEvent) => input(e),
        },
        options: props.options as EngineOptions,
        required: obj.required?.includes(key),
      } as EngineField);
    }
  }
  return result;
}

function input(event: NodeUpdateEvent) {
  emit("update:model", event);
}

onMounted(() => {
  if (typeof props.options?.digitsAfterDecimal === "string" && variableRegexp.test(props.options.digitsAfterDecimal)) {
    useResolveDependency("digitsAfterDecimal", props.options.digitsAfterDecimal.slice(1, -1), props.model, props.options);
  }

  nodes.value.push(...objectToArray(props.schema));
});
</script>

<style scoped lang="scss"></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
