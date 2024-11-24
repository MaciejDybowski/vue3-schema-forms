<template>
  <v-img
    v-if="!image404Error"
    :src="srcForImage"
    class="bg-white"
    v-bind="fieldProps"
    @error="handleImageError"
  ></v-img>
  <template v-else>
    <v-img src="src/static/error-404.png" />
  </template>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import { useProps, useResolveVariables } from "@/core/composables";
import { EngineImageField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineImageField;
  model: object;
}>();

const { bindProps, fieldProps } = useProps();
const { resolve } = useResolveVariables();

const srcForImage = computed(() => {
  const defaultWidth = "width" in fieldProps.value ? (fieldProps.value.width as string) : "200";
  const defaultHeight = "height" in fieldProps.value ? (fieldProps.value.height as string) : "150";
  let url = props.schema.src.replace("{width}", defaultWidth).replace("{height}", defaultHeight);

  return resolve(props.schema, url).resolvedText;
});

const image404Error = ref(false);

function handleImageError() {
  image404Error.value = true;
}

onMounted(() => {
  bindProps(props.schema);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {
    "closeDialog": "Close",
    "imageNotFound": "Image with src {src} not found."
  },
  "pl": {
    "closeDialog": "Zamknij",
    "imageNotFound": "Zdjęcia o ścieżce {src} nie znaleziono."
  }
}
</i18n>
