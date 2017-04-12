<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="accountNo"><em class="important">*</em> 虚拟账号 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="accountNo" v-model = "accountInfo.accountNo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="type"><em class="important">*</em> 账号类型 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control"  id="accountType" @change = "accountTypeChange" v-model = "accountInfo.type">
                                    <option v-for = "accountType in accountTypeList" :value="accountType.value">{{accountType.name}}</option>
                                </select>    
                            </div>
                        </div>
                        <div class="row" v-show = "prisonShow">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="prisonId"><em class="important">*</em> 所属监狱 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="prisonId"  v-model = "accountInfo.prisonId">
                                    <option v-for = "prison in allPrisonList" :value="prison.id">{{prison.prisonName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认" class="search-button" @click = "accountAdd">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
    import Remind from './Remind.vue'
    import store from './../store'
	export default {
		data(){
			return {
                prisonShow: true,
                accountTypeList: "",
                allPrisonList: "",
                accountInfo: {
                    "accountNo": "",
                    "type":0,
                    "prisonId":""
                },
                remind:{
                    status:'',
                    msg:''
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
            getAccountTypeList(){//初始化账号类型列表
                this.accountTypeList = [{//罪犯虚拟银行  监狱虚拟银行
                    "value": 0,
                    "name": "罪犯虚拟银行"
                },{
                    "value": 1,
                    "name": "监狱虚拟银行"
                },{
                    "value": 2,
                    "name": "监狱局"
                }]
            },

            getAllPrisonList(){//获取监狱列表
                this.$http.get('prisoner/getAllPrison').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                         this.allPrisonList = res.data.data;
                         this.accountInfo.prisonId = this.allPrisonList[0].id;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            accountTypeChange() {
                if (this.accountInfo.type == 2) {//为监狱局时不传监狱ID
                    this.prisonShow = false;
                } else {
                    this.prisonShow = true;
                }
                console.log(this.accountInfo.prisonId);
            },

            accountAdd () {//新增虚拟账号 
                let accountNo = this.accountInfo.accountNo.replace(/(^\s*)|(\s*$)/g,"");
                let prisonId = this.accountInfo.type == 2 ? "" : this.accountInfo.prisonId;
                let numReg = new RegExp("^[0-9]*$");
                if (accountNo != "" && numReg.test(accountNo)) {
                    let addData = {
                        "accountNo": accountNo,
                        "prisonId": prisonId,
                        "type": this.accountInfo.type
                    }
                    console.log(addData);
                    this.$http.post("icCard/addAccount",$.param(addData)).then(res=>{
                        console.log(res);
                        if (res.data.code == 0) {//返回成功 
                            this.$router.push({path:"/management"});
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
            this.getAccountTypeList();//获取账户类型列表
            this.getAllPrisonList();//获取所有的监狱列表
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