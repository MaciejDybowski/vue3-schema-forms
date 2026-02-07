import { MaybeRef, Ref, computed, toRef, unref } from 'vue';








export interface UseActiveRulesOptions {
  fieldProps: Ref<Record<string, any>>;
  validationsDisabled: Ref<boolean>;
  rules: Ref<any[]>;
  extraRules?: MaybeRef<any[]>;
}

export function useActiveRules(options: UseActiveRulesOptions) {
  const { fieldProps, rules } = options;
  const disableRules = options.validationsDisabled;
  const extraRules = toRef(options.extraRules ?? []);

  const activeRules = computed(() => {
    if (fieldProps.value.readonly === true) {
      return [];
    }

    if (disableRules.value) {
      return [];
    }

    const baseRules = rules.value ?? [];
    const extra = unref(extraRules) ?? [];

    if (extra.length > 0) {
      return [...baseRules, ...extra];
    }

    return baseRules;
  });

  return { activeRules };
}
