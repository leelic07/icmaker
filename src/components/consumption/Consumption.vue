<template>
 	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-7 text-box">
                            <input type="text" class="form-control" placeholder="读取IC卡" v-model = "icCardNo" id="icCardNo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--罪犯信息部分-->
        <div class="col-xs-24 criminal-info" v-if='show == true'>
            <div class="col-xs-23 form-header">
                <h4 class="col-xs-2 col-xs-offset-1">罪犯信息</h4>
            </div>
            <div class="col-xs-23 information">
                <div class="col-xs-19">
                    <div class="col-xs-3">
                        <img :src="prisonerInfo.imgUrl" alt="罪犯照片"/>
                        <photoLoading v-show='photoLoadingShow'></photoLoading>
                    </div>
                    <ul class="col-xs-19 col-xs-offset-1">
                        <li class="col-xs-12">
                            <p class="col-xs-12">姓名</p>
                            <p class="col-xs-12">{{prisonerInfo.prisonerName}}</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">所在监狱</p>
                            <p class="col-xs-12">{{prisonerInfo.prisonName}}</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">所在监区</p>
                            <p class="col-xs-12">{{prisonerInfo.prisonDepartmentName}}</p>
                        </li>
                        <li class="col-xs-12">
                            <p class="col-xs-12">档案号</p>
                            <p class="col-xs-12">{{prisonerInfo.archivesNumber}}</p>
                        </li>
                    </ul>
                </div>
                <div class="col-xs-5 account-remaining">
                    <p>账户余额</p>
                    <div class="remaining">
                        <h1 class="pull-left">{{prisonerInfo.money | formatInteger}}</h1><h3 class="pull-left">{{prisonerInfo.money | formatDecimal}}元</h3>
                    </div>
                </div>
            </div>
            <div class="col-xs-23 input-box" v-if = "prisonerInfo.money != 0">
                <div class="col-xs-8 col-xs-offset-1">
                    <input type="text" class="form-control" placeholder="输入消费金额" id = "money" v-model = "money"/>
                </div>
                <div class="col-xs-5 col-xs-offset-1">
                    <input type="text" class="form-control" placeholder="输入备注" id="remark" v-model = "remark"/>
                </div>
                <div class="col-xs-4 col-xs-offset-1 button-box">
                    <button class="search-button" @click = "consumeConfirm">确认</button>
                </div>
            </div>
        </div>

        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>

<script>
    import Remind from '../Remind.vue'
    import store from '../../store'

	export default{
		data(){
			return{
                icCardNo: "",
                prisonerInfo: "",
                code: 9999,
                prisonerId: "",
                money: "",
                remark: "",
                remind:{
                    status:'',
                    msg:''
                },
                show:false
			}
		},
        watch: {
            icCardNo(val){
                this.getPrisonerInfo ();
            },
            money() {
                this.money = this.saveTwo(this.money);
            }
        },

        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            },

            photoLoadingShow:{
                get(){
                    return store.getters.photoLoadingShow;
                }
            }
        },

        methods:{
            getPrisonerInfo () {
                this.money = "";
                this.remark = "";
                let icCardNo = this.empty(this.icCardNo)[0];
                let prisonerData = {
                    "icCardNo": icCardNo
                };
                this.$http.get('prisonerConsumer/getPrisoner',{params:prisonerData}).then(res=>{
                    this.code = res.data.code;
                    if (res.data.code == 0) {
                        this.show =true;
                        this.prisonerInfo = res.data.data;
                        this.prisonerId = this.prisonerInfo.prisonerId;
                        store.dispatch('hidePhotoLoading');                    
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            consumeConfirm() {
                let money = this.toCent(this.empty(this.money)[0]);
                if (this.isNull(this.money)) {
                    this.remind = {
                        status:'warn',
                        msg:'请输入消费金额'
                    }
                    store.dispatch('showRemind');
                }else if (!this.isNumber(this.empty(this.money)[0]) || money <= 0) {
                    this.remind = {
                        status:'warn',
                        msg:'输入不合法'
                    }
                    store.dispatch('showRemind');
                } else if (money > this.prisonerInfo.money) {
                    this.remind = {
                        status:'warn',
                        msg:'余额不足'
                    }
                    store.dispatch('showRemind');
                }else {
                    let prisonerData = {
                        "prisonerId": this.prisonerId,
                        "money": money,
                        "remark": this.remark
                    };
                    this.$http.post("prisonerConsumer/addPrisonerCapitalConsumer",$.param(prisonerData)).then(res=>{
                        if (res.data.code == 0) {
                            this.icCardNo = "";
                            this.getPrisonerInfo();
                            this.money = "";
                            this.remark = "";
                            this.remind = {
                                status:'success',
                                msg:res.data.msg
                            }
                        }else {
                            this.remind = {
                                status:'failed',
                                msg:res.data.msg
                            }
                        }
                        store.dispatch('showRemind');
                        
                    }).catch(err=>{
                        console.log('新增服务器异常' + err);
                    });
                }
            }
        },
        components:{
            Remind
        },
        mounted(){
            this.getPrisonerInfo();
		}
	}
</script>

<style lang="less" scoped>
    #right-side{
        background-color:#f5f5f5;
        .search-box{
        	.search-inner-box{
        		background-color:#fff;
        		margin-top:0;
        		margin-bottom:0;
        	}
        }
        .criminal-info{
            .information{
                > div {
                    padding:30px 0 0 1%;
                }
            }
        } 
        .label-box{
    		label{
        		font-weight:normal;
    		}
    	}
    	.information {
    		img{
        		width:100%;
        		height:150px;
    		}
            >div{
                &:nth-child(1){
                    >div{
                        &:nth-child(1){
                            position:relative;
                        }
                    }
                }
            } 
		}
		.button-box{
			text-align: center;
        	margin-top:-4px;
        	.search-button {
	            color: #fff;
	            font-size: 14px;
	            background: #1aa3ab;
	            width: 80%;
	            height:40px;
	            -moz-border-radius: 3px;
	            -webkit-border-radius: 3px;
	            border-radius: 3px;
	            border: 1px solid #1aa3ab;
    		}
		} 
    }
</style>