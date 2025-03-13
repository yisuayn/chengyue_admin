<template>
  <Weight class="Cybox">
    <el-button type="primary" round>广告添加</el-button>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="intotime" label="日期" width="150"></el-table-column>
        <el-table-column prop="username" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>
  </Weight>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      total: 0, // 数据总数
      tableData: [],
      pageSize: 10, // 每页显示数量
      currentPage: 1,
    };
  },
  created() {
    this.fetchAdData();
  },
  methods: {
    async fetchAdData() {
      try {
        const response = await axios.get("http://localhost:3000/AdData", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          },
        });
        this.tableData = response.data.items;
        this.total = response.data.total;
      } catch (error) {
        console.error("数据加载失败", error);
      } finally {
        this.loading = false;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    editClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.pageSize = val; // 重置页码
      this.currentPage = 1;
      this.fetchAdData(); // 重新请求数据
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchAdData(); // 重新请求数据
    },
  },
};
</script>
