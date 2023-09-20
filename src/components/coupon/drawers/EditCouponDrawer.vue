<script setup>
import { onMounted, defineProps } from "vue";
import { useUserStore } from "@/store/userStore";
import couponReusables from "../reusables/couponReusables";
import logReusables from "@/components/log/reusables/logReusables";
import dayjs from "dayjs";

const props = defineProps({
  couponId: String,
});

const { createLog } = logReusables;

const { user } = useUserStore();

const {
  formRules,
  formState,
  formRef,
  isLoading,
  couponDetails,
  updateCoupon,
} = couponReusables;

onMounted(() => {
  couponDetails(props.couponId).then((data) => {
    formState.couponCode = data.couponCode;
    formState.description = data.description;
    formState.discountPercentage = data.discountPercentage;
    formState.usageLimit = data.usageLimit;
    formState.expiresAt = dayjs(data.expiresAt, "YYYY-MM-DD");
  });
});

const onFinish = (values) => {
  formState.userId = user._id;
  console.log("Success:", values, formState);
  updateCoupon(props.couponId, values).then((data) => {
    createLog({
      userId: user._id,
      moduleId: data._id,
      moduleName: "coupon",
      action: "update",
      content: `${user.firstName} ${user.lastName} atualizou os dados do cupom.`,
    });
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
        Atualizar
      </a-button>
    </div>
  </a-form>
</template>
