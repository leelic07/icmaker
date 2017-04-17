<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-12  remind">
                        <div class="col-xs-8">新增银行账户</div>
                        <div class="col-xs-16 col-xs-pull-2">所有选项皆为必填项</div>
                    </div>
                    <div class="col-xs-23 search-inner-box">
                        <div class="col-xs-9">
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>名称 </label>
                                </div>
                                <div class="col-xs-18 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankAccount.bankAccountName'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>银行行号 </label>
                                </div>
                                <div class="col-xs-18 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankAccount.bankNo'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>开户银行 </label>
                                </div>
                                <div class="col-xs-18 select-box">
                                    <select class="form-control" v-model='bankAccount.bankId'>
                                        <option value=''>请选择</option>
                                        <option v-for='bank in banks' :value='bank.id' v-text='bank.bankName'></option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-xs-12 col-xs-offset-1">
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>银行账号 </label>
                                </div>
                                <div class="col-xs-14 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankAccount.bankAccountNo'>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>类型 </label>
                                </div>
                                <div class="col-xs-14 select-box">
                                    <select class="form-control" v-model='bankAccount.isSameBank'>
                                        <option value=''>请选择</option>
                                        <option value='0'>跨行</option>
                                        <option value='1'>同行</option>
                                    </select>
                                </div>
                            </div>

                              <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>公私标识 </label>
                                </div>
                                <div class="col-xs-14 select-box">
                                    <select class="form-control" v-model='bankAccount.isPublic'>
                                        <option value=''>请选择</option>
                                        <option value='0'>对公付款</option>
                                        <option value='1'>对私付款</option>
                                    </select>
                                </div>
                            </div>
                         
                        </div>

                        <div class="col-xs-24">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认修改" class="search-button" @click='modifyConfirm()'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :back='remind.back'></Remind>
        </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'
	export default{
		data(){
			return{
				prisonBankAccountId:this.$route.params.prisonBankAccountId,
				bankAccountId:this.$route.params.bankAccountId,
    			prisonAccountId:this.$route.params.prisonAccountId,
                banks:[],
                bankAccount:''
			}
		},
		computed:{
			remindShow:{
				get(){
					return store.getters.remindShow;
				}
			}
		},
		methods:{
			//获取所有银行
            getBanks(){
                this.$http({
                    method:'get',
                    url:'prisonBankAccount/getBanks'
                }).then(res=>{
                    this.banks = res.data.data;
                    this.getPrisonBankAccounts();
                }).catch(err=>{
                    console.log(err);
                });
            },

            //获取监狱银行账户列表
            getPrisonBankAccounts(){
                this.$http({
                    method:'get',
                    url:'/prisonBankAccount/getPrisonBankAccounts',
                    params:{
                        prisonAccountId:this.prisonAccountId
                    }
                }).then(res=>{
                    // console.log(res.data.data);
                    let bankAccountList = res.data.data;
                    // console.log(bankAccountList);
                    $.each(bankAccountList,(index,value)=>{
                    	if(value.bankAccountId == this.bankAccountId){
                    		this.bankAccount = value;
                    	}
                    });

                }).catch(err=>{
                    console.log(err);
                });
            },

            //点击确认修改银行账户
            modifyConfirm(){
            	let bankAccount =  this.bankAccount;
            	if(this.isNull(bankAccount.bankId,bankAccount.bankNo,bankAccount.bankAccountName,bankAccount.bankAccountNo,bankAccount.isSameBank,bankAccount.isPublic)){
                    this.remind = {
                        status:'warn',
                        msg:'选项不能为空'
                    }
                    store.dispatch('showRemind');
                    return;
                };
            	this.$http({
            		method:'post',
            		url:'/prisonBankAccount/addOrUpdatePrisonBankAccount',
            		params:{
            			bankId:bankAccount.bankId,
            			bankNo:bankAccount.bankNo,
            			bankAccountName:bankAccount.bankAccountName,
            			bankAccountNo:bankAccount.bankAccountNo,
            			isPublic:bankAccount.isPublic,
            			isSameBank:bankAccount.isSameBank,
            			prisonAccountId:this.prisonAccountId,
            			prisonBankAccountId:this.prisonBankAccountId,
            			bankAccountId:this.bankAccountId
            		}
            	}).then(res=>{
            		if(res.data.code == 0){
            			this.remind = {
            				status:'success',
            				msg:res.data.msg,
                            back:true
            			};
            		}else{
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        };
            			console.log(res.data.code,res.data.msg);
            		}
            		store.dispatch('showRemind');
            	}).catch(err=>{
            		console.log(err);
            	});
            }
		},
		components:{
			Remind
		},
		mounted(){
			this.getBanks();
		}
	}
</script>

<style lang="less" scoped>
#right-side{
	
	background-color:#f5f5f5;

	.select-box{
        padding:10px 10px 10px 35px;
    }

    .text-box{
        padding:10px 10px 10px 35px;
    }

    .label-box{
        padding:16px 0 10px 0;
    }

    .search{
    	.search-box{
    		.search-inner-box{
	            background-color:#fff;
	            margin-top:20px;
        	}
    		.remind{
    			margin-bottom:0;
    		}
    	}
    	
	}

	label{
        font-weight:normal;
        color:#414141;
    }

    .form {
        margin-top:25px;
        margin-left:2%;
        thead {
        	tr{
        		background-color:#F2F7F7;
    		}
    	} 
    }

}
</style>