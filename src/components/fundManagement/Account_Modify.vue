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
                                <select id='prison' class="form-control" v-model='prisonId' @change='getPrisonDepartments($event)'>
                                    <option v-show='prisonList.length>1' value=''>请选择</option>
                                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">所属监区 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select id='prisonDepartment' v-model='prisonDepartmentId' class="form-control">
                                    <option value=''>请选择</option>
                                    <option v-for='pdt in prisonDepartments' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
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
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认修改" class="search-button"@click='addAccount()'>
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
                prisonAccountId:'',
                prisonList:'',
                prisonDepartments:'',
                prisonDepartmentsTem:'',
                accountName:'',
                accountType:'',
                prisonId:'',
                prisonDepartmentId:''
			}
		},
        computed:{
            // prisonId:{
            // 	get(){
            // 		return this.prisonAccountList.prisonId;
            // 	}
            // },
            // prisonDepartmentId:{
            // 	get(){
            // 		return this.prisonAccountList.prisonDepartmentId;
            // 	}
            // }
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
                    this.prisonDepartments = data.prisonDepartments;
                }).catch(err=>{
                    console.log(err);
                });
            },
          	//获取监狱账户信息
          	getPrisonAccount(){
          		this.$http({
          			method:'get',
          			url:'prisonAccount/getPrisonAccount',
          			params:{
          				prisonAccountId:this.prisonAccountId
          			}
          		}).then(res=>{
          			console.log(res.data.data);
          			let data = res.data.data;
          			// this.prisonAccountList = res.data.data;
          			this.accountName = data.accountName;
          			this.accountType = data.accountType;
          			$('#prison').prop('value',data.prisonId);
          			$('#prisonDepartment').prop('value',data.prisonDepartment);
          			// this.prisonId = data.prisonId;
          			// this.prisonDepartment = data.prisonDepartmentId;
          			console.log(data.prisonId);
          			console.log(data.prisonDepartmentId);
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
                        // console.log(res.data.code,res.data.msg);
                        $.each(params,(index,value)=>{
                            value = '';
                        });
                    }).catch(err=>{
                        console.log(err);
                    });
                }  
            },
            //根据监狱查询监区
            getPrisonDepartments(e){
            	this.$http({
            		method:'get',
            		url:'prisoner/getDepartments',
            		params:{
            			prisonId:e.target.value
            		}
            	}).then(res=>{
            		this.prisonDepartments = res.data.data;
            	}).catch(err=>{
            		console.log(err);
            	});
            }
        },
        mounted(){
            $('#table_id_example').tableHover();
            this.getAllPrison();
            let prisonAccountList = this.$on('prisonAccountList');
            console.log(prisonAccountList);
            this.prisonId = prisonAccountList.prisonId;
            this.prisonDepartmentId = prisonAccountList.prisonDepartmentId;
            this.accountName = prisonAccountList.accountName;
            this.accountType = prisonAccountList.accountType;
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