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
                            <label for="name">所属监区</label>
                            <select class="form-control">
                                <option>第五监区</option>
                            </select>
                        </div>
                        <div class="col-xs-8 select-box">
                            <label for="name">状态</label>
                            <select class="form-control">
                                <option>已绑定</option>
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
                        <div class="col-xs-6 text-box">
                            <label for="name">虚拟账号</label>
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
                <input type="button" value="绑定虚拟账号" class="agree-button" @click="bindAccount()">
            </div>
            <div class="col-xs-2">
                <input type="button" value="绑定全部虚拟账号" class="bind-button" @click="bindAccount()">
            </div>
            <div class="col-xs-2 pull-right">
                <button class="btn ">导出数据</button>
                <div class="glyphicons glyphicons-search"></div>
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
                            <th colspan="2">操作</th>
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
                        <td><em class="agree-text" @click="bindAccount()">绑定虚拟账号</em></td>
                        <td><em class="agree-text" @click="bindIC()">绑定IC卡</em></td>
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
                        <td><em class="agree-text" @click="bindAccount()">绑定虚拟账号</em></td>
                        <td><em class="reject-text" @click="removeIC()">解除IC卡绑定</em></td>
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
                        <td><em class="agree-text" @click="bindAccount()">绑定虚拟账号</em></td>
                        <td><em class="agree-text" @click="bindIC()">绑定IC卡</em></td>
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
                        <td><em class="agree-text" @click="bindAccount()">绑定虚拟账号</em></td>
                        <td><em class="reject-text" @click="removeIC()">解除IC卡绑定</em></td>
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
                        <td><em class="reject-text" @click="remove()">解除绑定</em></td>
                        <td><em class="agree-text" @click="bindIC()">绑定IC卡</em></td>
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
                        <td><em class="reject-text" @click="remove()">解除绑定</em></td>
                        <td><em class="reject-text" @click="removeIC()">解除IC卡绑定</em></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表单底部-->
            <Page></Page>
        </div>

        <!--模态框-->

        <!--绑定IC卡 -->
        <div class="modal modal-confirm modal-bind" id="bindConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h2>绑定IC卡</h2>
                        <div class="clearfix bind-info">
                            <img src="" alt="" class="pull-left bind-img">
                            <ul class="pull-left clearfix bind-info-list">
                                <li class="clearfix"><span class="pull-left info-label">罪犯名</span><span class="pull-right">龙之华</span></li>
                                <li class="clearfix"><span class="pull-left info-label">所属监狱</span><span class="pull-right">龙之华</span></li>
                                <li class="clearfix"><span class="pull-left info-label">所属监区</span><span class="pull-right">龙之华</span></li>
                                <li class="clearfix"><span class="pull-left info-label">档案号</span><span class="pull-right">龙之华</span></li>
                                <li class="clearfix"><span class="pull-left info-label">卡内余额</span><span class="pull-right">龙之华</span></li>
                            </ul>
                        </div>
                        <div class="fee-select">
                            <p>是否扣除卡费</p>
                            <div class="clearfix">
                                <span class="fee-radio pull-left active"><em></em></span><span class="pull-left fee-label">是</span>
                                <span class="fee-radio pull-left"><em></em></span><span class="pull-left fee-label">否</span>
                            </div>
                        </div>
                        <input type="text" class="form-control fee-input" id="" placeholder="输入补卡费">
                        <input type="text" class="form-control" id="" placeholder="输入IC卡号进行绑定">
                        <button class="confirm-button" data-dismiss="modal">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 绑定虚拟账号-->
        <div class="modal modal-confirm" id="examConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认绑定虚拟账号</h3>
                        <button class="confirm-button" data-dismiss="modal">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 解除绑定-->
        <div class="modal modal-confirm" id="removeConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认解除绑定?</h3>
                        <p>将会同时解除IC卡绑定与虚拟账号绑定</p>
                        <button class="confirm-button" data-dismiss="modal">确定</button>
                        <button class="cancel-button" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!-- 解除IC卡绑定-->
        <div class="modal modal-confirm" id="removeICConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>确认解除绑定?</h3>
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
            bindIC(){
                $('#bindConfirm').modal();
            },
            bindAccount(){
                $('#examConfirm').modal();
            },
            remove(){
                $('#removeConfirm').modal();
            },
            removeIC(){
                $('#removeICConfirm').modal();
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
    #removeConfirm{
        .modal-body{
            p{
                color:#B2B2B2;
                margin-top:25px;
            }
        }
    }

    h2,h3{
        font-weight:bold;
    }
</style>