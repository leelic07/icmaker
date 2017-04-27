<template>
    <div id="prison">
        <!--搜索框部分-->   
        <div class="col-xs-24 search tab-search">
            <div class="col-xs-23 search-box tab-search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-8 select-box">
                            <label for="fromPrisonName">所属监狱</label>
                            <input type="text" class="form-control" list = "fromPrisonList" placeholder = "全部" v-model = "fromPrisonName">
                            <datalist class="form-control hidden" id="fromPrisonList">
                                <option v-for = "prison in allPrisons">{{prison.prisonName}}</option>
                            </datalist>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="toPrisonName">转至监狱</label>
                            <input type="text" class="form-control" list = "toPrisonList" placeholder = "全部" v-model = "toPrisonName" :disabled = "prisons.length == 1">
                            <datalist class="form-control hidden" id="toPrisonList">
                                <option v-for = "prison in prisons">{{prison.prisonName}}</option>
                            </datalist>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="status">审核状态</label>
                            <select class="form-control" id="status" v-model = "status">
                                <option v-for = "status in examStatus" :value = "status.value">{{status.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                            <input type="button" value="搜索" class="search-button" @click = "applyList(1)">
                        </div>    
                    </div>
                </div>
            </div>
        </div>

        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="同意转监狱" class="agree-button" @click = "transferExam(null,2,1)">
            </div>
            <div class="col-xs-2">
                <input type="button" value="拒绝转监狱" class="reject-button" @click = "transferExam(null,2,2)">
            </div>
        </div>

        <!--表格部分-->
        
        <!--转监狱审核-->
        <div class="col-xs-24 form">
            <div class="col-xs-23">
                <table class="display table ic-table" id="table_id_example">
                    <thead>
                        <tr>
                            <th><div class="info-check"></div></th>
                            <th>姓名</th>
                            <th>编号</th>
                            <th>档案号</th>
                            <th>内档号</th>
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>转至监狱</th>
                            <th>转至监区</th>
                            <th>入监日期</th>
                            <th>审核状态</th>
                            <th colspan="2">操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "transfer in transfers">
                            <td><div class="info-check info-list-check" v-show = "transfer.status == 0" :id = "transfer.transferId"></div></td>
                            <td>{{transfer.name}}</td>
                            <td>{{transfer.number}}</td>
                            <td>{{transfer.archivesNumber}}</td>
                            <td>{{transfer.insideArchivesNumber}}</td>
                            <td>{{transfer.prisonName}}</td>
                            <td>{{transfer.prisonDepartmentName}}</td>
                            <td>{{transfer.toPrisonName}}</td>
                            <td>{{transfer.toPrisonDepartmentName}}</td>
                            <td>{{transfer.intoPrisonDate | formatPrisonDate}}</td>
                            <td>{{transfer.status | formatExamStatus}}</td>
                            <td><em class="agree-text" :id="transfer.transferId" @click = "transferExam($event,1,1)" v-show = "transfer.status == 0">同意</em></td>
                            <td><em class="reject-text" :id="transfer.transferId"  @click = "transferExam($event,1,2)" v-show = "transfer.status == 0">拒绝</em></td>
                        </tr>  
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "transferSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "applyList"></Page>
        </div>
        
        <!-- 同意确认框-->
        <div class="modal modal-confirm modal-examine" id="agreeTransferConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认同意转监狱?</h3>
                        <button class="confirm-button" :id = "currentId" data-dismiss="modal" @click = "transferConfirm($event,1)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 拒绝确认框-->
        <div class="modal modal-confirm modal-examine" id="rejectTransferConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认拒绝转监狱?</h3>
                        <div class="form-group clearfix col-xs-20 input-box col-xs-offset-4">
                            <label for="verifyNote" class="pull-left col-xs-5">拒绝原因 :</label>
                            <div class="col-xs-15">
                                <input type="text" class="form-control pull-left" id="verifyNote" v-model = "verifyNote">
                            </div> 
                        </div>
                        <button class="confirm-button" :id = "currentId" data-dismiss="modal" @click = "transferConfirm($event,2)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 批量同意确认框-->
        <div class="modal modal-confirm modal-examine" id="agreeAllTransferConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认全部同意转监狱?</h3>
                        <button class="confirm-button" :id = "currentId" data-dismiss="modal" @click = "transferAllConfirm($event,1)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        
        <!-- 拒绝确认框-->
        <div class="modal modal-confirm modal-examine" id="rejectAllTransferConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认全部拒绝转监狱?</h3>
                        <div class="form-group clearfix col-xs-20 input-box col-xs-offset-4">
                            <label for="verifyNote" class="pull-left col-xs-5">拒绝原因 :</label>
                            <div class="col-xs-15">
                                <input type="text" class="form-control pull-left" id="verifyNote" v-model = "verifyNote">
                            </div> 
                        </div>
                        <button class="confirm-button" :id = "currentId" data-dismiss="modal" @click = "transferAllConfirm($event,2)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>
<style lang="less" scoped>
    .modal-examine {
        .input-box {
            margin-top: 30px;
            label {
                height: 34px;
                line-height: 34px;
            }
        }
    }
</style>
<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
    export default{
		data(){
			return{
                examStatus: "",//审核状态
                prisons: "",//监狱列表（权限）
                allPrisons: "",//所有的监狱列表
                transfers: "",//申请罪犯列表
                transferSize: "",//申请罪犯列表条数
                pageSize: 10,//每页显示的条数
                currentId: "",//当前操作的ID
                choiseIds: "",//选中的ID列表
                numType: "",//numType:1-单个审核 2-批量审核
                fromPrisonName: "",//所属监狱名
                fromPrisonId: "",//所属监狱id
                toPrisonName: "",//转至监狱名
                toPrisonId: "",//转至监狱ID
                status: 0,//审核状态
                verifyNote: "",
                remind:{
                    status:'',
                    msg:''
                },
                initStatus: 0,
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
            toPrisonName(){
                let oldToPrisonId = this.toPrisonId;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.toPrisonName) {
                        this.toPrisonId = this.prisons[i].id;
                    }
                }
                if (this.toPrisonId == oldToPrisonId) {
                    this.toPrisonId = "";
                }
            },
            fromPrisonName(){
                let oldFromPrisonId = this.fromPrisonId;
                for (let i = 0; i< this.allPrisons.length; i++)  {
                    if (this.allPrisons[i].prisonName == this.fromPrisonName) {
                        this.fromPrisonId = this.allPrisons[i].id;
                    }
                }
                if (this.fromPrisonId == oldFromPrisonId) {
                    this.fromPrisonId = "";
                }
            }
        },
        methods:{
            getExamStatus() {
                this.examStatus = [{"value":0,"name":"审核中"},{"value":1,"name":"审核成功"},{"value":2,"name":"审核失败"},{"value":" ","name":"全部"}];
            },

            getPrisonInfo() {//获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                         if (this.prisons.length == 1) {
                            this.toPrisonName = this.prisons[0].prisonName;
                            this.toPrisonId = this.prisons[0].id;
                        }
                        this.applyList(this.indexPage);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getAllPrisonInfo() {//获取所有的监狱列表
                this.$http.get('prisoner/getAllPrison').then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.allPrisons = res.data.data;//赋值全部的监狱列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            applyList(index) {//搜索得到转监狱审核列表
                this.indexPage = index;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.toPrisonName) {
                        this.toPrisonId = this.prisons[i].id;
                    }
                }
                let searchData = {
                    "type": 1,//类型为转监狱
                    "fromPrisonId": this.fromPrisonId,
                    "toPrisonId": this.toPrisonId,
                    "status": this.status,
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log(searchData);
                this.$http.get('prisoner/getPrisonerTransfers',{params:searchData}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.transfers = res.data.data.transfers;//赋值罪犯列表
                        this.transferSize = res.data.data.transferSize;//赋值罪犯列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            transferExam(e,numType,agreeType) {//对审核操作进行确认 numType:1-单个审核 2-批量审核 agreeType:1-同意 2-拒绝
                this.numType = numType;
                if (numType == 1) {//单个审核
                    this.currentId = e.target.getAttribute("id");
                    if (agreeType == 1) {//同意
                        $('#agreeTransferConfirm').modal();
                    } else {//拒绝
                        this.verifyNote = "";
                        $('#rejectTransferConfirm').modal();
                    }
                } else {//批量审核
                    let checkedInfo = $(".info-list-check").filter(".active");
                    if (checkedInfo.length > 0) {
                        let prisonerIds = new Array();//批量转监狱罪犯审核的ID数组
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("id"));
                        }
                        this.choiseIds = prisonerIds;
                        if (agreeType == 1) {//同意
                            $('#agreeAllTransferConfirm').modal();
                        } else {//拒绝
                            this.verifyNote = "";
                            $('#rejectAllTransferConfirm').modal();
                        }
                    } else {
                        this.remind = {
                            status:'warn',
                            msg:'请先选择审核转监的罪犯'
                        }
                        store.dispatch('showRemind');
                    }
                    
                } 
            },

            transferConfirm(e,type) {//对转监进行审核
                let transferData = {
                    "verifyType": type,
                    "verifyNote": this.verifyNote,
                    "prisonerTransferId": e.target.getAttribute("id")
                };
                // console.log(transferData);
                this.$http.post('prisoner/transferVerify',$.param(transferData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.applyList(this.indexPage);
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
            },

            transferAllConfirm(e,type) {//对转监进行批量审核
                let transferAllData = {
                    "verifyType": type,
                    "verifyNote": this.verifyNote,
                    "ids": this.choiseIds.join(',') 
                };
                // console.log(transferAllData);
                this.$http.post('prisoner/transferVerifyByIds',$.param(transferAllData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.applyList(this.indexPage);
                        $(".info-check").removeClass("active");
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
            },
        },
        components:{
            Page,
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getExamStatus();
            this.getPrisonInfo();
            this.getAllPrisonInfo();
        }
	}
</script>