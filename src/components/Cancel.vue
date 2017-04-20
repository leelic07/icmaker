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
                                <input type="text" class="form-control" list = "prisonList" placeholder = "全部" v-model = "prisonName" :disabled = "prisons.length == 1">
                                <datalist class="form-control hidden" id="prisonList">
                                    <option v-for = "prison in prisons" :prisonId = "prison.id">{{prison.prisonName}}</option>
                                </datalist>
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
                            <div class="col-xs-6 text-box">
                                <label for="icCardNo">读卡</label>
                                <input type="text" class="form-control" id="icCardNo" v-model = "icCardNo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click = "getIcList(1)">
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
                                <th>所属监狱</th>
                                <th>所属监区</th>
                                <th>编号</th>
                                <th>档案号</th>
                                <th>罪犯名</th>
                                <th>虚拟账号</th>
                                <th>IC卡余额（元）</th>
                                <th>发卡时间</th>
                                <th>状态</th>
                                <th colspan="2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "card in icCardList">
                                <td>{{card.prison}}</td>
                                <td>{{card.prisonDepartment}}</td>
                                <td>{{card.number}}</td>
                                <td>{{card.archivesNumber}}</td>
                                <td>{{card.name}}</td>
                                <td>{{card.virtualAccount}}</td>
                                <td>{{card.total | currency}}</td>
                                <td>{{card.createdAt | formatDate}}</td>
                                <td>{{card.status | formatIcStatus}}</td>
                                <td v-if = "card.status == 2" colspan="2"></td>
                                <td v-if = "card.status != 2"><em class="reject-text" @click="cancellation($event)" :icId = "card.id">销卡</em></td>
                                <td v-if = "card.status == 0"><em class="agree-text" @click="loss($event)" :icId = "card.id">挂失</em></td>
                                <td v-if = "card.status == 1"><em class="agree-text" @click="cancelLoss($event)" :icId = "card.id">解挂</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize = "icCardSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getIcList"></Page>
            </div>

            <!--模态框-->

            <!-- 挂失-->
            <div class="modal modal-confirm" id="lossConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确定挂失此卡？</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "lossConfirm">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
            <!-- 解挂-->
            <div class="modal modal-confirm" id="cancelConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确定解挂此卡？</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "cancelConfirm">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
            <!-- 销卡-->
            <div class="modal modal-confirm" id="cancellationConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确定注销此卡？</h3>
                            <button class="confirm-button" data-dismiss="modal" @click = "cancellationConfirm">确定</button>
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
	export default{
		data(){
			return{
                statusList: "",//ic卡状态列表
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
				icCardList: "",//ic卡列表
                icCardSize: "",//IC卡列表总条数
                prisonId: "",//监狱ID
                prisonName: "",//监狱名
                departmentId: "",//监区ID
                status: "",//状态
                name: "",
                icCardNo: "",
                number: "",//编号
                archivesNumber: "",//档案号
                currentIcId: "",
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
        watch: {
            prisonName(){
                let oldPrisonId = this.prisonId;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisons[i].id;
                    }
                }
                if (this.prisonId != oldPrisonId) {
                    this.getPrisonDepartInfo();
                }else {
                    this.prisonId = "";
                    this.prisonDepartments = "";
                }
            }
        },
        methods:{
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"正常使用"},{"value":1,"name":"已挂失"},{"value":2,"name":"已销卡"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonName = this.prisons[0].prisonName;
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo();
                        }         
                        this.getIcList(this.indexPage);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonDepartInfo () {//获取监区信息
                this.prisonDepartments = "";
                this.departmentId = "";
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getIcList(index) {
                this.indexPage = index;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisons[i].id;
                    }
                }
                let searchData = {
                    "prisonId": this.prisonId,
                    "departmentId": this.departmentId,
                    "status":this.status,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "icCardNo": this.icCardNo.replace(/(^\s*)|(\s*$)/g,""),
                    "number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber":this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log("列表");
                // console.log(searchData);
                this.$http.get('icCard/prisonerICs',{params:searchData}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.icCardList = res.data.data.prisonerICs;//赋值罪犯列表
                        this.icCardSize = res.data.data.icSize;//赋值罪犯列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            loss(e){//挂失
                this.currentIcId = e.target.getAttribute("icId");
                $('#lossConfirm').modal();
            },


            lossConfirm() {
                let cancelData = {
                    "prisonerICId": this.currentIcId
                };
                this.$http.post("icCard/reportLossIC",$.param(cancelData)).then(res=>{
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getIcList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('挂失服务器异常' + err);
                });
            },

            cancelLoss(e) {//解挂
                this.currentIcId = e.target.getAttribute("icId");
                // console.log(this.currentIcId);
                $('#cancelConfirm').modal();
            },

            cancelConfirm() {
                let cancelData = {
                    "prisonerICId": this.currentIcId
                };
                this.$http.post("icCard/releaseReport",$.param(cancelData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getIcList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('解挂服务器异常' + err);
                });
            },

            cancellation(e) {//注销
                this.currentIcId = e.target.getAttribute("icId");
                // console.log(this.currentIcId);
                $('#cancellationConfirm').modal();
            },

            cancellationConfirm() {
                let cancelData = {
                    "prisonerICId": this.currentIcId
                };
                this.$http.post("icCard/pinCard",$.param(cancelData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getIcList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('注销服务器异常' + err);
                });
            },

        },
        components:{
           Page,
           Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
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