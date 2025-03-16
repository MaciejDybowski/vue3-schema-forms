import { createPinia } from "pinia";
import * as process from "process";
import { beforeEach, expect, test } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { VueWrapper, mount } from "@vue/test-utils";

import i18n from "../../.storybook/plugins/i18n";
import { VueSchemaForms } from "../components";
import { _10fieldSchema, _50fieldSchema, _100fieldSchema, invoicePositionsSchema } from "./test-schemas";

const vuetify = createVuetify({ components, directives });
const pinia = createPinia();

const global = {
  plugins: [vuetify, i18n, pinia],
};

async function waitForResult(wrapper: VueWrapper): Promise<number> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const timeout = 2000; // Max wait time (2s)

    const check = async () => {
      await wrapper.vm.$nextTick();
      // @ts-ignore
      if (wrapper.vm.result != null && wrapper.vm.result > 0) {
        // @ts-ignore
        resolve(wrapper.vm.result as number);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error("Timeout: Render time result was not set"));
      } else {
        setTimeout(check, 10); // Check again in 10ms
      }
    };
    check();
  });
}

let wrapper: VueWrapper;
beforeEach(() => {
  process.env.VITE_ENABLE_RENDER_TEST = "true";
});

test.each([
  [80, _10fieldSchema],
  [240, _50fieldSchema],
  [410, _100fieldSchema],
])("should render form with schema in < %d ms", async (maxTime, schema) => {
  wrapper = mount(VueSchemaForms, {
    global,
    props: { schema, options: {}, modelValue: {} },
  });

  expect(wrapper.exists()).toBe(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(maxTime);
});

const generateInvoiceItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    product: `Item ${i + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    netPrice: (Math.random() * 100).toFixed(2),
    tax: 0.05 + Math.random() * 0.3,
  }));

test("should render invoice form in < 1000 ms", async () => {
  wrapper = mount(VueSchemaForms, {
    global,
    props: {
      schema: invoicePositionsSchema,
      options: {},
      modelValue: { invoiceItems: generateInvoiceItems(50) },
    },
  });

  expect(wrapper.exists()).toBe(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(1000);
});
