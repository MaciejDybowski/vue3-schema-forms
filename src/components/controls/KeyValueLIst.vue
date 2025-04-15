<template>
  <div>
    <v-row no-gutters class="ma-0 pa-0">
      <v-col cols="6">Pole</v-col>
      <v-col cols="6">Wartość</v-col>
    </v-row>

    <v-divider></v-divider>

    <v-list-item
      v-for="(item, index) in specificationItems"
      :key="index"
      class="ma-0 pa-0"
      density="compact"
    >
      <v-row
        align="center"
        no-gutters
        class="ma-0 pa-0"
      >
        <v-col
          class="pa-0 ma-0"
          cols="6"
          v-html="item.label"
        />
        <v-col
          class="pa-0 ma-0"
          cols="6"
          v-html="item.value"
        />
      </v-row>
      <v-divider/>
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { useFormModel } from "@/core/composables";
import { EngineTextField } from "@/types/engine/controls";

const { schema, model } = defineProps<{
  schema: EngineTextField;
  model: object;
}>();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): any[] {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});

const specificationItems = ref([
  { label: "Nazwa", value: "Bedframe + bedsides" },
  { label: "EAN", value: "5904767831813" },
  { label: "Program", value: "ARYSTYDA" },
  { label: "Funkcja", value: "Sleeping" },
  { label: "Typ mebla", value: "Bedframes" },
  { label: "Oznaczenie", value: "2SK" },
  { label: "Oświetlenie", value: "0 [lm]" },
]);
</script>

<style lang="css" scoped></style>
