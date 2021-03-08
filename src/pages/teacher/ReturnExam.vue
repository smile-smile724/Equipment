<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div  style="height:30px;"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 15px 40px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备归还审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
    <div id="Managebox">
      <div  id="search">
        <input type="text"  placeholder="输入关键词" v-model="inputValue">
        <el-button type="primary" @click="search=inputValue">搜索</el-button>
      </div>
      <el-table
      :data="tableData.filter(data => !search
      || data.name.toLowerCase().includes(search.toLowerCase())
      || data.equipmentId==search
      || data.equipmentName.toLowerCase().includes(search.toLowerCase())
      || data.time.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column
          prop="name"
          label="申请人"
          align="center">
        </el-table-column>
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
          label="申请时间"
          min-width="190"
          align="center">
        </el-table-column>
        <el-table-column
        label="批准"
        align="center">
          <template slot-scope="scope">
            <span style="color:green;cursor: pointer;"
            @click="ConfirmReturn(scope.row)">确认归还</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="tableData.filter(data => !search
      || data.name.toLowerCase().includes(search.toLowerCase())
      || data.equipmentId==search
      || data.equipmentName.toLowerCase().includes(search.toLowerCase())
      || data.time.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin:16px 0;text-align:center;">
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
          search:'',
          inputValue:'',
          tableData:[],
          currentPage:1,
          pagesize:9
        }
    },
    methods: {
      getInfo(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/borrowing/find/status',
          params:{
            borrowingStatus:4
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.tableData=data.data;
            axios({
              method: 'get',
              url: this.$host+'/borrowing/find/status',
              params:{
                borrowingStatus:3
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                this.tableData=this.tableData.concat(data.data);
                for(var i=0;i<this.tableData.length;i++){
                  this.tableData[i].time=this.tableData[i].startTime+' 至 ' +this.tableData[i].endTime;
                }
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
      handleCurrentChange(val){
		    this.currentPage = val;
      },
      handleDelete(row){
          const that=this;
          axios({
            method: 'post',
            url: this.$host+'/borrowing/returned',
            params:{
              borrowingId:row.borrowingId,
              borrowingStatus:5
            }
          })
          .then(response => {
            var data=response.data;
            if(data.code==0){
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getInfo();
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
      ConfirmReturn(row){
        this.$confirm('是否确定已归还?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此操作'
          });
        });
      }
    },
    mounted:function(){
      this.getInfo();
    }
}


</script>

<style scoped>
#mainbox {
  width: 100%;
  height:100%;
  position: relative;
}
#Managebox{
  margin:0 80px;
  text-align: left;
}
#search{
  height:38px;
  margin-top:40px;
}
#search input{
  width:240px;
  height:26px;
  border:1px solid #e6e4e4;
  border-radius: 5px;
  margin:4px 0;
  text-indent: 10px;
}
#search input::-ms-input-placeholder{
  text-align: center;
}
#search input::-webkit-input-placeholder{
  text-align: center;
}
#search /deep/ .el-button--primary{
  padding:8px 13px;
  background-color: #4A7FE1;
}
#Managebox /deep/ .el-table{
  width: 100%;
  min-height:500px;
  box-shadow: 0px 0px 5px #bebebe;
  margin-top:20px;
}
#Managebox /deep/ .el-table th.is-leaf {
  background-color: #77ADFF;
  font-size: 16px;
  color:black;
  font-weight: normal;
}
#Managebox /deep/ .el-table__row:nth-child(even) {
     background-color: #F7F7F7;
}
#Managebox /deep/ .el-table__row:nth-child(odd) {
     background-color: #FFFFFF;
}
</style>
