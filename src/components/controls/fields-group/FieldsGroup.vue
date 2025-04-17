<template>
  <form-root
    v-if="jsonSchemaOfGroup"
    :form-id="schema.formId"
    :model="model"
    :options="schema.options"
    :schema="jsonSchemaOfGroup"
    @update:model="updateModel"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import FormRoot from "@/components/engine/FormRoot.vue";

import { useFormModel } from "@/core/composables";
import { EngineTextField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { setValue } = useFormModel();

const jsonSchemaOfGroup = ref<any>(null);

function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: props.schema.on } as any);
}

onMounted(() => {
  jsonSchemaOfGroup.value = props.schema.layout.schema;
});
</script>

<style lang="scss" scoped></style>

<i18n lang="json"></i18n>
