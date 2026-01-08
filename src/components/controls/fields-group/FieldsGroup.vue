<template>
  <form-root
    v-if="jsonSchemaOfGroup"
    :model="model"
    :options="computedOptions"
    :schema="jsonSchemaOfGroup"
    @update:model="updateModel"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel } from '@/core/composables';
import { EngineTextField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { setValue } = useFormModel();

const jsonSchemaOfGroup = ref<any>(null);

function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: props.schema.on } as any);
}

const computedOptions = computed(() => {
  const layoutProps = props.schema.layout?.props;

  if (!layoutProps || Object.keys(layoutProps).length === 0) {
    return props.schema.options;
  }

  const originalOptions:any = props.schema.options || {};
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

onMounted(() => {
  jsonSchemaOfGroup.value = props.schema.layout.schema;
});
</script>

<style lang="scss" scoped></style>