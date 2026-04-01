import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { Ref, ref } from 'vue';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';

export function useSourceFromModelPath(path: string) {
  const form = useInjectedFormModel();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const data: Ref<Array<Record<string, any>>> = ref([]);

  function loadFromModel() {
    const options = get(form.getFormModel.value, path, []);
    data.value = Array.isArray(options) ? options : [];
  }

  loadFromModel();
  vueSchemaFormEventBus.on(() => loadFromModel());

  return { data, loadFromModel };
}

