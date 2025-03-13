<template>
  <div class="Cyproduct">
    <Weight class="product_content">
      <div class="product_container">
        <el-form ref="form" class="product_from">
          <el-select v-model="Selectwords" filterable placeholder="请选择">
            <el-option
              v-for="item in wordsteam"
              :key="item.Selectwords"
              :label="item.text"
              :value="item.Selectwords"
            ></el-option>
          </el-select>
          <el-select
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button>搜索</el-button>
        </el-form>
        <el-button type="primary" @click="dialogFormVisible  = true">添加</el-button>
      </div>
      <el-table :data="currentTableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="province" label="省份" width="180"></el-table-column>
        <el-table-column prop="city" label="城市/地区" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="zip" label="数字"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </Weight>
    <el-dialog title="产品添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品属性" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品归属地" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品材质" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formdata: [], //表单提交数据
      wordsteam: [
        {
          Selectwords: "选项1",
          text: "黄金糕",
        },
      ],
      Selectwords: "",
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      currentPage: 1, //当前页码
      tableData: [],
      pageSize: 10, //每页数量
      total: 0, //数据总量
      currentTableData: [], // 存储当前页数据

      dialogFormVisible: false,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.fetchData();
    this.list = this.states.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 重新从第一页开始
      this.updateTableData(); // 更新当前页数据
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updateTableData(); // 更新当前页数据
    },
    // GET 请求表格数据
    async fetchData() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/testconnect", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          },
        });
        this.tableData = response.data;
        this.total = response.data.length;
        this.updateTableData();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 表格数据前端分页
    updateTableData() {
      // 计算当前页的起始索引和结束索引
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.currentTableData = this.tableData.slice(start, end); // 切片获取当前页数据
    },
  },
};
</script>
<style lang="scss">
.product_content {
  padding: 20px;
}
.product_container {
  display: flex;
  justify-content: space-between;
}
.product_from {
  display: flex;
  gap: 1rem;
  width: 80%;
}
.el-pagination {
  text-align: right;
}
.el-dialog{
  width: 35%;;
}
</style>
