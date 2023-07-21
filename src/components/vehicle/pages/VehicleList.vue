<template>
    <div>
        <h1 class="upper">{{ formatVehicleTypeName($route.params.type) }}</h1>

        <a-row :gutter="[20, 20]">
            <a-col
                v-for="(vehicle, index) in vehicle.list"
                :key="index"
                span="8"
            >
                <VehicleBox :vehicle="vehicle" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import vehicleMixins from "@/mixins/vehicle/mixin.js";
import VehicleBox from "@/components/vehicle/list/VehicleBox.vue";
import formatThings from "@/mixins/general/formatThings.js";

export default {
    mixins: [vehicleMixins, formatThings],
    components: { VehicleBox },
    mounted() {
        this.vehicle.filters.type.selected = [this.$route.params.type];
        this.getVehicles();
    },
};
</script>

<style lang="scss" scoped></style>
