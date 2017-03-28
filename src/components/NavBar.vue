<template>
<!-- 导航部分-->
    <div id="nav-bar" class="col-xs-20 col-xs-push-4">
        <div class="col-xs-2">
            <a class="col-xs-24" href="#">
                <i class="col-xs-8 col-xs-push-9 glyphicon glyphicon-menu-hamburger"></i>
            </a>
        </div>
        <div class="col-xs-13">
            <a class="col-xs-2 pull-right" href="#">
                <span class="col-xs-15 col-xs-push-9 badge">8</span>
                <i class="col-xs-21 col-xs-push-3 glyphicon glyphicon-bell"></i>
            </a>
        </div>
        <div class="col-xs-2">
            <a class="col-xs-8 col-xs-push-9" href="#">
                <span class="col-xs-24 col-xs-push-9 badge">8</span>
                <i class="glyphicon glyphicon-envelope"></i>
            </a>
        </div>
        <div class="col-xs-5">
            <i class="pull-left"></i>
            <a class="col-xs-16 pull-right" href="#">
                <span class="col-xs-18">超级管理员</span>
                <p class="col-xs-6">
                    <i class="col-xs-5"></i>
                </p>
            </a>
        </div>
        <div class="col-xs-2">
            <a class="col-xs-8 col-xs-push-8" href="#">
                <i class="glyphicon glyphicon-off" @click = "loginOut"></i>
            </a>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
        methods:{
            loginOut() {
                this.$http.post("/logout").then(res=>{
                    console.log(res.data.code);
                    if (res.data.code == 0) {//登出成功
                        this.$router.push({path:"/login"});
                    }
                }).catch(err=>{
                    console.log('登出服务器异常' + err);
                });
            }
        }
	}
</script>