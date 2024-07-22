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

<script setup lang="ts">
import { parsePhoneNumber } from "libphonenumber-js";
import { computed, onMounted } from "vue";

import { EngineDataViewerField, EngineDictionaryField } from "@/types/engine/controls";

import {
  useCalculation,
  useClass,
  useDateFormat,
  useDictionarySource,
  useFormModel,
  useFormattedNumber,
  useLabel,
  useLocale,
  useResolveVariables,
} from "../../../core/composables";
import dayjs from "../date/dayjs";

const props = defineProps<{
  schema: EngineDataViewerField;
  model: object;
}>();

const { t } = useLocale();
const { label } = useLabel(props.schema);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { formatNumber } = useFormattedNumber(props.schema.options);
const { dateFormat } = useDateFormat();
const { resolve } = useResolveVariables(props.schema);

const isValueMapping = !!props.schema.valueMapping;

const localModel = computed({
  get(): string | number {
    let value = getValue(props.model, props.schema);

    if (isValueMapping) {
      const { resolvedText } = resolve(props.schema.valueMapping as string);
      value = resolvedText;
    } else {
      switch (props.schema.type) {
        case "number":
          if (!value) break;
          value = formatNumber(value);
          break;
        case "date":
          if (!value) break;
          value = dayjs(value).format(dateFormat.value);
          break;
        case "phone":
          if (!value) break;
          value = parsePhoneNumber(value).formatNational();
          break;
        default:
          console.warn("Type of data not recognized");
      }
    }

    return value !== "null" && !!value ? value : t("emptyValue");
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

function runCalculationIfExist() {
  if (props.schema.calculation) {
    localModel.value = useCalculation(props.schema.key, props.schema.calculation, props.model, props.schema.options);
  }
}

async function resolveIfDictionary() {
  if ("source" in props.schema && props.schema.source && "url" in props.schema.source) {
    const { data, load, singleOptionAutoSelect } = useDictionarySource(props.schema as EngineDictionaryField);

    await load();

    if (data.value.length === 1 && singleOptionAutoSelect) {
      localModel.value = data.value[0];
    }
  }
}

onMounted(async () => {
  runCalculationIfExist();
  await resolveIfDictionary();
});
</script>

<style scoped lang="scss">
:deep(.v-field-label--floating) {
  visibility: visible !important;
}
</style>
