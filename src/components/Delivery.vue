<template>
	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-8 select-box">
                            <label for="prisonId">所属监狱</label>
                            <select class="form-control" id="prisonId" @change = "getPrisonDepartInfo" :disabled = "prisons.length == 1" v-model = "prisonId">
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
                            <label for="status">状态</label>
                            <select class="form-control" id="status" v-model = "status">
                                <option v-for = "status in statusList" :value = "status.value">{{status.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 text-box">
                            <label for="virtualAccount">虚拟账号</label>
                            <input type="text" class="form-control" id="virtualAccount" v-model = "virtualAccount">
                        </div>
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
                            <input type="button" value="搜索" class="search-button" @click = "getDeliveryList(1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="绑定虚拟账号" class="agree-button" @click="bindAccount(1)">
            </div>
            <div class="col-xs-2">
                <input type="button" value="绑定全部虚拟账号" class="bind-button" @click="bindAccount(2)">
            </div>
            <div class="col-xs-2 pull-right">
                <button class="btn ">导出数据</button>
                <div class="glyphicons glyphicons-search"></div>
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
                            <th>虚拟账号</th>
                            <th>身份证</th>
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>绑定状态</th>
                            <th colspan="2">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for = "delivery in deliveryList">
                        <td><div class="info-check info-list-check" v-if = "delivery.canBind == 0" :id = "delivery.Id"></div></td>
                        <td>{{delivery.name}}</td>
                        <td>{{delivery.number}}</td>
                        <td>{{delivery.archives_number}}</td>
                        <td>{{delivery.virtualAccount}}</td>
                        <td>{{delivery.card_no}}</td>
                        <td>{{delivery.prisonName}}</td>
                        <td>{{delivery.prisonDepartmentName}}</td>
                        <td>{{delivery.canBind | formatDeliveryStatus}}</td>
                        <td v-if = "delivery.canBind == 0" colspan="2"><em class="agree-text" :id = "delivery.Id" @click="bindAccount(0,$event)">绑定虚拟账号</em></td>
                        <td v-if = "delivery.canBind == 1" colspan="2"><em class="agree-text" :id = "delivery.Id" @click="bindIC($event)">绑定IC卡</em></td>
                        <td v-if = "delivery.canBind == 2"><em class="reject-text" :id = "delivery.Id" @click="remove($event)">解除绑定</em></td>
                        <td v-if = "delivery.canBind == 2"><em class="reject-text" :id = "delivery.Id" @click="removeIC($event)">解除IC卡绑定</em></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize = "deliverySize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getDeliveryList"></Page>
        </div>

        <!--模态框-->

        <!--绑定IC卡 -->
        <div class="modal modal-confirm modal-bind" id="bindConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body" v-if = "bindIcInfo != ''">
                        <h2>绑定IC卡</h2>
                        <div class="clearfix bind-info">
                            <img :src="bindIcInfo.prisoner.imgUrl" alt="" class="pull-left bind-img">
                            <ul class="pull-left clearfix bind-info-list">
                                <li class="clearfix"><span class="pull-left info-label">罪犯名</span><span class="pull-right">{{bindIcInfo.prisoner.name}}</span></li>
                                <li class="clearfix"><span class="pull-left info-label">所属监狱</span><span class="pull-right">{{bindIcInfo.prison}}</span></li>
                                <li class="clearfix"><span class="pull-left info-label">所属监区</span><span class="pull-right">{{bindIcInfo.department}}</span></li>
                                <li class="clearfix"><span class="pull-left info-label">档案号</span><span class="pull-right">{{bindIcInfo.prisoner.archivesNumber}}</span></li>
                                <li class="clearfix"><span class="pull-left info-label">卡内余额</span><span class="pull-right">{{bindIcInfo.total}}</span></li>
                            </ul>
                        </div>
                        <div class="fee-select">
                            <p>是否扣除卡费</p>
                            <div class="clearfix">
                                <div class = "pull-left" @click = "changeType(1)">
                                    <span class="fee-radio pull-left" :class = "{'active':type}"><em></em></span><span class="pull-left fee-label">是</span>
                                </div>
                                <div class = "pull-left" @click = "changeType(0)">
                                    <span class="fee-radio pull-left" :class = "{'active':!type}"><em></em></span><span class="pull-left fee-label">否</span>
                                </div>
                            </div>
                        </div>
                        <input type="text" class="form-control fee-input" id="cardCost" placeholder="输入补卡费" v-model = "cardCost" v-show = "type == 1">
                        <input type="text" class="form-control fee-input" id="icCardNo" placeholder="输入IC卡号进行绑定" v-model = "icCardNo">
                        <button class="confirm-button" data-dismiss="modal" @click = "bindIcConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 绑定虚拟账号-->
        <div class="modal modal-confirm" id="examConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3 v-if = "bindType == 2">确认绑定全部虚拟账号</h3>
                        <h3 v-else>确认绑定虚拟账号</h3>
                        <button class="confirm-button" data-dismiss="modal" @click = "bindAccountConfirm(bindType)">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 解除绑定-->
        <div class="modal modal-confirm" id="removeConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认解除绑定?</h3>
                        <p>将会同时解除IC卡绑定与虚拟账号绑定</p>
                        <button class="confirm-button" data-dismiss="modal" @click = "removeConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 解除IC卡绑定-->
        <div class="modal modal-confirm" id="removeICConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认解除IC卡绑定?</h3>
                        <button class="confirm-button" data-dismiss="modal" @click = "removeIcConfirm">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>

<script>
import Remind from './Remind.vue'
import store from './../store'
import Page from './Paginator.vue'
	export default {
		data(){
			return{
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//分发状态列表
                deliveryList: "",//分发列表
                deliverySize: "",//分发数据条数
                prisonId: "",//监狱ID
                prisonDepartmentId: "",//监区ID
                status: "",//状态
                archivesNumber: "",//档案号
                virtualAccount: "",//虚拟账号
                number: "",//编号
                name: "",//罪犯名
                prisonerId: "",//当前处理的罪犯ID
                bindIcInfo: "",//绑定IC卡所需信息
                icCardNo: "",//绑定的IC卡号
                bindType: "",//绑定虚拟账号的方式  0-单个 1-批量 2-全部
                type: 0,//绑定时是否扣费  1-扣费 0-不扣费
                cardCost: "",//卡费
                ids: "",//当前批量处理的罪犯ID列表
                lastSearchData: "",
                remind:{
                    status:'',
                    msg:''
                },
                pageSize: 10,
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
        methods:{
            getStatusList(){//赋值状态列表
                this.statusList = [{"value":"","name":"全部"},{"value":0,"name":"未绑定"},{"value":1,"name":"已绑定虚拟账户"},{"value":2,"name":"已绑定IC卡"}]
            },

            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        if (this.prisons.length == 1) {
                            this.prisonId = this.prisons[0].id;
                            this.getPrisonDepartInfo();
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getPrisonDepartInfo () {//获取监区信息
                this.prisonDepartments = "";
                this.prisonDepartmentId = "";
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            getDeliveryList(index){
                this.indexPage = index;
                let searchData = {
                    "prisonId": this.prisonId,
                    "prisonDepartmentId": this.prisonDepartmentId,
                    "status":this.status,
                    "name": this.name.replace(/(^\s*)|(\s*$)/g,""),
                    "virtualAccount": this.virtualAccount.replace(/(^\s*)|(\s*$)/g,""),
                    "number": this.number.replace(/(^\s*)|(\s*$)/g,""),
                    "archivesNumber":this.archivesNumber.replace(/(^\s*)|(\s*$)/g,""),
                    "indexPage":this.indexPage,
                    "pageSize":this.pageSize
                };
                console.log(searchData);
                this.lastSearchData = searchData;
                this.$http.get('icCard/cardPrisoners',{params:searchData}).then(res=>{
                    console.log("列表");
                    console.log(res);
                    if (res.data.code == 0) {
                       this.deliveryList = res.data.data.prisoners;//赋值分发列表
                       this.deliverySize = res.data.data.prisonerSize;//赋值分发列表数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            bindIC(e){
                this.prisonerId = e.target.getAttribute("id");
                this.$http.get('icCard/toBindingCard',{params: {"prisonerId":this.prisonerId}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                        this.bindIcInfo = res.data.data;
                        console.log(this.bindIcInfo);
                        $('#bindConfirm').modal();
                    }
                }).catch(err=>{
                    console.log(err);
                }); 
            },

            changeType(oldType) {
                if (oldType == 1) {
                    this.type = 1;
                }else if (oldType == 0) {
                    this.type = 0;
                }
            },

            bindIcConfirm() {
                if (this.icCardNo == "" || (this.type == 1 && this.cardCost == "")) {//选了收费却未填金额
                    this.remind = {
                        status:'warn',
                        msg:'请填写完整再进行提交'
                    }
                    store.dispatch('showRemind');
                } else {
                    let cardCost = this.type == 0 ? 0 : this.cardCost.replace(/(^\s*)|(\s*$)/g,"");
                    let deliveryData = {
                        "prisonerId": this.prisonerId,
                        "icCardNo": this.icCardNo.replace(/(^\s*)|(\s*$)/g,""),
                        "type": this.type,
                        "cardCost": cardCost*100
                    };
                    console.log(deliveryData);
                    this.$http.post("icCard/bindingCard",$.param(deliveryData)).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功
                            this.getDeliveryList(1);
                            this.type = 0;//进行绑定IC模态框的重置
                            this.cardCost = "";
                            this.icCardNo = "";
                            this.prisonerId = "";
                        }
                        alert(res.data.msg);
                    }).catch(err=>{
                        console.log('申请服务器异常' + err);
                    });
                }
            },

            bindAccount(bindType,e){
                this.bindType = bindType;
                if (bindType == 0) {//单个绑定
                    this.prisonerId = e.target.getAttribute("id");
                    $('#examConfirm').modal();
                }else if (bindType == 1) {//批量绑定
                    let checkedInfo = $(".info-list-check").filter(".active");
                    if (checkedInfo.length > 0) {
                        let prisonerIds = new Array();//批量绑定虚拟账号的ID数组
                        for (let i = 0;i < checkedInfo.length; i ++) {
                            prisonerIds.push(checkedInfo[i].getAttribute("id"));
                        }
                        this.ids = prisonerIds.join(',');
                        $('#examConfirm').modal();
                    }else {
                        this.remind = {
                            status:'warn',
                            msg:'请先选择要绑定的虚拟账号数据'
                        }
                        store.dispatch('showRemind');
                    } 
                }else {
                    $('#examConfirm').modal();
                }
                
            },

            bindAccountConfirm(bindType) {
                console.log(bindType);
                if (bindType == 0) {//单个绑定
                    let deliveryData = {
                        "prisonerId": this.prisonerId
                    };
                    this.$http.post("icCard/bindingVirtualAccount",$.param(deliveryData)).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功
                            this.getDeliveryList(1);
                        }
                        alert(res.data.msg);
                    }).catch(err=>{
                        console.log('申请服务器异常' + err);
                    });
                }else if (bindType == 1) {//批量绑定
                    let deliveryData = {
                        "ids": this.ids
                    };
                    this.$http.post("icCard/bindingAccounts",$.param(deliveryData)).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功
                            this.getDeliveryList(1);
                        }
                        alert(res.data.msg);
                    }).catch(err=>{
                        console.log('申请服务器异常' + err);
                    });
                }else if (bindType == 2) {//全部绑定
                    let bindAllData = {
                        "prisonId": this.lastSearchData.prisonId,
                        "prisonDepartmentId": this.lastSearchData.prisonDepartmentId,
                        "name": this.lastSearchData.name,
                        "virtualAccount": this.lastSearchData.virtualAccount,
                        "number": this.lastSearchData.number,
                        "archivesNumber":this.lastSearchData.archivesNumber
                    };
                    console.log(bindAllData);
                    this.$http.post("icCard/bindingAllAccounts",$.param(bindAllData)).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        alert(res.data.msg);
                        if (status == 0) {//返回成功
                            this.getDeliveryList(1);
                        }
                    }).catch(err=>{
                        console.log('申请服务器异常' + err);
                    });
                }
                
            },

            remove(e){
                this.prisonerId = e.target.getAttribute("id");
                $('#removeConfirm').modal();
            },

            removeConfirm() {
                let deliveryData = {
                    "prisonerId": this.prisonerId
                };
                this.$http.post("icCard/unbindingPrisoner",$.param(deliveryData)).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.getDeliveryList(1);
                    }
                    alert(res.data.msg);
                }).catch(err=>{
                    console.log('申请服务器异常' + err);
                });
            },

            removeIC(e){
                this.prisonerId = e.target.getAttribute("id");
                $('#removeICConfirm').modal();
            },

            removeIcConfirm() {
                let deliveryData = {
                    "prisonerId": this.prisonerId
                };
                this.$http.post("icCard/unbindingCard",$.param(deliveryData)).then(res=>{
                    console.log(res);
                    let status = res.data.code;
                    if (status == 0) {//返回成功
                        this.getDeliveryList(1);
                    }
                    alert(res.data.msg);
                }).catch(err=>{
                    console.log('申请服务器异常' + err);
                });
            },

        },
        components:{
            Page,
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getStatusList();
            this.getPrisonInfo();
            this.getDeliveryList(1);
        }
	}
</script>

<style lang="less" scoped>
    #removeConfirm{
        .modal-body{
            p{
                color:#B2B2B2;
                margin-top:25px;
            }
        }
    }
    #bindConfirm{
        .modal-body{
            img {
                height: 125px;
                background: #fff;
            }
        }
    }
    h2,h3{
        font-weight:bold;
    }
</style>