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
                    </div>
                    <div class="row">
                        <div class="col-xs-6 text-box">
                            <label for="name">罪犯名</label>
                            <input type="text" class="form-control" id="name" v-model = "name">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="archivesNumber">档案号</label>
                            <input type="text" class="form-control" id="archivesNumber" v-model = "archivesNumber">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="idCardNo">读卡</label>
                            <input type="text" class="form-control" id="idCardNo" v-model = "idCardNo">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                            <input type="button" value="搜索" class="search-button" @click = "getFundList(1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="配置消费额度" class="reject-button" @click = "setFund(null,2)">
            </div>
        </div>
        <!--表格部分-->
        <div class="col-xs-24 form">
            <div class="col-xs-23">
                <table class="display table ic-table" id="table_id_example">
                    <thead>
                        <tr>
                            <th><div class="info-check"></div></th>
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>档案号</th>
                            <th>姓名</th>
                            <th>虚拟账号</th>
                            <th>金额（元）</th>
                            <th>日限额</th>
                            <th>月限额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "fund in fundList">
                            <td><div class="info-check info-list-check" :prisonerId = "fund.prisoner_id" :id="fund.id"></div></td>
                            <td>{{fund.prison_name}}</td>
                            <td>{{fund.prison_department_name}}</td>
                            <td>{{fund.archives_number}}</td>
                            <td>{{fund.name}}</td>
                            <td>{{fund.virtual_account_no}}</td>
                            <td>{{fund.total | setCurrency}}</td>
                            <td>{{fund.day_money | setCurrency}}</td>
                            <td>{{fund.month_money | setCurrency}}</td>
                            <td><em class="agree-text" :prisonerId = "fund.prisoner_id" :id="fund.id" :prisonerName = "fund.name" :monthMoney = "fund.month_money" :dayMoney = "fund.day_money" @click = "setFund($event,1)">配置消费额度</em></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "fundSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getFundList"></Page>
        </div>

        <!--模态框-->

        <!--设置限额 -->
        <div class="modal modal-confirm modal-bind" id="setConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>设置罪犯限额</h3>
                        <div class="clearfix bind-info">
                            <ul class="pull-left clearfix bind-info-list" v-if = "setType == 1">
                                <li class="clearfix"><span class="pull-left info-label">罪犯名称</span><span class="pull-right">{{prisonerName}}</span></li>
                            </ul>
                        </div>
                        <div class="col-xs-24">
                            <div class="form-group fee-input clearfix">
                                <label for="dayMoney" class="col-xs-6 pull-left">日限额：</label>
                                <div class="col-xs-18 pull-left">
                                    <input type="text" class="form-control" id="dayMoney" placeholder="输入日限额" v-model = "dayMoney">
                                </div>
                            </div>
                            <div class="form-group fee-input clearfix">
                                <label for="monthMoney" class="col-xs-6 pull-left">月限额：</label>
                                <div class="col-xs-18 pull-left">
                                    <input type="text" class="form-control col-xs-18 pull-left" id="monthMoney" placeholder="输入月限额" v-model = "monthMoney">
                                </div>
                            </div>
                        </div>
                        <button class="confirm-button" @click = "setFundConfirm">保存</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>
<style lang="less" scoped>
    button[disabled]{
       background: #999 !important ;
       border: 1px solid #999;
    }
    .modal {
        label {
            color: #666;
        }
    }
</style>
<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
	export default {
		data(){
			return{
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                fundList: "",//个人罪犯消费列表
                fundSize: "",//个人罪犯消费列表总条数
                prisonName: "",//监狱名
                prisonId: "",//监狱ID
                prisonDepartmentId: "",//监区ID
                name: "",//罪犯名
                archivesNumber: "",//档案号
                idCardNo: "",//IC卡号
                prisonerId: "",//当前操作的罪犯ID
                id: "",//新增时候为-999 修改时候为具体数字
                prisonerName: "",//当前操作的罪犯姓名
                prisonerIds: "",//当前操作的罪犯ID数组
                ids: "",//新增时候为-999 修改时候为具体数字（批量）
                dayMoney: "",//日限制额度
                monthMoney: "",//月限制额度
                setType: "",//setType 配置方式 1-单个 2-批量
                legal: false,//是否具备提交或者操作的权限
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
            },
            //删除小数点两位后的数字
            dayMoney(){
                this.dayMoney = this.saveTwo(this.dayMoney);
            },

            monthMoney(){
                this.monthMoney = this.saveTwo(this.monthMoney);
            }
        },
		methods:{
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
                        this.getFundList(this.indexPage);
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

            getFundList (index) {
                this.indexPage = index;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisons[i].id;
                    }
                }
                let searchData = {
                    "prisonId": this.prisonId,
                    "prisonDepartmentId": this.prisonDepartmentId,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber": this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
                    "idCardNo": this.idCardNo.replace(/(^\s*)|(\s*$)/g,""),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                this.$http.get('personalCrimeConsumptionRestrictList',{params:searchData}).then(res=>{
                    if (res.data.code == 0) {
                        this.fundList = res.data.data.personalCrimeConsumptionRestrictList;//赋值个人犯罪消费资金列表
                        this.fundSize = res.data.data.personalCrimeConsumptionRestrictListSize;//赋值个人犯罪消费资金列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            setFund (e,setType) {//setType 配置方式 1-单个 2-批量
                this.monthMoney = "";
                this.dayMoney = "";
                this.setType =setType;
                if(setType == 1) {
                    this.prisonerId = e.target.getAttribute("prisonerId");
                    this.id = e.target.getAttribute("id");
                    this.prisonerName = e.target.getAttribute("prisonerName");
                    let dayMoney = this.empty(e.target.getAttribute("dayMoney"));
                    this.dayMoney = dayMoney == "" ? "" :dayMoney/100;
                    let monthMoney = this.empty(e.target.getAttribute("monthMoney"));
                    this.monthMoney = monthMoney == "" ? "" : monthMoney/100;
                    $('#setConfirm').modal();
                }else if (setType == 2) {
                    let checkedInfo = $(".info-list-check").filter(".active");
                    if (checkedInfo.length > 0) {
                        let prisonerIds = new Array();//批量资金分配的罪犯ID数组
                        let ids = new Array();//批量资金分配的id数组
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("prisonerId"));
                            ids.push(checkedInfo[i].getAttribute("id"));
                        }
                        this.prisonerIds = prisonerIds.join(',');
                        this.ids = ids.join(',');
                        $('#setConfirm').modal();
                    }else {
                        this.remind = {
                            status:'warn',
                            msg:'请先选择进行消费额度配置的数据'
                        }
                        store.dispatch('showRemind');
                    }
                }
            },

            setFundConfirm () {//setType 配置方式 1-单个 2-批量
                let monthMoney = this.monthMoney == "" ? "" : this.toCent(this.monthMoney);
                let dayMoney = this.dayMoney == "" ? "" : this.toCent(this.dayMoney);
                if (this.isNull(this.monthMoney) && this.isNull(this.dayMoney)) {
                    this.remind = {
                        status:'warn',
                        msg:'请填写完整再进行提交'
                    }
                    store.dispatch('showRemind');
                }else if (!this.isNullOrNumber(this.monthMoney) || !this.isNullOrNumber(this.dayMoney)){
                    this.remind = {
                        status:'warn',
                        msg:'输入不合法'
                    }
                    store.dispatch('showRemind');
                }else {
                    if(this.setType == 1) {
                        let setData = {
                            "id": this.id,
                            "prisonerId": this.prisonerId,
                            "monthMoney": monthMoney,
                            "dayMoney": dayMoney
                        };
                        this.$http.post("consumptionQuota",$.param(setData)).then(res=>{
                            if (res.data.code == 0) {//返回成功
                                this.remind = {
                                    status:'success',
                                    msg:res.data.msg
                                }
                                $('#setConfirm').modal('hide');
                                this.getFundList(this.indexPage);
                            }else {
                                this.remind = {
                                    status:'failed',
                                    msg:res.data.msg
                                }
                            }
                            store.dispatch('showRemind');
                        }).catch(err=>{
                            console.log('配置资金服务器异常' + err);
                        });
                    }else if (this.setType == 2) {
                        let setData = {
                            "id": this.ids,
                            "prisonerId": this.prisonerIds,
                            "monthMoney": monthMoney,
                            "dayMoney": dayMoney
                        };
                        this.$http.post("batchConsumptionQuota",$.param(setData)).then(res=>{
                            if (res.data.code == 0) {
                                this.remind = {
                                    status:'success',
                                    msg:res.data.msg
                                }
                                $('#setConfirm').modal('hide');
                                this.getFundList(this.indexPage);
                                $(".info-check").removeClass("active");
                            }else {
                                this.remind = {
                                    status:'failed',
                                    msg:res.data.msg
                                }
                            }
                            store.dispatch('showRemind');
                        }).catch(err=>{
                            console.log('批量配置资金服务器异常' + err);
                        });
                    }
                }      
            }
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