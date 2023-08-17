<template>
  <div>
    HOME LOGGED
    <!-- <div class="banner">
          <diV class="container">
              <div class="search-wrapper"><Search /></div>
          </diV>
      </div>

      <diV class="container">

          <a-row :gutter="[20, 20]">
              <a-col
                  v-for="(vehicle, index) in vehicle.list"
                  :key="index"
                  span="8"
              >
                  <VehicleBox :vehicle="vehicle" />
              </a-col>
          </a-row>
      </diV> -->
  </div>
</template>

<script>
// import VehicleBox from "@/components/vehicle/list/VehicleBox.vue";
// import vehicleMixins from "@/mixins/vehicle/mixin.js";
// import Search from "@/components/general/Search.vue";

// export default {
//   mixins: [vehicleMixins],
//   components: { VehicleBox, Search },
//   data() {
//     return {};
//   },
//   beforeMount() {
//     this.getVehicles();
//   },
// };
</script>

<style lang="sass" scoped>
.banner
  margin-bottom: 60px
  height: 460px
  background-size: cover !important
  background: url(../../assets/images/home/system-home.jpg) center no-repeat
.search-wrapper
  position: relative
  top: 260px
</style>
