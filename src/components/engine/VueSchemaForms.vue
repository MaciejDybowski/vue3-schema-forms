<template>
  <div
    class="aurea-from"
    ref="el"
  >
    <form-root
      v-if="!loading"
      :model="modelValue"
      :schema="resolvedSchema"
      :options="options"
      @update:model="updateModel"
    />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from "vue"

import FormRoot from "./FormRoot.vue"
import { Schema, SchemaOptions } from "../../vocabulary/schema"
import set from "lodash/set"
import { useI18n } from "vue-i18n"
import { resolveSchemaWithLocale } from "../../core/engine/utils"
import { NodeUpdateEvent } from "../../vocabulary/engine"
import TextField from "../controls/TextField.vue"
import DuplicatedSection from "../controls/duplicated-section/DuplicatedSection.vue"
import usePerformanceAPI from "../../core/composables/usePerformanceAPI"
import StaticContent from "../controls/StaticContent.vue"

// register components to VueInstance
const components = {
  "text-field": TextField,
  "duplicated-section": DuplicatedSection,
  "static-content": StaticContent,
}
const instance = getCurrentInstance()
for (const [name, comp] of Object.entries(components)) {
  if (!instance?.appContext.app.component(`node-${name}`)) {
    instance?.appContext.app.component(`node-${name}`, comp)
  }
}
// end register-components

const props = defineProps<{
  schema: Schema
  modelValue: object
  options?: SchemaOptions
}>()

const emit = defineEmits<{
  (e: "update:modelValue", val: any): void
}>()

let loading = ref(true)
const { locale, t } = useI18n()
const resolvedSchema = ref({} as Schema)
const { result } = usePerformanceAPI()

function updateModel(event: NodeUpdateEvent) {
  set(props.modelValue, event.key, event.value)
  emit("update:modelValue", props.modelValue)
}

async function loadResolvedSchema() {
  loading.value = true
  resolvedSchema.value = await resolveSchemaWithLocale(
    props.schema,
    locale.value
  )
  loading.value = false
}

watch(
  locale,
  async () => {
    console.debug("[vue-schema-forms] => Reload form in other language")
    await loadResolvedSchema()
  },
  { deep: true }
)
onMounted(async () => {
  console.debug("[vue-schema-forms] => mounted")
  await loadResolvedSchema()
})
</script>

<style lang="scss">
.required-input .v-label::after {
  content: " *";
  color: rgb(var(--v-theme-error));
}
</style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
