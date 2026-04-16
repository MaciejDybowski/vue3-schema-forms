<template>
  <div>
    <a
      v-if="isLinkMode"
      href="#"
      role="button"
      :class="bindClass(schema)"
      :aria-disabled="isActionDisabled"
      @click.prevent="runDownload"
    >
      {{ actionLabel }}
    </a>

    <div v-else>
      <v-btn
        :class="bindClass(schema)"
        :disabled="isActionDisabled"
        :loading="isLoading"
        color="primary"
        v-bind="fieldProps"
        @click="runDownload"
      >
        {{ actionLabel }}
      </v-btn>
    </div>

    <div
      v-if="requestState === 'error'"
      class="mt-2 text-error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import jsonata from 'jsonata';

import { computed, onMounted, ref } from 'vue';

import {
  useClass,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
} from '@/core/composables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
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

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { t } = useLocale();
const { fillPath } = useResolveVariables();
const form = useInjectedFormModel();

const requestState = ref<RequestState>('idle');
const errorMessage = ref('');

const isLoading = computed(() => requestState.value === 'loading');
const isLinkMode = computed(() => String(schema.renderMode) === 'link');
const isActionDisabled = computed(() => isLoading.value || !!fieldProps.value?.readonly);

const actionLabel = computed(() => {
  if (requestState.value === 'loading') return t('loading');
  return (label.value as string) || t('downloadFile');
});

async function runDownload() {
  if (isActionDisabled.value) {
    return;
  }

  if (!schema.externalApi) {
    requestState.value = 'error';
    errorMessage.value = t('missingConfig');
    return;
  }

  requestState.value = 'loading';
  errorMessage.value = '';

  try {
    const requestConfig = await buildRequestConfig();
    const response = await axios.request(requestConfig);
    const result = await mapResponseToDownloadResult(response);

    if (result) {
      await downloadResult(result);
    }

    requestState.value = 'success';
  } catch (error: any) {
    requestState.value = 'error';
    errorMessage.value = error?.message || t('genericError');
  }
}

async function buildRequestConfig(): Promise<import('axios').AxiosRequestConfig> {
  const externalApi = schema.externalApi;

  const endpoint = (await resolveAnyValue(externalApi.endpoint || '')) as string;
  const body = await resolveRecord(externalApi.body);
  const query = await resolveRecord(externalApi.query);
  const params = await resolveRecord(externalApi.params);

  if (!externalApi.serviceCode) {
    throw new Error(t('missingServiceCode'));
  }

  const serviceCode = encodeURIComponent(externalApi.serviceCode);
  const normalizedEndpoint = endpoint ? normalizeEndpoint(endpoint) : '';

  return {
    url: `/api/v1/services/${serviceCode}${normalizedEndpoint}`,
    method: externalApi.method,
    params: {
      ...query,
      ...params,
    },
    data: body,
    responseType: 'blob' as const,
  };
}

function normalizeEndpoint(endpoint: string) {
  if (endpoint.startsWith('/')) {
    return endpoint;
  }

  return `/${endpoint}`;
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
    return resolveJsonataTemplate(value);
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

async function resolveJsonataTemplate(input: string): Promise<any> {
  const templateMatches = [...input.matchAll(/\{([^{}]+)}/g)];

  if (!templateMatches.length) {
    return input;
  }

  const singleExpression = templateMatches.length === 1 && templateMatches[0][0] === input;
  if (singleExpression) {
    return evaluateJsonataExpression(templateMatches[0][1]);
  }

  let resolvedText = input;
  for (const match of templateMatches) {
    const value = await evaluateJsonataExpression(match[1]);
    resolvedText = resolvedText.replace(match[0], value === undefined || value === null ? '' : String(value));
  }

  return resolvedText;
}

async function evaluateJsonataExpression(expression: string) {
  try {
    const model = form.getFormModelForResolve.value;
    const expressionWithPath = fillPath(schema.path, schema.index, expression.trim());
    return await jsonata(expressionWithPath).evaluate(model);
  } catch {
    throw new Error(`${t('invalidExpression')}: {${expression}}`);
  }
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

async function downloadResult(result: DownloadResult) {
  if (result.url) {
    await downloadUrlResult(result.url, result.fileName, result.mimeType);
    return;
  }

  if (!result.blob) return;

  const blob = ensureMimeType(result.blob, result.mimeType);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = result.fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

async function downloadUrlResult(url: string, fileName: string, mimeType: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      fallbackToAnchorDownload(url, fileName);
      return;
    }

    const blob = await response.blob();
    await downloadResult({
      blob,
      fileName,
      mimeType,
    });
  } catch {
    fallbackToAnchorDownload(url, fileName);
  }
}

function fallbackToAnchorDownload(url: string, fileName: string) {
  // Fallback when remote URL blocks CORS fetch, still tries browser download flow.
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function ensureMimeType(blob: Blob, mimeType: string) {
  if (blob.type || !mimeType) {
    return blob;
  }

  return blob.slice(0, blob.size, mimeType);
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
    "loading": "Pobieranie...",
    "defaultFileName": "download",
    "defaultFileType": "Nieznany typ",
    "missingConfig": "Brak konfiguracji externalApi",
    "missingServiceCode": "Brak externalApi.serviceCode",
    "invalidExpression": "Bledne wyrazenie JSONata",
    "genericError": "Nie udalo sie pobrac pliku"
  },
  "en": {
    "downloadFile": "Download file",
    "loading": "Downloading...",
    "defaultFileName": "download",
    "defaultFileType": "Unknown type",
    "missingConfig": "Missing externalApi config",
    "missingServiceCode": "Missing externalApi.serviceCode",
    "invalidExpression": "Invalid JSONata expression",
    "genericError": "Could not download file"
  }
}
</i18n>


