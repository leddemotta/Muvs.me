<template>
  <a-form class="login-form" :form="form" @submit="handleSubmit">
    <a @click="$router.go(-1)"> <a-icon type="left-circle" /> Voltar </a>

    <h1 class="mt-20 mb-30">
      <img src="@/assets/images/logo.png" width="200" alt="muvsme" />
    </h1>

    <div v-if="sentEmailRequest">
      <a-alert class="mt-20" type="success" message="">
        <div
          slot="description"
          style="
            font-size: 14px;
            font-weight: 600;
            color: #478e00;
            line-height: 1.3;
          "
        >
          Um e-mail de redefinição de senha foi enviado para o seu endereço de
          e-mail, mas pode levar alguns minutos para aparecer na sua caixa de
          entrada. <br />
          <br />
          Aguarde pelo menos 10 minutos antes de tentar novamente ou verifique
          sua caixa de spam.
        </div>
      </a-alert>
    </div>

    <div v-if="!sentEmailRequest">
      <p
        class="mb-20"
        style="font-size: 14px; font-weight: 600; line-height: 1.3"
      >
        Perdeu sua senha? Digite seu endereço de e-mail. Você receberá um link
        por e-mail para criar uma nova senha.
      </p>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'Escreva um e-mail válido.',
                },
                {
                  required: true,
                  message: 'Escreva seu e-mail no campo.',
                },
              ],
            },
          ]"
          placeholder="Insira seu e-mail"
        >
          <a-icon
            slot="prefix"
            type="mail"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          class="bolder"
          type="primary"
          size="large"
          html-type="submit"
          :loading="loading"
        >
          Alterar senha
        </a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      sentEmailRequest: false,
    };
  },
  methods: {
    recoverPassword(userData) {
      this.$http
        .post("/user/forgot-password", userData)
        .then(({ data }) => {
          console.log(data.message);
          this.$message.success("Sucesso!");
          this.loading = false;
          this.sentEmailRequest = true;
        })
        .catch(({ response }) => {
          this.$message.error(response.data.message);
          this.loading = false;
          this.sentEmailRequest = false;
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          this.recoverPassword(values);
        } else {
          this.loading = false;
          this.sentEmailRequest = false;
        }
      });
    },
  },
};
</script>
