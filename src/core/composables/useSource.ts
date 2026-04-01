import axios from 'axios';

import { Ref, ref } from 'vue';

import { SimpleSource } from '@/types/shared/Source';

import { useSourceFromModelPath } from './useSourceFromModelPath';

export function useSource(source: SimpleSource) {
  const title = source.title ?? 'title';
  const value = source.value ?? 'value';
  const multiple = source.multiple ?? false;
  const returnObject = source.returnObject ?? false;
  const loading = ref(false);
  let data: Ref<Array<Record<string, any>>> = ref([]);

  if (typeof source.items === 'string') {
    const { data: modelData } = useSourceFromModelPath(source.items);
    data = modelData;
  }

  const load = async () => {
    if (typeof source.items === 'string') {
      return;
    }

    loading.value = true;

    if (Array.isArray(source.items)) {
      data.value = source.items;
    }
    if (source.url) {
      const response = await axios.get(source.url as string);
      data.value = response.data.content;
    }

    loading.value = false;
  };

  load();

  return { title, value, loading, data, returnObject, multiple };
}
