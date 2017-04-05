<template>
    <div id="changePrison">
        <!--搜索框部分-->
        <div class="col-xs-24 search tab-search">
            <div class="col-xs-23 search-box tab-search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-8 select-box">
                            <label for="prisonId">所属监狱</label>
                            <select class="form-control" id="prisonId" @change = "getPrisonDepartInfo ($event)">
                                <option value="">全部</option>
                                <option v-for = "prison in prisons" :value = "prison.id">{{prison.prisonName}}</option>
                            </select>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="prisonDepartmentId">所属监区</label>
                            <select class="form-control" id="prisonDepartmentId">
                                <option value="">全部</option>
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="status">在监状态</label>
                            <select class="form-control" id="status">
                                <option v-for = "status in statusList" :value = "status.value">{{status.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 text-box">
                            <label for="number">编号</label>
                            <input type="text" class="form-control" id="number">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="archivesNumber">档案号</label>
                            <input type="text" class="form-control" id="archivesNumber">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="name">罪犯名</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                              <input type="button" value="搜索" class="search-button" @click = "criminalSearch(1)">
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="转监狱" class="reject-button" @click = "changePrison(null)">
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
                            <th>户籍</th>
                            <th>身份证</th>
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>在监状态</th>
                            <th>申请状态</th>
                            <th>入监日期</th>
                            <th>操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "prisoner in prisonerList">
                            <td><div class="info-check info-list-check" v-show = "prisoner.enabled != 0" :id = "prisoner.prisonerId"></div></td>
                            <td>{{prisoner.name}}</td>
                            <td>{{prisoner.number}}</td>
                            <td>{{prisoner.archivesNumber}}</td>
                            <td>{{prisoner.address}}</td>
                            <td>{{prisoner.cardNo}}</td>
                            <td>{{prisoner.prisonName}}</td>
                            <td>{{prisoner.prisonDepartmentName}}</td>
                            <td>{{prisoner.status | formatStatus}}</td>
                            <td>{{prisoner.enabled | formatEnabled}}</td>
                            <td>{{prisoner.intoPrisonDate | formatDate}}</td>
                            <td><em class="agree-text" :id = "prisoner.prisonerId" :prisonId = "prisoner.prisonId" @click = "changePrison($event)" v-show = "prisoner.enabled != 0">转监狱</em></td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "prisonerSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "criminalSearch"></Page>
        </div>

        <!-- 单个转至监狱-->
        <div class="modal modal-confirm change-prison" id="changePrisonConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>选择转至监狱以及监区</h3>
                        <div class="col-xs-14 col-xs-offset-5">
                            <select class="form-control confirm-select" @change = "getPrisonDepartInfo ($event)" id = "toPrisonId">
                                <option v-for = "prison in toPrisons" :value = "prison.id">{{prison.prisonName}}</option>
                            </select>
                            <select class="form-control confirm-select" id="toPrisonDepartmentId">
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button" data-dismiss="modal" @click = "changeConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 批量转至监狱-->
        <div class="modal modal-confirm change-prison" id="changeAllPrisonConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>选择转至监狱以及监区</h3>
                        <div class="col-xs-14 col-xs-offset-5">
                            <select class="form-control confirm-select" @change = "getPrisonDepartInfo ($event)" id = "toPrisonId">
                                <option v-for = "prison in allPrisons" :value = "prison.id">{{prison.prisonName}}</option>
                            </select>
                            <select class="form-control confirm-select" id="toDepartmentId">
                                <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button" data-dismiss="modal" @click = "changeAllConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

    </div>
</template>
<style lang="less" scoped>
    .change-prison {
        .modal-body {
            select:nth-child(1){
                margin-top: 30px;
                margin-bottom: 30px;
            }
        }
    }
</style>
<script>
import Page from '../Paginator.vue'
    export default{
		data(){
			return {
                prisons: "",//根据用户信息出现的监狱列表
                allPrisons: "",//全部的监狱列表
                toPrisons: "",//选择转至的监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                pageSize: 10,//每页显示的条数
                currentId: "",//当前操作的罪犯ID
                ids: "",//批量转监狱选中的罪犯
                isManage: true,//是否为管理页
                initPrisonId:"",//默认选中的转至监狱ID
                indexPage: 1
            }
		},
        methods: {
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"离监"},{"value":1,"name":"在监"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱列表
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getAllPrisonInfo(prisonId) {//获取所有的监狱列表
                this.$http.get('prisoner/getAllPrison').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.allPrisons = res.data.data;//赋值全部的监狱列表
                        this.initPrisonId = this.allPrisons[0].id;
                        if (prisonId != null) {//单个转监狱需要排除自己原有的监狱
                            this.getToPrisonInfo(prisonId); 
                        }else {
                            this.getPrisonDepartInfo (null,this.initPrisonId) ;//获取默认的监区列表
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getToPrisonInfo(prisonId) {//单条转监时获取选择转至的监狱列表
                let toPrisons = [];
                for (let i = 0; i < this.allPrisons.length; i++) {  
                    if (this.allPrisons[i].id != prisonId) {
                        toPrisons.push(this.allPrisons[i]);
                    }
                }
                this.toPrisons = toPrisons;
                if (toPrisons.length > 0) {
                    this.initPrisonId = toPrisons[0].id;  
                    this.getPrisonDepartInfo (null,this.initPrisonId) ;//获取默认的监区列表
                }
            },

            getPrisonDepartInfo (e,id) {//获取监区信息
                console.log("init"+id);
                let prisonId = e == null? id : $(e.target).val();
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":prisonId}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            criminalSearch(index){//罪犯搜索
                this.indexPage = index;
                let searchData = {
                    "prisonId": $("#prisonId").val(),
                    "prisonDepartmentId": $("#prisonDepartmentId").val(),
                    "status":$("#status").val(),
                    "name": $("#name").val(),
                    "number": $("#number").val(),
                    "archivesNumber":$("#archivesNumber").val(),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                console.log(searchData);
                this.$http.get('prisoner/getPrisoners',{params:searchData}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonerList = res.data.data.prisoners;//赋值罪犯列表
                        this.prisonerSize = res.data.data.prisonerSize;//赋值罪犯列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            changePrison(e) {//转监狱
                if ( e == null) {//批量转监狱
                    this.getAllPrisonInfo(null);//获取监狱列表
                    let prisonerIds = new Array();//批量转监狱罪犯的ID数组
                    let checkedInfo = $(".info-list-check").filter(".active");
                    if (checkedInfo.length > 0) {
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("id"));
                        }
                        console.log(prisonerIds);
                        this.ids = prisonerIds;//将选中的罪犯ID赋值
                        $("#changeAllPrisonConfirm").modal();
                    } else {
                        alert("请先选择转监的罪犯");
                    }
                } else {//单个转监狱
                    let prisonId = e.target.getAttribute("prisonId");//获取监狱ID
                    this.currentId = e.target.getAttribute("id");//获取犯人ID
                    this.getAllPrisonInfo(prisonId);//获取监狱列表
                    $("#changePrisonConfirm").modal();
                }      
            },

            changeAllConfirm() {//确定批量转监狱
                let prisonerData = {
                    "ids": this.ids.join(","),
                    "type": 1,
                    "toDepartmentId": $("#toDepartmentId").val()
                };
                console.log($.param(prisonerData));
                this.$http.post('prisoner/transferByIds',$.param(prisonerData)).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.criminalSearch();
                        alert("成功");
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            changeConfirm() {//确定转监狱
                let prisonData = {
                    "prisonerId": this.currentId,
                    "toPrisonId": $("#toPrisonId").val(),
                    "toPrisonDepartmentId": $("#toPrisonDepartmentId").val()
                };
                console.log(prisonData);
                this.$http.post('prisoner/changePrison',$.param(prisonData)).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.criminalSearch();
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }

        },
        components:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getPrisonInfo();
            this.getStatusList();
            this.criminalSearch(1);
        }
	}
</script>