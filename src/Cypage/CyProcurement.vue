<template>
  <div>
    <!-- 搜索区 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="采购单号">
          <el-input v-model="searchForm.purchaseNo" placeholder="请输入采购单号" />
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="searchForm.supplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="待入库" value="待入库" />
            <el-option label="已入库" value="已入库" />
            <el-option label="已取消" value="已取消" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 批量操作 -->
    <div style="margin: 10px 0;">
      <el-button type="danger" :disabled="!multipleSelection.length" @click="batchDelete">批量删除</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="pagedData" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="purchaseNo" label="采购单号" />
      <el-table-column prop="supplier" label="供应商" />
      <el-table-column prop="purchaseDate" label="采购日期" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额(￥)" />
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="viewDetail(scope.row)">编辑</el-button>
          <el-button type="text" @click="viewDetail(scope.row)">查看</el-button>
          <el-button type="text" style="color: red;" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next"
      :total="purchaseList.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right;"
    />

    <!-- 采购详情弹窗 -->
    <el-dialog title="采购详情" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="100px">
        <el-form-item label="采购单号">
          <span>{{ detailData.purchaseNo }}</span>
        </el-form-item>
        <el-form-item label="供应商">
          <span>{{ detailData.supplier }}</span>
        </el-form-item>
        <el-form-item label="采购日期">
          <span>{{ detailData.purchaseDate }}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{ detailData.status }}</span>
        </el-form-item>
        <el-form-item label="金额">
          <span>{{ detailData.amount }} ￥</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      searchForm: { purchaseNo: "", supplier: "", status: "" },
      purchaseList: [
        {
          id: 1,
          purchaseNo: "CG202504201001",
          supplier: "恒达布业",
          purchaseDate: "2025-04-19",
          status: "待入库",
          amount: 5200,
        },
        {
          id: 2,
          purchaseNo: "CG202504201002",
          supplier: "星辉纺织",
          purchaseDate: "2025-04-18",
          status: "已入库",
          amount: 7500,
        },
        {
          id: 3,
          purchaseNo: "CG202504201003",
          supplier: "南方布业",
          purchaseDate: "2025-04-17",
          status: "已取消",
          amount: 0,
        },
      ],
      multipleSelection: [],
      dialogVisible: false,
      detailData: {},
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.purchaseList.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchData() {
      console.log("搜索条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { purchaseNo: "", supplier: "", status: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteData(id) {
      this.purchaseList = this.purchaseList.filter((item) => item.id !== id);
    },
    batchDelete() {
      const ids = this.multipleSelection.map((i) => i.id);
      this.purchaseList = this.purchaseList.filter(
        (item) => !ids.includes(item.id)
      );
    },
    viewDetail(row) {
      this.detailData = Object.assign({}, row);
      this.dialogVisible = true;
    },
    handlePageChange(val) {
      this.currentPage = val;
    },
    tagType(status) {
      switch (status) {
        case "待入库":
          return "warning";
        case "已入库":
          return "success";
        case "已取消":
          return "danger";
        default:
          return "info";
      }
    },
  },
};
</script>
  