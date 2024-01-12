## Vue3 Json Schema Form powered by Vuetify

Create dynamic and user-friendly forms effortlessly with the Vue3 and Vuetify.
This library is designed to simplify form creation by leveraging the JSON Schema format.

Inspired by https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/

## Documentation

The documentation and some of the testing was based on the Storybook
application [click here](https://maciejdybowski.github.io/vue3-schema-forms/)

Check the changelog here => [latest](https://maciejdybowski.github.io/vue3-schema-forms/?path=/docs/changelog--docs)

## Installation

You can install `vue3-schema-forms` using npm:

```bash
npm install vue3-schema-forms
```

## Basic Usage

```javascript
// index.ts
import { createVueSchemaForms } from 'vue3-schema-forms';

const schemaForms = createVueSchemaForms({});

createApp(App)
  .use(schemaForms)
  .mount('#app');
```

After importing the plugin, we can invoke the form-generating component and pass the appropriate props.

```javascript
// someComponent.vue
<vue-schema-forms
  v-model="model" 
  :schema = "schema"
:
options = "formOptions"
  / >

const formOptions = ref({})
const model = ref({})
const schema = ref({
  type: "object",
  properties: {
    field1: {
      label: "Field 1",
      layout: {
        component: "text-field",
      },
    },
  },
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

| Name               | Default                                                                                                      | Type   | Description                                               |
|--------------------|--------------------------------------------------------------------------------------------------------------|--------|-----------------------------------------------------------|
| digitsAfterDecimal | -                                                                                                            | number | Number of decimal places in the representation of numbers |
| fieldProps         | -                                                                                                            | object | Option to set props for each type of field                |
| textFieldProps     | <pre><code>{<br>  "hide-details": "auto"<br>}</code></pre>                                                   | object | Option to set props for text fields                       |
| textAreaProps      | <pre><code>{<br>  "rows": 3,<br>  "hide-details": "auto",<br>  "auto-grow": true, <br>}</code></pre>         | object | Option to set props for text-area fields                  |
| radioButtonProps   | <pre><code>{<br>  "density": "compact",<br>  "hide-details": "auto",<br>}</code></pre>                       | object | Option to set props for radio fields                      |
| buttonProps        | -                                                                                                            | object | Option to set props for button (duplicated section)       |
| checkboxProps      | <pre><code>{<br>  "density": "compact",<br>  "hide-details": "auto",<br>  "multiple": true<br>}</code></pre> | object | Option to set props for checkbox fields                   |
| selectProps        | <pre><code>{<br>  "hide-details": "auto"<br>}</code></pre>                                                   | object | Option to set props for autocomplete/select fields        |

#### Component slots

| Name        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| formActions | The slot contains predefined default actions for the form: validation, reset validation and reset form. The user is free to override this slot and write his own buttons using exposed functions from the component. Just give "ref" and enjoy a ready-made validation function that takes 3 options: no parameter / scroll / messages [example](https://maciejdybowski.github.io/vue3-schema-forms/?path=/story/forms-features-validations--add-custom-submit-with-built-in-validation) |

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

## ToDo List

- [ ] create useLabel composable with dependency
- [ ] Signal for form is ready (for autosave but after initial model changes)
- [ ] Create date/datetime field
- [ ] Use resolveDepsComposable for deps on fields
- [ ] Create editable sections
- [ ] Change to use Engine props (decomposition)
