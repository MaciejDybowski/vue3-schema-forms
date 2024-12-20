<template>
  <div :class="bindClass(schema) + 'data-viewer-text d-flex flex-column'">
    <label class="v-label v-field-label--floating">
      {{ label }}
    </label>
    <div
      class="v-field__input"
      v-html="localModel"
    />
  </div>
</template>

<script lang="ts" setup>
import { parsePhoneNumber } from "libphonenumber-js";
import { onMounted, ref, watch, watchEffect } from "vue";

import {
  useCalculation,
  useClass,
  useDateFormat,
  useDictionarySource,
  useFormModel,
  useLabel,
  useLocale,
  useResolveVariables,
} from "@/core/composables";
import { useNumber } from "@/core/composables/useNumber";
import { EngineDataViewerField, EngineDictionaryField } from "@/types/engine/controls";
import { useEventBus } from "@vueuse/core";

import dayjs from "../date/dayjs";

const props = defineProps<{
  schema: EngineDataViewerField;
  model: object;
}>();

const { t } = useLocale();
const { label, bindLabel } = useLabel(props.schema);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { formattedNumber } = useNumber();
const { dateFormat } = useDateFormat();
const { resolve } = useResolveVariables();
const { calculationFunc } = useCalculation();

const isValueMapping = !!props.schema.valueMapping;
const vueSchemaFormEventBus = useEventBus<string>("form-model");

const localModel = ref<any>(null);

watchEffect(async () => {
  let value = getValue(props.model, props.schema);

  if (isValueMapping) {
    const { resolvedText } = await resolve(props.schema, props.schema.valueMapping as string);
    value = resolvedText;
    const unsubscribe = vueSchemaFormEventBus.on(async (event, payloadIndex) => {
      const { resolvedText } = await resolve(props.schema, props.schema.valueMapping as string);
      value = resolvedText;
      value = formatter(value);
      localModel.value = value ? value : t("emptyValue");
    });
  }

  value = formatter(value);

  localModel.value = value ? value : t("emptyValue");
});

watch(localModel, async () => {

});

function formatter(value: any) {
  switch (props.schema.type) {
    case "text":
      if (!value || value == "null") break;
      break;
    case "number":
      if (!value || typeof value == "string" || value == "null") break;
      value = formattedNumber(value, "decimal", props.schema.precision ? Number(props.schema.precision) : 2);
      break;
    case "date":
      if (!value || value == "null") break;
      value = dayjs(value).format(dateFormat.value);
      break;
    case "phone":
      if (!value || value == "null") break;
      value = parsePhoneNumber(value).formatNational();
      break;
    default:
    // console.warn("Type of data not recognized =" + props.schema.type);
  }
  return value;
}

function runCalculationIfExist() {
  if (props.schema.calculation) {
    const result = calculationFunc(props.schema, props.model);
    localModel.value = formattedNumber(result as any, "decimal", props.schema.precision ? Number(props.schema.precision) : 2);
  }
}

async function resolveIfDictionary() {
  if ("source" in props.schema && props.schema.source && "url" in props.schema.source) {
    const { data, load, singleOptionAutoSelect } = await useDictionarySource(props.schema as EngineDictionaryField);

    await load("dataViewer");
    console.debug(data.value);

    if (data.value.length === 1 && singleOptionAutoSelect) {
      localModel.value = data.value[0];
    }
  }
}

onMounted(async () => {
  await resolveIfDictionary();
  await bindLabel(props.schema);
  runCalculationIfExist();
});
</script>

<style lang="scss" scoped>
:deep(.v-field-label--floating) {
  visibility: visible !important;
}
</style>
