<template>
  <v-app>
    <div>
      <slot name="story"></slot>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify"
import { onMounted, watch } from "vue"
import i18n from "../plugins/i18n"

const props = defineProps<{
  themeName: any
  localeName: any
}>()

const theme = useTheme()

watch(props.localeName, nVal => {
  i18n.global.locale.value = nVal
})

watch(props.themeName, nVal => {
  theme.global.name.value = nVal as string
})

onMounted(() => {
  i18n.global.locale.value = props.localeName.value
})
</script>

<style>
.v-application__wrap {
  min-height: 0vh !important;
}
</style>
