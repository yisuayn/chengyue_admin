<template>
  <div>
    <el-button @click="handleclick()">打开</el-button>
    
    <CustomDrawer :drawer="drawerVisible"></CustomDrawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible:"",
    }
  },
  methods:{
    handleclick(){
      this.showDrawer = true;
    }
  }
}
</script>