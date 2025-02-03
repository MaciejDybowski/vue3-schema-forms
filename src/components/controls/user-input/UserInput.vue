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
    :multiple="multiple"
    :no-data-text="t('noData')"
    :options="pagination"
    :rules="rules"
    :search="query"
    item-title="firstName"
    item-value="id"
    no-filter
    return-object
    v-bind="fieldProps"
    @focus="focusIn($event)"
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
import { computed, onMounted, ref } from "vue";

import BaseAutocomplete from "@/components/controls/base/BaseAutocomplete.vue";
import { Pagination } from "@/components/controls/base/Pagination";
import { mapSliceTotalElements } from "@/components/controls/base/SliceResponse";
import AvatarProvider from "@/components/controls/user-input/AvatarProvider.vue";
import UserInputLabel from "@/components/controls/user-input/UserInputLabel.vue";

import { useClass, useFormModel, useLabel, useLocale, useProps, useResolveVariables, useRules } from "@/core/composables";
import { variableRegexp } from "@/core/engine/utils";
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
const multiple = props.schema.source.multiple ? props.schema.source.multiple : true;
const showMenuItemsOnFocusIn = props.schema.source.showMenuItemsOnFocusIn ? props.schema.source.showMenuItemsOnFocusIn : false;
const loading = ref(false);

const items = ref([]);

async function focusIn(event: any) {
  if (items.value.length == 0 && !fieldProps.value.readonly) {
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

async function checkIfURLHasDependency() {
  const isApiContainsDependency = !(usersAPIEndpoint.value.match(variableRegexp) == null);
  if (isApiContainsDependency) {
    const { resolvedText, allVariablesResolved } = await resolve(props.schema, usersAPIEndpoint.value, "title", true);

    if (allVariablesResolved) {
      usersAPIEndpoint.value = resolvedText;
    } else {
      console.debug(`API call was blocked, not every variable from endpoint was resolved ${usersAPIEndpoint.value}`);
    }

    const vueSchemaFormEventBus = useEventBus<string>("form-model");
    const unsubscribe = vueSchemaFormEventBus.on(async (event) => await listener(event, props.schema.key));

    const listener = async (event: string, key: string) => {
      await new Promise((r) => setTimeout(r, 50));
      const temp = await resolve(props.schema, props.schema.source.url as string, "title", true);
      if (temp.resolvedText !== usersAPIEndpoint.value) {
        usersAPIEndpoint.value = temp.resolvedText;
      }
    };
  }
}

function removeValue(item: User) {
  if (multiple) {
    localModel.value = (localModel.value as User[]).filter((val) => val != item);
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
      props.schema.options.userInputProps && props.schema.options.userInputProps.labels
        ? props.schema.options.userInputProps.labels
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

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

  if (props.schema.source.url) {
    usersAPIEndpoint.value = props.schema.source.url;
  }
  await checkIfURLHasDependency();
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
