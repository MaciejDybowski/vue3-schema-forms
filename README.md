## Vue3 Json Schema Form powered by Vuetify

Create dynamic and user-friendly forms effortlessly with the Vue3 and Vuetify.
This library is designed to simplify form creation by leveraging the JSON Schema format.

Inspired by https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/


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
  :schema="schema" 
  :options="formOptions"
/>

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
## Documentation
The documentation and some of the testing was based on the Storybook application [click here](https://maciejdybowski.github.io/vue3-schema-forms/)

## Tests
1. ```cd``` to the project directory
2. Install development dependencies: ```npm install```
3. Run the tests: ```npm test```
4. Run the storybook: ```npm run storybook```
5. Run storybook tests: ``npm run test-storybook``


## ToDo List
- [ ] Create many basics fields like data/radio/checkbox/combo etc.
- [ ] Use resolveDepsComposable for deps on fields
- [ ] Create editable sections
- [ ] Change to use Engine props (decomposition)
- [ ] i18n [warnings] how to resolve message -> test on library

In progress:



Przypadki testowe
1. reset formularza - czy domyślne zostają
2. reset formularza = null tam gdzie trzeba

