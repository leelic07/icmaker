<template>
 	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-6 select-box">
                            <label for="name">所属监狱</label>
                            <select class="form-control">
                                <option>长沙女子监狱</option>
                            </select>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">所属监区</label>
                            <select class="form-control">
                                <option>第五监区</option>
                            </select>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">类别</label>
                            <select class="form-control">
                                <option>家属汇款</option>
                            </select>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">场所</label>
                            <select class="form-control">
                                <option>超市一</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 select-box">
                            <label for="name">姓名</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">编号</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">档案号</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="col-xs-6 select-box">
                            <label for="name">读卡</label>
                            <input type="text" class="form-control"/>
                        </div>
                    </div>
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
	                        <th>类别</th>
	                        <th>场所</th>
	                        <th>交易金额</th>
	                        <th>金额</th>
	                        <th>交易时间</th>
	                        <th>备注</th>
	                    </tr>
                    </thead>
                    <tbody>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
	                    </tr>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
	                    </tr>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
	                    </tr>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
	                    </tr>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
	                    </tr>
	                    <tr>
	                        <td></td>
	                        <td>出入监监区</td>
	                        <td>一监区</td>
	                        <td>0843432</td>
	                        <td>Tanmay</td>
	                        <td>家属汇款</td>
	                        <td>超市一</td>
	                        <td>220.0</td>
	                        <td>220.0</td>
	                        <td>2015-10-03 19:23</td>
	                        <td></td>
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
	export default {
		data(){
			return{

			}
		},
		methods:{
			dateInit(){
				$('.date').datetimepicker({
			        language:'zh-CN',
			        format:'yyyy-mm-dd hh:ii:ss',
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