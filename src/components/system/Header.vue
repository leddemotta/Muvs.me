<script setup>
import { reactive, ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { ApartmentOutlined, UserOutlined } from "@ant-design/icons-vue";

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
    name: "Meus veículos",
    ico: bikeImg,
    class: "",
    route: "/my-vehicles",
    width: 39,
    show: true,
  },
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
    name: "Mensagens",
    ico: messageImg,
    class: "",
    route: "/messages",
    badge: true,
    count: 0,
    show: true,
  },

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
  <div class="flex bg-gray-100 text-gray-900 fixed">
    <aside
      class="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white"
    >
      <div
        class="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2"
      >
        <router-link to="/">
          <img
            class="logo c-pointer"
            alt="muvsme"
            src="@/assets/images/logo-muvsme.png"
            width="80"
          />
        </router-link>
      </div>
      <nav class="nav flex flex-1 flex-col gap-y-4">
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
      </nav>

      <div class="flex flex-col items-center gap-y-4 py-10">
        <!-- <button
          class="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            class="h-6 w-6 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 16H12.01M12 8V12V8Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button> -->

        <router-link to="/profile">
          <a-avatar v-if="!user.avatar" :size="50">
            <template #icon><UserOutlined /></template>
          </a-avatar>

          <a-avatar :src="user.avatar" :size="50">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </router-link>

        <a class="logout" @click="logout()">
          <a-tooltip placement="right">
            <template #title>
              <span>Sair</span>
            </template>
            <img
              class="inline-block grayscale opacity-60 hover:opacity-90"
              alt="muvsme"
              src="@/assets/images/logout.png"
              width="20"
            />
          </a-tooltip>
        </a>
      </div>
    </aside>
  </div>
  <!-- <header class="header">
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
  </header> -->

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
          ><router-link
            @click="onClickOpenAdminMenu = false"
            :to="item.route"
            >{{ item.name }}</router-link
          ></a-list-item
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
<!--

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

-->
<style lang="sass" scoped>
.admin-menu
  ul
    li
      padding: 10px 22px
.nav
  background: #fff
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
      margin:  20px 0
      filter: grayscale(1)
      opacity: 0.6
      transition: .3s
      cursor: pointer
      text-align: center
      &:hover
        filter: grayscale(1)
        opacity: 1
</style>
