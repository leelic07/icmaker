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
                                <label for="name">在监状态</label>
                                <select class="form-control">
                                    <option>在监</option>
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
                                <th>户籍</th>
                                <th>身份证</th>
                                <th>所属监狱</th>
                                <th>所属监区</th>
                                <th>罪名</th>
                                <th>刑期</th>
                                <th>入监日期</th>
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
                                <td>新卡</td>
                                <td>ftsfdasd</td>
                                <td>2年3个月</td>
                                <td><em class="agree-text">修改</em></td>
                                <td><em class="reject-text">删除</em></td>
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
                                <td>新卡</td>
                                <td>ftsfdasd</td>
                                <td>2年3个月</td>
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
            return {

            }
        },
        compoents:{
            Page
        },
        mounted(){
            $('#table_id_example').tableHover();
            $('#table_id_example').select();
        }
    }   
</script>