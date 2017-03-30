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
                                <select class="form-control" id="prisonId" @change = "getPrisonDepartInfo ($event)" v-model = "prisonId">
                                    <option value="">全部</option>
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
                                <input type="button" value="搜索" class="search-button">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--按钮组部分-->
            <div class="col-xs-24 button">
                <div class="col-xs-2">
                    <input type="button" value="申请制卡" class="reject-button" @click="applyCard()">
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
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td class="reject-text">拒绝制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page></Page>
            </div>

            <!--模态框-->

            <!-- 申请制卡-->
            <div class="modal modal-confirm" id="applyConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>提交制卡申请</h3>
                            <button class="confirm-button" data-dismiss="modal">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
        </div>
</template>

<script>
import Page from './Paginator.vue'
	export default {
		data(){
			return{
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//申请状态列表
                prisonId: "",//监狱ID
                departmentId: "",//监区ID
                status: "",//状态
                archivesNumber: "",//档案号
                virtualAccount: "",//虚拟账号
                number: "",//编号
                name: "",//罪犯名
                pageSize: 10,
                indexPage: 1
			}
		},
        methods:{
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"未制卡"},{"value":1,"name":"正在制卡"},{"value":2,"name":"拒绝制卡"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonDepartInfo (e) {//获取监区信息
                let prisonId = $(e.target).val();
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":prisonId}}).then(res=>{
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
                    "name": this.name,
                    "icCardNo": this.icCardNo,
                    "number": this.number,
                    "archivesNumber":this.archivesNumber,
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                console.log(searchData);
                this.$http.get('icCard/prisonerICs',{params:searchData}).then(res=>{
                    console.log("列表");
                    console.log(res);
                    if (res.data.code == 0) {
                        this.icCardList = res.data.data.prisonerICs;//赋值罪犯列表
                        this.icCardSize = res.data.data.icSize;//赋值罪犯列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            applyCard(){
                $('#applyConfirm').modal();
            }
        },
        components:{
           Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getStatusList();
            this.getPrisonInfo();
            this.getApplyList();
        }
	}
</script>

<style lang="less" scoped>
    h3{
        font-weight:bold;
    }
</style>