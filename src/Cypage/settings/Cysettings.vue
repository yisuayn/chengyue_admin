<template>
  <div>
    <!-- 搜索区 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类">
            <el-option label="床品" value="床品" />
            <el-option label="毛巾" value="毛巾" />
            <el-option label="窗帘" value="窗帘" />
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
      <el-button type="primary" @click="openDialog">新增库存</el-button>
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
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="stock" label="库存数量">
        <template slot-scope="scope">
          <span
            :style="{ color: scope.row.stock < scope.row.warning ? 'red' : '' }"
          >
            {{ scope.row.stock }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="warning" label="预警值" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.stock > 0 ? 'success' : 'info'">
            {{ scope.row.stock > 0 ? "正常" : "缺货" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="editData(scope.row)">编辑</el-button>
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
      :total="stockList.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right"
    />

    <!-- 弹窗表单 -->
    <el-dialog
      title="新增/编辑库存"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="产品名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formData.category">
            <el-option label="床品" value="床品" />
            <el-option label="毛巾" value="毛巾" />
            <el-option label="窗帘" value="窗帘" />
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="formData.stock" :min="0" />
        </el-form-item>
        <el-form-item label="预警值">
          <el-input-number v-model="formData.warning" :min="0" />
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
      searchForm: { name: "", category: "" },
      stockList: [
        { id: 1, name: "纯棉床单", category: "床品", stock: 300, warning: 50 },
        { id: 2, name: "吸水毛巾", category: "毛巾", stock: 20, warning: 30 },
        { id: 3, name: "遮光窗帘", category: "窗帘", stock: 0, warning: 10 },
      ],
      multipleSelection: [],
      dialogVisible: false,
      formData: { id: null, name: "", category: "", stock: 0, warning: 10 },
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.stockList.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchData() {
      console.log("搜索条件", this.searchForm);
    },
    resetSearch() {
      this.searchForm = { name: "", category: "" };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openDialog() {
      this.formData = {
        id: null,
        name: "",
        category: "",
        stock: 0,
        warning: 10,
      };
      this.dialogVisible = true;
    },
    editData(row) {
      this.formData = Object.assign({}, row);
      this.dialogVisible = true;
    },
    deleteData(id) {
      this.stockList = this.stockList.filter((item) => item.id !== id);
    },
    batchDelete() {
      const ids = this.multipleSelection.map((i) => i.id);
      this.stockList = this.stockList.filter((item) => !ids.includes(item.id));
    },
    saveData() {
      if (this.formData.id) {
        const index = this.stockList.findIndex(
          (i) => i.id === this.formData.id
        );
        if (index !== -1) this.stockList.splice(index, 1, this.formData);
      } else {
        this.formData.id = Date.now();
        this.stockList.push({ ...this.formData });
      }
      this.dialogVisible = false;
    },
    handlePageChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
