<template>
  <div class="Cyinventory">
    <el-row :gutter="12">
      <el-col :span="17">
        <Weight class="Cybox">
          <el-button type="primary">添加库存</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="类别" prop="category"></el-table-column>
            <el-table-column label="布料" prop="Material"></el-table-column>
            <el-table-column label="布料工艺" prop="Processcharacteristics"></el-table-column>
            <el-table-column label="认证等级" prop="SafetyCertification"></el-table-column>
            <el-table-column label="适用季节" prop="Seasonalproperties"></el-table-column>
            <el-table-column label="适用场景" prop="scenario"></el-table-column>
            <el-table-column label="尺寸" prop="Sizematrix"></el-table-column>
            <el-table-column label="重量参数" prop="Weightparameters"></el-table-column>
            <el-table-column label="颜色分类 " prop="Colormanagement"></el-table-column>
            <el-table-column label="包装等级" prop="Packagingconfiguration"></el-table-column>
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
              <Cyscroll></Cyscroll>
            </Weight>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <Weight></Weight>
  </div>

</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
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
    async getinventory(){
      try{
        const response = await this.$axios.get("http://localhost:3000/addinventory",)
        console.log(response);
        
        if(response.status === 200){
          this.tableData = response.data;
          this.$message({
          message: '当前库存列表已更新',
          type: 'success'
        });
        }else{
          this.$message.error('库存数据更新失败。。。');
        }
      }catch(error){
        console.error("添加失败:", error);
      }
    }
  },
  mounted(){
    this.getinventory();
  }
};
</script>