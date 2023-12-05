import { Source } from '@/vocabulary/schema/elements';
import { ref, Ref } from 'vue';
import axios from 'axios';

export function useSource(source: Source) {
  const title = source.title ? source.title : 'title';
  const value = source.value ? source.value : 'value';
  const returnObject = source.returnObject ? source.returnObject : false;
  const loading = ref(false);
  let data: Ref<Array<object>> = ref([]);

  if (source.items) {
    data.value = source.items;
  }

  if (source.api) {
    const execute = async () => {
      loading.value = true;
      const response = await axios.get(source.api as string);

      data.value = response.data;
      loading.value = false;
    };

    execute();
  }

  return { title, value, loading, data, returnObject };
}
