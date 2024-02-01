import { EngineField, Validation } from '../../vocabulary/engine';
import { useLocale } from '../../core/composables/useLocale';

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported
export function useRules() {
  const { t } = useLocale();

  function buildInRules(schema: EngineField) {
    let rules: any[] = [];

    if (schema.required) {
      rules.push((value: any) => {
        if (value) return true;
        return t('required');
      });
    }

    if (schema.layout.props && 'counter' in schema.layout.props) {
      const props = schema.layout.props;
      rules.push((value: string) => {
        return value?.length <= props.counter || t('counter', { counter: props.counter });
      });
    }


    if (schema.validations) {
      schema.validations.forEach((item: Validation) => {
        rules.push((value: string) => {
          if (new RegExp(item.regexp, 'g').test(value)) {
            return true;
          }
          return item.message;
        });
      });
    }
    return rules;
  }

  return { rules: buildInRules };
}
