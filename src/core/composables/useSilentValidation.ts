import { Ref } from 'vue';
import { ValidationFromItem } from '@/types/engine/ValidationFromItem';
import { Severity, ValidationMessage } from '@/types/engine/ValidationMessage';


interface SilentValidationOptions {
  formRef: Ref<any>;
  formId: string;
  findInputLabel: (element: HTMLElement) => string | null;
}

export function useSilentValidation(options: SilentValidationOptions) {
  const { formRef, formId, findInputLabel } = options;

  async function silentValidate(): Promise<{
    valid: boolean;
    messages: ValidationMessage[];
  }> {
    const items = getFormItems();

    const fieldResult = await validateFormItems(items);
    const alertResult = collectAlertMessages();
    const warningResult = collectFieldWarnings()


    const messages = [...fieldResult.messages, ...alertResult.messages, ...warningResult];
    const valid = fieldResult.valid && alertResult.valid;

    return { valid, messages };
  }

  function getFormItems(): ValidationFromItem[] {
    return Array.from(formRef.value?.[formId]?.items || []);
  }

  async function validateFormItems(
    items: ValidationFromItem[],
  ): Promise<{ valid: boolean; messages: ValidationMessage[] }> {
    const messages: ValidationMessage[] = [];
    let valid = true;

    for (const item of items) {
      const errors = await getItemErrors(item);
      if (!errors.length) continue;

      valid = false;

      const label = resolveFieldLabel(item);

      for (const error of errors) {
        messages.push({
          code: `FIELD_ERROR_${(item.id+'').toUpperCase()}`,
          message: `${label}: ${error}`,
          severity: 'error',
          inputId: String(item.id),
        });
      }
    }

    return { valid, messages };
  }

  async function getItemErrors(item: ValidationFromItem): Promise<string[]> {
    if (item.isValid !== false) {
      const errors = await item.validate();
      item.resetValidation();
      return errors ?? [];
    }

    return item.errorMessages ?? [];
  }

  function resolveFieldLabel(item: ValidationFromItem): string {
    const element = document.getElementById(String(item.id));
    if (!element) return String(item.id);

    const foundLabel = findInputLabel(element);
    return foundLabel || String(item.id);
  }

  function collectAlertMessages(): {
    valid: boolean;
    messages: ValidationMessage[];
  } {
    const messages: ValidationMessage[] = [];
    let valid = true;

    const alertElements = document.querySelectorAll('[role="alert"]');

    alertElements.forEach((el) => {
      if (
        !el.classList.contains("include-in-validation") ||
        !el.classList.contains('v-alert') ||
        (el as HTMLElement).offsetParent === null ||
        window.getComputedStyle(el).display === 'none' ||
        window.getComputedStyle(el).visibility === 'hidden'
      )
        return;

      const severity = resolveAlertSeverity(el);
      const text = el.textContent?.trim();
      if (severity == 'info') return;
      if (!text) return;

      messages.push({
        code: `FORM_ALERT_${(el.id + '').toUpperCase()}`,
        message: text,
        severity,
        inputId: el.id,
      });

      if (severity === 'error') {
        valid = false;
      }
    });

    return { valid, messages };
  }

  function collectFieldWarnings(): ValidationMessage[] {
    const messages: ValidationMessage[] = [];

    const warningElements = document.querySelectorAll('.v-messages__message > .text-warning');

    warningElements.forEach((el, i) => {
      const text = el.textContent?.trim();
      if (!text) return;

      const inputEl = el.closest('.v-input')?.querySelector('input');
      const inputId = inputEl?.id;

      messages.push({
        code: 'FIELD_WARNING_' + i,
        message: text,
        severity: 'warning',
        inputId: inputId,
      });
    });

    return messages;
  }

  function resolveAlertSeverity(element: Element): Severity {
    if (element.classList.contains('text-error') || element.classList.contains('bg-error')) {
      return 'error';
    }

    if (element.classList.contains('text-warning') || element.classList.contains('bg-warning')) {
      return 'warning';
    }

    return 'info';
  }

  return {
    silentValidate,
  };
}
