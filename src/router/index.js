import Vue from "vue";
import VueRouter from "vue-router";
import Cylayout from "../views/Cylayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Cylayout,
    children: [
      {
        path: "/",
        name: "Cyhome",
        component: () => import("../Cypage/Cyhome.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../Cypage/Cyproduct.vue"),
      },
      {
        path: "/advertisement",
        name: "advertisement",
        component: () => import("../Cypage/Cyad.vue"),
      },
      {
        path: "/assets",
        name: "assets",
        component: () => import("../Cypage/Cyassets.vue"),
      },
      {
        path: "/consult",
        name: "consult",
        component: () => import("../Cypage/Cyconsult.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
