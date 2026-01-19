<template>
  <template v-for="(item, index) in schema.rulesForAll" :key="index">
    <template v-if="item.blocker == true">
      <v-alert
        type="error"
        variant="outlined"
        v-html="item.visualization"
      >
      </v-alert>
    </template>
    <template v-else>
      <DynamicComponent :template="item.visualization" :context="{ model, ruleResults }" />
    </template>
  </template>
</template>

<script lang="ts" setup>
import jsonata from 'jsonata';
import { debounce } from 'lodash';
import * as Vue from 'vue';

import { computed, defineComponent, getCurrentInstance, h, onMounted, ref, watch } from 'vue';

// Dynamiczny komponent do renderowania szablonów Vuetify w locie
const DynamicComponent = defineComponent({
  name: 'DynamicComponent',
  props: {
    template: {
      type: String,
      required: true,
    },
    context: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // Uzyskaj dostęp do globalnie zarejestrowanych komponentów (Vuetify)
    const instance = getCurrentInstance();
    const appContext = instance?.appContext;

    const compiledComponent = computed(() => {
      if (!props.template) return null;

      try {
        // Kompilacja szablonu w locie - compile() zwraca render function
        const render = Vue.compile(props.template);

        return defineComponent({
          render,
          // Przekazanie kontekstu jako data() dla dostępu w szablonie
          data() {
            return { ...props.context };
          },
        });
      } catch (e) {
        console.error('Template compilation error:', e);
        return null;
      }
    });

    return () => {
      if (compiledComponent.value) {
        // Tworzymy VNode z kontekstem aplikacji, żeby komponenty Vuetify były dostępne
        const vnode = h(compiledComponent.value);
        if (appContext) {
          vnode.appContext = appContext;
        }
        return vnode;
      }
      return h('div', { class: 'error' }, 'Template compilation failed');
    };
  },
});

const { schema, model } = defineProps<{
  schema: any;
  model: object;
}>();
// Reaktywna mapa wyników reguł
const ruleResults = ref<Record<string, any>>({});
const debounced = {
  recalculate: debounce(evaluateAll, 200),
};

async function evaluateRule(def: any, key: string) {
  try {
    const expr = jsonata(def.rule);
    console.debug(def.rule, model, await expr.evaluate(model));
    ruleResults.value[key] = await expr.evaluate(model);
  } catch (e) {
    ruleResults.value[key] = { error: (e as Error).message };
  }
}

async function evaluateAll() {
  const rules = schema?.rulesForAll;
  if (!Array.isArray(rules)) return;

  await Promise.all(
    rules.map((def: any, idx: number) => {
      console.log(def)
      const key = def.name ;
      ruleResults.value[key] = undefined;
      return evaluateRule(def, key);
    }),
  );
}

onMounted(() => {
  evaluateAll();
});

watch(
  () => model,
  () => {
    console.debug('here');
    debounced.recalculate();
  },
  { deep: true },
);
</script>

<style scoped></style>
