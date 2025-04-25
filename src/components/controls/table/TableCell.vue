<template>
  <div
    v-if="header.type == 'TEXT' && shouldRender"
    v-bind="attrs"
    @click="isConnectionWithActions ? callAction() : () => {}"
  >
    <span v-html="htmlContent" />
  </div>

  <div v-if="header.type == `ICON`">
    <v-icon v-if="extractValueByPath(header.valueMapping) !== null">{{ extractValueByPath(header.valueMapping) }} </v-icon>
  </div>

  <div
    v-if="header.type == 'NUMBER'"
    class="text-right"
  >
    {{ numberContent }}
  </div>

  <v-img
    v-if="header.type == 'IMAGE' && allVariablesResolved"
    :src="urlPath"
    cover
  />

  <div
    v-if="header.type == 'ALERT'"
    class="table-cell-alert-type"
  >
    <v-tooltip
      v-if="item.alerts && item.alerts.length > 0"
      location="top"
      max-width="400px"
    >
      <template v-slot:activator="{ props }">
        <div class="d-flex align-center justify-center">
          <v-icon v-bind="props"> mdi-information-outline</v-icon>
        </div>
      </template>
      <div
        v-for="(alert, index) in item.alerts"
        :key="index"
        class="d-flex align-center"
      >
        <v-icon
          :color="alertColors[alert.type]"
          :icon="alertIcons[alert.type]"
          class="mr-1"
          v-bind="props"
        />
        <span>{{ alert.message }}</span>
      </div>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { computed, onMounted, ref, useAttrs, watchEffect } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import { variableRegexp } from "@/core/engine/utils";
import { TableHeader } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

const alertIcons = {
  warning: "mdi-alert",
  info: "mdi-information",
  error: "mdi-alert-circle",
};

const alertColors = {
  warning: "orange",
  info: "blue",
  error: "red",
};

const props = defineProps<{
  header: TableHeader;
  item: any;
  actions: Record<string, string>;
}>();
const backgroundColor = ref("transparent");

const attrs = useAttrs();
const { formattedNumber } = useNumber();
const actionHandlerEventBus = useEventBus<string>("form-action");
const htmlContent = ref<string>("");
const urlPath = ref("");
const allVariablesResolved = ref(true);

const numberContent = computed(() => {
  const properties = props.header.properties;
  const minPrecision = properties && properties.minPrecision ? properties.minPrecision : 0;
  const maxPrecision = properties && properties.maxPrecision ? properties.maxPrecision : 2;

  return formattedNumber(extractValueByPath(props.header.valueMapping), "decimal", minPrecision, maxPrecision);
});

const isConnectionWithActions = ref<boolean>(false);

const actionVariable = ref("");
const actionCode = ref("");

function callAction() {
  //console.debug(`Action is enable on ${actionVariable.value} with action code ${actionCode.value}`);

  let payloadObject = {
    code: props.actions[actionVariable.value],
    body: props.item,
  };

  actionHandlerEventBus.emit("form-action", payloadObject);
  //console.debug("Action payload", payloadObject);
}

async function mapImageParams() {
  let url = props.header.valueMapping;
  const arrayOfVariables = props.header.valueMapping.match(variableRegexp);
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
        if (value == null) {
          allVariablesResolved.value = false;
        }
        url = url.replace(`{${unwrapped}}`, value);
      }),
    );
  }
  return url;
}

async function simpleResolveVariable() {
  htmlContent.value = props.header.valueMapping;
  const arrayOfVariables = props.header.valueMapping.match(variableRegexp);
  if (!!arrayOfVariables) {
    await Promise.all(
      arrayOfVariables.map(async (wrappedVariable) => {
        const unwrapped = wrappedVariable.slice(1, -1);

        const split = unwrapped.split(":");
        let variable = split[0];
        const defaultValue = split.length >= 2 ? split[1] : null;
        const typeOfValue = split.length >= 3 ? split[2] : null;
        const formatterProps = split.length == 4 ? split[3] : (null as any);

        const model = props.item;

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
        htmlContent.value = wrapIntoSpanWithLinkClass(extractValueByPath(props.header.valueMapping));
        break;
      case "replace":
        htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, wrapIntoSpanWithLinkClass(value));
        break;
    }
  } else {
    switch (mode) {
      case "assign":
        htmlContent.value = extractValueByPath(props.header.valueMapping);
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

async function getBackgroundColor(header: TableHeader, item) {
  if (header.color) {
    const mergedModel = {
      header: header,
      ...item,
    };
    const nata = jsonata(header.color);
    const result = await nata.evaluate(mergedModel);
    if (result) {
      return result;
    }
  }
  return "transparent";
}

const shouldRender = ref(true);

onMounted(async () => {
  backgroundColor.value = await getBackgroundColor(props.header, props.item);
  switch (props.header.type) {
    case "TEXT":
      if (props.header.valueMapping.match(variableRegexp)) {
        await simpleResolveVariable();
      } else if (Object.keys(props.actions).length > 0) {
        checkConnectionWithActions(props.header.valueMapping);
      } else {
        htmlContent.value = get(props.item, props.header.valueMapping, props.header.valueMapping);
      }

      if (props.header.condition) {
        const nata = jsonata(props.header.condition);
        shouldRender.value = await nata.evaluate(props.item);
      }

      break;
    case "IMAGE":
      urlPath.value = await mapImageParams();
  }
});

// TODO - czy nie ma lepszego sposobu na zachowanie reaktywności??
watchEffect(async () => {
  switch (props.header.type) {
    case "TEXT":
      if (props.header.valueMapping.match(variableRegexp)) {
        await simpleResolveVariable();
      } else {
        checkConnectionWithActions(props.header.valueMapping);
      }
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
