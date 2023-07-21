<template>
  <div class="page-pd">
    <div class="container">
      <a-row type="flex" justify="space-between">
        <a-col> <h1>Meus Veículos</h1> </a-col>
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
              <div class="create">
                <a-row :gutter="20">
                  <a-col :span="12">
                    <a-form-item>
                      <label>O que você está alugando?</label>

                      <a-select
                        show-search
                        placeholder="Selecione"
                        size="large"
                        v-decorator="[
                          'type',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        style="width: 100%"
                      >
                        <a-select-option
                          v-for="(item, index) of vehicleTypes"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item>
                      <label>Qual a marca?</label>

                      <a-select
                        show-search
                        placeholder="Selecione"
                        size="large"
                        v-decorator="[
                          'brand',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        style="width: 100%"
                      >
                        <a-select-option
                          v-for="(item, index) of vehicleBrands"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item>
                      <label>Legal! Qual nome você daria?</label>

                      <a-input
                        size="large"
                        v-decorator="[
                          'name',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        :placeholder="`Bicicleta Caloy do ${this.$store.state.userData.first_name}`"
                      >
                      </a-input>
                    </a-form-item>
                  </a-col>

                  <a-col :span="24">
                    <a-form-item>
                      <label>Fale um pouco sobre seu veículo </label>

                      <a-textarea
                        size="large"
                        v-decorator="[
                          'description',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        placeholder="Escreva aqui..."
                        :rows="4"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :span="8">
                    <a-form-item>
                      <label
                        >Por quanto você alugaria seu veícuclo por dia?</label
                      >
                      <a-input
                        size="large"
                        v-currency
                        v-decorator="[
                          'value',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        :placeholder="`Insira um valor`"
                      >
                        <!-- <template slot="addonAfter"> /dia</template> -->
                      </a-input>
                    </a-form-item>
                  </a-col>

                  <a-col :span="8">
                    <a-form-item>
                      <label>Cor</label>

                      <a-select
                        show-search
                        placeholder="Selecione"
                        size="large"
                        v-decorator="[
                          'color',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        style="width: 100%"
                      >
                        <a-select-option
                          v-for="(item, index) of colors"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col :span="8">
                    <a-form-item>
                      <label>Peso máximo suportado</label>
                      <a-input
                        size="large"
                        v-decorator="[
                          'maximum_weight',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        :placeholder="`Insira um valor`"
                      >
                        <!-- <template slot="addonAfter"> /dia</template> -->
                      </a-input>
                    </a-form-item>
                  </a-col>

                  <a-col :span="8">
                    <a-form-item>
                      <label>Recomendação</label>

                      <a-select
                        show-search
                        placeholder="Selecione"
                        size="large"
                        v-decorator="[
                          'recommendation',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Obrigatório',
                              },
                            ],
                          },
                        ]"
                        style="width: 100%"
                      >
                        <a-select-option
                          v-for="(item, index) of recommendations"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col class="a-center" :span="24">
                    <a-button
                      html-type="submit"
                      type="primary"
                      size="large"
                      :loading="loading"
                    >
                      Cadastrar
                    </a-button>
                  </a-col>
                </a-row>
              </div>
            </a-form>
          </a-drawer>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-for="(vehicle, index) in vehicle.list" :key="index" span="24">
          <VehicleBox :vehicle="vehicle" />
        </a-col>
      </a-row>

      <!--
            <HotelDatePicker :i18n="ptBr"> </HotelDatePicker> -->
    </div>
  </div>
</template>

<script>
import vehicleTypes from "@/json/vehicleTypes.json";
import vehicleBrands from "@/json/vehicleBrands.json";
import recommendations from "@/json/recommendations.json";
import colors from "@/json/colors.json";

import VehicleBox from "@/components/vehicle/list/VehicleBox.vue";

import vehicleMixins from "@/mixins/vehicle/mixin.js";

export default {
  mixins: [vehicleMixins],
  components: {
    VehicleBox,
  },
  data() {
    return {
      vehicleTypes,
      vehicleBrands,
      recommendations,
      colors,
      openCreateVehicle: false,
      form: this.$form.createForm(this),
      loading: false,

      ptBr: {
        night: "Dia",
        nights: "Dias",
        "day-names": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        "check-in": "Chegada",
        "check-out": "Partida",
        "month-names": [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
      },
    };
  },
  mounted() {
    this.getVehicles();

    this.form.setFieldsValue({
      type: "Bicicleta",
      brand: "Caloi",
      name: "Bicicleta Caloy do Ledilson",
      description: "Lorem ipsum dolor",
      value: 10,
      color: "Black",
      maximum_weight: "100",
      recommendation: 18,
    });
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
