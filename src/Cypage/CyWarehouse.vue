<template>
  <div>
    <!-- 搜索区域 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="调拨单号">
          <el-input v-model="searchForm.transferNo" placeholder="请输入调拨单号" />
        </el-form-item>
        <el-form-item label="调出仓库">
          <el-input v-model="searchForm.outWarehouse" placeholder="调出仓库" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="待确认" value="待确认" />
            <el-option label="已完成" value="已完成" />
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

    <!-- 表格数据 -->
    <el-table :data="pagedData" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="transferNo" label="调拨单号" />
      <el-table-column prop="outWarehouse" label="调出仓库" />
      <el-table-column prop="inWarehouse" label="调入仓库" />
      <el-table-column prop="transferDate" label="调拨时间" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="viewDetail(scope.row)">查看</el-button>
          <el-button type="text" style="color: red;" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next"
      :total="transferList.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right;"
    />

    <!-- 调拨详情弹窗 -->
    <el-dialog title="调拨详情" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="100px">
        <el-form-item label="调拨单号">
          <span>{{ detailData.transferNo }}</span>
        </el-form-item>
        <el-form-item label="调出仓库">
          <span>{{ detailData.outWarehouse }}</span>
        </el-form-item>
        <el-form-item label="调入仓库">
          <span>{{ detailData.inWarehouse }}</span>
        </el-form-item>
        <el-form-item label="调拨时间">
          <span>{{ detailData.transferDate }}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{ detailData.status }}</span>
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
      searchForm: { transferNo: "", outWarehouse: "", status: "" },
      transferList: [
        {
          id: 1,
          transferNo: "DB202504201001",
          outWarehouse: "一号仓库",
          inWarehouse: "二号仓库",
          transferDate: "2025-04-20",
          status: "待确认",
        },
        {
          id: 2,
          transferNo: "DB202504201002",
          outWarehouse: "三号仓库",
          inWarehouse: "一号仓库",
          transferDate: "2025-04-19",
          status: "已完成",
        },
        {
          id: 3,
          transferNo: "DB202504201003",
          outWarehouse: "二号仓库",
          inWarehouse: "三号仓库",
          transferDate: "2025-04-18",
          status: "已取消",
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
      return this.transferList.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchData() {
      console.log("搜索条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { transferNo: "", outWarehouse: "", status: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteData(id) {
      this.transferList = this.transferList.filter((item) => item.id !== id);
    },
    batchDelete() {
      const ids = this.multipleSelection.map((i) => i.id);
      this.transferList = this.transferList.filter(
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
        case "待确认":
          return "warning";
        case "已完成":
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
  