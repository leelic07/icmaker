<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">账户类型</label>
                                <select class="form-control" v-model='accountType'>
                                    <option value=''>请选择</option>
                                    <option value='0'>财务账户</option>
                                    <option value='1'>商户账户</option>
                                    <option value='2'>监狱总账户</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">转账账户名</label>
                                <input type="" name="" class='form-control' v-model='accountName'>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">转账类型</label>
                                <select class="form-control" v-model='type'>
                                    <option value=''>请选择</option>
                                    <option value='4'>内部转账</option>
                                    <option value='5'>外部转账</option>
                                </select>
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-xs-8 select-box">
                                <!-- <label for="name">所属监狱</label>
                                <select class="form-control" v-model='prisonId' :disabled='prisonList.length <= 1'>
                                    <option v-if='prisonList.length > 1' value=''>请选择</option>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select> -->
                                <label for="name">所属监狱</label>
                                <input list="prisons" placeholder="请选择" class='form-control' v-model='prisonName' v-if='prisonList.length > 1'>
                                <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1' disabled>
                                <datalist id="prisons">
                                    <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
                                </datalist>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click='searchRecord()'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--按钮组部分-->
            <div class="col-xs-24 button">
                <div class="col-xs-2">
                    <input type="button" value="同意" class="agree-button" @click="agree()"></input>
                </div>
                <div class="col-xs-2">
                    <input type="button" value="拒绝" class="reject-button" @click="reject()">
                </div>
            </div>

            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                            <tr>
                                <th><div class="info-check"></div></th>
                                <th>转账所属监狱</th>
                                <th>转账所属监区</th>
                                <th>转账账户名</th>
                                <th>入账账户名</th>
                                <th>入账银行账号</th>
                                <th>入账开户银行</th>
                                <th>入账余额</th>
                                <th>申请人</th>
                                <th>申请时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='pct in prisonCapitalTransfers'>
                                <td><div class="info-check info-list-check" :id='pct.prisonCapitalDetailId'></div></td>
                                <td v-text='pct.prisonName'>出入监区</td>
                                <td v-text='pct.prisonDepartmetName'></td>
                                <td v-text='pct.accountName'></td>
                                <td v-text='pct.toAccountName'></td>
                                <td v-text='pct.toAccountNo'></td>
                                <td v-text='pct.bankName'></td>
                                <td>{{pct.money | currency}}</td>
                                <td v-text='pct.userName'></td>
                                <td>{{pct.createdAt | formatDate}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 表单底部-->
                <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchRecord'></Page>
            </div>

            <!--模态框-->

            <!--拒绝理由-->
            <div class="modal modal-confirm" id="rejectConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>拒绝理由</h3>
                            <textarea class="form-control" rows="5" v-model='remark' placeholder="拒绝理由..."></textarea>
                            <button class="confirm-button" @click='rejectExamine()'>提交</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>

            <!-- 同意通过审核-->
            <div class="modal modal-confirm" id="agreeConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>同意审核？</h3>
                            <button class="confirm-button" @click="agreeExamine()" data-dismiss='modal'>确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
            
            <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>
        </div>
</template>

<script>
import Page from '../Paginator.vue'
import Remind from '../Remind.vue'
import store from '../../store'
	export default {
		data(){
			return {
                indexPage:1,
                pageSize:10,
                menuSize:'',
                accountName:'',
                accountType:'',
                type:'',
                prisonList:[],
                prisonId:'',
                prisonName:'',
                prisonCapitalTransfers:[],
                ids:[],
                remark:'',
                remind:{
                    status:'',
                    msg:''
                }
			}
		},
        computed:{
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
        watch:{
            //根据监狱名称得到监狱ID
             prisonName(){
                this.prisonId = '';
                if(this.prisonName != ''){
                    $.each(this.prisonList,(index,value)=>{
                        if(value.prisonName == this.prisonName){
                            this.prisonId = value.id;
                        }
                    });
                    if(this.prisonId == ''){
                        this.prisonId = -1
                    }
                }else{
                    this.prisonId = '';
                }            
            }
        },
        methods:{
            //获取所有转账记录
            getTransferRecords(){
                this.$http({
                    method:'get',
                    url:'/prisonCapital/getCapitalTransfers',
                    params:{
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonCapitalTransfers = data.prisonCapitalTransfers;
                    this.menuSize = data.prisonCapitalTransferSize;
                }).catch(err=>{
                    console.log(err);
                });
            },

            //点击搜索查询转账记录
            searchRecord(index){
                this.indexPage = index;
                this.$http({
                    method:'get',
                    url:'/prisonCapital/getCapitalTransfers',
                    params:{
                        accountName:this.accountName,
                        accountType:this.accountType,
                        type:this.type,
                        prisonId:this.prisonId,
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonCapitalTransfers = data.prisonCapitalTransfers;
                    this.menuSize = data.prisonCapitalTransferSize;
                }).catch(err=>{
                    console.log(res.data.data);
                });
            },

            //查询所有监狱列表
            getAllPrison(){
                this.$http({
                    method:'get',
                    url:'/prisoner/toAddOrEdit',
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonList = data.prisons;
                    if(this.prisonList.length == 1){
                        this.prisonId = this.prisonList[0].id;
                        this.prisonName = this.prisonList[0].prisonName;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            //获取选中的项目
            getAllSelectedRecords() {
                let checkedInfo = $(".info-list-check").filter(".active");
                let prisonerIds = new Array();//批量转监狱罪犯审核的ID数组
                for (let i = 0;i < checkedInfo.length; i ++) {
                    prisonerIds.push(checkedInfo[i].getAttribute("id"));
                }
                this.ids = prisonerIds; 
            },

            //点击同意按钮
            agree(){
                this.getAllSelectedRecords();
                if(this.ids.length == 0){
                    this.remind = {
                        status:'warn',
                        msg:'请选择'
                    }
                    store.dispatch('showRemind');
                    return;
                }else{
                    $('#agreeConfirm').modal();
                }
            },

            //点击拒绝按钮
            reject(){
                this.getAllSelectedRecords();
                if(this.ids.length == 0){
                    this.remind = {
                        status:'warn',
                        msg:'请选择'
                    }
                    store.dispatch('showRemind');
                    return;
                }else{
                    $('#rejectConfirm').modal();
                }
            },


            //转账审核同意
            agreeExamine(){
                let params = {};
                let url = '';
                if(this.ids.length > 1){
                    params = {
                        reviewStatus:1,
                        prisonCapitalDetailIds:this.ids.join(',')
                    }
                    url = '/prisonCapital/batchReviewCapitalTransfers';
                }else if(this.ids.length == 1){
                    params = {
                        reviewStatus:1,
                        prisonCapitalDetailId:this.ids.join(',')
                    }
                    url = '/prisonCapital/reviewCapitalTransfers';
                }

                this.$http({
                    method:'post',
                    'url':url,
                    'params':params
                }).then(res=>{
                    if(res.data.code == 0){
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.searchRecord(this.indexPage);
                    }else{
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                        console.log(res.data.code,res.data.msg);
                    }

                    store.dispatch('showRemind');
                }).catch(err=>{
                    console.log(err);
                });
            },

            //转账审核拒绝
            rejectExamine(){
                let params = {};
                let url = '';
                if(this.isNull(this.remark)){
                    this.remind = {
                        status:'warn',
                        msg:'请填写拒绝理由'
                    };
                    store.dispatch('showRemind');
                    return;
                }

                if(this.ids.length > 1){
                    params = {
                        reviewStatus:2,
                        prisonCapitalDetailIds:this.ids.join(','),
                        remark:this.remark
                    }
                    url = '/prisonCapital/batchReviewCapitalTransfers';
                }else if(this.ids.length == 1){
                    params = {
                        reviewStatus:2,
                        prisonCapitalDetailId:this.ids.join(','),
                        remark:this.remark
                    }
                    url = '/prisonCapital/reviewCapitalTransfers';
                }

                this.$http({
                    method:'post',
                    'url':url,
                    'params':params
                }).then(res=>{
                    if(res.data.code == 0){
                        this.remind = {
                            status:'success',
                            msg:res.data.msg
                        }
                        this.searchRecord(this.indexPage);
                    }else{
                        this.remind = {
                            status:'failed',
                            msg:res.data.msg
                        }
                        console.log(res.data.code,res.data.msg);
                    }
                    store.dispatch('showRemind');
                    $('#rejectConfirm').modal('hide');
                    this.remark = '';
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        components:{
            Page,
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
            this.getTransferRecords();
            this.getAllPrison();
        }
	}
</script>

<style lang="less" scoped>
	#right-side{
		.select-box{
        	padding:20px 50px 20px 40px;
    	}

        #rejectConfirm{
            textarea{
                margin-top:30px;
            }
        }
	}
</style>