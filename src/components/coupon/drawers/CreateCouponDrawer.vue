<script setup>
import { onMounted, defineEmits } from "vue";
import couponReusables from "../reusables/couponReusables";
import { useUserStore } from "@/store/userStore";

const { user } = useUserStore();
const { formRules, formState, formRef, isLoading, createCoupon } =
  couponReusables;

const emit = defineEmits(["onCreateCoupon"]);

onMounted(() => {
  // formState.couponCode = "FIRSTONE";
  // formState.description = "first coupon of all";
  // formState.discountPercentage = 10;
  // formState.usageLimit = 1;
});

const onFinish = (values) => {
  formState.userId = user._id;
  console.log("Success:", values, formState);
  createCoupon(formState).then(() => {
    emit("onCreateCoupon");
  });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <a-form
    ref="formRef"
    :rules="formRules"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item name="couponCode">
          <label>Coupon Code</label>
          <a-input
            v-model:value="formState.couponCode"
            placeholder="ex: PROMOCODE"
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item name="description">
          <label>Description</label>
          <a-input v-model:value="formState.description" placeholder="Write...">
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item name="discountPercentage">
          <label>Discount Percentage</label>
          <a-input
            v-model:value="formState.discountPercentage"
            placeholder="Write..."
          >
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item name="usageLimit">
          <label>Usage Limit</label>
          <a-input v-model:value="formState.usageLimit" placeholder="Write...">
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item name="expiresAt">
          <label>Expires At</label>

          <div>
            <a-date-picker
              type="datetime"
              placeholder="__/__/____"
              format="DD/MM/YYYY"
              :showToday="false"
              v-model:value="formState.expiresAt"
            >
            </a-date-picker>
          </div>
        </a-form-item>
      </a-col>
    </a-row>

    <div class="a-center">
      <a-divider class="mt-10" />
      <a-button type="primary" html-type="submit" :loading="isLoading">
        Cadastrar
      </a-button>
    </div>
  </a-form>
</template>
