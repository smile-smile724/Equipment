<template>
  <div class="top">
    <div id="blue"></div>
    <img src="../assets/logo.png" id="logo">
    <div id="text">
      <p style="font-size:38px;margin:0;letter-spacing:2px">大型仪器设备管理系统</p>
      <p style="font-size:16px;margin:0">Large equipment management system</p>
    </div>
    <div id="user">
      <span>你好，{{username}}</span>
      <span id="btn" @click="LoginOut">退出</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
          username:''
        }
    },
    methods: {
      setHead () {
        this.username = this.getCookie('username');
        if(this.username==undefined||this.username==''){
          alert("请先登录");
          this.$router.push('/');
        }
      },
      LoginOut(){
        const that=this;
        that.setCookie( 'username' ,'',-1);
        that.$router.push('/');
      }
    },
    mounted:function(){
      this.setHead();
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
.top{
  width:100%;
  height:130px;
  position: absolute;
  background-color: white;
  z-index:6;
}
#blue{
  width:100%;
  height:5px;
  background-color: #4A7FE1;
}
#logo{
  width:170px;
  height:170px;
  position:absolute;
  top:-20px;
  left:70px;
}
#text{
  position:absolute;
  top:30px;
  left:240px;
}
#user{
  position: absolute;
  top:15px;
  right:120px;
}
#btn{
  width:70px;
  height:25px;
  display: inline-block;
  line-height: 25px;
  font-size: 15px;
  border:1px solid #4A7FE1;
  color:#2E3C55;
  border-radius: 5px;
  margin-left:10px;
  cursor: pointer;
}
</style>
