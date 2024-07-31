<template>
  <v-col
    :class='layoutCssClass'
    v-if='shouldRender'
    :cols='cols'
    v-show='hideField'
    :style='mr'
  >
    <component
      :is='`node-${schema.layout.component}`'
      :schema='schema'
      :model='model'
    />
  </v-col>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, ref, watch } from 'vue';

import { EngineField } from '@/types/engine/EngineField';

import { useConditionalRendering } from '../../core/composables/useConditionalRendering';
import { useSchemaCols } from '../../core/composables/useSchemaCols';
import { Expression, Value } from 'expr-eval';
import betterParser from '@/core/engine/evalExprParser';
import get from 'lodash/get';
import set from 'lodash/set';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender } = useConditionalRendering(props.schema);
const { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField } = useSchemaCols(props.schema);

const layoutCssClass = computed(() => {
  let cssString = '';

  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }

  return cssString;
});

const mr = computed(() => {
  if (fillRow.value) {
    return `margin-right: ${((12 - (offset + cols.value)) / 12) * 100}%!important`;
  }
});



if ('test' in props.schema.layout) {
  watch(props.model, () => {
    console.log(`model has changed, watch on [${props.schema.key}]`);

    const result = parseIfStatement(props.schema.layout.test);
    let ifResult = false;

    console.log(`Wyrazenie: ${result.wyrazenie}`);
    console.log(`Prawda: ${result.prawda}`);
    console.log(`Falsz: ${result.falsz}`);

    let myExpr: Expression = betterParser.parse(result?.wyrazenie as string);

    if (myExpr.variables({ withMembers: true }).every((variable) => get(props.model, variable, null) !== null)) {
      ifResult = myExpr.evaluate(props.model as Value);
    }


    //set(props.schema.layout, "test", )
    console.debug(ifResult ? result?.prawda : result?.falsz)
    //props.schema.layout.test = ifResult ? result?.prawda : result?.falsz

  }, { deep: true });
}

function parseIfStatement(input) {
  // Wyrażenie regularne dopasowujące składnię "if(wyrazenie,prawda,falsz)"
  const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;

  // Dopasowanie wyrażenia do stringu
  const matches = input.match(regex);

  // Sprawdzenie, czy dopasowanie się powiodło
  if (matches) {
    // Zwrócenie zmiennych: wyrazenie, prawda, falsz
    const wyrazenie = matches[1];
    const prawda = matches[2];
    const falsz = matches[3];
    return { wyrazenie, prawda, falsz };
  } else {
    // Jeśli dopasowanie się nie powiodło, zwróć null
    return null;
  }
}
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
