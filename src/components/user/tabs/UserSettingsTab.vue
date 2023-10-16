<script setup>
import { ref, onMounted, defineProps } from "vue";
import Cropper from "@/components/general/fields/Cropper.vue";

const { formState, user } = defineProps({
  formState: Object,
  user: Object,
});

const onUploadAvatar = (avatar) => {
  console.log("emitted", avatar);
  formState.avatar = avatar;
};

onMounted(() => {
  formState.avatar = user.avatar;
});
</script>

<template>
  <section>
    <Cropper @onUploadAvatar="onUploadAvatar" :url="user.avatar" />
    <a-form-item class="hidden" name="avatar">
      <label>avatar</label>
      <a-input v-model:value="formState.avatar" placeholder="avatar"> </a-input>
    </a-form-item>
  </section>
</template>
