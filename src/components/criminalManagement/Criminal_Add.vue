<template>
<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <div class="col-xs-24 crim-add">
                <div class="col-xs-23 add-box">
                    <form class="form-horizontal" role="form">
                        <div class="row add-row">
                            <div class="col-xs-3">
                                <img src="../../../static/img/add.jpg" alt="上传照片">
                                <input type="file" class="hidden">
                            </div>
                            <div class="col-xs-8">
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-7 control-label"><i class="important">*</i>真实姓名：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="firstname">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-7 control-label"><i class="important">*</i>档号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="firstname">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-8">
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-7 control-label">性别：</label>
                                    <div class="col-xs-14">
                                        <select class="form-control">
                                            <option>全部</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-7 control-label"><i class="important">*</i>编号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="firstname">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row add-row">
                            <div class="col-xs-10">
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-6 control-label"><i class="important">*</i>服刑监狱：</label>
                                    <div class="col-xs-12">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-6 control-label">户籍住址：</label>
                                    <div class="col-xs-18">
                                        <input type="text" class="form-control" id="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-10">
                                <div class="form-group">
                                    <label for="firstname" class="col-xs-6 control-label">监区：</label>
                                    <div class="col-xs-12">
                                        <select class="form-control">
                                            <option>全部</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row add-row">
                            <div class="row">
                                <div class="input-group date form_date col-xs-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                    <input class="form-control" size="16" type="text" value="" placeholder="入监日期" readonly>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div>
                            <div class="col-xs-6 col-xs-push-9">
                                <input type="button" value="确认添加" class="add-button">
                            </div>    
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        data (){
            return{
                
            }
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
        }
    }
</script>

<style lang="less" scoped>
    
</style>