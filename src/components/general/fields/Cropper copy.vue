<script setup>
import { ref } from "vue";
import AvatarCropper from "vue-avatar-cropper";

const userAvatar = ref("url");
const message = ref("ready");
const showCropper = ref(false);

// const handleUploaded = (resp) => {
//   console.log("handleUploaded", resp);
//   //this.userAvatar.value = resp.url;
// };

// const handleCompleted = (response, form, xhr) => {
//   console.log("handleCompleted", response, form, xhr);
// };

const handleUploading = (form, xhr) => {
  message.value = "uploading...";
};
const handleUploaded = ({ form, request, response }) => {
  console.log('handleUploaded',form, request, response);
  if (response.status === "success") {
    userAvatar.value = response.url;
    // Maybe you need call vuex action to
    // update user avatar, for example:
    // this.$dispatch('updateUser', {avatar: response.url})
    message.value = "user avatar updated.";
  }
};
const handleCompleted = (response, form, xhr) => {
  console.log('handleCompleted',response, form, xhr);
  message.value = "upload completed.";
};
const handlerError = (message, type, xhr) => {
  message.value = "Oops! Something went wrong...";
};
</script>

<template>

  {{ userAvatar }}
  <div >
    <div class="border rounded vue-avatar-cropper-demo text-center">
      <div class="p-6">
        <div class="relative">
          <img :src="userAvatar" class="avatar" />
          <div class="absolute bottom-0 left-0 right-0">
            <a
              class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
              @click="showCropper = true"
            >
              Select an new image
            </a>
          </div>
        </div>
        <h5 class="font-bold mb-0">led</h5>
        <div class="text-gray-500">led</div>
      </div>
      <div class="border-t p-6 text-gray-500" v-html="message"></div>
      <avatar-cropper
        @uploading="handleUploading"
        @uploaded="handleUploaded"
        @completed="handleCompleted"
        @error="handlerError"
        v-model="showCropper"
        upload-url="http://localhost:9000/s3/upload"
      />
    </div>
  </div>
</template>

<style>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}
.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 20vh;
}
.card:hover .card-img-overlay {
  display: block;
}
</style>
