<template>
  <div class="node-text-field">
    <v-text-field
      v-model="localModel"
      :label="schema.label"
      v-bind="bindProps(schema)"
      :rules="mapRules(schema.required)"
      :class="bindClass(schema)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated } from "vue"
import {
  bindClass,
  bindProps,
  getValueFromModel,
  mapRules,
  produceUpdateEvent,
} from "../../core/engine/utils"
import { EngineTextField } from "../../vocabulary/engine/controls"
import { useCalculation } from "../../core/composables/useCalculation"

const props = defineProps<{
  schema: EngineTextField
  model: object
}>()

const localModel = computed({
  get(): string | number {
    return getValueFromModel(props.model, props.schema)
  },
  set(val: any) {
    val = props.schema.type === "number" ? parseNumberType(val) : val
    produceUpdateEvent(val, props.schema)
  },
})

function parseNumberType(val: string): number | null {
  if (val) {
    const valWithDot = val.replaceAll(",", ".")
    return isNaN(parseFloat(valWithDot)) ? null : parseFloat(valWithDot)
  } else {
    return null
  }
}

const digitsAfterDecimal = computed(() => {
  return props.schema.options.digitsAfterDecimal
})

function runCalculationIfExist() {
  if (props.schema.calculation) {
    localModel.value = useCalculation(
      props.schema.key,
      props.schema.calculation,
      props.model,
      digitsAfterDecimal
    )
  }
}

onMounted(() => {
  console.debug(`[text-field] - ${props.schema.key} => mounted`)
  runCalculationIfExist()
})

onUpdated(() => {
  console.debug(
    `[text-field] - ${props.schema.key} => updated`,
    localModel.value
  )
})
</script>

<style scoped lang="css"></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
