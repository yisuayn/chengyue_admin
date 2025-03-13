import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Weight from "./components/Weight.vue";
import Cyecharts from "./components/Cyecharts.vue";
import Cybarchart from "./components/Cybarchart.vue";
import Cypiechart from "./components/Cypiechart.vue";


// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI);
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
]);

// 将 ECharts 挂载到 Vue 原型上
Vue.prototype.$echarts = echarts;

Vue.component('Weight',Weight);
Vue.component('Cyecharts',Cyecharts);
Vue.component('Cybarchart',Cybarchart);
Vue.component('Cypiechart',Cypiechart);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
