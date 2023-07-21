<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <h1 class="mb-30">
        <router-link to="/" tag="span">
          <img
            class="c-pointer"
            src="../../assets/images/logo.png"
            width="200"
            alt="muvsme"
          />
        </router-link>
      </h1>

      <p class="mb-20">Insira seu e-mail e senha:</p>

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
        <a-input-password
          size="large"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Escreva sua senha.',
                },
              ],
            },
          ]"
          type="password"
          placeholder="Insira sua senha"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Lembrar
        </a-checkbox>

        <a class="login-form-forgot" @click="forgotPassword()">
          Esqueceu sua senha?
        </a>
      </a-form-item>

      <a-form-item>
        <a-button
          class="bolder w100"
          type="primary"
          size="large"
          html-type="submit"
          :loading="loading"
        >
          Acessar
        </a-button>
      </a-form-item>
    </a-form>

    <a-divider>Nova(o) por aqui?</a-divider>

    <a-button
      class="w100 mt-10 bolder"
      type="primary"
      size="large"
      ghost
      @click="register()"
    >
      Cadastre-se
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
    };
  },
  methods: {
    forgotPassword() {
      this.$router.push(`/forgot-password`);
    },
    register() {
      this.$router.push(`/choose-registration`);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$http
            .post("/token", values)
            .then(({ data }) => {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userId", data.userId);
              localStorage.setItem("isLoggedIn", true);

              this.$store.state.isLoggedIn = true;
              setTimeout(() => {
                window.open("/", "_self");
              }, 500);

              this.loading = false;
            })
            .catch(({ response }) => {
              this.$message.error(response.data.message);
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped></style>
