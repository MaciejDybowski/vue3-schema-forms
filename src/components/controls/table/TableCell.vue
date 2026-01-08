<template>
  <div
    v-if="header.type === 'TEXT' && shouldRender"
    :style="{
      cursor: isConnectionWithActions ? 'pointer' : 'default',
      background: backgroundColor,
    }"
    v-bind="attrs"
    @click="onClick"
  >
    <span v-html="htmlContent" />
  </div>

  <div v-if="header.type === 'ICON'">
    <v-icon v-if="extractValueByPath(header.valueMapping) !== null">
      {{ extractValueByPath(header.valueMapping) }}
    </v-icon>
  </div>

  <div
    v-if="header.type === 'NUMBER'"
    class="text-right"
  >
    {{ numberContent }}
  </div>

  <v-img
    v-if="header.type === 'IMAGE' && allVariablesResolved"
    :src="urlPath"
    cover
  />

  <div
    v-if="header.type === 'ALERT'"
    class="table-cell-alert-type"
  >
    <v-tooltip
      v-if="item[header.valueMapping] && item[header.valueMapping].length > 0"
      location="top"
      max-width="400px"
    >
      <template v-slot:activator="{ props }">
        <div class="d-flex align-center justify-center">
          <v-icon v-bind="props"> mdi-information-outline</v-icon>
        </div>
      </template>

      <div
        v-for="(alert, index) in item[header.valueMapping]"
        :key="index"
        class="d-flex align-center"
      >
        <v-icon
          :color="alertColors[alert.type]"
          :icon="alertIcons[alert.type]"
          class="mr-1"
        />
        <span>{{ alert.message }}</span>
      </div>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { computed, ref, useAttrs, watch } from 'vue';

import { useNumber } from '@/core/composables/useNumber';
import { variableRegexp } from '@/core/engine/utils';
import { TableHeader } from '@/types/shared/Source';

const props = defineProps<{
  header: TableHeader;
  item: Record<string, any>;
  actions: Record<string, string>;
}>();

const attrs = useAttrs();
const { formattedNumber } = useNumber();
const actionHandlerEventBus = useEventBus<string>('form-action');

const htmlContent = ref<string>('');
const urlPath = ref('');
const allVariablesResolved = ref(true);
const backgroundColor = ref('transparent');
const shouldRender = ref(true);

const isConnectionWithActions = ref(false);
const actionVariable = ref('');
const actionCode = ref('');

// cache kompilacji jsonata
const exprCache = new Map<string, any>();
function compileExpr(expr?: string | null) {
  if (!expr) return null;
  let c = exprCache.get(expr);
  if (!c) {
    c = jsonata(expr);
    exprCache.set(expr, c);
  }
  return c;
}
async function evalExpr(expr?: string | null, model: any = {}) {
  const c = compileExpr(expr ?? '');

  if (!c) return null;
  return await c.evaluate(model);
}

const alertIcons: Record<string, string> = {
  warning: 'mdi-alert',
  info: 'mdi-information',
  error: 'mdi-alert-circle',
};
const alertColors: Record<string, string> = {
  warning: 'orange',
  info: 'blue',
  error: 'red',
};

const numberContent = computed(() => {
  const properties = props.header.properties;
  const minPrecision = properties?.minPrecision ?? 0;
  const maxPrecision = properties?.maxPrecision ?? 2;
  return formattedNumber(
    extractValueByPath(props.header.valueMapping),
    'decimal',
    minPrecision,
    maxPrecision,
  );
});

function extractValueByPath(path: string) {
  return get(props.item, path, null);
}
function wrapIntoSpanWithLinkClass(value: string) {
  return `<span class='link'>${value}</span>`;
}
function setActionConnection(variable: string) {
  isConnectionWithActions.value = true;
  actionVariable.value = variable;
  actionCode.value = props.actions[variable];
}
function callAction() {
  if (!isConnectionWithActions.value) return;
  const payload = { code: props.actions[actionVariable.value], body: props.item };
  actionHandlerEventBus.emit('form-action', payload);
}
function onClick() {
  if (isConnectionWithActions.value) callAction();
}

function checkConnectionWithActions(
  unwrapped: string,
  mode: 'assign' | 'replace' = 'assign',
  value: any = null,
) {
  if (unwrapped in props.actions) {
    setActionConnection(unwrapped);
    if (mode === 'assign') {
      htmlContent.value = wrapIntoSpanWithLinkClass(extractValueByPath(props.header.valueMapping));
    } else {
      htmlContent.value = htmlContent.value.replace(
        `{${unwrapped}}`,
        wrapIntoSpanWithLinkClass(value),
      );
    }
  } else {
    if (mode === 'assign') {
      htmlContent.value = extractValueByPath(props.header.valueMapping);
    } else {
      htmlContent.value = htmlContent.value.replace(`{${unwrapped}}`, value);
    }
  }
}

async function simpleResolveVariable() {
  htmlContent.value = props.header.valueMapping;
  allVariablesResolved.value = true;
  const vars = props.header.valueMapping.match(variableRegexp);
  if (!vars) return;
  await Promise.all(
    vars.map(async (wrapped) => {
      const unwrapped = wrapped.slice(1, -1);
      const parts = unwrapped.split(':');
      const variable = parts[0];
      const defaultValue = parts.length >= 2 ? parts[1] : null;
      const typeOfValue = parts.length >= 3 ? parts[2] : null;
      const formatterProps = parts.length === 4 ? parts[3] : null;

      let value = await evalExpr(variable, props.item);
      if (typeOfValue === 'NUMBER') {
        let decimalPlaces = 4;
        if (isNaN(Number(formatterProps))) {
          decimalPlaces = get(props.item, formatterProps, 2);
        } else {
          decimalPlaces = Number(formatterProps);
        }
        value = formattedNumber(value, 'decimal', decimalPlaces, decimalPlaces);
      }

      if (
        (value == null && defaultValue !== null) ||
        (value === '' && value != 0) ||
        value === undefined
      ) {
        value = defaultValue;
      }
      if (value == null) allVariablesResolved.value = false;
      checkConnectionWithActions(unwrapped, 'replace', value);
    }),
  );
}

async function mapImageParams() {
  let url = props.header.valueMapping;
  allVariablesResolved.value = true;
  const vars = props.header.valueMapping.match(variableRegexp);
  if (!vars) return url;
  await Promise.all(
    vars.map(async (wrapped) => {
      const unwrapped = wrapped.slice(1, -1);
      const parts = unwrapped.split(':');
      const variable = parts[0];
      const defaultValue = parts.length === 2 ? parts[1] : null;
      let value = await evalExpr(variable, props.item);
      if (
        (value == null && defaultValue !== null) ||
        (value === '' && value != 0) ||
        value === undefined
      ) {
        value = defaultValue;
      }
      if (value == null) allVariablesResolved.value = false;
      url = url.replace(`{${unwrapped}}`, value);
    }),
  );
  return url;
}

async function getBackgroundColor(header: TableHeader, item: any) {
  if (!header?.color) return 'transparent';
  const merged = { header, ...item };
  const res = await evalExpr(header.color, merged);
  return res ?? 'transparent';
}

async function prepareTextCell() {
  allVariablesResolved.value = true;
  if (props.header.valueMapping.match(variableRegexp)) {
    await simpleResolveVariable();
  } else if (Object.keys(props.actions || {}).length > 0) {
    checkConnectionWithActions(props.header.valueMapping);
  } else {
    htmlContent.value = get(props.item, props.header.valueMapping, props.header.valueMapping);
  }

  if (props.header.condition) {
    const cond = compileExpr(props.header.condition);
    shouldRender.value = !!(cond ? await cond.evaluate(props.item) : true);
  } else {
    shouldRender.value = true;
  }
}

watch(
  [
    () => props.header.type,
    () => props.header.valueMapping,
    () => props.header.condition,
    () => props.header.color,
    () => props.actions,
    () => props.item,
  ],
  async () => {
    backgroundColor.value = await getBackgroundColor(props.header, props.item);

    switch (props.header.type) {
      case 'TEXT':
        await prepareTextCell();
        break;
      case 'IMAGE':
        urlPath.value = await mapImageParams();
        break;
      default:
        break;
    }
  },
  { immediate: true, deep: true },
);
</script>

<style lang="scss">
.link {
  text-decoration-line: underline;
  text-decoration-thickness: from-font;
  text-decoration-style: dotted;
}
.link:hover {
  text-decoration-style: solid;
}
</style>
