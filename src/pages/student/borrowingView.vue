<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div  style="height:25px;"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 20px 40px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/student/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用查看</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
    <div id="Managebox">
      <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column
          prop="equipmentId"
          label="设备编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          min-width="140"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="起止时间"
          min-width="190"
          align="center">
        </el-table-column>
        <el-table-column
          label="批准"
          prop="Status"
          align="center">
          <template slot-scope="scope">
            <span :style="{'color':(scope.row.Status=='已预约'||scope.row.Status=='借用中')?'#4A7FE1':(scope.row.Status=='已归还'||scope.row.Status=='归还中'?'green':'red')}"
            >{{scope.row.Status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="tableData.length"
        @current-change="handleCurrentChange"
         style="margin:12px 0;text-align:center;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    data () {
        return {
          currentPage:1,
          pagesize:9,
          tableData:[],
        }
    },
    methods: {
      handleCurrentChange(val){
		    this.currentPage = val;
      },
      getInfo(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/borrowing/find/my',
          params:{
            username:this.getCookie('num')
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.tableData=data.data;
            this.ChangeInfo();
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
      ChangeInfo(){
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].time=this.tableData[i].startTime+' —— ' +this.tableData[i].endTime;
          var s=this.tableData[i].borrowingStatus;
          if(s==0){
            this.tableData[i].Status="已预约";
          }else if(s==1){
            this.tableData[i].Status="预约失败";
          }else if(s==2){
            this.tableData[i].Status="借用中";
          }else if(s==3){
            this.tableData[i].Status="逾期未还";
          }else if(s==4){
            this.tableData[i].Status="归还中";
          }else if(s==5){
            this.tableData[i].Status="已归还";
          }
        }
      },
    },
    mounted:function(){
      this.getInfo();
    }
}


</script>

<style scoped>
#mainbox {
  width: 80%;
  height:100%;
  background-color: #f5f5f5;
  margin: 0 auto;
  box-shadow: 0px 0px 5px #bebebe;
}
#Managebox{
  margin:50px 80px 0 80px;
  text-align: left;
  box-shadow: 0px 0px 5px #bebebe;
  border:1px solid rgb(161, 161, 161);
  background-color: white;
}
#Managebox /deep/ .el-table{
  width: 100%;
  min-height:463px;
  box-shadow: 0px 0px 5px #bebebe;
  border-bottom:1px solid rgb(161, 161, 161);
}
#Managebox /deep/ .el-table th.is-leaf {
  background-color: #77ADFF;
  border-bottom:  1px solid rgb(161, 161, 161);
  border-right:1px solid rgb(161, 161, 161);
  font-size: 16px;
  color:black;
  font-weight: normal;
}
#Managebox /deep/ .el-table td,.building-top .el-table th.is-leaf {
  border-bottom:  1px solid rgb(161, 161, 161);
  border-right:1px solid rgb(161, 161, 161);
  padding:11px 0;
}
#Managebox /deep/ .el-table__row:nth-child(even) {
     background-color: #F7F7F7;
}
#Managebox /deep/ .el-table__row:nth-child(odd) {
     background-color: #FFFFFF;
}
</style>
