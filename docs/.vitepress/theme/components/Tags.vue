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

<style>
:root {
  --tag-bg: rgba(99, 102, 241, 0.12);
  --tag-text: rgba(17, 24, 39, 0.85);
  --tag-border: rgba(99, 102, 241, 0.3);
}
[data-theme="light"] {
  --tag-bg: rgba(99, 102, 241, 0.12);
  --tag-color: rgba(17, 24, 39, 0.85);
  --tag-border: rgba(99, 102, 241, 0.3);
}
[data-theme="dark"] {
  --tag-bg: rgba(99, 102, 241, 0.3);
  --tag-color: rgba(245, 246, 250, 0.98);
  --tag-border: rgba(99, 102, 241, 0.6);
}
</style>

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
  background: var(--tag-bg);
  color: var(--tag-color);
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 9999px;
  border: 1px solid var(--tag-border);
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.15s ease, transform 0.08s ease;
}
</style>
