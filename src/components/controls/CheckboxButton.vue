<template>
  <div
    v-if="!loading"
    :class="'checkbox-root ' + bindClass(schema) + requiredInputClass"
  >
    <label
      v-if="label"
      class="v-label"
    >
      {{ label }}
    </label>
    <div :class="fieldProps.inline ? 'd-flex' : ''">
      <template
        v-for="(option, index) in data"
        :key="option[value]"
      >
        <v-checkbox
          v-model="localModel"
          :disabled="disabled(fieldProps.disabled, option.disabled)"
          :hide-details="index == data.length - 1 ? 'auto' : true"
          :label="option[title]"
          :rules="!fieldProps.readonly ? rules : []"
          :value="option[value]"
          v-bind="fieldProps"
        >
          <template #message="{ message }">
            <div class="ml-4">{{ message }}</div>
          </template>
        </v-checkbox>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';

import { computed, onMounted } from 'vue';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineSourceField } from '@/types/engine/controls';

import {
  useClass,
  useFormModel,
  useLabel,
  useProps,
  useRules,
  useSource,
} from '../../core/composables';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const { label, bindLabel } = useLabel(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const form = useInjectedFormModel();

const localModel = computed({
  get(): string | number {
    if (returnObject) {
      return getValue(props.model, props.schema)?.map((item: Record<string, any>) => item[value]);
    } else {
      return getValue(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const arrayOfObj = data.value.filter((obj) => val?.includes(obj[value])).map((item) => item);
      if (!fieldProps.value.multiple) {
        setValue(arrayOfObj.length > 0 ? arrayOfObj[0] : null, props.schema);
      } else {
        setValue(arrayOfObj.length > 0 ? arrayOfObj : null, props.schema);
      }
    } else {
      if (!fieldProps.value.multiple) {
        setValue(val, props.schema);
      } else {
        setValue(val.length > 0 ? val : null, props.schema);
      }
    }
  },
});

async function checkConditionIfExist(condition: string): Promise<boolean> {
  if (condition) {
    const model = form.getFormModelForResolve.value;
    return (await jsonata(condition).evaluate(model)) as boolean;
  }
  return false;
}

async function reloadDisabledConditions() {
  await Promise.all(
    data.value.map(async (item) => {
      if (item.disabledCondition) {
        item['disabled'] = await checkConditionIfExist(item.disabledCondition);
      }
    }),
  );
}

function disabled(props: boolean, item: boolean | undefined) {
  if (props) {
    return props;
  }
  return item;
}

const vueSchemaFormEventBus = useEventBus<string>('form-model');

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

  await reloadDisabledConditions();
  vueSchemaFormEventBus.on(async () => await reloadDisabledConditions());
});
</script>

<style lang="css" scoped></style>
