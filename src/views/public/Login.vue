<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm.vue";
import ChooseRegistration from "@/components/login/ChooseRegistration.vue";
import Registration from "@/components/login/Registration.vue";

const loggedIn = (boolean) => {
  this.$emit("loggedIn", boolean);
};
</script>

<template>
  <div class="login">
    <div class="bordered">
      <a-row>
        <a-col :offset="16" :span="7">
          <div class="box">
            <LoginForm v-if="$route.name === 'login'" @loggedIn="loggedIn" />
            <ForgotPasswordForm v-if="$route.name === 'forgot-password'" />
            <ChooseRegistration v-if="$route.name === 'choose-registration'" />
            <Registration v-if="$route.name === 'signin'" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.login
  background: #fff url(@/assets/images/sgray.jpg) bottom center no-repeat
  background-size: cover
  padding: 30px
  height: 100vh
  box-sizing: border-box
  .bordered
    padding: 30px
    border-radius: 20px
    background-color: #ff4228
    background: url(../../assets/images/muvsme-child.jpg) bottom center no-repeat
    background-size: cover
    height: 92vh
    box-sizing: border-box
    .box
      text-align: center
      margin-top: 20px
      background: #FFF
      width: 100%
      padding: 40px
      border-radius: 20px
      box-sizing: border-box
</style>
