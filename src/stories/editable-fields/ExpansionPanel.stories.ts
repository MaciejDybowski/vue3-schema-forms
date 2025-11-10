// @ts-nocheck
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Elements/Editable/ExpansionPanel',
  ...formStoryWrapperTemplate,
};

// TODO - add tests and add test for title dependencies

export const Standard: Story = {
  play: async () => {},
  args: {
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
            {
              title: 'Panel A',
              schema: {
                properties: {
                  textField: {
                    label: 'Pole1',
                    layout: {
                      component: 'text-field',
                    },
                  },
                },
              },
            },
            {
              title: 'Panel B',
              schema: {
                properties: {
                  textFieldTest: {
                    label: 'Pole3',
                    layout: {
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
