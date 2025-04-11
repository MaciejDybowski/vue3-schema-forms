<template>
  <v-number-input
    v-if="!loading"
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :hideInput="false"
    :inset="false"
    :label="label"
    :precision="precision"
    :reverse="false"
    :rules="!fieldProps.readonly ? rules : []"
    controlVariant="stacked"
    v-bind="fieldProps"
    @update:model-value="userTyping"
  >
    <template v-slot:prepend-inner>
      <v-tooltip
        :text="t('resultWasModified')"
        location="end"
      >
        <template v-slot:activator="{ props }">
          <v-icon
            v-if="showIconForVisualizationOfManuallyChangedResult"
            icon="mdi-alert-circle-outline"
            v-bind="props"
          >
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </v-number-input>
</template>

<script lang="ts" setup>
import set from "lodash/set";
import { computed, onMounted, ref } from "vue";

import {
  useCalculation,
  useClass,
  useExpression,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
} from "@/core/composables";
import { useEventHandler } from "@/core/composables/useEventHandler";
import { variableRegexp } from "@/core/engine/utils";
import { logger } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineNumberField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineNumberField;
  model: object;
}>();

const { t } = useLocale();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { fieldProps, bindProps } = useProps();
const { resolveExpression } = useExpression();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const { resolve } = useResolveVariables();

const { fillPath } = useResolveVariables();
const precision = props.schema.type == "int" ? 0 : "precision" in props.schema ? props.schema.precision : 2;

const lastValue = ref<any>(null);

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    lastValue.value = localModel.value;
    setValue(val, props.schema);
  },
});

const isCalculationDefined = computed(() => {
  return props.schema.calculation && props.schema.calculation !== "";
});

const isValueFromModelAndNotChangedManually = computed(() => {
  return !localModel.value || (localModel.value && !(`${props.schema.key}ManuallyChanged` in props.model));
});

const showIconForVisualizationOfManuallyChangedResult = computed(() => {
  return (
    calculationResultWasModified.value ||
    (`${props.schema.key}ManuallyChanged` in props.model && props.model[`${props.schema.key}ManuallyChanged`] == true)
  );
});

function userTyping(val: any) {
  if (isCalculationDefined.value) {
    if (logger.calculationListener)
      console.debug(
        `[vue-schema-forms] [CalculationListener], key=${props.schema.key}, index=${props.schema.index}, manualResult=${val}`,
      );
    unsubscribeListener.value();
    set(props.model, `${props.schema.key}ManuallyChanged`, true);
    calculationResultWasModified.value = true;
  }
  onChange(props.schema, props.model);
}

async function runCalculationIfExist() {
  if (isCalculationDefined.value) {
    if (isValueFromModelAndNotChangedManually.value) {
      localModel.value = await calculationFunc(props.schema, props.model);
    } else {
      //await calculationFunc(props.schema, props.model);
    }
  }
}

async function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== "") {
    const expression = fillPath(props.schema.path, props.schema.index, props.schema.expression);
    localModel.value = await resolveExpression(props.schema.key, expression, props.model, props.schema.formId);
  }
}

async function resolveIfLocalModelHasDependencies() {
  if (localModel.value && typeof localModel.value == "string" && localModel.value.match(variableRegexp)) {
    const result = await resolve(props.schema, localModel.value);
    if (result.allVariablesResolved) {
      localModel.value = result.resolvedText;
    }
  }
}

const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await runCalculationIfExist();
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
  await runExpressionIfExist();

  await resolveIfLocalModelHasDependencies();

  loading.value = false;
});
</script>

<style lang="css" scoped>
.content-right :deep(input) {
  text-align: right;
}

.content-center :deep(input) {
  text-align: center;
}

.content-left :deep(input) {
  text-align: left;
}
</style>

<i18n lang="json">
{
  "en": {
    "resultWasModified": "Result was manually modified."
  },
  "pl": {
    "resultWasModified": "Wynik został ręcznie zmodyfikowany."
  }
}
</i18n>
