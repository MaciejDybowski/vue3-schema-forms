<template>
  <div class="node-color-picker">
    <div class="text-body-2 text-justify mb-1">
      <span>{{ upperText }}</span>
    </div>

    <v-row
      class="pt-1"
      no-gutters
    >
      <v-col
        v-for="color in colors"
        :key="color"
        class="pa-2"
        cols="auto"
      >
        <v-btn
          :elevation="color === selectedColor ? 5 : 2"
          :color="color !== TRANSPARENT_HEX ? color : undefined"
          :class="{ 'checkered-btn': color === TRANSPARENT_HEX }"
          icon
          size="x-small"
          :disabled="isReadonlyOrDisabled"
          @click="selectColor(color)"
        >
          <v-icon
            v-if="color === selectedColor"
            :color="color === TRANSPARENT_HEX ? '#000' : pickerIconColor"
          >
            mdi-check-bold
          </v-icon>
        </v-btn>
      </v-col>

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
              :elevation="selectedRainbow ? 5 : 2"
              icon
              size="x-small"
              :disabled="isReadonlyOrDisabled"
              v-bind="props"
            >
              <div class="color-rainbow">
                <div class="rainbow-circle"></div>
                <div class="color-rainbow-selector">
                  <v-row
                    v-if="selectedRainbow"
                    no-gutters
                    justify="center"
                    align="center"
                    class="fill-height"
                  >
                    <v-col cols="auto">
                      <v-icon
                        size="24"
                        class="ma-1"
                        :style="{ backgroundColor: pickerIconBackground }"
                        :color="selectedColor"
                      >
                        mdi-checkbox-blank-circle
                      </v-icon>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-btn>
          </template>

          <v-card flat>
            <v-card-text class="pa-2 pb-0">
              <v-switch
                v-model="advanceMode"
                :label="t('advanceMode')"
                density="compact"
                hide-details="auto"
                class="mb-2"
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
import { computed, onMounted, ref, toRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineField } from '@/types/engine/EngineField';

const TRANSPARENT_HEX = '#ffffff00';
const DEFAULT_WORKSPACE_COLORS = [
  TRANSPARENT_HEX,
  '#B39DDB',
  '#9FA8DA',
  '#2196F3',
  '#00BCD4',
  '#009688',
  '#CDDC39',
  '#FFC107',
  '#795548',
  '#607D8B',
  '#1B243A',
];

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
  rules,
});

const colors = ref<string[]>([]);
const colorMenu = ref(false);
const colorPicker = ref<string>('#000000');
const advanceMode = ref(false);

const inputProps = computed(() => {
  const { palette, upperText: _upperText, ...rest } = fieldProps.value;
  return rest;
});

const paletteConfig = computed(() => {
  const fieldPalette = fieldProps.value.palette;
  const layoutPalette = schema.layout?.props?.palette;
  const optionsPalette = (schema as any).options?.palette;

  if (Array.isArray(fieldPalette)) return fieldPalette;
  if (Array.isArray(layoutPalette)) return layoutPalette;
  if (Array.isArray(optionsPalette)) return optionsPalette;
  return DEFAULT_WORKSPACE_COLORS;
});

const selectedColor = computed({
  get(): string {
    return getValue(model, schema);
  },
  set(val: string) {
    setValue(val, schema);
  },
});

const selectedRainbow = computed(() => {
  return !!selectedColor.value && !colors.value.includes(selectedColor.value);
});

const isReadonlyOrDisabled = computed(() => {
  return !!fieldProps.value.readonly || !!fieldProps.value.disabled;
});

const upperText = computed(() => {
  const fieldUpperText = fieldProps.value.upperText;
  if (typeof fieldUpperText === 'string' && fieldUpperText.trim().length > 0) return fieldUpperText;
  if (typeof label.value === 'string' && label.value.trim().length > 0) return label.value;
  return t('defaultUpperText');
});

const pickerIconColor = computed(() => {
  if (!selectedColor.value) return 'transparent';
  return getContrastColor(selectedColor.value);
});

const pickerIconBackground = computed(() => {
  return getContrastColor(selectedColor.value) === '#FFF' ? '#000' : '#FFF';
});

function selectColor(color: string) {
  if (isReadonlyOrDisabled.value) return;
  selectedColor.value = color;
  colorPicker.value = color;
  onChange(schema, model);
}

function setColors() {
  colors.value = paletteConfig.value.map((color) => normalizeColor(color)).filter(Boolean);
}

function normalizeColor(color: unknown): string {
  if (typeof color !== 'string') return '';

  const parsed = color.trim();
  if (parsed.toLowerCase() === 'transparent') return TRANSPARENT_HEX;
  return parsed;
}

function getContrastColor(color: string): '#000' | '#FFF' {
  const rgb = toRgb(color);
  if (!rgb) return '#000';

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000' : '#FFF';
}

function toRgb(color: string): { r: number; g: number; b: number } | null {
  if (!color) return null;

  const normalized = color.trim();
  const hex = normalized.startsWith('#') ? normalized.slice(1) : normalized;

  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex) || /^[0-9a-fA-F]{8}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  return null;
}

watch(
  () => paletteConfig.value,
  () => {
    setColors();
  },
  { immediate: true },
);

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
  background:
    conic-gradient(
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

.color-rainbow-selector {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.checkered-btn {
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%) !important;
  background-size: 20px 20px !important;
  background-position:
    0 0,
    10px 0,
    10px -10px,
    0 10px !important;
  background-color: #fff !important;
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

