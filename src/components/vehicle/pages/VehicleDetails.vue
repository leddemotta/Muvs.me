<template>
    <div class="vehicle view">
        <a-row :gutter="20">
            <a-col :span="24">
                <h1 class="mb-0">{{ vehicle.details.name }}</h1>
                <div class="meta-infos mb-20">
                    {{ vehicle.details.address.street }},
                    {{ vehicle.details.address.state }},
                    {{ vehicle.details.address.country }}
                </div>
            </a-col>
        </a-row>

        <div class="gallery mb-20">
            <lightbox css="h-400 " :items="images" :cells="5"></lightbox>
            <a-row :gutter="20">
                <a-col :span="24">
                    <!-- <img
                        src="../../../assets/images/vechicle/bicicleta.png"
                        alt="vehicle-pic"
                        style="width: 100%; height: 400px"
                    /> -->
                </a-col>
            </a-row>
        </div>
        <div class="details">
            <a-row :gutter="20">
                <a-col :span="15">
                    <div class="description">
                        <b>Categoria: </b> {{ vehicle.details.type }}

                        <br />

                        <b>Marca: </b> {{ vehicle.details.brand }}

                        <br />

                        <b>Cor: </b> {{ vehicle.details.color }}

                        <br />
                        <b>Peso Máximo Suportado: </b>
                        {{ vehicle.details.maximum_weight }}

                        <br />
                        <b>Elétrico: </b> {{ vehicle.details.is_electric }}

                        <br />
                        <b>Recomendação: </b>
                        +{{ vehicle.details.recommendation }} anos

                        <a-section></a-section>
                        <br />
                        <br />
                        <b>Descrição: </b> <br />
                        {{ vehicle.details.description }}
                    </div>
                    <div class="inline-calendar mt-30">
                        <!-- <vc-calendar></vc-calendar>
                       <vc-date-picker v-model='selectedDate' :columns="$screens({ default: 1, lg: 2 })"  /> -->
                        <date-picker
                            class="mb-20"
                            v-model="selectedDate"
                            :disabled-date="disabledBeforeTodayAndAfterAWeek"
                            :format="'DD/MM/YYYY'"
                            range-separator="a"
                            range
                            inline
                        ></date-picker>
                        <br />
                        {{ selectedDate }}
                    </div>
                </a-col>
                <a-col :span="9">
                    <div class="reservation-box">
                        <h2>R$ {{ vehicle.details.value }} / dia</h2>

                        <date-picker
                            class="mb-20"
                            v-model="selectedDate"
                            :disabled-date="disabledBeforeTodayAndAfterAWeek"
                            range-separator=" a "
                            range
                            :format="'DD/MM/YYYY'"
                        ></date-picker>

                        <a-button
                            size="large"
                            type="primary"
                            style="width: 100%"
                        >
                            <stron> Selecionar datas do aluguel </stron>
                        </a-button>

                        <div class="details">
                            <a-row type="flex" justify="space-between">
                                <a-col>
                                    R$ {{ vehicle.details.value }} x 3 dias
                                </a-col>
                                <a-col> R$ 45 </a-col>
                            </a-row>

                            <a-row type="flex" justify="space-between">
                                <a-col> Taxa de serviço </a-col>
                                <a-col> R$ 5 </a-col>
                            </a-row>

                            <a-row
                                class="total"
                                type="flex"
                                justify="space-between"
                            >
                                <a-col> Total </a-col>
                                <a-col> R$ 50 </a-col>
                            </a-row>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>

        <br /><br /><br /><br />

        <pre
            id="live-debug"
            style="display: none; height: 300px; width: 50%; overflow: auto"
        >
 
      {{ vehicle.details }} </pre
        >
    </div>
</template>

<script>
import vehicleMixins from "@/mixins/vehicle/mixin.js";

export default {
    mixins: [vehicleMixins],
    data() {
        return {
            selectedDate: null,
            images: [
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3598.png",
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3591-600x400.png",
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3590-600x400.png",
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3596-600x400.png",
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3594-600x400.png"
            ],
        };
    },

    methods: {
        disabledBeforeTodayAndAfterAWeek(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return (
                date < today ||
                date > new Date(today.getTime() + 7 * 24 * 3600 * 1000)
            );
        },
        screens(args) {
            if (process.client) {
                return this.$screens(args);
            } else {
                return 2; // <-- your default value
            }
        },
    },
    mounted() {
        this.getVehicle(this.$route.params.id);
    },
};
</script>

<style>
.lb-grid {
    height: 360px;
}

.lb-modal-next,
.lb-modal-prev {
    background: #fff;
    height: 50px;
    width: 50px;
}
</style>

<style lang="sass" scoped>
.description
  font-size: 18px
  color: #333

.reservation-box
  border: 0 //1px solid rgb(221, 221, 221)
  border-radius: 12px
  min-height: 300px
  padding: 24px
  background: #fff
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px
  .details
    margin-top: 20px
    font-size: 18px
    .description
       font-size: 18px
  .total
    margin-top: 20px
    padding: 10px 0
    border-top: 1px solid #ddd
    font-weight: 700
    font-size: 20px
</style>
