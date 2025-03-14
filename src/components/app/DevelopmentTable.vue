<template>
  <v-container v-if="!loading">
    <vue-schema-forms
      ref="myForm"
      v-model="model"
      :default-form-actions="true"
      :options="options"
      :schema="schema"
      :validation-behaviour="'scroll'"
      @is-form-ready="startWatcher"
      @call-action="handleAction"
    >
      <!--      <template #formActions>-->
      <!--        <v-row>-->
      <!--          <v-col>-->
      <!--            <v-btn color='primary'-->
      <!--                   @click='validate'-->
      <!--            >-->
      <!--              Submit-->
      <!--            </v-btn>-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--      </template>-->
    </vue-schema-forms>
  </v-container>
  <props-viewer
    v-if="showJSONs"
    :model="model"
    :schema="schema"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";

import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

import { Schema } from "@/types/schema/Schema";
import { SchemaOptions } from "@/types/schema/SchemaOptions";

import PropsViewer from "./PropsViewer.vue";
import { fetchToken } from "../../../.storybook/keycloak_auth";
import axios from "axios";

const showJSONs = ref(true);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
}>();

let model = ref(props.model);

let myForm = ref();
let loading = ref(true)
onBeforeMount(async () => {
  loading.value = true;
  //await fetchToken("forte")

  var token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkOFhIZE81WndWVlhxSDJMVU84TktOalM4eTc1OVJ6TDMwSnBmZzlGVTdZIn0.eyJleHAiOjE3NDE5NDczMTUsImlhdCI6MTc0MTk0NzAxNSwiYXV0aF90aW1lIjoxNzQxOTM1ODYyLCJqdGkiOiI4N2UwNTY1YS1hNGJmLTRhMjItOTAyNi0zNDBkOGFjYWE3NWYiLCJpc3MiOiJodHRwczovL2Rldi1mb3J0ZS5pbnQudGVjbmEucGwvYXV0aC9yZWFsbXMvYXVyZWEiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODU4OGVmMzctNWVjZS00ZmYyLTkwMjMtYzE3ZmJlNDVmZjk5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHVibGljIiwic2lkIjoiZDA1OGM0NTYtZGU1MC00ZWRmLWIzZDMtNzZiMDc2YTdjOWNiIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0Ojg5MDQiLCJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwOi8vbG9jYWxob3N0OjgwODEiLCJodHRwOi8vbG9jYWxob3N0OjgwODAvIiwiaHR0cHM6Ly9kZXYtZm9ydGUuaW50LnRlY25hLnBsIiwiaHR0cDovL2xvY2FsaG9zdDo4OTA0LyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYWRtaW5pc3RyYXRvciIsImRlZmF1bHQtcm9sZXMtYXVyZWEiLCJvZmZsaW5lX2FjY2VzcyIsIm1lbWJlciIsImRlc2lnbmVyIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIHJlcGxhY2VtZW50X3VzZXJfaWRzIGdyb3Vwc19pZHMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJBZG1pbiBUZWNuYSIsInJlcGxhY2VtZW50X3VzZXJfaWRzIjpbXSwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVjbmEiLCJncm91cHNfaWRzIjpbIjZjNjdlYjQ3LWY3YTUtNDRjZi1hZmY1LTg5MTllNDg3ODZmNCIsImUwMTQ3ZmE2LWVmNzYtNGI0OC05NDU1LTkyNTU2MTgxMjQwOCIsIjgyMjQ4NTQxLThiYjEtNDE0MS05M2U2LTNhZWY0ODZjNjdmNyJdLCJnaXZlbl9uYW1lIjoiQWRtaW4iLCJhY3RpdmVfdGVuYW50Ijp7InRlbmFudF9pZCI6IjQ4NjA1MjhmLWM0YjMtNDBmYi04ZWE1LTZjZjA0MWYxMjMwMiIsInRlbmFudF9uYW1lIjoiRk9SVEUiLCJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIiwiZGVzaWduZXIiXX0sImZhbWlseV9uYW1lIjoiVGVjbmEiLCJlbWFpbCI6InRlY25hQGRldi1mb3J0ZS5pbnQudGVjbmEucGwifQ.ej5fvUs26J3x7cSMpbfLtqpGgpxjjoOfXF0aVU7bpHjPrV0LPd2pzWq6zIprWtkD3XVCEQvyTezASRVpDSYcOnFXUJ9NU4l-FzFgpVqKGrWeojSwtLSSkyHNAGwbPkooSAAT2V1myH--An-73z_gQt_AlqynELgUmxeHqdUAVXSi9ZbBsm_eUbc2oKaF_ZSNYjItLcmSW1yNZ10K1ExI6EkYQF29UyisK3XC8PapYBYUfXBWqv4X7bl3BjzGjeef8Wk8GBHq3Pkj4aIfeDDnI-o85qf9yjuNFUDz56xkbBbihZ0yi0u2MZAUWU7W3c99LJiPUagx_3lZpowTaefgMw"
  axios.defaults.headers.common['Workspace-Id'] = 'forte';
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

  await new Promise((r) => setTimeout(r, 200));
  loading.value = false;
})

async function validate() {
  const { valid } = await myForm.value.validate();
  window.alert(`Validation result: ${valid}`);
}

function startWatcher() {
  console.debug("Form is ready");
}

async function handleAction(payload: any) {
  console.debug("Form action called... 3s response...", payload);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // model.value["czyDuplikat"] = !model.value["czyDuplikat"];
  // model.value["poleB"] = "qwe";


  model.value['items'] = [{"nazwa": "Test"}]

  payload.callback()
}
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "en": {
    "test": "EN"
  },
  "pl": {
    "test": "PL"
  }
}
</i18n>
