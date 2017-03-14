<template>
	 <!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-4 col-xs-push-1 text-box">
                                <label for="name">创建时间</label>
                                <input class="date form-control" size="16" type="text" placeholder="开始日期">
                            </div>
                            <div class="col-xs-1 col-xs-push-1 mdash-box">
                                <div class="col-xs-24 col-xs-push-7">&mdash;</div>
                            </div>
                            <div class="col-xs-4 col-xs-push-1 text-box">
                                <label style="visibility:hidden" for="name">结束时间</label>
                                <input class="date form-control" size="16" type="text" placeholder="结束日期">
                            </div>
                            <div class="col-xs-5 col-xs-push-3 text-box">
                                <label for="name">角色名</label>
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
                            <th>角色名称</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>最后修改时间</th>
                            <th>修改人</th>
                            <th colspan="3">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
                            <td><em class="reject-text">删除</em></td>
                        </tr>
                        <tr>
                            <td>长沙监狱</td>
                            <td>银行账户查询</td>
                            <td>2017-1-10 09:31</td>
                            <td>2017-1-10 09:31</td>
                            <td>10.90.193.2</td>
                            <td><em class="agree-text">修改</em></td>
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
			return{

			}
		},
        components:{
            Page
        },
		methods:{
			dateInit(){
				$('.date').datetimepicker({
			        language:'zh-CN',
			        format:'yyyy-mm-dd',
			        weekStart: 1,
			        todayBtn:  1,
			        autoclose: 1,
			        todayHighlight: 1,
			        startView: 2,
			        forceParse: 0,
			        showMeridian: 1
			    });
			}
		},
		mounted(){
			this.dateInit();
            $('#table_id_example').tableHover();      
		}
	}
</script>

<style lang="less" scoped>
    #right-side{
        .text-box{
            padding-left:0;
            padding-right:0;
        }
    }
    
</style>