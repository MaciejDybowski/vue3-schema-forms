<template>
  <div @click="isConnectionWithActions ? callAction() : () => {}">
    <div v-html="htmlContent" />
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { onMounted, ref } from "vue";

import { variableRegexp } from "@/core/engine/utils";
import { TableHeader } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  header: TableHeader;
  item: object;
  actions: Record<string, string>;
}>();

const actionHandlerEventBus = useEventBus<string>("form-action");
const htmlContent = ref<string>("");
const isConnectionWithActions = ref<boolean>(false);

const actionVariable = ref("");
const actionCode = ref("");

function callAction() {
  console.debug(`Action is enable on ${actionVariable.value} with action code ${actionCode.value}`);

  let payloadObject = {
    code: props.actions[actionVariable.value],
    body: props.item,
  };

  actionHandlerEventBus.emit("form-action", payloadObject);
  console.debug("Action payload", payloadObject);
}

async function simpleResolveVariable() {
  htmlContent.value = props.header.key;
  const arrayOfVariables = props.header.key.match(variableRegexp);
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
        checkConnectionWithActions(unwrapped, "replace", value);
      }),
    );
  }
}

function checkConnectionWithActions(unwrapped: string, mode: "assign" | "replace" = "assign", value: any = null) {
  if (unwrapped in props.actions) {
    isConnectionWithActions.value = true;
    actionVariable.value = unwrapped;
    actionCode.value = props.actions[unwrapped];

    switch (mode) {
      case "assign":
        htmlContent.value = wrapIntoSpanWithLinkClass(get(props.item, props.header.key, null));
        break;
      case "replace":
        htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, wrapIntoSpanWithLinkClass(value));
        break;
    }
  } else {
    switch (mode) {
      case "assign":
        htmlContent.value = get(props.item, props.header.key, null);
        break;
      case "replace":
        htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, value);
        break;
    }
  }
}

function wrapIntoSpanWithLinkClass(value: string) {
  return `<span class='link'>${value}</span>`;
}

onMounted(async () => {
  if (props.header.key.match(variableRegexp)) {
    await simpleResolveVariable();
  } else {
    checkConnectionWithActions(props.header.key);
  }
});
</script>

<style lang="scss">
.link {
  cursor: pointer;
  // text-underline-offset: 4px;
  text-decoration: none;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.36) 0, rgba(0, 0, 0, 0.36) 8px, transparent 8px, transparent 100%) bottom
    left / 12px 1px repeat-x;
  display: inline;
  padding-bottom: 0px;
}

table .link {
  display: table-cell;
}

.link:hover {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.36) 0, rgba(0, 0, 0, 0.36) 2px, transparent 2px, transparent 100%) bottom
    left / 1px 1px repeat-x;
}

.theme--dark {
  .link {
    // text-underline-offset: 4px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.36) 0,
        rgba(255, 255, 255, 0.36) 8px,
        transparent 8px,
        transparent 100%
      )
      bottom left / 12px 1px repeat-x;
  }

  .link:hover {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.36) 0,
        rgba(255, 255, 255, 0.36) 2px,
        transparent 2px,
        transparent 100%
      )
      bottom left / 1px 1px repeat-x;
  }
}
</style>
