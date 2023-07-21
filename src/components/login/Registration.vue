<template>
    <div>
        <a-form :form="form" @submit="handleSubmit">
            <a-row>
                <a-col v-if="currentStep == 0" class="mb-20" :span="24">
                    <a @click="$router.go(-1)">
                        <a-icon type="left-circle" /> Voltar
                    </a>
                </a-col>

                <a-col :span="24">
                    <a-steps
                        v-model="currentStep"
                        size="small"
                        type="navigation"
                        :style="stepStyle"
                    >
                        <a-step
                            v-for="(step, index) in steps"
                            :key="index"
                            :status="step.status"
                            :title="step.title"
                        />
                    </a-steps>
                </a-col>
            </a-row>

            <a-row v-show="currentStep == 0" class="a-left mt-20" :gutter="20">
                <a-col :span="12">
                    <a-form-item>
                        <label>Nome</label>
                        <a-input
                            v-decorator="[
                                'first_name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Obrigatório',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="Primeiro nome"
                        >
                        </a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="travel-input">
                        <label>Sobrenome</label>
                        <a-input
                            v-decorator="[
                                'last_name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Obrigatório',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="Sobrenome"
                        >
                        </a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item class="travel-input">
                        <label>E-mail</label>
                        <a-input
                            autoComplete="off"
                            v-decorator="[
                                'email',
                                {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'Escreva um e-mail válido',
                                        },
                                        {
                                            required: true,
                                            message: 'Obrigatório',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="Seu melhor E-mail =)"
                        >
                        </a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item>
                        <label>CPF</label>
                        <a-input
                            v-mask="'###.###.###-##'"
                            v-decorator="[
                                'cpf',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Obrigatório',
                                        },
                                    ],
                                },
                            ]"
                            placeholder=""
                        >
                        </a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item>
                        <label>Nascimento</label>

                        <a-date-picker
                            placeholder="__/__/____"
                            format="DD/MM/YYYY"
                            v-mask="'##/##/####'"
                            :showToday="false"
                            v-decorator="[
                                'birthday',
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
                        </a-date-picker>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item>
                        <label>Celular</label>
                        <a-input
                            v-mask="'(##) # ####-####'"
                            v-decorator="[
                                'phone',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Obrigatório',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="DDD + Número"
                        >
                        </a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item>
                        <label>Sexo</label>

                        <a-select
                            show-search
                            placeholder="Selecione"
                            v-decorator="[
                                'gender',
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
                                v-for="(item, index) of genders"
                                :key="index"
                                :value="item.value"
                            >
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col class="mt-10" span="24">
                    <a-button
                        class="bolder w100"
                        type="primary"
                        size="large"
                        @click="secondStep"
                        :disabled="validateFirstStep()"
                    >
                        Próximo <a-icon type="arrow-right" />
                    </a-button>
                </a-col>
            </a-row>

            <a-row v-show="currentStep == 1" class="a-left mt-20" :gutter="20">
                <Address
                    :form="form"
                    :disabledCondition="false"
                    :fieldSizes="{
                        zip_code: 12,
                        street: 24,
                        number: 8,
                        complement: 16,
                        neighborhood: 12,
                        city: 12,
                        state: 12,
                        country: 12,
                    }"
                />

                <a-col class="mt-10" span="6">
                    <a-button
                        class="bolder w100"
                        type="primary"
                        size="large"
                        @click="currentStep = 0"
                        ghost
                    >
                        <a-icon type="arrow-left" />
                    </a-button>
                </a-col>

                <a-col class="mt-10" span="18">
                    <a-button
                        class="bolder w100"
                        type="primary"
                        size="large"
                        @click="lastStep"
                        :disabled="validateSecondStep()"
                    >
                        Próximo <a-icon type="arrow-right" />
                    </a-button>
                </a-col>
            </a-row>

            <a-row v-show="currentStep == 2" class="a-left mt-20" :gutter="20">
                <a-col :span="24">
                    <p>
                        A senha deve conter no <b>mínimo 6 caracteres</b>, e
                        também <b>números e letras</b>:
                    </p>
                </a-col>
                <a-col :span="24">
                    <a-form-item>
                        <label>Senha</label>
                        <a-input-password
                            v-decorator="[
                                'userPassword',
                                {
                                    rules: [
                                        {
                                            min: 6,
                                            message:
                                                'A senha deve conter mais de 6 caracteres.',
                                        },
                                    ],
                                },
                            ]"
                            type="password"
                            placeholder="Insira a senha"
                            @change="validateLastStep()"
                        >
                        </a-input-password></a-form-item
                ></a-col>

                <a-col :span="24">
                    <a-form-item class="travel-input">
                        <label>Repita a senha</label>
                        <a-input-password
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        {
                                            min: 6,
                                            message:
                                                'A senha deve conter mais de 6 caracteres.',
                                        },
                                        {
                                            required: true,
                                            message: 'Repita a senha.',
                                        },
                                        {
                                            validator: compareToFirstPassword,
                                        },
                                    ],
                                },
                            ]"
                            type="password"
                            placeholder="Repita a senha"
                            @change="validateLastStep()"
                        >
                        </a-input-password>
                    </a-form-item>
                </a-col>

                <a-col class="mt-10" :span="24">
                    <a-button
                        class="bolder w100"
                        type="primary"
                        size="large"
                        html-type="submit"
                        :loading="loading"
                        :disabled="
                            !validateFirstStep() &&
                            !validateSecondStep() &&
                            !validateLastStep()
                                ? false
                                : true
                        "
                    >
                        Cadastrar-se
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
import Address from "../general/Address.vue";

export default {
    name: "Registration",
    components: { Address },
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false,
            currentStep: 2,
            steps: [
                { title: "", status: "process" },
                { title: "", status: "wait" },
                { title: "", status: "wait" },
            ],
            stepStyle: {
                paddingTop: "0px",
                marginBottom: "0px",
                boxShadow: "0px -1px 0 0 #e8e8e8 inset",
            },
            genders: [
                { label: "Masculino", value: "male" },
                { label: "Feminino", value: "female" },
                { label: "Outrxs", value: "other" },
            ],
        };
    },
    mounted() {
        // this.form.setFieldsValue({
        //     birthday: "1990-09-18",
        //     city: "Ouro Preto",
        //     complement: "Casa 2° andar",
        //     country: "Brasil",
        //     cpf: "091.642.466-98",
        //     email: "ledde.motta@gmail.com",
        //     first_name: "Ledilson",
        //     gender: "Masculino",
        //     last_name: "Motta",
        //     neighborhood: "Saramenha",
        //     number: "176",
        //     phone: "(31) 9 99139-5984",
        //     state: "MG",
        //     street: "Rua José Mendes",
        //     zip_code: "35400-000",
        // });
    },
    methods: {
        secondStep() {
            this.currentStep = 1;
        },
        lastStep() {
            this.currentStep = 2;
        },
        validateFirstStep() {
            let flag = true;

            if (
                this.form.getFieldValue(`first_name`) &&
                this.form.getFieldValue(`last_name`) &&
                this.form.getFieldValue(`email`) &&
                this.form.getFieldValue(`cpf`) &&
                this.form.getFieldValue(`birthday`) &&
                this.form.getFieldValue(`phone`) &&
                this.form.getFieldValue(`gender`)
            ) {
                flag = false;
                this.steps[0].status = "finish";
            } else {
                this.steps[0].status = "process";
            }

            return flag;
        },
        validateSecondStep() {
            let flag = true;
            if (
                this.form.getFieldValue(`city`) &&
                this.form.getFieldValue(`country`) &&
                this.form.getFieldValue(`neighborhood`) &&
                this.form.getFieldValue(`number`) &&
                this.form.getFieldValue(`state`) &&
                this.form.getFieldValue(`street`) &&
                this.form.getFieldValue(`zip_code`)
            ) {
                flag = false;
                this.steps[1].status = "finish";
            } else {
                this.steps[1].status = "process";
            }

            return flag;
        },

        validateLastStep() {
            let flag = true;
            // setTimeout(() => {
            if (
                this.form.getFieldValue(`password`) &&
                this.form.getFieldValue(`userPassword`) &&
                this.form.getFieldValue(`userPassword`) ===
                    this.form.getFieldValue(`password`)
            ) {
                flag = false;
                this.steps[2].status = "finish";
            } else {
                this.steps[2].status = "process";
            }
            // }, 100);

            return flag;
        },
        compareToFirstPassword(rule, value, callback) {
            console.log("compareToFirstPassword", value, "call", callback);
            if (value && value !== this.form.getFieldValue("userPassword")) {
                callback("As senhas digitadas não são iguais.");
            } else {
                callback();
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            this.loading = true;
            this.form.validateFields((err, values) => {
                console.log(err, values);
                if (!err) {
                    this.$http
                        .post("/user/signin", values)
                        .then(({ data }) => {
                            this.$message.success(data.message);
                            this.loading = false;
                            this.form.resetFields();
                            setTimeout(() => {
                                window.open("/login", "_self");
                            }, 100);
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