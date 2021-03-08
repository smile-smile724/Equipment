<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div  style="height:30px;"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 15px 40px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
    <div id="Managebox">
      <div  id="search">
        <input type="text"  placeholder="输入关键词" v-model="inputValue">
        <el-button type="primary" @click="search=inputValue">搜索</el-button>
        <el-button type="primary" @click="buildNew=true" style="margin-left:80px">新建
          <i style="width:4px;height:4px;border-radius:50%;background-color:white;display: inline-block;float:left;margin:6px 6px 6px 0;"></i>
        </el-button>
        <el-button type="primary" @click="DeleteMore" style="margin-left:20px">批量删除
          <i style="width:4px;height:4px;border-radius:50%;background-color:white;display: inline-block;float:left;margin:6px 6px 6px 0;"></i>
        </el-button>
        <el-button type="primary" @click="EditFlag=true;currentPage=1" style="margin-left:20px">批量增加
          <i style="width:4px;height:4px;border-radius:50%;background-color:white;display: inline-block;float:left;margin:6px 6px 6px 0;"></i>
        </el-button>
      </div>
      <el-table
      @selection-change="DeleteSels"
      :data="data.filter(data => !search
        || data.username==search
        || data.name.toLowerCase().includes(search.toLowerCase())
        || data.college.toLowerCase().includes(search.toLowerCase())
        || data.major.toLowerCase().includes(search.toLowerCase())
        || data.classes.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" width="65"
          align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="学号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学生姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="college"
          label="所属学院"
          align="center">
        </el-table-column>
        <el-table-column
          prop="major"
          label="所属专业"
          align="center">
        </el-table-column>
        <el-table-column
          prop="classes"
          label="所属班级"
          align="center">
        </el-table-column>
        <el-table-column
        label="删除"
        align="center">
          <template slot-scope="scope">
            <span style="color:red;cursor: pointer;"
            @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="data.filter(data => !search
        || data.username==search
        || data.name.toLowerCase().includes(search.toLowerCase())
        || data.college.toLowerCase().includes(search.toLowerCase())
        || data.major.toLowerCase().includes(search.toLowerCase())
        || data.classes.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin:12px 0;text-align:center;">
        </el-pagination>
    </div>

    <!-- 新建 -->
    <el-dialog title="新建" :visible.sync="buildNew" width="800px">
      <div id="editDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="选择学院：">
            <el-select v-model="form.college" placeholder="请选择所属学院"  style="width: 100%;"
            @change="getMajorList">
              <el-option   v-for="item in formList.college" :key="item.$index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择专业：">
            <el-select v-model="form.major" placeholder="请选择所属专业"  style="width: 100%;"
            @change="getClassList">
              <el-option   v-for="item in formList.major" :key="item.$index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择班级：">
            <el-select v-model="form.classes" placeholder="请选择所属班级"  style="width: 100%;"
            @change="getStudentList">
              <el-option   v-for="item in formList.classes" :key="item.$index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学号：">
            <el-select v-model="form.username" placeholder="请选择学生学号"  prop="name" style="width: 100%;"
            @change="getStudent">
              <el-option   v-for="item in formList.student" :key="item.$index" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生姓名：">
            <span>{{form.student.name}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buildNew = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">新 建</el-button>
      </div>
    </el-dialog>
    <!-- 新建 -->
    <el-dialog title="批量添加" :visible.sync="EditFlag" width="1500px">
      <div id="Managebox">
        <div  id="search">
          <input type="text"  placeholder="输入关键词" v-model="inputValue">
          <el-button type="primary" @click="search=inputValue">搜索</el-button>
        </div>
        <el-table
        @selection-change="AddSels"
        :data="StudentList.filter(data => !search
        || data.username==search
        || data.name.toLowerCase().includes(search.toLowerCase())
        || data.college.toLowerCase().includes(search.toLowerCase())
        || data.major.toLowerCase().includes(search.toLowerCase())
        || data.classes.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)">
          <el-table-column type="selection" width="65"
            align="center"></el-table-column>
          <el-table-column
            prop="username"
            label="学号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="学生姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="college"
            label="所属学院"
            align="center">
          </el-table-column>
          <el-table-column
            prop="major"
            label="所属专业"
            align="center">
          </el-table-column>
          <el-table-column
            prop="classes"
            label="所属班级"
            align="center">
          </el-table-column>
        </el-table>
        <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="StudentList.filter(data => !search
        || data.username==search
        || data.name.toLowerCase().includes(search.toLowerCase())
        || data.college.toLowerCase().includes(search.toLowerCase())
        || data.major.toLowerCase().includes(search.toLowerCase())
        || data.classes.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin:12px 0;text-align:center;">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFlag = false">取 消</el-button>
        <el-button type="primary" @click="AddMore">批量添加</el-button>
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
          search:'',
          inputValue:'',
          data:[],
          StudentList:[],
          currentPage:1,
          pagesize:9,
          EditFlag:false,
          buildNew:false,
          EditRow:'',
          rules: {
            name: [
              { required: true, message: '请选择学生', trigger: 'blur'},
            ]
          },
          form:{
            college:'',
            major:'',
            classes:'',
            student:{},
            username:''
          },
          formList:{
            college:[],
            major:[],
            classes:[],
            student:[]
          },
          Deletesels: [],
          Addsels:[]
        }
    },
    methods: {
      getInfo(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/authorized'
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.data=data.data;
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


        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/unauthorized'
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.StudentList=data.data;
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
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that=this;
            axios({
              method: 'post',
              url: this.$host+'/user/admin/unauthorized',
              params:{
                username:row.username
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                that.getInfo();
                that.$message({
                  type: 'success',
                  message: '删除成功！'
                });
              }else {
                that.$message({
                  type: 'warning',
                  message: '删除失败！'
                });
              }
            })
            .catch(function (error) {
              that.$message.error('连接失败，请检查网络');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submitForm(formName) {
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: this.$host+'/user/admin/authorized',
              params:{
                username:that.form.student.username
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                that.getInfo();
                that.form=that.resetform();
                that.buildNew = false;
                that.$message({
                  type: 'success',
                  message: '添加成功！'
                });
              }else {
                that.$message({
                  type: 'warning',
                  message: '请选择添加学生'
                });
              }
            })
            .catch(function (error) {
              that.$message.error('连接失败，请检查网络');
            });
          } else {
            that.$message({
              type: 'warning',
              message: '添加失败！'
            });
            return false;
          }
        });
      },
      resetform(){
        let row = {
          college:'',
          major:'',
          classes:'',
          student:{
            username:''
          }
        }
        return row;
      },
      DeleteSels(sels) {
        this.Deletesels = sels;
      },
      DeleteMore(){
        if(this.Deletesels.length>0){
          this.$confirm('此操作将永久删除学生数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var that=this;
            for(var j=0;j<this.Deletesels.length;j++){
              axios({
                method: 'post',
                url: this.$host+'/user/admin/unauthorized',
                params:{
                  username:this.Deletesels[j].username
                }
              })
              .then(response => {
                var data=response.data;
                if(data.code==0){
                  if(j==that.Deletesels.length){
                    that.getInfo();
                    that.$message({
                      type: 'success',
                      message: '删除成功！'
                    });
                  }
                }else if(data.code!=0&&j==that.Deletesels.length) {
                  that.$message({
                    type: 'warning',
                    message: '删除失败！'
                  });
                }
              })
              .catch(function (error) {
                that.$message.error('连接失败，请检查网络');
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message({
            type: 'info',
            message: '请选择要删除的学生'
          });
        }
      },
      AddSels(sels) {
        this.Addsels = sels;
      },
      AddMore(){
        if(this.Addsels.length>0){
          this.$confirm('确定要添加这些学生吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var that=this;
            for(var j=0;j<that.Addsels.length;j++){
              axios({
                method: 'post',
                url: this.$host+'/user/admin/authorized',
                params:{
                  username:that.Addsels[j].username
                }
              })
              .then(response => {
                var data=response.data;
                if(data.code==0){
                  if(j=that.Addsels.length){
                    that.getInfo();
                    that.$message({
                      type: 'success',
                      message: '添加成功！'
                    });
                    that.EditFlag=false;
                  }
                }else if(data.code!=0&&j==that.Addsels.length) {
                  that.$message({
                    type: 'warning',
                    message: '添加失败！'
                  });
                }
              })
              .catch(function (error) {
                that.$message.error('连接失败，请检查网络');
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        }else{
          this.$message({
            type: 'info',
            message: '请选择要添加的学生'
          });
        }
      },
      getCollegeList(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/college'
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.formList.college=data.data;
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
      getMajorList(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/major',
          params:{
            college:this.form.college
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.formList.major=data.data;
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
      getClassList(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/class',
          params:{
            major:this.form.major
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.formList.classes=data.data;
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
      getStudentList(){
        const that=this;
        axios({
          method: 'get',
          url: this.$host+'/user/admin/find/class/unauthorized',
          params:{
            classes:this.form.classes
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.formList.student=data.data;
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
      getStudent(){
        for(var i=0;i<this.formList.student.length;i++){
          if(this.formList.student[i].username==this.form.username){
            this.form.student=this.formList.student[i];
            break;
          }
        }
      }
    },
    mounted:function(){
      this.getInfo();
      this.getCollegeList();
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
#mainbox /deep/ .el-dialog__header{
  text-align: left;
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  color:black;
  font-weight:bold;
}
#editDialog{
  width:80%;
  margin:0 auto;
  text-align: left;
  color:black;
  font-size:16px；
}
</style>
