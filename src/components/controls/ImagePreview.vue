<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        size="48"
        style="cursor: pointer; border: 0"
        v-bind="{ ...fieldProps, ...activatorProps }"
      >
        <v-img
          :src="resolvedThumbnail.resolvedText"
          alt="thumbnail"
        />
      </v-avatar>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-img
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
import { computed, onMounted } from "vue";
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

onMounted(() => {
  bindProps(props.schema);
});
</script>

<style lang="css" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "closeDialog": "Close"
  },
  "pl": {
    "closeDialog": "Zamknij"
  }
}
</i18n>
