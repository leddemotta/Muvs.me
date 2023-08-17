<script setup>
const props = defineProps({
  routes: Array,
  title: String,
  subTitle: String,
});
</script>

<template>
  <div>
    <a-page-header class="m-page-header" :title="title" :sub-title="subTitle">
      <template #extra>
        <slot name="extra" />
      </template>
    </a-page-header>
  </div>
</template>

<style lang="sass" scoped>
.m-page-header
  padding: 20px 0
</style>