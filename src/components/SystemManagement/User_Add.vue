<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="userName"><em class="important">*</em> 账户登录名 :</label>
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
                                <label class="pull-right" for="password"><em class="important">*</em> 密码 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="password" class="form-control" id="password" v-model = "userInfo.password">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="userType"><em class="important">*</em> 账号类型 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control"  id="userType" @change = "userTypeChange('','')" v-model = "userInfo.userType">
                                    <option v-for = "userType in userTypeList" :value="userType.value">{{userType.name}}</option>
                                </select>    
                            </div>
                        </div>
                        
                        <div class="row" v-show = "prisonShow">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="prisonId"><em class="important">*</em> 所属监狱 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <input type="text" class="form-control" list = "prisonList" placeholder = "请选择" v-model = "prisonName">
                                <datalist class="form-control hidden" id="prisonList">
                                    <option v-for = "prison in prisonList">{{prison.prisonName}}</option>
                                </datalist>
                            </div>
                        </div>
                        <div class="row" v-show = "shopShow">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="accountId"><em class="important">*</em> 所属商户 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="accountId" v-model = "userInfo.prisonAccountId">
                                    <option v-for = "shop in shopList" :value="shop.id">{{shop.accountName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="roleId"><em class="important">*</em> 角色 :</label>
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

            <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
    import Remind from '../Remind.vue'
    import store from '../../store'
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
                prisonName: "",
                userInfo: {
                    "userName": "",
                    "realName": "",
                    "password": "", 
                    "userType":0,
                    "prisonId":"",
                    "prisonAccountId":"",
                    "roleId":""
                },
                remind:{
                    status:'',
                    msg:''
                },
                isAdd: true //默认是新增状态
			}
		},
        watch: {
            prisonName(){
                let oldPrisonId = this.userInfo.prisonId;
                for (let i = 0; i< this.prisonList.length; i++)  {
                    if (this.prisonList[i].prisonName == this.prisonName) {
                        this.userInfo.prisonId = this.prisonList[i].id;
                    }
                }
                // console.log('监狱'+this.userInfo.prisonId);
                if (this.userInfo.prisonId != oldPrisonId && this.userInfo.userType == 3) {
                    this.prisonChange();
                }else {
                   // this.userInfo.prisonId = "";
                    this.shopList = "";
                }
            }

        },
        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
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
                    // console.log(res);
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
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisonList = res.data.data.prisons;
                        if (this.isAdd != true) {
                            this.userInfo.prisonId = prisonId;
                            //根据相应的监狱ID来获取监狱名进行显示
                            for (let i = 0; i< this.prisonList.length; i++)  {
                                if (this.prisonList[i].id == this.userInfo.prisonId) {
                                    this.prisonName = this.prisonList[i].prisonName;
                                }
                            }
                        }
                        if (this.userInfo.userType == 3) {//为监狱商户时出现商户下拉框进行选择
                            this.shopShow = true;
                            this.prisonChange(prisonAccountId)//获取商户列表
                        }else {
                            this.shopShow = false;
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            prisonChange(prisonAccountId){//获取商户列表
                let prisonId = this.userInfo.prisonId;
                // console.log('prisonId'+this.userInfo.prisonId);
                this.$http.get('prisonAccount/getPrisonAccountsByPrisonId',{params:{'prisonId':prisonId}}).then(res=>{
                    // console.log(res);
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

            userTypeChange (prisonId,prisonAccountId) {
                   let userType = this.userInfo.userType;
                   this.prisonName = "";
                   this.userInfo.prisonId = "";
                   // console.log(userType);
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
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.userInfo = res.data.data;
                            let prisonId = this.userInfo.prisonId;
                            let prisonAccountId = this.userInfo.prisonAccountId;
                            let roleId = this.userInfo.roleId;
                            // console.log(this.userInfo);  
                            this.userTypeChange(prisonId,prisonAccountId);
                            // console.log("prisonAccount" + prisonAccountId);
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
                let type = this.userInfo.userType;
                let prisonAccountId = type == 3 ? this.userInfo.prisonAccountId : "";
                let id = this.$route.params.id;
                if (userName != "" && (id != undefined || password != "")) {
                    let addUrl = "addOrUpdateUser";
                    let addData = {
                        "id": id,
                        "userName": userName,
                        "realName": this.userInfo.realName.replace(/(^\s*)|(\s*$)/g,""),
                        "password": password,
                        "userType": type,
                        "prisonId": this.userInfo.prisonId,
                        "prisonAccountId": prisonAccountId,
                        "roleId": this.userInfo.roleId
                    }
                    // console.log(addData);
                    this.$http.post(addUrl,$.param(addData)).then(res=>{
                        // console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功 
                            store.dispatch('reloadSide');
                            this.$router.push({path:"/user_management"});
                        }else {
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            }
                            store.dispatch('showRemind');
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }else {
                    this.remind = {
                        status:'warn',
                        msg:'请填写完整后再进行提交'
                    }
                    store.dispatch('showRemind');
                }              
            }
		},
        components:{
            Remind
        },
        mounted(){
            this.getUserTypeList();//获取账户类型列表
            this.getEditInfo();//获取单条编辑信息
        }
	}
</script>

<style lang="less" scoped>
#right-side{
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