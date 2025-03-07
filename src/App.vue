<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*,*::after,*::before{
  padding: 0;
  margin: 0;
}
/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 4px; /* 滚动条宽度 */
  height: 4px; /* 滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent; /* 轨道背景色 */
  border-radius: 10px; /* 轨道圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #96d9f8; /* 滑块背景色 */
  border-radius: 10px; /* 滑块圆角 */
}

/* 滚动条滑块悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停背景色 */
}
#app{
  font-family: 'Pacifico', cursive;
  font-size: 25px;
  font-weight: 600 !important;
}
</style>