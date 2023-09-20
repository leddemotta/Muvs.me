<script setup>
// import { useUserStore } from "@/store/userStore";
// const userStore = useUserStore();
// Olá {{ userStore.user.firstName }}!
</script>

<template>
  <div class="content">
    <RouterView />
  </div>
</template>

<style lang="sass" scoped>
.content
  background: #f4f4f4
  padding: 0px 0px 30px 100px
  min-height: 684px
</style>
