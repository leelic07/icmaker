<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">菜单类别</label>
                                <select class="form-control">
                                    <option>长沙女子监狱</option>
                                </select>
                            </div>
                            <div class="col-xs-6 col-xs-push-1 text-box">
                                <label for="name">一级菜单名称</label>
                                <input type="text" class="form-control" id="">
                            </div>
                            <div class="col-xs-6 col-xs-push-3 text-box">
                                <label for="name">二级菜单名称</label>
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
                            <th>菜单类别</th>
                            <th>一级菜单名称</th>
                            <th>二级菜单名称</th>
                            <th>是否启用</th>
                            <th colspan="3">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>0545876421</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td><em class="agree-text">启用</em></td>
                            <td><em class="agree-text">停用</em></td>
                            <td><em class="reject-text">删除</em></td>
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