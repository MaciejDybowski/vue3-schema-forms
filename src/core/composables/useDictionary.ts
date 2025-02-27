import axios from "axios";
import { debounce } from "lodash";
import get from "lodash/get";
import { Ref, ref, watch } from "vue";

import { Pagination } from "@/components/controls/base/Pagination";
import { mapSliceTotalElements } from "@/components/controls/base/SliceResponse";

import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { variableRegexp } from "@/core/engine/utils";
import { logger } from "@/main";
import { EngineDictionaryField } from "@/types/engine/controls";
import { ResponseReference } from "@/types/shared/ResponseReference";
import { DictionarySource } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

export function useDictionary() {
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const { resolve } = useResolveVariables();

  let source: DictionarySource = {} as DictionarySource;
  let title = ref("title");
  let value = ref("value");
  let returnObject = ref(false);
  let lazy = ref(true);
  let description = ref<any>(null)
  let paginationOptions = ref<any>(null);
  let responseReference: ResponseReference = { data: "content", totalElements: "numberOfElements" };
  let singleOptionAutoSelect = ref(true);
  let endpoint = { resolvedText: "", allVariablesResolved: false };
  let isApiContainsDependency: RegExpMatchArray | null = null;
  let loading = ref(false);
  let data: Ref<Array<object>> = ref([]);
  let query = ref("");
  let field: EngineDictionaryField = {} as EngineDictionaryField;
  let queryBlocker = ref(false);

  const debounced = {
    load: debounce(load, 300),
  };

  async function initState(fieldReference: EngineDictionaryField) {
    field = fieldReference;
    source = fieldReference.source;
    title.value = source.title ? source.title : "title";
    value.value = source.value ? source.value : "value";
    returnObject.value = source.returnObject !== undefined ? source.returnObject : true;
    lazy.value = source.lazy !== undefined ? source.lazy : true;
    description.value = source.description ? source.description : null;
    paginationOptions.value = source.itemsPerPage ? new Pagination(source.itemsPerPage) : new Pagination(20);
    responseReference = source.references
      ? source.references
      : ({ data: "content", totalElements: "numberOfElements" } as ResponseReference);
    singleOptionAutoSelect.value = source.singleOptionAutoSelect ? source.singleOptionAutoSelect : true;
    endpoint = { resolvedText: source.url, allVariablesResolved: true };
    isApiContainsDependency = source.url.match(variableRegexp);

    if (isApiContainsDependency !== null) {
      const updateEndpoint = async () => {
        const temp = await resolve(field, source.url, title.value, true);
        if (temp.resolvedText !== endpoint.resolvedText) {
          endpoint = temp;
          debounced.load("watcher");
        }
      };

      await updateEndpoint();
      vueSchemaFormEventBus.on(updateEndpoint);
    }

    if (endpoint.resolvedText.includes("query")) {
      const urlParams = new URLSearchParams(endpoint.resolvedText);
      const queryParam = urlParams.get("query");
      if (queryParam) {
        query.value = queryParam;
      }
    }
  }

  async function load(caller: string, firstElement = null) {
    endpoint = await resolve(field, source.url, title.value, true);
    if (logger.dictionaryLogger) {
      console.debug(
        `[vue-schema-forms] => Dictionary load call function = ${caller}, query=${query.value}, allVariablesResolved=${endpoint.allVariablesResolved}, endpoint=${endpoint.resolvedText}`,
      );
    }
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

      // TODO - better code block
      data.value = [];
      const newData = get(response.data, responseReference.data, []);
      if (firstElement) {
        const isDataInclude = newData.some((it) => it[value.value] == firstElement[value.value]);
        if (!isDataInclude) {
          data.value.unshift(firstElement);
        }
        const filteredData = newData.filter(
          (item) => !data.value.some((existingItem) => existingItem[value.value] === item[value.value]), // Adjust comparison logic as needed
        );

        data.value = data.value.concat(filteredData);
      } else {
        data.value = newData;
      }
      // TODO - end

      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    } else {
      if (logger.dictionaryLogger) {
        console.debug(
          `[vue-schema-forms] => API call was blocked, not every variable from endpoint was resolved ${endpoint.resolvedText}`,
        );
      }
    }
  }

  async function loadMoreRecords() {
    endpoint = await resolve(field, source.url, title.value, true);
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
      const newData = get(response.data, responseReference.data, []);
      const filteredData = newData.filter(
        (item) => !data.value.some((existingItem) => existingItem[value.value] === item[value.value]), // Adjust comparison logic as needed
      );
      data.value = data.value.concat(filteredData);
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    }
  }

  function prepareUrl() {
    let urlParts = endpoint.resolvedText.split("?");
    let urlParams = new URLSearchParams(urlParts[1]);
    if (urlParams.has("query")) {
      urlParams.delete("query");
    }

    return { url: urlParts[0], params: urlParams.toString() };
  }

  function updateQuery(newValue: any, queryBlockerValue = false) {
    query.value = newValue;
    queryBlocker.value = queryBlockerValue;
  }

  watch(query, (currentQuery, previousQuery) => {
    const queryInData =
      data.value.filter((item: any) => {
        if (returnObject) {
          return item[title.value] === currentQuery || Object.values(item).includes(currentQuery);
        } else {
          return item[title.value] == currentQuery;
        }
      }).length > 0;

    if (logger.dictionaryLogger && queryInData) {
      console.debug("Result is in data, block CALL");
    }
    !queryInData && !queryBlocker.value ? debounced.load("query") : debounced.load.cancel();
  });

  return {
    initState,
    title,
    value,
    loading,
    data,
    returnObject,
    description,
    lazy,
    paginationOptions,
    query,
    updateQuery,
    load,
    loadMoreRecords,
    singleOptionAutoSelect,
  };
}
