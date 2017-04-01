<template>
 	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-7 text-box">
                            <input type="text" class="form-control" placeholder="读取IC卡" v-model = "icCardNo" id="icCardNo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--罪犯信息部分-->
        <div class="col-xs-24 criminal-info">
            <div class="col-xs-23 form-header">
                <h4 class="col-xs-2 col-xs-offset-1">罪犯信息</h4>
            </div>
            <div class="col-xs-23 information">
                <div class="col-xs-19">
                    <div class="col-xs-5">
                        <img src="" alt=""/>
                    </div>
                    <ul class="col-xs-19">
                        <li class="col-xs-12">
                            <p class="col-xs-12">姓名</p>
                            <p class="col-xs-12">艾哈提.买买提</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">所在监狱</p>
                            <p class="col-xs-12">长沙监狱</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">所在监区</p>
                            <p class="col-xs-12">第一监区</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">档案号</p>
                            <p class="col-xs-12">4161648761681</p>
                        </li>
                    </ul>
                </div>
                <div class="col-xs-5 account-remaining">
                    <p>账户余额</p>
                    <div class="remaining">
                        <h1 class="pull-left">3412</h1><h3 class="pull-left">.00元</h3>
                    </div>
                </div>
            </div>
            <div class="col-xs-23 input-box">
                <div class="col-xs-8 col-xs-offset-1">
                    <input type="text" class="form-control" placeholder="输入消费金额"/>
                </div>
                <div class="col-xs-4 button-box">
                    <button class="search-button">确认</button>
                </div>
                <div class="col-xs-5 pull-right">
                    <p class="col-xs-24 pull-right">备注：xxxxxxxxxxxx</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return{
                icCardNo: ""
			}
		},
        methods:{
            getPrisonerInfo () {

            }
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
        
        .search-box{
        	.search-inner-box{
        		background-color:#fff;
        		margin-top:0;
        		margin-bottom:0;
        	}
        }
        .label-box{
    		label{
        		font-weight:normal;
    		}
    	}
    	.information {
    		img{
        		width:100%;
        		height:150px;
    		} 
		}
		.button-box{
			text-align: center;
        	margin-top:-4px;
        	.search-button {
	            color: #fff;
	            font-size: 14px;
	            background: #1aa3ab;
	            width: 80%;
	            height:40px;
	            -moz-border-radius: 3px;
	            -webkit-border-radius: 3px;
	            border-radius: 3px;
	            border: 1px solid #1aa3ab;
    		}
		} 
    }
</style>