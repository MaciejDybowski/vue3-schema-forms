import { mount, VueWrapper } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { offsetSchema } from '@/stories/schemas';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import i18n from '../plugins/i18n';
import { VueSchemaForms } from '@/components';

const vuetify = createVuetify({ components, directives });

async function waitForResult(wrapper: VueWrapper): Promise<number> {
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();

  // @ts-ignore
  return wrapper.vm.result as number;
}

it('should return simple schema less than 45ms ', async function() {
  const wrapper: VueWrapper = mount(VueSchemaForms, {
    global: {
      plugins: [vuetify, i18n],
    },
    props: {
      schema: offsetSchema,
      options: {},
      modelValue: {
        fieldA: 'test',
      },
    },
  });

  expect(wrapper.exists()).eq(true);
  const renderTime = await waitForResult(wrapper);
  expect(renderTime).toBeGreaterThan(0);
  expect(renderTime).toBeLessThan(45);
});
