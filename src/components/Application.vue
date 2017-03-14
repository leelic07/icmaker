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
                                    <option>第五监区</option>
                                </select>
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="name">虚拟账号</label>
                                <input type="text" class="form-control" id="">
                            </div>
                            <div class="col-xs-8 select-box">
                                <label for="name">制卡状态</label>
                                <select class="form-control">
                                    <option>正在制卡</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 text-box">
                                <label for="name">编号</label>
                                <input type="text" class="form-control" id="">
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="name">档案号</label>
                                <input type="text" class="form-control" id="">
                            </div>
                            <div class="col-xs-6 text-box">
                                <label for="name">罪犯名</label>
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
                    <input type="button" value="申请制卡" class="reject-button" @click="applyCard()">
                </div>
            </div>
            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                            <tr>
                                <th><div class="info-check"></div></th>
                                <th>姓名</th>
                                <th>编号</th>
                                <th>档案号</th>
                                <th>虚拟账号</th>
                                <th>身份证</th>
                                <th>所属监狱</th>
                                <th>所属监区</th>
                                <th>申请日期</th>
                                <th>制卡日期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td class="reject-text">拒绝制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>正在制卡</td>
                                <td><em class="disabled-text">申请制卡</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>已制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>未制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>已制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                            <tr>
                                <td><div class="info-check"></div></td>
                                <td>Tanmay</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>4307000012</td>
                                <td>女子监狱</td>
                                <td>第七监狱</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>2015-03-10 09:10:54</td>
                                <td>未制卡</td>
                                <td><em class="agree-text" @click="applyCard()">申请制卡</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page></Page>
            </div>

            <!--模态框-->

            <!-- 申请制卡-->
            <div class="modal modal-confirm" id="applyConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>提交制卡申请</h3>
                            <button class="confirm-button" data-dismiss="modal">确定</button>
                            <button class="cancel-button" data-dismiss="modal">取消</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
        </div>
</template>

<script>
import Page from './Paginator.vue'
	export default {
		data(){
			return{

			}
		},
        methods:{
            applyCard(){
                $('#applyConfirm').modal();
            }
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

<style lang="less" scoped>
    h3{
        font-weight:bold;
    }
</style>