<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="市区"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="zip" label="邮编" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openDrawer(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <CustomDrawer
      v-model="drawerVisible"
      title="查看用户"
      :form="form"
      :rules="rules"
      @confirm="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
      ],
      drawerVisible: false,
      form: {
        name: "",
        date: "",
        province: "",
        city: "",
        address: "",
        zip: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        date: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        province: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        city: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        address: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    openDrawer(row) {
      this.drawerVisible = true;
      this.form = row;
    },
    handleSubmit(formData) {
      console.log("提交数据：", formData);
      this.$message.success("提交成功！");
      // 可以在这里发起 API 请求
    },
    handleCancel() {
      this.$message.info("已取消");
    },
  },
};
</script>
