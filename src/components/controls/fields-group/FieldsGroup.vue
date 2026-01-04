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

  const newOptions: any = { ...props.schema.options };

  Object.keys(layoutProps).forEach((key) => {
    Object.keys(newOptions).forEach((newOptionsKey) => {
      newOptions[newOptionsKey][key] = layoutProps[key];
    });
  });

  return newOptions;
});

onMounted(() => {
  jsonSchemaOfGroup.value = props.schema.layout.schema;
});
</script>

<style lang="scss" scoped></style>
