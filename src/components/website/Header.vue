<template>
  <div>
    <header class="website-header">
      <a-row type="flex" justify="space-between">
        <a-col>
          <RouterLink to="/">
            <img
              class="logo c-pointer"
              alt="muvsme"
              src="../../assets/images/logo.png"
              width="160"
          /></RouterLink>
        </a-col>
        <a-col>
          <a-button class="bolder" type="primary" size="large" @click="login()">
            Login
          </a-button>

          <a-button
            class="ml-10 bolder"
            type="primary"
            size="large"
            ghost
            @click="register()"
          >
            Cadastre-se
          </a-button>
        </a-col>
      </a-row>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push(`/login`);
    },
    register() {
      this.$router.push(`/choose-registration`);
    },
  },
};
</script>

<style lang="sass">
.website-header
  padding: 30px !important
  border-bottom: 1px solid #eee !important
  background: #FFF
  position: relative !important
</style>
