<template>
  <div class="bg">
      <!-- 主要内容 -->
      <div id="mainbox"  :style="'height:'+screenHeight+'px'" >
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position:absolute;top:130px;z-index:7;left:180px">
          <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备信息管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑资料衔接</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
          screenHeight:'',
        }
    },
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
.bg{
  width:100%;
  min-height:100%;
  position: relative;
  background-color: #F5F5F5;
}
#mainbox{
  min-height:100%;
  background-color: #FFFFFF;
  margin:0 120px 0 290px;
  box-shadow: 0px 0px 5px #bebebe ;
}
</style>
