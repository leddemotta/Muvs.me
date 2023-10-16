<script setup>
import VehicleForm from "../forms/VehicleForm.vue";
import PageHeader from "@/components/general/PageHeader.vue";
</script>

<template>
  <section class="bg-white p-4 min-h-[686px]">
    <div class="container">
      <PageHeader class="mt-5 mb-5" title="Novo veículo" subTitle="">
      </PageHeader>
      <VehicleForm action="create" />
    </div>
  </section>
</template>