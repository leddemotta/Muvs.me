<template>
  <div class="login">
    <div class="bordered">
      <a-row>
        <a-col :span="16"> . </a-col>
        <a-col :span="7">
          <div class="box">
            <LoginForm
              v-if="$route.meta.slug === 'login'"
              @loggedIn="loggedIn"
            />
            <ForgotPasswordForm v-if="$route.meta.slug === 'forgot-password'" />
            <ChooseRegistration
              v-if="$route.meta.slug === 'choose-registration'"
            />
            <Registration v-if="$route.meta.slug === 'signin'" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm.vue";
import ForgotPasswordForm from "@/components/login/ForgotPasswordForm.vue";
import ChooseRegistration from "@/components/login/ChooseRegistration.vue";
import Registration from "@/components/login/Registration.vue";

export default {
  components: {
    LoginForm,
    ForgotPasswordForm,
    ChooseRegistration,
    Registration,
  },
  data() {
    return {};
  },
  methods: {
    loggedIn(boolean) {
      this.$emit("loggedIn", boolean);
    },
  },
};
</script>

<style lang="sass" scoped>
.login
  background: #fff url(../../assets/images/sgray.jpg) bottom center no-repeat
  background-size: cover
  padding: 30px
  height: 100vh
  .bordered
    padding: 30px
    border-radius: 20px
    background-color: #ff4228
    background: url(../../assets/images/muvsme-child.jpg) bottom center no-repeat
    background-size: cover
    height: 92vh
    .box
      text-align: center
      margin-top: 20px
      background: #FFF
      width: 100%
      padding: 40px
      border-radius: 20px
</style>
