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
                                <th><div class="info-check"></div></th>
                                <th>所属监狱</th>
                                <th>日限额</th>
                                <th>月限额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>出入监监区</td>
                                <td>220.0</td>
                                <td>220.0</td>
                                <td><em class="agree-text">设置</em></td>
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
	export default{
		data(){
			return{

			}
		},
		methods:{

		},
		components:{
			Page
		},
		mounted(){
			$('#table_id_example').tableHover();
			$('#table_id_example').select();
		}
	}
</script>