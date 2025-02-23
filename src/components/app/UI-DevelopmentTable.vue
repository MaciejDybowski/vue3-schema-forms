<template>
  <v-container v-if="!loading">
    <vue-schema-forms
      :key="counter"
      ref="myForm"
      v-model="model"
      :default-form-actions="true"
      :options="options"
      :schema="schemaModel"
      :validation-behaviour="'scroll'"
      @is-form-ready="startWatcher"
      @call-action="handleAction"
    >
    </vue-schema-forms>
  </v-container>

  <v-container>
    <v-row>
      <v-col
        cols="12"
        style="border: 1px solid black"
      >
        <vue-monaco-editor
          v-model:value="code"
          :options="MONACO_EDITOR_OPTIONS"
          :theme="theme.current.value.dark ? 'vs-dark' : 'vs'"
          height="600px"
          @mount="handleMount"
          @update:value="tryValidateSchema"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { cloneDeep, debounce } from "lodash";
import * as monaco from "monaco-editor";
import { onBeforeMount, onMounted, ref, shallowRef } from "vue";
import { useTheme } from "vuetify";

import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

import { Schema } from "@/types/schema/Schema";
import { SchemaOptions } from "@/types/schema/SchemaOptions";

const theme = useTheme();
const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  tabSize: 2,
  stickyScroll: { enabled: false },
};

const code = ref("// some code...");
const editorRef = shallowRef();
const handleMount = (editor) => (editorRef.value = editor);

// your action
function formatCode() {
  if (!editorRef.value) {
    console.error("Editor reference is undefined");
    return;
  }
  const formatAction = editorRef.value.getAction("editor.action.formatDocument");
  if (formatAction) {
    formatAction.run();
  } else {
    console.warn("Formatting action not available!");
  }
}

const debounced = {
  reload: debounce(reloadForm, 500),
};
const counter = ref(0);

function reloadForm() {
  counter.value++;
  console.debug("Form should change");
}

function tryValidateSchema(value: any) {
  try {
    const temp = JSON.parse(value);

    schemaModel.value = temp;
    debounced.reload();
  } catch (e) {
    console.warn("Parsing error");
  }
}

const showJSONs = ref(true);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
}>();

let schemaModel = ref(cloneDeep(props.schema));

let model = ref(props.model);

let myForm = ref();
let loading = ref(true);
onBeforeMount(async () => {
  loading.value = true;
  code.value = JSON.stringify(props.schema, null, 2);
  //await fetchToken("forte");
  await new Promise((r) => setTimeout(r, 200));
  loading.value = false;
});

onMounted(() => {
  setTimeout(() => {
    if (editorRef.value) {
      formatCode();
    } else {
      console.warn("Editor is not ready yet!");
    }
  }, 500);
});

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  allowComments: true,
  schemas: [],
});

monaco.languages.json.jsonDefaults.setModeConfiguration({
  documentFormattingEdits: true,
});

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

  model.value["items"] = [{ nazwa: "Test" }];

  payload.callback();
}
</script>

<style lang="scss" scoped>
.code-preview {
  --code-editor-height: 0;

  .CodeMirror {
    height: var(--code-editor-height);
  }
}
</style>

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
