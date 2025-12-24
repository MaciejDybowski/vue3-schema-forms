<template>

</template>

<script lang="ts" setup>
import { EngineTableField } from '@/types/engine/EngineTableField';

const { schema, model } = defineProps<{
  schema: EngineTableField;
  model: object;
}>();

function addNewRecord(payload: any) {
  //items.value.push(newItem);
  //itemsTotalElements.value += 1;
}

</script>

<style lang="css" scoped></style>
