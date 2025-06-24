<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        :rounded="rounded"
        :size="size"
        style="cursor: pointer; border: 0"
        v-bind="activatorProps"
      >
        <v-img
          :src="src.replace('{width}', size.toString()).replace('{height}', size.toString())"
        />
      </v-avatar>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-img
            :src="src.replace('{width}', 360 + '').replace('{height}', 240 + '')"
            cover
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="elevated"
            @click="isActive.value = false"
            >{{ t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useLocale } from '@/core/composables';

const props = withDefaults(
  defineProps<{
    rounded: number;
    size: number;
    src: string;
  }>(),
  {
    rounded: 0,
    size: 48,
  },
);

const { t } = useLocale();
</script>

<style lang="css" scoped></style>
