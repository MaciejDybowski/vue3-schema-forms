<template>
  <div :class='bindClass(schema) + "data-viewer-text d-flex flex-column"'>
    <label class='v-label v-field-label--floating'>
      {{ label }}
    </label>
    <div
      class='v-field__input'
      v-html='localModel'
    />
  </div>
</template>

<script setup lang='ts'>

import { EngineDataViewerField } from '@/vocabulary/engine/controls';
import { computed, onMounted } from 'vue';
import {
  useCalculation,
  useClass,
  useDictionarySource,
  useFormattedNumber,
  useFormModel,
  useLabel,
  useLocale,
  useResolveVariables,
} from '../../../core/composables';
import dayjs from 'dayjs';
import { parsePhoneNumber } from 'libphonenumber-js';
import { DictionarySource } from '@/vocabulary/schema/elements';

const props = defineProps<{
  schema: EngineDataViewerField;
  model: object;
}>();

const { t } = useLocale();
const { label } = useLabel(props.schema);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { formatNumber } = useFormattedNumber(props.schema.options);


const isValueMapping = !!props.schema.valueMapping;

const localModel = computed({
  get(): string | number {
    let value = getValue(props.model, props.schema);

    if (isValueMapping) {
      const { resolvedText } = useResolveVariables(props.schema.valueMapping as string, props.schema.formId, formatNumber);
      value = resolvedText;
    } else {
      switch (props.schema.type) {
        case 'number':
          value = formatNumber(value);
          break;
        case 'date':
          value = dayjs(value).tz().format('DD/MM/YYYY');
          break;
        case 'phone':
          value = parsePhoneNumber(value).formatNational();
          break;
        default:
          console.warn('Type of data not recognized');
      }
    }

    return value !== 'null' ? value : t('emptyValue');
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
  if ('source' in props.schema && 'url' in props.schema.source) {
    const {
      data,
      load,
      singleOptionAutoSelect,
    } = useDictionarySource(props.schema.source as DictionarySource, props.schema.formId, props.schema.options);

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

<style scoped lang='scss'>
:deep(.v-field-label--floating) {
  visibility: visible;
}
</style>

