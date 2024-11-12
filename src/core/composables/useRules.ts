import jsonata from "jsonata";

import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { EngineField } from "@/types/engine/EngineField";
import { SchemaSimpleValidation } from "@/types/shared/SchemaSimpleValidation";
import { useEventBus } from "@vueuse/core";

import { useLocale } from "../../core/composables/useLocale";
import { ref, Ref } from "vue";

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported
export function useRules() {
  const { t } = useLocale();
  let rules: Ref<any[] >= ref([]);

  function buildInRules(schema: EngineField) {

    if (schema.required) {
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
        } else {
          // other types/names
        }
      });

      // schema.validations.forEach((item: SchemaSimpleValidation) => {
      //   rules.push((value: string) => {
      //     if (new RegExp(item.regexp, 'g').test(value)) {
      //       return true;
      //     }
      //     return item.message;
      //   });
      // });
    }
    return rules;
  }

  function conditionalRequired(schema: EngineField, ruleDefinition: SchemaSimpleValidation, rules: Ref<any[]>) {
    rules.value.push(async (currentValue: any) => {
      let model = usePreparedModelForExpression(schema);
      const nata = jsonata(ruleDefinition.rule as string);
      const conditionResult = await nata.evaluate(model);

      if (conditionResult) {
        schema.required = true;
      } else {
        schema.required = false;
        return true;
      }

      // zdublowane celowo w celu spełnienie interfjesu funkcji walidacyjnej zdefiniowanej przez vuetify
      if ((currentValue || currentValue == false) && currentValue !== "") return true;
      return t("required");
    });
  }

  return { rules: buildInRules, refRules: rules };
}
