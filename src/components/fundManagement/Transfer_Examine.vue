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
                            <div class="col-xs-8 select-box">
                                <label for="name">转账类型</label>
                                <select class="form-control">
                                    <option>内部转账</option>
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

            <!--按钮组部分-->
            <div class="col-xs-24 button">
                <div class="col-xs-2">
                    <input type="button" value="同意" class="agree-button"></input>
                </div>
                <div class="col-xs-2">
                    <input type="button" value="拒绝" class="reject-button">
                </div>
            </div>

            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                            <tr>
                                <th><div class="info-check"></div></th>
                                <th>转账所属监狱</th>
                                <th>转账所属监区</th>
                                <th>转账账户名</th>
                                <th>入账账户名</th>
                                <th>入账银行账号</th>
                                <th>入账开户银行</th>
                                <th>入账余额</th>
                                <th>申请人</th>
                                <th>申请时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监区</td>
                                <td>4307000012</td>
                                <td>0843432</td>
                                <td>Tanmay</td>
                                <td>4561674687461879411</td>
                                <td>建设银行</td>
                                <td>220.0</td>
                                <td>Tanmay</td>
                                <td>2015-10-10</td>
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
        compoents:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
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