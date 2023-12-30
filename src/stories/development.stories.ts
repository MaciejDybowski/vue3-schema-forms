// @ts-nocheck
import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import {Schema} from '@/vocabulary/schema';
import {SchemaField} from '@/vocabulary/schema/elements';

const meta = {
    title: 'Development Page',
    component: DevelopmentTable,
    argTypes: {
        schema: {control: 'object', description: 'Schema u'},
        model: {control: 'object', description: 'Model'},
        options: {control: 'object', description: 'Opcje'},
    } as Partial<ArgTypes<any>>,
    args: {
        options: {
            fieldProps: {
                variant: 'outlined',
                density: 'comfortable',
            },
        },
        model: {},
    },
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Table1: Story = {
    args: {
        model: {},
        schema: {
            type: 'object',
            properties: {
                test: {
                    layout: {
                        component: 'duplicated-section',
                        schema: {
                            properties: {
                                product: {
                                    label: "product",
                                    layout: {component: "text-field"}
                                }
                            },
                            required: ['product']
                        }
                    }
                } as SchemaField,
                field1: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field2: {label: 'First name', layout: {component: 'text-field'}} as SchemaField,
                field3: {label: 'Last name', layout: {component: 'text-area', props: {counter: 10}}} as SchemaField,
                field4: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field5: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field6: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field7: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field8: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field9: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field10: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field11: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field12: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field13: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field14: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field15: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field16: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field17: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field18: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field19: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field20: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field21: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field22: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field23: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field24: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
                field25: {label: 'Field 1', layout: {component: 'text-field'}} as SchemaField,
            },
            required: ['field3', 'field2'],
        } as Schema,
    },
};


