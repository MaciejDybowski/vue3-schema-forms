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
import { EngineTextField } from "@/types/engine/controls";
import FormRoot from "@/components/engine/FormRoot.vue";
import { onMounted, ref } from "vue";
import set from "lodash/set";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const jsonSchemaOfGroup = ref<any>(null)

function updateModel(payload: any){
  set(props.model, payload.key, payload.value);
}

onMounted(() => {
  jsonSchemaOfGroup.value = props.schema.layout.schema;
})

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">

</i18n>
