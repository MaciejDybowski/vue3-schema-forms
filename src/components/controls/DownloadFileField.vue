<template>
  <div>
    <v-card
      v-if="isCardMode"
      class="pa-2"
      variant="outlined"
    >
      <v-card-title class="text-subtitle-1">{{ resolvedFileName }}</v-card-title>
      <v-card-subtitle>{{ resolvedFileType }}</v-card-subtitle>

      <v-card-text class="d-flex align-center ga-2 flex-wrap">
        <v-chip
          size="small"
          :color="statusColor"
          variant="tonal"
        >
          {{ statusText }}
        </v-chip>

        <v-chip
          v-if="requestState === 'success'"
          size="small"
          color="success"
          variant="tonal"
        >
          {{ t('downloaded') }}
        </v-chip>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :class="bindClass(schema)"
          :disabled="isLoading || fieldProps.readonly"
          :loading="isLoading"
          color="primary"
          v-bind="fieldProps"
          @click="runDownload"
        >
          {{ actionLabel }}
        </v-btn>

        <v-btn
          v-if="hasResultToRedownload"
          variant="text"
          @click="downloadPreparedResult"
        >
          {{ t('downloadAgain') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <div v-else>
      <v-btn
        :class="bindClass(schema)"
        :disabled="isLoading || fieldProps.readonly"
        :loading="isLoading"
        color="primary"
        v-bind="fieldProps"
        @click="runDownload"
      >
        {{ actionLabel }}
      </v-btn>

      <div class="mt-2">
        <v-chip
          v-if="requestState === 'success'"
          size="small"
          color="success"
          variant="tonal"
        >
          {{ t('downloaded') }}
        </v-chip>

        <v-chip
          v-if="requestState === 'error'"
          size="small"
          color="error"
          variant="tonal"
        >
          {{ errorMessage }}
        </v-chip>

        <v-btn
          v-if="hasResultToRedownload"
          class="ml-2"
          size="small"
          variant="text"
          @click="downloadPreparedResult"
        >
          {{ t('downloadAgain') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';

import { computed, onMounted, ref } from 'vue';

import {
  useClass,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
} from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineDownloadFileField } from '@/types/engine/controls';

type RequestState = 'idle' | 'loading' | 'success' | 'error';
type ApiParams = Record<string, any> | undefined;

type DownloadResult = {
  blob?: Blob;
  url?: string;
  fileName: string;
  mimeType: string;
};

const { schema } = defineProps<{
  schema: EngineDownloadFileField;
  model: object;
}>();

const actionHandlerEventBus = useEventBus<string>('form-action');

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { t } = useLocale();
const { resolve } = useResolveVariables();

const requestState = ref<RequestState>('idle');
const errorMessage = ref('');
const preparedResult = ref<DownloadResult | null>(null);

const isLoading = computed(() => requestState.value === 'loading');
const isCardMode = computed(() => schema.renderMode === 'card');
const hasResultToRedownload = computed(() => preparedResult.value != null);

const resolvedFileName = computed(() => schema.fileName || t('defaultFileName'));
const resolvedFileType = computed(() => schema.fileType || t('defaultFileType'));

const actionLabel = computed(() => {
  if (requestState.value === 'loading') return t('loading');
  if (requestState.value === 'success') return t('downloadAgain');
  return (label.value as string) || t('downloadFile');
});

const statusColor = computed(() => {
  if (schema.status === 'generating') return 'warning';
  if (schema.status === 'expired') return 'error';
  return 'success';
});

const statusText = computed(() => {
  if (schema.status === 'generating') return t('statusGenerating');
  if (schema.status === 'expired') return t('statusExpired');
  return t('statusReady');
});

async function runDownload() {
  if (!schema.externalApi) {
    requestState.value = 'error';
    errorMessage.value = t('missingConfig');
    return;
  }

  requestState.value = 'loading';
  errorMessage.value = '';

  try {
    const payload = await buildPayload();
    const response = await executeAction(payload);
    const result = await mapResponseToDownloadResult(response);

    if (result) {
      preparedResult.value = result;
      downloadResult(result);
    }

    requestState.value = 'success';
  } catch (error: any) {
    requestState.value = 'error';
    errorMessage.value = error?.message || t('genericError');
  }
}

async function executeAction(payload: Record<string, any>) {
  return new Promise<any>((resolveAction, rejectAction) => {
    const timeout = setTimeout(() => {
      rejectAction(new Error(t('requestTimeout')));
    }, 30000);

    actionHandlerEventBus.emit('form-action', {
      ...payload,
      callback: (result: any) => {
        clearTimeout(timeout);
        resolveAction(result);
      },
      errorCallback: (error: any) => {
        clearTimeout(timeout);
        rejectAction(error);
      },
    });
  });
}

async function buildPayload() {
  const externalApi = schema.externalApi;

  const endpoint = await resolveVariableValue(externalApi.endpoint, true);
  const body = await resolveRecord(externalApi.body);
  const query = await resolveRecord(externalApi.query);
  const params = await resolveRecord(externalApi.params);

  if (!externalApi.serviceCode) {
    throw new Error(t('missingServiceCode'));
  }

  return {
    code: externalApi.serviceCode,
    method: externalApi.method,
    endpoint,
    body,
    query,
    params,
  };
}

async function resolveRecord(input: ApiParams) {
  if (!input) return {};
  const entries = Object.entries(input);

  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => {
      const resolvedValue = await resolveAnyValue(value);
      return [key, resolvedValue] as const;
    }),
  );

  return Object.fromEntries(resolvedEntries);
}

async function resolveAnyValue(value: any): Promise<any> {
  if (typeof value === 'string') {
    return resolveVariableValue(value);
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveAnyValue(item)));
  }

  if (value && typeof value === 'object') {
    const nestedEntries = await Promise.all(
      Object.entries(value).map(async ([key, nestedValue]) => {
        const resolvedValue = await resolveAnyValue(nestedValue);
        return [key, resolvedValue] as const;
      }),
    );

    return Object.fromEntries(nestedEntries);
  }

  return value;
}

async function resolveVariableValue(value: string, forUrlPurpose = false) {
  if (!new RegExp(variableRegexp).test(value)) {
    return value;
  }

  const { resolvedText } = await resolve(schema, value, forUrlPurpose);
  return resolvedText;
}

async function mapResponseToDownloadResult(response: any): Promise<DownloadResult | null> {
  if (!response) {
    return null;
  }

  if (response instanceof Blob) {
    return createBlobResult(response, schema.fileName || t('defaultFileName'));
  }

  if (typeof response === 'string' && response.startsWith('http')) {
    return {
      url: response,
      fileName: schema.fileName || t('defaultFileName'),
      mimeType: schema.fileType || 'application/octet-stream',
    };
  }

  if (response?.blob instanceof Blob) {
    return createBlobResult(response.blob, response.fileName || schema.fileName);
  }

  if (response?.data instanceof Blob) {
    return createBlobResult(response.data, response.fileName || schema.fileName);
  }

  if (response?.downloadUrl) {
    return {
      url: response.downloadUrl,
      fileName: response.fileName || schema.fileName || t('defaultFileName'),
      mimeType: response.mimeType || schema.fileType || 'application/octet-stream',
    };
  }

  const base64 = response?.base64 || response?.contentBase64;
  if (typeof base64 === 'string' && base64.length > 0) {
    const mimeType = response?.mimeType || schema.fileType || 'application/octet-stream';
    const blob = base64ToBlob(base64, mimeType);
    return createBlobResult(blob, response?.fileName || schema.fileName);
  }

  return null;
}

function createBlobResult(blob: Blob, fileName?: string): DownloadResult {
  return {
    blob,
    fileName: fileName || schema.fileName || t('defaultFileName'),
    mimeType: blob.type || schema.fileType || 'application/octet-stream',
  };
}

function downloadPreparedResult() {
  if (!preparedResult.value) return;
  downloadResult(preparedResult.value);
}

function downloadResult(result: DownloadResult) {
  if (result.url) {
    const anchor = document.createElement('a');
    anchor.href = result.url;
    anchor.download = result.fileName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

  if (!result.blob) return;

  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = result.fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function base64ToBlob(base64: string, mimeType: string) {
  const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

onMounted(async () => {
  await bindLabel(schema);
  await bindProps(schema);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "pl": {
    "downloadFile": "Pobierz plik",
    "downloadAgain": "Pobierz ponownie",
    "downloaded": "Pobrano",
    "loading": "Pobieranie...",
    "statusReady": "ready",
    "statusGenerating": "generating",
    "statusExpired": "expired",
    "defaultFileName": "download",
    "defaultFileType": "Nieznany typ",
    "missingConfig": "Brak konfiguracji externalApi",
    "missingServiceCode": "Brak externalApi.serviceCode",
    "requestTimeout": "Przekroczono czas oczekiwania na odpowiedz",
    "genericError": "Nie udalo sie pobrac pliku"
  },
  "en": {
    "downloadFile": "Download file",
    "downloadAgain": "Download again",
    "downloaded": "Downloaded",
    "loading": "Downloading...",
    "statusReady": "ready",
    "statusGenerating": "generating",
    "statusExpired": "expired",
    "defaultFileName": "download",
    "defaultFileType": "Unknown type",
    "missingConfig": "Missing externalApi config",
    "missingServiceCode": "Missing externalApi.serviceCode",
    "requestTimeout": "Request timeout",
    "genericError": "Could not download file"
  }
}
</i18n>

