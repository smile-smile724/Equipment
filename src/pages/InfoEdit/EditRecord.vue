<template>
  <div class="box">
    <div style="height:225px"></div>
      <!-- 主要内容 -->
      <div id="mainbox" style="height:600px">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position:absolute;top:130px;z-index:7;left:180px">
          <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{pages[PagesIndex].front}}</el-breadcrumb-item>
        </el-breadcrumb>
        <span id="text1">{{pages[PagesIndex].tip}}</span>
        <ul id="PagesSelect">
          <li :class="{'SelectPage':PagesIndex==0,'unSelectPage':PagesIndex!=0}" @click="PagesIndex=0">新闻通知</li>
          <li :class="{'SelectPage':PagesIndex==1,'unSelectPage':PagesIndex!=1}" @click="PagesIndex=1">设备说明书</li>
          <li :class="{'SelectPage':PagesIndex==2,'unSelectPage':PagesIndex!=2}" @click="PagesIndex=2">资料衔接</li>
        </ul>
        <div style="height:100px"></div>
        <div id="table_box">
          <!-- 新闻通知 -->
          <el-table v-show="PagesIndex==0"
          :data="pages[0].tableData.filter(data => !search
          || data.publisher.toLowerCase().includes(search.toLowerCase())
          || data.createTime.toLowerCase().includes(search.toLowerCase())
          || data.noticeName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%">
            <el-table-column
            label="发布通知"
            prop="noticeName"
            align="center">
            </el-table-column>
            <el-table-column
            label="发布时间"
            prop="createTime"
            align="center">
            </el-table-column>
            <el-table-column
            label="发布人"
            prop="publisher"
            align="center">
            </el-table-column>
            <el-table-column
            align="center">
              <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete( scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 设备说明书 -->
          <el-table v-show="PagesIndex==1"
          :data="pages[1].tableData.filter(data => !search
          || data.equipmentName.toLowerCase().includes(search.toLowerCase())
          || data.departmentName.toLowerCase().includes(search.toLowerCase())
          || data.place.toLowerCase().includes(search.toLowerCase())
          || data.leader.toLowerCase().includes(search.toLowerCase())
          || data.equipmentId==search).slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%">
            <el-table-column
            label="设备编号"
            prop="equipmentId"
            align="center">
            </el-table-column>
            <el-table-column
            label="设备名称"
            prop="equipmentName"
            align="center">
            </el-table-column>
            <el-table-column
            label="部门名称"
            prop="departmentName"
            align="center">
            </el-table-column>
            <el-table-column
            label="安置地点"
            prop="place"
            align="center">
            </el-table-column>
            <el-table-column
            label="领用人"
            prop="leader"
            align="center">
            </el-table-column>
            <el-table-column
            align="center">
              <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                size="mini"
                @click="Edit(scope.row)">修改</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div  v-show="PagesIndex==2" id="files">
            <h1 style="padding:0 0 10px 0;font-size:18px">相关资料下载链接：</h1>
            <a href="http://47.100.43.177:8080/dist/static/files/DVB-C测试系统简明手册.ppt" target="_blank" >DVB-C测试系统简明手册.ppt</a>
            <a href="http://47.100.43.177:8080/dist/static/files/VM700T PAL 制电视测量.pdf" target="_blank">VM700T PAL 制电视测量.pdf</a>
            <a href="http://47.100.43.177:8080/dist/static/files/VM700T视频测量装置的新应用.pdf" target="_blank">VM700T视频测量装置的新应用.pdf</a>
            <a href="http://47.100.43.177:8080/dist/static/files/VmtWin操作手册.doc" target="_blank" >VmtWin操作手册.doc</a>
            <a href="http://47.100.43.177:8080/dist/static/files/全 带 宽 数 字 电 视 基 础 和 测 试.doc" >全 带 宽 数 字 电 视 基 础 和 测 试.doc</a>
            <a href="http://47.100.43.177:8080/dist/static/files/电视节目技术质量监测.ppt" target="_blank" >电视节目技术质量监测.ppt</a>
            <a href="http://47.100.43.177:8080/dist/static/files/高标清数字视频通道数字特性通道特性.doc" target="_blank">高标清数字视频通道数字特性通道特性.doc</a>
          </div>
        </div>
        <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="pages[0].tableData.filter(data => !search
          || data.publisher.toLowerCase().includes(search.toLowerCase())
          || data.createTime.toLowerCase().includes(search.toLowerCase())
          || data.noticeName.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin-top:25px"
         v-show="PagesIndex==0">
        </el-pagination>

        <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="pages[1].tableData.filter(data => !search
          || data.equipmentName.toLowerCase().includes(search.toLowerCase())
          || data.departmentName.toLowerCase().includes(search.toLowerCase())
          || data.place.toLowerCase().includes(search.toLowerCase())
          || data.leader.toLowerCase().includes(search.toLowerCase())
          || data.equipmentId==search).length"
        @current-change="handleCurrentChange"
         style="margin-top:25px"
         v-show="PagesIndex==1">
        </el-pagination>
      </div>
    <div style="height:10px"></div>
    <!-- 弹框 -->
    <el-dialog title="修改" :visible.sync="EditFlag">
      <div id="editDialog">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="设备编号：" style="text-align:left;">
            <span>{{form.equipmentId}}</span>
          </el-form-item>
          <el-form-item label="设备名称：">
            <el-input v-model="form.equipmentName" placeholder="请输入设备名称" ></el-input>
          </el-form-item>
          <el-form-item label="部门名称：">
            <el-input v-model="form.departmentName" placeholder="请输入部门名称" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：">
            <el-input v-model="form.place" placeholder="安置地点" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：">
            <el-input v-model="form.leader" placeholder="领用人" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    data () {
        return {
          pages:[
            {
              index:0,
              front:"最新通知消息新闻通知",
              tip:"记录查询",
              tableData: []
            },
            {
              index:1,
              front:"设备信息管理",
              tip:"设备查询",
              tableData: []
            },
            {
              index:0,
              front:"资料衔接管理",
              tip:"资料查询"
            }
          ],
          search: '',
          currentPage:1,
          pagesize:7,
          PagesIndex:1,
          EditFlag:false,
          form:{}
        }
    },
    methods: {
      getInfo(){
        const that=this;
        // 获取通知信息
        axios({
          method: 'get',
          url: this.$host+'/notice/find/all'
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.pages[0].tableData=data.data;
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
        // 获取设备说明
        axios({
          method: 'get',
          url: this.$host+'/equipment/find',
          params:{
            equipmentStatus:'',
            equipmentType:''
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.pages[1].tableData=data.data;
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
      handleEdit() {
        axios({
          method: 'post',
          url: this.$host+'/equipment/update',
          params:{
            equipmentId:this.form.equipmentId,
            equipmentName:this.form.equipmentName,
            equipmentModel:this.form.equipmentModel,
            manufacturer:this.form.manufacturer,
            countries:this.form.countries,
            equipmentType:this.form.equipmentType,
            departmentName:this.form.departmentName,
            place:this.form.place,
            leader:this.form.leader,
            factoryNumber:this.form.factoryNumber,
            equipmentIcon:this.form.equipmentIcon,
            equipmentIntroduce:this.form.equipmentIntroduce
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.pages[1].tableData=data.data;
            this.form={};
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          }else {
            this.$message({
              type: 'warning',
              message: '修改失败'
            });
          }
        })
        .catch(function (error) {
          this.$message({
              type: 'warning',
              message: '连接失败，请检查网络'
            });
        });
        this.EditFlag=false;
      },
      handleCurrentChange(val){
		    this.currentPage = val;
      },
      handleDelete(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.PagesIndex==0){
            this.DeleteNotic(row);
          }else if(this.PagesIndex==1){
            this.DeleteEquipment(row);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      Edit(row){
        this.form=row;
        this.EditFlag=true;
      },
      DeleteNotic(row){
        const that=this;
        axios({
          method: 'post',
          url: this.$host+'/notice/admin/delete',
          params:{
            noticeId:row.noticeId
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.pages[0].tableData=data.data;
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            });
          }
        })
        .catch(function (error) {
          this.$message({
              type: 'warning',
              message: '连接失败，请检查网络'
            });
        });
      },
      DeleteEquipment(row){
        const that=this;
        axios({
          method: 'post',
          url: this.$host+'/equipment/delete',
          params:{
            equipmentId:row.equipmentId
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.pages[1].tableData=data.data;
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            });
          }
        })
        .catch(function (error) {
          this.$message({
              type: 'warning',
              message: '连接失败，请检查网络'
            });
        });
      }
    },
    mounted:function(){
      this.getInfo();
    },
    watch:{
      search(val){
        this.currentPage = 1;
      }
    }
}

</script>

<style scoped>
.box{
  width:100%;
  min-height:100%;
  position: relative;
}
#mainbox{
  min-height:100%;
  background-color: #FFFFFF;
  margin:0 80px 0 250px;
  box-shadow: 0px 0px 5px #bebebe ;
}
#text1{
  display:block;
  position:absolute;
  top:195px;
  text-align:left;
  font-size:18px;
  font-weight:bold;
}
#PagesSelect{
  width:270px;
  height:32px;
  border:1px solid #4A7FE1;
  float: left;
  margin-top:32px;
  margin-left:2.5%;
  padding:0;
}
#PagesSelect li{
  list-style: none;
  width:88px;
  height:30px;
  padding:0;
  border:1px solid #4A7FE1;
  float: left;
  cursor: pointer;
  font-size: 14px;
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
#table_box{
  width:95%;
  height:424px;
  background-color: #FFFFFF;
  margin:0 auto;
  box-shadow: 0px 0px 5px #bebebe ;
}
#files{
  padding:20px 0 0 50px;
  text-align: left;
}
#files a{
  display:block;
  color:black;
  padding:5px 0;
}
</style>
