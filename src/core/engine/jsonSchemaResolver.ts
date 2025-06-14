import { Resolver } from '@stoplight/json-ref-resolver';
import axios from 'axios';
import URI from 'urijs';

export const jsonSchemaResolver = new Resolver({
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
    customMade: {
      async resolve(ref: URI, ctx) {
        console.debug(ref);
        console.debug(ctx);
      },
    },
  },
});
