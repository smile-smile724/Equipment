<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <div  style="height:25px;"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 20px 40px;font-size:18px;">
      <el-breadcrumb-item :to="{ path: '/student/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备预约</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="height:4px;width:100%;background-color:#4A7FE1;"></div>
    <div id="formBox">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="设备编号"  prop="equipmentId">
          <el-select v-model="form.equipmentId" placeholder="请选择设备编号"  style="width: 100%;"
          @change="getEquipmentName">
            <el-option   v-for="item in tableData" :key="item.$index" :label="item.equipmentId" :value="item.equipmentId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <span>{{form.data.equipmentName}}</span>
        </el-form-item>
        <el-form-item label="借出时间" style="text-align:left;" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择借出时间"
            value-format=" yyyy/MM/dd HH:mm:ss" format="yyyy/MM/dd HH:mm:ss"
            style="width:100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归还时间" style="text-align:left;" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择归还时间"
            value-format=" yyyy/MM/dd HH:mm:ss" format="yyyy/MM/dd HH:mm:ss"
            style="width:100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div id="submit">
        <span style="background-color:#4A7FE1;color:white;" @click="submitForm('form')">提交</span>
        <span style="background-color:white;color:#4A7FE1;" @click="ResetForm">重置</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    data () {
        return {
          form:{
            equipmentId:null,
            data:{},
            username:'',
            startTime:'',
            endTime:''
          },
          rules: {
            equipmentId: [
              { required: true, message: '请输入仪器编号', trigger: 'blur'},
            ],
            startTime: [
              { required: true, message: '请选择借出日期', trigger: 'blur'},
            ],
            endTime: [
              { required: true, message: '请选择归还日期', trigger: 'blur'},
            ]
          },
          tableData:[],
        }
    },
    methods: {
      getInfo(){
        // 设备
        axios({
          method: 'get',
          url: this.$host+'/equipment/find',
          params:{
            equipmentStatus:0
          }
        })
        .then(response => {
          var data=response.data;
          console.log(data)
          if(data.code==0){
            this.tableData=data.data;
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
      ResetForm(){
        let row = {
            equipmentId:null,
            data:{},
            username:this.getCookie('num'),
            startTime:'',
            endTime:''
        };
        this.form=row;
        this.getInfo();
      },
      submitForm(formName){
        const that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: this.$host+'/borrowing/appointment',
              params:{
                equipmentId:this.form.equipmentId,
                username:this.form.username,
                startTime:this.form.startTime,
                endTime:this.form.endTime
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                this.ResetForm();
                that.$message({
                  type: 'success',
                  message: '预约成功'
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
          } else {
            that.$message.error('提交失败');
            return false;
          }
        });
      },
      getEquipmentName(){
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].equipmentId==this.form.equipmentId){
            this.form.data=this.tableData[i];
            break;
          }
        }
      }
    },
    mounted:function(){
      this.getInfo();
      this.form.username = this.getCookie('num');
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
#formBox{
  width:600px;
  margin:70px auto 0 auto;
}
#formBox /deep/ .el-form-item{
  margin:30px 0;
}
#submit{
  width:100%;
  height:38px;
  margin-top:80px;
  text-align: center;
}
#submit span{
  width:120px;
  height:36px;
  display: inline-block;
  line-height:36px;
  margin:0 30px;
  border:1px solid #4A7FE1;
  cursor: pointer;
}
</style>
