<template>
    <div class="box">
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right" v-if = "isManage">
            <div class = "menulist-box col-xs-23">
                <div class = "menulist-tit-box col-xs-23">
                    <table class="display menu-table ic-table col-xs-24">
                        <thead>
                            <tr>
                                <th class = "col-xs-8">菜单名称</th>
                                <th class = "col-xs-3">状态</th>
                                <th class = "col-xs-5">路径</th>
                                <th class = "col-xs-4">创建时间</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                
                <div class="panel-group menulist-body-box col-xs-24" id="accordion">
                    <div class="panel panel-default menulist-item-box col-xs-24" v-for = "menus in menuList">
                        <div class="col-xs-24 clearfix">
                            <table class="display menu-table ic-table pull-left col-xs-23">
                                <tr>
                                    <td class = "col-xs-4"><em class = "firstMenuName">{{menus.firstMenuName}}</em></td>
                                    <td class = "button col-xs-4">
                                        <router-link class="agree-button" :id = "menus.id" :to='"/menu_add/"+menus.id' v-if = "menus.isEnable == 1">新增二级菜单</router-link>
                                    </td>
                                    <td class = "col-xs-3">
                                        <em class ="active-text" v-if = "menus.isEnable == 1">{{menus.isEnable | formatIsEnable}}</em>
                                        <em v-else>{{menus.isEnable | formatIsEnable}}</em>
                                    </td>
                                    <td class = "col-xs-5">{{menus.pageUrl}}</td>
                                    <td class = "col-xs-4">{{menus.createdAt | formatDate}}</td>
                                    <td v-if = "menus.isEnable == 0"><em class="agree-text" :id = "menus.id" @click = "enubleMenu($event,1)">启用</em></td>
                                    <td v-else><em class="agree-text" :id = "menus.id" @click = "enubleMenu($event,0)">停用</em></td>
                                    <td><em class="reject-text" :id = "menus.id" @click = "deleteMenu($event)">删除</em></td>
                                    <td><router-link class="agree-text" :id = "menus.id" :to='"/menu_management/edit/"+menus.id'>编辑</router-link></td>
                                </tr>
                            </table>
                            <div class = "collapseBtn pull-left col-xs-1" v-if = "menus.sublist.length > 0 && menus.isEnable == 1">
                                <a :class = "{'collapsed':!menus.isSpread}" data-toggle="collapse" data-parent="#accordion" :href='"#collapseOne"+menus.id'>
                                </a>
                            </div>
                        </div>
                        <div :id='"collapseOne"+menus.id'  class="panel-collapse collapse col-xs-23" :class = "{'in':menus.isSpread}" v-if = "menus.sublist.length > 0 && menus.isEnable == 1">
                            <table class="display menu-table ic-table col-xs-24">
                                <tr  v-for = "sub in menus.sublist">
                                    <td class = "col-xs-8">{{sub.secondMenuName}}</td>
                                    <td class = "col-xs-3">
                                        <em class ="active-text" v-if = "sub.isEnable == 1">{{sub.isEnable | formatIsEnable}}</em>
                                        <em v-else>{{sub.isEnable | formatIsEnable}}</em>
                                    </td>
                                    <td class = "col-xs-5">{{sub.pageUrl}}</td>
                                    <td class = "col-xs-4">{{sub.createdAt | formatDate}}</td>
                                    <td v-if = "sub.isEnable == 0"><em class="agree-text" :id = "sub.id" @click = "enubleMenu($event,1)">启用</em></td>
                                    <td v-else><em class="agree-text" :id = "sub.id" @click = "enubleMenu($event,0)">停用</em></td>
                                    <td><em class="reject-text" :id = "sub.id" @click = "deleteMenu($event)">删除</em></td>
                                    <td><router-link class="agree-text" :id = "sub.id" :to='"/menu_management/edit/"+sub.id'>编辑</router-link></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
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
<style lang="less" scoped>
    .agree-text {
        color: #1aa3ab;
    }
    .reject-text {
        color: #ff1616;
    }
    .active-text {
        color: #ffae78;
    }
    .box,#right-side {
        min-height: 100%;
    }
    .menulist-box {
        margin-top: 80px;
        margin-left: 20px;

        .menulist-tit-box {
            margin-bottom: 15px;
        }
        .panel {
            background-color: transparent;
            border: 0;
            box-shadow: 0 0 0;
        }
        .menulist-item-box {
            margin-bottom: 15px;
        }
        .menu-table {
            tr {
                height: 40px;
            }
            tr:nth-of-type(even){
                background: #f9f9f9;
            }
            th,td {
               padding-left: 20px;
               overflow: hidden;
            }
            .agree-button {
                width: 60%;
                display: block;
                text-align: center;
                height: 30px;
                line-height: 30px;
                text-decoration: none;
            }
        }
        table{
            background: #fff;
            color: #666;
            tr {
                border-bottom: 1px solid #eee;
                .firstMenuName {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
    }
    .collapseBtn {
        height: 51px;
        border: 1px solid #eee;
        background-color: #fff;
        a {
            display: block;
            height: 51px;
            background:url(../../../static/img/arrow-down.png) no-repeat center;
        }
        a.collapsed {
            background:url(../../../static/img/arrow-up.png) no-repeat center;
        }
    }
</style>
<script>
import Remind from '../Remind.vue'
import store from '../../store'
	export default {
		data(){
			return {
				menuList : '',//菜单列表信息
                currentId:'',//当前操作的菜单的ID
                searchMenuName: '',
                remind:{
                    status:'',
                    msg:''
                },
                isManage: true,
			}
		},
        components:{
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
                    this.searchMenu(); 
                }
            }
        },
		methods:{
            //搜索菜单栏列表
            searchMenu(){
                const getUrl = 'menu/getMenus';
                this.$http.get(getUrl).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.menuList = res.data.data.menuDtos;
                        //控制初始启用了的菜单的第一条是展开状态，其他是闭合的
                        for (let i = 0;i < this.menuList.length;i++) {
                            this.menuList[i].isSpread = false;
                            if(this.menuList[i].isEnable == 1) {
                                this.menuList[i].isSpread = true;
                                break;
                            }
                        }
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
                        this.searchMenu();
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
            //加载菜单列表
            this.searchMenu(); 
            //初始为编辑页时隐藏管理页
            this.hideMenuList();
        },
        updated(){
            $('#table_id_example').tableHover();
        }
	};
</script>