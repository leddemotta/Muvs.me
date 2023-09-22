<script setup>
import { reactive, ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";

import { ApartmentOutlined } from "@ant-design/icons-vue";

// imgs
import userImg from "@/assets/images/user.png";
import notificationImg from "@/assets/images/reminders.png";
import settingsImg from "@/assets/images/settings.png";
import messageImg from "@/assets/images/message.png";
import bikeImg from "@/assets/images/bicycle.png";

const { user, logout, checkSessionStorage } = useUserStore();
const onClickOpenAdminMenu = ref(false);

const itemAction = (item) => {
  if (item.name === "Admin") onClickOpenAdminMenu.value = true;
  if (item.name !== "Admin") onClickOpenAdminMenu.value = false;
};

const menu = reactive([
  {
    name: "Notificações",
    ico: notificationImg,
    class: "",
    route: "/notifications",
    badge: true,
    count: 0,
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
    show: user.role === "admin" ? true : false,
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
  {
    name: "Enviar notificação",
    ico: "",
    class: "",
    route: "/notifications/sender",
    show: true,
  },
  {
    name: "Cupons",
    ico: "",
    class: "",
    route: "/coupons",
    show: true,
  },
  {
    name: "Logs",
    ico: "",
    class: "",
    route: "/logs",
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

                  <a-badge :count="item.count">
                    <img
                      alt="muvsme"
                      :src="item.ico"
                      :width="item.width ? item.width : '30'"
                    />
                  </a-badge>
                </a-tooltip>
              </router-link>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :span="24">
        <a class="logout" @click="logout()">
          <a-tooltip placement="right">
            <template #title>
              <span>Sair</span>
            </template>
            <img
              class="inline-block"
              alt="muvsme"
              src="@/assets/images/logout.png"
              width="30"
            />
          </a-tooltip>
        </a>
      </a-col>
    </a-row>
  </header>

  <aDrawer
    class="admin-menu"
    placement="left"
    :closable="false"
    :open="onClickOpenAdminMenu"
    :width="250"
    @close="onClickOpenAdminMenu = false"
  >
    <template #title> <apartment-outlined class="mr-5" /> Admin Area </template>

    <aList size="small" :bordered="false" :data-source="adminMenu">
      <template #renderItem="{ item }">
        <a-list-item
          ><router-link @click="onClickOpenAdminMenu = false" :to="item.route">{{
            item.name
          }}</router-link></a-list-item
        >
      </template>
    </aList>
  </aDrawer>
</template>

<style lang="sass">
.admin-menu
  .ant-drawer-body
    padding: 0 !important
</style>

<style lang="sass" scoped>
.admin-menu
  ul
    li
      padding: 10px 22px

.header
  padding: 30px 14px 40px
  position: fixed
  height: 100%
  width: 100px
  background: #fff
  text-align: center
  box-shadow: 0 0 10px 0 rgba(0,0,0,.05)
  z-index: 10
  text-align: center
  .actions
    height: 90vh
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
