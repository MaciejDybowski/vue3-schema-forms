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
            <v-badge
              :model-value="!!selectedColor"
              :content="`close`"
              overlap
              offset-y="-5"
              offset-x="-5"
              color="transparent"
              class="badge-wrapper"
              @mouseenter="showBadge = true"
              @mouseleave="showBadge = false"
            >
              <template #badge>
                <div
                  v-show="showBadge && selectedColor && !isReadonlyOrDisabled"
                  class="close-badge"
                  @click.stop="clearColor"
                >
                  <v-icon size="x-small">mdi-close</v-icon>
                </div>
              </template>

              <v-tooltip
                :text="t('pickColorTooltip')"
                :disabled="!!selectedColor"
                location="top"
              >
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    :elevation="selectedColor ? 5 : 0"
                    :variant="selectedColor ? 'elevated' : 'flat'"
                    icon
                    size="x-small"
                    class="color-button"
                    :disabled="isReadonlyOrDisabled"
                    v-bind="mergeProps(props, tooltipProps)"
                  >
                    <div
                      v-if="selectedColor"
                      class="color-rainbow"
                    >
                      <div
                        class="rainbow-circle"
                        :style="{ background: selectedColor }"
                      ></div>
                    </div>
                    <v-icon
                      v-else
                      size="22"
                    >
                      mdi-eyedropper-variant
                    </v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-badge>
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
      :model-value="selectedColor"
      :class="bindClass(schema) + requiredInputClass"
      :rules="activeRules"
      v-bind="inputProps"
    ></v-input>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { computed, mergeProps, onMounted, ref, toRef, watch } from 'vue';

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
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { onChange } = useEventHandler();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => validationsDisabled),
  rules
});

const colorMenu = ref(false);
const colorPicker = ref<string | null>('#000000');
const advanceMode = ref(false);
const showBadge = ref(false);

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
  }
});

const isReadonlyOrDisabled = computed(() => {
  return !!fieldProps.value.readonly || !!fieldProps.value.disabled;
});

const clearColor = () => {
  selectedColor.value = '';
  colorPicker.value = null;
  colorMenu.value = false;
  onChange(schema, model);
};

watch(
  () => selectedColor.value,
  (val) => {
    if (typeof val === 'string' && val !== '' && val !== colorPicker.value) {
      colorPicker.value = val;
    }
  },
  { immediate: true }
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
.badge-wrapper {
  :deep(.v-badge__badge) {
    padding: 0 !important;
  }
}

.close-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: #ff5252;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff1744;
  }
}

.color-rainbow {
  width: 32px;
  height: 32px;
  position: relative;
}

.color-button {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  padding: 0;
  overflow: hidden;
}

.color-button :deep(.v-btn__content) {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    "advanceMode": "Advanced mode",
    "pickColorTooltip": "Click to pick a color"
  },
  "pl": {
    "defaultUpperText": "Wskaz kolor",
    "advanceMode": "Tryb zaawansowany",
    "pickColorTooltip": "Kliknij aby wybrać kolor"
  },
  "ru": {
    "defaultUpperText": "Vyberite tsvet",
    "advanceMode": "Rasshirennyy rezhim",
    "pickColorTooltip": "Nazhmite, chtoby vybrat tsvet"
  },
  "de": {
    "defaultUpperText": "Wahlen Sie Farbe",
    "advanceMode": "Erweiterter Modus",
    "pickColorTooltip": "Klicken, um eine Farbe auszuwahlen"
  }
}
</i18n>
