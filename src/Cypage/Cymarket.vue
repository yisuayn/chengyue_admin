<template>
  <Weight>
    <Cyecharts :initialData="chartData" :intervalTime="5000" />
  </Weight>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      chartData: {
        categories: (function () {
          let now = new Date();
          let res = [];
          let len = 10;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(+now - 2000);
          }
          return res;
        })(),
        categories2: (function () {
          let res = [];
          let len = 10;
          while (len--) {
            res.push(10 - len - 1);
          }
          return res;
        })(),
        data: (function () {
          let res = [];
          let len = 10;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })(),
        data2: (function () {
          let res = [];
          let len = 0;
          while (len < 10) {
            res.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
          }
          return res;
        })(),
      },
    };
  },
};
</script>
