<template>
  <div class="main">
    <top></top>
    <div id="black"></div>
    <div id="left_menu" :style="'height:'+screenHeight+'px'">
        <el-menu
        :default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#4A7FE1">
          <el-submenu index="/InfoEdit" style="margin-top:200px;">
            <template slot="title"  >
              <i class="el-icon-add-location"></i>
              <span>添加</span>
            </template>
              <el-menu-item index="/InfoEdit/NewsNotice" style="padding-left:100px;">新闻通知</el-menu-item>
              <el-menu-item index="/InfoEdit/EquipmentInfo" style="padding-left:110px;">设备说明书</el-menu-item>
              <el-menu-item index="/InfoEdit/DataLink" style="padding-left:100px;">资料衔接</el-menu-item>
          </el-submenu>
          <el-menu-item index="/InfoEdit/EditRecord">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">记录</span>
          </el-menu-item>
        </el-menu>
    </div>
    <div :style="'height:'+screenHeight+'px'" class="bg">
      <router-view/>
    </div>
  </div>
</template>

<script>
import top from "../../components/top"
export default {
    data () {
        return {
          screenHeight:'',
        }
    },
    components:{top},
    methods: {
    },
    mounted:function(){
      const that = this;
      that.screenHeight = document.body.scrollHeight;
      window.onresize = () => {
        return (() => {
          that.screenHeight = document.body.scrollHeight;
        })()
      }
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
#black{
  width:100%;
  height:20px;
  background-color: white;
  position:absolute;
  top:130px;
  border-bottom:5px solid #2E3C54;
  z-index:6;
}
#left_menu{
  width:240px;
  position:absolute;
  background-color: #545c64;
  left:-70px;
  top:0;
  z-index:5;
}
.bg{
  width:100%;
  min-height:100%;
  position: relative;
  background-color: #F5F5F5;
}
</style>
