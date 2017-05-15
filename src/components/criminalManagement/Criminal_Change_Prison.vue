<template>
    <div id="changePrison">
        <!--搜索框部分-->
        <div class="col-xs-24 search tab-search">
            <div class="col-xs-23 search-box tab-search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-8 select-box">
                            <label for="prisonId">所属监狱</label>
                            <input type="text" class="form-control" list = "prisonList" placeholder = "全部" v-model = "prisonName" :disabled = "prisons.length == 1" id = "prisonInput">
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
                        <div class="col-xs-8 select-box">
                            <label for="status">在监状态</label>
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
                            <td>{{prisoner.intoPrisonDate | formatPrisonDate}}</td>
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
                            <input type="text" class="form-control confirm-select" list = "toPrisonList" placeholder = "请选择监狱" v-model = "toPrisonName" id = "toPrisonInput">
                            <datalist class="form-control hidden" id="toPrisonList">
                                <option v-for = "prison in toPrisons">{{prison.prisonName}}</option>
                            </datalist>
                            <select class="form-control confirm-select" id="toPrisonDepartmentId" v-model = "toPrisonDepartmentId">
                                <option v-for = "depart in toPrisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button"  @click = "changeConfirm">确定</button>
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
                            <input type="text" class="form-control confirm-select" list = "allPrisonList" placeholder = "请选择监狱" v-model = "toAllPrisonName" id = "allPrisonInput">
                            <datalist class="form-control hidden" id="allPrisonList">
                                <option v-for = "prison in allPrisons">{{prison.prisonName}}</option>
                            </datalist>
                            <select class="form-control confirm-select" id="toDepartmentId" v-model = "toDepartmentId">
                                <option v-for = "depart in toPrisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button"  @click = "changeAllConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>
<style lang="less" scoped>
    .change-prison {
        .modal-body {
            .confirm-select{
                margin-top: 30px;
            }
        }
    }
</style>
<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
import axios from 'axios'
    export default{
		data(){
			return {
                prisons: "",//根据用户信息出现的监狱列表
                allPrisons: "",//全部的监狱列表
                toPrisons: "",//选择转至的监狱列表
                toPrisonDepartments: "",//转至的监区列表
                prisonDepartments: "",//监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                currentId: "",//当前操作的罪犯ID
                ids: "",//批量转监狱选中的罪犯
                initPrisonId:"",//默认选中的转至监狱ID
                prisonName: "",//监狱名
                prisonId: "",//所属监狱ID
                prisonDepartmentId: "",//所属监区ID
                status: "",//在监状态
                number: "",//编号
                archivesNumber: "",//档案号
                name: "",//罪犯名
                toPrisonId: "",//转至监狱ID
                toPrisonName: "",//转至监狱名
                toAllPrisonName: "",//批量转监狱名
                toDepartmentId: "",//批量转监狱监区ID
                toPrisonDepartmentId: "",//单个转监狱监区ID
                remind:{
                    status:'',
                    msg:''
                },
                pageSize: 10,//每页显示的条数
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
                        break;
                    }else if (this.prisonName == "") {
                        this.prisonId = "";
                    } else {
                        this.prisonId = -1;
                    }
                }
                if (this.prisonId != oldPrisonId) {
                    this.getPrisonDepartInfo();
                }else {
                    this.prisonDepartments = "";
                }
            },
            toPrisonName(){//单个转监狱监听监狱变化
                let oldToPrisonId = this.toPrisonId;
                for (let i = 0; i< this.toPrisons.length; i++)  {
                    if (this.toPrisons[i].prisonName == this.toPrisonName) {
                        this.toPrisonId = this.toPrisons[i].id;
                        break;
                    }else if (this.toPrisonName == "") {
                        this.toPrisonId = "";
                    } else {
                        this.toPrisonId = -1;
                    }
                }
                if (this.toPrisonId != oldToPrisonId) {
                    this.getToPrisonDepartInfo();
                }else {
                    this.toPrisonDepartments = "";
                }
            },
            toAllPrisonName(){//批量转监狱监听监狱变化
                let oldToPrisonId = this.toPrisonId;
                for (let i = 0; i< this.allPrisons.length; i++)  {
                    if (this.allPrisons[i].prisonName == this.toAllPrisonName) {
                        this.toPrisonId = this.allPrisons[i].id;
                        break;
                    }else if (this.toAllPrisonName == "") {
                        this.toPrisonId = "";
                    } else {
                        this.toPrisonId = -1;
                    }
                }
                if (this.toPrisonId != oldToPrisonId) {
                    this.getToPrisonDepartInfo();
                }else {
                    this.toPrisonDepartments = "";
                }
            }
        },
        methods: {
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"离监"},{"value":1,"name":"在监"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱列表
                axios.get('prisoner/toAddOrEdit').then(res=>{
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonName = this.prisons[0].prisonName;
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo();
                        }
                        this.criminalSearch(this.indexPage); 
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getAllPrisonInfo(prisonId) {//获取所有的监狱列表
                axios.get('prisoner/getAllPrison').then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.allPrisons = res.data.data;//赋值全部的监狱列表
                        if (prisonId != null) {//单个转监狱需要排除自己原有的监狱
                            this.getToPrisonInfo(prisonId); 
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
            },

            getPrisonDepartInfo () {//获取监区信息
                axios.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        console.log('所有的监区信息')
                        this.prisonDepartments = res.data.data;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getToPrisonDepartInfo () {//获取转至的监区信息
                axios.get('prisoner/getDepartments',{params: {"prisonId":this.toPrisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        console.log('转至的监区信息')
                        this.toPrisonDepartments = res.data.data;
                        this.toDepartmentId = this.toPrisonDepartments[0].id;
                        this.toPrisonDepartmentId = this.toPrisonDepartments[0].id; 
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            criminalSearch(index){//罪犯搜索
                this.indexPage = index;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisons[i].id;
                    }
                }
                let searchData = {
                    "type": 1,
                    "prisonId": this.prisonId,
                    "prisonDepartmentId": this.prisonDepartmentId,
                    "status": this.status,
                    "name": this.empty(this.name)[0],
                    "number": this.empty(this.number)[0],
                    "archivesNumber":this.empty(this.archivesNumber)[0],
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log(searchData);
                axios.get('prisoner/getPrisoners',{params:searchData}).then(res=>{
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
                this.toAllPrisonName = "";
                this.toPrisonName = "";
                this.toPrisonId = "";
                this.toPrisonDepartments = "";
                if ( e == null) {//批量转监狱
                    this.getAllPrisonInfo(null);//获取监狱列表
                    let prisonerIds = new Array();//批量转监狱罪犯的ID数组
                    let checkedInfo = $(".info-list-check").filter(".active");
                    if (checkedInfo.length > 0) {
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("id"));
                        }
                        this.ids = prisonerIds;//将选中的罪犯ID赋值
                        $("#changeAllPrisonConfirm").modal();
                    } else {
                        this.remind = {
                            status:'warn',
                            msg:'请先选择转监的罪犯'
                        }
                        store.dispatch('showRemind');
                    }
                } else {//单个转监狱
                    let prisonId = e.target.getAttribute("prisonId");//获取监狱ID
                    this.currentId = e.target.getAttribute("id");//获取犯人ID
                    this.getAllPrisonInfo(prisonId);//获取监狱列表
                    $("#changePrisonConfirm").modal();
                }      
            },

            changeAllConfirm() {//确定批量转监狱
                if (this.toDepartmentId != "") {
                    let prisonerData = {
                        "ids": this.ids.join(","),
                        "type": 1,
                        "toDepartmentId": this.toDepartmentId
                    };
                    // console.log($.param(prisonerData));
                    axios.post('prisoner/transferByIds',$.param(prisonerData)).then(res=>{
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                            $('#changeAllPrisonConfirm').modal('hide');
                            this.criminalSearch(this.indexPage);
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
                }else {
                    this.remind = {
                        status:'warn',
                        msg:"请选择转至的监狱和监区"
                    }
                    store.dispatch('showRemind');
                }
            },

            changeConfirm() {//确定单个转监狱
                if (this.toPrisonId != "" && this.toPrisonDepartmentId != "") {
                    let prisonData = {
                        "prisonerId": this.currentId,
                        "toPrisonId": this.toPrisonId,
                        "toPrisonDepartmentId": this.toPrisonDepartmentId
                    };
                    // console.log(prisonData);
                    axios.post('prisoner/changePrison',$.param(prisonData)).then(res=>{
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                            $('#changePrisonConfirm').modal('hide');
                            this.criminalSearch(this.indexPage);
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
                }else {
                    this.remind = {
                        status:'warn',
                        msg:"请选择转至的监狱和监区"
                    }
                    store.dispatch('showRemind');
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
            this.getStatusList();
        }
	}
</script>