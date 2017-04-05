<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="userName"><em class="text-danger">*</em> 账户登录名 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="userName" v-model = "userInfo.userName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="realName">真实姓名 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="realName" v-model = "userInfo.realName">
                            </div>
                        </div>
                        <div class="row" v-show = "isAdd">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="password"><em class="text-danger">*</em> 密码 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="password" class="form-control" id="password" v-model = "userInfo.password">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="userType"><em class="text-danger">*</em> 账号类型 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control"  id="userType" @change = "userTypeChange($event)" v-model = "userInfo.userType">
                                    <option v-for = "userType in userTypeList" :value="userType.value">{{userType.name}}</option>
                                </select>    
                            </div>
                        </div>
                        
                        <div class="row" v-show = "prisonShow">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="prisonId"><em class="text-danger">*</em> 所属监狱 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="prisonId" @change = "prisonChange($event)" v-model = "userInfo.prisonId">
                                    <option v-for = "prison in prisonList" :value="prison.id">{{prison.prisonName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" v-show = "shopShow">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="accountId"><em class="text-danger">*</em> 所属商户 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="accountId" v-model = "userInfo.prisonAccountId">
                                    <option v-for = "shop in shopList" :value="shop.id">{{shop.accountName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="roleId"><em class="text-danger">*</em> 角色 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="roleId" v-model = "userInfo.roleId">
                                    <option v-for = "role in roleList" :value="role.id">{{role.roleName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认" class="search-button" @click = "userAdd">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
	export default {
		data(){
			return {
                prisonShow: false,
                shopShow: false,
                userTypeList: "",
                prisonList: "",
                shopList: "",
                roleList: "",
                userTypeChoise: 0,
                prisonChoise:"",
                userInfo: {
                    "userName": "",
                    "realName": "",
                    "password": "", 
                    "userType":0,
                    "prisonId":"",
                    "prisonAccountId":"",
                    "roleId":""
                },
                isAdd: true //默认是编辑状态
			}
		},
		methods:{
            getUserTypeList(){//初始化账号类型列表
                this.userTypeList = [{
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

            getRoleList(roleId){//获取角色列表
                this.$http.get('role/getRoleList').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.roleList = res.data.data;
                        if (this.isAdd == true) {//新增页面角色默认第一条数据选中
                            this.userInfo.roleId = this.roleList[0].id;
                        }else {
                            this.userInfo.roleId = roleId;
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonList(prisonId,prisonAccountId){//获取监狱列表
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonList = res.data.data.prisons;
                        if (this.isAdd == true) {//新增页面所属监狱默认第一条数据选中
                            this.userInfo.prisonId = this.prisonList[0].id;
                        }else {
                            this.userInfo.prisonId = prisonId;
                        }
                        if (this.userInfo.userType == 3) {//为监狱商户时出现商户下拉框进行选择
                            this.shopShow = true;
                            this.prisonChange(null,prisonAccountId)//获取商户列表
                        }else {
                            this.shopShow = false;
                        }
                        
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            prisonChange(e,prisonAccountId){//获取商户列表
                let prisonId = this.userInfo.prisonId;
                this.$http.get('prisonAccount/getPrisonAccountsByPrisonId',{params:{'prisonId':prisonId}}).then(res=>{
                    console.log("商户：");
                    console.log(res);
                    if (res.data.code == 0) {
                        this.shopList = res.data.data;
                        if (this.isAdd == true) {//新增页面所属商户默认第一条数据选中
                            this.userInfo.prisonAccountId = this.shopList[0].id;
                        }else {
                            this.userInfo.prisonAccountId = prisonAccountId;
                        }       
                    }
                }).catch(err=>{
                    console.log(err);
                });        
            },

            userTypeChange (e,prisonId,prisonAccountId) {
               let userType = this.userInfo.userType;
                   console.log(userType);
                   if (userType == 2 || userType == 3) {
                        this.prisonShow = true;
                        this.getPrisonList(prisonId,prisonAccountId);
                        
                   } else {
                        this.shopShow = false;
                        this.prisonShow = false;
                   }  
            },

            getEditInfo () {
                let id = this.$route.params.id;
                if (id != undefined) {//为编辑状态
                    this.isAdd = false;
                    this.$http.get('getUser',{params:{'sysUserId':id}}).then(res=>{
                        console.log ('编辑信息：');
                        console.log(res);
                        console.log("shenmegui");
                        if (res.data.code == 0) {
                            this.userInfo = res.data.data;
                            let prisonId = this.userInfo.prisonId;
                            let prisonAccountId = this.userInfo.prisonAccountId;
                            let roleId = this.userInfo.roleId;
                            console.log(this.userInfo);  
                            this.userTypeChange(null,prisonId,prisonAccountId);
                            console.log("prisonAccount" + prisonAccountId);
                            this.getRoleList(roleId);        
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }else {
                    this.isAdd = true;
                    this.getRoleList();//获取角色列表
                }
            },

            userAdd () {//新增/编辑用户
                let userName = this.userInfo.userName.replace(/(^\s*)|(\s*$)/g,"");
                let password = this.userInfo.password.replace(/(^\s*)|(\s*$)/g,"");
                let id = this.$route.params.id;
                console.log(userName);
                if (userName != "" ) {
                    let addUrl = "addOrUpdateUser";
                    let addData = {
                        "id": id,
                        "userName": userName,
                        "realName": this.userInfo.realName,
                        "password": password,
                        "userType": this.userInfo.userType,
                        "prisonId": this.userInfo.prisonId,
                        "prisonAccountId": this.userInfo.prisonAccountId,
                        "roleId": this.userInfo.roleId
                    }
                    console.log(addData);
                    this.$http.post(addUrl,$.param(addData)).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功 
                            alert(res.data.msg);
                            this.$router.go(0);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }else {
                    alert("请填写完整再提交");
                }
                              
            }
		},
        mounted(){
            this.getUserTypeList();//获取账户类型列表
            this.getEditInfo();//获取单条编辑信息
        }
	}
</script>

<style lang="less" scoped>
#right-side{
    position:fixed;
    bottom:0;
    right:0;
    top:0;
    background-color:#f5f5f5;
    .select-box{
        padding:10px;
    }

    .text-box{
        padding:10px;
    }

    .label-box{
        padding:16px 0 10px 0;
    }

    .search-inner-box{
        background-color:#fff;
    }

    label{
        font-weight:normal;
        color:#696969;
    }
}
</style>