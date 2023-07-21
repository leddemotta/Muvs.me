<template>
    <div>
        <a-row :gutter="20">
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
                        style="width: 100%"
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
                        style="width: 100%"
                    >
                        <a-select-option
                            v-for="(item, index) of genres"
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
                    >
                    </a-input-password></a-form-item
            ></a-col>

            <a-col :span="12">
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
                                        required: false,
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
                    >
                    </a-input-password>
                </a-form-item>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import genres from "@/json/genres.json";

export default {
    props: { form: Object },
    data() {
        return { genres };
    },
    methods: {
        compareToFirstPassword(rule, value, callback) {
            //console.log("compareToFirstPassword", value, "call", callback);
            if (value && value !== this.form.getFieldValue("userPassword")) {
                callback("As senhas digitadas não são iguais.");
            } else {
                callback();
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
