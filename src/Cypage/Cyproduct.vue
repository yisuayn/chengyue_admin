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
        <el-button type="primary" @click="formcleaning()">新增产品</el-button>
      </div>
      <el-table :data="currentTableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="sku" label="产品编码" width="180"></el-table-column>
        <el-table-column prop="spu" label="SPU编码" width="180"></el-table-column>
        <el-table-column prop="productstatus" label="产品状态" width="180"></el-table-column>
        <el-table-column prop="createtime" :formatter="formatTime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" :formatter="formatTime" label="更新时间"></el-table-column>
        <el-table-column prop="productterritory" label="产品归属地"></el-table-column>
        <el-table-column prop="adpeople" label="验收者"></el-table-column>
        <el-table-column prop="producer" label="生产者"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" @click="handleClick(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
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
      <el-drawer :title="row.sku" :visible.sync="drawer" :before-close="handleClose">
        <span>{{ row }}</span>
      </el-drawer>
    </Weight>
    <el-dialog title="产品添加" :visible.sync="dialogFormVisible">
      <el-form ref="dataref" :model="form">
        <el-form-item label="产品编码" :label-width="formLabelWidth" prop="sku">
          <el-input v-model="form.sku" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="SPU编码" :label-width="formLabelWidth" prop="spu">
          <el-input v-model="form.spu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品状态" :label-width="formLabelWidth" prop="productstatus">
          <el-input v-model="form.productstatus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品归属地" :label-width="formLabelWidth" prop="productterritory">
          <el-input v-model="form.productterritory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验收者" :label-width="formLabelWidth" prop="adpeople">
          <el-input v-model="form.adpeople" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产者" :label-width="formLabelWidth" prop="producer">
          <el-input v-model="form.producer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createtime">
          <el-date-picker v-model="form.createtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth" prop="updatetime">
          <el-date-picker v-model="form.updatetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitproduct(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      drawer: false,
      row: "",
      formdata: [], //表单提交数据
      wordsteam: [
        //下拉选择框
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
        sku: "",
        spu: "",
        productstatus: "",
        createtime: "",
        updatetime: "",
        productterritory: "",
        adpeople: "",
        producer: "",
      },
      formLabelWidth: "100px",
    };
  },
  mounted() {
    this.fetchData();
    this.list = this.states.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
  },
  methods: {
    // 时间格式化
    formatTime(row, column, cellValue) {
      return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    //表单清空
    formcleaning() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataref.resetFields();
      });
    },
    async submitproduct(form) {
      this.dialogFormVisible = false;
      try {
        const response = await axios.post(
          "http://localhost:3000/addproduct",
          form
        );
        if (response.status === 200) {
          this.from = { ...response.data };
          this.fetchData();
          this.$message({
          message: '产品数据添加成功，请查看表格',
          type: 'success'
        });
        }
      } catch (error) {
        console.error("添加失败:", error);
      }
    },
    //表格顶部搜索框
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
        const response = await axios.get("http://localhost:3000/testconnect");
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
    //表格数据操作
    handleClick(row) {
      this.drawer = true;
      this.row = { ...row };
    },
    //抽屉关闭按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
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
.el-dialog {
  width: 26%;
}
</style>
