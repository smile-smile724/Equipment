<template>
  <div class="main">
    <div id="login_bg">
      <img src="../assets/login_bg.jpg">
    </div>
    <div id="mainbox">
      <div id="opacity"></div>
      <div id="picture"><img src="../assets/logo.png" width="120px" height="120px"></div>
      <span>大型仪器设备管理系统</span>
      <div id="user">
        <input id="name" type="text" placeholder="用户名" v-model="user.username">
        <input type="password" placeholder="密码" v-model="user.password">
        <img src="../assets/username.png" id="username">
        <img src="../assets/password.png" id="password">
        <div v-show="loginFlag" id="warning">
          <img src="../assets/warning.png">
          <span>密码或用户名错误</span>
        </div>
        <div id="identity">
          <label><input name="teacher" type="radio"  v-model="user.identity" value="admin" />管理员</label>
          <label><input name="student" type="radio"  v-model="user.identity" value="user" />用户</label>
        </div>
        <button id="button" @click="Login()">登录</button>
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
            user:{
                username:"",
                password:"",
                identity:''
            },
            loginFlag:false,
        }
    },
    methods: {
        adminLogin(){
            const that=this;
            that.loginFlag=false;
            axios({
              method: 'post',
              url: this.$host+'/user/admin/login',
              params: {
                username: that.user.username,
                password: that.user.password
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                that.setCookie( 'username' ,data.data.name,365 * 24 * 60 * 60 * 1000);
                that.setCookie( 'num' ,data.data.username,365 * 24 * 60 * 60 * 1000);
                that.$router.push('/teacher/index');
              }else {
                that.$message({
                  type: 'warning',
                  message: data.msg
                });
                that.loginFlag=true;
              }
            })
            .catch(function (error) {
                that.$message.error('连接失败，请检查网络');
            });
        },
        studentLogin(){
            const that=this;
            that.loginFlag=false;
            axios({
              method: 'post',
              url: this.$host+'/user/student/login',
              params: {
                username: that.user.username,
                password: that.user.password
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                that.setCookie( 'username' ,data.data.name,365 * 24 * 60 * 60 * 1000);
                that.setCookie( 'num' ,data.data.username,365 * 24 * 60 * 60 * 1000);
                that.$router.push('/student/index');
              }else {
                that.$message({
                  type: 'warning',
                  message: data.msg
                });
                that.loginFlag=true;
              }
            })
            .catch(function (error) {
                that.$message.error('连接失败，请检查网络');
            });
        },
        teacherLogin(){
            const that=this;
            that.loginFlag=false;
            axios({
              method: 'post',
              url: this.$host+'/user/teacher/login',
              params: {
                username: that.user.username,
                password: that.user.password
              }
            })
            .then(response => {
              var data=response.data;
              if(data.code==0){
                that.setCookie( 'username' ,data.data.name,365 * 24 * 60 * 60 * 1000);
                that.setCookie( 'num' ,data.data.username,365 * 24 * 60 * 60 * 1000);
                that.$router.push('/student/index');
              }else {
                that.$message({
                  type: 'warning',
                  message: data.msg
                });
                that.loginFlag=true;
              }
            })
            .catch(function (error) {
                that.$message.error('连接失败，请检查网络');
            });
        },
        Login(){
          if(this.user.identity=='admin'){
            this.adminLogin();
          }else if(this.user.identity=='user'){
            if(this.user.username.length==8){
              this.teacherLogin();
            }else if(this.user.username.length==9){
              this.studentLogin();
            }else{
              this.$message({
              type: 'warning',
              message: '请输入正确的账号'
            });
            }
          }else{
            this.$message({
              type: 'warning',
              message: '请选择你的身份'
            });
          }
        }
    }
}

</script>

<style scoped>
a{
    text-decoration: none;
}
.main{
    width: 100%;
    height:100%;
    min-height:700px;
    margin:0;
    position: relative;
}
#login_bg{
  width: 100%;
  height:100%;
  position: relative;
}
#login_bg img{
  display:block;
  width:100%;
  height:100%;
}
#mainbox{
  width:600px;
  height:450px;
  position:absolute;
  top:150px;
  left:50%;
  margin-left:-303px;
  border:#3151BF 3px solid;
  border-radius: 29px;
  text-align: center;
}
#opacity{
  width:600px;
  height:450px;
  background-color: #FFFFFF;
  opacity: 0.5;
  border-radius: 29px;
}
#picture{
  position:absolute;
  margin-left:90px;
  top:0;
}
span{
  height:50px;
  line-height: 50px;
  position:absolute;
  color:#002771;
  font-size: 28px;
  top:38px;
  left:220px;
}
#user{
  width:550px;
  height:300px;
  position:absolute;
  top:120px;
  left:50%;
  margin-left:-275px;
  border:#3151BF 1px solid;
  background-color: #FFFFFF;
  border-radius: 15px;
}
input{
  width:480px;
  height:60px;
  background-color:rgb(232, 240, 254);
  outline: none;
  border:none;
  border-radius: 10px;
  text-indent: 80px;
  font-size: 20px;
  color:#BCBBBA;
}
#name{
  margin:25px 0 20px 0;
}
#username,#password{
  position: absolute;
  z-index:10;
}
#username{
  width:90px;
  height:90px;
  top:17px;
  left:32px;
}
#password{
  width:70px;
  height:70px;
  top:108px;
  left:42px;
}
#warning{
  z-index:9;
  width:190px;
  position: absolute;
  top:160px;
  left:165px;
  text-align: left;
}
#warning img{
  width:50px;
  height:50px;
  margin-left:0;
}
#warning span{
  width:150px;
  height:50px;
  font-size: 18px;
  line-height: 50px;
  position: absolute;
  color:#FF3131;
  top:0;
  left:40px;
}
#identity{
  width:550px;
  position: absolute;
  top:192px;
  z-index:11;
}
#identity input{
  -webkit-appearance: none;
  width:20px;
  height:20px;
  padding:0;
  background-color: #F3F1F1;
  border: 3px solid #3151BF;
  border-radius: 0;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
  margin-top:5px;
}
#identity input:checked{
  background-color:rgb(107, 126, 189);
  border: 3px solid #3151BF;
}
#identity label{
  font-size: 22px;
  color:#3151BF;
  display:inline-flex;
  flex-direction:row;
  align-items:center;
  margin:0 80px 0 80px;
  cursor: pointer;
}
#button{
  width:480px;
  height:55px;
  position: absolute;
  top: 230px;
  left:50%;
  margin-left:-240px;
  color: rgba(255, 255, 255, 255);
  background-color: #3151BF;
  border-radius: 10px;
  font-size: 25px;
  line-height: 55px;
  text-align: center;
  padding:0;
  border:0;
  cursor: pointer;
}
</style>
