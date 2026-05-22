// @ts-nocheck
import { expect, waitFor } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Default value',
  ...formStoryWrapperTemplate,
};

export const JSONataDefaultValue: Story = {
  name: 'Case: JSONata default value',
  play: async (context) => {
    await waitForMountedAsync();
    await waitFor(() => {
      expect(context.args.formModel).toEqual({
        firstName: 'Jan',
        lastName: 'Kowalski',
        fullName: 'Jan Kowalski',
      });
    });
  },
  args: {
    formModel: {
      firstName: 'Jan',
      lastName: 'Kowalski',
    },
    schema: {
      type: 'object',
      properties: {
        firstName: {
          label: 'First name',
          layout: { component: 'text-field' },
        },
        lastName: {
          label: 'Last name',
          layout: { component: 'text-field' },
        },
        fullName: {
          label: 'Full name',
          defaultValue: 'nata(firstName & " " & lastName)',
          layout: { component: 'text-field' },
        },
      },
    } as Schema,
  },
};

export const JSONataDefaultValueInDuplicatedSection: Story = {
  name: 'Case: JSONata default value in duplicated section',
  play: async (context) => {
    await waitForMountedAsync();
    await waitFor(() => {
      expect(context.args.formModel).toEqual({
        people: [
          { firstName: 'Anna', lastName: 'Nowak', fullName: 'Anna Nowak' },
          { firstName: 'Piotr', lastName: 'Kowal', fullName: 'Piotr Kowal' },
        ],
      });
    });
  },
  args: {
    formModel: {
      people: [
        { firstName: 'Anna', lastName: 'Nowak' },
        { firstName: 'Piotr', lastName: 'Kowal' },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        people: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                firstName: {
                  label: 'First name',
                  layout: { component: 'text-field' },
                },
                lastName: {
                  label: 'Last name',
                  layout: { component: 'text-field' },
                },
                fullName: {
                  label: 'Full name',
                  defaultValue: 'nata(people[].firstName & " " & people[].lastName)',
                  layout: { component: 'text-field' },
                },
              },
            },
          },
        },
      },
    } as Schema,
  },
};

export const PlainDefaultValueStillWorks: Story = {
  name: 'Case: plain default value still works',
  play: async (context) => {
    await waitForMountedAsync();
    expect(context.args.formModel).toEqual({
      description: 'Plain text',
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          label: 'Description',
          defaultValue: 'Plain text',
          layout: { component: 'text-field' },
        },
      },
    } as Schema,
  },
};
