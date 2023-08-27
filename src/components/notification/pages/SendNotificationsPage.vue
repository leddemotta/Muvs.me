<script setup>
import PageHeader from "@/components/general/PageHeader.vue";
import { ref, reactive } from "vue";

const notificationFormRef = ref();
const notificationFormState = reactive({});
const notificationFormRules = reactive({
  title: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
  content: [
    {
      required: true,
      message: "Obrigatório",
    },
  ],
});

const onFinish = (values) => {
  console.log("Success:", values, notificationFormState);
};

const onFinishFailed = (errorInfo) => console.log("Failed:", errorInfo);
</script>

<template>
  <section class="pd-20">
    <PageHeader class="mt-20 mb-10" title="Send notifications" />

    <aRow :gutter="20">
      <aCol :span="10">
        <div class="bg-white px-5 py-5 rounded-lg">
          <aForm
            ref="notificationFormRef"
            :model="notificationFormState"
            :rules="notificationFormRules"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-alert
              class="mb-20 text-1xl rounded"
              message="Send notifications to all users."
              type="info"
              banner
            />

            <div class="mb-20">
              <a-form-item name="title">
                <label>Title</label>
                <a-input
                  v-model:value="notificationFormState.title"
                  placeholder="Write..."
                />
              </a-form-item>
            </div>

            <div class="mb-10">
              <a-form-item name="content">
                <label>Content</label>
                <a-textarea
                  v-model:value="notificationFormState.content"
                  placeholder="Write a message..."
                  :rows="4"
                />
              </a-form-item>
            </div>

            <div class="mb-20">
              <a-form-item name="url">
                <label>Url</label>
                <a-input
                  v-model:value="notificationFormState.url"
                  placeholder="/users"
                />
              </a-form-item>
            </div>

            <div class="text-center">
              <a-button type="primary" html-type="submit"
                >Send notification</a-button
              >
            </div>
          </aForm>
        </div>
      </aCol>

      <aCol class="" :span="14">
        <div class="bg-white px-5 py-5 rounded-lg">Later...</div>
      </aCol>
    </aRow>
  </section>
</template>
