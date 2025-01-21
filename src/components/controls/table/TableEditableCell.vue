<template>
  <div>
    <span
      v-if="!showInput && model != null"
      class="text-decoration-underline cursor-pointer"
      @click="showInput = true"
    >
      {{ model }}
    </span>
    <v-btn
      v-else-if="!showInput && (model == '' || model == null)"
      icon="mdi-pencil"
      size="x-small"
      @click="showInput = true"
    />
    <div
      v-else
      class="d-flex align-center"
    >
      <v-text-field
        ref="editableCellRef"
        v-model="model"
        clearable
        v-bind="{
          ...attrs,
          density: 'compact',
          autofocus: true,
        }"
        @blur="debounced.save(false)"
        @click:append-inner="model = null"
        @keyup.enter="editableCellRef ? editableCellRef.blur() : null"
        @keyup.esc="showInput = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import { ref, useAttrs } from "vue";
import { VTextField } from "vuetify/lib/components/index.mjs";

const model = defineModel();
const emit = defineEmits<{
  (e: "update:row", val: any): void;
}>();
const attrs = useAttrs();
const showInput = ref(false);
const editableCellRef = ref<InstanceType<typeof VTextField>>();
const debounced = {
  save: debounce(saveValue, 100),
};

async function saveValue() {
  emit("update:row", model.value);
  showInput.value = false;
}
</script>
