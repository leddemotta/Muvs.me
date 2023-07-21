<template>
    <span>
        <a-col :span="fieldSizes.zip_code">
            <a-form-item>
                <label :class="form.getFieldValue('zip_code') ? 'filled' : ''">
                    CEP
                </label>
                <a-input
                    placeholder="CEP"
                    :disabled="disabledCondition"
                    v-mask="'#####-###'"
                    @change="getLocation()"
                    v-decorator="[
                        'zip_code',
                        {
                            rules: [
                                {
                                    required: true,
                                    min: 8,
                                    message: 'Obrigatório.',
                                },
                            ],
                        },
                    ]"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.street">
            <a-form-item>
                <label :class="form.getFieldValue('street') ? 'filled' : ''">
                    Logradouro
                </label>
                <a-input
                    :disabled="disabledCondition"
                    placeholder="Logradouro"
                    v-decorator="[
                        'street',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.number">
            <a-form-item>
                <label :class="form.getFieldValue('number') ? 'filled' : ''">
                    Número
                </label>
                <a-input
                    type="number"
                    :disabled="disabledCondition"
                    placeholder="Número"
                    v-decorator="[
                        'number',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.complement">
            <a-form-item>
                <label
                    :class="form.getFieldValue('complement') ? 'filled' : ''"
                >
                    Complemento
                </label>
                <a-input
                    placeholder="Complemento"
                    :disabled="disabledCondition"
                    v-decorator="['complement']"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.neighborhood">
            <a-form-item>
                <label
                    :class="form.getFieldValue('neighborhood') ? 'filled' : ''"
                >
                    Bairro
                </label>
                <a-input
                    placeholder="Bairro"
                    :disabled="disabledCondition"
                    v-decorator="[
                        'neighborhood',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.city">
            <a-form-item>
                <label :class="form.getFieldValue('city') ? 'filled' : ''">
                    Cidade
                </label>
                <a-input
                    placeholder="Cidade"
                    :disabled="disabledCondition"
                    v-decorator="[
                        'city',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                </a-input>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.state">
            <a-form-item>
                <label :class="form.getFieldValue('state') ? 'filled' : ''">
                    Estado
                </label>
                <a-select
                    show-search
                    :disabled="disabledCondition"
                    placeholder="ES"
                    allowClear
                    v-decorator="[
                        'state',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                    <a-select-option
                        v-for="(item, index) of states"
                        :key="index"
                        :value="item.initials"
                    >
                        {{ item.initials.toUpperCase() }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-col>

        <a-col :span="fieldSizes.country">
            <a-form-item>
                <label :class="form.getFieldValue('country') ? 'filled' : ''">
                    País
                </label>
                <a-select
                    show-search
                    :disabled="disabledCondition"
                    placeholder="País"
                    optionFilterProp="txt"
                    allowClear
                    v-decorator="[
                        'country',
                        {
                            rules: [
                                {
                                    required: false,
                                    message: 'Obrigatório',
                                },
                            ],
                        },
                    ]"
                >
                    <a-select-option
                        v-for="(item, index) of countries"
                        :key="index"
                        :value="item.Pais.toUpperCase()"
                        :txt="item.Pais"
                    >
                        {{ item.Pais.toUpperCase() }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-col>

        <div class="clearboth" />
    </span>
</template>

<script>
// import states from "@/json/states";
// import countries from "@/json/countries";
import axios from "axios";

export default {
    name: "AddressData",
    props: ["form", "disabledCondition", "fieldSizes"],
    data() {
        return {
            states: [],
            countries: [],
        };
    },
    beforeMount() {},
    mounted() {
        console.log("AddressData fieldSizes", this.fieldSizes);

        if (this.fieldSizes == undefined) {
            this.fieldSizes = {
                zip_code: 12,
                street: 24,
                number: 8,
                complement: 16,
                neighborhood: 12,
                city: 12,
                state: 12,
                country: 12,
            };
        }
    },
    methods: {
        getLocation() {
            setTimeout(() => {
                if (this.form.getFieldValue("zip_code")) {
                    if (
                        this.form.getFieldValue("zip_code").replace("-", "")
                            .length == 8
                    ) {
                        this.cepLoading = true;
                        axios
                            .get(
                                "https://viacep.com.br/ws/" +
                                    this.form.getFieldValue("zip_code") +
                                    "/json/"
                            )
                            .then(({ data }) => {
                                data;
                                this.cepLoading = false;
                                let country = undefined;

                                this.states.forEach((state) => {
                                    state.initials == data.uf
                                        ? (country = "BRASIL")
                                        : "";
                                });

                                setTimeout(() => {
                                    this.form.setFieldsValue({
                                        street: data.logradouro.toUpperCase(),
                                        state: data.uf,
                                        number: data.complemento,
                                        city: data.localidade.toUpperCase(),
                                        neighborhood: data.bairro.toUpperCase(),
                                        country: country,
                                    });
                                }, 20);
                            })
                            .catch(({ response }) => {
                                response;
                                this.$message.error(
                                    "Houve um problema ao recuperar a localização."
                                );
                                this.cepLoading = false;
                            });
                    }
                }
            }, 110);
        },
    },
};
</script>
