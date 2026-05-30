<template>
  <v-app>
    <div>
      <slot name="story"></slot>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify"
import { watch } from "vue"
import i18n from "../plugins/i18n"

const props = defineProps<{
  themeName: string
  localeName: string
}>()

const theme = useTheme()

watch(() => props.localeName, nVal => {
  i18n.global.locale.value = nVal
}, { immediate: true })

watch(() => props.themeName, nVal => {
  theme.global.name.value = nVal as string
}, { immediate: true })
</script>

<style>
.v-application__wrap {
  min-height: 0vh !important;
}
</style>
