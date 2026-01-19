<template>
  <div class="tags">
    <span v-for="tag in props.tags" :key="tag">{{ tag }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tags: string[];
}
const props = defineProps<Props>();
</script>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
