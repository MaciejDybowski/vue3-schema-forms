// @ts-nocheck
import { StoryFn } from "@storybook/vue3";

import { defineComponent, ref } from "vue";
import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

export default defineComponent({
  components: { VueSchemaForms },
});

export const StoryTemplate: StoryFn<typeof VueSchemaForms> = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueSchemaForms },
  setup(args) {
    return { args };
  },
  template: `
    <v-container class='mx-2'>
      <vue-schema-forms
        v-model='args.model'
        :schema='args.schema'
        :options='args.options'
      />
    </v-container>
  `,
});

export const StoryTemplateWithValidation: StoryFn<typeof VueSchemaForms> = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueSchemaForms },
  setup(args) {
    const form = ref();
    const model = ref(args.modelValue);
    return {
      args,
      form,
      model,
    };
  },
  template: `
    <v-container class='mx-2'>
      <vue-schema-forms
        v-model='model'
        :schema='args.schema'
        :options='args.options'
        :default-form-actions='true'
        :validation-behaviour="'messages'"
      >
      </vue-schema-forms>
    </v-container>
  `,
});

export const StoryTemplateWithCustomValidation: StoryFn<typeof VueSchemaForms> = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueSchemaForms },
  setup(args) {
    const myForm = ref();
    const model = ref(args.modelValue);

    async function validate() {
      const { valid } = await myForm.value.validate();
      window.alert("Validation result: " + valid);
    }

    return {
      myForm,
      args,
      validate,
      model,
    };
  },
  template: `
    <v-container class='mx-2'>
      <vue-schema-forms
        ref='myForm'
        v-model='model'
        :schema='args.schema'
        :options='args.options'
      >
        <template #formActions>
          <v-row>
            <v-col>
              <v-btn color='primary'
                     @click='validate'
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </vue-schema-forms>
    </v-container>
  `,
});
