<template>
  <!-- 右侧内容-->
  <div class="col-xs-24 pull-right">
    <!--按钮部分-->
    <div class="col-xs-23 exportBtn">
      <button class="btn pull-left btnPrint" @click="print()"><span class="glyphicon glyphicon-print"></span>确定打印
      </button>
    </div>

    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example">
          <thead>
            <tr>
              <th></th>
              <th>所属监狱</th>
              <th>所属监区</th>
              <th>流水号</th>
              <th>类别</th>
              <th>账户名</th>
              <th>对方账户名</th>
              <th>金额(元)</th>
              <th>交易时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pcdd in prisonCapitalDetailDtos">
              <td :id='pcdd.prisonCapitalDetailId'></td>
              <td v-text='pcdd.prisonName'></td>
              <td v-text='pcdd.prisonDepartmentName'></td>
              <td v-text='pcdd.capitalSerialNo'></td>
              <td>{{pcdd.type | prisonFundType}}</td>
              <td v-text='pcdd.accountName'></td>
              <td v-text='pcdd.toAccountName'></td>
              <td v-if='pcdd.capitalType == 0'>{{pcdd.money | currency}}</td>
              <td v-else-if='pcdd.capitalType == 1' class='text-red'>+{{pcdd.money | currency}}</td>
              <td v-else-if='pcdd.capitalType == 2' class='text-green'>-{{pcdd.money | currency}}</td>
              <td>{{pcdd.createdAt | formatDate}}</td>
              <td>{{pcdd.status | fundDetailStatus}}</td>
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
          <button class="pull-right btnPrint" @click="print()">确认打印</button>
        </div>
      </div>

    </div>

    <Remind v-if='remindShow' :reload="remind.reload" :status='remind.status' :msg='remind.msg'></Remind>

  </div>

</template>

<style type="text/less" lang="less" scoped>
  @white: #fff;
  @gray: #C1C1C1;
  @textGray: #B8B8B8;
  @green: #1AA3AB;
  @marginLeft:2%;

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
    margin-left:@marginLeft;
    margin-bottom:15px;
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
    margin-top:15px;
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
    .typeBox{
      margin-top:-5px;
      label{
        line-height:31px;
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

  .disabledBtn{
    background-color:#C1C1C1 !important
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
    props: ['excelData','remind'],
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
        prison_name:'',//分配资金列表监狱名称
        type:0,//类型
        cfdshow: false,//控制显示
        hasErrMsg: true,//有错误信息
        accountName:'',//账户名
        balance:'',//可分配金额
        totalMoney:'',//待分配金额

        prisonCapitalDetailDtos:[],//监狱资金明细列表
        prisonCapitalDetailDtosTemp:[]//临时监狱资金明细列表
      }
    },

    watch: {
      excelData() {
        this.prisonCapitalDetailDtos = this.excelData;
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
      //点击打印执行的方法
      print() {
        $("#table_id_example").print({
          addGlobalStyles : true,
          stylesheet : null,
          rejectWindow : true,
          noPrintSelector : ".no-print",
          iframe : true,
          append : null,
          prepend : null
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted() {
      $('#table_id_example').tableHover();
    },
    updated() {
      $('#table_id_example').tableHover();
    }
  }
</script>
