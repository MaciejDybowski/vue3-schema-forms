import axios from "axios";

import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { EngineField } from "@/types/engine/EngineField";
import { EventHandlerDefinition } from "@/types/shared/EventHandlerDefinition";

export function useEventHandler() {
  const { resolve } = useResolveVariables();

  async function onChange(field: EngineField, model: object) {
    let mergedModel = usePreparedModelForExpression(field);
    let eventDefinition: EventHandlerDefinition = field.onChange as EventHandlerDefinition;

    if (eventDefinition.mode == "request") {
      let body = {};
      if (eventDefinition.method == "POST" && eventDefinition.body) {
        Object.entries(eventDefinition.body).forEach(([key, value]) => {
          console.log(key, value);
        });
      }

      const response = await axios({
        method: eventDefinition.method,
        url: eventDefinition.url,
        data: body
      });
    }
  }
}
