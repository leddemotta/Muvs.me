<script setup>
import { onMounted } from "vue";
import AuthService from "@/services/AuthService";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();

const details = async (payload) => {
  try {
    const { data } = await AuthService.details(payload);
    userStore.setUser(JSON.stringify(data.user));
    userStore.checkSessionStorage();
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(() => {
  details(userStore.userId);
});
</script>

<template>
  <section>
    Olá {{ userStore.user.firstName }} {{ userStore.user.role }}, seja bem-vindo! <br />
    Comece a busca agora!
  </section>
</template>
