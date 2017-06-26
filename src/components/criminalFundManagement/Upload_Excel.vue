<template>
  <!-- 右侧内容-->
  <div class="col-xs-24 pull-right">

    <!--表格部分-->
    <div class="col-xs-24 form">

      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example">
          <thead>
            <tr>
              <th></th>
              <th>所属监狱</th>
              <th>资金分配类型</th>
              <th>罪犯名</th>
              <th>罪犯编号</th>
              <th>分配金额</th>
              <th>提示</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pcil in prisonerCapitalIncomesList">
              <td></td>
              <td v-text="pcil.prisonName"></td>
              <td>{{pcil.type | locationType}}</td>
              <td v-text="pcil.name"></td>
              <td v-text="pcil.number"></td>
              <td v-text="pcil.money"></td>
              <td class="reject-text" v-text="pcil.tips"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize='prisonerCapitalIncomeSize' :pageSize='pageSize' :indexPage='indexPage'
            v-on:search='getCriminalFundDistribution'></Page>

      <div class="remarkBox pull-left col-xs-23">

        <div class="col-xs-1">
          <label for="remark" class="pull-left col-xs-24">备注</label>
        </div>

        <div class="col-xs-12">
          <input id="remark" type="text" class="col-xs-24" v-model="remark">
        </div>

        <div class="col-xs-1">
          <span class="remind-text pull-left col-xs-24 text-center">必填</span>
        </div>

      </div>

      <div class="confirm pull-left col-xs-23">

        <div class="col-xs-13">
          <button class="pull-right" :class="{disabledBtn:hasErrMsg}" :disabled="hasErrMsg" @click="confirmDistribution()">确认分配</button>
        </div>

        <div class="col-xs-5" >
          <span v-show="hasErrMsg" class="col-xs-24 text-center">罪犯信息错误，无法分配</span>
        </div>

        <div class="col-xs-6">
          <button class="" @click="reUploadExcel()">重新上传</button>
        </div>

      </div>

    </div>

    <!--<Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :back='remind.back'></Remind>-->

    <!--<CriminalFundDistribution v-show='cfdshow' v-on:prisonCapitalIncomes="getPrisonCapitalIncomes"></CriminalFundDistribution>-->

  </div>

</template>

<script>

  import Page from '../Paginator.vue'
  import axios from 'axios'
  import store from '../../store'
  import CriminalFundDistribution from './Criminal_Fund_Distribution.vue'
  import Remind from '../Remind.vue'

  export default {
    props: ['excelData'],
    data() {
      return {
        indexPage: 1,
        pageSize: 10,
        menuSize: '',
        prisonId: '',
        prisonName: '',
        prisonList: [],
        criminalFundAllocationList: [],

        prisonCapitalIncomes: [],//罪犯资金分配列表
        prisonerCapitalIncomesList: [],
        prisonerCapitalIncomeSize: '',

        dataId: '',//excel文件id
        remark: '',//备注
        prison_name:'',//分配资金列表监狱名称
        type:'',//类型
        cfdshow: false,//控制显示

        hasErrMsg: false,//有错误信息
        remind: {
          status: '',
          msg: ''
        }
      }
    },
    watch: {
      excelData() {
        this.dataId = this.excelData.dataId;
        this.prisonerCapitalIncomesList = this.excelData.prisonerCapitalIncomes;
        this.prisonerCapitalIncomeSize = this.excelData.prisonerCapitalIncomeSize;
        $.each(this.prisonerCapitalIncomesList, (index, value) => {
          this.prison_name =  value.prisonName;
          this.type = value.type;
          if (value.tips) {
            this.hasErrMsg = false;
            return;
          } else {
            this.hasErrMsg = true;
          }
        });
        console.log(this.hasErrMsg)
      },

      uploadType() {
        console.log(this.uploadType);
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

      //确认分配
      confirmDistribution() {
        if(this.isNull(this.remark)) {
          this.remind = {
            status: 'warn',
            msg: '请填写备注信息',
          };
          store.dispatch('showRemind');
          return;
        }

        let confirmData = {
          dataId:this.dataId,
          type:this.type,
          remark:this.remark
        }

        this.$http({
          method: 'post',
          url: '/addPrisonerCapitalIncome',
          params:confirmData
        }).then(res => {
          if(res.data.code == 0){
            this.$emit('isDistribution',true);
            this.remind = {
              status: 'success',
              msg: '分配上传成功',
            };
            store.dispatch('showRemind');
          } else {
            this.remind = {
              status: 'warn',
              msg:res.data.msg
            };
            store.dispatch('showRemind');
          }
        }).catch(err => {
          console.log(err);
        });
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
            $.each(this.prisonerCapitalIncomesList,(index,value)=>{
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
        axios.post('/clearCachePrisonerCapitalIncome',$.param({
          dataId:this.dataId
        })).then((res) => {
//          console.log(res.data);
          if (res.data.code == 0) {
            this.$emit('isDistribution',true);
            this.remind = {
              status: 'success',
              msg: '重新上传成功',
            };
            store.dispatch('showRemind');
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    components: {
      Page,
      CriminalFundDistribution,
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

<style type="text/less" lang="less" scoped>
  @white: #fff;
  @gray: #C1C1C1;
  @textGray: #B8B8B8;
  @green: #1AA3AB;
  /**{*/
  /*border:1px solid #000;*/
  /*}*/
  .reject-text {
    margin-left: 15%;
    color: #ff1616;
  }

  .form {
    margin-top: 81px;
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
