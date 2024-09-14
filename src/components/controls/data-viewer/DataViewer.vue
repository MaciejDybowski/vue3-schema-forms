<template>
  <div :class="bindClass(schema) + 'data-viewer-text d-flex flex-column'">
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
import { parsePhoneNumber } from 'libphonenumber-js';
import { computed, onMounted } from 'vue';

import { EngineDataViewerField, EngineDictionaryField } from '@/types/engine/controls';

import {
  useCalculation,
  useClass,
  useDateFormat,
  useDictionarySource,
  useFormModel,
  useLabel,
  useLocale,
  useResolveVariables,
} from '../../../core/composables';
import dayjs from '../date/dayjs';
import { useNumber } from '@/core/composables/useNumber';

const props = defineProps<{
  schema: EngineDataViewerField;
  model: object;
}>();

const { t } = useLocale();
const { label } = useLabel(props.schema);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { formattedNumber } = useNumber();
const { dateFormat } = useDateFormat();
const { resolve } = useResolveVariables();
const { calculationFunc } = useCalculation();

const isValueMapping = !!props.schema.valueMapping;

const localModel = computed({
  get(): string | number {
    let value = getValue(props.model, props.schema);

    if (isValueMapping) {
      const { resolvedText } = resolve(props.schema, props.schema.valueMapping as string);
      value = resolvedText;
    } else {
      switch (props.schema.type) {
        case 'text':
          if (!value) break;
          break;
        case 'number':
          if (!value) break;
          value = formattedNumber(value, 'decimal', props.schema.precision ? Number(props.schema.precision) : 2);
          break;
        case 'date':
          if (!value) break;
          value = dayjs(value).format(dateFormat.value);
          break;
        case 'phone':
          if (!value) break;
          value = parsePhoneNumber(value).formatNational();
          break;
        default:
          console.warn('Type of data not recognized');
      }
    }

    return value !== 'null' && !!value ? value : t('emptyValue');
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

function runCalculationIfExist() {
  if (props.schema.calculation) {
    localModel.value = calculationFunc(props.schema, props.model);
  }
}

async function resolveIfDictionary() {
  if ('source' in props.schema && props.schema.source && 'url' in props.schema.source) {
    const { data, load, singleOptionAutoSelect } = useDictionarySource(props.schema as EngineDictionaryField);

    await load('dataViewer');

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
  visibility: visible !important;
}
</style>
