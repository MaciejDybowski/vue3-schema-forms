import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { useFormModel } from '@/core/composables/useFormModel';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

// TODO - napisać testy
export function useDependencies() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();
  const { getDataPath } = useFormModel();

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

      const dataPath = getDataPath(schema);
      const currentValue = get(model, dataPath, null);
      if (newValue !== currentValue) {
        const updateEvent: NodeUpdateEvent = {
          key: dataPath,
          value: newValue,
          dataPath: schema.dataPath ? dataPath : undefined,
        };
        schema.on.input(updateEvent);
      }
    }
  }

  return { handleDependency };
}
