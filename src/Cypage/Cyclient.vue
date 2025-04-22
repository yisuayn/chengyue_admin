<template>
  <div>
    <!-- 搜索区 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="客户姓名">
          <el-input v-model="searchForm.name" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户等级">
          <el-select v-model="searchForm.level" placeholder="请选择等级">
            <el-option label="普通客户" value="普通客户" />
            <el-option label="VIP" value="VIP" />
            <el-option label="VVIP" value="VVIP" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 批量操作 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="openDialog">新增客户</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="batchDelete">批量删除</el-button>
    </div>

    <Weight class="client">
      <!-- 客户信息表格 -->
      <el-table :data="pagedData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="客户姓名" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <el-tag
              :type="
              scope.row.level === 'VIP'
                ? 'warning'
                : scope.row.level === 'VVIP'
                ? 'danger'
                : 'info'
            "
            >{{ scope.row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" style="color: red" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        layout="total, prev, pager, next"
        :total="clientList.length"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
        style="margin-top: 20px; text-align: right"
      />
    </Weight>
    <!-- 弹窗表单 -->
    <el-dialog title="新增/编辑客户" :visible.sync="dialogVisible" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="客户姓名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="formData.level">
            <el-option label="普通客户" value="普通客户" />
            <el-option label="VIP" value="VIP" />
            <el-option label="VVIP" value="VVIP" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveData">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: { name: "", level: "" },
      clientList: [
        {
          id: 1,
          name: "王小明",
          phone: "13888888888",
          level: "VIP",
          remark: "长期客户",
        },
        {
          id: 2,
          name: "李丽",
          phone: "13999999999",
          level: "普通客户",
          remark: "",
        },
        {
          id: 3,
          name: "陈磊",
          phone: "13700000000",
          level: "VVIP",
          remark: "高净值客户",
        },
      ],
      multipleSelection: [],
      dialogVisible: false,
      formData: { id: null, name: "", phone: "", level: "", remark: "" },
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.clientList.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchData() {
      console.log("搜索条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { name: "", level: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openDialog() {
      this.formData = { id: null, name: "", phone: "", level: "", remark: "" };
      this.dialogVisible = true;
    },
    editData(row) {
      this.formData = Object.assign({}, row);
      this.dialogVisible = true;
    },
    deleteData(id) {
      this.clientList = this.clientList.filter((item) => item.id !== id);
    },
    batchDelete() {
      const ids = this.multipleSelection.map((i) => i.id);
      this.clientList = this.clientList.filter(
        (item) => !ids.includes(item.id)
      );
    },
    saveData() {
      if (this.formData.id) {
        const index = this.clientList.findIndex(
          (i) => i.id === this.formData.id
        );
        if (index !== -1) this.clientList.splice(index, 1, this.formData);
      } else {
        this.formData.id = Date.now();
        this.clientList.push({ ...this.formData });
      }
      this.dialogVisible = false;
    },
    handlePageChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.client{padding: 10px 10px 0 10px;}
</style>
