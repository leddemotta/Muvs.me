<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import vehicleReusables from "../reusables/vehicleReusables";

const { vehicleDetails, theVehicle } = vehicleReusables;
const router = useRouter();

onMounted(() => {
  vehicleDetails(router.currentRoute._value.params.id);

  theVehicle;
});
</script>

<template>
  <section class="bg-white pd-20 min-h-[686px] vehicle view">
    <div class="container">
      <a-row :gutter="20">
        <a-col :span="24">
          <h1 class="mb-0">{{ theVehicle.name }}</h1>
          <div class="meta-infos mb-20">
            <!-- {{ theVehicle.address.street }}, {{ theVehicle.address.state }},
            {{ theVehicle.address.country }} -->
          </div>
        </a-col>
      </a-row>

      <div class="gallery mb-20">
        <a-row :gutter="20">
          <a-col :span="24">
            <img
              :src="theVehicle.image"
              alt="vehicle-pic"
              style="width: 100%; height: 400px"
            />
          </a-col>
        </a-row>
      </div>
      <div class="details">
        <a-row :gutter="20">
          <a-col :span="15">
            <div class="description">
              <b>Categoria: </b> {{ theVehicle.type }}

              <br />

              <b>Marca: </b> {{ theVehicle.brand }}

              <br />

              <b>Cor: </b> {{ theVehicle.color }}

              <br />
              <b>Peso Máximo Suportado: </b>
              {{ theVehicle.maxWight }}

              <br />
              <b>Elétrico: </b> {{ theVehicle.isElectric }}

              <br />
              <b>Recomendação: </b>
              +{{ theVehicle.recommendation }} anos

              <a-section></a-section>
              <br />
              <br />
              <b>Descrição: </b> <br />
              {{ theVehicle.description }}
            </div>
            <div class="inline-calendar mt-30">
              <!-- <vc-calendar></vc-calendar>
                     <vc-date-picker v-model='selectedDate' :columns="$screens({ default: 1, lg: 2 })"  /> -->
              <!-- <date-picker
                class="mb-20"
                v-model="selectedDate"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                :format="'DD/MM/YYYY'"
                range-separator="a"
                range
                inline
              ></date-picker> -->
              <br />
            </div>
          </a-col>
          <a-col :span="9">
            <div class="reservation-box">
              <h2>R$ {{ theVehicle.value }} / dia</h2>

              <!-- <date-picker
                class="mb-20"
                v-model="selectedDate"
                :disabled-date="disabledBeforeTodayAndAfterAWeek"
                range-separator=" a "
                range
                :format="'DD/MM/YYYY'"
              ></date-picker> -->

              <a-button size="large" type="primary" style="width: 100%">
                <stron> Selecionar datas do aluguel </stron>
              </a-button>

              <div class="details">
                <a-row type="flex" justify="space-between">
                  <a-col> R$ {{ theVehicle.value }} x 3 dias </a-col>
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
              </div>
            </div>
          </a-col>
        </a-row>
      </div>

      <pre
        id="live-debug"
        style="display: none; height: 300px; width: 50%; overflow: auto"
      >

    {{ theVehicle }} </pre
      >
    </div>
  </section>
</template>
