<template>
  <div>
    <span
      v-if="!showInput && model"
      class="text-decoration-underline cursor-pointer"
      @click="showInput = true"
    >
      {{ model }}
    </span>
    <v-btn
      v-else-if="!showInput && !model"
      icon="mdi-pencil"
      size="x-small"
      @click="showInput = true"
    />
    <div
      v-else
      class="d-flex align-center"
    >
      <v-text-field
        v-model="model"
        clearable
        v-bind="{
          ...attrs,
          density: 'compact',
          autofocus: true,
        }"
        @blur="debounced.save"
        @click:append-inner="model = null"
        @keyup.enter="debounced.save"
        @keyup.esc="showInput = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import { ref, useAttrs } from "vue";

const model = defineModel();
const attrs = useAttrs();
const showInput = ref(false);

const debounced = {
  save: debounce(saveValue, 100),
};

async function saveValue() {
  try {
    console.debug(`Trying save value ${model.value} to API`);
  } catch (e) {
    console.error(e);
  } finally {
    showInput.value = false;
  }
}
</script>
