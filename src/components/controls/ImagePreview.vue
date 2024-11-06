<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        v-if="resolvedThumbnail.resolvedText && resolvedThumbnail.allVariablesResolved && !image404Error"
        size="48"
        style="cursor: pointer; border: 0"
        v-bind="{ ...fieldProps, ...activatorProps }"
      >
        <v-img
          :src="resolvedThumbnail.resolvedText"
          alt="thumbnail"
          @error="handleImageError"
        />
      </v-avatar>
      <v-tooltip v-else-if="image404Error" :text="t('imageNotFound', {src: resolvedThumbnail.resolvedText})">
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="48"
            color="warning"
            icon="mdi-file-alert-outline"
          />
        </template>
      </v-tooltip>
      <v-skeleton-loader v-else type="avatar"/>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-img
            v-if="resolvedPreview.resolvedText && resolvedPreview.allVariablesResolved"
            :src="resolvedPreview.resolvedText"
            alt="=preview"
            cover
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            v-bind="schema.options.buttonProps"
            variant="elevated"
            @click="isActive.value = false"
            >{{ t("closeDialog") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

import { useClass, useLabel, useProps, useResolveVariables } from "@/core/composables";
import { EngineAvatarField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineAvatarField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label } = useLabel(props.schema);
const { resolve } = useResolveVariables();
const { t } = useI18n();

const theme = useTheme();

const resolvedThumbnail = computed(() => {
  return resolve(props.schema, props.schema.source.thumbnail);
});

const resolvedPreview = computed(() => {
  return resolve(props.schema, props.schema.source.preview);
});

const image404Error = ref(false)

function handleImageError() {
  image404Error.value = true;
}

onMounted(() => {
  console.debug(props.schema)
  bindProps(props.schema);
});
</script>

<style lang="css" scoped>
>>> .v-skeleton-loader__avatar {
  margin: 0 0 0 0;
}
</style>

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
