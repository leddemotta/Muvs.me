import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/public/Login.vue";

import NotFound from "../views/public/NotFound.vue";
import Messages from "@/components/system/pages/Messages.vue";
import Profile from "@/components/system/pages/Profile.vue";
import Notifications from "@/components/system/pages/Notifications.vue";
import Settings from "@/components/system/pages/Settings.vue";
//import RegisterVehicle from "@/components/system/pages/RegisterVehicle.vue"
import MyVehicles from "@/components/system/pages/MyVehicles.vue";
import VehiclePages from "@/components/vehicle/VehiclePages.vue";
import MyRents from "@/components/system/pages/MyRents.vue";
import UsersList from "@/components/user/pages/UsersList.vue";

const company = "Muvs.Me";
const systemViews = (view) => () => import(`../views/${view}.vue`);
const systemPages = (view) => () => import(`@/components/${view}.vue`);

systemPages;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: systemViews("Home"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/public/Login.vue"),
      meta: { title: `Login - ${company}`, page: "login", requiresAuth: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: Login,
      meta: {
        title: `Recuperar senha - ${company}`,
        page: "login",
      },
    },
    {
      path: "/signin",
      name: "signin",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        page: "login",
      },
    },
    {
      path: "/choose-registration",
      name: "choose-registration",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        page: "login",
        requiresAuth: true,
      },
    },
    {
      path: "/users",
      name: "users",
      component: UsersList,
      meta: {
        title: `Usuários - ${company}`,
        page: "users",
        requiresAuth: true,
      },
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        page: "login",
      },
    },
    {
      path: "/security-tips",
      name: "security-tips",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        page: "login",
      },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        page: "login",
      },
    },
    // {
    //   path: "/vehicle/:type/",
    //   name: "RegisterVehicle",
    //   component: VehiclePages,
    //   meta: {
    //     title: `Veículo - ${company}`,
    //     requiresAuth: true,
    //     page: "VehiclePages",
    //   },
    //   children: [
    //     {
    //       path: ":id",
    //       component: VehiclePages,
    //       meta: {
    //         title: `Veículo - ${company}`,
    //         requiresAuth: true,
    //       },
    //       children: [
    //         {
    //           path: ":slug",
    //           component: VehiclePages,
    //           meta: {
    //             title: `Veículo - ${company}`,
    //             requiresAuth: true,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/my-rents/:action",
    //   name: "MyRents",
    //   component: MyRents,
    //   meta: {
    //     title: `Meus Aluguéis - ${company}`,
    //     requiresAuth: true,
    //     page: "MyRents",
    //   },
    //   children: [
    //     {
    //       path: ":id",
    //       component: MyRents,
    //       meta: {
    //         title: `Veículo - ${company}`,
    //         requiresAuth: true,
    //       },
    //     },
    //   ],
    // },
    // {
    //   path: "/my-rents",
    //   name: "my-rents",
    //   component: MyRents,
    // },

    // {
    //   path: "/my-vehicles",
    //   name: "my-vehicles",
    //   component: MyVehicles,
    // },
    // {
    //   path: "/messages",
    //   name: "messages",
    //   component: Messages,
    // },
    // {
    //   path: "/settings",
    //   name: "settings",
    //   component: Settings,
    // },
    // {
    //   path: "/profile",
    //   name: "profile",
    //   component: Profile,
    // },
    // {
    //   path: "/notifications",
    //   name: "notifications",
    //   component: Notifications,
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: `Página Não Encontrada - ${company}`,
      },
    },
  ],
});

export default router;
