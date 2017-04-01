<template>
  	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
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
        <div class="col-xs-24 distribution" v-if='prisonCapitalAssignsList.length != 0'>
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
    </div>
</template>

<script>
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
				prisonCapitalAssignsList:[]
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
					this.avilableTotal = data.avilableTotal;
					this.prisonCapitalAssignsList = data.prisonCapitalAssignsList;
				}).catch(err=>{
					console.log(err);
				});
			},

			//点击确定分配
			distributionConfirm(){
				let isNull = true;
				let total = 0;
				let distributionItemsTem = this.distributionItems;
				$.each(distributionItemsTem,(index,value)=>{
					if(value.type == '' || value.money == ''){
						isNull = false;
						
					}
				});

				if(isNull){
					$.each(distributionItemsTem,(index,value)=>{
						value.money = value.money * 100;
					});
					
					this.$http({
						method:'post',
						url:'/prisonCapital/assignsCapital',
						params:{
							assignsStr:JSON.stringify(distributionItemsTem)
						}
					}).then(res=>{
						console.log(res.data.code,res.data.msg);
						$.each(this.distributionItems,(index,value)=>{
							total += value.money;
							$.each(this.prisonCapitalAssignsList,(i,v)=>{
								if(v.type == value.type){
									v.money += value.money
								}
							});
							value.money = '';
							value.type = '';
						});	

						this.avilableTotal -= total;
					}).catch(err=>{
						console.log(err);
					});
				}			
			}

		},
		mounted(){
			this.getPrisonCapitalAssigns();
		}
	}
</script>

<style lang='less' scoped>
    #right-side{
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