<template>
  <v-file-input
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :label="label"
    :rules="!fieldProps.readonly ? rules : []"
    chips
    prepend-icon=""
    prepend-inner-icon="mdi-file"
    v-bind="fieldProps"
    @change="updateFileByAPI()"
    @drop.prevent="updateFileByAPI()"
    @click:clear="removeFile(localModel, true)"
  >
    <template #selection="{ fileNames }">
      <v-chip
        class="ma-1"
        closable
        @click:close="removeFile(localModel, true)"
      >
        <div
          class="cursor-pointer"
          @click.stop="getDownloadLink"
        >
          {{ fileNames[0] }}
        </div>
      </v-chip>
    </template>
  </v-file-input>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

import { computed, onMounted, ref } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { toast } from '@/main';
import { EngineFileField } from '@/types/engine/controls';

interface FileInfo extends File {
  id: string;
  name: string;
  size: number;
  type: string;
}

const { schema, model } = defineProps<{
  schema: EngineFileField;
  model: object;
}>();

const { t } = useI18n();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { label, bindLabel } = useLabel(schema);

const maxFileSize = ref(schema.fileMaxSize || null);
const availableExt = ref(
  schema.fileAvailableExtensions?.trim().toLowerCase().split(',') ||
    schema.options?.context?.fileAvailableExtensions ||
    [],
);

const id = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('dataId') ||
    params.get('taskId') ||
    params.get('processId') ||
    params.get(idReference.value)
  );
});

const fileLabel = ref(schema.fileLabel || null);

const actionHandlerEventBus = useEventBus<string>('form-action');

const uploadFileUrl = ref(
  schema.url ||
    `/api/v1/features/{menuFeatureId}/files?dataId={dataId}&temporary=false&filePath=${schema.key}`,
);
const deleteFileUrl = ref(`/api/v1/features/{menuFeatureId}/files/{fileId}?dataId={dataId}`);

const idReference = ref(schema.idQueryParamName || 'id');

const featureId = computed(() => {
  return schema.options?.context?.menuFeatureId || 'unknown-feature-id';
});

const localModel = computed({
  get(): FileInfo {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});
const lastLocalModel = ref<FileInfo | null>(null);

function refreshAttachments() {
  actionHandlerEventBus.emit('form-action', { code: 'refresh-attachments' });
}

async function updateFileByAPI() {
  try {
    if (lastLocalModel.value) {
      await removeFile(lastLocalModel.value);
    }
    const formData = new FormData();
    formData.append('file', localModel.value);
    const response = await axios.post(
      uploadFileUrl.value
        .replace(`{menuFeatureId}`, featureId.value + '')
        .replace('{dataId}', id.value + ''),
      formData,
    );
    localModel.value = {
      id: response.data.fileId,
      name: localModel.value.name,
      size: localModel.value.size,
      type: localModel.value.type,
    };
    lastLocalModel.value = { ...localModel.value };
    if(fileLabel.value){
      await addFileLabel(localModel.value)
    }
    refreshAttachments();
  } catch (error) {
    console.error('Error uploading file:', error);
    if (toast != null) {
      // @ts-ignore
      toast.error(message);
    }
    localModel.value = null;
  }
}

async function addFileLabel(file: FileInfo) {
  try {
    await axios.post(
      deleteFileUrl.value
        .replace('{menuFeatureId}', featureId.value + '')
        .replace(`{fileId}`, file.id + '')
        .replace('{dataId}', id.value + ''),
      {
        labels: [fileLabel.value],
        description: null,
      },
    );
  } catch (e) {
    console.error('Sth went wrong while adding file label');
  }
}

async function removeFile(file: FileInfo, cleanModel = false) {
  try {
    await axios.delete(
      deleteFileUrl.value
        .replace('{menuFeatureId}', featureId.value + '')
        .replace(`{fileId}`, file.id + '')
        .replace('{dataId}', id.value + ''),
    );
    lastLocalModel.value = null;
    if (cleanModel) {
      localModel.value = null;
    }
    refreshAttachments();
  } catch (error) {
    console.error('Error deleting file:', error);
    if (toast != null) {
      // @ts-ignore
      toast.error(message);
    }
  }
}

async function getDownloadLink() {
  try {
    const [baseUrl, queryString] = uploadFileUrl.value
      .replace(`{menuFeatureId}`, featureId.value + '')
      .replace('{dataId}', String(id.value))
      .split('?');
    const downloadUrl = `${baseUrl}/${localModel.value.id}/content${queryString ? '?' + queryString : ''}`;

    const response = await axios.get(downloadUrl, { responseType: 'blob' });

    const type = localModel.value?.type || response.data.type || 'application/octet-stream';
    const filename = localModel.value?.name || 'download';

    const blob = new Blob([response.data], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    if (toast != null) {
      // @ts-ignore
      toast.error(message);
    }
  }
}

function mapAdditionalRules() {
  if (maxFileSize.value != null) {
    const maxBytes = maxFileSize.value * 1024 * 1024;
    const fileSizeRule = (v: File | null | undefined) => {
      if (!v) return true;
      if (v.size > maxBytes) {
        return t('maxSizeFileRule', { maxSize: formatSize(maxBytes) });
      }
      return true;
    };
    rules.value = [...rules.value, fileSizeRule];
  }

  if (availableExt.value.length > 0) {
    const availableExtRule = (v: File | null | undefined) => {
      if (!v) return true;
      const ext = v.name.split('.').pop()?.toLowerCase();
      const allowed = availableExt.value.map((e:string) => e.trim().toLowerCase());
      if (ext && !allowed.includes(ext)) {
        return t('availableExtRule', { ext: availableExt.value.join(', ') });
      }
      return true;
    };
    rules.value = [...rules.value, availableExtRule];
  }
}

function formatSize(size: number | null): string {
  if (!size) return '';
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${(size / 1024).toFixed(1)} KB`;
}

onMounted(async () => {
  if (localModel.value) {
    lastLocalModel.value = localModel.value;
  }
  await bindLabel(schema);
  await bindRules(schema);
  mapAdditionalRules();
  await bindProps(schema);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "pl": {
    "maxSizeFileRule": "Plik przekracza maksymalny rozmiar {maxSize}",
    "availableExtRule": "Dozwolone rozszerzenia: {ext}"
  },
  "en": {
    "maxSizeFileRule": "File exceeds the maximum size {maxSize}",
    "availableExtRule": "Available extensions: {ext}"
  }
}
</i18n>
