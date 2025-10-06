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
  >
    <template #selection="{ fileNames }">
      <v-chip
        class="ma-1"
        closable
        @click:close="removeFile"
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
import axios from 'axios';

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

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { label, bindLabel } = useLabel(schema);

const id = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('dataId') ||
    params.get('taskId') ||
    params.get('processId') ||
    params.get(idReference.value)
  );
});

const uploadFileUrl = ref(
  schema.url ||
    `/api/v1/features/{featureId}/files?dataId={dataId}&temporary=false&fieldPath=${schema.key}`,
);
const idReference = ref(schema.idQueryParamName || 'id');

const featureId = computed(() => {
  return schema.options?.context?.featureId || 'unknown-feature-id';
});

const localModel = computed({
  get(): FileInfo {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});

async function updateFileByAPI() {
  try {
    const formData = new FormData();
    formData.append('file', localModel.value);
    const response = await axios.post(
      uploadFileUrl.value
        .replace(`{featureId}`, featureId.value + '')
        .replace('{dataId}', id.value + ''),
      formData,
    );
    localModel.value = {
      id: response.data.fileId,
      name: localModel.value.name,
      size: localModel.value.size,
      type: localModel.value.type,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    if (toast != null) {
      // @ts-ignore
      toast.error(message);
    }
    localModel.value = null;
  }
}

async function removeFile() {
  try {
    await axios.delete(
      uploadFileUrl.value
        .replace('{dataId}', id.value + '')
        .replace(`{featureId}`, featureId.value + ''),
    );
    localModel.value = null;
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
      .replace(`{featureId}`, featureId.value + '')
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

onMounted(async () => {
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);
});
</script>

<style lang="css" scoped></style>
