<template>
<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <div id="nav-bar" class="col-xs-20">
            <div class="col-xs-2">
                <a class="col-xs-24" href="#">
                    <i class="col-xs-8 col-xs-push-9 glyphicon glyphicon-menu-hamburger"></i>
                </a>
            </div>
            <div class="col-xs-13">
                <a class="col-xs-2 pull-right" href="#">
                    <span class="col-xs-15 col-xs-push-9 badge">8</span>
                    <i class="col-xs-21 col-xs-push-3 glyphicon glyphicon-bell"></i>
                </a>
            </div>
            <div class="col-xs-2">
                <a class="col-xs-8 col-xs-push-9" href="#">
                    <span class="col-xs-24 col-xs-push-9 badge">8</span>
                    <i class="glyphicon glyphicon-envelope"></i>
                </a>
            </div>
            <div class="col-xs-5">
                <i class="pull-left"></i>
                <a class="col-xs-16 pull-right" href="#">
                    <span class="col-xs-18">超级管理员</span>
                    <P class="col-xs-6">
                        <i class="col-xs-5"></i>
                    </P>
                </a>
            </div>
            <div class="col-xs-2">
                <a class="col-xs-8 col-xs-push-8" href="#">
                    <i class="glyphicon glyphicon-off"></i>
                </a>
            </div>
        </div>
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
                            <label for="name">所属监区</label>
                            <select class="form-control">
                                <option>第五监区</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 text-box">
                            <label for="name">姓名</label>
                            <input type="text" class="form-control" id="">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="name">档案号</label>
                            <input type="text" class="form-control" id="">
                        </div>
                        <div class="col-xs-6 text-box">
                            <label for="name">读卡</label>
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
        <!--按钮组部分-->
        <div class="col-xs-24 button">
            <div class="col-xs-2">
                <input type="button" value="配置消费额度" class="reject-button">
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
                            <th>所属监区</th>
                            <th>档案号</th>
                            <th>姓名</th>
                            <th>虚拟账号</th>
                            <th>金额</th>
                            <th>日限额</th>
                            <th>月限额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>出入监监区</td>
                            <td>一监区</td>
                            <td>0843432</td>
                            <td>Tanmay</td>
                            <td>430700001200120012</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td>220.0</td>
                            <td><em class="agree-text">配置消费额度</em></td>
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