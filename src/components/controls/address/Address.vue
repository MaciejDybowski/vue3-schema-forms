<template>
  <form-root
    :schema="addressSchema"
    :form-id="schema.formId"
    :model="localModel"
    :options="schema.options"
    @update:model="updateModel"
  />
</template>

<script setup lang="ts">
import { merge } from "lodash";
import { computed, onBeforeMount, reactive } from "vue";

import { EngineField } from "@/types/engine/EngineField";
import { Schema } from "@/types/schema/Schema";

import { useFormModel, useLocale } from "../../../core/composables";
import FormRoot from "../../engine/FormRoot.vue";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { t } = useLocale();
const { getValue, setValue } = useFormModel();

const country = merge(
  {
    label: t("address.country"),
    layout: {
      component: "text-field",
      cols: 12,
      props: {
        autocomplete: "country-name",
      },
    },
  },
  props.schema.layout?.schema?.properties?.country,
);

const region = merge(
  {
    label: t("address.region"),
    layout: {
      component: "text-field",
      cols: 12,
      props: {
        autocomplete: "address-level1",
      },
    },
  },
  props.schema.layout?.schema?.properties?.region,
);

const addressLine = merge(
  {
    label: t("address.addressLine"),
    layout: {
      component: "text-field",
      cols: 12,
      props: {
        autocomplete: "street-address",
      },
    },
  },
  props.schema.layout?.schema?.properties?.addressLine,
);

const postalCode = merge(
  {
    label: t("address.postalCode"),
    layout: {
      component: "text-field",
      cols: 6,
      props: {
        autocomplete: "postal-code",
      },
    },
  },
  props.schema.layout?.schema?.properties?.postalCode,
);

const city = merge(
  {
    label: t("address.city"),
    layout: {
      component: "text-field",
      cols: 6,
      props: {
        autocomplete: "address-level2",
      },
    },
  },
  props.schema.layout?.schema?.properties?.city,
);

const required = props.schema.layout?.schema?.required
  ? props.schema.layout?.schema?.required
  : ["country", "addressLine", "postalCode", "city"];

let addressSchema: Schema = {
  type: "object",
  properties: {
    country: country,
    region: region,
    addressLine: addressLine,
    postalCode: postalCode,
    city: city,
  },
  required: required,
};

let address = reactive({
  country: null,
  region: null,
  addressLine: null,
  postalCode: null,
  city: null,
});

const localModel = computed<any>({
  get(): object {
    return getValue(props.model, props.schema, address);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

function updateModel(val: { key: string; value: string }) {
  address[val.key] = val.value;
  localModel.value = address;
}

onBeforeMount(() => {
  if (localModel.value) {
    address = localModel.value;
  }
});
</script>

<style scoped lang="css"></style>
