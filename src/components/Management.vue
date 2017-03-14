<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!-- <Nav></Nav> -->
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-8 select-box">
                                <label for="name">状态</label>
                                <select class="form-control">
                                    <option>已挂失</option>
                                </select>
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
            
            <!--表格部分-->
            <div class="col-xs-24 form">
                <div class="col-xs-23">
                    <table class="display table ic-table" id="table_id_example">
                        <thead>
                        <tr>
                            <th><div class="info-check"></div></th>
                            <th>虚拟账号</th>
                            <th>账号名</th>
                            <th>余额</th>
                            <th>状态</th>
                            <th>最近绑定日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div class="info-check" ></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td>已绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check" ></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td class="reject-text">未绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check" ></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td>已绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check"></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td>已绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check" ></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td>已绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        <tr>
                            <td><div class="info-check" ></div></td>
                            <td>4307000012</td>
                            <td>Tanmay</td>
                            <td>243.00</td>
                            <td>已绑定</td>
                            <td>Tanmay</td>
                            <td><em class="agree-text" @click="detail()">明细</em></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 表单底部-->
                <Page></Page>
            </div>

            <!--模态框-->

            <!--查看明细 -->
            <div class="modal modal-confirm modal-bind" id="detailConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                                &times;
                            </button>
                            <h3>查看明细</h3>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <tr>
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">10072343243342423343</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">Tanmay</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">2015-10-23 09:10:23</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">10072343243342423343</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">Tanmay</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">2015-10-23 09:10:23</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">10072343243342423343</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">Tanmay</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">2015-10-23 09:10:23</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">10072343243342423343</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">Tanmay</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">2015-10-23 09:10:23</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="col-xs-24"><span class="pull-left">虚拟账号</span><span class="pull-left">10072343243342423343</span></p>
                                        <p class="col-xs-8 pull-left"><span class="pull-left">姓名</span><span class="pull-left">Tanmay</span></p>
                                        <p class="col-xs-16 pull-left"><span class="pull-right">2015-10-23 09:10:23</span><span class="pull-right">使用日期</span></p>
                                    </td>
                                </tr>
                            </table>
                            <button class="detail-button" data-dismiss="modal">确定</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
        </div>
</template>

<script>
import Page from './Paginator.vue'
import {mapGetters,mapMutations} from 'vuex'

	export default {
		data(){
			return{
				
			}
		},
        computed:mapGetters(['selectAll']),
        methods:{
            detail(){
                $('#detailConfirm').modal();
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
#right-side{
    .modal-dialog{
        top:300px;
        width:30%;
        min-height:350px;
        .modal-content{
            min-height:350px;
            h3,h2{
                font-weight:bold;
            }
            .modal-body{
                padding:0;
                table{
                    margin-top:25px;
                    font-size:12px;
                    tr{
                        border-top:1px solid #ddd;
                        td{
                            padding:10px 13px 10px 0;
                            p{
                                &:first-child{
                                    margin-bottom:10px;
                                    span:first-child{
                                        padding-left:3%;
                                        padding-right:3%;
                                        color:#A5A5A5;
                                    }
                                }
                                &:not(first-child){
                                    span:first-child{
                                        padding-left:9%;
                                        padding-right:6%;
                                        color:#A5A5A5;
                                    }
                                }
                                &:nth-child(3){
                                    span:first-child{
                                        padding-left:10px;
                                        padding-right:0;
                                        color:#333;
                                    }
                                }
                                &:nth-child(3){
                                    span:nth-child(2){
                                        color:#A5A5A5;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }   
}
</style>