<script setup>
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
</script>

<template>
  <div class="content">
   Olá {{ userStore.user.firstName }}!
  </div>
</template>

<style lang="sass" scoped>
.content
  background: #f4f4f4
  padding: 0px 0px 30px 110px
  min-height: 684px
</style>
