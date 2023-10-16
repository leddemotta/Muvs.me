<script setup>
import { onMounted } from "vue";

import PageHeader from "@/components/general/PageHeader.vue";
import UserForm from "@/components/user/forms/UserForm.vue";
import userReusables from "@/components/user/reusables/userReusables";

const { theUser, userDetails } = userReusables;

onMounted(() => {
  userDetails(sessionStorage.getItem("userId"));
});
</script>

<template>
  <section class="container p-8">
    <PageHeader class="mt-3 mb-1" title="Perfil" />

    <div class="profile">
      <UserForm
        v-if="theUser.user !== undefined"
        :user="theUser.user"
        :addresses="theUser.addresses"
      />
    </div>
  </section>
</template>

<style lang="sass" scoped>
.profile
  min-height: 500px
  background: #FFF
  border-radius: 6px
  padding: 10px 20px
  overflow: hidden
</style>
