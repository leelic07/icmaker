<template>
    <div id="changeWard">
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
                            <input type="button" value="搜索" class="search-button" @click = "criminalSearch">
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="转监区" class="reject-button">
            </div>
        </div>
        <!--表格部分-->
        <div class="col-xs-24 form">
            <div class="col-xs-23">
                <table class="display table ic-table" id="table_id_example">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>编号</th>
                            <th>档案号</th>
                            <th>户籍</th>
                            <th>身份证</th>
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>在监状态</th>
                            <th>入监日期</th>
                            <th>操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "prisoner in prisonerList">
                            <td>{{prisoner.name}}</td>
                            <td>{{prisoner.number}}</td>
                            <td>{{prisoner.archivesNumber}}</td>
                            <td>{{prisoner.address}}</td>
                            <td>{{prisoner.cardNo}}</td>
                            <td>{{prisoner.prisonName}}</td>
                            <td>{{prisoner.prisonDepartmentName}}</td>
                            <td>{{prisoner.status | formatStatus}}</td>
                            <td>{{prisoner.intoPrisonDate | formatDate}}</td>
                            <td><em class="agree-text" :id="prisoner.prisonId">转监区</em></td>
                        </tr>    
                    </tbody>
                </table>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "prisonerSize" :pageSize = "pageSize" ></Page>
        </div>


        
    </div>
</template>
<script>
import Page from '../Paginator.vue'
    export default{
		data(){
			return {
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                pageSize: 20,//每页显示的条数
                currentId: "",//当前操作的罪犯ID
                isManage: true//是否为管理页
            }
		},
        methods: {
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"离监"},{"value":1,"name":"在监"}]
            },

            getPrisonInfo() {//获取监狱信息
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

            criminalSearch(){//罪犯搜索
                let searchData = {
                    "prisonId": $("#prisonId").val(),
                    "prisonDepartmentId": $("#prisonDepartmentId").val(),
                    "status":$("#status").val(),
                    "name": $("#name").val(),
                    "number": $("#number").val(),
                    "archivesNumber":$("#archivesNumber").val(),
                    "indexPage":1,
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
        },
        components:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getPrisonInfo();
            this.getStatusList();
            this.criminalSearch();
        }
	}
</script>