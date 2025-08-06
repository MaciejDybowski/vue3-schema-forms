import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

// TODO - napisać testy
export function useDependencies() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();

  async function handleDependency(
    schema: EngineField,
    key: string,
    dependency: string,
    model: object,
  ) {
    const mergedModel = form.getFormModelForResolve.value;
    const nata = jsonata(dependency);
    let result = (await nata.evaluate(mergedModel)) || null;

    vueSchemaFormEventBus.on(
      async (event, payload: NodeUpdateEvent) =>
        await dependencyListener(payload, schema, key, dependency, model),
    );

    return result;
  }

  async function dependencyListener(
    payload: NodeUpdateEvent,
    schema: EngineField,
    key: string,
    dependency: string,
    model: object,
  ) {
    if (schema.dependencyTriggers && schema.dependencyTriggers.includes(payload.key)) {
      await new Promise((resolve) => setTimeout(resolve, 30));

      const mergedModel = form.getFormModelForResolve.value;
      const nata = jsonata(dependency);
      const newValue = (await nata.evaluate(mergedModel)) || null;

      const currentValue = get(model, key, null);
      if (newValue !== currentValue) {
        const updateEvent: NodeUpdateEvent = {
          key,
          value: newValue,
        };
        schema.on.input(updateEvent);
      }
    }
  }

  return { handleDependency };
}
