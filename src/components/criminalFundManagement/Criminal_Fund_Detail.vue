<template>
 	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-6 select-box">
                            <label for="prisonId">所属监狱</label>
                            <input type="text" class="form-control" list = "prisonList" placeholder = "全部" v-model = "prisonName" :disabled = "prisons.length == 1">
                            <datalist class="form-control hidden" id="prisonList">
                                <option v-for = "prison in prisons" :prisonId = "prison.id">{{prison.prisonName}}</option>
                            </datalist>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="prisonDepartmentId">所属监区</label>
                            <select class="form-control" id="prisonDepartmentId" v-model = "prisonDepartmentId" @change = "getAccountInfo">
                                <option value="">全部</option>
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="type">类别</label>
                            <select class="form-control" id = "type" v-model = "type">
                                <option v-for = "type in typeList" :value = "type.value">{{type.name}}</option>
                            </select>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="acount">商户</label>
                            <select class="form-control" id = "acount" v-model = "acount">
								<option value="">全部</option>
                                <option v-for = "account in accountList" :value = "account.id">{{account.account_name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 select-box">
                            <label for="name">姓名</label>
                            <input type="text" class="form-control" id="name" v-model = "name">
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="number">编号</label>
                            <input type="text" class="form-control" id="number" v-model = "number">
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="archivesNumber">档案号</label>
                            <input type="text" class="form-control" id="archivesNumber" v-model = "archivesNumber">
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="idCardNo">读卡</label>
                            <input type="text" class="form-control" id = "idCardNo" v-model = "idCardNo"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-1 text-box">
                            <label for="name">创建时间</label>
                            <input class="date form-control" size="16" type="text" placeholder="开始日期" id = "startTime">
                        </div>
                        <div class="col-xs-1 col-xs-push-1 mdash-box">
                            <div class="col-xs-24 col-xs-push-7">&mdash;</div>
                        </div>
                        <div class="col-xs-4 col-xs-push-1 text-box">
                            <label style="visibility:hidden" for="name">结束时间</label>
                            <input class="date form-control" size="16" type="text" placeholder="结束日期" id="endTime">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                            <input type="button" value="搜索" class="search-button" @click = "getDetailList(1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--罪犯资金总收入，总支出-->
        <div class='row'>
            <div class='criminal-total col-xs-23'>
                <ul>
                    <li class='pull-left text-green'>罪犯总收入金额: <span class='text-red'>{{incomeTotal | currency}}元</span></li>
                    <li class='pull-left text-green'>罪犯总支出金额: <span class='text-red'>{{outTotal | currency}}元</span></li>
                </ul>
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
	                        <th>所属监区</th>
	                        <th>流水号</th>
	                        <th>姓名</th>
                            <th>编号</th>
	                        <th>类别</th>
	                        <th>对方账户名</th>
	                        <th>交易金额(元)</th>
	                        <th>余额(元)</th>
                            <th>交易状态</th>
	                        <th>交易时间</th>
                            <th colspan = 2>操作</th>
	                    </tr>
                    </thead>
                    <tbody>
	                    <tr v-for = "detail in detailList">
							<td></td>
	                        <td>{{detail.prison_name}}</td>
	                        <td>{{detail.prison_department_name}}</td>
							<td>{{detail.capitalSerialNo}}</td>
	                        <td>{{detail.name}}</td>
                            <td>{{detail.number}}</td>
	                        <td>{{detail.type | formatFundType}}</td>
	                        <td>{{detail.otherAccountName}}</td>
	                        <td v-if='detail.type >= 3' class='text-red'>+{{detail.money | currency}}</td>
                            <td v-else-if='detail.type <3' class='text-green'>-{{detail.money | currency}}</td>
	                        <td>{{detail.balance | currency}}</td>
                            <td>{{detail.status | dealStatus}}</td>
	                        <td>{{detail.createTime | formatDate}}</td>
                            <td><em class="agree-text" @click = "inDetail(detail.capitalSerialNo,detail.capitalType)">明细</em></td>
                            <td><em class="agree-text" @click = "inWithdraw(detail.capitalSerialNo,detail.money)" v-show = "(detail.type == 0 || detail.type == 1 || detail.type == 2) && detail.status == 1">撤回</em></td>
	                        <!--<td><a class="tooltip-toggle" data-toggle="tooltip" data-placement="bottom" :title="detail.remark">{{detail.remark | formatRemark}}</a></td>-->
	                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "detailSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getDetailList"></Page>
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
                        <h3 class = "detail-tit">查看明细</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table detail-table" v-if = "detailInfo != ''">
                            <tr>
                                <td width = "200">流水号</td>
                                <td width = "250">{{capitalSerialNo}}</td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>{{detailInfo.accountName}}</td>
                            </tr>
                            <tr>
                                <td>账号</td>
                                <td>{{detailInfo.accountNo}}</td>
                            </tr>
                            <tr>
                                <td>对方账户名</td>
                                <td>{{detailInfo.toAccountName}}</td>
                            </tr>
                            <tr>
                                <td>对方账号</td>
                                <td>{{detailInfo.toAccountNo}}</td>
                            </tr>
                            <tr v-show = "detailInfo.cashTypeName != null">
                                <td>取现类型</td>
                                <td>{{detailInfo.cashTypeName}}</td>
                            </tr>
                            <tr>
                                <td>备注</td>
                                <td>{{detailInfo.remark}}</td>   
                            </tr>
                        </table>
                        <button class="detail-button" data-dismiss="modal">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 撤回确认框--> 
        <div class="modal modal-bind modal-confirm" id="withdrawConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                        <h3 class = "detail-tit">撤回资金</h3>
                    </div>
                    <div class="modal-body">
                        <table class="table detail-table">
                            <tr>
                                <td width = "200">流水号</td>
                                <td width = "250">{{withdraw.serialNo}}</td>
                            </tr>
                            <tr>
                                <td>撤回资金</td>
                                <td>{{withdraw.money|currency}}元</td>
                            </tr>
                            <tr>
                                <td colspan = "2"><textarea class="form-control" cols="53" rows="4" v-model = "withdraw.reason" placeholder = "撤回理由..."></textarea></td>
                            </tr>
                        </table>
                        <button class="confirm-button" @click = "withdrawConfirm">保存</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        
    </div>
</template>

<script>
	import Page from '../Paginator.vue'
	export default {
		data(){
			return{
				prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
				typeList: "",//类型列表
				accountList: "",//场所列表
				detailList: "",//资金详细列表
				detailSize: "",//资金详细列表条数
                prisonName: "",//监狱名
				prisonId: "",//监狱ID
                prisonDepartmentId: "",//监区ID
				name: "",//罪犯名
                archivesNumber: "",//档案号
				number: "",//编号
                idCardNo: "",//IC卡号
				type: "",//类型
				acount: "",//场所
                startTime: "",//开始时间
                endTime: "",//结束时间
				pageSize: 10,
                indexPage: 1,
                incomeTotal:'',//罪犯收入总金额
                outTotal:'',//罪犯支出总金额
                withdraw:{
                    money:'',
                    serialNo:'',
                    reason:''
                },
                detailInfo:"",
                capitalSerialNo:""
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
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonName = this.prisons[0].prisonName;
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo();
                        }
			            this.getDetailList(1);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonDepartInfo () {//获取监区信息
                this.prisonDepartments = "";
                this.prisonDepartmentId = "";
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
				this.getAccountInfo();
            },

			getAccountInfo() {//获取场所列表
				let accountData = {
					"prisonId": this.prisonId,
					"prisonDepartmentId": this.prisonDepartmentId
				}
				// console.log(accountData);
                this.$http.get('selectPrisonAccountName',{params:accountData}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.accountList = res.data.data.prisonAccountList;
						// console.log(this.accountList);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

			getTypeList(){//赋值类别列表
                this.typeList = [{"value":"","name":"全部"},{"value":0,"name":"刷卡消费"},{"value":1,"name":"取现"},{"value":2,"name":"制卡费"},{"value":3,"name":"家属汇款"},{"value":4,"name":"低报酬"},{"value":5,"name":"IC卡资金"}]
            },

			getDetailList(index) {
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
					"number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "type": this.type,
					"account": this.acount,
                    "startTime": $("#startTime").val(),
					"endTime":  $("#endTime").val(),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log(searchData);
                this.$http.get('criminalFundDetailList',{params:searchData}).then(res=>{
                     console.log(res);
                    if (res.data.code == 0) {
                        this.detailList = res.data.data.criminalFundDetailList;
                        this.detailSize = res.data.data.criminalFundDetailListSize;
                        this.incomeTotal = res.data.data.incomeTotal;
                        this.outTotal = res.data.data.outTotal;
                    }
                }).catch(err=>{
                    console.log(err);
                });
			},

            inDetail(capitalSerialNo,capitalType) {
                this.capitalSerialNo = capitalSerialNo;
                $("#detailConfirm").modal();
                let detailData = {
                    "capitalSerialNo": capitalSerialNo,
                    "capitalType":capitalType
                };
                this.$http.get('getCriminalFundDetail',{params:detailData}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.detailInfo = res.data.data;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            inWithdraw(capitalSerialNo,money) {
                this.withdraw.money = money;
                this.withdraw.serialNo = capitalSerialNo;
                $("#withdrawConfirm").modal();
            },

            withdrawConfirm() {
                if (this.isNull(this.withdraw.reason)) {
                this.remind = {
                    status: 'warn',
                    msg: '请填写撤回理由'
                };
                store.dispatch('showRemind');
                }else {
                this.$http({
                    method: 'post',
                    url: '/prisonerAccount/applyRecall',
                    'params': this.withdraw
                    }).then(res => {
                    if (res.data.code == 0) {
                        this.remind = {
                        status: 'success',
                        msg: res.data.msg
                        }
                    } else {
                        this.remind = {
                        status: 'failed',
                        msg: res.data.msg
                        }
                        console.log(res.data.code, res.data.msg);
                    }
                    store.dispatch('showRemind');
                    $('#withdrawConfirm').modal('hide');
                    this.searchDetail(this.indexPage);
                    }).catch(err => {
                    console.log(err);
                    });
                } 
            },

			dateInit(){
				$('.date').datetimepicker({
			        language:'zh-CN',
			        format:'yyyy-mm-dd hh:ii:ss',
			        weekStart: 1,
			        todayBtn:  1,
			        autoclose: 1,
			        todayHighlight: 1,
			        startView: 2,
			        forceParse: 0,
			        showMeridian: 1
			    });
			}

		},

		components:{
			Page
		},

		mounted(){
			this.dateInit();
			$('#table_id_example').tableHover();	
            $('.tooltip-toggle').tooltip('toggle')
            this.getTypeList();
			this.getPrisonInfo();
		}
	}
</script>

<style lang="less" scoped>
    #right-side{
    	.text-box{
    		padding-left:0;
            padding-right:0;
    	}
        .tooltip-toggle {
            color: #666;
            display:block;
            width: 80px;
            overflow:hidden;
            white-space:nowrap;
            text-decoration: none;
        }

        .criminal-total{
            margin-left:2%;
            padding:10px 0 15px 0;
            li{
                &:nth-child(2){
                    margin-left:2%;
                }
            }
        }

        .text-red{
            color:#E96900;
        }
        .text-green{
            color:#36A5B0;
        }

        .detail-tit {
            margin-bottom: 40px;
            margin-top: 40px;
        }

        .detail-table {
            tr {
                height: 38px;
                td:nth-child(1) {
                text-align: left;
                color: #999;
                }

                td:nth-child(2) {
                text-align: right;
                }
            }
        }
    }
</style>