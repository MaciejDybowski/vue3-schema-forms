import { DictionarySource, ResponseReference } from '@/vocabulary/schema/elements';

import { Pagination } from '../../components/controls/base/Pagination';
import axios from 'axios';
import { Ref, ref, watch } from 'vue';
import { mapSliceTotalElements } from '../../components/controls/base/SliceResponse';
import { useResolveVariables } from './useResolveVariables';
import { debounce } from 'lodash';
import get from 'lodash/get';

export function useDictionarySource(source: DictionarySource, formModel: object) {
  const title = source.title ? source.title : 'title';
  const value = source.value ? source.value : 'value';
  const returnObject = source.returnObject !== undefined ? source.returnObject : true;
  const loading = ref(false);
  let data: Ref<Array<object>> = ref([]);

  // dictionary options
  const lazy = ref(source.lazy !== undefined ? source.lazy : true);
  const description = source.description ? source.description : null;
  const paginationOptions = ref(source.itemsPerPage
    ? new Pagination(source.itemsPerPage)
    : new Pagination(20));
  const responseReference: ResponseReference = source.references
    ? source.references
    : { data: 'content', totalElements: 'numberOfElements' } as ResponseReference;
  const singleOptionAutoSelect = source.singleOptionAutoSelect ? source.singleOptionAutoSelect : false;

  let endpoint = { url: source.url, allVariablesResolved: true }; // default wrapper object

  const isApiContainsDependency = source.url.match(new RegExp('{.*?}', 'g'));
  if (isApiContainsDependency !== null) {
    endpoint = useResolveVariables(source.url, formModel);
    watch(formModel, () => {
      endpoint = useResolveVariables(source.url, formModel);
      const temp = useResolveVariables(source.url, formModel);
      if (temp.url !== endpoint.url) {
        endpoint = temp;
        debounced.load();
      }
    });
  }

  /*
    User search support.
    queryInData prevents the http request from being executed when the selecta/autocomplete/combobox model is selected
    Example:
    1. user was searching currency "dollar".
    2. he selected US dollar.
    3. request query = US dollar will not execute.
   */
  const urlParts = endpoint.url.split('?');
  const urlParams = new URLSearchParams(urlParts[1]);
  let queryParam: any = '';
  if (urlParams.has('query')) {
    queryParam = urlParams.get('query');
    urlParams.delete('query');
  }

  let query = ref(queryParam);
  watch(query, (value, oldValue) => {
    if (value || (value === null && oldValue)) {
      const queryInData = data.value.filter((item: any) => item[title] === value).length > 0;
      queryInData ? debounced.load.cancel() : debounced.load();
    }
  });

  const load = async () => {
    if (endpoint.allVariablesResolved) {
      loading.value = true;
      paginationOptions.value.resetPage();
      const response = await axios.get(
        `${urlParts[0]}?${urlParams.toString()}`, {
          params: lazy.value ? {
            page: paginationOptions.value.getPage(),
            size: paginationOptions.value.getItemsPerPage(),
            query: query.value ? query.value : null
          } : {
            query: query.value ? query.value : null
          },
        },
      );

      data.value = get(response.data, responseReference.data, []);
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    } else {
      console.debug(`API call was blocked, not every variable from endpoint was resolved ${endpoint.url}`);
    }
  };
  const loadMoreRecords = async () => {
    if (endpoint.allVariablesResolved) {
      loading.value = true;
      const response = await axios.get(
        `${urlParts[0]}?${urlParams.toString()}`, {
          params: {
            page: paginationOptions.value.getPage() + 1,
            size: paginationOptions.value.getItemsPerPage(),
            query: query.value ? query.value : null
          },
        },
      );
      paginationOptions.value.nextPage();
      data.value = data.value.concat(get(response.data, responseReference.data, []));
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    }
  };

  const debounced = {
    load: debounce(load, 600),
  };

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
