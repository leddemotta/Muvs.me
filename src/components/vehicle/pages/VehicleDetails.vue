<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import vehicleReusables from "../reusables/vehicleReusables";
import { EnvironmentOutlined } from "@ant-design/icons-vue";

const { vehicleDetails, theVehicle } = vehicleReusables;
const router = useRouter();
const activeKey = ref("infos");

onMounted(() => {
  vehicleDetails(router.currentRoute._value.params.id);
});
</script>

<template>
  <section v-if="theVehicle" class="bg-white p-8 min-h-[686px]">
    <div class="container">
      <a-row justify="space-between" align="middle">
        <a-col>
          <h1 class="mb-0 text-[24px]">{{ theVehicle.vehicle?.name }}</h1>
          <div class="meta-infos text-[#aaa]">
            <EnvironmentOutlined /> {{ theVehicle.address?.street }},
            {{ theVehicle.address?.state }},
            {{ theVehicle.address?.country }}
          </div>
        </a-col>

        <a-col>
          <div class="text-[24px] font-semibold leading-[1] text-right">
            <div class="text-[9px]">Valor da diária</div>
            <font class="text-[16px] font-normal text-[#aaa]">R$</font
            >{{ theVehicle.vehicle?.value
            }}<font class="text-[16px] font-normal">/dia</font>
          </div>
        </a-col>
      </a-row>

      <a-divider class="mt-2" />

      <a-row class="text-[18px]" :gutter="60">
        <a-col :span="15">
          <div class="image">
            <img
              :src="theVehicle.vehicle?.image"
              alt="vehicle-pic"
              style="width: 100%; height: 400px"
            />
          </div>

          <a-tabs class="mt-2" v-model:activeKey="activeKey">
            <a-tab-pane key="infos" tab="Informações">
              <aRow>
                <aCol :span="24">
                  <div class="mt-2">{{ theVehicle.vehicle?.description }}</div>
                  <a-divider />
                </aCol>
                <aCol :span="12">
                  <b>Categoria: </b> {{ theVehicle.vehicle?.type }}
                </aCol>
                <aCol :span="12">
                  <b>Marca: </b> {{ theVehicle.vehicle?.brand }}
                </aCol>
                <aCol :span="12">
                  <b>Cor: </b> {{ theVehicle.vehicle?.color }}
                </aCol>
                <aCol :span="12">
                  <b>Peso Máximo Suportado: </b>
                  {{ theVehicle.vehicle?.maxWeight }}
                </aCol>

                <aCol :span="12">
                  <b>Elétrico: </b> {{ theVehicle.isElectric ? "Sim" : "Não" }}
                </aCol>

                <aCol :span="12">
                  <b>Recomendação: </b>
                  {{ theVehicle.vehicle?.recommendation }} anos
                </aCol>
              </aRow>
            </a-tab-pane>
            <a-tab-pane key="rates" tab="Avaliações" disabled force-render>
            </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :span="9">
          <div class="reservation-box">
            <!-- <h2>R$ {{ theVehicle.vehicle?.value }} / dia</h2> -->

            <!-- <date-picker
                class="mb-20"
                v-model="selectedDate"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                range-separator=" a "
                range
                :format="'DD/MM/YYYY'"
              ></date-picker> -->

            <div class="flow-root">
              <dl class="-my-3 divide-y divide-gray-100 text-sm">
                <div
                  class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Title</dt>
                  <dd class="text-gray-700 sm:col-span-2">Mr</dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Name</dt>
                  <dd class="text-gray-700 sm:col-span-2">John Frusciante</dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Occuputation</dt>
                  <dd class="text-gray-700 sm:col-span-2">Guitarist</dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Salary</dt>
                  <dd class="text-gray-700 sm:col-span-2">$1,000,000+</dd>
                </div>
              </dl>
            </div>

            <a-button
              class="mt-5"
              size="large"
              type="primary"
              style="width: 100%"
            >
              <stron> ALUGAR </stron>
            </a-button>

            <!-- <div class="details">
              <a-row type="flex" justify="space-between">
                <a-col> R$ {{ theVehicle.vehicle?.value }} x 3 dias </a-col>
                <a-col> R$ 45 </a-col>
              </a-row>

              <a-row type="flex" justify="space-between">
                <a-col> Taxa de serviço </a-col>
                <a-col> R$ 5 </a-col>
              </a-row>

              <a-row class="total" type="flex" justify="space-between">
                <a-col> Total </a-col>
                <a-col> R$ 50 </a-col>
              </a-row>
            </div> -->
          </div>
        </a-col>
      </a-row>
    </div>
  </section>
</template>
