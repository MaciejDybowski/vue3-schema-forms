import { EngineField } from '../../vocabulary/engine';
import { useI18n } from 'vue-i18n';

// https://github.com/vuetifyjs/vuetify/issues/16680#issuecomment-1816634335
export function useRules(schema: EngineField): any[] {
  let rules: any[] = [];
  const { t }= useI18n();

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
