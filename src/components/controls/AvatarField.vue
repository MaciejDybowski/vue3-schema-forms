<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        v-if="!loading.thumbnail"
        id="activator-target"
        style="cursor: pointer"
        v-bind="{...fieldProps, ...activatorProps}"
        @click="fetchPreview"
      >
        <v-img
          v-if="!loading.thumbnail"
          :src="thumbnail"
          alt="thumbnail"
        />
      </v-avatar>
      <v-skeleton-loader
        v-else
        type="avatar"></v-skeleton-loader>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-img
            v-if="!loading.preview"
            :src="preview"
            cover
          />
          <v-skeleton-loader
            v-else
            type="image"></v-skeleton-loader>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-bind="schema.options.buttonProps"
            @click="isActive.value = false"
            >{{ t("closeDialog") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

import { useClass, useLabel, useProps, useResolveVariables } from "@/core/composables";
import { EngineAvatarField } from "@/types/engine/controls";
import { debounce } from "lodash";

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

const thumbnail = ref(null);
const preview = ref(null);
const resolvedThumbnail = computed(() => {
  return resolve(props.schema, props.schema.source.thumbnail);
});

const resolvedPreview = computed(() => {
  return resolve(props.schema, props.schema.source.preview);
});

const loading = reactive({
  thumbnail: true,
  preview: true,
});

watch(resolvedThumbnail, async (newValue, oldValue) => {
  if(newValue.allVariablesResolved && newValue.resolvedText !== oldValue.resolvedText){
    debounce(fetchThumbnail, 500)()
  }
}, {once: true})

watch(resolvedPreview, async (newValue, oldValue) => {
  if(newValue.allVariablesResolved && newValue.resolvedText !== oldValue.resolvedText){
    debounce(fetchPreview, 500)()
  }
}, {once: true})

async function fetchThumbnail() {
  if(resolvedThumbnail.value.allVariablesResolved) {
    try {
      loading.thumbnail = true;
      const image = new Image();
      image.src = resolvedThumbnail.value.resolvedText;

      await image.decode().then(() => {
        thumbnail.value = image;
        loading.thumbnail = false;
      });
    } catch (e) {
      console.error(e);
    }
  }
}

async function fetchPreview() {
 if(resolvedPreview.value.allVariablesResolved) {
   try {
     if(!preview.value){
       loading.preview = true;
       const image = new Image();
       image.src = resolvedPreview.value.resolvedText;

       await image.decode().then(() => {
         preview.value = image;
         loading.preview = false;
       });
     }
   } catch (e) {
     console.error(e);
   }
 }
}

onMounted(async () => {
  bindProps(props.schema);
  await fetchThumbnail();
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
    "closeDialog": "Close"
  },
  "pl": {
    "closeDialog": "Zamknij"
  }
}
</i18n>