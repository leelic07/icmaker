<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <!-- <div class="col-xs-8 select-box">
                                <label for="name">所属监狱</label>
                                <select class="form-control" v-model='prisonId' :disabled='prisonList.length <= 1'>
                                    <option v-if='prisonList.length > 1' value=''>请选择</option>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select>
                            </div> -->
                            <div class="col-xs-8 select-box">
                                <label for="name">所属监狱</label>
                                <input list="prisons" placeholder="请选择" class='form-control' v-model='prisonName' v-if='prisonList.length > 1'>
                                <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1' disabled>
                                <datalist id="prisons">
                                    <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
                                </datalist>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">类别</label>
                                <select class="form-control" v-model='type'>
                                    <option value=''>请选择</option>
                                    <option value='0'>内部资金分配</option>
                                    <option value='1'>犯人取现入账</option>
                                    <option value='2'>外部汇款</option>
                                    <option value='3'>资金分配</option>
                                    <option value='4'>内部转账</option>
                                    <option value='5'>外部转账</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">账户名</label>
                                <input type="text" class="form-control" id="" v-model='accountName'>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button" @click='searchDetail()'>
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
                            <th>所属监狱</th>
                            <th>所属监区</th>
                            <th>账户名</th>
                            <th>账号</th>
                            <th>对方账户名</th>
                            <th>对方账号</th>
                            <th>金额</th>
                            <th>交易时间</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for='pcdd in prisonCapitalDetailDtos'>
                                <td :id='pcdd.prisonCapitalDetailId'></td>
                                <td v-text='pcdd.prisonName'></td>
                                <td v-text='pcdd.prisonDepartmetName'></td>
                                <td v-text='pcdd.accountName'></td>
                                <td v-text='pcdd.accountNo'></td>
                                <td v-text='pcdd.toAccountName'></td>
                                <td v-text='pcdd.toAccountNo'></td>
                                <td v-if='pcdd.capitalType == 0'>{{pcdd.money | currency}}</td>
                                <td v-if='pcdd.capitalType == 1'>{{'+' + pcdd.money | currency}}</td>
                                <td v-if='pcdd.capitalType == 2'>{{'-' + pcdd.money | currency}}</td>
                                <td>{{pcdd.createdAt | formatDate}}</td>
                                <td>{{pcdd.status | fundDetailStatus}}</td>
                                <td v-text='pcdd.remark'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 表单底部-->
                <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchDetail'></Page>
            </div>
        </div>
</template>

<script>
import Page from '../Paginator.vue'
	export default {
		data(){
			return {
                indexPage:1,
                pageSize:10,
                menuSize:'',
                prisonId:'',
                type:'',
                accountName:'',
                prisonList:[],
                prisonCapitalDetailDtos:[],
                prisonName:''
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
            //查询所有转账明细
            getPrisonCapitalDetails(){
                this.$http({
                    method:'get',
                    url:'prisonCapital/getPrisonCapitalDetails',
                    params:{
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonCapitalDetailDtos = data.prisonCapitalDetailDtos;
                    this.menuSize = data.prisonCapitalDetailDtoSize;
                }).catch(err=>{
                    console.log(err);
                });
            },

            //查询所有监狱列表
            getAllPrison(){
                this.$http({
                    method:'get',
                    url:'/prisoner/toAddOrEdit'
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonList = data.prisons;
                    if(this.prisonList.length == 1){
                        this.prisonId = this.prisonList[0].id;
                        this.prisonName = this.prisonList[0].prisonName;
                    }
                    this.getPrisonCapitalDetails();
                }).catch(err=>{
                    console.log(err);
                });
                // this.prisonList = [{
                //     id:1,
                //     prisonName:'长沙监狱'
                // }];
                // if(this.prisonList.length == 1){
                //     this.prisonId = this.prisonList[0].id;
                //     this.prisonName = this.prisonList[0].prisonName;
                // }
                // this.searchDetail(this.indexPage);
            },

            //点击搜索查询转账明细
            searchDetail(index){
                this.indexPage = index;
                this.$http({
                    method:'get',
                    url:'prisonCapital/getPrisonCapitalDetails',
                    params:{
                        indexPage:this.indexPage,
                        pageSize:this.pageSize,
                        prisonId:this.prisonId,
                        type:this.type,
                        accountName:this.accountName
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.prisonCapitalDetailDtos = data.prisonCapitalDetailDtos;
                    this.menuSize = data.prisonCapitalDetailDtoSize;
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        components:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
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