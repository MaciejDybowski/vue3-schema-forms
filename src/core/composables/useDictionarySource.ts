import { DictionarySource, ResponseReference } from "@/types/schema/elements";

import { Pagination } from "../../components/controls/base/Pagination";
import axios from "axios";
import { Ref, ref, watch } from "vue";
import { mapSliceTotalElements } from "../../components/controls/base/SliceResponse";
import { debounce } from "lodash";
import get from "lodash/get";
import { variableRegexp } from "../../core/engine/utils";
import { useFormModelStore } from "../../store/formModelStore";
import { useResolveVariables } from "./useResolveVariables";
import { EngineDictionaryField } from "@/types/engine/controls";

export function useDictionarySource(field: EngineDictionaryField) {
  const { resolve } = useResolveVariables(field);
  const source: DictionarySource = field.source;
  const title = source.title ? source.title : "title";
  const value = source.value ? source.value : "value";
  const returnObject = source.returnObject !== undefined ? source.returnObject : true;
  const loading = ref(false);
  let data: Ref<Array<object>> = ref([]);
  let firstLoad = ref(true);

  // dictionary options
  const lazy = ref(source.lazy !== undefined ? source.lazy : true);
  const description = source.description ? source.description : null;
  const paginationOptions = ref(source.itemsPerPage ? new Pagination(source.itemsPerPage) : new Pagination(20));
  const responseReference: ResponseReference = source.references
    ? source.references
    : ({ data: "content", totalElements: "numberOfElements" } as ResponseReference);
  const singleOptionAutoSelect = source.singleOptionAutoSelect ? source.singleOptionAutoSelect : false;

  let endpoint = { resolvedText: source.url, allVariablesResolved: true }; // default wrapper object

  const isApiContainsDependency = source.url.match(variableRegexp);
  if (isApiContainsDependency !== null) {
    endpoint = resolve(source.url);

    const formModelStore = useFormModelStore(field.formId);
    formModelStore.$subscribe(() => {
      const temp = resolve(source.url);
      if (temp.resolvedText !== endpoint.resolvedText) {
        endpoint = temp;
        debounced.load();
      }
    });
  }

  /*
    User search support.
    queryInData prevents the http request from being executed when the select/autocomplete/combobox model is selected
    Example:
    1. user was searching currency "dollar".
    2. he selected US dollar.
    3. request query = US dollar will not execute.
   */
  let query = ref("");
  watch(query, (value, oldValue) => {
    if (value || (value === null && oldValue)) {
      const queryInData =
        data.value.filter((item: any) => {
          return item[title] === value || Object.values(item).includes(value);
        }).length > 0;
      queryInData ? debounced.load.cancel() : debounced.load();
    }
  });

  const load = async () => {
    if (endpoint.allVariablesResolved) {
      loading.value = true;
      paginationOptions.value.resetPage();
      const { url, params } = prepareUrl();
      const response = await axios.get(`${url}?${params}`, {
        params: lazy.value
          ? {
              page: paginationOptions.value.getPage(),
              size: paginationOptions.value.getItemsPerPage(),
              query: query.value ? query.value : null,
            }
          : {
              query: query.value ? query.value : null,
            },
      });

      data.value = get(response.data, responseReference.data, []);
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    } else {
      console.debug(`API call was blocked, not every variable from endpoint was resolved ${endpoint.resolvedText}`);
    }
  };
  const loadMoreRecords = async () => {
    if (endpoint.allVariablesResolved) {
      loading.value = true;
      const { url, params } = prepareUrl();
      const response = await axios.get(`${url}?${params}`, {
        params: {
          page: paginationOptions.value.getPage() + 1,
          size: paginationOptions.value.getItemsPerPage(),
          query: query.value ? query.value : null,
        },
      });
      paginationOptions.value.nextPage();
      data.value = data.value.concat(get(response.data, responseReference.data, []));
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    }
  };

  const debounced = {
    load: debounce(load, 600),
  };

  function prepareUrl() {
    let urlParts = endpoint.resolvedText.split("?");
    let urlParams = new URLSearchParams(urlParts[1]);
    if (urlParams.has("query")) {
      if (firstLoad.value) {
        query.value = urlParams.get("query") as string;
        firstLoad.value = false;
      }
      urlParams.delete("query");
    }

    return { url: urlParts[0], params: urlParams.toString() };
  }

  return {
    title,
    value,
    loading,
    data,
    returnObject,
    description,
    lazy,
    paginationOptions,
    query,
    load,
    loadMoreRecords,
    singleOptionAutoSelect,
  };
}
