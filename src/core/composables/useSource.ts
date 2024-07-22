import { ref, Ref } from "vue";
import axios from "axios";
import { SimpleSource } from "@/types/shared/Source";

export function useSource(source: SimpleSource) {
  const title = source.title ? source.title : "title";
  const value = source.value ? source.value : "value";
  const returnObject = source.returnObject ? source.returnObject : false;
  const loading = ref(false);
  let data: Ref<Array<object>> = ref([]);

  const load = async () => {
    loading.value = true;

    if (source.items) {
      data.value = source.items;
    }
    if (source.url) {
      const response = await axios.get(source.url as string);
      data.value = response.data;
    }

    loading.value = false;
  };

  load();

  return { title, value, loading, data, returnObject };
}
