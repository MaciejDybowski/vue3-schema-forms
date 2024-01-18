<template>
  <div
    class="v-input__details"
    v-if="errorMessages.length > 0"
  >
    <div
      role="alert"
      aria-live="polite"
    >
      <template v-for="item in errorMessages">
        <div class="v-messages__message color-error mt-2 d-flex">
          <v-hover>
            <template #default="{ isHovering, props }">
              <div
                v-bind="props"
                :class="isHovering ? 'text-decoration-underline' : ''"
                :style="isHovering ? 'cursor:pointer' : ''"
                @click="scrollToItem(item.id)"
              >
                {{ item.label }}
              </div>
            </template>
          </v-hover>
          <div>: {{ item.messages[0] }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ValidationError } from "@/vocabulary/engine/formValidation";

const props = defineProps<{
  errorMessages: Array<ValidationError>;
}>();

function scrollToItem(id: string) {
  const itemRef = document.getElementById(id);
  if (itemRef)
    itemRef?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
}
</script>

<style scoped lang="scss">
.color-error {
  color: rgb(var(--v-theme-error));
}
</style>
