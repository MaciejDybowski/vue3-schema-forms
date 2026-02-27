<template>
  <v-card v-bind="cardProps">
    <v-card-title
      :class="[
        theme.global.current.value.dark ? titleBgColor.replaceAll('light', 'dark') : titleBgColor,
      ]"
    >
      {{ title }}
    </v-card-title>
    <v-card-text>
      <form-root
        class="pt-2"
        v-if="jsonSchemaOfGroup"
        :model="model"
        :options="computedOptions"
        :schema="jsonSchemaOfGroup"
        @update:model="updateModel"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';

import { computed, onMounted, ref } from 'vue';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { EngineCardComponent } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineCardComponent;
  model: object;
}>();

const theme = useTheme();
const { setValue } = useFormModel();
const { resolve } = useResolveVariables();

const jsonSchemaOfGroup = ref<any>(null);

function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: props.schema.on } as any);
}

const computedOptions = computed(() => {
  const layoutProps = props.schema.layout?.props;

  if (!layoutProps || Object.keys(layoutProps).length === 0) {
    return props.schema.options;
  }

  const originalOptions: any = props.schema.options || {};
  const newOptions: any = {};

  // Skopiuj każdy zagnieżdżony obiekt, aby nie mutować oryginalnych (mogą być non-extensible)
  Object.keys(originalOptions).forEach((key) => {
    const opt = originalOptions[key] || {};
    newOptions[key] = { ...opt };
  });

  // Teraz bezpiecznie ustawiaj layoutProps na skopiowanych obiektach
  Object.keys(layoutProps).forEach((lpKey) => {
    Object.keys(newOptions).forEach((newOptionsKey) => {
      newOptions[newOptionsKey][lpKey] = layoutProps[lpKey];
    });
  });

  return newOptions;
});
const title = ref('');

const cardProps = computed(() => {
  if (props.schema.layout.cardProps) {
    const copy = { ...props.schema.layout.cardProps };
    delete copy['cardTitleClass'];
    return copy;
  }
  return null;
});

const titleBgColor = computed(() => {
  return props.schema.layout?.cardProps?.cardTitleClass || '';
});

onMounted(async () => {
  if (props.schema.title) {
    const { resolvedText, allVariablesResolved } = await resolve(props.schema, props.schema.title);
    if (allVariablesResolved) title.value = resolvedText;
  }
  jsonSchemaOfGroup.value = props.schema.layout.schema;
});
</script>

<style lang="scss" scoped></style>
