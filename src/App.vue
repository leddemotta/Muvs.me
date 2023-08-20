<script setup>
import { useUserStore } from "./store/userStore";

import Header from "@/components/website/Header.vue";
import Content from "@/components/website/Content.vue";
import Footer from "@/components/website/Footer.vue";

import SystemHeader from "@/components/system/Header.vue";
import SystemContent from "@/components/system/Content.vue";
import SystemFooter from "@/components/system/Footer.vue";

const userStore = useUserStore();
userStore.checkSessionStorage();
</script>

<template>
  <div>
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#ff4228',
          borderRadius: 4,
        },
      }"
    >
      <section class="logged-in" v-if="userStore.isLoggedIn">
        <SystemHeader />
        <SystemContent />
        <SystemFooter />
      </section>

      <section v-if="!userStore.isLoggedIn">
        <Header v-if="$route.meta.page !== 'login'" />
        <Content />
        <Footer v-if="$route.meta.page !== 'login'" />
      </section>
    </a-config-provider>
  </div>
</template>

<style lang="sass">
@import 'assets/sass/style.sass'
</style>

<style lang="css">
@import "assets/fonts/icomoon/style.css";
</style>
