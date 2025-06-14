import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import jsonata from 'jsonata';
import { debounce } from 'lodash';
import get from 'lodash/get';

import { Ref, ref, watch } from 'vue';

import { Pagination } from '@/components/controls/dictionary/Pagination';
import { mapSliceTotalElements } from '@/components/controls/dictionary/SliceResponse';

import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { variableRegexp } from '@/core/engine/utils';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { logger } from '@/main';
import { EngineOptions } from '@/types/engine/EngineOptions';

import { EngineDictionaryField } from '@/types/engine/controls';
import { ResponseReference } from '@/types/shared/ResponseReference';
import { DictionarySource } from '@/types/shared/Source';
import { DictionaryItemChip } from '@/types/engine/DictionaryItemChip';

export function useDictionary() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const { resolve } = useResolveVariables();
  const form = useInjectedFormModel();

  let providedChips: DictionaryItemChip[] = [];
  let loadCounter = ref(0);
  let source: DictionarySource = {} as DictionarySource;
  let title = ref('title');
  let value = ref('value');
  let returnObject = ref(false);
  let lazy = ref(true);
  let description = ref<any>(null);
  let paginationOptions = ref<any>(null);
  let responseReference: ResponseReference = { data: 'content', totalElements: 'numberOfElements' };
  let singleOptionAutoSelect = ref(true);
  let endpoint = { resolvedText: '', allVariablesResolved: false };
  let isUrlHasDependency: RegExpMatchArray | null = null;
  let loading = ref(false);
  let data: Ref<Array<Record<string, any>>> = ref([]);
  let query = ref('');
  let field: EngineDictionaryField = {} as EngineDictionaryField;
  let queryBlocker = ref(false);
  let dependencyWasChanged = ref(false);

  const debounced = {
    load: debounce(load, 300),
  };

  async function initState(fieldReference: EngineDictionaryField) {
    const fieldOptions: EngineOptions = fieldReference.options;
    providedChips =
      fieldOptions.dictionaryProps && fieldOptions.dictionaryProps.labels
        ? fieldOptions.dictionaryProps.labels
        : [];
    field = fieldReference;
    source = fieldReference.source;
    title.value = source.title ? source.title : 'title';
    value.value = source.value ? source.value : 'value';
    returnObject.value = source.returnObject !== undefined ? source.returnObject : true;
    lazy.value = source.lazy !== undefined ? source.lazy : true;
    description.value = source.description ? source.description : null;
    paginationOptions.value = source.itemsPerPage
      ? new Pagination(source.itemsPerPage)
      : new Pagination(50);
    responseReference = source.references
      ? source.references
      : ({ data: 'content', totalElements: 'numberOfElements' } as ResponseReference);
    singleOptionAutoSelect.value = source.singleOptionAutoSelect
      ? source.singleOptionAutoSelect
      : true;

    //endpoint = { resolvedText: source.url, allVariablesResolved: true };
    endpoint = await resolve(field, source.url, title.value, true);

    isUrlHasDependency = source.url.match(variableRegexp);
    await checkConditionalFilters();
    await checkUrlDependencies();
  }

  async function checkConditionalFilters() {
    const params = new URLSearchParams(source.url);
    const hasConditionalFilter = params.has('enable-filter');

    if (!hasConditionalFilter) return;

    const expression = params.get('enable-filter') ?? '';
    const nata = jsonata(expression);
    const mergedModel = form.getFormModelForResolve.value;
    const newValue = await nata.evaluate(mergedModel);

    if (!newValue) {
      const updatedUrl = removeParams(source.url, ['value-filter', 'filter', 'enable-filter']);
      endpoint = { resolvedText: updatedUrl, allVariablesResolved: true };
    } else {
      isUrlHasDependency = source.url.match(variableRegexp);
      const resolved = await resolve(field, source.url, title.value, true);
      const updatedUrl = removeParams(resolved.resolvedText, ['enable-filter']);
      endpoint = { resolvedText: updatedUrl, allVariablesResolved: true };
    }
  }

  async function checkUrlDependencies() {
    if (isUrlHasDependency !== null) {
      const updateEndpoint = async () => {
        let temp = await resolve(field, source.url, title.value, true);

        if (temp.resolvedText.match(variableRegexp)) {
          temp = await resolve(field, temp.resolvedText, title.value, true);
        }

        if (loadCounter.value == 0 || temp.resolvedText !== endpoint.resolvedText) {
          dependencyWasChanged.value = true;
          loadCounter.value = 0;
          endpoint = temp;
          debounced.load('watcher');
        } else {
          dependencyWasChanged.value = false;
        }
      };

      await updateEndpoint();
      vueSchemaFormEventBus.on(updateEndpoint);
    }
  }

  watch(query, (currentQuery, previousQuery) => {
    //console.debug(`[vue-schema-forms] => query was changed, new value is = ${currentQuery}`)
    const queryInData =
      data.value.filter((item: any) => {
        if (returnObject) {
          return item[title.value] === currentQuery || Object.values(item).includes(currentQuery);
        } else {
          return item[title.value] == currentQuery;
        }
      }).length > 0;

    if (logger.dictionaryLogger && queryInData) {
      console.debug('Result is in data, block CALL');
    }
    !queryInData ? debounced.load('query') : debounced.load.cancel();
  });

  async function load(caller: string) {
    if (logger.dictionaryLogger) {
      console.debug(
        `[vue-schema-forms] => Dictionary load call function = ${caller}, queryBlocker=${queryBlocker.value} query=${query.value}, allVariablesResolved=${endpoint.allVariablesResolved}, endpoint=${endpoint.resolvedText}`,
      );
    }
    await checkConditionalFilters();

    if (endpoint.allVariablesResolved) {
      loading.value = true;
      paginationOptions.value.resetPage();
      const { url, params } = prepareUrl();
      const combinedUrl = params != '' ? `${url}?${params}` : url;
      const response = await axios.get(combinedUrl, {
        params: lazy.value
          ? {
              page: paginationOptions.value.getPage(),
              size: paginationOptions.value.getItemsPerPage(),
              query: query.value && !queryBlocker.value ? query.value : null,
            }
          : {
              query: query.value && !queryBlocker.value ? query.value : null,
            },
      });

      data.value = get(response.data, responseReference.data, []);

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
    await checkConditionalFilters();
    if (endpoint.allVariablesResolved) {
      loading.value = true;
      const { url, params } = prepareUrl();
      const combinedUrl = params != '' ? `${url}?${params}` : url;
      const response = await axios.get(combinedUrl, {
        params: {
          page: paginationOptions.value.getPage() + 1,
          size: paginationOptions.value.getItemsPerPage(),
          query: query.value && !queryBlocker.value ? query.value : null,
        },
      });
      paginationOptions.value.nextPage();
      const newData = get(response.data, responseReference.data, []);
      const filteredData = newData.filter(
        (item: any) =>
          !data.value.some((existingItem: any) => existingItem[value.value] === item[value.value]), // Adjust comparison logic as needed
      );
      data.value = data.value.concat(filteredData);
      paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
      loading.value = false;
    }
  }

  function prepareUrl() {
    let urlParts = endpoint.resolvedText.split('?');
    let urlParams = new URLSearchParams(urlParts[1]);
    if ((loadCounter.value > 0 && urlParams.has('value-filter')) || data.value.length > 0) {
      urlParams.delete('value-filter');
    }
    if (urlParams.has('query')) {
      urlParams.delete('query');
    }

    loadCounter.value++;
    return { url: urlParts[0], params: urlParams.toString() };
  }

  function removeParams(url: string, paramsToRemove: string[]) {
    const [path, queryString] = url.split('?');
    if (!queryString) return url;

    const filteredParams = queryString.split('&').filter((param) => {
      const [key] = param.split('=');
      return !paramsToRemove.includes(key);
    });

    return filteredParams.length ? `${path}?${filteredParams.join('&')}` : path;
  }

  function loadItemChips(item: any): DictionaryItemChip[] {
    if ('labels' in item) {
      // array ['labelId', 'labelId2']
      if (Array.isArray(item.labels)) {
        if (providedChips.length > 0) {
          const userLabels: string[] = item.labels;
          return providedChips.filter((element) => userLabels.includes(element.id));
        } else {
          return item.labels.map((id: string) => ({
            id: id,
            title: id,
            backgroundColor: 'primary',
            textColor: 'white',
          }));
        }
      }

      // string separated by coma
      if (item.labels && item.labels.includes(',')) {
        const labels = item.labels.split(',');
        if (providedChips.length > 0) {
          return providedChips.filter((element) => labels.includes(element.id));
        } else {
          return labels.map((id: string) => ({
            id: id,
            title: id,
            backgroundColor: 'primary',
            textColor: 'white',
          }));
        }
      }
      // one string = label
      else if (item.labels) {
        if (providedChips.length > 0) {
          return providedChips.filter((element) => element.id == item.labels);
        } else {
          return [
            {
              id: item.labels,
              title: item.labels,
              backgroundColor: 'primary',
              textColor: 'white',
            },
          ];
        }
      }

      return [];
    } else {
      return [];
    }
  }

  return {
    loadItemChips,
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
    queryBlocker,
    load,
    loadMoreRecords,
    singleOptionAutoSelect,
    loadCounter,
    dependencyWasChanged,
  };
}
