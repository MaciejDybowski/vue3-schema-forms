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
import { debounce, merge } from "lodash";
import { ref, useAttrs } from "vue";
import { VTextField } from "vuetify/lib/components/index.mjs";

const model = defineModel();
const props = defineProps<{
  headerKey: string;
}>();
const emit = defineEmits<{
  (e: "update:row", val: any): void;
}>();
const attrs = useAttrs();
const showInput = ref(false);
const editableCellRef = ref<InstanceType<typeof VTextField>>();
const debounced = {
  save: debounce(saveValue, 100),
};
const isSaving = ref(false);

async function saveValue() {
  try {
    console.debug(`Trying save value ${model.value} to API`);
    // TODO API call and response = full row
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const payload = {};
    payload[props.headerKey] = model.value;

    emit("update:row", payload);
  } catch (e) {
    console.error(e);
  } finally {
    showInput.value = false;
  }
}
</script>
