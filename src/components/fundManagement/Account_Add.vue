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
                                <select class="form-control" v-model='prisonId'>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select>
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
                                    <option value='0'>财务账户</option>
                                    <option value='1'>商户账户</option>
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
        </div>
</template>

<script>
	export default {
		data(){
			return {
                accountType:0,
                prisonId:1,
                accountName:'',
                prisonList:'',
                prisonDepartments:'',
                prisonDepartmentId:''
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
            }
        },
        watch:{
            prisonId(){
                let pd = this.prisonDepartments;
                let pdt = this.prisonDepartmentsTem;
                pdt.splice(0,pdt.length);
                this.prisonAndPrisonDepartment(pd,pdt);
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

                if(this.accountName == ''){
                    return;
                }else{
                    this.$http({
                        method:'post',
                        url:'/prisonAccount/addOrUpdatePrisonAccount',
                        params:params
                    }).then(res=>{
                        console.log(res.data.code,res.data.msg);
                        $.each(params,(index,value)=>{
                            value = '';
                        });
                    }).catch(err=>{
                        console.log(err);
                    });
                }  
            }
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getAllPrison();
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