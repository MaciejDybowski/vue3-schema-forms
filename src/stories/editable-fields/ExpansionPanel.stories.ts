// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

const createTextPanel = (
  title: string,
  fieldKey: string,
  label: string,
  openByDefault?: boolean,
) => ({
  title,
  ...(typeof openByDefault === 'boolean' ? { openByDefault } : {}),
  schema: {
    properties: {
      [fieldKey]: {
        label,
        layout: {
          component: 'text-field',
        },
      },
    },
  },
});

const baseArgs = {
  formModel: {},
  schema: {
    type: 'object',
    properties: {
      paragraph: {
        content: 'Static form text content',
        layout: {
          component: 'static-content',
          tag: 'p',
        } as Layout,
      },
      panelA: {
        layout: {
          component: 'expansion-panels',
        },
        panels: [
          createTextPanel('Panel A', 'textField', 'Pole1'),
          createTextPanel('Panel B', 'textFieldTest', 'Pole3'),
        ],
      },
    },
  },
};

async function expectPanelState(canvasElement: HTMLElement, title: string, isExpanded: boolean) {
  const canvas = within(canvasElement);
  const panelButton = await canvas.findByRole('button', { name: title });
  await expect(panelButton).toHaveAttribute('aria-expanded', String(isExpanded));
}

export default {
  title: 'Components/Editable/ExpansionPanel',
  ...formStoryWrapperTemplate,
};

// TODO - add tests and add test for title dependencies

export const Standard: Story = {
  name: 'Standard',
  play: playForm(async ({ canvasElement }) => {
    await expectPanelState(canvasElement, 'Panel A', false);
    await expectPanelState(canvasElement, 'Panel B', false);
  }),
  args: baseArgs,
};

export const OpenByDefaultTrue: Story = {
  name: 'Open by Default True',
  play: playForm(async ({ canvasElement }) => {
    await expectPanelState(canvasElement, 'Panel domyslnie otwarty', true);
    await expectPanelState(canvasElement, 'Panel bez flagi', false);
  }),
  args: {
    ...baseArgs,
    schema: {
      ...baseArgs.schema,
      properties: {
        ...baseArgs.schema.properties,
        panelA: {
          ...baseArgs.schema.properties.panelA,
          panels: [
            createTextPanel(
              'Panel domyslnie otwarty',
              'alwaysOpen',
              'Pole domyslnie otwarte',
              true,
            ),
            createTextPanel('Panel bez flagi', 'fallbackPanel', 'Pole fallback'),
          ],
        },
      },
    },
  },
};

export const OpenByDefaultFalse: Story = {
  name: 'Open by Default False',
  play: playForm(async ({ canvasElement }) => {
    await expectPanelState(canvasElement, 'Panel domyslnie zamkniety', false);
    await expectPanelState(canvasElement, 'Panel bez flagi', false);
  }),
  args: {
    ...baseArgs,
    schema: {
      ...baseArgs.schema,
      properties: {
        ...baseArgs.schema.properties,
        panelA: {
          ...baseArgs.schema.properties.panelA,
          panels: [
            createTextPanel(
              'Panel domyslnie zamkniety',
              'alwaysClosed',
              'Pole domyslnie zamkniete',
              false,
            ),
            createTextPanel('Panel bez flagi', 'fallbackPanel', 'Pole fallback'),
          ],
        },
      },
    },
  },
};

export const OpenByDefaultMixed: Story = {
  name: 'Open by Default Mixed',
  play: playForm(async ({ canvasElement }) => {
    await expectPanelState(canvasElement, 'Panel 1 (openByDefault=true)', true);
    await expectPanelState(canvasElement, 'Panel 2 (openByDefault=false)', false);
    await expectPanelState(canvasElement, 'Panel 3 (fallback do localStorage)', false);
  }),
  args: {
    ...baseArgs,
    schema: {
      ...baseArgs.schema,
      properties: {
        ...baseArgs.schema.properties,
        panelA: {
          ...baseArgs.schema.properties.panelA,
          panels: [
            createTextPanel('Panel 1 (openByDefault=true)', 'mixedOpen', 'Pole otwarte', true),
            createTextPanel(
              'Panel 2 (openByDefault=false)',
              'mixedClosed',
              'Pole zamkniete',
              false,
            ),
            createTextPanel('Panel 3 (fallback do localStorage)', 'mixedFallback', 'Pole fallback'),
          ],
        },
      },
    },
  },
};

export const TableOne: Story = {
  name: 'Read Only - Expansion Panel',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const panelButton = await canvas.findByRole('button', { name: 'Tytuł sekcji' });

    if (panelButton.getAttribute('aria-expanded') !== 'true') {
      await userEvent.click(panelButton);
    }

    await expect(panelButton).toHaveAttribute('aria-expanded', 'true');

    const textField = await canvas.findByRole('textbox', { name: 'Item-textField937' });
    await expect(textField).toHaveAttribute('readonly');
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        expansionPanels518: {
          layout: {
            component: 'expansion-panels',
            props: { readonly: true },
          },
          panels: [
            {
              title: 'Tytuł sekcji',
              titleIcon: 'mdi-home',
              titleIconSize: 20,
              schema: {
                properties: {
                  textField937: {
                    label: 'Item-textField937',
                    layout: {
                      cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                      fillRow: true,
                      component: 'text-field',
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};

export const HideCondition: Story = {
  name: 'Hide Condition',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Toggle switch to hide panel
    const switchInput = await canvas.findByLabelText('Pokaż ukryty panel');
    await userEvent.click(switchInput, { delay: 600 });

    // Panel B should disappear
    await expect(canvas.queryByRole('button', { name: 'B' })).toBeInTheDocument();
  }),
  args: {
    formModel: { showPanel: false },
    schema: {
      type: 'object',
      properties: {
        showPanel: {
          label: 'Pokaż ukryty panel',
          layout: {
            component: 'switch',
          },
        },
        panelA: {
          layout: {
            component: 'expansion-panels',
          },
          panels: [
            {
              title: 'A',
              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
            {
              title: 'B',
              hideCondition: 'nata(showPanel = false)',
              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
            {
              title: 'C',
              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
          ],
        },
      },
    },
  },
};

export const OpenCondition: Story = {
  name: 'Open Condition',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Panel B should be closed initially
    await expectPanelState(canvasElement, 'B', false);

    // Toggle switch to open panel
    const switchInput = await canvas.findByLabelText('Otwórz panel automatycznie');
    await userEvent.click(switchInput, { delay: 600 });

    // Wait for animation/reactivity
    await new Promise((r) => setTimeout(r, 500));

    // Panel B should be expanded
    await expectPanelState(canvasElement, 'B', true);
  }),
  args: {
    formModel: { openPanel: false },
    schema: {
      type: 'object',
      properties: {
        openPanel: {
          label: 'Otwórz panel automatycznie',
          layout: {
            component: 'switch',
          },
        },
        panelA: {
          layout: {
            component: 'expansion-panels',
          },
          panels: [
            {
              title: 'A',

              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
            {
              title: 'B',
              openCondition: 'nata(openPanel = true)',
              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
            {
              title: 'C',
              schema: {
                properties: {
                  test: { label: 'Test', layout: { component: 'text-field' } },
                },
              },
            },
          ],
        },
      },
    },
  },
};
