<script setup lang="ts">
import { mdiOpenInNew } from '@mdi/js';

const props = defineProps<{
  path?: string;
  color?: string;
}>();

// define
const { SITE_REPO } = useRuntimeConfig().public;

// events
const onPressedContribute = () => {
  window.open(`${SITE_REPO}${props.path || ''}`);
};
</script>

<template>
  <v-btn
    :text="$t('common.editThisPage')"
    :append-icon="mdiOpenInNew"
    :color="props.color || 'primary'"
    variant="text"
    size="small"
    @click="onPressedContribute"
  />
</template>
