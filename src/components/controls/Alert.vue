<template>
  <v-alert
    v-if="resolvedContent.allVariablesResolved"
    :class="bindClass(schema)"
    v-bind="fieldProps"
  >
    <div v-if="memorable">
      <div
        v-if="!expanded"
        class="d-flex align-center justify-space-between ma-0 pa-0"
      >
        <div

          class="one-liner flex-grow-1"
          v-html="resolvedContent.resolvedText"
        />
        <div
          class="d-flex text-no-wrap cursor-pointer ml-1"
          @click="changeState"
        >
          <span class="link">{{ t('hint.show') }}</span>
          <v-icon
            class="mx-1"
            size="small"
            >mdi-eye-outline
          </v-icon>
        </div>
      </div>

      <!-- Rozwijana część z animacją -->
      <v-expand-transition class="pt-0" >
        <div v-if="expanded">
          <div
            class="flex-grow-1"
            v-html="resolvedContent.resolvedText"
          />
          <div class="d-flex justify-end">
            <div
              v-if="expanded && memorable"
              class="text-right cursor-pointer link"
              @click="changeState"
            >
              <span>{{ t('hint.hide') }}</span>
              <v-icon
                class="mx-1"
                size="small"
                >mdi-check
              </v-icon>
            </div>
          </div>
        </div>
      </v-expand-transition>
    </div>

    <div
      v-else
      v-html="resolvedContent.resolvedText"
    />
  </v-alert>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { computed, onMounted, ref } from 'vue';

import {
  useClass,
  useFormModel,
  useLocale,
  useProps,
  useResolveVariables,
} from '@/core/composables';
import { EngineAlertField } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: EngineAlertField;
  model: object;
}>();
const { getValue, setValue } = useFormModel();

const actionHandlerEventBus = useEventBus<string>('form-action');

const memorable = ref(schema.memorable ? schema.memorable : false);
const expanded = ref(true);

const { t } = useLocale();
const { resolve } = useResolveVariables();
const { bindProps, fieldProps } = useProps();

const resolvedContent = ref<any>({ resolvedText: null, allVariablesResolved: false });
const { bindClass } = useClass();

const vueSchemaFormEventBus = useEventBus<string>('form-model');

function changeState() {
  expanded.value = !expanded.value;
  actionHandlerEventBus.emit('form-action', {
    code: 'save-form-element-state',
    path: schema.key,
    expanded: expanded.value,
  });
}

onMounted(async () => {
  await bindProps(schema);
  const isContentRef = typeof schema.content === 'object' && '$ref' in schema.content;
  if (isContentRef) {
    // @ts-ignore
    resolvedContent.value.resolvedText = '#' + schema.content.$ref.split('/').pop();
    resolvedContent.value.allVariablesResolved = true;
    return;
  }

  await bindProps(schema);
  resolvedContent.value = await resolve(schema, schema.content);

  const unsubscribe = vueSchemaFormEventBus.on(async () => {
    resolvedContent.value = await resolve(schema, schema.content);
  });

  if (memorable.value) {
    expanded.value =
      userProperties.value?.alerts?.find((alert: { path: string }) => alert?.path === schema.key)
        ?.expanded ?? true;
  }
});

const userProperties = computed(() => {
  return get(schema.options, 'context.userInfo.properties', {});
});
</script>

<style lang="scss" scoped>
.one-liner {

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  min-width: 0;
  flex: 1 1 auto;
}

.expander {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>
