<template>
  <div>
    <div class="addresses">
      <div class="mb-30 mt-30">
        <center>
          <img src="@/assets/images/profile/Address-girl.png" width="300" />
        </center>
      </div>
      <div v-if="addresses.length > 0">
        <div v-for="(address, index) in addresses" :key="index" class="address">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col class="ico" :span="2">
              <img
                v-if="address.is_home == '1'"
                src="@/assets/images/profile/home.png"
              />
              <img
                v-if="address.is_home == '0'"
                src="@/assets/images/profile/maps.png"
              />
            </a-col>
            <a-col :span="20"
              ><div class="name" v-if="address.is_home == '1'">Casa</div>
              <div class="name" v-if="address.is_home == '0'">
                {{ address.street }}, {{ address.number }}
              </div>
              <div class="location">
                {{ address.complement ? address.complement + "," : "" }}
                {{ address.neighborhood }}, {{ address.city }},
                {{ address.state }}
              </div></a-col
            >
            <a-col :span="2" class="actions a-right">
              <!-- <a-icon type="right" /> -->
              <a-icon class="mr-10" type="edit" />
              <a-icon type="delete" />
            </a-col>
          </a-row>
        </div>
      </div>
      <div v-if="addresses.length == 0">
        <!-- <a-empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    :image-style="{
                        height: '60px',
                    }"
                >
                    <span slot="description">Nenhum endereço cadastrado.</span>
                    <a-button type="primary"> Cadastrar endereço </a-button>
                </a-empty> -->
      </div>
    </div>
  </div>
</template>

<script>
//import addressMixins from "@/mixins/address/mixin.js";
export default {
  components: {},
  //mixins: [addressMixins],
  data() {
    return {
      loading: false,
      addresses: [],
    };
  },
  beforeMount() {
    // this.getAddresses();
  },
};
</script>

<style lang="sass" scoped>
.addresses
  width: 600px
  margin: 0 auto
  .address
    cursor: pointer
    padding: 20px
    margin-bottom: 10px
    border-radius: 6px
    border: 1px solid #eee
    transition: .3s
    .actions
      font-size: 18px
    .name
      font-weight: 700
      color: #292828
    .ico
      img
        width: 20px
    &:hover
      box-shadow: 0 4px 10px rgba(0, 0, 0 , 0.05), 0 4px 16px rgba(0, 0, 0, 0.08)
      border-color: transparent
</style>
