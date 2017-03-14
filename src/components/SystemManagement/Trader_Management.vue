<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">所属监区</label>
                                <select class="form-control">
                                    <option>长沙女子监狱</option>
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
                            <th>登录名</th>
                            <th>真是姓名</th>
                            <th>创建时间</th>
                            <th>最后访问时间</th>
                            <th>最后访问IP</th>
                            <th>角色名</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
                        </tr>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
                        </tr>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
                        </tr>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
                        </tr>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
                        </tr>
                        <tr>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td>监狱科室查询</td>
                            <td><em class="reject-text">停用</em></td>
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
		methods:{
			
		},
        mounted(){
            $('#table_id_example').tableHover();
        }
	}
</script>