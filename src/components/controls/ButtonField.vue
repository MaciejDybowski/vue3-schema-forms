<template>
  <v-btn
    :class="bindClass(schema)"
    :color="primaryWhite"
    :disabled="loading || fieldProps.readonly"
    :loading="loading"
    v-bind="fieldProps"
    @click="runBtnLogic"
  >
    {{ label }}
  </v-btn>

  <v-dialog
    v-model="popup.show"
    max-width="650"
  >
    <template v-slot:default="{ isActive }">
      <v-card :title="popup.title">
        <v-card-text>
          <vue-schema-forms
            ref="popupReference"
            :key="popupReferenceReload"
            v-model="popup.model"
            :options="popup.options"
            :schema="popup.schema"
          />
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-spacer></v-spacer>

          <v-btn
            :text="t('close')"
            v-bind="{ ...fieldProps, color: '', variant: 'elevated' }"
            @click="isActive.value = false"
          ></v-btn>

          <v-btn
            v-bind="{ ...fieldProps, color: 'primary', variant: 'elevated' }"
            @click="saveDialogForm(isActive)"
          >
            {{ popup.acceptText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar
    v-model="snackbar.modelValue"
    :timeout="1000"
    color="success"
    variant="tonal"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import get from 'lodash/get';
import { useTheme } from 'vuetify';

import { Ref, computed, onMounted, reactive, ref } from 'vue';

import { useClass, useLabel, useLocale, useProps, useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineButtonField } from '@/types/engine/EngineButtonField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { Schema } from '@/types/schema/Schema';

import VueSchemaForms from '../engine/VueSchemaForms.vue';

const vueSchemaFormEventBus = useEventBus<string>('form-model');

const popupReferenceReload = ref(0);
vueSchemaFormEventBus.on(async (event, payload: NodeUpdateEvent | string) => {
  if (payload == 'action-callback' && schema.mode == 'form-and-action') {
    const newModel = get(model, schema.config.modelReference, {});
    if (schema.config.modelReference) {
      popup.model = newModel;
      popupReferenceReload.value++;
    }
  }
});

const actionHandlerEventBus = useEventBus<string>('form-action');
const loading = ref(false);
const { schema, model } = defineProps<{
  schema: EngineButtonField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { resolve } = useResolveVariables();

const { t } = useLocale();
const theme = useTheme();
const primaryWhite = computed(() => (theme.current.value.dark ? 'white' : 'primary'));

const shouldWaitForSaveState =
  schema.config && schema.config.waitForSaveState ? schema.config.waitForSaveState : false;
const caller = ref<Function>(() => {});
const formCurrentSaveState = ref(true);
if (shouldWaitForSaveState) {
  const formExternalStateEventBus = useEventBus<string>('form-state');
  formExternalStateEventBus.on((event, payload) => {
    formCurrentSaveState.value = payload;
    if (payload == true) {
      caller.value();
      caller.value = () => {};
    }
  });
}

const popupReference = ref();
const popup = reactive<{
  errorMessages: Ref<any[]>;
  show: boolean;
  title: string;
  model: object;
  schema: Schema;
  options: object;
  item: object;
  itemIndex: number;
  acceptFunction: Function;
  acceptText: string;
}>({
  errorMessages: ref([]),
  show: false,
  title: '',
  model: {},
  schema: {} as Schema,
  options: schema.options,
  item: {},
  itemIndex: 0,
  acceptFunction: () => {},
  acceptText: t('save'),
});

const snackbar = reactive({
  modelValue: false,
  text: t('valueCopied'),
});

async function saveDialogForm(isActive: Ref<boolean>) {
  const { valid, messages } = await popupReference.value.validate('messages');
  popup.errorMessages = messages;
  if (valid) {
    popup.acceptFunction();
    isActive.value = false;
  }
}

async function runBtnLogic() {
  switch (schema.mode) {
    case 'action':
      const body = await createBodyObject();
      let payloadObject = {
        code: schema.config.code,
        body: body,
        params: {
          ...schema.config.params,
        },
      };
      actionHandlerEventBus.emit('form-action', payloadObject);
      break;
    case 'form-and-action':
      popup.errorMessages = [];
      popup.title = schema.config.title;
      if (schema.config.modelReference) {
        popup.model = get(model, schema.config.modelReference, {});
      }
      if (schema.config.acceptText) {
        popup.acceptText = schema.config.acceptText;
      }
      popup.schema = schema.schema as any;
      popup.acceptFunction = async () => {
        let payloadObject = {
          code: schema.config.code,
          body: popup.model,
          params: {
            ...schema.config.params,
          },
        };
        console.debug(
          `Popup model is ready to save, event [form-action] was emitted`,
          payloadObject,
        );
        actionHandlerEventBus.emit('form-action', payloadObject);
      };
      popup.show = true;
      break;
    case 'copy':
      snackbar.modelValue = true;
      const value = get(model, schema.config.modelReference, '');
      await navigator.clipboard.writeText(value);
      break;
    case 'api-call':
      loading.value = true;
      if (shouldWaitForSaveState && !formCurrentSaveState.value) {
        caller.value = apiCallMode;
        return;
      }
      await apiCallMode();

      break;
  }
}

async function apiCallMode() {
  const { resolvedText, allVariablesResolved } = await resolve(
    schema,
    schema.config.source,
    true,
  );
  const body = await createBodyObject();
  if (allVariablesResolved) {
    const response = await axios({
      method: schema.config.method || 'POST',
      url: resolvedText,
      data: body,
    });

    if (schema.config.emit) {
      actionHandlerEventBus.emit('form-action', schema.config.emit);
    }

    // TODO - dalsza implementacja - co ma się dziać z response, jakie warianty
  } else {
    //console.debug(resolvedText, allVariablesResolved);
  }
  setTimeout(() => (loading.value = false), 1000);
}

async function createBodyObject() {
  let body: Record<string, any> = {};
  if (schema.config.body == undefined) return body;
  const entries = Object.entries(schema.config.body);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => {
      if (typeof value === 'string' && variableRegexp.test(value)) {
        const { resolvedText, allVariablesResolved } = await resolve(schema, value as string);
        return [key, allVariablesResolved ? resolvedText : null];
      } else {
        return [key, value];
      }
    }),
  );

  resolvedEntries.forEach(([key, value]) => {
    body[key as string] = value;
  });

  return body;
}

onMounted(async () => {
  await bindLabel(schema);
  await bindProps(schema);
});
</script>

<style lang="css" scoped></style>
