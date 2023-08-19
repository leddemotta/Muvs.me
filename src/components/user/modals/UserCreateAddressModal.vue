<script setup>
import { onMounted, ref, reactive, defineEmits } from "vue";
onMounted, ref, reactive;

const emit = defineEmits(["onCreateAddres"]);

import AddressService from "@/services/AddressService";
import UserCreateAddressForm from "../forms/UserCreateAddressForm.vue";

const props = defineProps({
  userId: String,
});

const create = async (payload) => {
  try {
    const { data } = await AddressService.create(payload);
    data;
  } catch (error) {
    console.log(error.message);
  }
};

const onCreateAddres = () => {
  emit("onCreateAddres");
};
</script>

<template>
  <div>
    <UserCreateAddressForm
      @onCreateAddres="onCreateAddres"
      :userId="userId"
      :fieldSizes="{
        zipCode: 12,
        street: 24,
        number: 8,
        complement: 16,
        neighborhood: 12,
        city: 12,
        state: 12,
        country: 12,
        status: 12,
        isHome: 12,
      }"
    />
  </div>
</template>
