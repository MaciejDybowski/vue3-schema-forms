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

Po zaimportowaniu pluginu możemy wywołać komponent generujący formularze i przekazać odpowiednie props'y

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

In progress:
- [ ] Create editable sections

