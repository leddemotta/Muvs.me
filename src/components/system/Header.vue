<script>
import homeImg from "@/assets/images/home.png";
import messageImg from "@/assets/images/message.png";
import settingsImg from "@/assets/images/settings.png";
import searchImg from "@/assets/images/search.png";
import userImg from "@/assets/images/user.png";
import notificationImg from "@/assets/images/reminders.png";
import rentImg from "@/assets/images/calendar.png";
import bikeImg from "@/assets/images/bicycle.png";

export default {
  data() {
    return {
      menu: [
        //  { name: "Buscar", ico: searchImg, class: "", route: "/search",   width: 33 },
        {
          name: "Notificações",
          ico: notificationImg,
          class: "",
          route: "/notifications",
          badge: true,
          count: this.$root.notificationsCount,
        },
        {
          name: "Meus veículos",
          ico: bikeImg,
          class: "",
          route: "/my-vehicles",
          width: 39,
        },
        // {
        //     name: "Meus alugueis",
        //     ico: rentImg,
        //     class: "",
        //     route: "/my-rents",
        // },
        {
          name: "Mensagens",
          ico: messageImg,
          class: "",
          route: "/messages",
          badge: true,
          count: 0,
        },
        // {
        //     name: "Cadastrar ",
        //     ico: bikeImg,
        //     class: "create",
        //     route: "/create-vehicle",
        // },
        { name: "Perfil", ico: userImg, class: "", route: "/profile" },
        // {
        //     name: "Configurações",
        //     ico: settingsImg,
        //     class: "",
        //     route: "/settings",
        // },
      ],
    };
  },
  // watch: {
  //     menu: function (val) {
  //         console.log("menu", val);
  //         this.menu = val;
  //     },
  // },

  // beforeRouteUpdate() {
  //     this.getNotifications();
  // },
  // beforeMount() {
  //     this.getNotifications();
  // },
  updated() {
    this.menu.forEach((item, index) => {
      if (item.name === "Notificações") {
        this.menu[index].count = data.meta.total_unread;
      }
    });
  },
  methods: {
    logOut() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("userData");
      localStorage.removeItem("loglevel:webpack-dev-server");
      window.open("/login", "_self");
    },
    // getNotifications() {
    //     this.$http
    //         .get(
    //             `/notification/list?page=1&per_page=100&is_read=0&user_id=${this.$store.state.userData.id}`
    //         )
    //         .then(({ data }) => {
    //             // this.$root.notificationsCount = data.meta.total_unread;
    //             this.menu.forEach((item, index) => {
    //                 if (item.name === "Notificações") {
    //                     //this.menu[index].count = data.meta.total_unread;
    //                 }
    //             });
    //         })
    //         .catch(({ response }) => {
    //             response;
    //             //this.$root.notificationsCount = 0;
    //             // this.menu.forEach((item, index) => {
    //             //     if (item.name === "Notificações") {
    //             //         this.menu[index].count = 0;
    //             //     }
    //             // });
    //         });
    // },
  },
};
</script>
<template>
  <div>
    <header class="header">
      <a-row type="flex" justify="space-between">
        <a-col :span="24">
          <router-link to="/">
            <img
              class="logo c-pointer"
              alt="muvsme"
              src="@/assets/images/logo-muvsme.png"
              width="80"
            />
          </router-link>
        </a-col>

        <!-- {{ $root.notificationsCount }} -->
        <!-- $route.name -->
        <a-col :span="24">
          <div class="nav">
            <ul>
              <router-link
                v-for="(item, index) in menu"
                :key="index"
                :class="`${item.class}${
                  $route.name == item.route ? ' active' : ''
                }`"
                :to="item.route"
              >
                <a-tooltip placement="right">
                  <template #title>
                    <span>{{ item.name }}</span>
                  </template>

                  <a-badge v-if="item.badge" :count="item.count">
                    <img
                      alt="muvsme"
                      :src="item.ico"
                      :width="item.width ? item.width : '30'"
                    />
                  </a-badge>
                  <div v-if="!item.badge">
                    <img
                      alt="muvsme"
                      :src="item.ico"
                      :width="item.width ? item.width : '30'"
                    />
                  </div>
                </a-tooltip>
              </router-link>

              <!--
                            <li class="create">
                                <a-tooltip placement="right">
                                    <template slot="title">
                                        <span>Cadastrar veículo</span>
                                    </template>
                                    <a-button
                                        @click="$router.push(`/create-vehicle`)"
                                        type="primary"
                                        shape="circle"
                                    >
                                        <img
                                            alt="muvsme"
                                            src="@/assets/images/bike.png"
                                        />
                                    </a-button>
                                </a-tooltip>
                            </li> -->
            </ul>
          </div>
        </a-col>
        <a-col :span="24">
          <a class="logout" @click="logOut()">
            <a-tooltip placement="right">
              <template #title>
                <span>Sair</span>
              </template>
              <img alt="muvsme" src="@/assets/images/logout.png" width="30" />
            </a-tooltip>
          </a>
        </a-col>
      </a-row>
    </header>

    <!-- <a-tooltip placement="left">
            <template slot="title">
                <span>Cadastrar veículo</span>
            </template>
            <a-button
                class="add-btn"
                @click="$router.push(`/vehicle/create`)"
                type="primary"
                shape="circle"
            >
                <img alt="muvsme" src="@/assets/images/bike.png" />
                <span class="plus">+</span>
            </a-button>
        </a-tooltip> -->
  </div>
</template>

<style lang="sass" scoped>
.add-btn
  position: fixed !important
  right: 25px !important
  bottom: 20px
  height: 80px !important
  width: 80px !important
  border-radius: 50px
  z-index: 5
  .plus
    position: absolute
    top: 2px
    right: 0px
    border: 2px solid #ff4228
    background-color: #FFF
    color: #ff4228
    font-weight: 900
    line-height: 1.2
    height: 20px !important
    width: 20px !important
    border-radius: 50px
  img
    width: 50px
.header
  padding: 30px 14px !important
  position: fixed
  height: 100%
  width: 110px
  background: #FFF
  text-align: center
  box-shadow: 0 0 10px 0 rgba(0,0,0, 0.05)
  z-index: 10
  .logout
    filter: grayscale(1)
    opacity: 0.4
    transition: .3s
    position: absolute
    bottom: 0
    width: 100%
    left: 0
    &:hover
      opacity: 0.8
  .ant-row-flex
    height: 100%
  .nav
    float: left
    width: 100%
    ul
      padding: 0
      margin: 0
      list-style: none
      li.create
        filter: grayscale(0)
        opacity: 1
        button
          width: 70px
          height: 70px
          img
            width: 50px
      li
        display: block
        margin:  35px 0
        filter: grayscale(1)
        opacity: 0.6
        transition: .3s
        cursor: pointer
        &:hover
          filter: grayscale(1)
          opacity: 1
        img
          //width: 30px
</style>
