<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">账户类型</label>
                                <select class="form-control" v-model='accountType'>
                                    <option value=''>请选择</option>
                                    <option value='0'>财务账户</option>
                                    <option value='1'>商户账户</option>
                                    <option value='2'>监狱总账户</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">账户名</label>
                                <input type="" name="" class='form-control' v-model='accountName'>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click='searchAccount()'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                            <tr>
                                <th></th>
                                <th>所属监狱</th>
                                <th>账户名</th>
                                <th>账户类型</th>
                                <th>账户余额</th>
                                <th colspan="2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='pad in prisonAccountDtos'>
                                <td></td>
                                <td v-text='pad.prisonName'></td>
                                <td v-text='pad.accountName'></td>
                                <td>{{pad.accountType | accountType}}</td>
                                <td>{{pad.total | currency}}</td>
                                <td><em class="agree-text" @click='transferApplication(pad.prisonAccountId,pad.total)'>申请转账</em></td>
                                <td><em class="agree-text" @click='innerTransfer(pad.prisonAccountId,pad.total)'>内部转账</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchAccount'></Page>
            </div>

            <!-- 模态框-->

            <!--设置犯罪限额 -->
            <div class="modal modal-confirm modal-bind" id="transferApplication" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>申请转账</h3>
                            <div class="clearfix bind-info">
                                <ul class="pull-left clearfix bind-info-list">
                                    <li class="clearfix">
                                        <span class="col-xs-12 pull-left info-label text-left">当前余额</span>
                                        <span class="col-xs-12 pull-right text-left" >{{money | currency}}</span>
                                    </li>

                                    <li class="clearfix" v-show='bankShow'>
                                        <span class="col-xs-12 pull-left info-label text-left">所属银行</span>
                                        <span class="col-xs-12 pull-right">
                                            <select class="form-control" v-model='bankId'>
                                                <option value=''>请选择</option>
                                                <option v-for='bank in banks' :value='bank.id' v-text='bank.bankName'></option>
                                            </select>
                                        </span>
                                    </li>

                                    <li class="clearfix">
                                        <span class="col-xs-12 pull-left info-label text-left">账户名称</span>
                                        <span class="col-xs-12 pull-right">
                                            <select class="form-control" v-model='bankAccountId' v-show='bankShow'>
                                                <option value=''>请选择</option>
                                                <option v-for='pbad in prisonBankAccountDtos' :value='pbad.bankAccountId' v-text='pbad.bankAccountName'></option>
                                            </select>
                                            <select class="form-control" v-model='toPrisonAccountId' v-if='!bankShow'>
                                                <option value=''>请选择</option>
                                                <option v-for='pa in prisonAccounts' :value='pa.id' v-text='pa.accountName'></option>
                                            </select>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xs-24">
                                <input type="text" class="form-control fee-input" id="" placeholder="输入转出金额" v-model='transferMoney'>
                                <input type="text" class="form-control" id="" placeholder="备注" v-model='remark'>
                            </div>
                            <button class="confirm-button" @click='saveTransfer(type,prisonAccountId)'>保存</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
            <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
import Page from '../Paginator.vue'
import Remind from '../Remind.vue'
import store from '../../store'
	export default {
		data(){
			return {
                pageSize:20,
                indexPage:1,
                menuSize:'',
                prisonAccountDtos:[],
                accountType:'',
                accountName:'',
                banks:[],
                prisonBankAccountDtos:[],
                bankId:'',
                bankAccountId:'',
                toPrisonAccountId:'',
                money:'',
                prisonAccounts:[],
                bankShow:true,
                type:'',
                transferMoney:'',
                remark:''
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
            //获取监狱账户信息
            getPrisonAccountDtos(){
                this.$http({
                    method:'get',
                    url:'/prisonAccount/getPrisonAccountDtos',
                    params:{
                        indexPage:1,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    this.prisonAccountDtos = res.data.data.prisonAccountDtos;
                    this.menuSize = this.prisonAccountDtos.length;
                }).catch(err=>{
                    console.log(err);
                });
            },
            //点击搜索获取账户列表
            searchAccount(index){
                this.indexPage = index;
                this.$http({
                    method:'get',
                    url:'/prisonAccount/getPrisonAccountDtos',
                    params:{
                        accountType:this.accountType,
                        accountName:this.accountName,
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    this.prisonAccountDtos = res.data.data.prisonAccountDtos;
                }).catch(err=>{
                    console.log(err);
                })
            },
            //点击申请转账初始化数据
            transferApplication(prisonAccountId,money){
                this.bankId = '';
                this.bankAccountId = '';
                this.type = 5;
                this.prisonAccountId = prisonAccountId;
                this.transferMoney = '';
                this.remark = '';
                this.$http({
                    method:'get',
                    url:'/prisonCapital/getPrisonBankAccouns',
                    params:{
                        'prisonAccountId':this.prisonAccountId,
                        type:this.type
                    }
                }).then(res=>{
                    this.banks = res.data.data.banks;
                    this.prisonBankAccountDtos = res.data.data.prisonBankAccountDtos;
                    this.money = money;
                    this.bankShow = true;
                }).catch(err=>{
                    console.log(err);
                });
                $('#transferApplication').modal();
            },
            //点击内部转账初始化数据
            innerTransfer(prisonAccountId,money){
                this.toPrisonAccountId = '';
                this.type = 4;
                this.prisonAccountId = prisonAccountId;
                this.transferMoney = '';
                this.remark = '';
                this.$http({
                    method:'get',
                    url:'/prisonCapital/getPrisonBankAccouns',
                    params:{
                        'prisonAccountId':this.prisonAccountId,
                        type:this.type
                    }
                }).then(res=>{
                    this.prisonAccounts = res.data.data.prisonAccounts;
                    this.money = money;
                    this.bankShow = false;
                }).catch(err=>{
                    console.log(err);
                });
                $('#transferApplication').modal();
            },

            //点击保存提交转账申请
            saveTransfer(type,prisonAccountId){
                if(type == '' || prisonAccountId == '' || this.transferMoney == ''){
                    return;
                }
                //内部转账
                if(type == 4){
                    if(this.toPrisonAccountId == ''){
                        return;
                    }
                    this.$http({
                        method:'post',
                        url:'/prisonCapital/addCapitalTransfer',
                        params:{
                            'type':type,
                            'prisonAccountId':prisonAccountId,
                            toPrisonAccountId:this.toPrisonAccountId,
                            money:this.transferMoney * 100,
                            remark:this.remark
                        }
                    }).then(res=>{    
                        if(res.data.code == 0){
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                        }else{
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            }
                            console.log(res.data.code,res.data.msg);
                        }

                        store.dispatch('showRemind');
                    }).catch(err=>{
                        console.log(err);
                    });
                }else if(type == 5){
                    if(this.bankId == '' || this.bankAccountId == ''){
                        return;
                    }
                    this.$http({
                        method:'post',
                        url:'/prisonCapital/addCapitalTransfer',
                        params:{
                            'type':type,
                            'prisonAccountId':prisonAccountId,
                            bankId:this.bankId,
                            bankAccountId:this.bankAccountId,
                            money:this.transferMoney * 100,
                            remark:this.remark
                        }
                    }).then(res=>{
                        if(res.data.code == 0){
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                        }else{
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            }
                            console.log(res.data.code,res.data.msg);
                        }

                        store.dispatch('showRemind');
                    }).catch(err=>{
                        console.log(err);
                    });
                }

            }
        },
        components:{
            Page,
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getPrisonAccountDtos();
        }
	}
</script>

<style lang="less" scoped>
#right-side{
	.select-box{
        padding:20px 50px 20px 40px;
    }

    .text-box{
        padding-left:40px;
    }

    table{
    	tr{
    		th,td{
    			
    		}
    		th:last-child{
                text-align:left; 
    		}
    		td{
    			&:nth-child(6),&:nth-child(7),&:nth-child(8){
    				width:10%;
    			}
    		}
    	}
    }

    #transferApplication{
        h3{
            font-weight:bold;
        }

        .bind-info-list{
            width:100%;
            li{
                margin-top:15px;
                &:first-child{
                    span{
                        &:nth-child(2){
                            font-size:20px;
                            margin-top:-2px;
                            color:#EE6445;
                        }
                    }
                }
            }
        }

        .modal-dialog{
            width:40%;
        }

        .bind-info{
            margin-top:40px;
        }

        .info-label{
            color:#B1B1B1;
        }

        .confirm-button{
            width:44%;
            margin-left:0;
        }

        .cancel-button{
            width:44%;
        }

        .modal-body{
            padding:0 80px;
        }
    }
}
</style>