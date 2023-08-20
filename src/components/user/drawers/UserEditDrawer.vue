<script setup>
import { onMounted, ref, defineProps } from "vue";
import UserForm from "@/components/user/forms/UserForm.vue";
import userReusables from "../reusables/userReusables";

const { theUser, userDetails } = userReusables;

const props = defineProps({
  userId: String,
});

onMounted(() => {
  userDetails(props.userId);
});
</script>

<template>
  <div>
    <UserForm
      v-if="theUser.user !== undefined"
      :user="theUser.user"
      :addresses="theUser.addresses"
    />
  </div>
</template>