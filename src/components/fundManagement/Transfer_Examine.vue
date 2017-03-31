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
                                    <option value='3'>内部转账</option>
                                    <option value='4'>外部转账</option>
                                </select>
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-xs-8 select-box">
                                <label for="name">所属监狱</label>
                                <select class="form-control" v-model='prisonId'>
                                    <option v-show='prisonList.length>1' value=''>请选择</option>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select>
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
                    <input type="button" value="同意" class="agree-button"></input>
                </div>
                <div class="col-xs-2">
                    <input type="button" value="拒绝" class="reject-button">
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
                                <td><div class="info-check"></div></td>
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
        </div>
</template>

<script>
import Page from '../Paginator.vue'
	export default {
		data(){
			return {
                indexPage:1,
                pageSize:20,
                menuSize:'',
                accountName:'',
                accountType:'',
                type:'',
                prisonId:'',
                prisonList:[],
                prisonCapitalTransfers:[]
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
                }).catch(err=>{
                    console.log(err);
                });
            },
        },
        components:{
            Page
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
	}
</style>