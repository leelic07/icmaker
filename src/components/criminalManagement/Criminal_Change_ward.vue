<template>
    <div id="changeWard">
        <!--搜索框部分-->
        <div class="col-xs-24 search tab-search">
            <div class="col-xs-23 search-box tab-search-box">
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
                <input type="button" value="转监区" class="reject-button" @click = "changeWard(null)">
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
                            <th>入监日期</th>
                            <th>操作</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "prisoner in prisonerList">
                            <td><div class="info-check info-list-check" v-show = "prisoner.enabled != 0" :id = "prisoner.prisonerId" :prisonId = "prisoner.prisonId"></div></td>
                            <td>{{prisoner.name}}</td>
                            <td>{{prisoner.number}}</td>
                            <td>{{prisoner.archivesNumber}}</td>
                            <td>{{prisoner.address}}</td>
                            <td>{{prisoner.cardNo}}</td>
                            <td>{{prisoner.prisonName}}</td>
                            <td>{{prisoner.prisonDepartmentName}}</td>
                            <td>{{prisoner.status | formatStatus}}</td>
                            <td>{{prisoner.intoPrisonDate | formatPrisonDate}}</td>
                            <td><em class="agree-text" :id = "prisoner.prisonerId" :prisonId = "prisoner.prisonId" :departId = "prisoner.prisonDepartmentId" @click = "changeWard($event)" v-show = "prisoner.enabled != 0">转监区</em></td>
                        </tr>    
                    </tbody>
                </table>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "prisonerSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "criminalSearch" ></Page>
        </div>

        <!-- 单个转至监区-->
        <div class="modal modal-confirm change-prison" id="changeWardConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>选择转至监区</h3>
                        <div class="col-xs-14 col-xs-offset-5">
                            <select class="form-control confirm-select" id="toPrisonDepartmentId" v-model = "toPrisonDepartmentId">
                                <option v-for = "depart in toPrisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button" @click = "changeConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 批量转至监区-->
        <div class="modal modal-confirm change-prison" id="changeAllWardConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>选择转至监区</h3>
                        <div class="col-xs-14 col-xs-offset-5">
                            <select class="form-control confirm-select" id="toDepartmentId" v-model = "toDepartmentId">
                                <option v-for = "depart in toAllPrisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
                            </select>
                        </div>
                        <button class="confirm-button" @click = "changeAllConfirm">确定</button>
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
            select:nth-child(1){
                margin-top: 30px;
                margin-bottom: 30px;
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
			return {
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                toPrisonDepartments: "",//单条转监转至的监区列表
                toAllPrisonDepartments: "",//批量转监转至的监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                pageSize: 10,//每页显示的条数
                currentId: "",//当前操作的罪犯ID
                ids: "",//批量转监狱选中的罪犯
                isManage: true,//是否为管理页
                prisonName: "",//监狱名
                prisonId: "",//所属监狱ID 搜索条件
                fromPrisonId: "",//所属监狱ID 罪犯转监
                prisonDepartmentId: "",//所属监区ID
                status: "",//在监状态
                number: "",//编号
                archivesNumber: "",//档案号
                toPrisonDepartmentId: "",//单个转监区ID
                toDepartmentId: "",//批量转至监区ID
                remind:{
                    status:'',
                    msg:''
                },
                name: "",//罪犯名
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
                    this.getPrisonDepartInfo(this.prisonId);
                }else {
                    this.prisonId = "";
                    this.prisonDepartments = "";
                }
            }
        },
        methods: {
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"离监"},{"value":1,"name":"在监"}]
            },

            getPrisonInfo() {//获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    // console.log(res);
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

            getPrisonDepartInfo (prisonId,type,departId) {//获取监区信息 type-0 所属监区 1-批量转至监区列表 2-单个转至监区列表
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":prisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        if(type == 0) {
                            this.prisonDepartments = res.data.data;//赋值搜索栏监区列表
                        }else{
                            this.toAllPrisonDepartments = res.data.data;//赋值转监区监区列表
                            if (type == 2){
                                let toDepartIds = new Array();
                                for (let i=0; i < this.toAllPrisonDepartments.length; i++) {
                                    if (this.toAllPrisonDepartments[i].id != departId) {
                                        toDepartIds.push(this.toAllPrisonDepartments[i]);
                                    }
                                }
                                // console.log(toDepartIds);
                                this.toPrisonDepartments = toDepartIds;
                                this.toPrisonDepartmentId = this.toPrisonDepartments[0].id;
                            }else {
                                this.toDepartmentId = this.toAllPrisonDepartments[0].id;
                            }
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            changeWard(e) {
                if ( e == null) {//批量转监区
                    let prisonerIds = new Array();//批量转监区罪犯的ID数组
                    let prisonIds = new Array();//批量转监区选择的监狱列表
                    let checkedInfo = $(".info-list-check").filter(".active");
                    for (let i = 0;i < checkedInfo.length; i ++) {
                        let id = checkedInfo[i].getAttribute("prisonId");
                        if (prisonIds.indexOf(id) == -1) {
                            prisonIds.push(id);
                        }
                    }
                    if (prisonIds.length > 1) {//选取了多个监狱
                        this.remind = {
                            status:'warn',
                            msg:'请不要同时选中多个监狱进行操作'
                        }
                        store.dispatch('showRemind');
                    }else if (prisonIds.length < 1){
                        this.remind = {
                            status:'warn',
                            msg:'请先选择进行转监狱的罪犯'
                        }
                        store.dispatch('showRemind');
                    }else {
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("id"));
                        }
                        this.fromPrisonId = prisonIds[0];
                        this.ids = prisonerIds;//将选中的罪犯ID赋值
                        this.getPrisonDepartInfo(this.fromPrisonId,1);//获取转至的监区列表
                        $("#changeAllWardConfirm").modal();
                    }
                    
                } else {//单个转监区
                    let departId = e.target.getAttribute("departId");//获取监区ID
                    this.fromPrisonId = e.target.getAttribute("prisonId");
                    this.currentId = e.target.getAttribute("id");//获取犯人ID
                    this.getPrisonDepartInfo(this.fromPrisonId,2,departId);//获取转至的监区列表
                    $("#changeWardConfirm").modal();
                }  
            },

             criminalSearch(index){//罪犯搜索
                this.indexPage = index;
                 for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisons[i].id;
                    }
                }
                // console.log('prisonId'+this.prisonId);
                let searchData = {
                    "type": 0,
                    "prisonId": this.prisonId,
                    "prisonDepartmentId": this.prisonDepartmentId,
                    "status": this.status,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber":this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                // console.log(searchData);
                this.$http.get('prisoner/getPrisoners',{params:searchData}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisonerList = res.data.data.prisoners;//赋值罪犯列表
                        this.prisonerSize = res.data.data.prisonerSize;//赋值罪犯列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            changeAllConfirm() {//确定批量转监区
                let toDepartmentId = this.toDepartmentId;
                if (toDepartmentId != "") {
                    let prisonerData = {
                        "ids": this.ids.join(","),
                        "type": 0,
                        "toDepartmentId": toDepartmentId
                    };
                    this.$http.post('prisoner/transferByIds',$.param(prisonerData)).then(res=>{
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                            $('#changeAllWardConfirm').modal('hide');
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
                        msg:"请选择转至的监区"
                    }
                    store.dispatch('showRemind');
                }
                
            },

            changeConfirm() {//确定转监区
                let toDepartmentId = this.toPrisonDepartmentId;
                if (toDepartmentId != "") {
                    let prisonData = {
                        "prisonerId": this.currentId,
                        "toPrisonDepartmentId": this.toPrisonDepartmentId
                    };
                    // console.log(prisonData);
                    this.$http.post('prisoner/changePrisonDepartment',$.param(prisonData)).then(res=>{
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                            $('#changeWardConfirm').modal('hide');
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
                        msg:"请选择转至的监区"
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