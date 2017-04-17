<template>
  	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right" :class="{'bgColor':noAuthority}">

        <div class='col-xs-24 noAuthority' v-if='userInfo.userType == 0 || userInfo.userType == 1'>
            <h3 class='col-xs-offset-6'>您没有权限访问该页面，只有监狱账户才可以分配资金！</h3>
        </div>

        <div class='col-xs-24 noAuthority' v-else-if='errMsg'>
            <h3 class='col-xs-offset-6' v-text='errMsg'></h3>
        </div>

        <div class='col-xs-24' v-else>
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-24 text-box">
                            <label class="pull-left" for="name">可分配金额:</label>
                            <h3 class="pull-left">{{avilableTotal | currency}}</h3>
                            <p>元</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--已分配金额，已分配类型部分-->
        <div class="col-xs-24 distribution" v-if='prisonCapitalAssignsList != []'>
            <div class="col-xs-23 distribution-innerbox">

                <div v-for='pcal in prisonCapitalAssignsList' class="col-xs-24 distributionItem">
                    <div class="col-xs-10">
                        <div class="col-xs-8">
                            <label for="" class="pull-left">已分配金额:</label>
                        </div>
                        <div class="col-xs-14">
                            <p class='text-center'>{{pcal.money | currency}}</p>
                        </div>
                    </div>
                    <div class="col-xs-14">
                        <div class="col-xs-6">
                            <label for="" class="pull-left">已分配类别:</label>
                        </div>
                        <div class="col-xs-11">
                            <p class='text-center'>{{pcal.type | distributionType}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--分配金额,分配类型部分-->
        <div class="col-xs-24 distribution">
            <div class="col-xs-23 distribution-innerbox">

                <div v-for='di in distributionItems' class="col-xs-24 distributionItem">
                    <div class="col-xs-10">
                        <div class="col-xs-7">
                            <label for="" class="pull-left">分配金额</label>
                        </div>
                        <div class="col-xs-14">
                            <input type="text" class="form-control" v-model='di.money'/>
                        </div>
                    </div>
                    <div class="col-xs-14">
                        <div class="col-xs-5">
                            <label for="" class="pull-left">分配类别</label>
                        </div>
                        <div class="col-xs-11">
                            <select class="form-control" v-model='di.type'>
                            	<option value=''>请选择</option>
                                <option value='0'>低报酬</option>
                                <option value='1'>IC卡资金</option>
                            </select>
                        </div>
                        <div class="col-xs-8 addDistribution">
                            <a href="#" class="col-xs-10 col-xs-offset-3" @click='addDistribution($event)'>
                                <span class="pull-left">
                                    +
                                </span>
                                <span class="pull-left col-xs-16 col-xs-offset-2">新增分配</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-xs-24 confirmDistribution">
                    <div class="col-xs-4 button-box">
                        <button class="search-button" @click='distributionConfirm()'>确定分配</button>
                    </div>
                </div>
            </div>
        </div>
        <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :back='remind.back'></Remind>
        </div>
    </div>
</template>

<script>
import Remind from '../Remind.vue'
import store from '../../store'
	export default {
		data(){
			return{
				type:[],
				money:[],
				index:0,
				distributionItems:[{
					money:'',
					type:''
				}],
				avilableTotal:'',
				prisonCapitalAssignsList:[],
                userInfo:'',
                errMsg:'',
                noAuthority:false
			}
		},
        watch:{
            //删除小数点两位后的数字
            distributionItems:{
                handler(){
                    console.log('change');
                    $.each(this.distributionItems,(index,value)=>{
                        value.money = this.saveTwo(value.money);
                    });
                },
                deep:true
            }
        },
        computed:{
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
		methods:{
			//点击新增分配
			addDistribution(e){
				e.preventDefault();
				if(this.distributionItems.length < 2){
					this.index++;
					this.distributionItems.push({
						money:'',
						type:''
					});
					e.path[1].remove();
				}
			},

            //查询监狱总账户资金分配
            getPrisonCapitalAssigns(){ 
                this.$http({
                    method:'get',
                    url:'/prisonCapital/getPrisonCapitalAssigns'
                }).then(res=>{
                    // console.log(res.data.data);
                    let data = res.data.data;
                    if(res.data.code == 0){
                        this.avilableTotal = data.avilableTotal;
                        this.prisonCapitalAssignsList = data.prisonCapitalAssignsList;
                    }else if(res.data.code == 99999){
                        this.errMsg = res.data.msg;
                        this.noAuthority = true;
                    }
                    
                }).catch(err=>{
                    console.log(err);
                });
            },

			//点击确定分配
			distributionConfirm(){
				let isNull = false;
                let isNumber = true;
				let total = 0;
				$.each(this.distributionItems,(index,value)=>{
					if(this.isNull(value.type,value.money)){
						isNull = true;
                        this.remind = {
                            status:'warn',
                            msg:'选项不能为空'
                        };
                        store.dispatch('showRemind');
					}else if(!this.isNumber(value.money)){
                        isNumber = false;
                        this.remind = {
                            status:'warn',
                            msg:'分配金额输入不合法'
                        };
                        store.dispatch('showRemind');
                    }
				});

				if(!isNull && isNumber){
					$.each(this.distributionItems,(index,value)=>{
                        value.money = this.toCent(value.money);
                        total += value.money;
					});
					
                    if(total > this.avilableTotal){
                        this.remind = {
                            status:'warn',
                            msg:'余额不足'
                        };
                        store.dispatch('showRemind');
                        $.each(this.distributionItems,(index,value)=>{
                            value.money = '';
                            value.type = '';
                        }); 
                    }else{
					   this.$http({
    						method:'post',
    						url:'/prisonCapital/assignsCapital',
    						params:{
    							assignsStr:JSON.stringify(this.distributionItems)
    						}
					   }).then(res=>{  
                            if(res.data.code == 0){
                                this.getPrisonCapitalAssigns();
                                this.remind = {
                                    status:'success',
                                    msg:'资金分配成功'
                                };
                            }else{
                                console.log(res.data.code,res.data.msg);
                                this.remind = {
                                    status:'failed',
                                    msg:res.data.msg
                                };
                            }

                            store.dispatch('showRemind');

                            $.each(this.distributionItems,(index,value)=>{
                                value.money = '';
                                value.type = '';
                            }); 
                            // $.each(this.distributionItems,(index,value)=>{
                            //     $.each(this.prisonCapitalAssignsList,(i,v)=>{
                            //         if(v.type == value.type){
                            //             v.money += value.money
                            //         }
                            //     });
                            //     value.money = '';
                            //     value.type = '';
                            // }); 

                            // this.avilableTotal -= total;
                        
                        }).catch(err=>{
					      console.log(err);
				        });
                    }			
                }
    		},

            //获取用户类型
            getUserInfo() {
                this.$http.get('getIndex').then(res=>{
                    if (res.data.code == 0) {
                        this.userInfo = res.data.data.user;
                        let userType = this.userInfo.userType;
                        if(userType == 0 || userType == 1){
                            this.noAuthority = true;
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        components:{
            Remind
        },
		mounted(){
            this.getUserInfo();
            this.getPrisonCapitalAssigns();
		}
	}
</script>

<style lang='less' scoped>
    #right-side{
        &.bgColor{
            background-color:#fff;
        }
        .noAuthority{
            >h3{
                margin-top:300px;
            }
        }
        .label-box{
        	label{
        		font-weight:normal;
        	}     
        }
        .search-box .search-inner-box{
            background-color:#fff;
            margin-top:0;
            margin-bottom:0;
            h3{
            	margin:-3px 0 0 2%;
            	color:#FF6E13;
            }
            p:nth-child(3){
            	color:#FF6E13;
            }
        }
        
        .button-box {
            text-align: center;
            margin-top:-4px;
            .search-button {
	            color: #fff;
	            font-size: 14px;
	            background: #1aa3ab;
	            width: 120%;
	            height:40px;
	            -moz-border-radius: 3px;
	            -webkit-border-radius: 3px;
	            border-radius: 3px;
	            border: 1px solid #1aa3ab;
        	}
        }

        .distribution{
        	margin-bottom:15px;
        	.distribution-innerbox{
        		.distributionItem{
        			p{
        				margin-top:7px;
        				color:#FF6600;
        			}
        		}
        	}	
        }
    }
</style>