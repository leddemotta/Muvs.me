<script setup></script>

<template>
  <div>
    <a @click="$router.go(-1)">  Voltar </a>

    <h1 class="mt-20 mb-30">
      <img src="@/assets/images/logo.png" width="200" alt="muvsme" />
    </h1>

    <p
      class="mb-20"
      style="font-size: 14px; font-weight: 600; line-height: 1.3"
    >
      Como deseja se cadastrar? 😊
    </p>

    <a-button
      class="w100 mt-10 bolder"
      type="primary"
      size="large"
      ghost
      @click="$router.push(`/signin`)"
    >
      Cadastrar com E-mail
    </a-button>

    <a-button
      class="w100 mt-20 bolder"
      type="primary"
      size="large"
      ghost
      :disabled="true"
    >
      Cadastrar com Facebook
    </a-button>
  </div>
</template>