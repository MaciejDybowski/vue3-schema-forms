import axios from 'axios';

import { Ref, ref } from 'vue';

import { SimpleSource } from '@/types/shared/Source';

import { useSourceFromModelPath } from './useSourceFromModelPath';

export function useSource(source: SimpleSource | string) {
  const normalizedSource = typeof source === 'string' ? ({} as SimpleSource) : source;
  const title = normalizedSource.title ? normalizedSource.title : 'title';
  const value = normalizedSource.value ? normalizedSource.value : 'value';
  const multiple = normalizedSource.multiple ? normalizedSource.multiple : false;
  const returnObject = normalizedSource.returnObject ? normalizedSource.returnObject : false;
  const loading = ref(false);
  let data: Ref<Array<Record<string, any>>> = ref([]);

  if (typeof source === 'string') {
    const { data: modelData } = useSourceFromModelPath(source);
    data = modelData;
  }

  const load = async () => {
    if (typeof source === 'string') {
      return;
    }

    loading.value = true;

    if (normalizedSource.items) {
      data.value = normalizedSource.items;
    }
    if (normalizedSource.url) {
      const response = await axios.get(normalizedSource.url as string);
      data.value = response.data.content;
    }

    loading.value = false;
  };

  load();

  return { title, value, loading, data, returnObject, multiple };
}
