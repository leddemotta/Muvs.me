<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";
import { message } from "ant-design-vue";

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
const formState = reactive({
  email: "",
  password: "",
  remember: true,
});

const login = async (payload) => {
  try {
    isLoading.value = true;
    const { data } = await AuthService.login(payload);
    userStore.setLoggedInUser(data.userId, data.token, true);
    router.push("/");
  } catch (error) {
    console.log(error);
  //  message.error(error.response.data.message);
  } finally {
    isLoading.value = false;
  }
};

const onFinish = (values) => {
  console.log("Success:", values);
  login(values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div>
    <a-form
      ref="formRef"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 class="mb-30">
        <RouterLink to="/">
          <img
            class="c-pointer"
            src="@/assets/images/logo.png"
            width="200"
            alt="muvsme"
          />
        </RouterLink>
      </h1>

      <p class="mb-20">Insira seu e-mail e senha:</p>

      <a-form-item
        name="email"
        :rules="[
          {
            required: true,
            type: 'email',
            message: 'Please input your email!',
          },
        ]"
      >
        <a-input
          v-model:value="formState.email"
          placeholder="Insira seu e-mail"
          size="large"
        />
      </a-form-item>

      <a-form-item
        name="password"
        size="large"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="Insira sua senha"
        />
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember"> Lembrar </a-checkbox>
        <a class="login-form-forgot" @click="$router.push('/forgot-password')">
          Esqueceu sua senha?
        </a>
      </a-form-item>

      <a-form-item>
        <a-button
          class="bolder w100"
          type="primary"
          size="large"
          html-type="submit"
          :loading="isLoading"
          >Acessar</a-button
        >
      </a-form-item>
    </a-form>

    <a-divider class="f12">Novo(a) por aqui?</a-divider>

    <a-button
      class="w100 mt-10 bolder"
      type="primary"
      size="large"
      ghost
      @click="$router.push('/choose-registration')"
    >
      Cadastre-se
    </a-button>
  </div>
</template>

<style lang="sass" scoped></style>
