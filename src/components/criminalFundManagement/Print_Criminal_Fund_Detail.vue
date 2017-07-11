<template>
  <!-- 右侧内容-->
  <div class="col-xs-24 pull-right">

    <!--按钮部分-->
    <div class="col-xs-23 exportBtn">
      <button class="btn pull-left btnPrint"><span class="glyphicon glyphicon-print"></span>确定打印
      </button>
      <!--<button class="btn pull-right" @click="printPrisonCapitalDetails()"><span-->
      <!--class="glyphicon glyphicon-print"></span>打印数据-->
      <!--</button>-->
    </div>

    <!--表格部分-->
      <div class="col-xs-24 form">
        <div class="col-xs-23" id="printContent">
          <table class="display table ic-table" id="table_id_example">
            <thead>
              <tr>
                <th></th>
                <th>所属监狱</th>
                <th>所属监区</th>
                <th>流水号</th>
                <th>姓名</th>
                <th>编号</th>
                <th>类别</th>
                <th>对方账户名</th>
                <th>交易金额(元)</th>
                <th>余额(元)</th>
                <th>交易状态</th>
                <th>交易时间</th>
                <!--<th colspan=2>操作</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="detail in printCriminalFundDetailDtos">
                <td></td>
                <td>{{detail.prison_name}}</td>
                <td>{{detail.prison_department_name}}</td>
                <td>{{detail.capitalSerialNo}}</td>
                <td>{{detail.name}}</td>
                <td>{{detail.number}}</td>
                <td>{{detail.type | formatFundType}}</td>
                <td>{{detail.otherAccountName}}</td>
                <td v-if='detail.type >= 3' class='text-red'>+{{detail.money | currency}}</td>
                <td v-else-if='detail.type <3' class='text-green'>-{{detail.money | currency}}</td>
                <td>{{detail.balance | currency}}</td>
                <td>{{detail.status | dealStatus}}</td>
                <td>{{detail.createTime | formatDate}}</td>
                <!--<td><em class="agree-text" @click="inDetail(detail.capitalSerialNo,detail.capitalType)">明细</em></td>-->
                <!--<td><em class="agree-text" @click="inWithdraw(detail.capitalSerialNo,detail.money)"-->
                <!--v-show="(detail.type == 0 || detail.type == 1 || detail.type == 2) && detail.status == 1">撤回</em>-->
                <!--</td>-->
                <!--<td><a class="tooltip-toggle" data-toggle="tooltip" data-placement="bottom" :title="detail.remark">{{detail.remark | formatRemark}}</a></td>-->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 表单底部-->
        <!--<Page :itemSize='prisonerBatchApplySize' :pageSize='pageSize' :indexPage='indexPage'-->
        <!--v-on:search='getPrisonerBatchApplyData'></Page>-->

        <!--<div class="remarkBox pull-left col-xs-23">-->
        <!--<div class="col-xs-1">-->
        <!--<label for="remark" class="pull-left col-xs-24">备注</label>-->
        <!--</div>-->
        <!--<div class="col-xs-10">-->
        <!--<input id="remark" type="text" class="col-xs-24" v-model="remark">-->
        <!--</div>-->
        <!--<div class="col-xs-1">-->
        <!--<span class="remind-text pull-left col-xs-24 text-center">必填</span>-->
        <!--</div>-->
        <!--</div>-->

        <div class="confirm pull-left col-xs-23">
          <div class="col-xs-13">
            <button class="pull-right btnPrint">确认打印</button>
          </div>
          <!--<div class="col-xs-5" >-->
          <!--<span v-show="hasErrMsg" class="col-xs-24 text-center">罪犯信息错误，无法取现</span>-->
          <!--</div>-->

          <!--<div class="col-xs-6">-->
          <!--<button class="" @click="reUploadExcel()">重新上传</button>-->
          <!--</div>-->
        </div>
      </div>
    <Remind v-if='remindShow' :reload="remind.reload" :status='remind.status' :msg='remind.msg'></Remind>

    <!--<CriminalFundDistribution v-show='cfdshow' v-on:prisonCapitalIncomes="getPrisonCapitalIncomes"></CriminalFundDistribution>-->
  </div>
</template>

<style type="text/less" lang="less" scoped>
  @white: #fff;
  @gray: #C1C1C1;
  @textGray: #B8B8B8;
  @green: #1AA3AB;
  @marginLeft: 2%;

  /**{*/
  /*border:1px solid #000;*/
  /*}*/
  .text-red {
    color: #E96900;
  }

  .text-green {
    color: #4DB983;
  }

  .reject-text {
    /*margin-left: 15%;*/
    color: #ff1616;
  }

  .agree-text {
    color: #1AA3AB;
  }

  .message {
    /*margin-top: 90px;*/
    margin-left: @marginLeft;
    margin-bottom: 15px;
  }

  .exportBtn {
    margin-left: @marginLeft;
    margin-top: 81px;
    button {
      &:nth-child(1) {
        margin-right: @marginLeft;
        background: #1EBAD1;
        color: @white;
        &:hover {
          background: #1AA3AB;
        }
      }
    }
  }

  .form {
    margin-top: 15px;
  }

  .remarkBox {
    margin-left: 2%;
    background: @white;
    margin-bottom: 20px;
    padding: 20px 10px 15px 10px;
    border: 1px solid #E9E9E9;
    > div {
      &:first-child {
        margin-left: 1%;
      }

      &:nth-child(2) {
        input {
          height: 30px;
          margin-top: -5px;
        }
      }
    }
    .remind-text {
      color: #ff1616;
    }
    .typeBox {
      margin-top: -5px;
      label {
        line-height: 31px;
      }
    }
  }

  .confirm {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 25px;
    > div {
      &:first-child {
        button {
          .button(@green, @white, 35px, 150px);
        }
      }
      &:nth-child(2) {
        span {
          color: @textGray;
          line-height: 35px;
        }
      }
      &:nth-child(3) {
        position: relative;
        button {
          .button(@green, @white, 35px, 150px);
        }
        input {
          position: absolute;
          width: 57%;
          height: 35px;
          top: 0;
          opacity: 0;
        }
      }
    }
  }

  .disabledBtn {
    background-color: #C1C1C1 !important
  }

  .button(@bgColor,@color,@height,@width) {
    background: @bgColor;
    color: @color;
    height: @height;
    width: @width;
    border: none;
    border-radius: 2px;
  }
</style>

<script>

  import Page from '../Paginator.vue'
  import axios from 'axios'
  import store from '../../store'
  import Remind from '../Remind.vue'

  export default {
    props: ['excelData', 'remind'],
    data() {
      return {
        indexPage: 1,
        pageSize: 10,
        menuSize: '',
        prisonId: '',
        prisonName: '',
        prisonList: [],
        criminalFundAllocationList: [],

        dataId: '',//excel文件id
        remark: '',//备注
        prison_name: '',//分配资金列表监狱名称
        type: 0,//类型
        cfdshow: false,//控制显示
        hasErrMsg: true,//有错误信息
        accountName: '',//账户名
        balance: '',//可分配金额
        totalMoney: '',//待分配金额

        printCriminalFundDetailDtos: [],//监狱资金明细列表
        printCriminalFundDetailDtosTemp: []//临时监狱资金明细列表
      }
    },

    watch: {
      excelData() {
        console.log(this.excelData);
//        this.prisonCapitalDetailDtos = this.excelData;
        this.printCriminalFundDetailDtos = this.excelData;
      },

      uploadType() {
        $.each(this.prisonerCapitalIncomesList, (index, value) => {
          value.type = this.uploadType;
        });
      },

      //根据监狱名称得到监狱ID
      prisonName() {
        this.prisonId = '';
        if (this.prisonName != '') {
          $.each(this.prisonList, (index, value) => {
            if (value.prisonName == this.prisonName) {
              this.prisonId = value.id;
            }
          });
          if (this.prisonId == '') {
            this.prisonId = -1
          }
        } else {
          this.prisonId = '';
        }
      },
    },
    computed: {
      remindShow: {
        get() {
          return store.getters.remindShow;
        }
      }
    },
    methods: {
      //查询所有监狱列表
      getAllPrison() {
        this.$http({
          method: 'get',
          url: '/prisoner/toAddOrEdit',
        }).then(res => {
          let data = res.data.data;
          this.prisonList = data.prisons;
          if (this.prisonList.length == 1) {
            this.prisonId = this.prisonList[0].id;
            this.prisonName = this.prisonList[0].prisonName;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //确认取现
      confirmDistribution() {
        if (this.isNull(this.remark)) {
          this.remind = {
            status: 'warn',
            msg: '请填写备注信息',
          };
          store.dispatch('showRemind');
        } else {
          let confirmData = {
            dataId: this.dataId,
            type: this.type,
            remark: this.remark
          }
          this.$http({
            method: 'post',
            url: '/prisonerAccount/batchApplyWithdrawCash',
            params: confirmData
          }).then(res => {
            if (res.data.code == 0) {
              this.remind = {
                status: 'success',
                msg: '分配上传成功',
                reload: true
              };
              store.dispatch('showRemind');
            } else {
              this.remind = {
                status: 'warn',
                msg: res.data.msg
              };
              store.dispatch('showRemind');
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },

      //罪犯资金分配查询
      getCriminalFundDistribution(indexPage) {
        this.indexPage = indexPage;
        axios.get('getPrisonerCapitalIncomeData', {
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            dataId: this.dataId,
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.prisonerCapitalIncomesList = res.data.data.prisonerCapitalIncomes;
            this.prisonerCapitalIncomeSize = res.data.data.prisonerCapitalIncomeSize;
            $.each(this.prisonerCapitalIncomesList, (index, value) => {
              value.type = this.type;
              value.prisonName = this.prison_name;
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //重新上传
      reUploadExcel() {
        axios.post('/prisonerAccount/clearCachePrisonerBatchApply', $.param({
          dataId: this.dataId
        })).then((res) => {
          if (res.data.code == 0) {
            window.location.reload();
          }
        }).catch(err => {
          console.log(err);
        })
      },

      //缓存区批量申请取现分页查询
      getPrisonerBatchApplyData(indexPage) {
        if (indexPage) {
          this.indexPage = indexPage;
        }
        axios.get('/prisonerAccount/getPrisonerBatchApplyData', {
          params: {
            dataId: this.dataId,
            indexPage: this.indexPage,
            pageSize: this.pageSize
          }
        }).then(res => {
//          this.prisonerBatchApplys = res.data.data.prisonerBatchApplys;
//          this.prisonerBatchApplySize = res.data.data.prisonerBatchApplySize;
        }).catch(err => {
          console.log(err);
        });
      },
    },
    components: {
      Page,
      Remind
    },
    mounted() {
      $('#table_id_example').tableHover();
      $(function () {
        $(".btnPrint").click(function () {
          $("#printContent").printArea();
        });
      });
    },
    updated() {
      $('#table_id_example').tableHover();
      $(function () {
        $(".btnPrint").click(function () {
          $("#printContent").printArea();
        });
      });
    }
  }
</script>
