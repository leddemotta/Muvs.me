<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/website/Header.vue";
import Content from "@/components/website/Content.vue";
import Footer from "@/components/website/Footer.vue";
//import { inject } from 'vue'

// import SystemHeader from "@/components/system/Header.vue";
// import SystemContent from "@/components/system/Content.vue";
// import SystemFooter from "@/components/system/Footer.vue";

// const axios = inject('axios')  // inject axios


</script>

<template>
  <div>

    <h2 v-if="user">Bem-vindo, {{ user.name }}</h2>

    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#ff4228',
          borderRadius: 4
        },
      }"
    >
      <div v-if="$store.state.isLoggedIn">
        <!-- <SystemHeader />
    <SystemContent />
    <SystemFooter /> -->
      </div>
      <div v-if="!$store.state.isLoggedIn">
        <Header v-if="$route.meta.page !== 'login'" />
        <Content />
        <Footer v-if="$route.meta.page !== 'login'" />
      </div>
    </a-config-provider>
  </div>
</template>

<style lang="sass">
@import 'assets/sass/style.sass'
</style>
