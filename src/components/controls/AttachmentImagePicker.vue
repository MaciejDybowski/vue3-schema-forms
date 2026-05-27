<template>
  <v-card
    class="attachment-image-picker"
    variant="outlined"
    v-bind="fieldProps"
  >
    <v-card-title
      v-if="label"
      class="text-subtitle-1 pb-0"
    >
      {{ label }}
    </v-card-title>

    <v-card-text>
      <v-alert
        v-if="errorMessage"
        class="mb-3"
        type="error"
        variant="tonal"
      >
        {{ errorMessage }}
        <template #append>
          <v-btn
            v-bind="actionButtonProps"
            @click="loadAttachments"
          >
            Ponów
          </v-btn>
        </template>
      </v-alert>

      <div
        v-if="loading"
        class="attachment-image-picker__loading"
      >
        <v-progress-circular indeterminate />
      </div>

      <template v-else>
        <div class="d-flex align-center justify-space-between mb-3 ga-3 flex-wrap">
          <div class="text-caption text-medium-emphasis">
            Zdjęcia: {{ visibleImages.length }} / {{ images.length }}, zaznaczone:
            {{ selectedImages.length }}
          </div>
          <v-btn
            v-if="!readonly && selectedImages.length"
            v-bind="actionButtonProps"
            @click="clearSelection"
          >
            Wyczyść wybór
          </v-btn>
        </div>

        <div
          v-if="images.length"
          class="attachment-image-picker__content"
          :class="{ 'attachment-image-picker__content--with-folders': showFolderSidebar }"
        >
          <v-sheet
            v-if="showFolderSidebar"
            class="attachment-image-picker__folders"
            rounded
            border
          >
            <v-list
              density="compact"
              nav
            >
              <v-list-item
                :active="selectedFolder === null"
                prepend-icon="mdi-image-multiple"
                title="Wszystkie zdjęcia"
                @click="selectedFolder = null"
              />
              <v-list-item
                v-for="folder in folders"
                :key="folder.path"
                :active="selectedFolder === folder.path"
                prepend-icon="mdi-folder-outline"
                :title="folder.name"
                :subtitle="folder.path"
                @click="selectedFolder = folder.path"
              />
            </v-list>
          </v-sheet>

          <div class="attachment-image-picker__gallery">
            <v-select
              v-if="showFolderSelect"
              v-model="selectedFolder"
              class="mb-3"
              v-bind="folderSelectProps"
              :items="folderOptions"
              item-title="title"
              item-value="value"
            />

            <v-carousel
              v-if="displayMode === 'carousel'"
              v-model="carouselIndex"
              class="attachment-image-picker__carousel"
              hide-delimiter-background
              show-arrows="hover"
            >
              <v-carousel-item
                v-for="image in visibleImages"
                :key="image.id"
              >
                <div class="attachment-image-picker__carousel-item">
                  <v-img
                    class="attachment-image-picker__image cursor-pointer"
                    :src="image.contentUrl"
                    cover
                    @click="openPreview(image)"
                  />
                  <v-btn
                    class="attachment-image-picker__checkbox"
                    :icon="selectionIcon(image.id)"
                    :disabled="readonly"
                    :color="isSelected(image.id) ? 'primary' : 'surface'"
                    density="compact"
                    size="x-small"
                    variant="flat"
                    @click.stop="toggleSelection(image)"
                  />
                </div>
              </v-carousel-item>
            </v-carousel>

            <v-row v-else>
              <v-col
                v-for="image in visibleImages"
                :key="image.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card class="attachment-image-picker__tile">
                  <v-img
                    class="attachment-image-picker__image cursor-pointer"
                    :src="image.contentUrl"
                    aspect-ratio="1"
                    cover
                    @click="openPreview(image)"
                  />
                  <v-btn
                    class="attachment-image-picker__checkbox"
                    :icon="selectionIcon(image.id)"
                    :disabled="readonly"
                    :color="isSelected(image.id) ? 'primary' : 'surface'"
                    density="compact"
                    size="x-small"
                    variant="flat"
                    @click.stop="toggleSelection(image)"
                  />
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>

        <v-alert
          v-else
          type="info"
          variant="tonal"
        >
          Brak zdjęć w załącznikach.
        </v-alert>
      </template>
    </v-card-text>
  </v-card>

  <v-dialog
    v-model="previewOpen"
    max-width="min(1100px, 96vw)"
  >
    <v-card
      v-if="previewImage"
      class="attachment-image-picker__preview-card"
    >
      <v-toolbar density="compact">
        <v-toolbar-title>{{ previewImage.displayName }}</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="previewOpen = false"
        />
      </v-toolbar>
      <v-card-text class="attachment-image-picker__preview-body pa-0">
        <v-img
          :src="previewImage.contentUrl"
          class="attachment-image-picker__preview-image"
          contain
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import axios from 'axios';

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { useFormModel, useLabel, useProps, useResolveVariables } from '@/core/composables';
import { EngineAttachmentImagePickerField } from '@/types/engine/controls';

interface AttachmentFile {
  id: string;
  filename: string;
  filesize: number;
  mediaType: string;
  description?: string | null;
  labels?: unknown[];
  createdAt?: string;
}

interface PickerImage extends AttachmentFile {
  menuFeatureId: string;
  dataId: string;
  contentUrl: string;
  folderPath: string;
  displayName: string;
}

interface SelectedAttachmentImage {
  id: string;
  filename: string;
  mediaType: string;
  menuFeatureId: string;
  dataId: string;
  contentUrl: string;
}

const props = defineProps<{
  schema: EngineAttachmentImagePickerField;
  model: object;
}>();

const { getValue, setValue } = useFormModel();
const { bindLabel, label } = useLabel(props.schema);
const { bindProps, fieldProps } = useProps();
const { resolve } = useResolveVariables();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

const loading = ref(false);
const errorMessage = ref('');
const loadedImages = ref<PickerImage[]>([]);
const selectedFolder = ref<string | null>(null);
const previewOpen = ref(false);
const previewImage = ref<PickerImage | null>(null);
const carouselIndex = ref(0);
const resolvedDataId = ref('');
let stopFormModelListener: (() => void) | null = null;

const selectedImages = computed<SelectedAttachmentImage[]>({
  get() {
    const value = getValue(props.model, props.schema, []);
    return Array.isArray(value) ? value : [];
  },
  set(value) {
    setValue(value, props.schema);
  },
});

const readonly = computed(() => fieldProps.value.readonly === true);
const displayMode = computed(() => props.schema.mode || fieldProps.value.mode || 'grid');
const showFolders = computed(
  () => props.schema.showFolderTree !== false && folders.value.length > 0,
);
const folderViewMode = computed(
  () => props.schema.folderViewMode || fieldProps.value.folderViewMode || 'sidebar',
);
const showFolderSidebar = computed(() => showFolders.value && folderViewMode.value === 'sidebar');
const showFolderSelect = computed(() => showFolders.value && folderViewMode.value === 'select');
const actionButtonProps = computed(() => props.schema.options?.buttonProps || {});
const folderSelectProps = computed(() => ({
  'hide-details': 'auto',
  ...props.schema.options?.fieldProps,
  ...props.schema.options?.selectProps,
  ...props.schema.folderSelectProps,
  label: 'Folder',
}));

const menuFeatureId = computed(() => {
  return String(
    props.schema.source?.menuFeatureId || props.schema.options?.context?.menuFeatureId || '',
  );
});

const dataId = computed(() => {
  return resolvedDataId.value;
});

const images = computed(() => {
  if (readonly.value && selectedImages.value.length) {
    return selectedImages.value.map(mapSelectedToPickerImage);
  }
  if (loadedImages.value.length) return loadedImages.value;
  return selectedImages.value.map(mapSelectedToPickerImage);
});

const visibleImages = computed(() => {
  if (!selectedFolder.value) return images.value;
  return images.value.filter((image) => image.folderPath === selectedFolder.value);
});

const folders = computed(() => {
  const folderMap = new Map<string, { path: string; name: string }>();
  for (const image of images.value) {
    if (!image.folderPath) continue;
    const segments = image.folderPath.split('/').filter(Boolean);
    for (let index = 0; index < segments.length; index++) {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      folderMap.set(path, {
        path,
        name: `${'  '.repeat(index)}${segments[index]}`,
      });
    }
  }
  return Array.from(folderMap.values()).sort((a, b) => a.path.localeCompare(b.path));
});

const folderOptions = computed(() => [
  {
    title: 'Wszystkie zdjęcia',
    value: null,
  },
  ...folders.value.map((folder) => ({
    title: folder.path,
    value: folder.path,
  })),
]);

function allowedExtensions() {
  return (props.schema.imageExtensions || 'jpg,jpeg,png,gif,webp,svg')
    .split(',')
    .map((extension) => extension.trim().replace(/^\./, '').toLowerCase())
    .filter(Boolean);
}

function isImage(file: AttachmentFile) {
  const mediaType = (file.mediaType || '').toLowerCase().replace(/^\./, '');
  return file.filesize > 0 && allowedExtensions().includes(mediaType);
}

function isDirectory(file: AttachmentFile) {
  return file.filesize === 0 && file.filename.endsWith('/');
}

function normalizePath(filename: string) {
  return filename.startsWith('/') ? filename : `/${filename}`;
}

function resolveFolderPath(filename: string) {
  const normalized = normalizePath(filename).replace(/\/$/, '');
  const lastSeparatorIndex = normalized.lastIndexOf('/');
  return lastSeparatorIndex > 0 ? normalized.slice(0, lastSeparatorIndex) : '';
}

function resolveDisplayName(filename: string) {
  const normalized = filename.replace(/\/$/, '');
  return normalized.split('/').filter(Boolean).pop() || filename;
}

function encodePathSegment(value: string) {
  return encodeURIComponent(value);
}

function buildContentUrl(fileId: string, featureId = menuFeatureId.value, entityId = dataId.value) {
  const queryParams = new URLSearchParams();
  queryParams.set('dataId', entityId);
  return `/api/v1/features/${encodePathSegment(featureId)}/files/${encodePathSegment(fileId)}/content?${queryParams.toString()}`;
}

function mapToPickerImage(file: AttachmentFile): PickerImage {
  return {
    ...file,
    menuFeatureId: menuFeatureId.value,
    dataId: dataId.value,
    contentUrl: buildContentUrl(file.id),
    folderPath: resolveFolderPath(file.filename),
    displayName: resolveDisplayName(file.filename),
  };
}

function mapSelectedToPickerImage(image: SelectedAttachmentImage): PickerImage {
  return {
    id: image.id,
    filename: image.filename,
    filesize: 0,
    mediaType: image.mediaType,
    menuFeatureId: image.menuFeatureId,
    dataId: image.dataId,
    contentUrl: image.contentUrl,
    folderPath: resolveFolderPath(image.filename),
    displayName: resolveDisplayName(image.filename),
  };
}

function normalizeSelectedImage(image: PickerImage): SelectedAttachmentImage {
  return {
    id: image.id,
    filename: image.filename,
    mediaType: image.mediaType,
    menuFeatureId: image.menuFeatureId,
    dataId: image.dataId,
    contentUrl: image.contentUrl,
  };
}

async function loadAttachments() {
  await updateDataId();

  if (!menuFeatureId.value || !dataId.value) {
    loadedImages.value = [];
    errorMessage.value = '';
    return;
  }

  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get<AttachmentFile[]>(
      `/api/v1/features/${encodePathSegment(menuFeatureId.value)}/files`,
      {
        params: {
          dataId: dataId.value,
        },
      },
    );
    loadedImages.value = response.data
      .filter((file) => !isDirectory(file) && isImage(file))
      .map(mapToPickerImage);
  } catch (error: any) {
    errorMessage.value = error?.message || 'Nie udało się pobrać załączników.';
  } finally {
    loading.value = false;
  }
}

async function updateDataId() {
  const dataIdPath = props.schema.source?.dataIdPath;
  if (!dataIdPath) {
    resolvedDataId.value = '';
    return;
  }

  const template = dataIdPath.match(/^{.*}$/) ? dataIdPath : `{${dataIdPath}}`;
  const result = await resolve(props.schema, template, true);
  resolvedDataId.value = result.allVariablesResolved ? result.resolvedText : '';
}

async function reloadWhenDataIdChanged() {
  const previousDataId = resolvedDataId.value;
  await updateDataId();
  if (previousDataId === resolvedDataId.value) return;

  selectedFolder.value = null;
  await loadAttachments();
}

function isSelected(imageId: string) {
  return selectedImages.value.some((image) => image.id === imageId);
}

function selectionIcon(imageId: string) {
  return isSelected(imageId) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline';
}

function toggleSelection(image: PickerImage) {
  if (readonly.value) return;

  const selected = selectedImages.value;
  if (isSelected(image.id)) {
    selectedImages.value = selected.filter((item) => item.id !== image.id);
    return;
  }

  const normalized = normalizeSelectedImage(image);
  selectedImages.value =
    props.schema.selectionMode === 'single' ? [normalized] : [...selected, normalized];
}

function clearSelection() {
  selectedImages.value = [];
}

function openPreview(image: PickerImage) {
  previewImage.value = image;
  previewOpen.value = true;
}

watch(
  () => menuFeatureId.value,
  async () => {
    selectedFolder.value = null;
    await loadAttachments();
  },
);

onMounted(async () => {
  await bindLabel(props.schema);
  await bindProps(props.schema);
  await loadAttachments();
  stopFormModelListener = vueSchemaFormEventBus.on(reloadWhenDataIdChanged);
});

onBeforeUnmount(() => {
  stopFormModelListener?.();
});
</script>

<style lang="css" scoped>
.attachment-image-picker__loading {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 220px;
}

.attachment-image-picker__content {
  display: block;
}

.attachment-image-picker__content--with-folders {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(180px, 260px) 1fr;
}

.attachment-image-picker__folders {
  align-self: start;
  max-height: 520px;
  overflow: auto;
}

.attachment-image-picker__gallery {
  min-width: 0;
}

.attachment-image-picker__tile,
.attachment-image-picker__carousel-item {
  position: relative;
}

.attachment-image-picker__carousel,
.attachment-image-picker__carousel-item {
  min-height: 420px;
}

.attachment-image-picker__carousel-item {
  height: 100%;
}

.attachment-image-picker__image {
  height: 100%;
}

.attachment-image-picker__checkbox {
  box-shadow: 0 1px 6px rgba(15, 23, 42, 0.22);
  height: 26px;
  min-width: 26px;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 26px;
  z-index: 2;
}

.attachment-image-picker__checkbox :deep(.v-icon) {
  font-size: 18px;
}

.attachment-image-picker__preview-card {
  max-height: 92vh;
}

.attachment-image-picker__preview-body {
  height: calc(92vh - 48px);
  overflow: hidden;
}

.attachment-image-picker__preview-image {
  height: 100%;
  width: 100%;
}

@media (max-width: 780px) {
  .attachment-image-picker__content--with-folders {
    grid-template-columns: 1fr;
  }
}
</style>
