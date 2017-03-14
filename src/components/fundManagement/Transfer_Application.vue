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
                                <select class="form-control">
                                    <option>长沙女子监狱</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">账户名</label>
                                <select class="form-control">
                                    <option>第五监区</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-10 button-box">
                                <input type="button" value="搜索" class="search-button">
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
                            <th>所属监狱</th>
                            <th>账户名</th>
                            <th>账户类型</th>
                            <th>账户余额</th>
                            <th>状态</th>
                            <th colspan="3">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="disabled-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请备用金转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请转账</em></td>
                            <td><em class="agree-text">内部跨监转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="disabled-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        <tr>
                            <td>出入监区</td>
                            <td>4307000012</td>
                            <td>0843432</td>
                            <td>500.00</td>
                            <td>等待审核</td>
                            <td><em class="agree-text">申请转账</em></td>
                            <td><em class="agree-text">内部转账</em></td>
                            <td><em></em></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page></Page>
            </div>
        </div>
</template>

<script>
import Page from '../Paginator.vue'
	export default {
		data(){
			return {

			}
		},
        components:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
        }
	}
</script>

<style lang="less" scoped>
#right-side{
	.select-box{
        padding:20px 50px 20px 40px;
    }

    .text-box{
        padding-left:40px;
    }

    table{
    	tr{
    		th,td{
    			text-align:center;
    		}
    		th:last-child{
    			text-align:left;
            	padding-left:4%;
    		}
    		td{
    			&:nth-child(6),&:nth-child(7),&:nth-child(8){
    				width:10%;
    			}
    		}
    	}
    }
}
</style>