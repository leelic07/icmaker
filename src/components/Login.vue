<template>
    <div class="login-box col-xs-24" id="loginManage" v-cloak>
        <h1 class="header col-xs-24">监狱“一卡通”消费管理系统</h1>
        <div class="login-info-box col-xs-6 col-xs-offset-9" id="loginBox">
            <img src="../../static/img/login-logo.png" alt="login-logo" class="login-logo">
            <p class="login-warn col-xs-24" v-show = "isWrong">你输入的用户名或密码错误</p>
            <form class="form-horizontal col-xs-24" role="form">
                <div class="login-input-group col-xs-24">
                    <span class="col-xs-5 login-input-label"><img src="../../static/img/user.png" alt="用户名"></span>
                    <div class="col-xs-19">
                        <input type="text" class="login-input" placeholder="用户名" id="userName" name="userName">
                    </div>
                </div>
                <div class="login-input-group col-xs-24">
                    <span class="col-xs-5 login-input-label"><img src="../../static/img/password.png" alt="密码"></span>
                    <div class="col-xs-19">
                        <input type="password" class="login-input" placeholder="密码" id="password" name="password">
                    </div>
                </div>
                <input type="button" class="login-btn col-xs-24" value="登录" id="loginBtn" @click = "login"/>
            </form>
        </div>
        <div class="footer col-xs-24">
            国科政信科技（北京）股份有限公司
        </div>
    </div>   
</template>
<script>
import store from '../store';
export default {
  name: 'app',
  data () {
    return {
        isWrong :false
    }
  },
  methods:{
    login(){
        let userName = $("#userName").val().replace(/(^\s*)|(\s*$)/g,"");
        let password = $("#password").val().replace(/(^\s*)|(\s*$)/g,"");
        if (userName!=""&&password!="") {
            const loginUrl = "login";
            const loginData = {
                "userName": userName,
                "password": password
            }
            this.$http.post(loginUrl,$.param(loginData)).then(res=>{
                console.log(res.data.code);
                if (res.data.code == 10006) {//用户名或者密码错误
                    this.isWrong = true;
                } else if (res.data.code == 0) {//登陆成功
                    this.isWrong =false;
                    let userId = res.data.data.id;
                    store.state.mutations.userId = userId;
                    //设置cookie
                   // document.cookie = "userId =" +userId;
                   this.$router.push({path:"/examine",query:{userId:userId}});
                }
            }).catch(err=>{
                console.log('新增服务器异常' + err);
            });
        }else {
            alert("请填写完整后再登录");
        }      
    }
  },
  components:{
    
  },
  mounted(){
    
  }
}
</script>
<style>
    html,body,.login-box {
        height: 100%;
    }
</style>