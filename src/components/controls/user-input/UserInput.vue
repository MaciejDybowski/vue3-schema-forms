<template>
  <base-autocomplete
    v-model="localModel"
    v-model:menu="menu"
    :class="bindClass(schema) + requiredInputClass"
    :hide-no-data="false"
    :items="items"
    :label="label"
    :lazy="true"
    :loading="loading"
    :no-data-text="t('noData')"
    :options="pagination"
    :rules="!fieldProps.readonly ? rules : []"
    :search="query"
    item-title="firstName"
    item-value="id"
    no-filter
    return-object
    v-bind="fieldProps"
    @click="fetchData($event)"
    @loadMoreRecords="loadMoreRecords"
    @update:search="updateQuery"
  >
    <template #selection="{ item }">
      <v-chip
        :closable="!fieldProps.readonly"
        close-icon="mdi-close"
        label
        variant="outlined"
        @click:close="removeValue(item.raw)"
      >
        <span>
          {{ item.raw.firstName }}
          {{ item.raw.lastName }}
        </span>
      </v-chip>
    </template>

    <template #item="{ item, props: p }">
      <v-list-item
        class="px-3"
        v-bind="{ ...p, title: '' }"
        @click="menu = false"
      >
        <v-list-item-title>
          <v-row
            align="center"
            dense
          >
            <v-col cols="auto">
              <avatar-provider
                :id="item.raw.id"
                :initials="makeInitials(item.raw)"
              />
            </v-col>
            <v-col
              class="user-details"
              cols="auto"
            >
              <span class="font-weight-bold">{{ item.raw.firstName }} {{ item.raw.lastName }}</span>
              <br />
              <span>{{ item.raw.email }}</span>
            </v-col>
          </v-row>
        </v-list-item-title>
        <template #append>
          <div v-if="labels.length > 0">
            <user-input-label
              v-for="element in labels(item.raw)"
              :key="element.id"
              :element="element"
              v-bind="$attrs"
              variant="flat"
            />
          </div>
        </template>
      </v-list-item>
    </template>

    <template #no-data>
      <v-list-item v-if="loading">
        <v-progress-linear
          color="primary"
          indeterminate
        ></v-progress-linear>
      </v-list-item>
      <v-list-item
        v-else
        :title="t('noData')"
      />
    </template>
  </base-autocomplete>
</template>

<script lang="ts" setup>
import axios from "axios";
import { debounce } from "lodash";
import get from "lodash/get";
import { computed, onMounted, ref, watch } from "vue";

import BaseAutocomplete from "@/components/controls/base/BaseAutocomplete.vue";
import { Pagination } from "@/components/controls/base/Pagination";
import { mapSliceTotalElements } from "@/components/controls/base/SliceResponse";
import AvatarProvider from "@/components/controls/user-input/AvatarProvider.vue";
import UserInputLabel from "@/components/controls/user-input/UserInputLabel.vue";

import { useClass, useFormModel, useLabel, useLocale, useProps, useResolveVariables, useRules } from "@/core/composables";
import { variableRegexp } from "@/core/engine/utils";
import { logger } from "@/main";
import { Label } from "@/types/engine/Label";
import { User } from "@/types/engine/User";
import { EngineUserField } from "@/types/engine/controls";
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  schema: EngineUserField;
  model: object;
}>();

const { t } = useLocale();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();

const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { resolve } = useResolveVariables();

const debounced = {
  load: debounce(load, 300),
};

const localModel = computed({
  get(): User | User[] | undefined | null {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    if (typeof val !== "string") {
      setValue(val, props.schema);
      query.value = "";
    }
  },
});

// DEFAULTS VALUES //
const usersAPIEndpoint = ref<string>("/api/workspaces/members");

const query = ref("");
const pagination = props.schema.source.itemsPerPage
  ? ref(new Pagination(props.schema.source.itemsPerPage))
  : ref(new Pagination(10));
const menu = ref(false);
const showMenuItemsOnFocusIn = props.schema.source.showMenuItemsOnFocusIn ? props.schema.source.showMenuItemsOnFocusIn : false;
const loading = ref(false);

const items = ref([]);

async function fetchData(event: any) {
  if (!fieldProps.value.readonly) {
    await load();
  }
  if (showMenuItemsOnFocusIn) {
    event.target.click();
  }
}

async function load() {
  try {
    loading.value = true;
    pagination.value.resetPage();
    const obj = {
      query: query.value,
      page: 0,
      size: pagination.value.getItemsPerPage(),
    };

    const response = await axios.get(usersAPIEndpoint.value, {
      params: {
        ...obj,
      },
    });

    items.value = get(response.data, "content", []);
    pagination.value.setTotalElements(mapSliceTotalElements(response.data));
    loadCounter.value++;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

async function loadMoreRecords() {
  try {
    if (pagination.value.isNextPage()) {
      const obj = {
        query: query.value,
        page: pagination.value.getPage() + 1,
        size: pagination.value.getItemsPerPage(),
      };

      const response = await axios.get(usersAPIEndpoint.value, {
        params: {
          ...obj,
        },
      });
      pagination.value.nextPage();
      items.value = items.value.concat(get(response.data, "content", []));
      pagination.value.setTotalElements(mapSliceTotalElements(response.data));
    }
  } catch (error: any) {
    console.error(error);
    //  handleError(error, this.t("usersLoadingError"));
  }
}

async function checkIfURLHasDependency(createListener = false) {
  const isApiContainsDependency = !(usersAPIEndpoint.value.match(variableRegexp) == null);
  if (isApiContainsDependency) {
    let endpoint = await resolve(props.schema, usersAPIEndpoint.value, "title", true);

    if (endpoint.resolvedText.match(variableRegexp)) {
      endpoint = await resolve(props.schema, endpoint.resolvedText, "title", true);
    }

    if (endpoint.allVariablesResolved) {
      usersAPIEndpoint.value = endpoint.resolvedText;
      await load();
    } else if (logger.dictionaryLogger) {
      console.debug(
        `[vue-schema-forms] [DictionaryLogger] => API call was blocked, not every variable from endpoint was resolved ${usersAPIEndpoint.value}`,
      );
    }

    if (createListener) {
      const vueSchemaFormEventBus = useEventBus<string>("form-model");
      const unsubscribe = vueSchemaFormEventBus.on(async () => await listener());

      const listener = async () => {
        await new Promise((r) => setTimeout(r, 50));
        const temp = await resolve(props.schema, props.schema.source.url as string, "title", true);
        if (temp.resolvedText !== usersAPIEndpoint.value) {
          usersAPIEndpoint.value = temp.resolvedText;
          await load();
        }
      };
    }
  }
}

function removeValue(item: User) {
  if (fieldProps.multiple) {
    const tempArray = (localModel.value as User[]).filter((val) => val != item);
    localModel.value = tempArray.length > 0 ? tempArray : null;
  } else {
    localModel.value = null;
  }
}

function makeInitials(item: any) {
  if ("firstName" in item && "lastName" in item) {
    return item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase();
  } else if ("email" in item) {
    return item.email.charAt(0).toUpperCase() + item.email.charAt(1).toUpperCase();
  }
}

function labels(item: User): Label[] {
  if ("labels" in item) {
    const providedLabels: Label[] =
      props.schema.options.dictionaryProps && props.schema.options.dictionaryProps.labels
        ? props.schema.options.dictionaryProps.labels
        : [];

    // array ['labelId', 'labelId2']
    if (Array.isArray(item.labels)) {
      if (providedLabels.length > 0) {
        const userLabels: string[] = item.labels;
        return providedLabels.filter((element) => userLabels.includes(element.id));
      } else {
        return item.labels.map((id) => ({
          id: id,
          title: id,
          backgroundColor: "primary",
          textColor: "white",
        }));
      }
    }

    // string separated by coma
    if (item.labels && item.labels.includes(",")) {
      const labels = item.labels.split(",");
      if (providedLabels.length > 0) {
        return providedLabels.filter((element) => labels.includes(element.id));
      } else {
        return labels.map((id) => ({
          id: id,
          title: id,
          backgroundColor: "primary",
          textColor: "white",
        }));
      }
    }
    // one string = label
    else if (item.labels) {
      if (providedLabels.length > 0) {
        return providedLabels.filter((element) => element.id == item.labels);
      } else {
        return [
          {
            id: item.labels,
            title: item.labels,
            backgroundColor: "primary",
            textColor: "white",
          },
        ];
      }
    }

    return [];
  } else {
    return [];
  }
}

function updateQuery(val: any) {
  query.value = val;
  debounced.load();
}

const singleOptionAutoSelect = ref(false);
const loadCounter = ref(0);

function singleOptionAutoSelectFunction() {
  const selectSingleOptionLogic = () => {
    if (items.value.length !== 1 || !singleOptionAutoSelect.value || loadCounter.value > 1) return;
    console.debug("HERE");
    const selectedValue = items.value[0];

    if (JSON.stringify(localModel.value) !== JSON.stringify(selectedValue)) {
      localModel.value = [selectedValue];
    }
  };

  selectSingleOptionLogic();
  watch(items, selectSingleOptionLogic, { deep: true });
}

onMounted(async () => {
  singleOptionAutoSelect.value =
    "singleOptionAutoSelect" in props.schema.source && props.schema.source.singleOptionAutoSelect
      ? props.schema.source.singleOptionAutoSelect
      : false;
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

  if (props.schema.source.url) {
    usersAPIEndpoint.value = props.schema.source.url;
  }
  await checkIfURLHasDependency(true);
  singleOptionAutoSelectFunction();
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {
    "noData": "No users available."
  },
  "pl": {
    "noData": "Brak dostępnych użytkowników."
  }
}
</i18n>
