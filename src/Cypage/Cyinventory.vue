<template>
  <div class="Cyinventory">
    <el-row :gutter="12">
      <el-col :span="17">
        <Weight class="Cybox">
          <el-button type="primary">添加库存</el-button>
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
          >
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope>
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </Weight>
      </el-col>
      <el-col :span="7">
        <el-row :gutter="6">
          <el-col>
            <Weight>
              <el-card>
                <div v-for="o in 2" :key="o" class="text item">{{'当前库存量 ' + o }}</div>
              </el-card>
            </Weight>
          </el-col>
          <el-col>
            <Weight class="Cybox">
                
            </Weight>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>