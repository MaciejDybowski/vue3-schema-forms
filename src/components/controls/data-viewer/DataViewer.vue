<template>
  <div :class="bindClass(schema) + 'data-viewer-text d-flex flex-column'">
    <label class="v-label v-field-label--floating">
      {{ label }}
    </label>
    <div
      class="v-field__input"
      v-html="localModelForValueMapping ? localModelForValueMapping : localModel"
    />
  </div>
</template>

<script lang="ts" setup>
import { parsePhoneNumber } from "libphonenumber-js";
import { computed, onMounted, ref } from "vue";

import {
  useCalculation,
  useClass,
  useDateFormat,
  useFormModel,
  useLabel,
  useLocale,
  useResolveVariables,
} from "@/core/composables";
import { useDictionary } from "@/core/composables/useDictionary";
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
const localModelForValueMapping = ref<any>(null);
const localModel = computed({
  get(): string | number {
    let value = getValue(props.model, props.schema);

    switch (props.schema.type) {
      case "text":
        if (!value || value == "null") break;
        break;
      case "number":
        if (!value || value == "null") break;
        value = formattedNumber(
          value,
          "decimal",
          props.schema.precisionMin ? Number(props.schema.precisionMin) : 0,
          props.schema.precision ? Number(props.schema.precision) : 0,
        );
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
      //console.warn("Type of data not recognized =" + props.schema.type);
    }
    return value !== "null" && !!value ? value : t("emptyValue");
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

function formatter(value: any) {
  switch (props.schema.type) {
    case "text":
      if (!value || value == "null") break;
      break;
    case "number":
      if (!value || typeof value == "string" || value == "null") break;
      value = formattedNumber(
        value,
        "decimal",
        props.schema.precisionMin ? Number(props.schema.precisionMin) : 0,
        props.schema.precision ? Number(props.schema.precision) : 2,
      );
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

async function runCalculationIfExist() {
  if (props.schema.calculation) {
    localModel.value = await calculationFunc(props.schema, props.model);
  }
}

async function resolveIfDictionary() {
  if ("source" in props.schema && props.schema.source && "url" in props.schema.source) {
    const { data, load, singleOptionAutoSelect, initState } = await useDictionary();

    await initState(props.schema as EngineDictionaryField);
    await load("dataViewer");

    if (data.value.length === 1 && singleOptionAutoSelect.value) {
      localModel.value = data.value[0];
      setValue(localModel.value, props.schema);
    }
  }
}

if (isValueMapping) {
  const unsubscribe = vueSchemaFormEventBus.on(async (event, payloadIndex) => {
    const { resolvedText } = await resolve(props.schema, props.schema.valueMapping as string);
    if (localModel.value !== resolvedText) {
      const result = formatter(resolvedText);
      localModelForValueMapping.value = result != "null" ? result : t("emptyValue");
    }
  });
}

onMounted(async () => {
  await resolveIfDictionary();
  await bindLabel(props.schema);
  await runCalculationIfExist();
  if (isValueMapping) {
    const { resolvedText } = await resolve(props.schema, props.schema.valueMapping as string);
    const result = formatter(resolvedText);
    localModelForValueMapping.value = result != "null" ? result : t("emptyValue");
  }
});
</script>

<style lang="scss" scoped>
:deep(.v-field-label--floating) {
  visibility: visible !important;
}
</style>
