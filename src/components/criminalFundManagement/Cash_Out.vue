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
              <input list="prisons" placeholder="请选择" class='form-control' v-model='prisonName'
                     v-if='prisonList.length > 1'>
              <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1'
                     disabled>
              <datalist id="prisons">
                <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
              </datalist>
            </div>
            <div class="col-xs-8 select-box">
              <label for="name">所属监区</label>
              <select class="form-control" v-model='prisonDepartmentId'>
                <option value=''>请选择</option>
                <option v-for='pdt in prisonDepartmentsTem' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6 text-box">
              <label for="name">姓名</label>
              <input type="text" class="form-control" v-model='name'>
            </div>
            <div class="col-xs-6 text-box">
              <label for="name">档案号</label>
              <input type="text" class="form-control" v-model='archivesNumber'>
            </div>
            <div class="col-xs-6 text-box">
              <label for="name">读卡</label>
              <input type="text" class="form-control" id="" v-model='idCardNo'>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='searchCashOutList()'>
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
            <th></th>
            <th>所属监狱</th>
            <th>所属监区</th>
            <th>档案号</th>
            <th>姓名</th>
            <th>虚拟账号</th>
            <th>金额(元)</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="col in cashOutList">
            <td></td>
            <td>{{col.prison_name}}</td>
            <td>{{col.prison_department_name}}</td>
            <td>{{col.archives_number}}</td>
            <td>{{col.name}}</td>
            <td>{{col.virtual_account_no}}</td>
            <td>{{col.total | currency}}</td>
            <td><em class="agree-text" @click="cashOut(col.prisoner_id,col.total)">取现</em></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize="cashOutSize" :pageSize="pageSize" :indexPage="indexPage" v-on:search="searchCashOutList"></Page>
    </div>

    <!-- 模态框-->

    <!--取现 -->
    <div class="modal modal-confirm modal-bind" id="cashOutConfirm" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>取现</h3>
            <div class="col-xs-24">
              <input type="text" class="form-control fee-input" placeholder="输入取现金额" v-model='cash'>
            </div>
            <button class="confirm-button" @click='withdrawCash()'>确定</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div> <!-- /.modal -->
    </div>
    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :back='remind.back'></Remind>
  </div>
</template>

<script>
  import Page from '../Paginator.vue'
  import Remind from '../Remind.vue'
  import store from '../../store'

  export default{
    data(){
      return {
        indexPage: 1,
        pageSize: 10,
        cashOutSize: '',
        prisonId: '',
        prisonerId: '',
        prisonName: '',
        prisonDepartmentId: '',
        prisonList: [],
        prisonDepartments: [],
        prisonDepartmentsTem: [],
        cashOutList: [],
        cash: '',
        total: '',
        name: '',
        archivesNumber: '',
        idCardNo: ''
      }
    },
    watch: {
      //根据监狱名称得到监狱ID
      prisonName(){
        this.prisonId = '';
        if (this.prisonName != '') {
          $.each(this.prisonList, (index, value) => {
            if (value.prisonName == this.prisonName) {
              this.prisonId = value.id;
            }
          });
          this.prisonId == '' ? this.prisonId = -1 : '';
        } else {
          this.prisonId = '';
        }
      },

      //监听监狱ID
      prisonId(){
        let pd = this.prisonDepartments;
        let pdt = this.prisonDepartmentsTem;
        pdt.splice(0, pdt.length);
        this.prisonAndPrisonDepartment(pd, pdt);
      },

      //删除小数点两位后的数字
      cash(){
        this.cash = this.saveTwo(this.cash);
      }
    },
    computed: {

      //获得提示模态框状态
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
      },

      //计算获得监区数组
      prisonDepartmentsTem: {
        get(){
          let pd = this.prisonDepartments;
          let pdt = [];
          this.prisonAndPrisonDepartment(pd, pdt);
          this.prisonDepartmentId = '';
          return pdt;
        }
      }
    },
    methods: {
      //监狱，监区联动
      prisonAndPrisonDepartment(pd, pdt){
        $.each(pd, (index, value) => {
          if (value.prisonId == this.prisonId) {
            pdt.push(value);
          }
        });
      },

      //点击取现执行的方法
      cashOut(prisonerId, total){
        this.cash = '';
        this.prisonerId = prisonerId;
        this.total = total;
        $('#cashOutConfirm').modal();
      },

      //点击确定取现按钮
      withdrawCash(){
        let isNull = false;
        let isEnough = true;
        if (!this.isNumber(this.cash) || this.cash == 0) {
          this.remind = {
            status: 'warn',
            msg: '取现金额输入不合法'
          }
          store.dispatch('showRemind');
          isNull = true;
        } else if (this.cash > this.total) {
          this.remind = {
            status: 'warn',
            msg: '余额不足'
          }
          store.dispatch('showRemind');
          isEnough = false;
        }
        if (!isNull && isEnough) {
          this.$http({
            method: 'post',
            url: '/prisonerAccount/withdrawCash',
            params: {
              cash: this.toCent(this.cash),
              prisonerId: this.prisonerId
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.remind = {
                status: 'success',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
            } else {
              this.remind = {
                status: 'failed',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
            }
            $('#cashOutConfirm').modal('hide');
            this.searchCashOutList(this.indexPage);
            this.cash = '';
          }).catch(err => {
            console.log(err);
          });
        }
      },

      //点击搜索执行的方法
      searchCashOutList(index){
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: 'personalCrimeConsumptionRestrictList',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            prisonId: this.prisonId,
            prisonDepartmentId: this.prisonDepartmentId,
            name: this.name.replace(/(^\s*)|(\s*$)/g, ""),
            archivesNumber: this.archivesNumber.replace(/(^\s*)|(\s*$)/g, ""),
            idCardNo: this.idCardNo.replace(/(^\s*)|(\s*$)/g, ""),
            flag:1
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.cashOutList = res.data.data.personalCrimeConsumptionRestrictList;//赋值个人犯罪消费资金列表
            this.cashOutSize = res.data.data.personalCrimeConsumptionRestrictListSize;//赋值个人犯罪消费资金列表数
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //查询所有监狱列表
      getAllPrison(){
        this.$http({
          method: 'get',
          url: '/prisoner/toAddOrEdit',
        }).then(res => {
          let data = res.data.data;
          this.prisonList = data.prisons;
          this.prisonDepartments = data.prisonDepartments;
          if (this.prisonList.length == 1) {
            this.prisonId = this.prisonList[0].id;
            this.prisonName = this.prisonList[0].prisonName;
          }
          this.getCashOutList();
        }).catch(err => {
          console.log(err);
        });
      },

      //得到罪犯资金列表
      getCashOutList(){
        this.$http({
          method: 'get',
          url: 'personalCrimeConsumptionRestrictList',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            prisonId: this.prisonId,
            flag: 1
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.cashOutList = res.data.data.personalCrimeConsumptionRestrictList;//赋值个人犯罪消费资金列表
            this.cashOutSize = res.data.data.personalCrimeConsumptionRestrictListSize;//赋值个人犯罪消费资金列表数
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted(){
      $('#table_id_example').tableHover();
      this.getAllPrison();
    }
  }
</script>

<style type="text/less" lang='less' scoped>
  #cashOutConfirm {
    .modal-body {
      h3 {
        font-weight: bold;
      }
      .confirm-button {
        margin-top: 12px;
        margin-bottom: 30px;
      }
    }
  }
</style>
