<template>
  <div>
    <Weight class="order">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="市区"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="zip" label="邮编"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="是否启用" prop="enabled">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#ff4949" @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="openDrawer(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Weight>
    <CustomDrawer
      v-model="drawerVisible"
      title="查看用户"
      :form="form"
      :formConfig="formConfig"
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
          enabled: true,
          gender: "女",
        },
        {
          date: "2025-05-04",
          name: "江小白",
          province: "重庆",
          city: "九龙坡区",
          address: "龙坡区火炬大道69号6幢",
          zip: 400001,
          enabled: true,
          gender: "男",
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
        enabled: true,
        gender: "",
      },
      formConfig: [
        {
          label: "姓名",
          prop: "name",
          type: "input",
          attrs: { placeholder: "请输入姓名" },
        },
        {
          label: "省份",
          prop: "province",
          type: "input",
          attrs: { placeholder: "请输入省份" },
        },
        {
          label: "市区",
          prop: "city",
          type: "input",
          attrs: { placeholder: "请输入市区" },
        },
        {
          label: "地址",
          prop: "address",
          type: "input",
          attrs: { placeholder: "请输入地址" },
        },
        {
          label: "邮编",
          prop: "zip",
          type: "input",
          attrs: { placeholder: "请输入邮编" },
        },
        {
          label: "性别",
          prop: "gender",
          type: "select",
          options: [
            { label: "男", value: "男" },
            { label: "女", value: "女" },
          ],
        },
        {
          label: "日期",
          prop: "date",
          type: "date-picker",
          attrs: { type: "date" },
        },
        { label: "启用", prop: "enabled", type: "switch" },
      ],
    };
  },
  methods: {
    openDrawer(row) {
      this.drawerVisible = true;
      this.form = { ...row };
    },
    handleSubmit(formData) {
      console.log("提交数据：", formData);
      this.$message.success("提交成功！");
      // 可以在这里发起 API 请求
    },
    handleCancel() {
      this.$message.info("已取消");
    },
    handleStatusChange(row){
      console.log(row); 
    }
  },
};
</script>
<style lang="scss" scoped>
.order {
  padding: 10px;
}
</style>