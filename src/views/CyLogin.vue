<template>
  <div class="login-container">
    <!-- 粒子背景 -->
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="5"
      linesColor="#dedede"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>

    <div class="login-box">
      <h2>家纺仓储管理系统</h2>
      <el-form :model="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="密码" />
        </el-form-item>
         <p>注：新用户直接输入用户名和密码便自动注册</p>
        <el-button type="primary" @click="handleLogin" round>点击登录</el-button>
      </el-form>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const loading = this.$loading({
        lock: true,
        text: "登录中。。。。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const response = await this.$axios.post("http://localhost:3000/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        });

        if (response.data.status === 200 && response.data.data.token) {
          this.$store.commit("loginSuccess", {
            user: {
              username: response.data.data.userinfo.username,
              imgpath: response.data.data.userinfo.imgpath,
              position: response.data.data.userinfo.position,
              department: response.data.data.userinfo.department,
              platform: response.data.data.userinfo.platform,
              company: response.data.data.userinfo.company,
            },
            token: response.data.data.token,
          });
          setTimeout(() => {
            this.$router.push("/");
            loading.close();
          }, 1500);
        } else if (response.data.status === 201 && response.data.data.token) {
          this.$store.commit("loginSuccess", {
            user: {
              username: response.data.data.usersinfo.username,
              imgpath: response.data.data.usersinfo.imgpath,
            },
            token: response.data.data.token,
          });
          this.$router.push("/");
          loading.close();
        } else {
          this.$message.error("请输入用户名和密码");
          loading.close();
        }
      } catch (error) {
        console.error(error);
        this.$message.error("登录失败，请检查网络或服务器");
        loading.close();
      } finally {
        // this.loading = false;
        // loading.close();
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  background: url(../../public/sky.871d198.jpg);
  overflow: hidden;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  margin-bottom: 20px;
  font-size: 26px;
  color: #333;
}
.login-box p{
  font-size: 13px;
}
</style>
  