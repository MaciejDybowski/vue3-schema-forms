import type { Meta, PlayFunction, StoryContext, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import FormStoryWrapper from '../../../.storybook/components/FormStoryWrapper.vue';

type FormStoryWrapperType = typeof FormStoryWrapper;

type FormPlayContext = StoryContext & {
  canvas: ReturnType<typeof within>;
  context: StoryContext;
  user: ReturnType<typeof userEvent.setup>;
};

export type FormStory = StoryObj<FormStoryWrapperType>;

export const defaultFormStoryArgs = {
  signals: {
    formIsReady: false,
  },
  validationBehaviour: 'combined',
  formModel: {},
  schema: {},
  options: {
    fieldProps: {
      variant: 'outlined',
      density: 'compact',
    },
  },
};

export const formStoryWrapperTemplate = {
  component: FormStoryWrapper,
  args: defaultFormStoryArgs,
  parameters: {
    /*docs: {
      story: { autoplay: true },
    },*/
  },
} satisfies Meta<FormStoryWrapperType>;

export function createFormStoryMeta(title: string, meta: Partial<Meta<FormStoryWrapperType>> = {}) {
  return {
    title,
    ...formStoryWrapperTemplate,
    ...meta,
    args: {
      ...defaultFormStoryArgs,
      ...meta.args,
    },
  } satisfies Meta<FormStoryWrapperType>;
}

async function waitForFormReady(context: StoryContext) {
  const signals = context.args?.signals;

  if (!signals) {
    return;
  }

  await waitFor(() => {
    expect(signals.formIsReady).toBe(true);
  });
}

export function playForm(playFn: (context: FormPlayContext) => Awaited<ReturnType<PlayFunction>>): PlayFunction {
  return async ({ mount, ...context }) => {
    if (typeof mount === 'function') {
      await mount();
    }

    await waitForFormReady(context);

    await playFn({
      ...context,
      context,
      canvas: within(context.canvasElement),
      user: userEvent.setup(),
    });
  };
}
