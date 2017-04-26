<template>
    <!-- 导航部分-->
    <div id="nav-bar" class="col-xs-20 col-xs-push-4">
        <div class="col-xs-2">
            <a class="col-xs-24" href="#" @click='$event.preventDefault()'>
                <i class="col-xs-8 col-xs-push-9 glyphicon glyphicon-menu-hamburger"></i>
            </a>
        </div>
        <div class="col-xs-11">
            <!-- <a class="col-xs-2 pull-right" href="">
                <span class="col-xs-15 col-xs-push-9 badge">8</span>
                <i class="col-xs-21 col-xs-push-3 glyphicon glyphicon-bell"></i>
            </a> -->
        </div>
        <div class="col-xs-2">
            <!-- <a class="col-xs-8 col-xs-push-9" href="">
                <span class="col-xs-24 col-xs-push-9 badge">8</span>
                <i class="glyphicon glyphicon-envelope"></i>
            </a> -->
        </div>
        <div class="col-xs-7">
            <!--<i class="pull-left"></i>-->
            <a class="col-xs-10 pull-right" href="#" @click='$event.preventDefault()'>
                <span class="col-xs-24">{{userInfo.roleName}}</span>
                <!--<span class="col-xs-14">{{userInfo.userName}}</span>-->
            </a>
        </div>
        <div class="col-xs-2">
            <a class="col-xs-24" href="#" @click = "loginOut($event)">
                <i class="glyphicon glyphicon-off col-xs-offset-9" ></i>
            </a>
        </div>

    </div>

</template>

<script>
import store from '../store'
	export default {
		data(){
			return {
                userInfo: ""
			}
		},
        methods:{
            getNavInfo() {
                if (this.$route.path != "/login") {
                    this.$http.get('getIndex').then(res=>{
                        // console.log("nav栏");
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.userInfo = res.data.data.user;
                            // console.log(this.userInfo);
                        }
                        
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },

            loginOut(e) {
                e.preventDefault();
                store.dispatch('showLogout');
            }
        },
        mounted(){
            this.getNavInfo();
        }
	}
</script>