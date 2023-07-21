<template>
    <a-form class="login-form" :form="form" @submit="handleSubmit">
        <a @click="$router.push('/login')">
            <a-icon type="arrow-left" /> Voltar
        </a>

        <h1 class="mt-30">Alterar Senha</h1>

        <a-form-item>
            <a-input
                class="travel-input"
                size="large"
                v-decorator="[
                    'password',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Escreva sua nova senha.',
                            },
                        ],
                    },
                ]"
                type="password"
                placeholder="Insira sua nova senha"
            >
                <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                />
            </a-input>
        </a-form-item>

        <a-form-item>
            <a-input
                class="travel-input"
                size="large"
                v-decorator="[
                    'confirm',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Repita a sua nova senha.',
                            },
                            {
                                validator: compareToFirstPassword,
                            },
                        ],
                    },
                ]"
                type="password"
                placeholder="Repita sua nova senha"
            >
                <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                />
            </a-input>
        </a-form-item>

        <a-form-item>
            <a-button
                type="primary"
                size="large"
                html-type="submit"
                :loading="loading"
            >
                Enviar
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            sent: false,
            loading: false,
        };
    },
    mounted() {},
    methods: {
        changePassword(userData) {
            this.$http
                .post("/user/change-password", userData)
                .then(({ data }) => {
                    this.$message.success(data.message);
                    this.loading = false;
                    setTimeout(() => {
                        this.$router.push("/login");
                    }, 500);
                })
                .catch(({ response }) => {
                    this.$message.error(response.data.message);
                    this.loading = false;
                });
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue("password")) {
                callback("As senhas digitadas não são iguais.");
            } else {
                callback();
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            this.loading = true;
            this.form.validateFields((err, values) => {
                if (!err) {
                    values["hash"] = this.$route.params.hash;
                    this.changePassword(values);
                } else {
                    this.loading = false;
                }
            });
        },
    },
};
</script>
