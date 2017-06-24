<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-7 text-box">
              <input type="text" class="form-control" placeholder="读取IC卡" v-model="icCardNo" id="icCardNo" autofocus>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--罪犯信息部分-->
    <div class="col-xs-24 criminal-info" v-show='show == true'>
      <div class="col-xs-23 form-header">
        <h4 class="col-xs-2 col-xs-offset-1">罪犯信息</h4>
      </div>
      <div class="col-xs-23 information">
        <div class="col-xs-10">
          <div class="col-xs-4">
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
            <li class="col-xs-12">
              <p class="col-xs-12">处遇等级</p>
              <p class="col-xs-12">{{prisonerInfo.levelName}}</p>
            </li>
          </ul>
        </div>
        <div class="col-xs-4">
          <ul class="col-xs-19 col-xs-offset-1">
            <li class="col-xs-24">
              <p class="col-xs-12">A类余额</p>
              <p class="col-xs-12">{{prisonerInfo.aMoney| currency}}元</p>
            </li>
            <li class="col-xs-24">
              <p class="col-xs-12">B类余额</p>
              <p class="col-xs-12">{{prisonerInfo.bMoney| currency}}元</p>
            </li>
          </ul>
        </div>
        <div class="col-xs-5">
          <ul class="col-xs-19 col-xs-offset-1">
            <li class="col-xs-24">
              <p class="col-xs-16">当天已消费金额</p>
              <p class="col-xs-8">{{prisonerInfo.dayConsume| currency}}元</p>
            </li>
            <li class="col-xs-24">
              <p class="col-xs-16">当天可消费金额</p>
              <p class="col-xs-8">{{prisonerInfo.dayMoneyLimit| currency}}元</p>
            </li>
            <li class="col-xs-24">
              <p class="col-xs-16">当月已消费金额</p>
              <p class="col-xs-8">{{prisonerInfo.monthConsume| currency}}元</p>
            </li>
            <li class="col-xs-24">
              <p class="col-xs-16">当月可消费金额</p>
              <p class="col-xs-8">{{prisonerInfo.monthMoneyLimit| currency}}元</p>
            </li>
          </ul>
        </div>
        <div class="col-xs-5 account-remaining">
          <p>账户余额</p>
          <div class="remaining">
            <h1 class="pull-left">{{prisonerInfo.money | formatInteger}}</h1>
            <h3 class="pull-left">{{prisonerInfo.money | formatDecimal}}元</h3>
          </div>
        </div>
      </div>
      <div class="col-xs-23 input-box" v-show="prisonerInfo.money != 0">
        <div class="col-xs-8 col-xs-offset-1">
          <input type="text" class="form-control" placeholder="输入消费金额" id="money" v-model="money" autofocus = "autofocus" @keyup.enter = "consume"/>
        </div>
        <div class="col-xs-5 col-xs-offset-1">
          <!--<input type="text" class="form-control" placeholder="输入备注" id="remark" v-model="remark" @keyup.enter = "consume"/>-->
        </div>
        <div class="col-xs-4 col-xs-offset-1 button-box">
          <button class="search-button" @click="consume">确认</button>
        </div>
      </div>
    </div>

    <!--模态框-->

    <!-- 确认消费-->
    <div class="modal modal-confirm" id="consumeConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" @keyup = "consumeConfirm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                        &times;
                    </button>
                </div>
                <div class="modal-body">
                    <h3>确认给{{prisonerInfo.prisonerName}}消费{{money}}元？</h3>
                    <button class="confirm-button" :class = "{'active-button':opt[0]}" data-dismiss="modal" @click = "consumeConfirm">确定</button>
                    <button class="cancel-button" :class = "{'active-button':opt[1]}" data-dismiss="modal">取消</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <Remind v-if="remindShow" :status='remind.status' :msg='remind.msg'></Remind>
  </div>
</template>

<script>
  import Remind from '../Remind.vue'
  import store from '../../store'

  export default{
    data(){
      return {
        icCardNo: "",
        prisonerInfo: "",
        code: 9999,
        prisonerId: "",
        money: "",
        remark: "",
        remind: {
          status: '',
          msg: ''
        },
        activeIndex:0,
        opt:[true,false],
        show: false
      }
    },
    watch: {
      icCardNo(val){
        this.getPrisonerInfo();
      },
      money() {
        this.money = this.saveTwo(this.money);
      }
    },

    computed: {
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
      },

      photoLoadingShow: {
        get(){
          return store.getters.photoLoadingShow;
        }
      }
    },

    methods: {
      getPrisonerInfo () {
        this.show = false;
        this.money = "";
        this.remark = "";
        let icCardNo = this.empty(this.icCardNo)[0];
        let prisonerData = {
          "icCardNo": icCardNo
        };
        this.$http.get('prisonerConsumer/getPrisoner', {params: prisonerData}).then(res => {
          this.code = res.data.code;
          if (res.data.code == 0) {
            console.log(res);
            this.show = true;
            this.prisonerInfo = res.data.data;
            this.prisonerId = this.prisonerInfo.prisonerId;
            setTimeout(function(){
              $("#money").focus();
            },100)
            store.dispatch('hidePhotoLoading');
          }
        }).catch(err => {
          console.log(err);
        });
      },

      consume() {
        let money = this.toCent(this.empty(this.money)[0]);
        if (this.isNull(this.money)) {
          this.remind = {
            status: 'warn',
            msg: '请输入消费金额'
          }
          store.dispatch('showRemind');
          $("#money").focus();
        } else if (!this.isNumber(this.empty(this.money)[0]) || money <= 0) {
          this.remind = {
            status: 'warn',
            msg: '输入不合法'
          }
          store.dispatch('showRemind');
          $("#money").focus();
        } else if (money > this.prisonerInfo.money) {
          this.remind = {
            status: 'warn',
            msg: '余额不足'
          }
          store.dispatch('showRemind');
        } else {
          $("#consumeConfirm").modal();
        }
      },

      consumeConfirm(e) {
        console.log(e.type =="click");
       if (e.keyCode == 39 ) {//右键
          this.activeIndex = this.activeIndex == 1 ? -1 : this.activeIndex;
          this.activeIndex ++ ;
        }else if (e.keyCode == 37) {//左键
          this.activeIndex = this.activeIndex == 0 ? 2 : this.activeIndex;
          this.activeIndex -- ;
        }
        for (let i = 0; i < this.opt.length; i ++){
          this.$set(this.opt,i,false);
        }
        this.$set(this.opt,this.activeIndex,true);

        if (e.keyCode == 13 || e.type =="click") {//回车
          if (this.activeIndex == 1) {//在取消按钮处回车
            $("#consumeConfirm").modal("hide");
          }else if (this.activeIndex == 0 || e.type =="click") {//在确定按钮处回车
            let money = this.toCent(this.empty(this.money)[0]);
            let prisonerData = {
              "prisonerId": this.prisonerId,
              "money": money,
              "remark": this.remark
            };
            this.$http.post("prisonerConsumer/addPrisonerCapitalConsumer", $.param(prisonerData)).then(res => {
              if (res.data.code == 0) {
                this.icCardNo = "";
                this.getPrisonerInfo();
                this.money = "";
                this.remark = "";
                this.remind = {
                  status: 'success',
                  msg: res.data.msg
                }
                $("#consumeConfirm").modal("hide");
                $("#icCardNo").focus();
              } else {
                $("#consumeConfirm").modal("hide");
                this.remind = {
                  status: 'failed',
                  msg: res.data.msg
                }
              }
              store.dispatch('showRemind');

            }).catch(err => {
              console.log('新增服务器异常' + err);
            });
          }
        }  
      }
    },
    components: {
      Remind
    },
    mounted() {
      this.getPrisonerInfo();
    },
    updated() {
      if (!$("#money").is(":focus")) {
        $("#icCardNo").focus();
      }
    }
  }
</script>

<style lang="less" scoped>
  #right-side {
    height: 100%;
    background-color: #f5f5f5;

    .active-button {
      outline: 2px solid #3FB2B9;
    }

    .search-box {
      .search-inner-box {
        background-color: #fff;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    .criminal-info {
      .information {
        > div {
          padding: 25px 0 10px 1%;
          height: 190px;
        }
        ul {
          margin-top: 0;
          li {
            padding: 10px 7% 10px 2%;
          }
        }
      }
    }
    .label-box {
      label {
        font-weight: normal;
      }
    }
    .information {
      img {
        width: 100%;
        height: 110px;
      }
      > div {
        border-right: 1px solid #EAEAEA;
        &:nth-child(1) {
          > div {
            &:nth-child(1) {
              position: relative;
            }
          }
        }
      }
    }
    .button-box {
      text-align: center;
      margin-top: -4px;
      .search-button {
        color: #fff;
        font-size: 14px;
        background: #1aa3ab;
        width: 80%;
        height: 40px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        border: 1px solid #1aa3ab;
      }
    }
  }
</style>
