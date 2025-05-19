// @ts-nocheck
import { schemaWithTranslation } from "@/stories/schemas";

import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";


export default {
  title: "Features/Translations",
  ...formStoryWrapperTemplate,
};
/**
 * #### Translations for Any Text in the Form
 * `label: { $ref: '#/i18n/~$locale~/your_i18n_key' }` - the translation definition relies on the i18n plugin
 *
 * `i18n: object` - when defining the form schema, include an object with translations.
 * ##### !!! The schema is translated at the very beginning of the rendering process; changing the language "live" can be costly and requires re-rendering the entire form. !!!
 */
export const TranslationWithI18n: Story = {
  name: "Translations with i18n",
  args: {
    schema: schemaWithTranslation,
  },
};
