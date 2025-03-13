<template>
  <span
    v-bind="attrs"
    v-html="htmlContent"
  />
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { onMounted, ref, useAttrs } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import { variableRegexp } from "@/core/engine/utils";
import { useEventBus } from "@vueuse/core";

const attrs = useAttrs();
const { formattedNumber } = useNumber();
const htmlContent = ref<string>("");
const props = defineProps<{
  footerMapping: string;
  aggregates: object;
}>();

async function simpleResolveVariable() {
  htmlContent.value = props.footerMapping;
  const arrayOfVariables = props.footerMapping.match(variableRegexp);
  if (!!arrayOfVariables) {
    await Promise.all(
      arrayOfVariables.map(async (wrappedVariable) => {
        const unwrapped = wrappedVariable.slice(1, -1);

        const split = unwrapped.split(":");
        let variable = split[0];
        const defaultValue = split.length >= 2 ? split[1] : null;
        const typeOfValue = split.length >= 3 ? split[2] : null;
        const formatterProps = split.length == 4 ? split[3] : (null as any);

        const model = props.aggregates;

        const nata = jsonata(variable);
        let value = await nata.evaluate(model);

        if (typeOfValue == "NUMBER") {
          let decimalPlaces = 4;
          if (isNaN(formatterProps)) {
            decimalPlaces = get(model, formatterProps, 2);
          } else {
            decimalPlaces = formatterProps;
          }
          value = formattedNumber(value, "decimal", decimalPlaces, decimalPlaces);
        }

        if ((value == null && defaultValue !== null) || (value == "" && value != 0) || value == undefined) {
          value = defaultValue;
        }
        htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, value);
      }),
    );
  }
}

async function init() {
  if (props.footerMapping.match(variableRegexp)) {
    await simpleResolveVariable();
  } else {
    htmlContent.value = props.footerMapping;
  }
}

onMounted(async () => {
  await init();
});

const vueSchemaFormEventBus = useEventBus<string>("form-model");

vueSchemaFormEventBus.on(async (event, payload) => {
  if (payload == "table-aggregates") {
    await init();
  }
});
</script>

<style lang="css" scoped></style>
