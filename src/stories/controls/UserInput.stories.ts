// @ts-nocheck
import { USER_INPUT_MOCKS } from "../mock-responses";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

export default {
  title: "Forms/Controls/UserInput",
  ...formStoryWrapperTemplate,
};

// TODO - napisać testy !!!!!!

export const Standard: Story = {
  play: async (context) => {},
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        user: {
          label: "User",
          layout: {
            cols: 12,
            component: "user-input",
          },
          source: {
            url: "/mocks/users",
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const LimitModel: Story = {
  name: "Case: model = object, multiple = false",
  play: async (context) => {},
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        user: {
          label: "User",
          layout: {
            cols: 12,
            component: "user-input",
            props: {
              multiple: false,
            },
          },
          source: {
            url: "/mocks/users",
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const LimitModelArray: Story = {
  name: "Case: model = array, maxSelection enabled",
  play: async (context) => {},
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        user: {
          label: "User",
          layout: {
            cols: 12,
            component: "user-input",
            props: {
              maxSelection: 2,
              multiple: true,
            },
          },
          source: {
            url: "/mocks/users",
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const AutoSelect: Story = {
  name: "Case: autoselect",
  play: async (context) => {},
  args: {
    formModel: {
      owner: {
        id: "1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56"
      }
    },
    schema: {
      type: "object",
      properties: {
        user: {
          label: "User",
          layout: {
            cols: 12,
            component: "user-input",
            props: {
              maxSelection: 1,
              multiple: true,
            },
          },
          source: {
            url: "/mocks/users?filter=id=={owner.id}",
            itemsPerPage: 20,
            singleOptionAutoSelect: true,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};
