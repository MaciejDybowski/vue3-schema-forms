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
import { useFormModel } from "@/core/composables";
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const vueSchemaFormEventBus = useEventBus<string>("form-model");
const { getValue, setValue } = useFormModel();

const jsonSchemaOfGroup = ref<any>(null)

function updateModel(payload: any){
  set(props.model, payload.key, payload.value);
  vueSchemaFormEventBus.emit("model-changed", null);

  // TODO jak zaktualizować pole wyżej skoro to tylko grupa wizualna, chyba trzeba to przerobic w properties ;)
  //setValue(payload.value, props.schema)
}

onMounted(() => {
  jsonSchemaOfGroup.value = props.schema.layout.schema;
})

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">

</i18n>
