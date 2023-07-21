<template>
  <div class="page-pd">
    <div class="container">
      <a-row type="flex" justify="space-between">
        <a-col>
          <h1>Veículos</h1>
        </a-col>

        <a-col>
          <a-button type="primary" @click="openCreateVehicle = true">
            Cadastrar veículo
          </a-button>

          <a-drawer
            placement="right"
            :closable="true"
            :visible="openCreateVehicle"
            @close="openCreateVehicle = false"
            width="900"
          >
            <template #title> Criar veículo </template>

            <a-form :form="form" @submit="handleSubmit">
              <VehicleFields :form="form" />
            </a-form>
          </a-drawer>
        </a-col>
      </a-row>

      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Meus veículos">
          <a-row :gutter="[20, 20]">
            <a-col
              v-for="(vehicle, index) in vehicle.list"
              :key="index"
              span="8"
            >
              <VehicleBox :vehicle="vehicle" />
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Meus Alugueis" force-render>
          <a-row :gutter="[20, 20]">
            <a-col
              v-for="(vehicle, index) in vehicle.list"
              :key="index"
              span="8"
            >
              <VehicleBox :vehicle="vehicle" />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import VehicleBox from "@/components/vehicle/list/VehicleBox.vue";
import vehicleMixins from "@/mixins/vehicle/mixin.js";
import VehicleFields from "@/components/vehicle/forms/VehicleFields.vue";

export default {
  mixins: [vehicleMixins],
  components: {
    VehicleBox,
    VehicleFields,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      openCreateVehicle: true,
    };
  },
  mounted() {
    this.getVehicles();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        values.owner_id = this.$store.state.userData.id;

        values.address_id = "1";
        values.status = "Active";
        values.value_currency = "BRL";
        values.rate = "0";

        console.log(err, values);

        if (!err) {
          this.loading = true;

          this.loading = false;
          this.$http
            .post("/vehicle/create", values)
            .then(({ data }) => {
              data;
              this.$message.success(data.message);
              this.loading = false;
            })
            .catch(({ response }) => {
              this.$message.error(response.data.message);
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.create
  height: 600px
  background: #FFF
  border-radius: 6px
  transition: .3s
  padding: 10px 20px
  overflow: hidden
</style>
