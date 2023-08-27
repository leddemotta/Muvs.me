<script setup>
import PageHeader from "@/components/general/PageHeader.vue";
import { reactive } from "vue";

const people = reactive([
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]);
</script>

<template>
  <section class="pd-20">
    <PageHeader class="mt-20 mb-10" title="Enviar Notificações" />

    <ul class="divide-y divide-gray-200">
      <li v-for="person in people" :key="person.email" class="py-4 flex">
        <img class="h-10 w-10 rounded-full" :src="person.image" alt="" />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
          <p class="text-sm text-gray-500">{{ person.email }}</p>
        </div>
      </li>
    </ul>

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
