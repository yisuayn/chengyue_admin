<template>
  <div>
    <!-- 搜索区 -->
    <el-card>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="出库单号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入出库单号" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchForm.customer" placeholder="请选择">
            <el-option label="客户A" value="A" />
            <el-option label="客户B" value="B" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 批量操作 -->
    <div style="margin: 10px 0;">
      <el-button type="primary" @click="openDrawer">新增出库</el-button>
      <el-button type="danger" @click="handleBatchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
      <el-button type="success" @click="exportData">导出Excel</el-button>
    </div>

    <!-- 表格区 -->
    <el-table :data="dataList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="orderNo" label="出库单号" />
      <el-table-column prop="customer" label="客户" />
      <el-table-column prop="productCount" label="产品数量" />
      <el-table-column prop="totalAmount" label="总金额(元)" />
      <el-table-column prop="outDate" label="出库日期" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editData(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next"
      :total="30"
      style="margin-top: 20px; text-align: right;"
    />

    <!-- 抽屉表单 -->
    <el-drawer title="新增/编辑出库单" :visible.sync="drawerVisible" size="50%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="出库单号">
          <el-input v-model="formData.orderNo" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="formData.customer">
            <el-option label="客户A" value="A" />
            <el-option label="客户B" value="B" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input-number v-model="formData.productCount" :min="1" />
        </el-form-item>
        <el-form-item label="总金额">
          <el-input-number v-model="formData.totalAmount" :min="0" />
        </el-form-item>
        <el-form-item label="出库日期">
          <el-date-picker v-model="formData.outDate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveData">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      searchForm: {
        orderNo: "",
        customer: "",
      },
      dataList: [
        {
          id: 1,
          orderNo: "CK20240401",
          customer: "客户A",
          productCount: 20,
          totalAmount: 2000,
          outDate: "2024-04-12",
        },
      ],
      multipleSelection: [],
      drawerVisible: false,
      formData: {
        orderNo: "",
        customer: "",
        productCount: 0,
        totalAmount: 0,
        outDate: "",
      },
    };
  },
  methods: {
    fetchData() {
      console.log("查询条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { orderNo: "", customer: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBatchDelete() {
      console.log("批量删除", this.multipleSelection);
    },
    exportData() {
      console.log("导出Excel");
    },
    openDrawer() {
      this.drawerVisible = true;
    },
    editData(row) {
      this.formData = Object.assign({}, row);
      this.drawerVisible = true;
    },
    deleteData(id) {
      console.log("删除", id);
    },
    saveData() {
      console.log("提交数据", this.formData);
      this.drawerVisible = false;
    },
  },
};
</script>
  