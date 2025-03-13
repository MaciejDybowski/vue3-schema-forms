import axios from "axios";
import URI from "urijs";

import { Resolver } from "@stoplight/json-ref-resolver";

const visitedRefs = new Set(); // Zbiór do śledzenia odwiedzonych referencji


export const jsonSchemaResolver = new Resolver({
  // resolvers can do anything, so long as they define an async read function that resolves to a value
  resolvers: {
    https: {
      async resolve(ref: URI) {
        const refString = String(ref);
        try {
          const response = await axios.get(refString);
          return response.data;
        } catch (error) {
          console.error(`Error resolving ref ${refString}:`, error);
          throw error;
        }
      },
    },
    http: {
      async resolve(ref: URI) {
        const refString = String(ref);
        try {
          const response = await axios.get(refString);
          return response.data;
        } catch (error) {
          console.error(`Error resolving ref ${refString}:`, error);
          throw error;
        }
      },
    },
  },
});
