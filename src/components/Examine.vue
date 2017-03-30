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
                            <label for="prisonDepartmentId">所属监区</label>
                            <select class="form-control" id="prisonDepartmentId" v-model = "prisonDepartmentId">
                                <option value="">全部</option>
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="status">申请类别</label>
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
                            <input type="button" value="搜索" class="search-button" @click = "getDeliveryList(1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" @click="receive()" value="同意制卡" class="agree-button">
            </div>
            <div class="col-xs-2">
                <input type="button" value="拒绝制卡" class="reject-button">
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
                            <th>申请类别</th>
                            <th>申请人</th>
                            <th colspan="2">操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "exam in examList">
                            <td><div class="info-check info-list-check" :id = "exam.applyId"></div></td>
                            <td>{{exam.name}}</td>
                            <td>{{exam.number}}</td>
                            <td>{{exam.archivesNumber}}</td>
                            <td>{{exam.virtualAccount}}</td>
                            <td>{{exam.cardNo}}</td>
                            <td>{{exam.prisonName}}</td>
                            <td>{{exam.departmentName}}</td>
                            <td>{{exam.type}}</td>
                            <td>{{exam.userName}}</td>
                            <td><em class="agree-text" @click="receive()">同意制卡</em></td>
                            <td><em class="reject-text">拒绝制卡</em></td>
                        </tr>   
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page></Page>
        </div>


        <!--模态框-->

        <!-- 制卡-->
        <div class="modal modal-confirm" id="examConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认同意制卡</h3>
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
export default{
	data(){
		return{
			statusList: "",//申请方式列表
            prisons: "",//监狱列表
            prisonDepartments: "",//监区列表
            examList: "",//审核列表
            examSize: "",//审核列表总条数
            prisonId: "",//监狱ID
            prisonDepartmentId: "",//监区ID
            status: "",//状态
            name: "",//罪犯名
            virtualAccount: "",//虚拟账号
            number: "",//编号
            archivesNumber: "",//档案号
            pageSize: 10,
            indexPage: 1
		}
	},
    methods:{
        getStatusList(){//赋值状态列表
            this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"制卡"},{"value":1,"name":"补卡"}]
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

        getExamList(index) {
            this.indexPage = index;
            let searchData = {
                "prisonId": this.prisonId,
                "prisonDepartmentId": this.departmentId,
                "status":this.status,
                "name": this.name,
                "virtualAccount": this.virtualAccount,
                "number": this.number,
                "archivesNumber":this.archivesNumber,
                "indexPage":this.indexPage,
                "pageSize":this.pageSize
            };
            console.log(searchData);
            this.$http.get('icCard/getCardApplies',{params:searchData}).then(res=>{
                console.log("列表");
                console.log(res);
                if (res.data.code == 0) {
                    this.examList = res.data.data.applies;//赋值审核列表
                    this.examSize = res.data.data.applySize;//赋值审核列表数
                }
            }).catch(err=>{
                console.log(err);
            });
        },

        receive(){
            $('#examConfirm').modal();
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
        this.getExamList();
    }
}
</script>

<style lang="less" scoped>
    h3{
        font-weight:bold;
    }
</style>
