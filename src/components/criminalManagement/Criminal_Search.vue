<template>
    <div class="box">
     <!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right" v-show = "isManage">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="prisonId">所属监狱</label>
                                <select class="form-control" id="prisonId" @change = "getPrisonDepartInfo ($event,null,null)" :disabled = "prisons.length == 1" v-model = "prisonId">
                                    <option value="" v-if = "prisons.length >1">全部</option>
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
                                <th colspan="2">操作</th>  
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
                                <td>{{prisoner.intoPrisonDate | formatPrisonDate}}</td>
                                <td><router-link class="agree-text" :to = '"/crimsearch/edit/"+prisoner.prisonerId'>修改</router-link></td>
                                <td><em class="reject-text" :id = "prisoner.prisonerId" @click = "deletePrisoner($event)">删除</em></td>
                            </tr>    
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize = "prisonerSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "criminalSearch"></Page>
            </div>

            <!-- 删除确认框-->
            <div class="modal modal-confirm" id="delCriminalConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>确认删除?</h3>
                            <button class="confirm-button" :id = "currentId" data-dismiss="modal" @click = "deleteConfirm($event)">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
        </div>

        <!--点击编辑路由入口-->
    <router-view></router-view>
</div>

    
</template>
<script>
import Page from '../Paginator.vue'
    export default {
        data(){
            return {
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                pageSize: 10,//每页显示的条数
                currentId: "",//当前操作的罪犯ID
                isManage: true,//是否为管理页
                prisonId: "",//所属监狱ID
                prisonDepartmentId: "",//所属监区ID
                status: "",//在监状态
                number: "",//编号
                archivesNumber: "",//档案号
                name: "",//罪犯名
                indexPage: 1
            }
        },
        watch:{
            $route(to){//监听路由变化
                const editUrl = "/crimsearch/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (to.path.substring(0,index) == "/crimsearch/edit" ){//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                } else {
                    this.isManage = true;
                }
            }
        },
        methods:{
            //初始为编辑页时隐藏管理页
            hideCriminalList() {
                const editUrl = "/crimsearch/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (this.$route.path.substring(0,index) == "/crimsearch/edit" ) {//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                }
            },

            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"离监"},{"value":1,"name":"在监"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo(null,this.prisonId);
                        }
                        this.criminalSearch(1); 
                    }
                }).catch(err=>{
                    console.log(err);
                });
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

            criminalSearch(index){
                this.indexPage = index;
                let searchData = {
                    "prisonId": this.prisonId,
                    "prisonDepartmentId": this.prisonDepartmentId,
                    "status": this.status,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber":this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
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

            deletePrisoner (e) {//点击删除按钮
                $('#delCriminalConfirm').modal();
                this.currentId = e.target.getAttribute("id");
                console.log(this.currentId);
            },

            deleteConfirm(e) {//点击确认删除
                const delUrl = 'prisoner/deletePrisoner';
                let id = e.target.getAttribute("id");
                this.$http.post(delUrl,$.param({'prisonerId':id})).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.criminalSearch();
                    }
                }).catch(err=>{
                    console.log('删除菜单列表服务器异常' + err);
                });
            }
        },
        components:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getPrisonInfo();
            this.getStatusList();
            this.hideCriminalList();
        }
    }   
</script>