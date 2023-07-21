<template>
    <div>
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
                            >Por quanto você alugaria seu veícuclo por
                            dia?</label
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

                <a-col :span="8">
                    <a-form-item>
                        <label>
                            Selecione como deseja liberar as datas para
                            aluguel:</label
                        >
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
    </div>
</template>

<script>
import vehicleTypes from "@/json/vehicleTypes.json";
import vehicleBrands from "@/json/vehicleBrands.json";
import recommendations from "@/json/recommendations.json";
import colors from "@/json/colors.json";

export default {
    props: {
        form: Object,
    },
    mixins: [],
    data() {
        return {
            vehicleTypes,
            vehicleBrands,
            recommendations,
            colors,
        };
    },
    mounted() {
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
};
</script>

<style lang="scss" scoped></style>
