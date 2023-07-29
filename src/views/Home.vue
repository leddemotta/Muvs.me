<script setup>
import Home from "./public/Home.vue";
import HomeSystem from "./private/Home.vue";
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();
</script>

<template>
  <div>
    <div v-if="userStore.isLoggedIn">
      <HomeSystem />
    </div>
    <div v-if="!userStore.isLoggedIn">
      <Home />
    </div>
  </div>
</template>
