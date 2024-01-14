<template>
  <v-btn v-bind="props"
         width="200"
  >
    {{value}}
  </v-btn>
</template>

<script setup lang="ts">

const props = defineProps<{
  color: string
  value: string
}>();

</script>

<style scoped lang="css">

</style>
