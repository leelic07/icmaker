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
                                    <label class="pull-right" for="name">名称 </label>
                                </div>
                                <div class="col-xs-18 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankAccountName'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name">银行行号 </label>
                                </div>
                                <div class="col-xs-18 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankNo'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name">开户银行 </label>
                                </div>
                                <div class="col-xs-18 select-box">
                                    <select class="form-control" v-model='bankId'>
                                        <option v-for='bank in banks' :value='bank.id' v-text='bank.bankName'></option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-xs-6 label-box">
                                    <label class="pull-right" for="name">公私标识 </label>
                                </div>
                                <div class="col-xs-18 select-box">
                                    <select class="form-control" v-model='isPublic'>
                                        <option value='0'>对公付款</option>
                                        <option value='1'>对私付款</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-xs-offset-1">
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name">银行账号 </label>
                                </div>
                                <div class="col-xs-14 text-box">
                                    <input type="text" class="form-control" id="" v-model='bankAccountNo'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name">开户名 </label>
                                </div>
                                <div class="col-xs-14 text-box">
                                    <input type="text" class="form-control" id="">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-5 label-box">
                                    <label class="pull-right" for="name">类型 </label>
                                </div>
                                <div class="col-xs-14 select-box">
                                    <select class="form-control" v-model='isSameBank'>
                                        <option value='0'>跨行</option>
                                        <option value='1'>同行</option>
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
                                        <th>名称</th>
                                        <th>银行账号</th>
                                        <th>银行行号</th>
                                        <th>开户名</th>
                                        <th>开户银行</th>
                                        <th>类型</th>
                                        <th>同域异地</th>
                                        <th>转账方式</th>
                                        <th>公私标识</th>
                                        <th colspan="2">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='bal in bankAccountList'>
                                        <td>bal.bankAccountName</td>
                                        <td>430700001243</td>
                                        <td>084343208434</td>
                                        <td>Tanmay</td>
                                        <td>建设银行</td>
                                        <td></td>
                                        <td></td>
                                        <td>跨行</td>
                                        <td>对公付款</td>
                                        <td><em class="agree-text">修改</em></td>
                                        <td><em class="reject-text">删除</em></td>
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
	export default {
		data(){
			return {
                bankAccountName:'',
                bankAccountNo:'',
                bankNo:'',
                bankId:1,
                prisonBankAccountId:'',
                isSameBank:0,
                isPublic:0,
                prisonAccountId:'',
                banks:[],
                prisonAccountId:this.$route.params.prisonAccountId,
                bankAccountList:[]
			}
		},
        methods:{
            //保存银行账户
            saveAccount(){

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
                    this.bankAccountList = res.data.data;
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        mounted(){
            $('#table_id_example').tableHover();
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