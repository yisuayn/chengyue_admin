<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <img src="" alt="404" />
      <h1>404 - 页面未找到</h1>
      <p>您访问的页面不存在，可能已经被收纳进我们的仓库里啦～</p>
      <el-button type="primary" @click="$router.push('/login')">返回首页</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style scoped>
.notfound-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ffe0e0, #fffaf0);
}

.notfound-content {
  text-align: center;
}

.notfound-content img {
  width: 300px;
  margin-bottom: 20px;
}

.notfound-content h1 {
  font-size: 36px;
  color: #444;
}

.notfound-content p {
  font-size: 18px;
  color: #666;
  margin: 10px 0 20px;
}
</style>
  