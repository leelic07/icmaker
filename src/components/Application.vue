<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="prisonId">所属监狱</label>
                                <select class="form-control" id="prisonId" @change = "getPrisonDepartInfo" :disabled = "prisons.length == 1" v-model = "prisonId">
                                    <option value="" v-if = "prisons.length >1">全部</option>
                                    <option v-for = "prison in prisons" :value = "prison.id">{{prison.prisonName}}</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="departmentId">所属监区</label>
                                <select class="form-control" id="departmentId" v-model = "departmentId">
                                    <option value="">全部</option>
                                    <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="status">状态</label>
                                <select class="form-control" id="status" v-model = "status">
                                    <option v-for = "status in statusList" :value = "status.value">{{status.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 text-box">
                                <label for="virtualAccount">虚拟账号</label>
                                <input type="text" class="form-control" id="virtualAccount" v-model = "virtualAccount">
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="number">编号</label>
                                <input type="text" class="form-control" id="number" v-model = "number">
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="archivesNumber">档案号</label>
                                <input type="text" class="form-control" id="archivesNumber" v-model = "archivesNumber">
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="name">罪犯名</label>
                                <input type="text" class="form-control" id="name" v-model = "name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click = "getApplyList(1)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--按钮组部分-->
            <div class="col-xs-24 button">
                <div class="col-xs-2">
                    <input type="button" value="申请制卡" class="reject-button" @click="applyAllCard">
                </div>
            </div>
            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                            <tr>
                                <th><div class="info-check"></div></th>
                                <th>姓名</th>
                                <th>编号</th>
                                <th>档案号</th>
                                <th>虚拟账号</th>
                                <th>身份证</th>
                                <th>所属监狱</th>
                                <th>所属监区</th>
                                <th>申请日期</th>
                                <th>制卡日期</th>
                                <th>状态</th>
                                <th colspan="2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "apply in applyList">
                                <td><div class="info-check info-list-check" :id = "apply.prisonerId" v-if = "apply.cardStatus == 0 || apply.cardStatus == 3"></div></td>
                                <td>{{apply.name}}</td>
                                <td>{{apply.number}}</td>
                                <td>{{apply.archivesNumber}}</td>
                                <td>{{apply.virtualAccount}}</td>
                                <td>{{apply.cardNo}}</td>
                                <td>{{apply.prisonName}}</td>
                                <td>{{apply.prisonDepartmentName}}</td>
                                <td>{{apply.cardAt | formatDate}}</td>
                                <td>{{apply.createdAt| formatDate}}</td>
                                <td>{{apply.cardStatus | formatApplyStatus}}</td>
                                <td colspan = "2" v-if = "apply.cardStatus == 1"></td>
                                <td v-if = "apply.cardStatus == 2" colspan = "2"><em class="agree-text" :id = "apply.prisonerId" @click="applyCard($event,1)">申请补卡</em></td>
                                <td v-if = "apply.cardStatus == 0 || apply.cardStatus == 3" colspan = "2"><em class="agree-text" :id = "apply.prisonerId" @click="applyCard($event,0)">申请制卡</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize = "applySize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getApplyList"></Page>
            </div>

            <!--模态框-->

            <!-- 单个申请制补卡-->
            <div class="modal modal-confirm" id="applyConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3 v-if = "type == 0">提交制卡申请</h3>
                            <h3 v-else>提交补卡申请</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "applyConfirm">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>

            <!-- 批量申请制卡-->
            <div class="modal modal-confirm" id="applyAllConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>提交批量制卡申请</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "applyAllConfirm">确定</button>
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
	export default {
		data(){
			return{
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//申请状态列表
                applyList: "",//申请列表
                applySize: "",//申请数据条数
                prisonId: "",//监狱ID
                departmentId: "",//监区ID
                status: "",//状态
                archivesNumber: "",//档案号
                virtualAccount: "",//虚拟账号
                number: "",//编号
                name: "",//罪犯名
                prisonerId: "",//当前处理的罪犯ID
                ids: "",//当前批量处理的罪犯ID列表
                type: "",//当前处理的IC卡类型 （0-制卡，1-补卡）
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
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"未制卡"},{"value":1,"name":"正在制卡"},{"value":2,"name":"已制卡"},{"value":3,"name":"拒绝制卡"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo();
                        }        
                        this.getApplyList(1);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonDepartInfo () {//获取监区信息
                this.prisonDepartments = "";
                this.departmentId = "";
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getApplyList(index) {
                this.indexPage = index;
                let searchData = {
                    "prisonId": this.prisonId,
                    "departmentId": this.departmentId,
                    "status":this.status,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "virtualAccount": this.virtualAccount.replace(/(^\s*)|(\s*$)/g,""),
                    "number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber":this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                console.log(searchData);
                this.$http.get('icCard/prisonerCards',{params:searchData}).then(res=>{
                    console.log("列表");
                    console.log(res);
                    if (res.data.code == 0) {
                         this.applyList = res.data.data.prisonerICRecords;//赋值申请列表
                         this.applySize = res.data.data.recordSize;//赋值申请列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            applyCard(e,type){
                this.prisonerId = e.target.getAttribute("id");
                this.type = type;
                $('#applyConfirm').modal();
            },

            applyConfirm() {
                let applyData = {
                    "prisonerId": this.prisonerId,
                    "type": this.type
                };
                this.$http.post("icCard/applyForCard",$.param(applyData)).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getApplyList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('申请服务器异常' + err);
                });
            },

            //获取选中的项目
            applyAllCard() {
                let checkedInfo = $(".info-list-check").filter(".active");
                if (checkedInfo.length > 0) {
                    let prisonerIds = new Array();//批量转监狱罪犯审核的ID数组
                    for (let i = 0;i < checkedInfo.length; i ++) {
                        prisonerIds.push(checkedInfo[i].getAttribute("id"));
                    }
                    this.ids = prisonerIds.join(',');
                    $('#applyAllConfirm').modal();  
                }else {
                     this.remind = {
                        status:'warn',
                        msg:'请先选择要申请的制卡数据'
                     }
                     store.dispatch('showRemind');
                }  
            },

            applyAllConfirm() {
                let applyData = {
                    "ids": this.ids,
                    "type": 0
                };
                this.$http.post("icCard/applyCards",$.param(applyData)).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getApplyList(this.indexPage);
                        $(".info-check").removeClass("active");
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('申请服务器异常' + err);
                });
            },

        },
        components:{
           Page,
           Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getStatusList();
            this.getPrisonInfo();
        }
	}
</script>

<style lang="less" scoped>
    h3{
        font-weight:bold;
    }
</style>