import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';

import { Ref, ref } from 'vue';

import { useLocale } from '@/core/composables/useLocale';
import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { SchemaSimpleValidation } from '@/types/shared/SchemaSimpleValidation';

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported
export function useRules() {
  const { t } = useLocale();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  let rules: Ref<any[]> = ref([]);
  let requiredInputClass = ref('');
  const { fillPath } = useResolveVariables();
  const form = useInjectedFormModel();

  async function bindRules(schema: EngineField) {
    if (schema.required) {
      requiredInputClass.value = ' required-input';
      rules.value.push((val: any) => {
        const isValidArray = Array.isArray(val) && val.length > 0;
        const isValidPrimitive = val !== '' && val !== null && val !== undefined;
        if (!isValidArray && Array.isArray(val)) return t('required');
        return isValidPrimitive || val === false ? true : t('required');
      });
    }

    if (schema.layout.props && 'counter' in schema.layout.props) {
      const props = schema.layout.props;
      rules.value.push((value: string) => {
        if (value?.length <= props.counter || value == null || value == '') return true;
        return t('counter', { counter: props.counter });
      });
    }

    if (schema.validations) {
      schema.validations.forEach((ruleDefinition: SchemaSimpleValidation) => {
        if (ruleDefinition.name === 'conditional-required') {
          conditionalRequired(schema, ruleDefinition, rules);
          // listener for visualization "live" required input with red *, validation works properly without it !!
          ruleListener(schema, ruleDefinition);
          vueSchemaFormEventBus.on(() => ruleListener(schema, ruleDefinition));
        } else if (ruleDefinition.rule) {
          resolveValidationFunctionWithJSONataRule(ruleDefinition, schema);

          /*vueSchemaFormEventBus.on((event, payload) => {
            if (ruleDefinition.rule?.includes(payload.key)) {
              resolveValidationFunctionWithJSONataRule(ruleDefinition, schema);
              // @ts-ignore
              inputFieldRef?.value.validate();
            }
          });*/
        } else if (ruleDefinition.regexp) {
          resolveValidationFunctionWithRegexp(ruleDefinition, schema);
        }
      });
    }
    return rules;
  }

  async function resolveValidationFunctionWithRegexp(
    ruleDefinition: SchemaSimpleValidation,
    schema: EngineField,
  ) {
    rules.value.push(async (value: string) => {
      const regexp = new RegExp('{([^{}]+?)}', 'g');
      let regexpString = ruleDefinition.regexp + '';

      const matches = regexpString.match(regexp);

      if (matches) {
        await Promise.all(
          matches.map(async (wrappedVariable) => {
            const variablePathWithoutBrackets = wrappedVariable.slice(1, -1);

            if (schema.path) {
              ruleDefinition.rule = ruleDefinition.rule?.replaceAll(
                schema.path + '[]',
                `${schema.path}[${schema.index}]`,
              );
            }

            let model = form.getFormModelForResolve.value;

            const nata = jsonata(variablePathWithoutBrackets);
            let result = '';

            try {
              result = await nata.evaluate(model);
            } catch (err: any) {
              console.error('Rule error:', {
                message: err.message,
                expression: variablePathWithoutBrackets,
                field: schema.key,
              });
            }

            if (result) {
              regexpString = regexpString.replace(wrappedVariable, result);
            }
          }),
        );
      }
      if (new RegExp(regexpString, 'g').test(value)) {
        return true;
      }
      return ruleDefinition.message;
    });
  }

  async function resolveValidationFunctionWithJSONataRule(
    ruleDefinition: SchemaSimpleValidation,
    schema: EngineField,
  ) {
    rules.value.push(async (value: any) => {
      if (schema.path) {
        ruleDefinition.rule = fillPath(
          schema.path,
          schema.index as number,
          ruleDefinition.rule as string,
        );
      }

      let model = form.getFormModelForResolve.value;
      const nata = jsonata(ruleDefinition.rule as string);

      try {
        const conditionResult = await nata.evaluate(model);
        if (conditionResult) return true;
      } catch (err: any) {
        console.error('Rule error:', {
          message: err.message,
          expression: ruleDefinition.rule,
          field: schema.key,
        });
      }

      return ruleDefinition.message;
    });
  }

  async function ruleListener(schema: EngineField, ruleDefinition: SchemaSimpleValidation) {
    const model = form.getFormModelForResolve.value;
    const nata = jsonata(ruleDefinition.rule as string);
    const conditionResult = await nata.evaluate(model);
    if (conditionResult) {
      requiredInputClass.value = ' required-input';
    } else {
      requiredInputClass.value = '';
    }
  }

  function conditionalRequired(
    schema: EngineField,
    ruleDefinition: SchemaSimpleValidation,
    rules: Ref<any[]>,
  ) {
    rules.value.push(async (currentValue: any) => {
      const model = form.getFormModelForResolve.value;
      const nata = jsonata(ruleDefinition.rule as string);
      const conditionResult = await nata.evaluate(model);

      if (!conditionResult) {
        schema.required = false;
        return true;
      }

      // zdublowane celowo w celu spełnienie interfjesu funkcji walidacyjnej zdefiniowanej przez vuetify
      if ((currentValue || currentValue == false) && currentValue !== '') return true;
      return t('required');
    });
  }

  return { bindRules, rules, requiredInputClass };
}
