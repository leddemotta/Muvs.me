<script setup>
import PageHeader from "@/components/general/PageHeader.vue";
</script>

<template>
  <section class="pd-20">
    <PageHeader class="mt-20 mb-10" title="Enviar Notificações" />

    <aRow :gutter="20">
      <aCol :span="10">
        <a-textarea v-model:value="value" placeholder="Basic usage" :rows="4" />
      </aCol>

      <aCol class="underline" :span="12">
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        Later...
      </aCol>
    </aRow>
  </section>
</template>
