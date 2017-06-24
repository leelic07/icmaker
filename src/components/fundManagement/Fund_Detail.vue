<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <!-- <div class="col-xs-8 select-box">
                <label for="name">所属监狱</label>
                <select class="form-control" v-model='prisonId' :disabled='prisonList.length <= 1'>
                    <option v-if='prisonList.length > 1' value=''>全部</option>
                    <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
                </select>
            </div> -->
            <div class="col-xs-8 select-box">
              <label for="name">所属监狱</label>
              <input list="prisons" placeholder="全部" class='form-control' v-model='prisonName'
                     v-if='prisonList.length > 1'>
              <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1'
                     disabled>
              <datalist id="prisons">
                <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
              </datalist>
            </div>
            <div class="col-xs-8 select-box">
              <label for="name">类别</label>
              <select class="form-control" v-model='type'>
                <option value=''>全部</option>
                <option value='0'>内部资金分配</option>
                <option value='1'>犯人取现入账</option>
                <option value='2'>外部汇款入账</option>
                <!-- <option value='3'>资金分配出账</option> -->
                <option value='4'>内部转账出账</option>
                <option value='5'>外部转账出账</option>
                <option value='6'>内部转账入账</option>
                <option value='7'>罪犯低报酬资金分配</option>
                <option value='8'>罪犯IC卡资金分配</option>
                <option value='9'>罪犯刷卡入账</option>
                <option value='10'>罪犯制卡费入账</option>
                <option value='11'>罪犯零花钱资金分配</option>
              </select>
            </div>
            <div class="col-xs-8 select-box">
              <label for="name">账户名</label>
              <input type="text" class="form-control" id="" v-model='accountName'>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-1 text-box">
              <label for="name">创建时间</label>
              <input class="date form-control" size="16" type="text" placeholder="开始日期" id="startTime">
            </div>
            <div class="col-xs-1 col-xs-push-1 mdash-box">
              <div class="col-xs-24 col-xs-push-7">&mdash;</div>
            </div>
            <div class="col-xs-4 col-xs-push-1 text-box">
              <label style="visibility:hidden" for="name">结束时间</label>
              <input class="date form-control" size="16" type="text" placeholder="结束日期" id="endTime">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='searchDetail()'>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--监狱资金总收入，总支出-->
    <div class='row'>
      <div class='prison-total col-xs-23'>
        <ul>
          <li class='pull-left text-green'>监狱总收入金额: <span
            class='text-red'>{{prisonCapitalIncomeTotal | currency}}元</span></li>
          <li class='pull-left text-green'>监狱总支出金额: <span class='text-red'>{{prisonCapitalOutTotal | currency}}元</span>
          </li>
        </ul>
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
            <th>流水号</th>
            <th>类别</th>
            <th>账户名</th>
            <th>对方账户名</th>
            <th>金额(元)</th>
            <th>交易时间</th>
            <th>状态</th>
            <th colspan = 2>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='pcdd in prisonCapitalDetailDtos'>
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
            <td><em class="agree-text" @click = "inDetail(pcdd.prisonCapitalDetailId)">明细</em></td>
            <td><em class="agree-text" @click = "inWithdraw(pcdd.capitalSerialNo,pcdd.money)"
             v-show = "(pcdd.type == 0 || pcdd.type == 4 || pcdd.type == 7 || pcdd.type == 8 || pcdd.type == 11)&& pcdd.status == 3">
             撤回</em></td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchDetail'></Page>
    </div>

    <!--模态框-->

    <!--查看明细 -->
    <div class="modal modal-confirm modal-bind" id="detailConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                        &times;
                    </button>
                    <h3 class = "detail-tit">查看明细</h3>
                </div>
                <div class="modal-body">
                    <table class="table detail-table" v-if = "detailInfo != ''">
                        <tr>
                            <td width = "200">流水号</td>
                            <td width = "250">{{detailInfo.capitalSerialNo}}</td>
                        </tr>
                        <tr>
                            <td>账户名</td>
                            <td>{{detailInfo.accountName}}</td>
                        </tr>
                        <tr>
                            <td>账号</td>
                            <td>{{detailInfo.accountNo}}</td>
                        </tr>
                        <tr>
                            <td>对方账户名</td>
                            <td>{{detailInfo.toAccountName}}</td>
                        </tr>
                        <tr>
                            <td>对方账号</td>
                            <td>{{detailInfo.toAccountNo}}</td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td>{{detailInfo.remark}}</td>   
                        </tr>
                    </table>
                    <button class="detail-button" data-dismiss="modal">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <!-- 撤回确认框--> 
    <div class="modal modal-bind modal-confirm" id="withdrawConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                        &times;
                    </button>
                    <h3 class = "detail-tit">撤回资金</h3>
                </div>
                <div class="modal-body">
                    <table class="table detail-table">
                        <tr>
                            <td width = "200">流水号</td>
                            <td width = "250">{{withdraw.serialNo}}</td>
                        </tr>
                        <tr>
                            <td>撤回资金</td>
                            <td>{{withdraw.money|currency}}元</td>
                        </tr>
                        <tr>
                            <td colspan = "2"><textarea class="form-control" cols="53" rows="4" v-model = "withdraw.reason" placeholder = "撤回理由..."></textarea></td>
                        </tr>
                    </table>
                    <button class="confirm-button" @click = "withdrawConfirm">保存</button>
                    <button class="cancel-button" data-dismiss="modal">取消</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
      </div>

    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>
  </div>
</template>

<script>
  import Page from '../Paginator.vue'
  import Remind from '../Remind.vue'
  import store from '../../store'
  export default {
    data(){
      return {
        indexPage: 1,
        pageSize: 10,
        menuSize: '',
        prisonId: '',
        type: '',
        accountName: '',
        prisonList: [],
        prisonCapitalDetailDtos: [],
        prisonName: '',
        prisonCapitalIncomeTotal: '',//监狱资金收入总金额
        prisonCapitalOutTotal: '',//监狱资金支出总金额
        detailInfo: '',
        withdraw:{
          money:'',
          serialNo:'',
          reason:''
        }
      }
    },
    computed: {
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
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
          if (this.prisonId == '') {
            this.prisonId = -1
          }
        } else {
          this.prisonId = '';
        }
      }
    },
    methods: {
      //查询所有转账明细
      getPrisonCapitalDetails(){
        this.$http({
          method: 'get',
          url: 'prisonCapital/getPrisonCapitalDetails',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            prisonId: this.prisonId
          }
        }).then(res => {
          console.log(res);
          let data = res.data.data;
          this.prisonCapitalDetailDtos = data.prisonCapitalDetailDtos;
          this.menuSize = data.prisonCapitalDetailDtoSize;
          this.prisonCapitalIncomeTotal = data.prisonCapitalIncomeTotal;
          this.prisonCapitalOutTotal = data.prisonCapitalOutTotal;
        }).catch(err => {
          console.log(err);
        });
      },

      //查询所有监狱列表
      getAllPrison(){
        this.$http({
          method: 'get',
          url: '/prisoner/toAddOrEdit'
        }).then(res => {
          let data = res.data.data;
          this.prisonList = data.prisons;
          if (this.prisonList.length == 1) {
            this.prisonId = this.prisonList[0].id;
            this.prisonName = this.prisonList[0].prisonName;
          }
          this.getPrisonCapitalDetails();
        }).catch(err => {
          console.log(err);
        });

      },

      //点击搜索查询转账明细
      searchDetail(index){
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: 'prisonCapital/getPrisonCapitalDetails',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            prisonId: this.prisonId,
            type: this.type,
            accountName: this.accountName,
            startDateStr: $('#startTime').val(),
            endDateStr: $('#endTime').val()
          }
        }).then(res => {
          console.log(res);
          let data = res.data.data;
          // if(res.data.code == 0){
          //     this.prisonCapitalDetailDtos = data.prisonCapitalDetailDtos;
          //     this.menuSize = data.prisonCapitalDetailDtoSize;
          //     this.remind = {
          //         status:'success',
          //         msg:res.data.msg
          //     };
          // }else{
          //     this.remind = {
          //         status:'failed',
          //         msg:res.data.msg
          //     }
          // }
          // store.dispatch('showRemind');
          this.prisonCapitalDetailDtos = data.prisonCapitalDetailDtos;
          this.menuSize = data.prisonCapitalDetailDtoSize;
          this.prisonCapitalIncomeTotal = data.prisonCapitalIncomeTotal;
          this.prisonCapitalOutTotal = data.prisonCapitalOutTotal;
        }).catch(err => {
          console.log(err);
        });
      },

      inDetail(prisonCapitalDetailId) {
        $("#detailConfirm").modal();
        let detailData = {
            "prisonCapitalDetailId": prisonCapitalDetailId
        };
        this.$http.get('prisonCapital/getPrisonCapitalDetailsDetails',{params:detailData}).then(res=>{
            console.log(res);
            if (res.data.code == 0) {
                this.detailInfo = res.data.data;
            }
        }).catch(err=>{
            console.log(err);
        });
      },

      inWithdraw(capitalSerialNo,money) {
        this.withdraw.reason = "";
        this.withdraw.money = money;
        this.withdraw.serialNo = capitalSerialNo;
        $("#withdrawConfirm").modal();
      },

      withdrawConfirm() {
        if (this.isNull(this.withdraw.reason)) {
          this.remind = {
            status: 'warn',
            msg: '请填写撤回理由'
          };
          store.dispatch('showRemind');
        }else {
          this.$http({
              method: 'post',
              url: '/prisonerAccount/applyRecall',
              'params': this.withdraw
            }).then(res => {
              if (res.data.code == 0) {
                this.remind = {
                  status: 'success',
                  msg: res.data.msg
                }
              } else {
                this.remind = {
                  status: 'failed',
                  msg: res.data.msg
                }
                console.log(res.data.code, res.data.msg);
              }
              store.dispatch('showRemind');
              $('#withdrawConfirm').modal('hide');
              this.searchDetail(this.indexPage);
            }).catch(err => {
              console.log(err);
            });
        } 
      },

      dateInit(){
        $('.date').datetimepicker({
          language: 'zh-CN',
          format: 'yyyy-mm-dd hh:ii:ss',
          weekStart: 1,
          todayBtn: 1,
          autoclose: 1,
          todayHighlight: 1,
          startView: 2,
          forceParse: 0,
          showMeridian: 1
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted(){
      $('#table_id_example').tableHover();
      this.dateInit();
      this.getAllPrison();
    }
  }
</script>

<style lang="less" scoped>
  #right-side {
    .text-box {
      padding-left: 0;
      padding-right: 0;
    }
    .select-box {
      padding: 20px 50px 20px 40px;
    }

    .prison-total {
      margin-left: 2%;
      padding: 10px 0 15px 0;
      li {
        &:nth-child(2) {
          margin-left: 2%;
        }
      }
      .text-green {
        color: #36A5B0;
      }
    }

    .text-red {
      color: #E96900;
    }
    .text-green {
      color: #4DB983;
    }

    .detail-tit {
      margin-bottom: 40px;
      margin-top: 40px;
    }

    .detail-table {
      tr {
        height: 38px;
        td:nth-child(1) {
          text-align: left;
          color: #999;
        }

        td:nth-child(2) {
           text-align: right;
        }
      }
    }
  }
</style>
