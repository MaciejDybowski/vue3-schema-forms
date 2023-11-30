import { Source } from "@/vocabulary/schema/elements";
import { ref, Ref } from "vue";
import axios from "axios";

export function useApiData(source: Source) {
  const itemText = ref(source.itemText ? source.itemText : "label");
  const itemValue = ref(source.itemValue ? source.itemValue : "value");
  const loading = ref(false);
  let data: Ref<Array<object>> = ref([]);

  if (source.items) {
    data.value = source.items;
  }

  if (source.api) {
    const execute = async () => {
      loading.value = true;
      const response = await axios.get(source.api);

      data.value = response.data;
      loading.value = false;
    };

    execute();
  }

  return { itemText, itemValue, loading, data };
}
