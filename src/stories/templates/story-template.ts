// @ts-nocheck
import { StoryFn } from "@storybook/vue3"

import { ref } from "vue"
import { VueSchemaForms } from "@/components"

export const StoryTemplate: StoryFn<typeof VueSchemaForms> = (
  args: any,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { SchemaForm },
  setup() {
    return { args }
  },
  template:
    '<schema-form :schema="args.schema" v-model="args.model" :options="args.options"/>',
})

export const StoryTemplateWithValidation: StoryFn<typeof VueSchemaForms> = (
  args: any,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { VueSchemaForms },
  setup(args) {
    const form = ref()
    const model = ref(args.modelValue)
    const validationResult = ref(false)

    async function validate() {
      const { valid } = await form.value.validate()
      validationResult.value = valid
    }

    function reset() {
      form.value.reset()
      validationResult.value = false
    }

    function resetValidation() {
      form.value.resetValidation()
      validationResult.value = false
    }

    return {
      args,
      validate,
      reset,
      resetValidation,
      form,
      model,
      validationResult,
    }
  },
  template: `
    <v-form ref='form'>
    <vue-schema-forms
      :schema='args.schema'
      v-model='model'
      :options='args.options'
    />
    <div class='d-flex flex-column'>
      <div class='d-flex align-center'>
        <v-btn
          color='success'
          @click='validate'
          width='200'
        >
          Validate
        </v-btn>
        <v-expand-transition>
          <div
            v-if='validationResult'
            class='ml-2'
          >
            <v-icon color='green'>
              mdi-check-circle-outline
            </v-icon>
            <span>Walidacja zakończona sukcesem</span>
          </div>
        </v-expand-transition>

      </div>

      <v-btn
        color='error'
        class='mt-4'
        @click='reset'
        width='200'
      >
        Reset Form
      </v-btn>

      <v-btn
        color='warning'
        class='mt-4'
        @click='resetValidation'
        width='200'
      >
        Reset Validation
      </v-btn>
    </div>
    </v-form>

  `,
})
