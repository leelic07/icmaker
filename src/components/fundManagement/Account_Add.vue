<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">账户名称 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="" v-model='accountName'>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">所属监狱 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <!-- <select class="form-control" v-model='prisonId'>
                                    <option value=''>请选择</option>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select> -->
                                <input list="prisons" placeholder="请选择" class='form-control' v-model='prisonName' v-if='prisonList.length > 1'>
                                <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1' disabled>
                                <datalist id="prisons">
                                    <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
                                </datalist>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">所属监区 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" v-model='prisonDepartmentId'>
                                    <option value=''>请选择</option>
                                    <option v-for='pdt in prisonDepartmentsTem' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">账户类型 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" v-model='accountType'>
                                    <option value=''>请选择</option>
                                    <option value='0'>财务账户</option>
                                    <option value='1'>商户账户</option>
                                    <option value='2'>监狱总账户</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认添加" class="search-button"@click='addAccount()'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :path='remind.path'></Remind>
        </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'
	export default {
		data(){
			return {
                accountType:'',
                prisonId:'',
                prisonName:'',
                accountName:'',
                prisonList:'',
                prisonDepartments:'',
                prisonDepartmentId:''
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
                    this.prisonId == '' ? this.prisonId = -1 : '';
                }else{
                    this.prisonId = '';
                }            
            },

            prisonId(){
                // console.log('change');
                let pd = this.prisonDepartments;
                let pdt = this.prisonDepartmentsTem;
                pdt.splice(0,pdt.length);
                this.prisonAndPrisonDepartment(pd,pdt);
            }
        },
        computed:{
            prisonDepartmentsTem:{
                get(){
                    let pd = this.prisonDepartments;
                    let pdt = [];
                    this.prisonAndPrisonDepartment(pd,pdt);
                    this.prisonDepartmentId = '';
                    return pdt;
                }
            },

            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
        methods:{
            //监狱，监区联动
            prisonAndPrisonDepartment(pd,pdt){
                 $.each(pd,(index,value)=>{
                    if(value.prisonId == this.prisonId){
                        pdt.push(value);
                    }
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
                    this.prisonDepartments = data.prisonDepartments;
                    if(this.prisonList.length == 1){
                        this.prisonId = this.prisonList[0].id;
                        this.prisonName = this.prisonList[0].prisonName;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            //新增账户
            addAccount(){
                let params = {
                    accountType:this.accountType,
                    prisonId:this.prisonId,
                    prisonDepartmentId:this.prisonDepartmentId,
                    accountName:this.accountName
                };
                if(
                    this.isNull(this.accountName,this.prisonId,this.accountType)){
                    this.remind = {
                        status:'warn',
                        msg:'选项不能为空'
                    }
                    store.dispatch('showRemind');
                    return;
                }else if(this.prisonId == -1){
                    this.remind = {
                        status:'warn',
                        msg:'无此监狱'
                    }
                    store.dispatch('showRemind');
                }else{
                    this.$http({
                        method:'post',
                        url:'/prisonAccount/addOrUpdatePrisonAccount',
                        params:params
                    }).then(res=>{
                        if(res.data.code == 0){
                            this.remind = {
                                status:'success',
                                msg:res.data.msg,
                                path:'/account_management'
                            };

                            $.each(params,(index,value)=>{
                                value = '';
                            });
                        }else{
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            };
                            console.log(res.data.code,res.data.msg);
                        }

                        store.dispatch('showRemind');

                        this.accountType = '',
                        this.prisonDepartmentId = '',
                        this.accountName = '',
                        this.prisonName = ''

                        this.getAllPrison();
                    }).catch(err=>{
                        console.log(err);
                    });
                }  
            }
        },
        components:{
            Remind
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getAllPrison();
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