import { mount, VueWrapper } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import i18n from '../../.storybook/plugins/i18n';
import { VueSchemaForms } from '../components';
import { _100fieldSchema, _10fieldSchema, _50fieldSchema, invoicePositionsSchema } from './test-schemas';
import * as process from 'process';
import { createPinia } from 'pinia';

const vuetify = createVuetify({ components, directives });
const pinia = createPinia();

const global = {
  plugins: [vuetify, i18n, pinia],
};

async function waitForResult(wrapper: VueWrapper): Promise<number> {
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  // @ts-ignore
  return wrapper.vm.result as number;
}

test('should render 10 field`s form with empty model less than 80 ms', async function() {
  process.env.VITE_ENABLE_RENDER_TEST = 'true';
  const wrapper: VueWrapper = mount(VueSchemaForms, {
    global,
    props: {
      schema: _10fieldSchema,
      options: {},
      modelValue: {},
    },
  });

  expect(wrapper.exists()).eq(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(80);
});

test('should render 50 field`s form with empty model less than 240 ms', async function() {
  process.env.VITE_ENABLE_RENDER_TEST = 'true';
  const wrapper: VueWrapper = mount(VueSchemaForms, {
    global,
    props: {
      schema: _50fieldSchema,
      options: {},
      modelValue: {},
    },
  });

  expect(wrapper.exists()).eq(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(240);
});

test('should render 100 field`s form with empty model less than 410 ms', async function() {
  process.env.VITE_ENABLE_RENDER_TEST = 'true';
  const wrapper: VueWrapper = mount(VueSchemaForms, {
    global,
    props: {
      schema: _100fieldSchema,
      options: {},
      modelValue: {},
    },
  });

  expect(wrapper.exists()).eq(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(410);
});

test('should render many duplicated-section with calculations (min. 50 row\'s of 5 field\'s) less than 1000 ms', async function() {
  process.env.VITE_ENABLE_RENDER_TEST = 'true';
  const wrapper: VueWrapper = mount(VueSchemaForms, {
    global,
    props: {
      schema: invoicePositionsSchema,
      options: {},
      modelValue: {
        invoiceItems: [
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
          { product: 'Item 1', quantity: 2, netPrice: 90.5, tax: 0.18 },
          { product: 'Item 2', quantity: 5, netPrice: 88.3, tax: 0.07 },
          { product: 'Item 3', quantity: 6, netPrice: 113.55, tax: 0.23 },
          { product: 'Item 4', quantity: 1, netPrice: 20, tax: 0.32 },
          { product: 'Item 5', quantity: 18, netPrice: 3.13, tax: 0.23 },
        ],
      },
    },
  });

  expect(wrapper.exists()).eq(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(1000);
});
