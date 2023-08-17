<script setup>
import { onMounted, ref, reactive } from "vue";
import AuthService from "@/services/AuthService";
import UserFormFields from "@/components/user/forms/UserFormFields.vue";

const props = defineProps({
  userId: String,
});

let theUser = ref({});

const details = async (payload) => {
  try {
    const { data } = await AuthService.details(payload);
    //console.log(data);
    theUser.value = data;
    //  console.log(theUser);
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(() => {
  details(props.userId);
});
</script>

<template>
  <div>
    <UserFormFields v-if="theUser.user !== undefined" :user="theUser.user" />
  </div>
</template>
