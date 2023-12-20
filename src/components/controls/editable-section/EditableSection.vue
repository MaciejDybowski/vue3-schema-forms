<template>
  <div class='editable-section d-flex'>
    <v-btn
      class='editable'
      position='absolute'
      variant='outlined'
      size='20'
      @click='transformSchema'
    >
      <v-icon size='16'>
        mdi-pencil
      </v-icon>
    </v-btn>
    <form-root
      :schema='wrappedSchema'
      :model='model'
      :options='schema.options'
      @update:model='updateModel'
    />
  </div>
</template>

<script setup lang='ts'>
import { EngineField, NodeUpdateEvent } from '../../../vocabulary/engine';
import { computed, ref } from 'vue';
import FormRoot from '../../engine/FormRoot.vue';
import set from 'lodash/set';
import { Schema } from '../../../vocabulary/schema';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

function updateModel(event: NodeUpdateEvent) {
  set(props.model, event.key, event.value);
}

let sectionSchema = ref({
  type: 'object',
  properties: {
    [props.schema.key]: props.schema.layout.schema,
  },
} as Schema);

let wrappedSchema = computed(() => {
    return sectionSchema.value;
  },
);

function transformSchema() {
  console.debug('#TODO');
}

// check function performance
function replaceComponent(jsonObj: any) {
  if (typeof jsonObj === 'object' && jsonObj !== null) {
    if (jsonObj.hasOwnProperty('component')) {
      jsonObj['component'] = 'read-view';
    }

    for (var key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        replaceComponent(jsonObj[key]);
      }
    }
  } else if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      replaceComponent(jsonObj[i]);
    }
  }
  return jsonObj;
}

</script>
<style scoped lang='css'>
.editable {
  margin-left: -24px;
}
</style>
