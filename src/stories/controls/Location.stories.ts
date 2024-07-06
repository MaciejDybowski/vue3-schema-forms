// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { Schema } from "../../types/schema";
import { VueSchemaForms } from "@/components";
import { SchemaLocationField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Forms/Controls/Location",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
    },
    modelValue: {
      control: "object",
      description: "Model" /*table: { disable: true }*/,
    },
    options: {
      control: "object",
      description: "Opcje" /*table: { disable: true }*/,
    },
    "update:modelValue": { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        description: {
          content:
            "The location control is based on OpenStreetMaps. In the standard version, there are no restrictions on the language and country of the returned responses. You can do this by defining a results object in JSON Schema (next stories)",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        location: {
          label: "Location field",
          layout: {
            component: "location",
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
};

export const WithLangAndCountryLimits: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Location field");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await userEvent.type(select, "Opolska, Kraków");

    await new Promise((resolve) => setTimeout(resolve, 1500)); // <- wait for api call
    const items = document.getElementsByClassName("v-list-item");

    await userEvent.click(items[0], { delay: 200 });
    await expect(typeof context.args.modelValue.location).toEqual("object");
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        location: {
          label: "Location field",
          layout: {
            component: "location",
          },
          results: {
            lang: "pl",
            countryLimit: "pl",
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
};

export const WithValue: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({
      location: {
        country: "Polska",
        country_code: "pl",
        state: "województwo małopolskie",
        city: "Kraków",
        city_district: "Prądnik Biały",
        suburb: "Prądnik Biały",
        quarter: "Azory",
        street: "Opolska",
        postcode: "31-301",
        formatted_address: "Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-301, Polska",
        lat: 50.0893889,
        lng: 19.9105881,
      },
    });
  },
  args: {
    modelValue: {
      location: {
        country: "Polska",
        country_code: "pl",
        state: "województwo małopolskie",
        city: "Kraków",
        city_district: "Prądnik Biały",
        suburb: "Prądnik Biały",
        quarter: "Azory",
        street: "Opolska",
        postcode: "31-301",
        formatted_address: "Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-301, Polska",
        lat: 50.0893889,
        lng: 19.9105881,
      },
    },
    schema: {
      type: "object",
      properties: {
        location: {
          label: "Location field",
          layout: {
            component: "location",
          },
          results: {
            lang: "pl",
            countryLimit: "pl",
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
};

export const WithVuetifyProps: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        location: {
          label: "Location field",
          layout: {
            component: "location",
            props: {
              variant: "outlined",
              density: "compact",
            },
          },
          results: {
            lang: "pl",
            countryLimit: "pl",
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
};

export const Required: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Location field");
    const Submit = canvas.getByText("Validate");

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Field is required.")).toBeInTheDocument();

    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.type(select, "Opolska Kraków", { delay: 200 });
    await new Promise((resolve) => setTimeout(resolve, 1500)); // <- wait for api call
    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        location: {
          label: "Location field",
          layout: {
            component: "location",
            props: {
              variant: "outlined",
              density: "compact",
            },
          },
          results: {
            lang: "pl",
            countryLimit: "pl",
          },
        } as SchemaLocationField,
      },
      required: ["location"],
    } as Schema,
  },
};
