<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <header>
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <RouterLink to="/">
            <img
              class="logo c-pointer"
              alt="muvsme"
              src="@/assets/images/logo.png"
              width="160"
            />
          </RouterLink>
        </a-col>
        <a-col>
          <a-button
            class="bolder"
            type="primary"
            size="large"
            @click="router.push(`/login`)"
          >
            Login
          </a-button>

          <a-button
            class="ml-5 bolder"
            type="primary"
            size="large"
            ghost
            @click="router.push(`/choose-registration`)"
          >
            Cadastre-se
          </a-button>
        </a-col>
      </a-row>
    </header>
  </div>
</template>
