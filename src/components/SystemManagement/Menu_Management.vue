<template>
    <div class="box">
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right" v-if = "isManage">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">菜单类别</label>
                                <select class="form-control" id="searchMenuType">
                                    <option value = "">全部</option>
                                    <option value = 0>一级菜单</option>
                                    <option value = 1>二级菜单</option>
                                </select>
                            </div>
                            <div class="col-xs-6 col-xs-push-1 text-box">
                                <label for="name">菜单名称</label>
                                <input type="text" class="form-control" id="searchMenuName" v-model = "searchMenuName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click = "searchMenu(1)">
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
                                <th>菜单类别</th>
                                <th>一级菜单名称</th>
                                <th>二级菜单名称</th>
                                <th>菜单路径</th>
                                <th>是否启用</th>
                                <th>创建时间</th>
                                <th colspan="3">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "menu in menuList">
                                <td></td>
                                <td>{{menu.type | formatMenuType}}</td>
                                <td>{{menu.firstMenuName}}</td>
                                <td>{{menu.secondMenuName}}</td>
                                <td>{{menu.pageUrl}}</td>
                                <td>{{menu.isEnable | formatIsEnable}}</td>
                                <td>{{menu.createdAt | formatDate}}</td>
                                <td v-if = "menu.isEnable == 0"><em class="agree-text" :id = "menu.id" @click = "enubleMenu($event,1)">启用</em></td>
                                <td v-else><em class="agree-text" :id = "menu.id" @click = "enubleMenu($event,0)">停用</em></td>
                                <td><em class="reject-text" :id = "menu.id" @click = "deleteMenu($event)">删除</em></td>
                                <td><router-link class="agree-text" :id = "menu.id" :to='"/menu_management/edit/"+menu.id'>编辑</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表格底部-->
                <Page :itemSize = "menuSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "searchMenu"></Page>
            </div>

            <!--模态框-->

            <!-- 删除确认框-->
            <div class="modal modal-confirm" id="delMenuConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
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

            <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
        </div>

        <!--点击编辑路由入口-->
        <router-view></router-view>
    
    </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
	export default {
		data(){
			return {
                pageSize : 10,//每页的数据条数
				menuList : '',//菜单列表信息
                menuSize: '',//总条数
                currentId:'',//当前操作的菜单的ID
                searchMenuName: '',
                remind:{
                    status:'',
                    msg:''
                },
                isManage: true,
                indexPage: 1
			}
		},
        components:{
            Page,
            Remind
        },
        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
        watch:{
            $route(to,from){//监听路由变化
                const editUrl = "/menu_management/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (to.path.substring(0,index) == "/menu_management/edit" ){//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                } else {
                    this.isManage = true;
                }
                if (from.path.substring(0,index) == "/menu_management/edit" || from.path == '/menu_add') {//从新增或者编辑页进入
                    this.searchMenu(this.indexPage); 
                }
            }
        },
		methods:{
            //搜索菜单栏列表
            searchMenu(index){
                this.indexPage = index;
                const getUrl = 'menu/getMenus';
                let getData = {
                    'type' : $('#searchMenuType').val(),
                    'menuName' :this.searchMenuName.replace(/(^\s*)|(\s*$)/g,""),
                    'indexPage' : this.indexPage,
                    'pageSize' : this.pageSize
                };
                // console.log(getData);
                this.$http.get(getUrl,{params: getData}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.menuList = res.data.data.menuDtos;
                        this.menuSize = res.data.data.menuSize;
                    }
                }).catch(err=>{
                    console.log('获取菜单列表服务器异常' + err);
                });
                
           },

           //初始为编辑页时隐藏管理页
           hideMenuList() {
                const editUrl = "/menu_management/edit/2";
                const index = editUrl.lastIndexOf('/');
                if (this.$route.path.substring(0,index) == "/menu_management/edit" ) {//进入编辑页面
                    this.isManage = false;//将管理页隐藏
                }
           },

           //点击删除
           deleteMenu(e){
               $('#delMenuConfirm').modal();
               this.currentId = e.target.getAttribute("id");
           },

           //确认删除菜单
           deleteConfirm(e){
               let id = e.target.getAttribute('id');
               const delUrl = 'menu/deleteMenu';
               this.$http.post(delUrl,$.param({'id':id})).then(res=>{
                    if (res.data.code == 0) {//返回成功
                        this.searchMenu(this.indexPage);
                        store.dispatch('reloadSide');
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('删除菜单列表服务器异常' + err);
                });
           },

           //菜单是否启用配置
           enubleMenu(e,option){
               let id = e.target.getAttribute('id');
               let enubleData = {
                   "id" : id,
                   "isEnable" : option
               };
               const enubleUrl = 'menu/updateMenuEnuble';
               this.$http.post(enubleUrl,$.param(enubleData)).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {//返回成功
                        this.searchMenu(this.indexPage);
                        store.dispatch('reloadSide');
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                    }else {
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                    }
                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log('启用停用菜单列表服务器异常' + err);
                });
           }
           
		},
        mounted(){
            $('#table_id_example').tableHover();
            //加载菜单列表
            this.searchMenu(this.indexPage); 
            //初始为编辑页时隐藏管理页
            this.hideMenuList();
        }
	};
</script>