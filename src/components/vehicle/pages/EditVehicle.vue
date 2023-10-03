<script setup>
import VehicleForm from "../forms/VehicleForm.vue";
import PageHeader from "@/components/general/PageHeader.vue";

//${$route.params.id}
</script>

<template>
  <section class="bg-white pd-20 min-h-[686px]">
    <div class="container">
      <PageHeader
        class="mt-20 mb-20"
        :title="`Editar veículo`"
        subTitle=""
      >
      </PageHeader>
      <VehicleForm action="edit" />
    </div>
  </section>
</template>
