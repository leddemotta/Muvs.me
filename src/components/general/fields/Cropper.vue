<script setup>
import { ref, defineProps, onMounted } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

const { url } = defineProps({
  url: String,
});

const emit = defineEmits(["onUploadAvatar"]);

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref("");

const handleChange = (info) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    imageUrl.value = info.file.response.url;

    emit("onUploadAvatar", info.file.response.url);
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

onMounted(() => {
  imageUrl.value = url;
});
</script>

<template>
  <div>
    <aUpload
      v-model:file-list="fileList"
      name="file"
      class="w-full"
      action="http://localhost:9000/s3/upload"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div v-if="imageUrl">
        <a-avatar :src="imageUrl" :size="200">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <div v-else>
        <a-avatar :size="200">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        {{ loading }}
      </div>
    </aUpload>
  </div>
</template>
