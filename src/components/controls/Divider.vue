<template>
  <v-divider
    :thickness="thickness"
    :class="`border-opacity-${opacity}` + bindClass(schema)"
    :color="color"
    v-bind="fieldProps"
    :style="fieldProps.vertical ? `min-height:100%` : ``"
  ></v-divider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useClass, useProps } from '@/core/composables';
import { EngineDividerField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineDividerField;
  model: object;
}>();

const thickness = computed(() => {
  if (props.schema.thickness) {
    return props.schema.thickness;
  } else {
    return undefined;
  }
});

const color = computed(() => {
  if (props.schema.color) {
    return props.schema.color;
  } else {
    return undefined;
  }
});

const opacity = computed(() => {
  if (props.schema.opacity) {
    return props.schema.opacity;
  } else {
    return 'default';
  }
});

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();

onMounted(async () => {
  await bindProps(props.schema);
});
</script>

<style scoped lang="css"></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
