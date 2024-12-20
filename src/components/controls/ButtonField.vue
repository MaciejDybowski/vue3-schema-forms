<template>
  <v-btn
    :class='bindClass(schema)'
    v-bind='fieldProps'
    :color='primaryWhite'
  >
    {{ label }}
  </v-btn>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';

import { useClass, useLabel, useProps } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(props.schema);

const theme = useTheme();
const primaryWhite = computed(() => (theme.current.value.dark ? 'white' : 'primary'));

onMounted(async () => {
  await bindLabel(props.schema);
  await bindProps(props.schema);
});

</script>

<style scoped lang='css'></style>
