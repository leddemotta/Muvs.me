import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/public/Login.vue";
//import NotFound from '../views/public/NotFound.vue'
import Home from "../views/Home.vue";
import Messages from "@/components/system/pages/Messages.vue";
import Profile from "@/components/system/pages/Profile.vue";
import Notifications from "@/components/system/pages/Notifications.vue";
import Settings from "@/components/system/pages/Settings.vue";
//import RegisterVehicle from "@/components/system/pages/RegisterVehicle.vue"
import MyVehicles from "@/components/system/pages/MyVehicles.vue";
import VehiclePages from "@/components/vehicle/VehiclePages.vue";
import MyRents from "@/components/system/pages/MyRents.vue";

let company = "AAA";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/contracts",
      redirect: "/contracts/list",
    },
    {
      path: "/vehicle/:type/",
      name: "RegisterVehicle",
      component: VehiclePages,
      meta: {
        title: `Veículo - ${company}`,
        requiresAuth: true,
        slug: "VehiclePages",
      },
      children: [
        {
          path: ":id",
          component: VehiclePages,
          meta: {
            title: `Veículo - ${company}`,
            requiresAuth: true,
          },
          children: [
            {
              path: ":slug",
              component: VehiclePages,
              meta: {
                title: `Veículo - ${company}`,
                requiresAuth: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: "/my-rents/:action",
      name: "MyRents",
      component: MyRents,
      meta: {
        title: `Meus Aluguéis - ${company}`,
        requiresAuth: true,
        slug: "MyRents",
      },
      children: [
        {
          path: ":id",
          component: MyRents,
          meta: {
            title: `Veículo - ${company}`,
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/my-rents",
      name: "my-rents",
      component: MyRents,
    },

    {
      path: "/my-vehicles",
      name: "my-vehicles",
      component: MyVehicles,
    },
    {
      path: "/messages",
      name: "messages",
      component: Messages,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: Notifications,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: `Login - ${company}`,
        slug: "login",
        page: "login",
      },
    },
    {
      path: "/forgot-password",
      name: "Login",
      component: Login,
      meta: {
        title: `Recuperar senha - ${company}`,
        slug: "forgot-password",
        page: "login",
      },
    },
    {
      path: "/choose-registration",
      name: "Login",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        slug: "choose-registration",
        page: "login",
      },
    },
    {
      path: "/signin",
      name: "Login",
      component: Login,
      meta: {
        title: `Registrar-se - ${company}`,
        slug: "signin",
        page: "login",
      },
    },
    // {
    //   path: "*",
    //   name: "NotFound",
    //   component: NotFound,
    //   meta: {
    //     title: `Página Não Encontrada - ${company}`,
    //   },
    // },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Home.vue"),
    },
  ],
});

export default router;
