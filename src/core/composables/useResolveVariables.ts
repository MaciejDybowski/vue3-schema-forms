import get from 'lodash/get';

import { EngineField } from '@/types/engine/EngineField';


import { useFormattedNumber } from '../../core/composables';
import { useFormModelStore } from '../../store/formModelStore';
import { variableRegexp } from '../engine/utils';
import { useDateFormat } from './useDateFormat';
import dayjs from '@/components/controls/date/dayjs';
import { useI18n } from 'vue-i18n';


export function useResolveVariables(field: EngineField) {
  const formModelStore = useFormModelStore(field.formId);
  const { formatNumber } = useFormattedNumber(field.options);
  const { dateFormat } = useDateFormat();
  const { t, messages, locale } = useI18n();
  switch (locale.value) {
    case 'pl':
      if (messages.value['pl'] == undefined) messages.value['pl'] = {};
      messages.value['pl']['noData'] = 'Brak danych';
      break;
    case 'en':
      if (messages.value['en'] == undefined) messages.value['en'] = {};
      messages.value['en']['noData'] = 'No value';
      break;
    default:
      if (messages.value['en'] == undefined) messages.value['en'] = {};
      messages.value['en']['noData'] = 'No value';
  }

  function resolve(inputString: string, title: string = 'title') {
    let allVariablesResolved = true;

    inputString?.match(variableRegexp)?.forEach((match: string) => {
      const unwrapped = match.slice(1, -1);
      const split = unwrapped.split(':');
      const variable = split[0];
      const defaultValue = split.length === 2 ? split[1] : t('noData');

      let value = get(formModelStore.getFormModel, variable, defaultValue);

      if (typeof value === 'number') {
        value = formatNumber(value);
      }
      if (typeof value === 'string' && dayjs(value).isValid() && value.length == 10) {
        value = dayjs(value).format(dateFormat.value);
      }
      if (typeof value == 'object' && value !== null) {
        value = value[title];
      }

      if (!value) {
        allVariablesResolved = false;
      }
      inputString = inputString.replace(match, value + '');
    });

    return { resolvedText: inputString, allVariablesResolved };
  }

  return { resolve };
}
