## Vue3 Json Schema Form powered by Vuetify

Create dynamic and user-friendly forms effortlessly with the Vue3 and Vuetify.
This library is designed to simplify form creation by leveraging the JSON Schema format.

Inspired by https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/

## ToDo List

- [ ] Odłączenie translacji od i18n bo w sumie to nie trzeba
- [ ] Sekcja powielana i draggable
- [ ] Przemyśleć sekcje edytowalne

## Installation

You can install `vue3-schema-forms` using npm:

```bash
npm install vue3-schema-forms
```

## Usage

```javascript
// index.ts
import VueSchemaForms from "vue3-schema-forms"

const app = createApp(App)
app.use(Vue3SchemaForms)
app.mount("#app")
```

Po zaimportowaniu pluginu możemy wywołać komponent generujący formularze i przekazać odpowiednie props'y

```vue
// someComponent.vue
<vue-schema-forms v-model='model' :schema='schema' :options='formOptions' />
```

Przykładowe propsy

```javascript
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
})
```
