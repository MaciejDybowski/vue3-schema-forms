import { EngineField } from '../../vocabulary/engine';
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

    return rules;
  }

  return { rules: buildInRules };
}
