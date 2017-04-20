<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!-- <Nav></Nav> -->
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="status">状态</label>
                                <select class="form-control" id="status" v-model = "status">
                                    <option v-for = "status in statusList" :value = "status.value">{{status.name}}</option>
                                </select>
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="accountNo">虚拟账号</label>
                                <input type="text" class="form-control" id="accountNo" v-model = "accountNo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click="accountNoList(1)">
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
                            <th>虚拟账号</th>
                            <th>账户类型</th>
                            <th>所属监狱</th>
                            <th>账号名</th>
                            <th>余额(元)</th>
                            <th>状态</th>
                            <th>最近绑定日期</th>
                            <th colspan = "2">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for = "account in accountList">
                            <td>{{account.virtualAccountNo}}</td>
                            <td>{{account.type | formatAccountType}}</td>
                            <td>{{account.prison }}</td>
                            <td>{{account.virtualAccountName}}</td>
                            <td>{{account.total | currency}}</td>
                            <td>{{account.status | formatAccountStatus}}</td>
                            <td>{{account.recentBindingDate | formatDate}}</td>
                            <td><em class="agree-text" :id = "account.virtualAccountId" @click="detail($event)">明细</em></td>
                            <td><em class="reject-text" :id = "account.virtualAccountId" @click="delAccount($event)">删除</em></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize = "accountSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "accountNoList"></Page>
            </div>

            <!--模态框-->

            <!--查看明细 -->
            <div class="modal modal-confirm modal-bind" id="detailConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                            <h3>查看明细</h3>
                        </div>
                        <div class="modal-body">
                            <table class="table" v-if = "detailList.length > 0">
                                <tr v-for = "detail in detailList">
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">{{virtualAccount.virtualAccountNo}}</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">{{detail.virtualAccountName}}</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">{{detail.createdAt | formatDate}}</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                            </table>
                            <p v-else class ="description">暂无使用明细</p>
                            <button class="detail-button" data-dismiss="modal">确定</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>

            <!-- 删除确认框-->
            <div class="modal modal-confirm" id="delConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确认删除?</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "deleteConfirm($event)">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>

            <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
import Remind from './Remind.vue'
import store from './../store'
import Page from './Paginator.vue'
import {mapGetters,mapMutations} from 'vuex'

	export default {
		data(){
			return{
                statusList: "",//状态列表
                detailList: "",//明细列表
                virtualAccount: "",//明细列表里的虚拟账户
                accountNo: "",//虚拟账号
                accountId: "",//虚拟账号ID
                status: "",//状态
                accountList: "",//虚拟账号信息列表
                accountSize: "",//虚拟账号信息总条数
                remind:{
                    status:'',
                    msg:''
                },
                pageSize: 10,
                indexPage: 1
			}
		},
        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
        methods:{
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":1,"name":"可用"},{"value":2,"name":"已绑定"}]
            },

            accountNoList(index) {
                this.indexPage = index;
                let searchData = {
                    "accountNo": this.accountNo.replace(/(^\s*)|(\s*$)/g,""),
                    "status": this.status,
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log(searchData);
                this.$http.get('icCard/accountList',{params:searchData}).then(res=>{
                    // console.log("列表");
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.accountList = res.data.data.accounts;//赋值虚拟账户列表
                        this.accountSize = res.data.data.accountSize;//赋值虚拟账户列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            detail(e){
                this.accountId = e.target.getAttribute("id");
                $('#detailConfirm').modal();
                let detailData = {
                    "accountId": this.accountId
                };
                // console.log(detailData);
                this.$http.get('icCard/accountDetail',{params:detailData}).then(res=>{
                    console.log("列表");
                    console.log(res);
                    if (res.data.code == 0) {
                        this.detailList = res.data.data.details;//赋值虚拟账号详情列表
                        this.virtualAccount = res.data.data.virtualAccount;//赋值虚拟账号详情列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            delAccount(e) {
                this.accountId = e.target.getAttribute("id");
                $('#delConfirm').modal();
            },

            deleteConfirm(e) {
                let deleteData = {
                    "accountId": this.accountId
                };
                this.$http.post('icCard/deleteAccount',$.param(deleteData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.accountNoList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log(err);
                });
            }

        },
        components:{
           Page,
           Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select(); 
            this.getStatusList();
            this.accountNoList(this.indexPage);
        }
	}
</script>

<style lang="less" scoped>
#right-side{
    #detailConfirm {
        .modal-content{
            min-height: 350px;
            .modal-body {
                min-height: 250px;
            }
        }
    }
    .modal-dialog{
        top:300px;
        width:30%;
        .modal-content{
            h3,h2{
                font-weight:bold;
            }
            .modal-body{
                padding:0;
                table{
                    margin-top:25px;
                    font-size:12px;
                    border-bottom: 1px solid #ddd;
                    tr{
                        border-top:1px solid #ddd;
                        td{
                            padding:10px 13px 10px 0;
                            p{
                                &:first-child{
                                    margin-bottom:10px;
                                    span:first-child{
                                        padding-left:3%;
                                        padding-right:3%;
                                        color:#A5A5A5;
                                    }
                                }
                                &:not(first-child){
                                    span:first-child{
                                        padding-left:9%;
                                        padding-right:6%;
                                        color:#A5A5A5;
                                    }
                                }
                                &:nth-child(3){
                                    span:first-child{
                                        padding-left:10px;
                                        padding-right:0;
                                        color:#333;
                                    }
                                }
                                &:nth-child(3){
                                    span:nth-child(2){
                                        color:#A5A5A5;
                                    }
                                }
                            }
                        }
                    }
                }
                .description {
                    color: #666;
                    height: 80px;
                    line-height: 80px;
                    font-size: 18px;
                }
            }
        }
    }   
}
</style>