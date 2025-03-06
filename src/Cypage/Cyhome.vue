<template>
  <div class="Cyhome">
    <Weight>
      <el-row>
        <el-col :span="16">
          <p>工作台</p>
          <div class="platform">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              :size="150"
            ></el-avatar>
            <div>
              <p>上午好，田野院子，休息一会儿吧</p>
              <p>前端工程师|某某公司-某某部门-vue平台</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <p>更新时间</p>
          <p>更新次数</p>
          <p>更新内容</p>
        </el-col>
      </el-row>
    </Weight>
    <el-row :gutter="12">
      <el-col :span="6">
        <Weight>
          <el-card shadow="never" class="data-card">
            <div class="data-card-content">
              <div class="data-card-value">¥ 126,560</div>
              <div class="data-card-title">本月销售额</div>
            </div>
            <div class="data-card-icon bg-blue">
              <i class="el-icon-s-data"></i>
            </div>
          </el-card>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <el-card shadow="never" class="data-card">
            <div class="data-card-content">
              <div class="data-card-value">268</div>
              <div class="data-card-title">本月订单数</div>
            </div>
            <div class="data-card-icon bg-green">
              <i class="el-icon-s-order"></i>
            </div>
          </el-card>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <el-card shadow="never" class="data-card">
            <div class="data-card-content">
              <div class="data-card-value">32</div>
              <div class="data-card-title">新增客户</div>
            </div>
            <div class="data-card-icon bg-orange">
              <i class="el-icon-user"></i>
            </div>
          </el-card>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <el-card shadow="never" class="data-card">
            <div class="data-card-content">
              <div class="data-card-value">1,286</div>
              <div class="data-card-title">库存总量</div>
            </div>
            <div class="data-card-icon bg-purple">
              <i class="el-icon-s-shop"></i>
            </div>
          </el-card>
        </Weight>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <Weight>
          <el-card shadow="never" class="chart-card">
            <div slot="header" class="chart-header">
              <span>销售趋势</span>
              <el-radio-group v-model="chartTimeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
            </div>
            <div class="chart-placeholder">
              <!-- 这里放图表，实际项目中可使用ECharts等 -->
              <div class="mock-chart"></div>
            </div>
          </el-card>
        </Weight>
      </el-col>

      <el-col :span="8">
        <Weight>
          <el-card shadow="never" class="chart-card">
            <div slot="header" class="chart-header">
              <span>产品分类占比</span>
            </div>
            <div class="chart-placeholder">
              <!-- 这里放饼图，实际项目中可使用ECharts等 -->
              <div class="mock-pie-chart"></div>
            </div>
          </el-card>
        </Weight>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <Weight>
          <el-card shadow="never" class="table-card">
            <div slot="header" class="card-header">
              <span>最近订单</span>
              <el-button type="text">查看更多</el-button>
            </div>
            <el-table :data="recentOrders" stripe style="width: 100%">
              <el-table-column prop="id" label="订单号" width="120"></el-table-column>
              <el-table-column prop="customer" label="客户"></el-table-column>
              <el-table-column prop="amount" label="金额"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.statusType">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </Weight>
      </el-col>

      <el-col :span="12">
        <Weight>
          <el-card shadow="never" class="table-card">
            <div slot="header" class="card-header">
              <span>库存预警</span>
              <el-button type="text">查看更多</el-button>
            </div>
            <el-table :data="stockWarnings" stripe style="width: 100%">
              <el-table-column prop="id" label="产品编号" width="120"></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="stock" label="当前库存"></el-table-column>
              <el-table-column prop="threshold" label="预警阈值"></el-table-column>
            </el-table>
          </el-card>
        </Weight>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      chartTimeRange: 'month',
      recentOrders: [
        {
          id: 'ORD-2023001',
          customer: '上海家居有限公司',
          amount: '¥12,500',
          status: '已完成',
          statusType: 'success',
        },
        {
          id: 'ORD-2023002',
          customer: '北京舒适家纺',
          amount: '¥8,760',
          status: '处理中',
          statusType: 'primary',
        },
        {
          id: 'ORD-2023003',
          customer: '广州梦之家',
          amount: '¥6,300',
          status: '待付款',
          statusType: 'warning',
        },
        {
          id: 'ORD-2023004',
          customer: '深圳优家纺织',
          amount: '¥15,200',
          status: '已发货',
          statusType: 'info',
        },
        {
          id: 'ORD-2023005',
          customer: '杭州家纺世家',
          amount: '¥9,800',
          status: '已完成',
          statusType: 'success',
        },
      ],
      stockWarnings: [
        { id: 'P-10025', name: '高档棉被套', stock: 15, threshold: 20 },
        { id: 'P-10032', name: '丝绒枕套', stock: 8, threshold: 15 },
        { id: 'P-10045', name: '亚麻床单', stock: 12, threshold: 25 },
        { id: 'P-10056', name: '羽绒被', stock: 5, threshold: 10 },
        { id: 'P-10078', name: '毛巾套装', stock: 18, threshold: 30 },
      ],
    };
  },
};
</script>
<style lang="scss">
.el-card {
  border: 0;
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}
.platform {
  display: flex;
}
/* 数据卡片样式 */
.data-card {
  position: relative;
  overflow: hidden;
  height: 120px;
  display: flex;
  align-items: center;
}

.data-card-content {
  z-index: 1;
  padding: 20px;
}

.data-card-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.data-card-title {
  font-size: 14px;
  color: #909399;
}

.data-card-icon {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
  font-size: 40px;
  color: #fff;
}

.bg-blue {
  background-color: #409eff;
}

.bg-green {
  background-color: #67c23a;
}

.bg-orange {
  background-color: #e6a23c;
}

.bg-purple {
  background-color: #8e44ad;
}

/* 图表卡片样式 */
.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mock-chart {
  width: 100%;
  height: 250px;
  background: linear-gradient(
    180deg,
    rgba(64, 158, 255, 0.2) 0%,
    rgba(64, 158, 255, 0.01) 100%
  );
  border-radius: 4px;
  position: relative;
}

.mock-chart:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #409eff;
}

.mock-pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #409eff 0% 25%,
    #67c23a 25% 55%,
    #e6a23c 55% 70%,
    #f56c6c 70% 85%,
    #909399 85% 100%
  );
}

/* 表格卡片样式 */
.table-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
