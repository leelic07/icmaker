<template>
 	<!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--搜索框部分-->
        <div class="col-xs-24 search">
            <div class="col-xs-23 search-box">
                <div class="col-xs-23 search-inner-box">
                    <div class="row">
                        <div class="col-xs-7 text-box">
                            <input type="text" class="form-control" placeholder="读取IC卡" v-model = "icCardNo" id="icCardNo" @change = "getPrisonerInfo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--罪犯信息部分-->
        <div class="col-xs-24 criminal-info" v-if = "code == 0">
            <div class="col-xs-23 form-header">
                <h4 class="col-xs-2 col-xs-offset-1">罪犯信息</h4>
            </div>
            <div class="col-xs-23 information">
                <div class="col-xs-19">
                    <div class="col-xs-3">
                        <img :src="prisonerInfo.imgUrl" alt="罪犯照片"/>
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
                }
			}
		},
        watch: {
            icCardNo(val){
                console.log(val);
                this.getPrisonerInfo ();
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
            getPrisonerInfo () {
                console.log(this.icCardNo);
                let prisonerData = {
                    "icCardNo": this.icCardNo
                };
                this.$http.get('prisonerConsumer/getPrisoner',{params:prisonerData}).then(res=>{
                    console.log(res);
                    this.code = res.data.code;
                    if (res.data.code == 0) {
                        this.prisonerInfo = res.data.data;
                        this.prisonerId = this.prisonerInfo.prisonerId;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },

            consumeConfirm() {
                if (this.money != "" && this.money > 0) {
                    if (this.money < this.prisonerInfo.money/100) {
                        let prisonerData = {
                            "prisonerId": this.prisonerId,
                            "money": this.money*100,
                            "remark": this.remark
                        };
                        this.$http.post("prisonerConsumer/addPrisonerCapitalConsumer",$.param(prisonerData)).then(res=>{
                            console.log(res);
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
                    }else {
                        this.remind = {
                            status:'warn',
                            msg:'余额不足'
                        }
                        store.dispatch('showRemind');
                    }
                }else {
                    this.remind = {
                        status:'warn',
                        msg:'请输入消费金额'
                    }
                    store.dispatch('showRemind');
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