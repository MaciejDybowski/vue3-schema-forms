<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <span class="v-card-title ml-0 pl-0">JSON Index</span>
        <vue-json-pretty :data="schema" />
      </v-col>
      <v-col cols="6">
        <span class="v-card-title ml-0 pl-0">Model formularza</span>
        <vue-json-pretty :data="model" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import VueJsonPretty from "vue-json-pretty"
import "vue-json-pretty/lib/styles.css"

const props = defineProps({
  schema: {
    type: null,
    required: true,
  },
  model: {
    type: null,
    required: true,
  },
})
</script>

<style scoped lang="scss"></style>
