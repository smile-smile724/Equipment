<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div id="leftBox">
      <div style="height:50px;width:100%;background-color:white;"></div>
      <span id="leftTop">最新消息通知</span>
      <ul>
        <li >
          <i style="width:7px;height:7px;border-radius:50%;background-color:#2A3C57;display: inline-block;margin:9px 10px 30px 0;float:left"></i>
          <p id="Links" style="text-decoration:underline;"><a href="http://47.100.43.177:8080/dist/static/app-release.apk.1.1" target="_blank"  style="color:#002771;">大型仪器设备管理系统客户端下载</a></p>
          <p id="time">2020-01-15 （09：11）</p>
        </li>
        <li >
          <i style="width:7px;height:7px;border-radius:50%;background-color:#2A3C57;display: inline-block;margin:9px 10px 30px 0;float:left"></i>
          <p id="Links"  @click="DownFlag=true">相关资料下载</p>
          <p id="time">2020-02-25 （18：15）</p>
        </li>
        <li v-for="item in News" :key="item.$index" >
          <i style="width:7px;height:7px;border-radius:50%;background-color:#2A3C57;display: inline-block;margin:9px 10px 30px 0;float:left"></i>
          <p id="Links" @click="FindNews(item.noticeId)">{{item.noticeName}}</p>
          <p id="time">{{item.createTime}}</p>
        </li>
      </ul>
    </div>
    <div id="centerBox">
      <div style="height:50px;width:100%;background-color:white;">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:30px;float:left;">
          <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>最新消息通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <img src="../../assets/line.png" style="height:50px;width:100%;">
      <div style="height:5px;width:100%;background-color:#4A7FE1;margin-top:-4px;"></div>
      <div  id="Toptip">
        <i style="width:13px;height:28px;background-color:black;display: inline-block;margin:11px 20px 11px 50px;float:left"></i>
        <span style="height:50px;display:inline-block;font-size:24px;">设备情况查询</span>
        <input type="text"  placeholder="输入关键词" id="search" v-model="search">
        <img src="../../assets/blue_search.png" style="height:120px;position:absolute;right:35px;transform:rotate(-40deg);top:-36px">
      </div>
      <ul id="PagesSelect">
        <li :class="{'SelectPage':PagesIndex==0,'unSelectPage':PagesIndex!=0}" @click="PagesIndex=0">设备</li>
        <li :class="{'SelectPage':PagesIndex==1,'unSelectPage':PagesIndex!=1}" @click="PagesIndex=1">附件</li>
        <li :class="{'SelectPage':PagesIndex==2,'unSelectPage':PagesIndex!=2}" @click="PagesIndex=2">其他</li>
      </ul>
      <div class="tablePart">
        <el-table
        :data="data.filter(data => !search
        || data.equipmentId==search
        || data.leader.toLowerCase().includes(search.toLowerCase())
        || data.equipmentName.toLowerCase().includes(search.toLowerCase())
        || data.place.toLowerCase().includes(search.toLowerCase())
        || (data.equipmentStatus==0&&search=='可借')
        || (data.equipmentStatus==1&&search=='不可借')).slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%;min-height:370px;">
          <el-table-column
          prop="equipmentId"
          label="设备编号"
          width="150"
          align="center">
          </el-table-column>
          <el-table-column
          prop="equipmentName"
          label="设备名称"
          align="center">
          </el-table-column>
          <el-table-column
          prop="place"
          label="安置地点"
          width="150"
          align="center">
          </el-table-column>
          <el-table-column
          prop="leader"
          label="领用人"
          width="190"
          align="center">
          </el-table-column>
          <el-table-column
          prop="equipmentStatus"
          label="状态"
          width="150"
          align="center"
          :formatter="formatterColumn">
          </el-table-column>
        </el-table>
        <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="data.filter(data => !search
        || data.equipmentId==search
        || data.leader.toLowerCase().includes(search.toLowerCase())
        || data.equipmentName.toLowerCase().includes(search.toLowerCase())
        || data.place.toLowerCase().includes(search.toLowerCase())
        || (data.equipmentStatus==0&&search=='可借')
        || (data.equipmentStatus==1&&search=='不可借')).length"
        @current-change="handleCurrentChange"
         style="margin:12px 0">
        </el-pagination>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="最新通知" :visible.sync="NewsFlag" width="70%">
      <div id="newsbox">
        <span style="font-size:26px;display:block;margin-bottom:5px;letter-spacing: 2px;">{{News[NewsIndex].noticeName}}</span>
        <span style="color:rgb(190, 190, 190);margin-right:10px;">{{News[NewsIndex].publisher}}</span>
        <span style="color:rgb(190, 190, 190);">{{News[NewsIndex].createTime}}</span>
        <span v-show="News[NewsIndex].noticeVideo!=null&&News[NewsIndex].noticeVideo!=''"><a :href="$host+News[NewsIndex].noticeVideo" target="_blank"  style="color:rgb(190, 190, 190);">视频链接</a> </span>
        <span v-show="News[NewsIndex].noticeUrl!=null&&News[NewsIndex].noticeUrl!=''"><a :href="News[NewsIndex].noticeUrl" target="_blank"  style="color:rgb(190, 190, 190);">链接</a> </span>
        <p  style="margin-top:50px;line-height:30px;white-space: pre-wrap;" v-html="change(News[NewsIndex].noticeContent)"></p>
          <img :src="$host+Icon"
          v-for="Icon in News[NewsIndex].noticeIconList"
          :key="Icon.$index" width="40%"
           v-show="Icon!=''"
          style="margin:0 30%;">
      </div>
      <div style="height:50px"></div>
    </el-dialog>
    <el-dialog title="相关资料下载" :visible.sync="DownFlag" width="70%" id="files">
      <h1 style="padding:0 0 10px 0;font-size:18px">下载链接：</h1>
      <a href="http://47.100.43.177:8080/dist/static/files/DVB-C测试系统简明手册.ppt" target="_blank" >DVB-C测试系统简明手册.ppt</a>
      <a href="http://47.100.43.177:8080/dist/static/files/VM700T PAL 制电视测量.pdf" target="_blank">VM700T PAL 制电视测量.pdf</a>
      <a href="http://47.100.43.177:8080/dist/static/files/VM700T视频测量装置的新应用.pdf" target="_blank">VM700T视频测量装置的新应用.pdf</a>
      <a href="http://47.100.43.177:8080/dist/static/files/VmtWin操作手册.doc" target="_blank" >VmtWin操作手册.doc</a>
      <a href="http://47.100.43.177:8080/dist/static/files/全 带 宽 数 字 电 视 基 础 和 测 试.doc" >全 带 宽 数 字 电 视 基 础 和 测 试.doc</a>
      <a href="http://47.100.43.177:8080/dist/static/files/电视节目技术质量监测.ppt" target="_blank" >电视节目技术质量监测.ppt</a>
      <a href="http://47.100.43.177:8080/dist/static/files/高标清数字视频通道数字特性通道特性.doc" target="_blank">高标清数字视频通道数字特性通道特性.doc</a>
      <div style="height:50px"></div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    data () {
        return {
          NewsFlag:false,
          search:'',
          PagesIndex:0,
          data:[],
          News:[
            {
              noticeId: 1,
              noticeName: "通知测试",
              noticeContent: "测试内容",
              publisher: "测试人员",
              noticeUrl: null,
              noticeIconList: null,
              noticeVideo: null,
              createTime: "2020-04-17 22:49:14"
            }
          ],
          NewsIndex:0,
          currentPage:1,
          pagesize:7,
          DownFlag:false
        }
    },
    methods: {
      getInfo(){
        // 设备
        axios({
          method: 'get',
          url: this.$host+'/equipment/find',
          params:{
            equipmentType:this.PagesIndex
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.data=data.data;
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
      GetNotice(){
        axios({
          method: 'get',
          url: this.$host+'/notice/find/all'
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.News=data.data;
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
      handleCurrentChange(val){
		    this.currentPage = val;
      },
      formatterColumn(row, column) {
        switch(row.equipmentStatus){
          case 0:
	          return '可借';
	          break;
          case 1:
	          return '不可借';
	          break;
        }
      },
      FindNews(noticeId){
        this.NewsFlag=true;
        for(var i=0;i<this.News.length;i++){
          if(this.News[i].noticeId==noticeId){
            this.NewsIndex=i;
            break;
          }
        }
      },
      change:function(content){
        content = content.replace(/\\n/gm,"<br/>");
   		  return content;
   	  }
    },
    mounted:function(){
      this.getInfo();
      this.GetNotice();
    },
    watch:{
      search(val){
        this.currentPage = 1;
      },
      PagesIndex(val){
        this.getInfo();
      }
    }
}


</script>

<style scoped>
a{
    text-decoration: none;
}
#mainbox {
  width: 92%;
  height:100%;
  margin: 0 auto;
}
#leftBox{
  width: 20%;
  min-width: 250px;
  height:100%;
  background-color: #f5f5f5;
  float: left;
}
#centerBox{
  width: 75%;
  float: right;
  background-color: #f5f5f5;
  height:100%;
}
#leftTop{
  width:100%;
  height:50px;
  line-height: 50px;
  background-color: #4A7FE1;
  color:white;
  display: block;
  font-size: 18px;
  letter-spacing:1px;
}
#leftBox ul{
  width:100%;
  padding:0;
  margin-top:30px;
  border-top: 1px solid #B9B9B9;
}
#leftBox ul li{
  list-style: none;
  height:90px;
  font-size: 18px;
  border-bottom: 1px solid #B9B9B9;
  padding:15px 30px 15px 30px;
  text-align: left;
}
#Links{
  width:170px;
  height:65px;
  display: inline-block;
  color:#002771;
  cursor: pointer;
  margin:0;
}
#time{
  width: 100%;
  font-size:15px;
  display: block;
  color:#000000;
  margin-left:17px;
  cursor: pointer;
  margin:0 0 0 17px;
}
#mainbox /deep/ .el-dialog__header{
  text-align: left;
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  color:black;
  font-weight:bold;
}
#newsbox{
  width:95%;
  margin:0 auto;
  text-align: left;
  color:black;
  font-size:16px；
}
#Toptip{
  height:50px;
  width:100%;
  margin-top:25px;
  text-align:left;
  line-height:50px;
  position: relative;
}
#search{
  height:40px;
  width:250px;
  border:2px solid #4A7FE1;
  border-radius:40px;
  float: right;
  margin-right:60px;
  outline:none;
  font-size:17px;
  padding:0 60px 0 30px;
}
input::-ms-input-placeholder{
  text-align: center;
}
input::-webkit-input-placeholder{
  text-align: center;
}
#PagesSelect{
  width:330px;
  height:32px;
  border:1px solid #4A7FE1;
  margin-top:22px;
  margin-left:50px;
  padding:0;
}
#PagesSelect li{
  list-style: none;
  width:108px;
  height:30px;
  padding:0;
  border:1px solid #4A7FE1;
  float: left;
  cursor: pointer;
  font-size: 15px;
  line-height: 30px;
  font-weight: bold;
}
.SelectPage{
  color:white;
  background-color:#4A7FE1 ;
}
.unSelectPage{
  background-color: white;
  color:#4A7FE1;
}
.tablePart{
  width:95%;
  min-height:424px;
  margin:30px auto 0 auto;
  box-shadow: 0px 0px 5px #bebebe;
  border:1px solid rgb(161, 161, 161);
  background-color: white;
}
.tablePart /deep/ .el-table{
  border-bottom:1px solid rgb(161, 161, 161);
}
.tablePart /deep/ .el-table th.is-leaf {
  background-color: #77ADFF;
  border-bottom:  1px solid rgb(161, 161, 161);
  border-right:1px solid rgb(161, 161, 161);
  color:black;
  font-size: 17px;
  font-weight: normal;
}
.tablePart /deep/ .el-table td,.building-top .el-table th.is-leaf {
  border-bottom:  1px solid rgb(161, 161, 161);
  border-right:1px solid rgb(161, 161, 161);
  padding:11px 0;
}
.tablePart /deep/ .el-table__row:nth-child(even) {
     background-color: #F7F7F7;
}
.tablePart /deep/ .el-table__row:nth-child(odd) {
     background-color: #FFFFFF;
}
#files{
  padding:20px;
  text-align: center;
}
#files a{
  display:block;
  text-decoration: underline;
  color:black;
  padding:5px 0;
}
</style>
