import jsonata from "jsonata";
import { Ref, ref } from "vue";

import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { EngineField } from "@/types/engine/EngineField";
import { SchemaSimpleValidation } from "@/types/shared/SchemaSimpleValidation";
import { useEventBus } from "@vueuse/core";

import { useLocale } from "../../core/composables/useLocale";

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported
export function useRules() {
  const { t } = useLocale();
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  let rules: Ref<any[]> = ref([]);
  let requiredInputClass = ref("");

  function bindRules(schema: EngineField) {
    if (schema.required) {
      requiredInputClass.value = " required-input";
      rules.value.push((value: any) => {
        if ((value || value == false) && value !== "") return true;
        return t("required");
      });
    }

    if (schema.layout.props && "counter" in schema.layout.props) {
      const props = schema.layout.props;
      rules.value.push((value: string) => {
        if (value?.length <= props.counter || value == null || value == "") return true;
        return t("counter", { counter: props.counter });
      });
    }

    if (schema.validations) {
      schema.validations.forEach((ruleDefinition: SchemaSimpleValidation) => {
        if (ruleDefinition.name === "conditional-required") {
          conditionalRequired(schema, ruleDefinition, rules);
          // listener for visualization "live" required input with red *, validation works properly without it !!
          vueSchemaFormEventBus.on((event, payloadIndex) => ruleListener(event, payloadIndex, schema, ruleDefinition));
        } else {
          // other types/names
          // TODO
          /*  rules.push((value: string) => {
      //     if (new RegExp(item.regexp, 'g').test(value)) {
      //       return true;
      //     }
      //     return item.message;
      //   });
      */
        }
      });
    }
    return rules;
  }

  async function ruleListener(event: string, payloadIndex: number, schema: EngineField, ruleDefinition: SchemaSimpleValidation) {
    let model = usePreparedModelForExpression(schema);
    const nata = jsonata(ruleDefinition.rule as string);
    const conditionResult = await nata.evaluate(model);
    if (conditionResult) {
      requiredInputClass.value = " required-input";
    } else {
      requiredInputClass.value = "";
    }
  }

  function conditionalRequired(schema: EngineField, ruleDefinition: SchemaSimpleValidation, rules: Ref<any[]>) {
    rules.value.push(async (currentValue: any) => {
      let model = usePreparedModelForExpression(schema);
      const nata = jsonata(ruleDefinition.rule as string);
      const conditionResult = await nata.evaluate(model);

      if (!conditionResult) {
        schema.required = false;
        return true;
      }

      // zdublowane celowo w celu spełnienie interfjesu funkcji walidacyjnej zdefiniowanej przez vuetify
      if ((currentValue || currentValue == false) && currentValue !== "") return true;
      return t("required");
    });
  }

  return { bindRules, rules, requiredInputClass };
}
