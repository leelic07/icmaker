<template>
<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <div class="col-xs-24 crim-add">
            <div class="col-xs-23 add-box">
                <form class="form-horizontal" role="form">
                    <div class="row add-row">
                        <div class="col-xs-3 upload-box">
                            <img :src="imgUrl" alt="上传照片" id = "previewImg" class="preview-img">
                            <input type="file" class="upload-btn" id="imgUrlBtn">
                        </div>
                        <div class="col-xs-8">
                            <div class="form-group">
                                <label for="name" class="col-xs-7 control-label"><i class="important">*</i>真实姓名：</label>
                                <div class="col-xs-14">
                                    <input type="text" class="form-control" id="name" v-model = "prisonerInfo.name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="archivesNumber" class="col-xs-7 control-label"><i class="important">*</i>档案号：</label>
                                <div class="col-xs-14">
                                    <input type="text" class="form-control" id="archivesNumber" v-model = "prisonerInfo.archivesNumber">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="insideArchivesNumber" class="col-xs-7 control-label">内部档案号：</label>
                                <div class="col-xs-14">
                                    <input type="text" class="form-control" id="insideArchivesNumber" v-model = "prisonerInfo.insideArchivesNumber">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-8">
                            <div class="form-group">
                                <label for="sex" class="col-xs-7 control-label">性别：</label>
                                <div class="col-xs-14">
                                    <select class="form-control" id="sex" v-model = "prisonerInfo.sex">
                                        <option value="0">全部</option>
                                        <option value="1">男</option>
                                        <option value="2">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="number" class="col-xs-7 control-label"><i class="important">*</i>编号：</label>
                                <div class="col-xs-14">
                                    <input type="text" class="form-control" id="number" v-model = "prisonerInfo.number">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cardNo" class="col-xs-7 control-label">身份证号：</label>
                                <div class="col-xs-14">
                                    <input type="text" class="form-control" id="cardNo" v-model = "prisonerInfo.cardNo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row add-row">
                        <div class="col-xs-10">
                            <div class="form-group">
                                <label for="prisonId" class="col-xs-6 control-label"><i class="important">*</i>服刑监狱：</label>
                                <div class="col-xs-12">
                                    <!--<input type="text" class="form-control" disabled id="prisonId" v-if = "prisons.length == 1" v-model = "prisons[0].prisonName">
                                    <select class="form-control" id="prisonId" :disabled = "prisonerId != undefined" v-model = "prisonerInfo.prisonId" @change = "getPrisonDepartInfo($event)" v-else>
                                        <option v-for = "prison in prisons" :value = "prison.id">{{prison.prisonName}}</option>
                                    </select>-->
                                    <input type="text" class="form-control" list = "prisonList" placeholder = "请选择" v-model = "prisonName" :disabled = "prisonerId != undefined || prisons.length == 1">
                                    <datalist class="form-control hidden" id="prisonList">
                                        <option v-for = "prison in prisons">{{prison.prisonName}}</option>
                                    </datalist>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-xs-6 control-label">户籍住址：</label>
                                <div class="col-xs-18">
                                    <input type="text" class="form-control" id="address" v-model = "prisonerInfo.address">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-10">
                            <div class="form-group">
                                <label for="prisonerDepartmentId" class="col-xs-6 control-label"><i class="important">*</i>监区：</label>
                                <div class="col-xs-12">
                                    <select class="form-control" id="prisonerDepartmentId" :disabled = "prisonerId != undefined" v-model = "prisonerInfo.prisonDepartmentId">
                                        <option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>
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
                            <input type="button" value="确认" class="add-button" @click = "commitPrisonerInfo">
                        </div>    
                    </div>
                </form>
            </div>
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>
<style lang="less" scoped>
.upload-box {
    position: relative;
    .upload-btn {
        opacity: 0;
        z-index: 1000;
        position: absolute; 
        left: 0;
        top: 0;
        height: 120px;
        width: 100px;
    }
    .preview-img {
        width: 100px;
        height: 120px;
    }
}
</style>
<script>
    import Remind from '../Remind.vue'
    import store from '../../store'
    import Util from '../../../static/js/util.js'
    export default {
        data (){
            return{
                imgUrl:"./static/img/add.jpg",
                prisons: "",
                prisonerId: "",
                prisonName: "",
                remind:{
                    status:'',
                    msg:''
                },
                prisonerInfo: {
                    name: "",
                    sex: 0,
                    prisonId: "",
                    prisonDepartmentId: "",
                    cardNo: "",
                    insideArchivesNumber: "",
                    archivesNumber: "",
                    number: ""
                },
                prisonDepartments: ""
            }
        },
        watch: {
            prisonName(){
                let oldPrisonId = this.prisonerInfo.prisonId;
                for (let i = 0; i< this.prisons.length; i++)  {
                    if (this.prisons[i].prisonName == this.prisonName) {
                        this.prisonerInfo.prisonId = this.prisons[i].id;
                    }
                }
                if (this.prisonerInfo.prisonId != oldPrisonId) {
                    this.getPrisonDepartInfo();
                }
            }
        },
        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
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
                    minView: 2,
                    pickerPosition: 'bottom-left'
                });
            },
            getImgUrl() {
                let self = this;
                $("#imgUrlBtn").on("change",function (e) {
                    let file = e.target.files[0];
                    Util.readImgUrl(file,self,'imgUrl');
                });
            },
            getEditInfo() {
                let prisonerId = this.$route.params.id;
                this.prisonerId = prisonerId;
                // console.log(this.prisonerId);
                if (prisonerId != undefined) {//编辑页面
                    this.$http.get('prisoner/getPrisoner',{params: {"prisonerId":prisonerId}}).then(res=>{
                        // console.log("editInfo:");
                        // console.log(res);
                        if (res.data.code == 0) {
                            let date = res.data.data.intoPrisonDate;
                            if (date != null) {
                                $("#intoPrisonDate").val(this.formatDate(date));//处理日期格式
                            }
                            this.prisonerInfo = res.data.data;//赋值罪犯信息
                            //根据相应的监狱ID来获取监狱名进行显示
                            for (let i = 0; i< this.prisons.length; i++)  {
                                if (this.prisons[i].id == this.prisonerInfo.prisonId) {
                                    this.prisonName = this.prisons[i].prisonName;
                                }
                            }
                            let prisonId = this.prisonerInfo.prisonId;
                            // console.log("prisonId" + this.prisonerInfo.prisonId);
                            let prisonDepartmentId = this.prisonerInfo.prisonDepartmentId;   
                            this.getPrisonDepartInfo(prisonDepartmentId);//获取监区信息
                            this.imgUrl = this.prisonerInfo.imgUrl;
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
                
            },
            getPrisonInfo() {//根据用户信息获取监狱信息
                this.$http.get('prisoner/toAddOrEdit').then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisons = res.data.data.prisons;//赋值监狱列表
                        this.getEditInfo();
                        if (this.prisons.length == 1) {
                            this.prisonName = this.prisons[0].prisonName;
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            getPrisonDepartInfo (departId) {//获取监区信息
                let prisonId = this.prisonerInfo.prisonId;
                this.$http.get('prisoner/getDepartments',{params: {"prisonId":prisonId}}).then(res=>{
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.prisonDepartments = res.data.data;//赋值监区列表
                        if (departId == null){
                            this.prisonerInfo.prisonDepartmentId = this.prisonDepartments[0].id;
                        } else {
                            this.prisonerInfo.prisonDepartmentId = departId;
                        }   
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            commitPrisonerInfo () {
                let prisonerInfo = this.prisonerInfo;
                // console.log('prisonerInfo.name'+prisonerInfo.name);
                // console.log(this.prisonerInfo);
                if (this.imgUrl != "./static/img/add.jpg" && prisonerInfo.prisonId != "" && prisonerInfo.prisonDepartmentId != "" && prisonerInfo.name != "" && prisonerInfo.archivesNumber != "" && prisonerInfo.number != "") {//必填项都有值
                    let numReg = new RegExp("^[0-9]*$");// 数值
                    let cardReg = new RegExp("^\\d{17}(\\d|x)$");//身份证号
                    if((prisonerInfo.cardNo != "" && !cardReg.test(prisonerInfo.cardNo))||!numReg.test(prisonerInfo.number)||!numReg.test(prisonerInfo.archivesNumber)||(prisonerInfo.insideArchivesNumber != "" && !numReg.test(prisonerInfo.insideArchivesNumber))) {
                        this.remind = {
                            status:'warn',
                            msg:'输入不合法'
                        }
                        setTimeout(function(){
                            store.dispatch('showRemind');
                        },100)
                        
                    }else{
                        prisonerInfo.prisonerId = this.$route.params.id;
                        prisonerInfo.imgUrl = this.imgUrl;
                        prisonerInfo.intoPrisonDate = $("#intoPrisonDate").val();
                        // console.log(this.prisonerInfo);
                        this.$http.post("prisoner/addOrEditPrisoner",$.param(prisonerInfo)).then(res=>{
                            // console.log(res);
                            if (res.data.code == 0) {
                                this.$router.push({path:"/crimsearch"});
                            } else {
                                this.remind = {
                                    status:'failed',
                                    msg:res.data.msg
                                }
                                store.dispatch('showRemind');
                            }
                        }).catch(err=>{
                            console.log('新增服务器异常' + err);
                        });
                    }
                }else {
                    this.remind = {
                        status:'warn',
                        msg:'请填写完整后再进行提交'
                    }
                    store.dispatch('showRemind');
                    // alert("请填写完整再提交");
                }
                    
            },
            formatDate(value) {
                let buling = val => {
                    val = 1*val;
                    if (val < 10){
                        val = '0' + val;
                    }
                    return val;
                };
                let now=new Date(value);
                let year=now.getFullYear();     
                let month=buling(now.getMonth()+1);     
                let date=buling(now.getDate()); 
                return year+"-"+month+"-"+date+" ";
            }
        },
        components:{
            Remind
        },
        mounted(){
            this.dateInit();
            this.getImgUrl();
            this.getPrisonInfo();
        }
    }
</script>