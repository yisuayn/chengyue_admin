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
    <el-form ref="form" :model="formData" :label-width="labelWidth">
      <template v-for="(item,index) in formConfig">
        <el-form-item :key="index" :label="item.label" :prop="item.prop">
          <component
            :is="getComponentType(item.type)"
            v-model="formData[item.prop]"
            v-bind="item.attrs"
            v-if="!item.options"
          />
          <!-- 有 options 时 渲染 select / radio / checkbox -->
          <el-select
            v-if="item.type === 'select'"
            v-model="formData[item.prop]"
            v-bind="item.attrs"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
      </template>
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
    formConfig: {
      type: Array,
      default: () => [],
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
        this.formData = {
          ...JSON.parse(JSON.stringify(this.form)),
        };
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
    getComponentType(type) {
      const map = {
        input: "el-input",
        number: "el-input",
        textarea: "el-input",
        "date-picker": "el-date-picker",
        switch: "el-switch",
      };
      return map[type] || "el-input";
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
