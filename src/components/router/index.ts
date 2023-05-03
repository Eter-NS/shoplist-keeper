import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import groupFormView from "../views/groupFormView.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/createGroup",
      name: "Create a note group",
      component: groupFormView,
    },
  ],
});
