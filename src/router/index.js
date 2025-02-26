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
        path: "1-1",
        name: "Cyhome",
        component: () => import("../Cypage/Cyhome.vue"),
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
