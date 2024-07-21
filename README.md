## Vue3 Json Schema Form powered by Vuetify 🚀

Create dynamic and user-friendly forms effortlessly with the Vue3 and Vuetify.
This library is designed to simplify form creation by leveraging the JSON Schema format.

Inspired by https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/

## Documentation

The documentation and some of the testing was based on the Storybook
application 👉 [live](https://maciejdybowski.github.io/vue3-schema-forms/)

Check the changelog here 👉 [@latest](https://maciejdybowski.github.io/vue3-schema-forms/?path=/docs/changelog--docs)

Sample app with schema forms configuration 👉 [here](https://github.com/MaciejDybowski/vue3-schema-forms-demo-app)

## Requirements

To relieve the library of dependencies as ```peerDependencies``` library takes:

* ```vue@3.4.3```
* ```vuetify@3.4.9```
* ```axios@1.6.2``` - in order to maintain the configuration from the host (e.g. token interceptor)
* ```dayjs@1.11.10``` - management and formatting of dates including time zones,
* ```pinia@2.1.7``` - managing the status of each form, reference values
* ```vue-i18n@9.6.4``` - handling translations in the library
* ```vuedraggable@4.1.0``` - support for drag&drop interaction

For manage SFC i18n translation ```devDependencies```:

* ```intlify/unplugin-vue-i18n@0.13.0```

```bash
npm i vue@3.4.14 vuetify@3.5.1 axios@1.6.5 dayjs@1.11.10 pinia@2.1.7 vue-i18n@9 vuedraggable@next
```

```bash
npm install -dev @intlify/unplugin-vue-i18n@0.13.0
```

## Installation

You can install `vue3-schema-forms` using [npm](https://www.npmjs.com/package/vue3-schema-forms):

```bash
npm install vue3-schema-forms
```

## Usage

```typescript
import { createVueSchemaForms } from 'vue3-schema-forms';

const schemaForms = createVueSchemaForms({});

createApp(App)
  .use(schemaForms)
  .mount('#app');
```

After importing the plugin, we can invoke the form-generating component and pass the appropriate props.

```vue

<template>
  <vue-schema-forms
    v-model='model'
    :schema='schema'
    :options='formOptions'
    :default-form-actions='true'
    :validation-behaviour="'messages'"
  >
  </vue-schema-forms>
</template>

<script>
  const formOptions = ref({});
  const model = ref({});
  const schema = ref({
    type: 'object',
    properties: {
      field1: {
        label: 'Field 1',
        layout: {
          component: 'text-field',
        },
      },
    },
  });
</script>
```

#### Props description

| Name                | Default  | Type                | Description                                                                                                                                          |
|---------------------|----------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| model               | -        | object              | json object in which the values collected by the form will be stored                                                                                 |
| schema              | -        | Schema              | JSON object conforming to the defined Schema interface, is responsible for the appearance, layout and type of fields generated by the form component |
| options             | -        | object              | JSON object in which the user can define options common to multiple form fields                                                                      |
| defaultFormActions  | false    | boolean             | flag, which is responsible for the visibility of the default form buttons in the #formActions slot                                                   |
| validationBehaviour | "scroll" | ValidationBehaviour | A flag that defines the validation behavior after a failed attempt to validate the form. Available options "scroll" / "messages"                     |

#### Options

In options, there are priorities in setting props for form fields:

1. Defaults (!)
2. FieldProps (!!)
3. InputType Props (!!!)
4. Specific props defined in layout (!!!!)

Example: If when defining a layout you specify props as they are in the default they will be overwritten

The following table shows the default values for each field

| Name               | Default                                                                 | Type   | Description                                               |
|--------------------|-------------------------------------------------------------------------|--------|-----------------------------------------------------------|
| digitsAfterDecimal | 2                                                                       | number | Number of decimal places in the representation of numbers |
| fieldProps         | -                                                                       | object | Option to set props for each type of field                |
| textFieldProps     | ```{'hide-details': 'auto',}```                                         | object | Option to set props for text fields                       |
| textAreaProps      | ```{"rows": 3, "hide-details": "auto", "auto-grow": true}```            | object | Option to set props for text-area fields                  |
| radioButtonProps   | ```{"density": "compact", "hide-details": "auto"}```                    | object | Option to set props for radio fields                      |
| buttonProps        | -                                                                       | object | Option to set props for button (duplicated section)       |
| checkboxProps      | ```{"density": "compact", "hide-details": "auto", "multiple": true }``` | object | Option to set props for checkbox fields                   |
| selectProps        | ```{"hide-details": "auto"}```                                          | object | Option to set props for autocomplete/select fields        |

#### Component slots

| Name        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| formActions | The slot contains predefined default actions for the form: validation, reset validation and reset form. The user is free to override this slot and write his own buttons using exposed functions from the component. Just give "ref" and enjoy a ready-made validation function that takes 3 options: no parameter / scroll / messages [example](https://maciejdybowski.github.io/vue3-schema-forms/?path=/story/forms-features-validations--add-custom-submit-with-built-in-validation) |

## Integrated fields

| Name          | Default settings                                                                                                                                                                                   | Component | Description                                        | Link                                                                       |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------|----------------------------------------------------------------------------|
| v-phone-input | <pre>{<br>  'country-icon-mode': 'svg',<br>  'countryLabel': t('countryLabel'),<br>  'guess-country': true, <br>  'include-countries': ['pl', 'gb', 'ru', 'de', 'us', 'es', 'fr', 'it']<br>}</pre> | phone     | International phone field for Vuetify 3 and Vue 3. | [source](https://github.com/paul-thebaud/v-phone-input?tab=readme-ov-file) |

## Plugin options

| Name             | Default | Type       | Description                                                                                                                                                                |
|------------------|---------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| formUpdateLogger | false   | boolean    | enabling this option allows the console to preview the form model update event                                                                                             |
| customComponents | -       | Components | This option allows you to install your custom form fields. You need to specify the name and the component. The integration is on your side using the composables provided. |

```typescript
// example of adding options
const customs = {
  'user-input': UserInput,
};

const vueSchemaForms = createVueSchemaForms({
  customComponents: customs,
  formUpdateLogger: true
});
```

## Tests

1. ```cd``` to the project directory
2. Install development dependencies: ```npm install```
3. Run the tests: ```npm test```
4. Run the storybook: ```npm run storybook```
5. Run storybook tests: ```npm run test-storybook```

## Contributing

1. Fork it!
2. Create your feature branch: ```git checkout -b my-new-feature```
3. Commit your changes: ```git commit -am 'Add some feature'```
4. Push to the branch: ```git push origin my-new-feature```
5. Submit a pull request
