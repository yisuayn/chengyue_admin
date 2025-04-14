<template>
  <el-drawer
    :visible.sync="visible"
    :title="title"
    :size="size"
    :direction="direction"
    :before-close="handleClose"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
  >
    <el-form ref="form" :model="formData" :rules="rules" :label-width="labelWidth">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-input v-model="formData.date" placeholder="完成日期"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input v-model="formData.province" placeholder="完成日期"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="formData.city" placeholder="完成日期"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" placeholder="完成日期"></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="zip">
        <el-input v-model="formData.zip" placeholder="完成日期"></el-input>
      </el-form-item>
    </el-form>

    <div class="drawer-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "FormDrawer",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "表单抽屉",
    },
    size: {
      type: [String, Number],
      default: "35%",
    },
    direction: {
      type: String,
      default: "rtl",
    },
    customClass: {
      type: String,
      default: "",
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {},
    };
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        // 打开时拷贝父组件传来的表单数据
        this.formData = JSON.parse(JSON.stringify(this.form));
      }
    },
    visible(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    handleClose(done) {
      this.$emit("close");
      done();
    },
    handleCancel() {
      this.visible = false;
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.formData);
          this.visible = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.drawer-footer {
  text-align: right;
  padding: 10px 0;
  border-top: 1px solid #ebeef5;
}
</style>
