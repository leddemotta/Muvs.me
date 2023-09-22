import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/public/Login.vue";
import NotFound from "../views/public/NotFound.vue";

import Profile from "@/components/system/pages/Profile.vue";
import NotificationsListPage from "@/components/notification/pages/NotificationsListPage.vue";
import SendNotificationsPage from "@/components/notification/pages/SendNotificationsPage.vue";
import UsersList from "@/components/user/pages/UsersList.vue";
import VehiclesList from "@/components/vehicle/pages/VehiclesList.vue";
import CreateVehicle from "@/components/vehicle/pages/CreateVehicle.vue";
import LogsList from "@/components/log/pages/LogsList.vue";
import CouponsList from "@/components/coupon/pages/CouponsList.vue";

const company = "Muvs.Me";

const systemViews = (view) => () => import(`../views/${view}.vue`);

const publicPages = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/public/Login.vue"),
    meta: { title: `Login - ${company}`, page: "login", requiresAuth: true },
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: `Página Não Encontrada - ${company}`,
    },
  },
];

const users = [
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
];

const vehicles = [
  {
    path: "/vehicles",
    name: "vehicles",
    component: VehiclesList,
    meta: {
      title: `Veículos - ${company}`,
      page: "vehicles",
      requiresAuth: true,
    },
  },
  {
    path: "/vehicles/new",
    name: "new-vehicle",
    component: CreateVehicle,
    meta: {
      title: `Cadastrar Veículo - ${company}`,
      page: "vehicles",
      requiresAuth: true,
    },
  },
  {
    path: "/my-vehicles",
    name: "my-vehicles",
    component: VehiclesList,
    meta: {
      title: `Veículos - ${company}`,
      page: "vehicles",
      requiresAuth: true,
    },
  },
];

const notifications = [
  {
    path: "/notifications",
    name: "notifications",
    component: NotificationsListPage,
    meta: {
      title: `Notificações - ${company}`,
      page: "notifications",
      requiresAuth: true,
    },
  },
  {
    path: "/notifications/sender",
    name: "notificationsSender",
    component: SendNotificationsPage,
    meta: {
      title: `Enviar notificações - ${company}`,
      page: "sender",
      requiresAuth: true,
    },
  },
];

const messages = [
  {
    path: "/messages",
    name: "messages",
    component: UsersList,
    meta: {
      title: `Mensagens - ${company}`,
      page: "messages",
      requiresAuth: true,
    },
  },
];

const coupons = [
  {
    path: "/coupons",
    name: "coupons",
    component: CouponsList,
    meta: {
      title: `Coupons - ${company}`,
      page: "coupons",
      requiresAuth: true,
    },
  },
];

const logs = [
  {
    path: "/logs",
    name: "logs",
    component: LogsList,
    meta: {
      title: `Logs - ${company}`,
      page: "logs",
      requiresAuth: true,
    },
  },
];

const profile = [
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: `Perfil - ${company}`,
      page: "profile",
      requiresAuth: true,
    },
  },
];

const systemRoutes = [
  {
    path: "/",
    name: "home",
    component: systemViews("Home"),
    children: [],
  },
  ...publicPages,
  ...users,
  ...notifications,
  ...messages,
  ...profile,
  ...vehicles,
  ...coupons,
  ...logs,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: systemRoutes,
});

export default router;
