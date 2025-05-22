<template>
  <v-alert
    v-if="resolvedContent.allVariablesResolved"
    :class="bindClass(schema)"
    v-bind="fieldProps"
  >
    <div
      v-if="memorable"
      class="d-flex"
    >
      <div
        :class="!expanded ? `one-liner` : 'whole-content'"
        v-html="resolvedContent.resolvedText"
      />
      <v-spacer />
      <v-btn
        class="pa-0 ma-0 mx-2"
        density="compact"
        icon
        variant="text"
        @click="changeState"
      >
        <v-icon>{{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </div>

    <div
      v-else
      v-html="resolvedContent.resolvedText"
    ></div>
  </v-alert>
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { computed, onMounted, ref } from "vue";

import { useClass, useFormModel, useProps, useResolveVariables } from "@/core/composables";
import { EngineAlertField } from "@/types/engine/controls";
import { useEventBus } from "@vueuse/core";

const { schema, model } = defineProps<{
  schema: EngineAlertField;
  model: object;
}>();
const { getValue, setValue } = useFormModel();

const actionHandlerEventBus = useEventBus<string>("form-action");

const memorable = ref(schema.memorable ? schema.memorable : false);
const expanded = ref(true);

const { resolve } = useResolveVariables();
const { bindProps, fieldProps } = useProps();

const resolvedContent = ref<any>({ resolvedText: null, allVariablesResolved: false });
const { bindClass } = useClass();

const vueSchemaFormEventBus = useEventBus<string>("form-model");

function changeState() {
  expanded.value = !expanded.value;
  actionHandlerEventBus.emit("form-action", {
    code: "save-form-element-state",
    path: schema.key,
    expanded: expanded.value,
  });
}

onMounted(async () => {
  console.debug(schema);
  await bindProps(schema);
  console.debug(fieldProps.value);
  const isContentRef = typeof schema.content === "object" && "$ref" in schema.content;
  if (isContentRef) {
    // @ts-ignore
    resolvedContent.value.resolvedText = "#" + schema.content.$ref.split("/").pop();
    resolvedContent.value.allVariablesResolved = true;
    return;
  }

  await bindProps(schema);
  resolvedContent.value = await resolve(schema, schema.content);

  const unsubscribe = vueSchemaFormEventBus.on(async () => {
    resolvedContent.value = await resolve(schema, schema.content);
  });

  if (memorable.value) {
    expanded.value = userProperties.value?.alerts?.find((alert) => alert?.path === schema.key)?.expanded ?? true;
  }
});

const userProperties = computed(() => {
  return get(schema.options, "context.userInfo.properties", {});
});
</script>

<style scoped>
.whole-content {
  margin-top: 5px;
}

.one-liner {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
