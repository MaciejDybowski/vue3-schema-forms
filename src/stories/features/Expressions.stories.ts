// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import {
  calculationSchemaInDuplicatedSection,
  simpleCalculationSchema,
  simpleCalculationWithDynamicDigits,
} from "@/stories/schemas";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { invoicePositionsSchema } from "@/tests/test-schemas";
import { Layout, SchemaTextField } from "../../vocabulary/schema/elements";
import { Schema } from "../../vocabulary/schema";

const meta = {
  title: "Forms/Features/Expressions",
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


/**
 * #### Performing expression based on form fields
 * `expression: string` - an expression b ased on form fields. This expression uses predefined functions built into the forms engine. The list will be shown below
 *
 * ##### This expression uses predefined functions built into the forms engine. The list will be shown below
 * * FIND_OLDEST_DATE(variable, array.path)
 * * FIND_EARLIEST_DATE(variable, array.path)
 * * CALC_DATE_DIFF_RETURN_DAY(date1, date2)
 * * CALC_DATE_DIFF_RETURN_HOURS(date1, date2)
 * * CALC_DATE_DIFF_RETURN_MINUTES(date1, date2)
 *
 * Like calculations, the expression listens for changes in the model - currently only available for the `text-field` component
 */
// TODO - dopisać scheme
export const findOldestDate: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({});
  },
  args: {
    modelValue: {},
    schema: {

    },
  },
};