<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基础设置" name="base">
          <el-form :model="baseForm" label-width="120px">
            <el-form-item label="系统名称">
              <el-input v-model="baseForm.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="公司名称">
              <el-input v-model="baseForm.companyName" placeholder="请输入公司名称" />
            </el-form-item>
            <el-form-item label="上传LOGO">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
              >
                <img v-if="baseForm.logoUrl" :src="baseForm.logoUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securityForm" label-width="150px">
            <el-form-item label="启用密码复杂度">
              <el-switch v-model="securityForm.enablePasswordRule" />
            </el-form-item>
            <el-form-item label="登录超时时间(分钟)">
              <el-input-number v-model="securityForm.loginTimeout" :min="1" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div style="text-align: center; margin-top: 20px;">
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
        <el-button @click="resetSettings">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "base",
      baseForm: {
        systemName: "家纺仓储管理系统",
        companyName: "星河家纺有限公司",
        logoUrl: "",
      },
      securityForm: {
        enablePasswordRule: true,
        loginTimeout: 30,
      },
    };
  },
  methods: {
    handleLogoSuccess(response, file) {
      this.baseForm.logoUrl = URL.createObjectURL(file.raw);
    },
    saveSettings() {
      console.log("保存设置：", this.baseForm, this.securityForm);
      this.$message.success("设置已保存！");
    },
    resetSettings() {
      this.baseForm = {
        systemName: "家纺仓储管理系统",
        companyName: "星河家纺有限公司",
        logoUrl: "",
      };
      this.securityForm = {
        enablePasswordRule: true,
        loginTimeout: 30,
      };
      this.$message.info("设置已重置");
    },
  },
};
</script>

<style scoped>
.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
