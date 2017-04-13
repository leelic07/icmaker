<template>
	<!-- 右侧内容-->
    <div class="box">
        <div id="right-side" class="col-xs-20 pull-right" v-show = "isManage">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-7 select-box">
                                <label for="userType">账号类型</label>
                                <select class="form-control" id = "userType" v-model = "userType">
                                    <option v-for = "userType in userTypeList" :value = "userType.value">{{userType.name}}</option>
                                </select>
                            </div>
                            <div class="col-xs-4 text-box">
                                <label for="time">创建时间</label>
                                <input class="date form-control" size="16" type="text" placeholder="开始日期" id = "startDateStr">
                            </div>
                            <div class="col-xs-1 mdash-box">
                                <div class="col-xs-24 col-xs-push-7">&mdash;</div>
                            </div>
                            <div class="col-xs-4 text-box">
                                <label style="visibility:hidden" for="name">结束时间</label>
                                <input class="date form-control" size="16" type="text" placeholder="结束日期" id="endDateStr">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-7 select-box">
                                <label for="prisonId">所属监狱</label>
                                <input type="text" class="form-control" list = "prisonList" placeholder = "全部" v-model = "prisonName" :disabled = "prisonList.length == 1">
                                <datalist class="form-control hidden" id="prisonList">
                                    <option v-for = "prison in prisonList" :prisonId = "prison.id">{{prison.prisonName}}</option>
                                </datalist>
                            </div>
                            <div class="col-xs-5  text-box">
                                <label for="userName">用户名</label>
                                <input type="text" class="form-control" id="userName" v-model = "userName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click = "searchUserList(1)">
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
                            <th>账号类型</th>
                            <th>用户名</th>
                            <th>角色名</th>
                            <th>所属监狱</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>最后修改时间</th>
                            <th>修改人</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for = "user in userList">
                            <td>{{user.userType | formatUserType}}</td>
                            <td>{{user.userName}}</td>
                            <td>{{user.roleName}}</td>
                            <td>{{user.prisonName}}</td>
                            <td>{{user.createdUserName}}</td>
                            <td>{{user.createdAt | formatDate}}</td>
                            <td>{{user.updatedAt | formatDate}}</td>
                            <td>{{user.updatedUserName}}</td>
                            <td><router-link class="agree-text" :id="user.userId" :to='"/user_management/edit/"+user.userId'>修改</router-link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page :itemSize = "userSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "searchUserList"></Page>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Page from '../Paginator.vue'
	export default {
		data(){
			return {
				userTypeList: "",
                prisonList: "",
                userList: "",
                userSize: "",
                pageSize: 10,
                userType: "",
                userName: "",
                prisonName: "",
                prisonId: "",
                remind:{
                    status:'',
                    msg:''
                },
                isManage: true,
                indexPage: 1
			}
		},
        watch:{
            $route(to,from){//监听路由变化
                const editUrl = "/user_management/edit/1";
                const index = editUrl.lastIndexOf('/');
                if (to.path.substring(0,index) == "/user_management/edit" ){//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                } else {
                    this.isManage = true;
                }
                if (from.path.substring(0,index) == "/user_management/edit" || from.path == '/user_add') {//从新增或者编辑页进入
                    this.searchUserList(this.indexPage); 
                }
            },
            prisonName(){
                let oldPrisonId = this.prisonId;
                for (let i = 0; i< this.prisonList.length; i++)  {
                    if (this.prisonList[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisonList[i].id;
                    }
                }
            }
        },
		methods:{
            getUserTypeList(){//初始化账号类型列表
                this.userTypeList = [{
                    "value": "",
                    "name": "全部"
                },{
                    "value": 0,
                    "name": "平台"
                },{
                    "value": 1,
                    "name": "监狱局"
                },{
                    "value": 2,
                    "name": "监狱科室"
                },{
                    "value": 3,
                    "name": "监狱商户"
                }]
            },
            getPrisonList(){//获取监狱列表
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonList = res.data.data.prisons;
                         if (this.prisonList.length == 1) {
                            this.prisonName = this.prisonList[0].prisonName;
                            this.prisonId = this.prisonList[0].id;
                        }
                        this.searchUserList(this.indexPage);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            searchUserList(index){
                this.indexPage = index;
                for (let i = 0; i< this.prisonList.length; i++)  {
                    if (this.prisonList[i].prisonName == this.prisonName) {
                        this.prisonId = this.prisonList[i].id;
                    }
                }
                const getUrl = 'getUsers';
                let getData = {
                    'userType' : this.userType,
                    'startDateStr' : $('#startDateStr').val(),
                    'endDateStr' : $('#endDateStr').val(),
                    'prisonId' : this.prisonId,
                    'userName' : this.userName.replace(/(^\s*)|(\s*$)/g,""),
                    'indexPage' : this.indexPage,
                    'pageSize' : this.pageSize
                };
                console.log(getData);
                this.$http.get(getUrl,{params: getData}).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.userList = res.data.data.users;//用户列表赋值
                        this.userSize = res.data.data.userSize;//用户列表条数
                    }
                }).catch(err=>{
                    console.log('获取菜单列表服务器异常' + err);
                });
            },
            //初始为编辑页时隐藏管理页
            hideUserList() {
                const editUrl = "/user_management/edit/1";
                const index = editUrl.lastIndexOf('/');
                if (this.$route.path.substring(0,index) == "/user_management/edit" ) {//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                }
            },
            dataInit(){
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
            this.dataInit();
            $('#table_id_example').tableHover();
            this.getUserTypeList();
            this.getPrisonList();
            this.hideUserList();//初始为编辑页时隐藏管理页
        }
	}
</script>

<style lang="less" scoped>
    #right-side{
        .text-box{
            padding:20px 0;
        }
    }
</style>