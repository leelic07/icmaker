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
                                <select class="form-control">
                                    <option>长沙女子监狱</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">类别</label>
                                <select class="form-control">
                                    <option>内部转账</option>
                                </select>
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">账户名</label>
                                <input type="text" class="form-control" id="">
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
                            <th>所属监区</th>
                            <th>账户名</th>
                            <th>账号</th>
                            <th>对方账户名</th>
                            <th>对方账号</th>
                            <th>转入金额</th>
                            <th>转出金额</th>
                            <th>交易时间</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>出入监区</td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>4307000012</td>
                                <td>500.00</td>
                                <td>500.00</td>
                                <td>2015-10-10</td>
                                <td></td>
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

    table{
    	tr{
    		th:first-child,td:first-child{
    			padding-left:35px;
    		}
    	}
    }
}
</style>