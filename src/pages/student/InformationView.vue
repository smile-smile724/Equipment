<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding-top:32px;padding-left:37px;font-size:17px"
    >
      <el-breadcrumb-item :to="{ path: '/student/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div id="search">
      <input type="text"  placeholder="请输入设备编号或设备名称" v-model="input">
      <img src="../../assets/blue_search.png" style="height:120px;position:absolute;left:255px;transform:rotate(-40deg);top:0" @click="Search">
    </div>
    <!-- <el-input id="search" v-model="input" placeholder="请输入设备编号或设备类型"></el-input>
    <div class="picture1">
      <img src="../../assets/blue_search.png" />
    </div> -->
    <div class="box">
      <div class="instrument">
        <div class="picture2">
          <img :src="$host+equipment.equipmentIcon" />
        </div>
        <el-container
          style="width: 50%;height: 122px;margin-left: 50%;margin-top: -178px;text-align: left;float: left;"
        >
          <el-header style="height: 26%;width: 100%;padding-top: 0;">设备编号:{{equipment.equipmentId}}</el-header>
          <el-header style="height: 26%;width: 100%;padding-top: 0;">设备名称:{{equipment.equipmentName}}</el-header>
          <el-header style="height: 26%;width: 100%;padding-top: 0;">设备型号:{{equipment.equipmentModel}}</el-header>
          <el-header style="height: 26%;width: 100%;padding-top: 0;">国别:{{equipment.countries}}</el-header>
          <el-header style="height: 26%;width: 100%;padding-top: 0;">生产年限:{{equipment.purchaseDate}}</el-header>
          <el-header style="height: 26%;width: 100%;padding-top: 0;">出厂号:{{equipment.factoryNumber}}</el-header>
        </el-container>
      </div>
      <ul class="explain">
        <li style="padding:0 0 10px 0;">说明书下载链接：</li>
        <li  v-for="item in instructions" :key="item.$index"><a :href="$host+'/instructions/download?instructionsId='+item.instructionsId" target="_blank"  style="color:black;">{{item.instructionsName}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
  data() {
    return {
      input: "",
      equipment: {},
      data:[],
      instructions:[]
    };
  },
  methods: {
      getInfo(){
        // 设备
        axios({
          method: 'get',
          url: this.$host+'/equipment/find',
          params:{
            equipmentType:''
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.data=data.data;
            this.equipment=this.data[0];
            this.getInstruction(this.equipment.equipmentId);
          }else {
            this.$message({
              type: 'warning',
              message: data.msg
            });
          }
        })
        .catch(function (error) {
          this.$message.error('连接失败，请检查网络');
        });
      },
      Search(){
        var flag=false;
        for(var i=0;i<this.data.length;i++){
          if(this.data[i].equipmentId==this.input||this.data[i].equipmentName==this.input){
            this.equipment=this.data[i];
            this.getInstruction(this.equipment.equipmentId);
            flag=true;
            break;
          }
        }
        if(flag){
            this.$message({
              type: 'success',
              message: '查询成功'
            });
        }else{
            this.$message({
              type: 'warning',
              message: '无此设备'
            });
        }
      },
      getInstruction(id){
        axios({
          method: 'get',
          url: this.$host+'/instructions/find/equipment',
          params:{
            equipmentId:id
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.instructions=data.data;
          }else {
            this.$message({
              type: 'warning',
              message: data.msg
            });
          }
        })
        .catch(function (error) {
          this.$message.error('连接失败，请检查网络');
        });

      }

    },
  mounted: function() {
    this.getInfo();
  }
};
</script>

<style scoped>
#mainbox {
  width: 75%;
  height: 100%;
  background-color: #f5f5f5;
  margin: 0 auto;
  box-shadow: 0px 0px 5px #bebebe;
}
.line {
  width: 100%;
  border-bottom: 3px solid #5a5c5f;
  margin-top: 27px;
}
#search{
  width: 82%;
  margin-left: 84px;
  margin-top: -4px;
  text-align: left;
  position: relative;
}
#search input{
  height:40px;
  width:250px;
  border:2px solid #4A7FE1;
  border-radius:40px;
  margin-right:60px;
  outline:none;
  font-size:17px;
  padding:0 60px 0 30px;
  margin:30px 0;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.box {
  width: 82%;
  height: 67%;
  border: solid;
  margin-left: 84px;
  margin-top: -4px;
  background-color: white;
}
.picture2 {
  width: 50%;
  height: 86%;
  margin-left: 5px;
  float: left;
  margin-top: 20px;
}
.instrument {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #a5b3cd;
}
.explain {
  width: 93%;
  height: 43%;
  margin-left: 29px;
  margin-top: 18px;
  text-align: left;
  padding:0;
  list-style: none;
}
.explain li{
  padding:10px 0 10px 0;
}
</style>
