<template>
	<!--模态框-->

    <!-- 删除确认框-->
    <div class="modal modal-confirm" id="loginOutConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                        &times;
                    </button>
                </div>
                <div class="modal-body">
                    <h3>确定退出登录?</h3>
                    <button class="confirm-button" data-dismiss="modal" @click = "loginOutConfirm()">确定</button>
                    <button class="cancel-button" data-dismiss="modal">取消</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import store from '../store'
	export default{
		data(){
			return{

			}
		},
		methods:{
			//点击确定退出
            loginOutConfirm(){
                this.$http.post("/logout").then(res=>{
                    console.log(res.data.code);
                    if (res.data.code == 0) {//登出成功
                        window.localStorage.setItem('userId','');  
                        this.$router.push({path:"/login"});
                    }
                }).catch(err=>{
                    console.log('登出服务器异常' + err);
                });
            },

            //模态框消失时执行的方法
			logOutConfirmDestroy(){
				$('#loginOutConfirm').on('hidden.bs.modal',()=>{
					store.dispatch('hideLogout');
				});
			}
		},
		mounted(){
			$('#loginOutConfirm').modal();
			this.logOutConfirmDestroy();
		}
	}
</script>