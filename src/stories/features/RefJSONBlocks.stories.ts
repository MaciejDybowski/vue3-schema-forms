// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize } from "msw-storybook-addon";

import { StoryTemplateWithValidation } from "@/stories/templates/story-template";

import { Schema } from "../../types/schema/Schema";
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

initialize();

export default {
  title: "Forms/Features/Ref JSON Blocks",
  ...formStoryWrapperTemplate
};


const JSON_SCHEMA_BLOCK = [
  http.get("/json-mock/forte-table-offer-standard", async (req, res, ctx) => {
    return HttpResponse.json({
      label: "Input fetched from API static.json",
      layout: { component: "text-field" }
    });
  })
];

export const SchemaWithReference: Story = {
  
  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field"
          }
        },
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field"
          }
        },
        fieldC: { $ref: "../json-mock/forte-table-offer-standard" }
      }
    } as Schema
  },
  parameters: {
    msw: {
      handlers: [...JSON_SCHEMA_BLOCK]
    }
  }
};
