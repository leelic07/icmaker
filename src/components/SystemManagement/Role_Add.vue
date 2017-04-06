<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label for="name">角色名称 :</label>
                            </div>
                            <div class="col-xs-5 text-box">
                                <input type="text" class="form-control" id = "roleName" v-model = "roleName"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 添加角色-->
            <div id="addRole" class="col-xs-24 add">
                <div class="col-xs-23 menu-box-list">
                    <div class="menu-box clearfix" v-for = "menu in firstMenuList">
                        <div class="col-xs-20 col-xs-push-2 role-inner" :pId = "menu.id">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">{{menu.menuName}}</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first" v-for = "subMenu in menu.subMenuList">
                                <span class="pull-left">{{subMenu.menuName}}</span>
                                <div class="info-check pull-right role-check"  :id = "subMenu.id"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                </div>
            </div>

            <!-- 确认添加-->
            <div id="addButtonBox" class="col-xs-4 col-xs-offset-10 add-roll-button-box">
                <input type="button" value="确认添加" class="add-button" id = "addRollButton" @click = "addRole">
            </div>
        </div>
</template>
<style lang="less" scoped>
    #right-side {
        .menu-box-list {
            -moz-column-count:2; /* Firefox */
            -webkit-column-count:2; /* Safari 和 Chrome */
            column-count:2;
            -moz-column-gap: 1em;
            -webkit-column-gap: 1em;
            column-gap: 1em;
        }
        .menu-box {
            -moz-page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
            break-inside: avoid;
            width: 100%;

        }
    }
   
</style>
<script>
	export default {
		data(){
			return {
                firstMenuList:"",
                secondMenuList:"",
                roleName:""
			}
		},
		methods:{
            getFirstMenuList(){//获取菜单列表
                this.$http.get('role/getMenuHierarchys',{params:{'type':0}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.firstMenuList = res.data.data;
                        this.getEditInfo();
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getEditInfo(){//点击编辑时获取角色原有的权限和信息
                let id = this.$route.params.id;
                this.$http.get('/role/getRole',{params:{'roleId':id}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        let editInfo = res.data.data;
                        this.roleName = editInfo.roleName;//绑定角色名称
                        let checkbox = $("#addRole .role-check");
                        for(let i = 0; i < editInfo.roleMenus.length; i++){
                           let checkedId = editInfo.roleMenus[i].menuId;
                            for(let j =0 ;j < checkbox.length; j++) {
                                let listId = checkbox[j].getAttribute("id");
                                if (checkedId == listId) {
                                    $(checkbox[j]).addClass("active");//绑定已有权限
                                }
                            }
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            addRole(){
                let menuIdsArr = [];
                let checkedbox = $("#addRole .role-check").filter(".active");//勾选的子类
                let pCheckedBox =checkedbox.parents(".role-inner");//对应的父类
                let id = this.$route.params.id;
                let roleName = this.roleName.replace(/(^\s*)|(\s*$)/g,"");
                for (let i =0;i < checkedbox.length; i++) {//将勾选的子类ID加入
                    menuIdsArr.push(checkedbox[i].getAttribute("id"));
                }
                for (let i =0;i < pCheckedBox.length; i++) {//将对应的父类ID加入
                    menuIdsArr.push(pCheckedBox[i].getAttribute("pid"));
                }
                let roleData = {
                    "roleId" : id,
                    "roleName" : roleName,
                    "menuIds" : menuIdsArr.join(),
                }
                if (roleName == "") {
                    alert("请填写角色名称");
                }else if (menuIdsArr.length <=0){
                    alert("请选择对应的权限");
                } else {
                    console.log(roleData);
                    this.$http.post('role/addOrUpdateRole',$.param(roleData)).then(res=>{
                        console.log(res);
                        alert(res.data.msg);
                        if (res.data.code == 0) {
                            this.$router.push({path:"/role_management"});    
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            }
		},

        mounted(){
            $('#addRole').selectRole();
            this.getFirstMenuList();
        }
	}
</script>

<style lang="less" scoped>
#right-side{
    .text-box{
        padding:20px 0;
    }
    .label-box{
        padding:25px 0 0 0;
        text-align:center;
    }
    .search-inner-box{
        background-color:#fff;
    }

    .label-box label{
        font-weight:normal;
    }
    .add-button {
        color: #fff;
        font-size: 15px;
        background: #1aa3ab;
        width: 90%;
        height: 40px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        border: 1px solid #1aa3ab;
    }
    .add-roll-button-box {
        margin-bottom: 10px;
    }
    .add {
        >div {
            >div {
                margin: 10px;
            }
        }
    }
}
</style>