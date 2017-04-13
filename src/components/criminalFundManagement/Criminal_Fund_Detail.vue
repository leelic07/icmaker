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

        <!--表格部分-->
        <div class="col-xs-24 form">
            <div class="col-xs-23">
                <table class="display table ic-table" id="table_id_example">
                    <thead>
	                    <tr>
	                        <th></th>
	                        <th>所属监狱</th>
	                        <th>所属监区</th>
	                        <th>档案号</th>
							<th>编号</th>
	                        <th>姓名</th>
	                        <th>类别</th>
	                        <th>商户</th>
	                        <th>交易金额</th>
	                        <th>余额</th>
	                        <th>交易时间</th>
	                        <th>备注</th>
	                    </tr>
                    </thead>
                    <tbody>
	                    <tr v-for = "detail in detailList">
							<td></td>
	                        <td>{{detail.prison_name}}</td>
	                        <td>{{detail.prison_department_name}}</td>
	                        <td>{{detail.archives_number}}</td>
							<td>{{detail.number}}</td>
	                        <td>{{detail.name}}</td>
	                        <td>{{detail.type | formatFundType}}</td>
	                        <td>{{detail.accountName}}</td>
	                        <td>{{detail.money | currency}}</td>
	                        <td>{{detail.balance | currency}}</td>
	                        <td>{{detail.createTime | formatDate}}</td>
	                        <td>{{detail.remark}}</td>
	                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "detailSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getDetailList"></Page>
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
                indexPage: 1
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
                this.typeList = [{"value":"","name":"全部"},{"value":0,"name":"刷卡消费"},{"value":1,"name":"取现"},{"value":2,"name":"家属汇款"},{"value":3,"name":"低报酬"},{"value":4,"name":"IC卡资金"}]
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
                    if (res.data.code == 0) {
                        this.detailList = res.data.data.criminalFundDetailList;
                        this.detailSize = res.data.data.criminalFundDetailListSize;
                    }
                }).catch(err=>{
                    console.log(err);
                });
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
    }
</style>