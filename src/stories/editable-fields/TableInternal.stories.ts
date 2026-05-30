// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../../types/schema/Schema';

export default {
  title: 'Components/Editable/TableInternal',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

const rows = [
  {
    id: 1,
    name: 'Wheat contract',
    status: 'ACTIVE',
    active: true,
    category: 'grain',
    amount: 1200,
    owner: { country: 'PL' },
  },
  {
    id: 2,
    name: 'Archived barley',
    status: 'ARCHIVED',
    active: false,
    category: 'grain',
    amount: 850,
    owner: { country: 'PL' },
  },
  {
    id: 3,
    name: 'Rapeseed premium',
    status: 'ACTIVE',
    active: true,
    category: 'oilseed',
    amount: 2400,
    owner: { country: 'DE' },
  },
  {
    id: 4,
    name: 'Draft corn',
    status: 'DRAFT',
    active: false,
    category: 'grain',
    amount: 400,
    owner: { country: 'CZ' },
  },
  {
    id: 5,
    name: 'Sunflower active',
    status: 'ACTIVE',
    active: true,
    category: 'oilseed',
    amount: 980,
    owner: { country: 'PL' },
  },
];

const displayHeaders = [
  {
    title: 'Name',
    key: 'name',
    valueMapping: 'name',
    type: 'TEXT',
  },
  {
    title: 'Status',
    key: 'status',
    valueMapping: 'status',
    type: 'TEXT',
  },
  {
    title: 'Category',
    key: 'category',
    valueMapping: 'category',
    type: 'TEXT',
  },
  {
    title: 'Amount',
    key: 'amount',
    valueMapping: 'amount',
    type: 'NUMBER',
  },
  {
    title: 'Country',
    key: 'country',
    valueMapping: 'owner.country',
    type: 'TEXT',
  },
];

const editableHeaders = [
  {
    title: 'Name',
    key: 'name',
    valueMapping: 'name',
    editable: [
      {
        label: 'Name',
        key: 'name',
        valueMapping: 'name',
        type: 'TEXT',
      },
    ],
  },
  {
    title: 'Status',
    key: 'status',
    valueMapping: 'status',
    editable: [
      {
        label: 'Status',
        key: 'status',
        valueMapping: 'status',
        type: 'SELECT',
        source: [
          { id: 'ACTIVE', label: 'ACTIVE' },
          { id: 'DRAFT', label: 'DRAFT' },
          { id: 'ARCHIVED', label: 'ARCHIVED' },
        ],
      },
    ],
  },
  {
    title: 'Amount',
    key: 'amount',
    valueMapping: 'amount',
    editable: [
      {
        label: 'Amount',
        key: 'amount',
        valueMapping: 'amount',
        type: 'NUMBER',
      },
    ],
  },
];

const internalActionHeader = {
  title: 'Actions',
  key: 'actions',
  mode: 'inline',
  actions: [
    {
      title: 'Duplicate',
      icon: 'mdi-content-copy',
      mode: 'internal',
      config: {
        code: 'duplicate',
      },
    },
    {
      title: 'Delete',
      icon: 'mdi-delete-outline',
      mode: 'internal',
      config: {
        code: 'delete',
      },
      props: {
        color: 'error',
      },
    },
  ],
};

function tableSchema(rowVisibleCondition?: string, headers = displayHeaders): Schema {
  return {
    type: 'object',
    properties: {
      description: {
        content: rowVisibleCondition
          ? `Visible rows JSONata: ${rowVisibleCondition}`
          : 'Internal table without row filtering',
        layout: {
          component: 'static-content',
          tag: 'p',
        },
      },
      contracts: {
        layout: {
          component: 'table-internal',
        },
        source: {
          rowVisibleCondition,
          headers,
        },
      },
    },
  } as Schema;
}

function tableWithDataPathSchema(): Schema {
  return {
    type: 'object',
    properties: {
      description: {
        content: 'Internal table reads rows from dataPath: contractData.items',
        layout: {
          component: 'static-content',
          tag: 'p',
        },
      },
      contractsTable: {
        dataPath: 'contractData.items',
        layout: {
          component: 'table-internal',
        },
        source: {
          rowVisibleCondition: 'status != "ARCHIVED"',
          headers: editableHeaders,
        },
      },
    },
  } as Schema;
}

function tableWithItemsFilterSchema(): Schema {
  return {
    type: 'object',
    properties: {
      statusFilter: {
        label: 'Status filter',
        layout: {
          component: 'select',
        },
        source: {
          items: [
            { value: 'ACTIVE', title: 'ACTIVE' },
            { value: 'DRAFT', title: 'DRAFT' },
            { value: 'ARCHIVED', title: 'ARCHIVED' },
          ],
        },
      },
      contracts: {
        triggers: ['statusFilter'],
        layout: {
          component: 'table-internal',
        },
        source: {
          itemsFilter: 'items[status = {statusFilter}]',
          headers: displayHeaders,
        },
      },
    },
  } as Schema;
}

function tableWithDataPathItemsFilterSchema(): Schema {
  return {
    type: 'object',
    properties: {
      countryFilter: {
        label: 'Country filter',
        layout: {
          component: 'select',
        },
        source: {
          items: [
            { value: 'PL', title: 'PL' },
            { value: 'DE', title: 'DE' },
            { value: 'CZ', title: 'CZ' },
          ],
        },
      },
      contractsTable: {
        dataPath: 'contractData.items',
        triggers: ['countryFilter'],
        layout: {
          component: 'table-internal',
        },
        source: {
          itemsFilter: 'items[owner.country = {countryFilter}]',
          headers: displayHeaders,
        },
      },
    },
  } as Schema;
}

function model() {
  return {
    contracts: rows.map((row) => ({ ...row, owner: { ...row.owner } })),
  };
}

function nestedModel() {
  return {
    contractData: {
      items: rows.map((row) => ({ ...row, owner: { ...row.owner } })),
    },
  };
}

function filterModel() {
  return {
    statusFilter: 'ACTIVE',
    contracts: rows.map((row) => ({ ...row, owner: { ...row.owner } })),
  };
}

function nestedFilterModel() {
  return {
    countryFilter: 'PL',
    contractData: {
      items: rows.map((row) => ({ ...row, owner: { ...row.owner } })),
    },
  };
}

function paginationModel() {
  return {
    contracts: Array.from({ length: 15 }, (_, index) => {
      const row = rows[index % rows.length];
      return {
        ...row,
        id: index + 1,
        name: `${row.name} ${index + 1}`,
        owner: { ...row.owner },
      };
    }),
  };
}

export const Standard: Story = {
  name: 'Standard: All Rows',
  args: {
    formModel: model(),
    schema: tableSchema(),
  },
};

export const TwoTablesFieldsGroup: Story = {
  name: 'Two Tables from One Key - Fields Group',
  args: {
    formModel: model(),
    schema: {
      properties: {
        contracts: {
          layout: {
            component: 'table-internal',
          },
          source: {
            headers: displayHeaders,
            rowVisibleCondition: 'status="ARCHIVED"',
          },
        },
        fieldsGroup: {
          layout: {
            component: 'fields-group',
            schema: {
              properties: {
                contracts: {
                  layout: {
                    component: 'table-internal',
                  },
                  source: {
                    headers: displayHeaders,
                    rowVisibleCondition: 'active=true',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const TwoTablesWithDataPath: Story = {
  name: 'Two Tables from One Key - Data Path',
  args: {
    formModel: model(),
    schema: {
      properties: {
        tableOne: {
          dataPath: 'contracts',
          layout: {
            component: 'table-internal',
          },
          source: {
            headers: displayHeaders,
            rowVisibleCondition: 'status="ARCHIVED"',
          },
        },
        tableTwo: {
          dataPath: 'contracts',
          layout: {
            component: 'table-internal',
          },
          source: {
            headers: displayHeaders,
            rowVisibleCondition: 'active=true',
          },
        },
      },
    },
  },
};

export const ActiveRowsOnly: Story = {
  name: 'Filter: Active = True',
  args: {
    formModel: model(),
    schema: tableSchema('active = true'),
  },
};

export const ExcludeArchived: Story = {
  name: 'Filter: Status Not Archived',
  args: {
    formModel: model(),
    schema: tableSchema('status != "ARCHIVED"'),
  },
};

export const HighAmountRows: Story = {
  name: 'Filter: Amount > = 1000',
  args: {
    formModel: model(),
    schema: tableSchema('amount >= 1000'),
  },
};

export const NestedCountryRows: Story = {
  name: 'Filter: Nested Owner.country',
  args: {
    formModel: model(),
    schema: tableSchema('owner.country = "PL"'),
  },
};

export const CombinedCondition: Story = {
  name: 'Filter: Combined Condition',
  args: {
    formModel: model(),
    schema: tableSchema('active = true and amount > 1000 and owner.country = "PL"'),
  },
};

export const EditableRowsWithFilter: Story = {
  name: 'Editable: Row Disappears After Status Change',
  args: {
    formModel: model(),
    schema: tableSchema('status != "ARCHIVED"', editableHeaders),
  },
};

export const InternalActionsWithHiddenRows: Story = {
  name: 'Internal Actions: Filtered Index Mapping',
  args: {
    formModel: model(),
    schema: tableSchema('active = true', [...displayHeaders, internalActionHeader]),
  },
};

export const DataPath: Story = {
  name: 'Data Path: Model Path',
  args: {
    formModel: nestedModel(),
    schema: tableWithDataPathSchema(),
  },
};

export const Pagination: Story = {
  name: 'Pagination: Internal Rows Are Sliced',
  args: {
    formModel: paginationModel(),
    schema: tableSchema(),
  },
};

export const ItemsFilterByModelVariable: Story = {
  name: 'Items Filter: Status from Model Variable',
  args: {
    formModel: filterModel(),
    schema: tableWithItemsFilterSchema(),
  },
};

export const DataPathItemsFilterByModelVariable: Story = {
  name: 'Items Filter: Data Path and Model Variable',
  args: {
    formModel: nestedFilterModel(),
    schema: tableWithDataPathItemsFilterSchema(),
  },
};
