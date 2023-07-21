<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/website/Header.vue";
import Content from "@/components/website/Content.vue";
import Footer from "@/components/website/Footer.vue";
</script>

<template>
  <Header />
  <Content />
  <Footer />
</template>

<style lang="sass">
@import 'assets/sass/style.sass'
</style>
