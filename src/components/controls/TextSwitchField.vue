<template>
  <span
    v-if="!localModel && textMode"
    class="link cursor-pointer"
    @click="changeState"
    >{{ schema.content }}
  </span>
  <text-field
    v-else
    :model="model"
    :schema="schema"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';

import TextField from '@/components/controls/TextField.vue';

import { useFormModel } from '@/core/composables';
import { EngineTextSwitchFieldField } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: EngineTextSwitchFieldField;
  model: object;
}>();

const { getValue } = useFormModel();

const textMode = ref(true);
const localModel = computed(() => {
  return getValue(model, schema);
});

watch(
  () => localModel.value,
  () => {
    if (localModel.value === null) {
      textMode.value = true;
    }
  },
);

function changeState() {
  textMode.value = false;
}

onMounted(() => {
  if (localModel.value) {
    textMode.value = false;
  }
});
</script>

<style lang="css" scoped></style>
