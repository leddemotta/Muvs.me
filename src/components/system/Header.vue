<script setup>
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import AuthService from "@/services/AuthService";

// imgs
import userImg from "@/assets/images/user.png";
import notificationImg from "@/assets/images/reminders.png";
import settingsImg from "@/assets/images/settings.png";
import messageImg from "@/assets/images/message.png";
import bikeImg from "@/assets/images/bicycle.png";

const userStore = useUserStore();
const onClickOpenAdminMenu = ref(false);

const details = async (payload) => {
  try {
    const { data } = await AuthService.details(payload);
    userStore.setUser(JSON.stringify(data.user));
  } catch (error) {
    console.log(error.message);
  }
};

const logOut = () => {
  userStore.logout();
  window.open("/login", "_self");
};

const itemAction = (item) => {
  if (item.name === "Admin") onClickOpenAdminMenu.value = true;
  if (item.name !== "Admin") onClickOpenAdminMenu.value = false;
};

onMounted(() => {
  setTimeout(() => {
    details(userStore.userId);
    userStore.checkSessionStorage();
  }, 500);
});

const menu = reactive([
  {
    name: "Notificações",
    ico: notificationImg,
    class: "",
    route: "/notifications",
    badge: true,
    count: 5,
    show: true,
  },
  {
    name: "Meus veículos",
    ico: bikeImg,
    class: "",
    route: "/my-vehicles",
    width: 39,
    show: true,
  },
  {
    name: "Mensagens",
    ico: messageImg,
    class: "",
    route: "/messages",
    badge: true,
    count: 0,
    show: true,
  },
  { name: "Perfil", ico: userImg, class: "", route: "/profile", show: true },
  {
    name: "Admin",
    ico: settingsImg,
    class: "",
    route: "",
    show: userStore.user.role === "admin" ? true : false,
  },
]);

const adminMenu = reactive([
  {
    name: "Usuários",
    ico: "",
    class: "",
    route: "/users",
    show: true,
  },
  {
    name: "Veículos",
    ico: "",
    class: "",
    route: "/vehicles",
    show: true,
  },
]);
</script>

<template>
  <header class="header">
    <a-row class="actions" type="flex" justify="space-between">
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

      <a-col :span="24">
        <div class="nav">
          <ul>
            <li v-for="(item, index) in menu" :key="index">
              <router-link
                v-if="item.show"
                :class="`${item.class}${
                  $route.name == item.route ? ' active' : ''
                }`"
                :to="item.route"
                @click="itemAction(item)"
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
            </li>
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

  <a-drawer
    class="admin-menu"
    placement="left"
    :closable="false"
    :open="onClickOpenAdminMenu"
    @close="onClickOpenAdminMenu = false"
  >
    <template #title> Admin Area </template>

    <a-list size="small" :bordered="false" :data-source="adminMenu">
      <template #renderItem="{ item }">
        <a-list-item
          ><router-link :to="item.route">{{
            item.name
          }}</router-link></a-list-item
        >
      </template>
    </a-list>
  </a-drawer>
</template>

<style lang="sass">
.admin-menu
  .ant-drawer-body
    padding: 0 !important
</style>

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
  padding: 30px 14px 40px
  position: fixed
  height: 100%
  width: 80px
  background: #fff
  text-align: center
  box-shadow: 0 0 10px 0 rgba(0,0,0,.05)
  z-index: 10
  .actions
    height: 95vh
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
</style>
