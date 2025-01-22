<template>
  <div
    v-if="header.type == 'TEXT'"
    @click="isConnectionWithActions ? callAction() : () => {}"
  >
    <span v-html="htmlContent" />
  </div>

  <div
    v-if="header.type == 'NUMBER'"
    class="text-right"
  >
    {{ numberContent }}
  </div>
  <div v-if="header.type == 'IMAGE'">
    <v-avatar
      :rounded="0"
      :size="'maxWidth' in header ? (header.maxWidth as number) : 32"
    >
      <!-- 1. option API returns /api/v1/images/1.png and component add current domain -->
      <!-- 2. option API returns https://yourdomain.com/api/v1/images/1.png -->
      <v-img
        :src="
          header.properties && header.properties.addDomain == true
            ? domain + extractValueByPath(header.key)
            : extractValueByPath(header.key)
        "
        cover
      />
    </v-avatar>
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { onMounted, ref } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import { variableRegexp } from "@/core/engine/utils";
import { TableHeader } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  header: TableHeader;
  item: object;
  actions: Record<string, string>;
}>();
const { formattedNumber } = useNumber();
const actionHandlerEventBus = useEventBus<string>("form-action");
const htmlContent = ref<string>("");
const numberContent = ref<string | null>(null);
const domain = window.location.origin;
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
        htmlContent.value = wrapIntoSpanWithLinkClass(extractValueByPath(props.header.key));
        break;
      case "replace":
        htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, wrapIntoSpanWithLinkClass(value));
        break;
    }
  } else {
    switch (mode) {
      case "assign":
        htmlContent.value = extractValueByPath(props.header.key);
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

function extractValueByPath(path: string) {
  return get(props.item, path, null);
}

onMounted(async () => {
  switch (props.header.type) {
    case "TEXT":
      if (props.header.key.match(variableRegexp)) {
        await simpleResolveVariable();
      } else {
        checkConnectionWithActions(props.header.key);
      }
      break;
    case "NUMBER":
      const properties = props.header.properties;
      const minPrecision = properties && properties.minPrecision ? properties.minPrecision : 0;
      const maxPrecision = properties && properties.maxPrecision ? properties.maxPrecision : 2;

      numberContent.value = formattedNumber(extractValueByPath(props.header.key), "decimal", minPrecision, maxPrecision);
      break;
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
