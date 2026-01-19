<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Tags from "./components/Tags.vue";

const DefaultLayout = DefaultTheme.Layout;
const { frontmatter } = useData();
</script>

<template>
  <component :is="DefaultLayout">
    <template #page-top>
      <Tags :tags="frontmatter.tags" />
    </template>
  </component>
</template>
