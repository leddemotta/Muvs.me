<script setup>
import { onMounted, ref } from "vue";
import vehicleReusables from "@/components/vehicle/reusables/vehicleReusables";
import { useRouter } from "vue-router";

const { vehicles, columns, listVehicles, onClickDeleteVehicle } =
  vehicleReusables;

const router = useRouter();

onMounted(() => {
  listVehicles();
});
</script>

<template>
  <section>
    <aRow :gutter="20">
      <aCol v-for="(vehicle, index) in vehicles.list" :key="index" :span="6">
        <div
          class="vehicle bg-white rounded-[6px]"
          @click="router.push(`/vehicles/${vehicle._id}/details`)"
        >
          <div class="p-3">
            <div
              :class="`h-[200px] w-full bg-no-repeat bg-cover bg-center rounded-[6px]`"
              :style="`background-image: url(${vehicle.image})`"
            ></div>
            <h2 class="text-base font-semibold">{{ vehicle.name }}</h2>
            <div>{{ vehicle.address.city }}, {{ vehicle.address.state }}</div>
            <div>{{ vehicle.type }}</div>
          </div>

          <div class="border-t-2 p-3 border-gray-100">
            R$ {{ vehicle.value }}
          </div>
        </div>
      </aCol>
    </aRow>
  </section>
</template>
