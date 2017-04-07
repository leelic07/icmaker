<template>
    <div class="box">
	 <!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right" v-show = "isManage">
                <!--搜索框部分-->
                <div class="col-xs-24 search">
                    <div class="col-xs-23 search-box">
                        <div class="col-xs-23 search-inner-box">
                            <div class="row">
                                <div class="col-xs-4 col-xs-push-1 text-box">
                                    <label for="name">创建时间</label>
                                    <input class="date form-control" size="16" type="text" placeholder="开始日期" id="startDateStr">
                                </div>
                                <div class="col-xs-1 col-xs-push-1 mdash-box">
                                    <div class="col-xs-24 col-xs-push-7">&mdash;</div>
                                </div>
                                <div class="col-xs-4 col-xs-push-1 text-box">
                                    <label style="visibility:hidden" for="name">结束时间</label>
                                    <input class="date form-control" size="16" type="text" placeholder="结束日期" id="endDateStr">
                                </div>
                                <div class="col-xs-5 col-xs-push-3 text-box">
                                    <label for="name">角色名</label>
                                    <input type="text" class="form-control" id="roleName" v-model = "roleName">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4 col-xs-push-10 button-box">
                                    <input type="button" value="搜索" class="search-button" @click ="roleListSearch(1)">
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
                                <th>角色名称</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>最后修改时间</th>
                                <th>修改人</th>
                                <th colspan="3">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for = "role in roleList">
                                <td>{{role.roleName}}</td>
                                <td>{{role.createdUserName}}</td>
                                <td>{{role.createdAt | formatDate}}</td>
                                <td>{{role.updatedAt | formatDate}}</td>
                                <td>{{role.updatedUserName}}</td>
                                <td><router-link class="agree-text" :to = '"/role_management/edit/"+role.roleId' >修改</router-link></td>
                                <td><em class="reject-text"  @click = "deleteRole($event)" :id = "role.roleId">删除</em></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 表单底部-->
                    <Page :itemSize = "roleSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "roleListSearch"></Page>
                </div>

                <!-- 删除确认框-->
                <div class="modal modal-confirm" id="delRoleConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
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
			return{
                roleList  :"",
                isManage : true,
                pageSize : 20,
                roleSize : "",
                currentId :"",
                roleName : "",
                indexPage: 1
			}
		},
        components:{
            Page
        },
        watch:{
            $route(to,from){//监听路由变化
                const editUrl = "/role_management/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (to.path.substring(0,index) == "/role_management/edit" ) {//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                }else {
                    this.isManage = true;
                }
                if (from.path.substring(0,index) == "/role_management/edit" || from.path == '/role_add') {//从新增或者编辑页进入
                    this.roleListSearch(this.indexPage); 
                }
            }
        },
		methods:{
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
			},
            hideRoleList() {//初始为编辑页时隐藏管理页
                const editUrl = "/role_management/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (this.$route.path.substring(0,index) == "/role_management/edit" ) {//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                }
            },
            roleListSearch(index) {
                this.indexPage = index;
                const getUrl = 'role/getRoles';
                let getData = {
                    'roleName' : this.roleName.replace(/(^\s*)|(\s*$)/g,""),
                    'startDateStr' : $('#startDateStr').val(),
                    'endDateStr' : $('#endDateStr').val(),
                    'indexPage' : this.indexPage,
                    'pageSize' : this.pageSize
                };
                console.log(getData);
                this.$http.get(getUrl,{params: getData}).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.roleList = res.data.data.roles;
                        this.roleSize = res.data.data.roleSize;
                    }
                }).catch(err=>{
                    console.log('获取菜单列表服务器异常' + err);
                });
            },

            deleteRole(e) {//点击删除
                $('#delRoleConfirm').modal();
                this.currentId = e.target.getAttribute("id");
            },

            deleteConfirm(e) {//确认删除
               const delUrl = 'role/deleteRole';
               let id = e.target.getAttribute("id");
               this.$http.post(delUrl,$.param({'roleId':id})).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.roleListSearch();
                    }
                }).catch(err=>{
                    console.log('删除菜单列表服务器异常' + err);
                });
            }
		},
		mounted(){
			this.dateInit();//初始化日期插件
            $('#table_id_example').tableHover(); 
            //初始为编辑页时隐藏管理页
            this.hideRoleList();
            //加载角色列表
            this.roleListSearch(1);
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