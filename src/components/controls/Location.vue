<template>
  <v-autocomplete
    :label='label'
    v-model='localModel'
    :items='items'
    @update:search='debounced.search'
    :no-filter='true'
    item-title='formatted_address'
    :return-object='true'
    :rules='rules'
    :class='bindClass(schema) + requiredInputClass'
    v-bind='fieldProps'
  >
  </v-autocomplete>
</template>

<script setup lang='ts'>
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';
import { computed, onMounted, ref, Ref } from 'vue';

import { EngineLocationField } from '@/types/engine/controls';

import { useClass, useFormModel, useLabel, useProps, useRules } from '../../core/composables';

interface Location {
  country: string;
  country_code: string;
  state: string;
  county: string;
  municipality: string;
  village: string;
  city: string;
  city_district: string;
  suburb: string;
  quarter: string;
  street: string;
  house_number: string;
  postcode: string;
  formatted_address: string;
  lat: number;
  lng: number;
}

const props = defineProps<{
  schema: EngineLocationField;
  model: object;
}>();

const { label } = useLabel(props.schema);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

const items: Ref<Location[]> = ref([]);

const provider = new OpenStreetMapProvider({
  params: {
    'accept-language': props.schema.results?.lang,
    countrycodes: props.schema.results?.lang,
    addressdetails: 1,
  },
  // https://nominatim.org/release-docs/develop/api/Search/#parameters
});


async function searchFunc(val: string) {
  if (val) {
    const results = await provider.search({ query: val });
    items.value = results.map((item: any) => {
      return {
        country: item.raw.address.country,
        country_code: item.raw.address.country_code,
        state: item.raw.address.state,
        county: item.raw.address.county,
        municipality: item.raw.address.municipality,
        village: item.raw.address.village,
        city: item.raw.address.city,
        city_district: item.raw.address.city_district,
        suburb: item.raw.address.suburb,
        quarter: item.raw.address.quarter,
        street: item.raw.address.road,
        house_number: item.raw.address.house_number,
        postcode: item.raw.address.postcode,
        formatted_address: item.label,
        lat: item.y,
        lng: item.x,
      } as Location;
    });
  } else {
    items.value = [];
  }
}

const debounced = {
  search: debounce(searchFunc, 600),
};

onMounted(async () => {
  bindRules(props.schema);
  await bindProps(props.schema);
});
</script>
