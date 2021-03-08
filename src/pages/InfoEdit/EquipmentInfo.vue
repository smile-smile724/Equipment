<template>
      <!-- 主要内容 -->
      <div id="mainbox">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position:absolute;top:130px;z-index:7;left:180px">
          <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备信息管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑设备说明书</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="height:200px"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form" style="width:60%;margin-left:17%">
          <el-form-item label="设备编号：" prop="equipmentId" style="width: 70%;">
            <el-input v-model="form.equipmentId" placeholder="请输入设备编号" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称：" prop="equipmentName" style="width: 70%;">
            <el-input v-model="form.equipmentName" placeholder="请输入设备名称" ></el-input>
          </el-form-item>
          <el-form-item label="设备类型：" >
            <el-select v-model="form.equipmentType" placeholder="请选择设备类型"  style="width: 100%;">
              <el-option label="设备" :value="0"></el-option>
              <el-option label="附件" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称：" style="width: 70%;">
            <el-input v-model="form.departmentName" placeholder="请输入部门名称" ></el-input>
          </el-form-item>
          <el-form-item label="安置地点：" style="width: 70%;">
            <el-input v-model="form.place" placeholder="请输入安置地点" ></el-input>
          </el-form-item>
          <el-form-item label="领用人：" style="width: 70%;">
            <el-input v-model="form.leader" placeholder="请输入领用人" ></el-input>
          </el-form-item>
          <el-form-item label="说明：">
            <textarea placeholder="请输入" v-model="form.equipmentIntroduce"></textarea>
          </el-form-item>
          <el-form-item label="上传图片：">
            <div id="uploadPic" @click="UploadPic = true">
              <img src="../../assets/pic.png" width="100px">
              <span style="display:block;margin-top:-40px">上传图片</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
          </el-form-item>
        </el-form>
        <!-- 上传图片 -->
        <el-dialog title="上传图片" :visible.sync="UploadPic">
          <el-upload
          :action="$host+'/equipment/add/icon'"
          ref="uploadImage"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :class="{hide:hideUploadEdit}"
          :on-change="handleEditChange" >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button @click="UploadPic = false">取 消</el-button>
            <el-button type="primary" @click="UploadPic = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="PicVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    data () {
        return {
          form: {
            equipmentId: '',
            equipmentName	: '',
            equipmentType:0,
            departmentName:'',
            place: '',
            leader: '',
            equipmentIcon:'',
            equipmentIntroduce:''
          },
          rules: {
            equipmentName: [
              { required: true, message: '请输入设备名称', trigger: 'blur'},
            ],
            equipmentId: [
              { required: true, message: '请输入设备编号', trigger: 'blur'},
            ]
          },
          UploadPic:false,
          formLabelWidth: '120px',
          PicVisible: false,
          dialogImageUrl: '',
          hideUploadEdit:false
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.$refs.uploadImage!=undefined){
              this.form.equipmentIcon=this.$refs.uploadImage.uploadFiles[0].response.data;
            }
            axios({
              method: 'post',
              url: this.$host+'/equipment/add',
              params:{
                equipmentId:this.form.equipmentId,
                equipmentName	: this.form.equipmentName,
                equipmentType:this.form.equipmentType,
                departmentName:this.form.departmentName,
                place:this.form.place,
                leader:this.form.leader,
                equipmentIcon:this.form.equipmentIcon,
                equipmentIntroduce:this.form.equipmentIntroduce
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                this.form=this.resetform();
                this.$message({
                  type: 'success',
                  message: '发布成功！'
                });
              }else {
                this.$message({
                  type: 'warning',
                  message:'发布失败！'
                });
              }
            })
            .catch(function (error) {
              this.$message.error('连接失败，请检查网络');
            });
          } else {
            this.$message({
              type: 'warning',
              message: '发布失败'
            });
            return false;
          }
        });
      },
      handleEditChange() {
        if(this.$refs.uploadImage.uploadFiles.length>=1){
          this.hideUploadEdit = true;
        }else{
          this.hideUploadEdit = false;
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.hideUploadEdit = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.PicVisible = true;
      },
      // 图片文件转格式
      getFile(file,i) {
        var that=this;
        this.getBase64(file.raw).then(res => {
          // let badegeImg = res.split(',');
          that.form.ImageList[i]=res;
        });
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      resetform(){
        let row = {
            equipmentId: '',
            equipmentName	: '',
            equipmentType:0,
            departmentName:'',
            place: '',
            leader: '',
            equipmentIcon:'',
            equipmentIntroduce:''
        }
        return row;
      }
    },
    mounted:function(){
    },
    watch:{
    }
}


</script>

<style scoped>
#mainbox{
  height:100%;
  margin:0 120px 0 290px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 5px #bebebe ;
}
textarea{
  width:100%;
  height:100px;
  border:1px solid #e6e4e4;
  outline: none;
  border-radius: 4px;
  resize:none;
  text-indent: 13px;
  font-size: 15px;
  padding:15px 1px 4px 1px;
}
#uploadPic{
  width:150px;
  height:140px;
  background-color: #F5F5F5;
  cursor: pointer;
}
#mainbox /deep/ .el-dialog__header{
  text-align: left;
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  color:black;
  font-weight:bold;
}
#mainbox /deep/ .hide .el-upload--picture-card {
  display: none;
}
</style>
