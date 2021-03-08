<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div  style="height:30px;"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 15px 40px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
    <div id="Managebox">
      <ul id="PagesSelect">
        <li :class="{'SelectPage':PagesIndex==0,'unSelectPage':PagesIndex!=0}" @click="PagesIndex=0">设备</li>
        <li :class="{'SelectPage':PagesIndex==1,'unSelectPage':PagesIndex!=1}" @click="PagesIndex=1">附件</li>
        <li :class="{'SelectPage':PagesIndex==2,'unSelectPage':PagesIndex!=2}" @click="PagesIndex=2">其他</li>
      </ul>
      <div  id="search">
        <input type="text"  placeholder="输入关键词" v-model="inputValue">
        <el-button type="primary" @click="search=inputValue">搜索</el-button>
        <el-button type="primary" @click="buildNew=true">新建
          <i style="width:4px;height:4px;border-radius:50%;background-color:white;display: inline-block;float:left;margin:6px 3px 6px 0;"></i>
        </el-button>
      </div>
      <el-table
      :data="data.filter(data => !search
        || data.equipmentId==search
        || data.equipmentName.toLowerCase().includes(search.toLowerCase())
        || data.manufacturer.toLowerCase().includes(search.toLowerCase())
        || data.countries.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)">
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
          prop="equipmentModel"
          label="型号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="countries"
          label="国别"
          align="center">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂家"
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
        <el-table-column
        label="编辑"
        align="center">
          <template slot-scope="scope">
            <span style="color:#77ADFF;cursor: pointer;"
            @click="handleEdit(scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="data.filter(data => !search
        || data.equipmentId==search
        || data.equipmentName.toLowerCase().includes(search.toLowerCase())
        || data.manufacturer.toLowerCase().includes(search.toLowerCase())
        || data.countries.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin:12px 0;text-align:center;">
        </el-pagination>
    </div>

    <!-- 新建 -->
    <el-dialog title="新建" :visible.sync="buildNew" width="800px">
      <div id="editDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="设备编号：" prop="equipmentId"  style="width: 100%;">
            <el-input v-model="form.equipmentId" placeholder="请输入设备编号" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：" prop="equipmentName"  style="width: 100%;">
            <el-input v-model="form.equipmentName" placeholder="请输入设备名称" ></el-input>
          </el-form-item>
          <el-form-item label="设备类型：" prop="equipmentType" >
            <el-select v-model="form.equipmentType" placeholder="请选择设备类型"  style="width: 100%;">
              <el-option label="设备" :value="0"></el-option>
              <el-option label="附件" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="型号：" style="width: 100%;">
            <el-input v-model="form.equipmentModel" placeholder="请输入型号" ></el-input>
          </el-form-item>
          <el-form-item label="生产厂家：" style="width: 100%;">
            <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" ></el-input>
          </el-form-item>
          <el-form-item label="国别：" style="width: 100%;">
            <el-input v-model="form.countries" placeholder="请输入国别" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buildNew = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">新 建</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="EditFlag"  width="800px">
      <div id="editDialog">
        <el-form ref="form" :model="EditRow" :rules="rules" label-width="100px">
          <el-form-item label="设备编号：" prop="equipmentId"  style="width: 100%;">
            <el-input v-model="EditRow.equipmentId" placeholder="请输入设备编号" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：" prop="equipmentName"  style="width: 100%;">
            <el-input v-model="EditRow.equipmentName" placeholder="请输入设备名称" ></el-input>
          </el-form-item>
          <el-form-item label="型号：" style="width: 100%;">
            <el-input v-model="EditRow.equipmentModel" placeholder="请输入型号" ></el-input>
          </el-form-item>
          <el-form-item label="生产厂家：" style="width: 100%;">
            <el-input v-model="EditRow.manufacturer" placeholder="请输入生产厂家" ></el-input>
          </el-form-item>
          <el-form-item label="国别：" style="width: 100%;">
            <el-input v-model="EditRow.countries" placeholder="请输入国别" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFlag = false">取 消</el-button>
        <el-button type="primary" @click="Edit">保 存</el-button>
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
          PagesIndex:0,
          search:'',
          inputValue:'',
          data:[],
          currentPage:1,
          pagesize:9,
          EditFlag:false,
          buildNew:false,
          EditRow:'',
          form:{
            equipmentId: '',
            equipmentName	: '',
            equipmentModel:'',
            countries:'',
            manufacturer:'',
            equipmentType:0
          },
          rules: {
            equipmentName: [
              { required: true, message: '请输入设备名称', trigger: 'blur'},
            ],
            equipmentId: [
              { required: true, message: '请输入设备编号', trigger: 'blur'},
            ],
            equipmentType: [
              { required: true, message: '请输入设备类型', trigger: 'blur'},
            ]
          }
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
      handleCurrentChange(val){
		    this.currentPage = val;
      },
      handleDelete(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
              this.getInfo();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(row){
        this.EditRow=row;
        this.EditFlag=true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: this.$host+'/equipment/add',
              params:{
                equipmentId:this.form.equipmentId,
                equipmentName:this.form.equipmentName,
                equipmentModel:this.form.equipmentModel,
                manufacturer:this.form.manufacturer,
                countries:this.form.countries,
                equipmentType:this.form.equipmentType,
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                this.getInfo();
                this.form=this.resetform();
                this.$message({
                  type: 'success',
                  message: '新建成功'
                });
              }else {
                this.$message({
                  type: 'warning',
                  message: '新建失败'
                });
              }
            })
            .catch(function (error) {
              this.$message.error('连接失败，请检查网络');
            });
          } else {
            this.$message({
              type: 'warning',
              message: '新建失败'
            });
            return false;
          }
        });
      },
      Edit(){
        axios({
          method: 'post',
          url: this.$host+'/equipment/update',
          params:{
            equipmentId:this.EditRow.equipmentId,
            equipmentName:this.EditRow.equipmentName,
            equipmentModel:this.EditRow.equipmentModel,
            manufacturer:this.EditRow.manufacturer,
            countries:this.EditRow.countries,
            equipmentType:this.EditRow.equipmentType,
            departmentName:this.EditRow.departmentName,
            place:this.EditRow.place,
            leader:this.EditRow.leader,
            factoryNumber:this.EditRow.factoryNumber,
            equipmentIcon:this.EditRow.equipmentIcon,
            equipmentIntroduce:this.EditRow.equipmentIntroduce
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            this.getInfo();
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
        this.EditFlag = false;
      },
      resetform(){
        let row = {
            equipmentId: '',
            equipmentName	: '',
            equipmentModel:'',
            countries:'',
            manufacturer:'',
            equipmentType:0
        }
        return row;
      }
    },
    mounted:function(){
      this.getInfo();
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
#mainbox {
  width: 100%;
  height:100%;
  position: relative;
}
#Managebox{
  margin:0 80px;
  text-align: left;
}
#PagesSelect{
  width:330px;
  height:32px;
  border:1px solid #4A7FE1;
  margin-top:35px;
  padding:0;
  display: inline-block;
  text-align: center;
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
#search{
  height:38px;
  position: absolute;
  top:101px;
  left:470px;
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
