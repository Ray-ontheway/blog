<script setup lang="ts">
interface Props {
  tags: string[];
}
const props = defineProps<Props>();
const tags = props.tags || [];
console.log("Tags:", tags);
</script>

<template>
  <div class="tags">
    <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
}
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.6rem;
  background: rgba(99, 102, 241, 0.12);
  color: rgba(17, 24, 39, 0.85);
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 9999px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.15s ease, transform 0.08s ease;
}
</style>
