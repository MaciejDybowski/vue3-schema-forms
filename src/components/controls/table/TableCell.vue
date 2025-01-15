<template>
  <div v-if="!loading">
    <span v-html="htmlContent"></span>
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { onMounted, ref } from "vue";

import { variableRegexp } from "@/core/engine/utils";

const props = defineProps<{
  type: "TEXT" | "NUMBER" | "DATE" | "DATETIME" | "IMAGE";
  item: object;
  path: string;
}>();

const htmlContent = ref<string>("");
const loading = ref<boolean>(true);

async function simpleResolve() {
  htmlContent.value = props.path;
  const arrayOfVariables = props.path.match(variableRegexp);
  if (!!arrayOfVariables) {
    await Promise.all(
      arrayOfVariables.map(async (wrappedVariable) => {
        const unwrapped = wrappedVariable.slice(1, -1);
        const split = unwrapped.split(":");
        let variable = split[0];
        const defaultValue = split.length === 2 ? split[1] : null;

        const model = props.item;

        const nata = jsonata(variable);
        let value = await nata.evaluate(model);

        if ((value == null && defaultValue !== null) || (value == "" && value != 0) || value == undefined) {
          value = defaultValue;
        }
        htmlContent.value = htmlContent.value.replace(wrappedVariable, value + "");
      }),
    );
  }
}

onMounted(async () => {
  loading.value = true;
  if (props.path.match(variableRegexp)) {
    await simpleResolve();
    console.debug(htmlContent.value);
    console.debug(loading.value)
    loading.value = false
  } else {
    htmlContent.value = get(props.item, props.path, null);
    loading.value = false;
  }

});
</script>

<style lang="css" scoped></style>
