import { debounce } from "lodash";
import set from "lodash/set";

import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineField } from "@/types/engine/EngineField";
import { EventHandlerDefinition } from "@/types/shared/EventHandlerDefinition";
import { useEventBus } from "@vueuse/core";

export function useEventHandler() {
  const { resolve } = useResolveVariables();

  const debounced = {
    onChange: debounce(onChangeDebounced, 1000),
  };

  async function onChange(field: EngineField, model: object) {
    if ("onChange" in field) {
      debounced.onChange(field, model);
    }
  }

  async function onChangeDebounced(field: EngineField, model: object) {
    let eventDefinition: EventHandlerDefinition = field.onChange as EventHandlerDefinition;
    if (eventDefinition.mode == "request") {
      await requestMode(eventDefinition, field, model);
    }

    switch (eventDefinition.mode) {
      case "request":
        await requestMode(eventDefinition, field, model);
        break;
      case "action":
        await actionMode(eventDefinition, field, model);
        break;
      case "change-model":
        changeMode(eventDefinition, field, model);
        break;
      case "emit-event":
        emitEvent(eventDefinition, field, model);
        break;
      default:
        console.warn(`Event definition mode not found. [${eventDefinition.mode}]`);
    }
  }

  function changeMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    eventDefinition.variables?.forEach((variable) => {
      set(model, variable.path, variable.value); // TODO - nie dziala
      console.debug(model, variable)
    });
  }

  function emitEvent(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    const vueSchemaFormEventBus = useEventBus<string>("form-model");
    vueSchemaFormEventBus.emit("model-changed", eventDefinition.eventSignal as string);
  }

  async function requestMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    let body = createBodyObject(eventDefinition, field);
    let params = createParamsObject(eventDefinition, field);

    const { resolvedText, allVariablesResolved } = await resolve(field, eventDefinition.url);
    //console.debug("URL = ", resolvedText);
    //console.debug(body);
    /*const response = await axios({
      method: eventDefinition.method,
      url: eventDefinition.url,
      data: body,
    });*/
  }

  async function actionMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    let body = await createBodyObject(eventDefinition, field);
    let params = await createParamsObject(eventDefinition, field);

    const actionHandlerEventBus = useEventBus<string>("form-action");

    let payloadObject = {
      code: eventDefinition.code,
      body: body,
      params: params,
    };

    actionHandlerEventBus.emit("form-action", payloadObject);
  }

  async function createBodyObject(eventDefinition: EventHandlerDefinition, field: EngineField) {
    let body = {};
    if (
      (eventDefinition.method == "POST" && eventDefinition.body) ||
      (eventDefinition.mode == "action" && eventDefinition.body)
    ) {
      const entries = Object.entries(eventDefinition.body);
      const resolvedEntries = await Promise.all(
        entries.map(async ([key, value]) => {
          if (typeof value === "string" && variableRegexp.test(value)) {
            const { resolvedText, allVariablesResolved } = await resolve(field, value as string);
            return [key, allVariablesResolved ? resolvedText : null];
          } else {
            return [key, value];
          }
        }),
      );

      resolvedEntries.forEach(([key, value]) => {
        body[key as string] = value;
      });
    }
    return body;
  }

  async function createParamsObject(eventDefinition: EventHandlerDefinition, field: EngineField) {
    let params = {};

    if (eventDefinition.params) {
      const entries = Object.entries(eventDefinition.params);
      const resolvedEntries = await Promise.all(
        entries.map(async ([key, value]) => {
          if (typeof value === "string" && variableRegexp.test(value)) {
            const { resolvedText, allVariablesResolved } = await resolve(field, value as string);
            return [key, allVariablesResolved ? resolvedText : null];
          } else {
            return [key, value];
          }
        }),
      );

      resolvedEntries.forEach(([key, value]) => {
        params[key as string] = value;
      });
    }
    return params;
  }

  return { onChange, createParamsObject, createBodyObject };
}
