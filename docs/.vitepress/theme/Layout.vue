<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Tags from "./components/Tags.vue";

const DefaultLayout = DefaultTheme.Layout;
const { frontmatter } = useData();
console.log("Frontmatter:", frontmatter.value.title, frontmatter.value.tags);
</script>

<template>
  <component :is="DefaultLayout">
    <template #doc-before>
      <div class="doc-header">
        <h1 class="doc-top-title">{{ frontmatter.title }}</h1>
        <Tags :tags="frontmatter.tags" />
        <p class="doc-top-desc">{{ frontmatter.description }}</p>
      </div>
    </template>
  </component>
</template>

<style lang="scss" scoped>
.doc-header {
  width: 100%;
}

.doc-top-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.8em;
}
</style>
