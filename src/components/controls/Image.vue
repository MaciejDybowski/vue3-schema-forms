<template>
  <v-img
    v-if="!image404Error"
    :src="srcForImage"
    class="bg-white"
    v-bind="fieldProps"
    @error="handleImageError"
  ></v-img>
  <template v-else>
    <v-img
      src="src/static/error-404.png"
      v-bind="fieldProps"
    />
  </template>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import { useFormModel, useProps, useResolveVariables } from "@/core/composables";
import { EngineImageField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineImageField;
  model: object;
}>();

const { getValue, setValue } = useFormModel();
const { bindProps, fieldProps } = useProps();
const { resolve } = useResolveVariables();

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

const srcForImage = computed(() => {
  const defaultWidth = "width" in fieldProps.value ? (fieldProps.value.width as string) : "200";
  const defaultHeight = "height" in fieldProps.value ? (fieldProps.value.height as string) : "150";

  let url = props.schema.src.replace("{width}", defaultWidth).replace("{height}", defaultHeight);
  url = url.replace("{id}", localModel.value["id"])
  url = url.replace("{dataId}", localModel.value["dataId"])
  //console.debug(`[IMG URL] => ${url}`)
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
