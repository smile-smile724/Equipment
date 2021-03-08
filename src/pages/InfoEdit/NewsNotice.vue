<template>
  <div class="box">
      <div style="height:155px;"></div>
      <!-- 主要内容 -->
      <div id="mainbox">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="position:absolute;top:130px;z-index:7;left:180px">
          <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备信息管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑通知信息</el-breadcrumb-item>
        </el-breadcrumb>
        <input type="text" placeholder="请填写标题" v-model="data.noticeName">
        <textarea placeholder="请输入正文" :style="'height:'+(screenHeight-354)+'px;'" v-model="data.noticeContent"></textarea>
        <div id="submit">
          <!-- 上传图片 -->
          <div @click="UploadPic = true">
            <i class="el-icon-picture-outline-round"></i>
            <span>图片</span>
          </div>
          <span id="line"></span>
          <!-- 上传图片 -->
          <div @click="UploadLinks">
            <i class="el-icon-link"></i>
            <span>链接</span>
          </div>
          <span id="line"></span>
          <!-- 上传图片 -->
          <div @click="UploadVideo = true">
            <i class="el-icon-video-camera-solid"></i>
            <span>视频</span>
          </div>
          <span id="line"></span>
          <el-button type="primary" style="width:90px;float:right;margin:8px 30px;" @click="submit">发表</el-button>
        </div>
      </div>
      <!-- 弹框 -->
      <el-dialog title="上传图片" :visible.sync="UploadPic">
        <el-upload
        :action="$host+'/notice/send'"
        ref="uploadImage"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
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
        <!-- 上传视频 -->
      <el-dialog title="上传视频" :visible.sync="UploadVideo">
        <el-upload
        :action="$host+'/notice/send'"
        ref="uploadVideo"
        v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
        v-bind:on-progress="uploadVideoProcess"
        v-bind:on-success="handleVideoSuccess"
        v-bind:before-upload="beforeUploadVideo"
        v-bind:show-file-list="false">
          <video v-if="data.noticeVideo !='' && !videoFlag"
          v-bind:src="$host+data.noticeVideo"
          class="avatar video-avatar"
          controls="controls"
          width="80%;">
            您的浏览器不支持视频播放
          </video>
          <i v-else-if="data.noticeVideo =='' && !videoFlag"
          class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress v-if="videoFlag == true"
          type="circle"
          v-bind:percentage="videoUploadPercent"
          style="margin-top:7px;"></el-progress>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="UploadVideo  = false">取 消</el-button>
          <el-button type="primary" @click="UploadVideo = false">确 定</el-button>
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
          screenHeight:'',
          data:{
            noticeName:'',
            noticeContent:'',
            publisher:'',
            noticeIcon:[],
            noticeUrl:'',
            noticeVideo:''
          },
          UploadPic:false,
          UploadVideo:false,
          formLabelWidth: '120px',
          PicVisible: false,
          dialogImageUrl: '',
          videoFlag: false,
          //是否显示进度条
          videoUploadPercent: "",
          //进度条的进度，
          isShowUploadVideo: false,
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.PicVisible = true;
      },
      submit(){
        var ImgStr='';
        if(this.$refs.uploadImage!=undefined){
          for(var i=0;i<this.$refs.uploadImage.uploadFiles.length;i++){
            this.data.noticeIcon.push(this.$refs.uploadImage.uploadFiles[i].response.data);
            ImgStr=ImgStr+this.$refs.uploadImage.uploadFiles[i].response.data;
            if(i<this.$refs.uploadImage.uploadFiles.length){
              ImgStr=ImgStr+',';
            }
          }
        }
        if(this.$refs.uploadVideo!=undefined){
          this.data.noticeVideo=this.$refs.uploadVideo.uploadFiles[0].response.data;
        }
        var that=this;
        axios({
          method: 'post',
          url: this.$host+'/notice/admin/add',
          params:{
            noticeName:this.data.noticeName,
            noticeContent:this.data.noticeContent,
            publisher:this.data.publisher,
            noticeIcon:ImgStr,
            noticeUrl:this.data.noticeUrl,
            noticeVideo:this.data.noticeVideo
          }
        })
        .then(response => {
          var data=response.data;
          if(data.code==0){
            that.$message({
              type: 'success',
              message: '发布成功！'
            });
            that.$router.push('/InfoEdit/NewsNotice');
          }else {
            that.$message({
              type: 'warning',
              message: '发布失败！'
            });
          }
        })
        .catch(function (error) {
          that.$message.error('连接失败，请检查网络');
        });
        console.log(this.data);
      },
      getFile(file,i) {
        var that=this;
        this.getBase64(file.raw).then(res => {
          // let badegeImg = res.split(',');
          that.data.noticeIcon[i]=res;
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
      UploadLinks() {
        var that=this;
        this.$prompt('请输入链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
          inputErrorMessage: '链接格式不正确'
        }).then(({ value }) => {
          that.data.noticeUrl=value;
          this.$message({
            type: 'success',
            message: '链接: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      //上传前回调
      beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 50;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
          this.$message.error("请上传正确的视频格式");
          return false;
        }
        if (!fileSize) {
          this.$message.error("视频大小不能超过50MB");
          return false;
        }
        this.isShowUploadVideo = false;
      },
      //进度条
      uploadVideoProcess(event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },
      //上传成功回调
      handleVideoSuccess(res, file) {
        this.isShowUploadVideo = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        if (res.code == 0) {
          this.data.noticeVideo = res.data;
        } else {
          this.$message.error('上传失败！');
          }
      }
    },
    mounted:function(){
      const that = this;
      // 监听窗口高度
      that.screenHeight = document.body.scrollHeight;
      window.onresize = () => {
        return (() => {
      that.screenHeight = document.body.scrollHeight;
        })()
      }
      // 获取用户名
      this.data.publisher = this.getCookie('username');
    },
    watch:{
      screenHeight(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenHeight = val
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
                console.log(that.screenHeight)
                that.timer = false
            },400)
        }
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
  margin:0 120px 0 290px;
}
input{
  width:100%;
  height:35px;
  margin-top:40px;
  border:1px solid #707070;
  outline: none;
  border-radius: 4px;
  text-indent: 30px;
  font-size: 15px;
  color:black;
}
textarea{
  width: 100%;
  margin-top: 40px;
  border:1px solid #707070;
  outline: none;
  border-radius: 4px 4px 0 0;
  resize:none;
  text-indent: 28px;
  font-size: 15px;
  padding:15px 1px 4px 1px;
}
#submit{
  width:100%;
  height:56px;
  margin-top:-5px;
  border:1px solid #707070;
  background-color: #F5F5F5;
  padding:1px;
  text-align: left;
}
#submit div{
  width:150px;
  height:100%;
  font-size:25px;
  line-height:56px;
  text-align: center;
  float: left;
  cursor: pointer;
}
#submit div span{
  font-size:18px;
  float: right;
  margin-right:30px
}
#line{
  width:2px;
  height:40px;
  margin:8px 0;
  float: left;
  background-color: #707070;
}
.box /deep/ .el-dialog__header{
  text-align: left;
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  color:black;
  font-weight:bold;
}
</style>
