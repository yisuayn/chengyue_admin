import Vue from "vue";
import VueRouter from "vue-router";
import Cylayout from "../views/Cylayout.vue";
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

// 配置NProgress（可选）
NProgress.configure({ 
  showSpinner: false, // 隐藏旋转图标
  minimum: 0.5,      // 最低进度百分比
});

const routes = [
  {
    path: "/",
    component: Cylayout,
    children: [
      {
        path: "/",
        name: "Cyhome",
        component: () => import("../Cypage/Cyhome.vue"),
        meta:{
          breadcrumb:[
            {name:'仪表盘',path:""}
          ]
        }
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../Cypage/Cyproduct.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '产品管理', path: '/product' },
        ],}
      },
      {
        path: "/advertisement",
        name: "advertisement",
        component: () => import("../Cypage/Cyad.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '广告管理', path: '/product' },
        ],}
      },
      {
        path: "/consult",
        name: "consult",
        component: () => import("../Cypage/Cyconsult.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '资讯动态', path: '/consult' },
        ],}
      },
      {
        path: "/Procurement",
        name: "Procurement",
        component: () => import("../Cypage/CyProcurement.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '采购管理', path: '/Procurement' },
        ],}
      },
      {
        path: "/Warehouse",
        name: "Warehouse",
        component: () => import("../Cypage/CyWarehouse.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '仓库调拨', path: '/Warehouse' },
        ],}
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../Cypage/Cyorder.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '订单管理', path: '/order' },
        ],}
      },
      {
        path: "/client",
        name: "client",
        component: () => import("../Cypage/Cyclient.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '客户管理', path: '/client' },
        ],}
      },
      {
        path: "/inventory",
        name: "inventory",
        component: () => import("../Cypage/Cyinventory.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '库存管理', path: '/inventory' },
        ],}
      },
      {
        path: "/market",
        name: "market",
        component: () => import("../Cypage/Cymarket.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '销售数据', path: '/market' },
        ],}
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("../Cypage/settings/Cysettings.vue"),
        meta:{breadcrumb: [
          { name: '仪表盘', path: '/' },
          { name: '系统设置', path: '/settings' },
        ],}
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/CyLogin.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/Cy404.vue'),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== '/login' && !store.state.isLogin) {
    next('/login')
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done();
});

router.onError(() => {
  NProgress.done();
});
 
export default router;
