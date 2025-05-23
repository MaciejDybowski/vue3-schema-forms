<template>
  <v-avatar
    v-if="!loading"
    :size="size"
    color="primary"
  >
    <v-img
      v-if="image"
      :alt="`user-${id}-avatar`"
      :src="image"
    />
    <span
      v-else
      class="text-white"
      v-html="initials"
    />
  </v-avatar>
  <div
    v-else
    :style="`width: ${size}px ; height: ${size}px ;`"
    class="skeleton-loader-circle"
  />
</template>

<script lang="ts" setup>
import axios from 'axios';

import { onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: number;
    id: string;
    initials: string;
  }>(),
  {
    size: 32,
  },
);

const loading = ref(true);
const image = ref('');

const toBase64 = (file:any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function fetchUserAvatarById(id: string, size: number): Promise<any> {
  const response = await axios.get(`/api/v1/users/${id}/avatar`, {
    params: {
      size: size,
    },
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });

  try {
    image.value = (await toBase64(response.data)) as string;
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  try {
    loading.value = true;
    await fetchUserAvatarById(props.id, props.size);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.skeleton-loader-circle {
  border-radius: 50%;
  background-color: #ddd;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

:deep(.v-skeleton-loader > *) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.v-skeleton-loader .v-skeleton-loader__bone) {
  flex-grow: 1;
}
</style>
