<template>
  <div>
    <!-- 搜索区 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input
            v-model="searchForm.customerName"
            placeholder="请输入客户姓名"
          />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="待发货" value="待发货" />
            <el-option label="已发货" value="已发货" />
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
    <div style="margin: 10px 0">
      <el-button
        type="danger"
        :disabled="!multipleSelection.length"
        @click="batchDelete"
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="pagedData"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="orderNo" label="订单编号" />
      <el-table-column prop="customerName" label="客户姓名" />
      <el-table-column prop="orderDate" label="下单时间" />
      <el-table-column prop="status" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.status)">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="总金额(￥)" />
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="viewDetail(scope.row)">查看</el-button>
          <el-button
            type="text"
            style="color: red"
            @click="deleteData(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="total, prev, pager, next"
      :total="orderList.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right"
    />

    <!-- 订单详情弹窗 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="100px">
        <el-form-item label="订单编号">
          <span>{{ detailData.orderNo }}</span>
        </el-form-item>
        <el-form-item label="客户姓名">
          <span>{{ detailData.customerName }}</span>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{ detailData.orderDate }}</span>
        </el-form-item>
        <el-form-item label="订单状态">
          <span>{{ detailData.status }}</span>
        </el-form-item>
        <el-form-item label="总金额">
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
      searchForm: { orderNo: "", customerName: "", status: "" },
      orderList: [
        {
          id: 1,
          orderNo: "202504201001",
          customerName: "王小明",
          orderDate: "2025-04-19",
          status: "待发货",
          amount: 1800,
        },
        {
          id: 2,
          orderNo: "202504201002",
          customerName: "李丽",
          orderDate: "2025-04-18",
          status: "已发货",
          amount: 3000,
        },
        {
          id: 3,
          orderNo: "202504201003",
          customerName: "陈磊",
          orderDate: "2025-04-17",
          status: "已完成",
          amount: 2500,
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
      return this.orderList.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchData() {
      console.log("搜索条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { orderNo: "", customerName: "", status: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteData(id) {
      this.orderList = this.orderList.filter((item) => item.id !== id);
    },
    batchDelete() {
      const ids = this.multipleSelection.map((i) => i.id);
      this.orderList = this.orderList.filter((item) => !ids.includes(item.id));
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
        case "待发货":
          return "warning";
        case "已发货":
          return "primary";
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
