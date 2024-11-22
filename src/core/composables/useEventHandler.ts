import { debounce } from "lodash";



import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineField } from "@/types/engine/EngineField";
import { EventHandlerDefinition } from "@/types/shared/EventHandlerDefinition";
import { useEventBus } from "@vueuse/core";
import set from "lodash/set";


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

  function onChangeDebounced(field: EngineField, model: object) {
    let eventDefinition: EventHandlerDefinition = field.onChange as EventHandlerDefinition;
    if (eventDefinition.mode == "request") {
      requestMode(eventDefinition, field, model);
    }

    switch (eventDefinition.mode) {
      case "request":
        requestMode(eventDefinition, field, model);
        break;
      case "action":
        actionMode(eventDefinition, field, model);
        break;
      case "change-model":
        changeMode(eventDefinition, field, model);
        break;
      default:
        console.warn(`Event definition mode not found. [${eventDefinition.mode}]`);
    }
  }

  function changeMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    eventDefinition.variables?.forEach((variable) => {
      set(model, variable.path, variable.value)
    })
  }

  function requestMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    let body = createBodyObject(eventDefinition, field);
    let params = createParamsObject(eventDefinition, field);

    const { resolvedText, allVariablesResolved } = resolve(field, eventDefinition.url);
    //console.debug("URL = ", resolvedText);
    //console.debug(body);
    /*const response = await axios({
      method: eventDefinition.method,
      url: eventDefinition.url,
      data: body,
    });*/
  }

  function actionMode(eventDefinition: EventHandlerDefinition, field: EngineField, model: object) {
    let body = createBodyObject(eventDefinition, field);
    let params = createParamsObject(eventDefinition, field);

    const actionHandlerEventBus = useEventBus<string>("form-action");

    let payloadObject = {
      code: eventDefinition.code,
      body: body,
      params: params,
    };

    actionHandlerEventBus.emit("form-action", payloadObject);
  }

  function createBodyObject(eventDefinition: EventHandlerDefinition, field: EngineField) {
    let body = {};
    if (
      (eventDefinition.method == "POST" && eventDefinition.body) ||
      (eventDefinition.mode == "action" && eventDefinition.body)
    ) {
      Object.entries(eventDefinition.body).forEach(([key, value]) => {
        const { resolvedText, allVariablesResolved } = resolve(field, value as string);
        body[key] = allVariablesResolved ? resolvedText : null;
      });
    }
    return body;
  }

  function createParamsObject(eventDefinition: EventHandlerDefinition, field: EngineField) {
    let params = {};
    if (eventDefinition.params) {
      Object.entries(eventDefinition.params).forEach(([key, value]) => {
        if (typeof value === "string" && variableRegexp.test(value)) {
          const { resolvedText, allVariablesResolved } = resolve(field, value as string);
          params[key] = allVariablesResolved ? resolvedText : null;
        } else {
          params[key] = value;
        }
      });
    }
    return params;
  }

  return { onChange };
}
