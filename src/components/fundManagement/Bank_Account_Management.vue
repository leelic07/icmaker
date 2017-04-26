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
                                    <input type="text" class="form-control" id="" v-model='bankAccountName'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>银行行号 </label>
                                </div>
                                <div class="col-xs-18 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankNo'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>开户银行 </label>
                                </div>
                                <div class="col-xs-18 select-box">
                                    <select class="form-control" v-model='bankId'>
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
                                    <input type="text" class="form-control" id="" v-model='bankAccountNo'>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name"><em class="important">*</em>类型 </label>
                                </div>
                                <div class="col-xs-14 select-box">
                                    <select class="form-control" v-model='isSameBank'>
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
                                    <select class="form-control" v-model='isPublic'>
                                        <option value=''>请选择</option>
                                        <option value='0'>对公付款</option>
                                        <option value='1'>对私付款</option>
                                    </select>
                                </div>
                            </div>
                         
                        </div>

                        <div class="col-xs-24">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="保存" class="search-button" @click='saveAccount()'>
                            </div>
                        </div>

                        <div class="col-xs-23 form">
                            <table class="display table ic-table" id="table_id_example">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>名称</th>
                                        <th>银行账号</th>
                                        <th>银行行号</th>
                                        <th>开户银行</th>
                                        <th>类型</th>
                                        <th>公私标识</th>
                                        <th colspan="2">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='bal in bankAccountList'>
                                        <td :id='bal.bankAccountId'></td>
                                        <td v-text='bal.bankAccountName'></td>
                                        <td v-text='bal.bankAccountNo'></td>
                                        <td v-text='bal.bankNo'></td>
                                        <td v-if='bal.bankName' v-text='bal.bankName'></td>
                                        <td v-else>{{bal.bankId | bank}}</td>
                                        <td>{{bal.isSameBank | isSameBank}}</td>
                                        <td>{{bal.isPublic | isPublic}}</td>
                                        <td><em class="agree-text" @click='modifyAccount(bal.prisonBankAccountId,bal.bankAccountId)'>修改</em></td>
                                        <td><em class="reject-text" @click='deleteAccount(bal.prisonBankAccountId,bal.bankAccountId)'>删除</em></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!--模态框-->

            <!-- 同意通过审核-->
            <div class="modal modal-confirm" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确定删除？</h3>
                            <button class="confirm-button" @click="deleteConfirm()" data-dismiss='modal'>确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>

            <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'

	export default {
		data(){
			return{
                bankAccountName:'',
                bankAccountNo:'',
                bankNo:'',
                bankId:'',
                prisonBankAccountId:'',
                isSameBank:'',
                isPublic:'',
                banks:[],
                prisonAccountId:'',
                bankAccountList:[]
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
            //保存银行账户
            saveAccount(){
                if(this.isNull(this.bankId,this.bankNo,this.bankAccountName,this.bankAccountNo,this.isSameBank,this.isPublic)){
                    this.remind = {
                        status:'warn',
                        msg:'选项不能为空'
                    }
                    store.dispatch('showRemind');
                    return;
                }else if(!this.isBankAccountNo(this.bankAccountNo)){
                    this.remind = {
                        status:'warn',
                        msg:'银行账号不合法'
                    }
                    store.dispatch('showRemind');
                    return;
                }else if(!this.isBankNo(this.bankNo)){
                    this.remind = {
                        status:'warn',
                        msg:'银行行号不合法'
                    }
                    store.dispatch('showRemind');
                    return;
                }else{
                    let bankAccount = {
                        bankId:this.bankId,
                        bankNo:this.trimAll(this.bankNo),
                        bankAccountName:this.bankAccountName,
                        bankAccountNo:this.trimAll(this.bankAccountNo),
                        isSameBank:this.isSameBank,
                        isPublic:this.isPublic,
                        prisonAccountId:this.prisonAccountId
                    };
                
                    this.$http({
                        method:'post',
                        url:'/prisonBankAccount/addOrUpdatePrisonBankAccount',
                        params:bankAccount
                    }).then(res=>{
                        if(res.data.code == 0){
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            };
                            this.getPrisonBankAccounts();
                            this.bankId = '',
                            this.bankNo = '',
                            this.bankAccountName = '',
                            this.bankAccountNo = '',
                            this.isSameBank = '',
                            this.isPublic = ''
                        }else{
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            };
                        }
                        store.dispatch('showRemind');
                    }).catch(err=>{
                        console.log(err);
                    });
                }      
            },

            //获取所有银行
            getBanks(){
                this.$http({
                    method:'get',
                    url:'prisonBankAccount/getBanks'
                }).then(res=>{
                    this.banks = res.data.data;
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
                    if(res.data.code == 0){
                        this.bankAccountList = res.data.data;
                    }else{
                        console.log(res.data.data);
                    }                   
                }).catch(err=>{
                    console.log(err);
                });
            },

            //点击修改银行账户
            modifyAccount(prisonBankAccountId,bankAccountId){
                this.$router.push({
                    path:'/bank_account_modify' + '/' + bankAccountId + '/' + prisonBankAccountId + '/' + this.prisonAccountId
                });
            },

            //点击删除银行账户
            deleteAccount(prisonBankAccountId,bankAccountId){
                $('#deleteConfirm').modal();
                this.prisonBankAccountId = prisonBankAccountId;
            },

            //点击确定删除
            deleteConfirm(){
                this.$http({
                    method:'post',
                    url:'/prisonBankAccount/deletePrisonBankAccount',
                    params:{
                        'prisonBankAccountId':this.prisonBankAccountId,
                    }
                }).then(res=>{
                    if(res.data.code == 0){
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        };
                        
                        this.getPrisonBankAccounts();
                    }else{
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('error');
                    console.log(err);
                });
            }

        },
        components:{
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getBanks();
            this.getPrisonBankAccounts();
            this.prisonAccountId = this.$route.params.prisonAccountId;
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