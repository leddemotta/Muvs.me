<script setup>
import { useRouter } from "vue-router";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

const router = useRouter();
</script>

<template>
  <div>
    <a @click="router.go(-1)"> <ArrowLeftOutlined /> Voltar </a>

    <h1 class="mb-3 mt-5 text-center">
      <img
        class="c-pointer inline"
        src="@/assets/images/logo.png"
        width="200"
        alt="muvsme"
        @click="router.push('/')"
      />
    </h1>

    <p class="mb-2" style="font-size: 14px; font-weight: 600; line-height: 1.3">
      Como deseja se cadastrar? 😊
    </p>

    <a-button
      class="w100 mt-5 bolder"
      type="primary"
      size="large"
      ghost
      @click="$router.push(`/signin`)"
    >
      Cadastrar com E-mail
    </a-button>

    <a-button
      class="w100 mt-5 bolder"
      type="primary"
      size="large"
      ghost
      :disabled="true"
    >
      Cadastrar com Facebook
    </a-button>
  </div>
</template>