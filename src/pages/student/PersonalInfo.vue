<template>
      <!-- 主要内容 -->
      <div id="mainbox">
        <div  style="height:25px;"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 20px 40px;font-size:18px;">
          <el-breadcrumb-item :to="{ path: '/student/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人资料</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
        <div id="Info">
          <div class="picture"><img :src="$host+person.icon"></div>
          <el-container style="width:280px;height:310px;margin-left:351px;margin-top: -240px;text-align:left;">
            <el-header
              style="height: 62px;width: 100%;padding-top: 17px;"
            >学号&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{person.username}}</el-header>
            <el-main
              style="height: 51px; width: 100%;"
            >姓名&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{person.name}}</el-main>
            <el-main
              style="height: 51px; width: 100%;"
            >所属学院&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{person.college}}</el-main>
            <el-main
              style="height: 51px; width: 100%;"
            >所属专业&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{person.major}}</el-main>
            <el-main
              style="height: 51px; width: 100%;"
            >班级&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{{person.classes}}</el-main>
          </el-container>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
  data() {
    return {
      person:{},
    };
  },
  methods: {
    getInfo(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/find/my',
          params:{
            username:this.person.username
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.person=data.data;
          }else {
            that.$message({
              type: 'warning',
              message: data.msg
            });
          }
        })
        .catch(function (error) {
          that.$message.error('连接失败，请检查网络');
        });
    },
  },
  mounted: function() {
    this.person.username = this.getCookie('num');
    this.getInfo();
  },
  watch:{
  }
};
</script>

<style scoped>
#mainbox {
  width: 80%;
  height:100%;
  background-color: #f5f5f5;
  margin: 0 auto;
  box-shadow: 0px 0px 5px #bebebe;
}
.home {
  width: 16%;
  height: 18%;
  padding-top: 4px;
}
.data {
  width: 14%;
  height: 14%;
  margin-left: 76px;
  margin-top: -131px;
}
h1 {
  font-size: 17px;
  color: #909399;
  font-weight: 100;
}
#Info{
  width:700px;
  margin:0 auto;
}
.picture {
  width: 150px;
  margin-top: 93px;
}
.picture img{
  width: 150px;
}
</style>
