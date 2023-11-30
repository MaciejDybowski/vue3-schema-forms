<template>
  <h1 v-if="schema.layout.tag === 'h1'">
    {{ schema.content }}
  </h1>
  <h2 v-if="schema.layout.tag === 'h2'">
    {{ schema.content }}
  </h2>
  <h3 v-if="schema.layout.tag === 'h3'">
    {{ schema.content }}
  </h3>
  <h4 v-if="schema.layout.tag === 'h4'">
    {{ schema.content }}
  </h4>
  <h5 v-if="schema.layout.tag === 'h5'">
    {{ schema.content }}
  </h5>
  <p
    v-if="schema.layout.tag === 'p'"
    class="text-subtitle-2"
  >
    {{ schema.content }}
  </p>
  <span
    v-if="schema.layout.tag === 'span'"
    class="text-subtitle-2 d-block text-justify"
  >
    {{ schema.content }}
  </span>
</template>

<script setup lang="ts">
import { EngineStaticField } from "@/vocabulary/engine/controls";

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();
</script>

<style scoped lang="css"></style>
