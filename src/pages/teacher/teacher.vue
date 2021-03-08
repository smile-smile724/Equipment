<template>
  <div class="main">
    <top></top>
    <el-menu
    :default-active="$route.path"
    router
    class="el-menu-demo"
    mode="horizontal"
    background-color="#3151BF"
    text-color="#FFFFFF"
    active-text-color="#FFFFFF"
    style="width:100%;position: absolute;top:130px;z-index:6;">
      <el-menu-item index="/teacher/index" style="margin-left:200px">首页</el-menu-item>
      <el-menu-item index="/teacher/EquipManage">设备管理</el-menu-item>
      <el-menu-item index="/teacher/OrderExam">设备预约审核</el-menu-item>
      <el-menu-item index="/teacher/ReturnExam">设备归还审核</el-menu-item>
      <el-menu-item index="/InfoEdit/EditRecord">设备信息管理</el-menu-item>
      <el-menu-item index="/teacher/historyView">历史查询</el-menu-item>
      <el-menu-item index="/teacher/StudentManage">学生管理</el-menu-item>
    </el-menu>
    <div class="bg">
      <div id="border">
        <div style="height:191px;"></div>
        <div :style="'height:'+(screenHeight-191)+'px;min-height:600px;'">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../components/top"
export default {
    data () {
        return {
          screenHeight: "",
          activeIndex: '/teacher/index'
        }
    },
    components:{top},
    methods: {
    },
    mounted: function() {
      const that = this;
      that.screenHeight = document.body.scrollHeight;
      window.onresize = () => {
        return (() => {
          that.screenHeight = document.body.scrollHeight;
        })();
      };
    },
    watch:{
      screenHeight(val){
        if(!this.timer){
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function(){
            that.timer = false
          },400)
        }
      }
    }
}


</script>

<style scoped>
a{
    text-decoration: none;
}
.main{
  width:100%;
  height:100%;
  position: relative;
}
span{
  width:3px;
  height:15px;
  background-color: aliceblue;
}
.bg {
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: #f5f5f5;
}
#border {
  width: 80%;
  min-height: 100%;
  background-color: #ffffff;
  margin-left: 10%;
  box-shadow: 0px 0px 5px #bebebe;
}
</style>
