// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { VueSchemaForms } from '@/components';
import {
  calculationSchemaInDuplicatedSection,
  simpleCalculationSchema,
  simpleCalculationWithDynamicDigits,
} from '@/stories/schemas';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { invoicePositionsSchema } from '@/tests/test-schemas';

const meta = {
  title: 'Forms/Features/Calculations',
  component: VueSchemaForms,
  tags: ['autodocs'],
  argTypes: {
    schema: {
      control: 'object',
      description: 'Schema u' /*table: { disable: true }*/,
    },
    modelValue: {
      control: 'object',
      description: 'Model' /*table: { disable: true }*/,
    },
    options: {
      control: 'object',
      description: 'Opcje' /*table: { disable: true }*/,
    },
    'update:modelValue': { table: { disable: true } },
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

type Story = StoryObj<typeof meta>

/**
 * #### Wykonywanie obliczeń na podstawie pól formularza
 * `calculation: string` - wyrażenie oparte na polach formularza, oparte o parser wyrażeń z biblioteki https://www.npmjs.com/package/expr-eval
 *
 * ##### Wiemy, że ważną kwestią są zaokrąglenia pracując na liczbach :)
 * Formularz ma możliwość dostosowania ilości cyfr po przecinku za pomocą parametru ```digitsAfterDecimal```, który można ustawić na dwa sposoby
 *  * statycznie, za pomocą opcji formularza ```options.digitsAfterDecimal: number ``` (max = 10)
 *  * dynamicznie, podając ścieżkę do wartości przechowywanej w modelu ```{currency.digitsAfterDecimal}``` (np. waluta, która jest obiektem i jako parametr posiada wartość liczb po przecinku). Zostanie to pokazane na kolejnych przykładach
 */
export const SimpleCalculation: Story = {
  args: {
    schema: simpleCalculationSchema,
  },
};

/**
 *  ```options.digitsAfterDecimal: 3 ``` ustawione statycznie
 */
export const WithStaticDigitsOptions: Story = {
  args: {
    schema: simpleCalculationSchema,
    options: {
      digitsAfterDecimal: 3,
    },
  },
};

/**
 *  ```options.digitsAfterDecimal: {currency.digitsAfterDecimal} ``` wartość ustawiona dynamicznie (max = 10) na podstawie innej wartości w modelu
 */
export const WithDynamicDigitsOptions: Story = {
  args: {
    modelValue: {
      currency: {
        digitsAfterDecimal: 3,
      },
      field1: 0.25,
      field2: 0.125,
    },
    schema: simpleCalculationWithDynamicDigits,
    options: {
      digitsAfterDecimal: '{currency.digitsAfterDecimal}',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const digitsAfterDecimal = canvas.getByLabelText('Digits after decimal');
    const resultSquare = canvas.getByLabelText('Result ^2');

    await userEvent.clear(digitsAfterDecimal, { delay: 300 });
    await userEvent.type(digitsAfterDecimal, '2', { delay: 300 });
    expect(resultSquare).toHaveValue('0.14');
    await userEvent.clear(digitsAfterDecimal, { delay: 300 });
    await userEvent.type(digitsAfterDecimal, '4', { delay: 300 });
    expect(resultSquare).toHaveValue('0.1406');
  },
};

/**
 * Kalkulacje zostały stworzone z myślą o użyciu w sekcjach powielanych np. pozycje faktury
 */
export const calculationInDuplicatedSchema: Story = {
  args: {
    modelValue: {
      digitsAfterDecimal: 4,
      items: [
        {
          field1: 0.12544,
          field2: 2.45644,
        },
      ],
    },
    schema: calculationSchemaInDuplicatedSection,
    options: {
      digitsAfterDecimal: '{digitsAfterDecimal}',
    },
  },
};



/**
 * Pozycje faktury
 */
export const invoiceItems: Story = {
  args: {
    modelValue: {
      invoiceItems: [
        {product: "Item 1", quantity: 2, netPrice: 90.50, tax: 0.18},
        {product: "Item 2", quantity: 5, netPrice: 88.30, tax: 0.07},
        {product: "Item 3", quantity: 6, netPrice: 113.55, tax: 0.23},
        {product: "Item 4", quantity: 1, netPrice: 20, tax: 0.32},
        {product: "Item 5", quantity: 18, netPrice: 3.13, tax: 0.23},
        {product: "Item 1", quantity: 2, netPrice: 90.50, tax: 0.18},
        {product: "Item 2", quantity: 5, netPrice: 88.30, tax: 0.07},
        {product: "Item 3", quantity: 6, netPrice: 113.55, tax: 0.23},
        {product: "Item 4", quantity: 1, netPrice: 20, tax: 0.32},
        {product: "Item 5", quantity: 18, netPrice: 3.13, tax: 0.23}
      ]
    },
    schema: invoicePositionsSchema,
  },
};
