<template>
  <button :class="`${bgColor} text-white px-4 py-1.5 !rounded-full text-sm whitespace-nowrap`">
    {{ props.text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['text', 'secondary'])

const bgColor = computed(() => props.secondary !== undefined ? 'bg-secondary' : 'bg-primary')
</script>