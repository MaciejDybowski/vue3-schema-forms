<template>
  <v-row class="form-root">
    <form-node
      v-for="node in nodes"
      :key="'index' in node ? node.key + node.index : node.key"
      :model="model"
      :schema="node"
    ></form-node>
  </v-row>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';

import { onMounted, ref, watch } from 'vue';

import { logger } from '@/main';
import { EngineField } from '@/types/engine/EngineField';
import { EngineOptions } from '@/types/engine/EngineOptions';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { Schema } from '@/types/schema/Schema';
import { SchemaField } from '@/types/schema/SchemaField';
import { SchemaOptions } from '@/types/schema/SchemaOptions';

import FormNode from './FormNode.vue';

let nodes = ref([] as Array<EngineField>);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
}>();

const emit = defineEmits<{
  (e: 'update:model', val: any): void;
}>();

function objectToArray(obj: Schema, prefix = ''): Array<EngineField> {
  const result: Array<EngineField> = [];

  for (const key in obj.properties) {
    const property: SchemaField = obj.properties[key];
    const newKey: string = prefix ? `${prefix}.${key}` : key;
    if (property.properties) {
      const nestedProperties = objectToArray(property as unknown as Schema, newKey);
      result.push(...nestedProperties);
    } else {
      result.push({
        key: newKey,
        ...property,
        on: {
          input: (e: NodeUpdateEvent) => input(e),
        },
        options: props.options as EngineOptions,
        required: obj.required?.includes(key),
      } as EngineField);
    }
  }
  return result;
}

function input(event: NodeUpdateEvent) {
  emit('update:model', event);
}

const schemaRef = ref(props.schema);

/*
 * Id dla schemy nadaję tylko dla tych powielanych w sekcji powielanej więc watch fajnie żeby był warunkowo
 * Ten kod jest potrzebny do przeładowania sekcji powielanje po usunięciu lub wyprzesuwaniu elementów za pomocą
 * draggable. Na indexie bazuje rozwiązywanie zależności w modelu więc muszę to przerenderować
 */
if (schemaRef.value.id) {
  watch(
    schemaRef,
    () => {
      const currentIndex = nodes.value[0].index;
      const reIndexNodes = objectToArray(cloneDeep(props.schema));
      const reIndex = reIndexNodes[0].index;
      if (currentIndex !== reIndex) {
        nodes.value = reIndexNodes;
      }

      if (logger.duplicatedSchemaWatchLogger) {
        console.debug(
          `[vue-schema-forms] [DuplicatedSchemaWatchLogger] => nodes re-rendered currentIndex=[${currentIndex}] newIndex=[${reIndex}]`,
        );
      }
    },
    { deep: true },
  );
}

onMounted(() => {
  /*if (typeof props.options?.digitsAfterDecimal === "string" && variableRegexp.test(props.options.digitsAfterDecimal)) {
    useResolveDependency("digitsAfterDecimal", props.options.digitsAfterDecimal.slice(1, -1), props.model, props.options);
  }*/
  nodes.value.push(...objectToArray(cloneDeep(props.schema)));
});
</script>

<style scoped lang="scss"></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
