<template>
  <div class="node-color-picker">
    <div :class="['mb-1', requiredInputClass, bindClass(schema)]">
      <label class="v-label">
        {{ label }}
      </label>
    </div>

    <v-row
      class="pt-1"
      no-gutters
    >
      <v-col
        class="pa-2"
        cols="auto"
      >
        <v-menu
          v-model="colorMenu"
          :close-on-content-click="false"
        >
          <template #activator="{ props }">
            <v-btn
              :elevation="selectedColor ? 5 : 2"
              icon
              size="x-small"
              :disabled="isReadonlyOrDisabled"
              v-bind="props"
            >
              <div class="color-rainbow">
                <div
                  class="rainbow-circle"
                  :style="selectedColor ? { background: selectedColor } : undefined"
                ></div>
              </div>
            </v-btn>
          </template>

          <v-card flat>
            <v-card-text class="pa-2 pb-0">
              <v-switch
                class="ml-2"
                v-model="advanceMode"
                :label="t('advanceMode')"
                density="compact"
                hide-details="auto"
              ></v-switch>

              <v-color-picker
                v-if="!advanceMode"
                v-model="colorPicker"
                hide-canvas
                hide-inputs
                hide-sliders
                show-swatches
                swatches-max-height="327"
              ></v-color-picker>

              <v-color-picker
                v-else
                v-model="colorPicker"
              ></v-color-picker>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>

    <v-input
      ref="inputRef"
      :model-value="selectedColor"
      :class="bindClass(schema) + requiredInputClass"
      :rules="activeRules"
      v-bind="inputProps"
    ></v-input>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { computed, onMounted, ref, toRef, watch } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineField } from '@/types/engine/EngineField';

const { schema, model, validationsDisabled } = defineProps<{
  schema: EngineField;
  model: object;
  validationsDisabled: boolean;
}>();

const { t } = useI18n();
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass, inputRef } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { onChange } = useEventHandler();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => validationsDisabled),
  rules,
});

const colorMenu = ref(false);
const colorPicker = ref<string>('#000000');
const advanceMode = ref(false);

const inputProps = computed(() => {
  const { palette, upperText: _upperText, ...rest } = fieldProps.value;
  return rest;
});

const selectedColor = computed({
  get(): string {
    return getValue(model, schema);
  },
  set(val: string) {
    setValue(val, schema);
  },
});

const isReadonlyOrDisabled = computed(() => {
  return !!fieldProps.value.readonly || !!fieldProps.value.disabled;
});

watch(
  () => selectedColor.value,
  (val) => {
    if (typeof val === 'string' && val !== '' && val !== colorPicker.value) {
      colorPicker.value = val;
    }
  },
  { immediate: true },
);

watch(colorPicker, (val) => {
  if (!val || val === selectedColor.value || isReadonlyOrDisabled.value) return;
  selectedColor.value = val;
  onChange(schema, model);
});

onMounted(async () => {
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  if (typeof selectedColor.value === 'string' && selectedColor.value !== '') {
    colorPicker.value = selectedColor.value;
  }
});
</script>

<style lang="scss" scoped>
.color-rainbow {
  width: 32px;
  height: 32px;
  position: relative;
}

.rainbow-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #8b00ff,
    #ff0000
  );
}
</style>

<i18n lang="json">
{
  "en": {
    "defaultUpperText": "Select color",
    "advanceMode": "Advanced mode"
  },
  "pl": {
    "defaultUpperText": "Wskaz kolor",
    "advanceMode": "Tryb zaawansowany"
  },
  "ru": {
    "defaultUpperText": "Vyberite tsvet",
    "advanceMode": "Rasshirennyy rezhim"
  },
  "de": {
    "defaultUpperText": "Wahlen Sie Farbe",
    "advanceMode": "Erweiterter Modus"
  }
}
</i18n>
