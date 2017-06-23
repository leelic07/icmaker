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
                            <label for="prisonDepartmentId">所属监区</label>
                            <select class="form-control" id="prisonDepartmentId" v-model = "prisonDepartmentId">
                                <option value="">全部</option>
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <div class="col-xs-8 text-box">
                            <label for="number">流水号</label>
                            <input type="text" class="form-control" id="serialNo" v-model = "serialNo">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                            <input type="button" value="搜索" class="search-button" @click = "getExamList(1)">
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
                            <th>1流水号</th>
                            <th>类别</th>
                            <th>账户名</th>
                            <th>对方账户名</th>
                            <th>金额</th>
                            <th>申请时间</th>
                            <th>申请人</th>
                            <th>撤回理由</th>
                            <th colspan="2">操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "exam in examList">
                            <td>{{exam.prisonName}}</td>
                            <td>{{exam.prisonDepartmentName}}</td>
                            <td>{{exam.name}}</td>
                            <td>{{exam.number}}</td>
                            <td>{{exam.virtualNo}}</td>
                            <td>{{exam.typeName}}</td>
                            <td>{{exam.cash | currency}}</td>
                            <td>{{exam.optherName}}</td>
                            <td><em class="agree-text" @click="receive($event,1)" :id = "exam.id">同意</em></td>
                            <td><em class="reject-text" @click="receive($event,2)" :id = "exam.id">拒绝</em></td>
                        </tr>   
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "examSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getExamList"></Page>
        </div>

        <!--模态框-->

        <!-- 撤回-->
        <div class="modal modal-confirm" id="examConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3 v-if = "verifyType == 1">确认同意撤回?</h3>
                        <template v-if = "verifyType == 2">
                            <h3>确认拒绝撤回?</h3>
                            <div class="form-group clearfix col-xs-20 input-box col-xs-offset-4">
                                <label for="verifyNote" class="pull-left col-xs-5">拒绝原因 :</label>
                                <div class="col-xs-15">
                                    <input type="text" class="form-control pull-left" id="remark" v-model = "remark">
                                </div> 
                            </div>
                        </template>
                        <button class="confirm-button" data-dismiss="modal" @click = "receiveConfirm(verifyType)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
export default{
	data(){
		return{
            prisons: "",//监狱列表
            prisonDepartments: "",//监区列表
            examList: "",//审核列表
            examSize: "",//审核列表总条数
            prisonName: "",//监狱名
            prisonId: "",//监狱ID
            prisonDepartmentId: "",//监区ID
            serialNo:"",
            recordId: "",//审核选中的ID
            verifyType: "",//审核类型 1-同意 2-拒绝
            remark: "",
            remind:{
                status:'',
                msg:''
            },
            type: 2,
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
        getPrisonInfo() {//根据用户信息获取监狱信息
            this.$http.get('prisoner/toAddOrEdit').then(res=>{
                if (res.data.code == 0) {
                    this.prisons = res.data.data.prisons;//赋值监狱列表
                    if (this.prisons.length == 1) {
                        this.prisonName = this.prisons[0].prisonName;
                        this.prisonId = this.prisons[0].id;
                        this.getPrisonDepartInfo();
                    }
                    this.getExamList(this.indexPage);
                }
            }).catch(err=>{
                console.log(err);
            });
        },

        getPrisonDepartInfo () {//获取监区信息
            this.prisonDepartments = "";
            this.prisonDepartmentId = "";
            this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                if (res.data.code == 0) {
                    this.prisonDepartments = res.data.data;//赋值监区列表
                }
            }).catch(err=>{
                console.log(err);
            });
        },

        getExamList(index) {
            this.indexPage = index;
            for (let i = 0; i< this.prisons.length; i++)  {
                if (this.prisons[i].prisonName == this.prisonName) {
                    this.prisonId = this.prisons[i].id;
                }
            }
            let searchData = {
                "prisonId": this.prisonId,
                "prisonDepartmentId": this.prisonDepartmentId,
                "serialNo": this.serialNo.replace(/(^\s*)|(\s*$)/g,""),
                "type":this.type,
                "indexPage":this.indexPage,
                "pageSize":this.pageSize
            };
            this.$http.get('/prisonerAccount/getRecallhis',{params:searchData}).then(res=>{
                console.log(res);
                if (res.data.code == 0) {
                    this.examList = res.data.data.cashhisList;
                    this.examSize = res.data.data.cashhisListCount;
                }
            }).catch(err=>{
                console.log(err);
            });
        },

        receive(e,verifyType){//verifyType 1-同意 2-拒绝
            this.verifyType = verifyType;
            this.remark = "";
            this.recordId = e.target.getAttribute("id");
            $('#examConfirm').modal();
        },

        receiveConfirm(verifyType) {
            if (this.verifyType == 1 || !this.isNull(this.remark)) {
                let receiveData = {
                    "id": this.recordId,
                    "status": this.verifyType,
                    "remark":this.remark
                };
                this.$http.post("/prisonerAccount/authRecall",$.param(receiveData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {//返回成功
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.getExamList(this.indexPage);
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('审核服务器异常' + err);
                });
            }else {
                this.remind = {
                    status:'warn',
                    msg:"拒绝理由不能为空"
                }
                store.dispatch('showRemind');
            }
            
        },
    },
    components:{
        Page,
        Remind
    },
    mounted(){
        $('#table_id_example').tableHover();
        $('#table_id_example').select();
        this.getPrisonInfo();
    }
}
</script>

<style lang="less" scoped>
    .modal {
        .input-box {
            margin-top: 20px;
        }
    }  
</style>
