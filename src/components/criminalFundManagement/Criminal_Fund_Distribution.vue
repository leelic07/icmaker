<template>
	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-8 select-box">
                            <label for="name">所属监狱</label>
                            <select class="form-control" v-model='prisonId'>
                                <option value=''>请选择</option>
                                <option v-for='prison in prisonList' :value='prison.id' v-text='prison.prisonName'></option>
                            </select>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="name">资金分配类型</label>
                            <select class="form-control" v-model='type'>
                                <option value=''>请选择</option>
                                <option value='0'>家属汇款</option>
                                <option value='1'>低报酬</option>
                                <option value='2'>IC卡资金</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-xs-push-10 button-box">
                            <input type="button" value="搜索" class="search-button" @click='searchLocation()'>
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
                            <th>资金分配类型</th>
                            <th>可分配余额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='cfal in criminalFundAllocationList'>
                            <td :id='cfal.prison_id'></td>
                            <td v-text='cfal.prison_name'></td>
                            <td>{{cfal.type | locationType}}</td>
                            <td>{{cfal.money | currency}}</td>
                            <td><router-link :to="'/cfd_add_criminal/'+ cfal.prison_id + '/' + cfal.id + '/' + cfal.type"class="agree-text">选择罪犯</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchLocation'></Page>
        </div>
    </div>   
</template>

<script>
import Page from '../Paginator.vue'

	export default{
		data(){
			return{
                indexPage:1,
                pageSize:20,
                menuSize:'',
                prisonId:'',
                type:'',
                prisonList:[],
                criminalFundAllocationList:[],
                remind:{
                    status:'',
                    msg:''
                }
			}
		},
        methods:{
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

            //查询罪犯资金分配列表
            getLocationList(){
                this.$http({
                    method:'get',
                    url:'/criminalFundAllocationList',
                    params:{
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.criminalFundAllocationList = data.criminalFundAllocationList;
                    this.menuSize = data.criminalFundAllocationListSize; 
                }).catch(err=>{
                    console.log(err);
                });
            },


            //点击搜索查询罪犯资金分配列表
            searchLocation(index){
                this.indexPage = index;
                this.$http({
                    method:'get',
                    url:'/criminalFundAllocationList',
                    params:{
                        prison_id:this.prisonId,
                        type:this.type,
                        indexPage:this.indexPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    let data = res.data.data;
                    this.criminalFundAllocationList = data.criminalFundAllocationList;
                    this.menuSize = data.criminalFundAllocationListSize; 
                }).catch(err=>{
                    console.log(err);
                });
            }

        },
        components:{
            Page
        },
        mounted(){
            this.getAllPrison();
            this.getLocationList();
            $('#table_id_example').tableHover();
        }
	}
</script>

<style lang="less" scoped>
	
</style>