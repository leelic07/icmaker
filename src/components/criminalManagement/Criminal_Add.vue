<template>
<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <div class="col-xs-24 crim-add">
                <div class="col-xs-23 add-box">
                    <form class="form-horizontal" role="form">
                        <div class="row add-row">
                            <div class="col-xs-3">
                                <!--<img :src="imgUrl" alt="上传照片" @click = "getImgUrl">
                                <input type="file" class="hidden" id="imgUrl" v-model = "imgUrl" v-on:change = "test">-->
                            </div>
                            <div class="col-xs-8">
                                <div class="form-group">
                                    <label for="name" class="col-xs-7 control-label"><i class="important">*</i>真实姓名：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="archivesNumber" class="col-xs-7 control-label"><i class="important">*</i>档案号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="archivesNumber">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="insideArchivesNumber" class="col-xs-7 control-label">内部档案号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="insideArchivesNumber">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-8">
                                <div class="form-group">
                                    <label for="sex" class="col-xs-7 control-label">性别：</label>
                                    <div class="col-xs-14">
                                        <select class="form-control" id="sex">
                                            <option value="0">全部</option>
                                            <option value="1">男</option>
                                            <option value="2">女</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="number" class="col-xs-7 control-label"><i class="important">*</i>编号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="number">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="cardNo" class="col-xs-7 control-label">身份证号：</label>
                                    <div class="col-xs-14">
                                        <input type="text" class="form-control" id="cardNo">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row add-row">
                            <div class="col-xs-10">
                                <div class="form-group">
                                    <label for="prisonId" class="col-xs-6 control-label"><i class="important">*</i>服刑监狱：</label>
                                    <div class="col-xs-12">
                                        <input type="text" class="form-control" disabled id="prisonId" v-if = "test">
                                        <select class="form-control" id="prisonId" v-else>
                                            <option>全部</option>
                                        </select>
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
                                    <label for="prisonerDepartmentId" class="col-xs-6 control-label">监区：</label>
                                    <div class="col-xs-12">
                                        <select class="form-control" id="prisonerDepartmentId">
                                            <option>全部</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row add-row">
                            <div class="row">
                                <div class="input-group date form_date col-xs-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                    <input class="form-control" size="16" type="text" placeholder="入监日期" readonly id="intoPrisonDate">
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
                imgUrl:"../../../static/img/add.jpg",
                test: true
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
                    showMeridian: 1,
                    pickerPosition: 'bottom-left'
                });
            },
            getImgUrl() {
                $("#imgUrl").click();
            },
            test() {
                alert(0);
            }
        },
        mounted(){
            this.dateInit();
        }
    }
</script>

<style lang="less" scoped>
    
</style>