import { EngineField } from '../../vocabulary/engine';
import { useI18n } from 'vue-i18n';

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335 - ValidationRule type is not exported
export function useRules() {
  const { t } = useI18n({
    messages: {
      en: {
        'required': 'Field is required.',
        'counter': 'Max {counter} characters.',
      },
      pl: {
        'required': 'Pole jest wymagane.',
        'counter': 'Dozwolona liczba znaków: {counter}.',
      },
    },
  });

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
