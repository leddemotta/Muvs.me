<script setup>
import { onMounted, ref, reactive } from "vue";
import AddressService from "@/services/AddressService";
import UserAddressForm from "../forms/UserAddressForm.vue";


const props = defineProps({
  addressId: String,
});

let theAddress = ref({});

const details = async (payload) => {
  try {
    const { data } = await AddressService.details(payload);
    theAddress.value = data.address;
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(() => {
  details(props.addressId);
});
</script>

<template>
  <div>
    <UserAddressForm
      :address="theAddress"
      :disabledCondition="false"
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
