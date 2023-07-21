<template>
    <div class="page-pd">
        <div class="container">
            <!-- {{ $route.params }} -->
            <div v-if="$route.params.id == undefined"><VehicleList /></div>
            <div v-if="$route.params.slug == 'edit'">EDIT</div>
            <div v-if="$route.params.slug != 'edit'"><VehicleDetails /></div>
        </div>
    </div>
</template>

<script>
import vehicleMixins from "@/mixins/vehicle/mixin.js";
import VehicleDetails from "@/components/vehicle/pages/VehicleDetails.vue";
import VehicleList from "./pages/VehicleList.vue";

export default {
    mixins: [vehicleMixins],
    components: { VehicleDetails, VehicleList },
    data() {
        return {};
    },
    methods: {},
    beforeCreate() {},
};
</script>

<style lang="scss" scoped></style>
