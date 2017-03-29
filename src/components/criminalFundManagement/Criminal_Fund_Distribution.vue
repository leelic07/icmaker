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
                            <label for="name">资金分配类型</label>
                            <select class="form-control">
                                <option>全部</option>
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
                            <th></th>
                            <th>所属监狱</th>
                            <th>资金分配类型</th>
                            <th>可分配余额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>出入监监区</td>
                            <td>IC卡资金分配</td>
                            <td>220.0</td>
                            <td><router-link to="/cfd_add_criminal" class="agree-text">选择罪犯</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <div class="col-xs-23 form-footer">
                <p class="pull-left">共有3333条信息</p>
                <div id="page" class="col-xs-18 pull-right">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>