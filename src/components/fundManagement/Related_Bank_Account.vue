<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">

    <!--账户所属基础信息-->
    <div class="col-xs-23 account-info-box">
        <div class="col-xs-6">
            <label for="" class="pull-left">所属监狱:</label>
            <p class='text-gray'>{{prisonAccountInfo.prisonName}}</p>
        </div>
        <div class="col-xs-6">
            <label for="" class="pull-left">所属监区:</label>
            <p class='ext-gray'>{{prisonAccountInfo.prisonDepartmentName}}</p>
        </div>
        <div class="col-xs-6">
            <label for="" class="pull-left">账户类型:</label>
            <p class='text-gray'>{{prisonAccountInfo.accountType | accountType}}</p>
        </div>
        <div class="col-xs-6">
            <label for="" class="pull-left">账户名:</label>
            <p class='text-gray'>{{prisonAccountInfo.accountName}}</p>
        </div>
    </div>

    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-7 text-box">
              <label for="name">开户银行</label>
              <select class="form-control" v-model='bankId'>
                  <option value=''>全部</option>
                  <option v-for='bank in banks' :value='bank.id' v-text='bank.bankName'></option>
                </select>
            </div>
            <div class="col-xs-7 text-box">
              <label for="name">银行账号</label>
              <input type="text" class="form-control" v-model='bankAccountNo'/>
            </div>
            <div class="col-xs-7 text-box">
              <label for="name">开户名</label>
              <input type="text" class="form-control" v-model='bankAccountName'/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='searchAccount()'>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--按钮组部分-->
    <div class="col-xs-24 button">
      <div class="col-xs-2">
        <input type="button" value="关联银行账户" class="reject-button" @click='addAccount()'>
      </div>
    </div>

    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table">
          <thead>
            <tr>
              <th>
                <div class="info-check"></div>
              </th>
              <th>名称</th>
              <th>银行账号</th>
              <th>银行行号</th>
              <th>开户银行</th>
              <th>类型</th>
              <th>公私标识</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='b,index in bankAccountList'>
              <td>
                <div class="info-check info-list-check" :id='b.bankAccountId' :index='index'></div>
              </td>
              <td v-text='b.bankAccountName'></td>
              <td v-text='b.bankAccountNo'></td>
              <td v-text='b.bankNo'></td>
              <td v-text='b.bankName'></td>
              <td>{{b.isSameBank | isSameBank}}</td>
              <td>{{b.isPublic | isPublic}}</td>
            </tr>
          </tbody>
        </table>
      </div>
       <!-- 表单底部-->
      <Page :itemSize='bankAccountListSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchAccount'></Page>
    </div>

    <!--子表单-->
    <div class="col-xs-24 form subform">
      <div class="col-xs-23">
        <table class="display table ic-table">
          <caption class = "subform-tit">已关联银行账户</caption>
          <thead>
            <tr>
              <th></th>
              <th>名称</th>
              <th>银行账号</th>
              <th>银行行号</th>
              <th>开户银行</th>
              <th>类型</th>
              <th>公私标识</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='ra in relatedAccount'>
              <td></td>
              <td v-text='ra.bankAccountName'></td>
              <td v-text='ra.bankAccountNo'></td>
              <td v-text='ra.bankNo'></td>
              <td v-text='ra.bankName'></td>
              <td>{{ra.isSameBank | isSameBank}}</td>
              <td>{{ra.isPublic | isPublic}}</td>
              <td><em class="agree-text" @click = "cancelAccount(ra.prisonBankAccountId)">取消关联</em></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--模态框-->

    <!-- 确认进行关联-->
    <div class="modal modal-confirm" id="relatedConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>确定进行银行账户关联？</h3>
            <button class="confirm-button" @click="relatedConfirm()" data-dismiss='modal'>确定</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <!-- 确认取消关联-->
    <div class="modal modal-confirm" id="cancelConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>确定取消银行账户关联？</h3>
            <button class="confirm-button" @click="cancelConfirm()" data-dismiss='modal'>确定</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :path="remind.path"></Remind>
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
        prisonBankAccountId:"",
        prisonAccountId: "",
        bankAccountNo: "",
        bankAccountName: "",
        bankId: '',
        banks: [],
        prisonAccountInfo: '',
        bankAccountListSize: '',
        bankAccountList: [],
        relatedAccount: []
      }
    },
    computed: {
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
      }
    },
    methods: {
      //获取监狱账户信息
      getAccountInfo(){
        this.$http({
          method: 'get',
          url: 'prisonBankAccount/getPrisonAccount',
          params: {
            prisonAccountId: this.prisonAccountId,
          }
        }).then(res => {
          this.prisonAccountInfo = res.data.data;
        }).catch(err => {
          console.log(err);
        });
      },

      getRelatedBank(){
        this.$http({
          method: 'get',
          url: '/prisonBankAccount/getPrisonBankAccounts',
          params: {
            prisonAccountId: this.prisonAccountId
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.relatedAccount = res.data.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //获取所有银行
       getBanks(){
        this.$http({
          method: 'get',
          url: 'prisonBankAccount/getBanks'
        }).then(res => {
          this.banks = res.data.data;
        }).catch(err => {
          console.log(err);
        });
      },

      //获得所有银行账户列表信息
      searchAccount(index){
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: '/prisonBankAccount/getPrisonBanks',
          params: {
            prisonAccountId: this.prisonAccountId,
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            bankAccountNo: this.bankAccountNo,
            bankAccountName: this.bankAccountName,
            bankId: this.bankId
          }
        }).then(res => {
          let data = res.data.data;
          this.bankAccountList = data.prisonBankAccounts;
          this.bankAccountListSize = data.bankAccountDtoSize;
        }).catch(err => {
          console.log(err);
        });
      },

      //获取选中的银行账户的序列号
      getSelectedAccount(){
        let checkedInfo = $(".info-list-check").filter(".active");
        if (checkedInfo.length > 0) {
          let bankIds = new Array();
          for (let i = 0; i < checkedInfo.length; i++) {
            bankIds.push(checkedInfo[i].getAttribute("id"));
          }
          this.ids = bankIds.join(',');
          return true;
        } else {
          return false;
        }
      },

      //点击关联账户按钮
      addAccount(){
        if (this.getSelectedAccount()) {
          $('#relatedConfirm').modal();
        } else {
          this.remind = {
            status: 'warn',
            msg: '请选择进行关联的银行账号'
          };
          store.dispatch('showRemind');
        }
      },

      //进行银行账户关联
      relatedConfirm(){
        this.$http({
          method: 'post',
          url: '/prisonBankAccount/relationBankAccount',
          params: {
            'bankAccountIds': this.ids,
            'prisonAccountId': this.prisonAccountId,
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.remind = {
              status: 'success',
              msg: res.data.msg,
            };
            this.getRelatedBank()
            $(".info-check").removeClass("active")

          } else {
            this.remind = {
              status: 'failed',
              msg: res.data.msg
            };
          }
          store.dispatch('showRemind');
        }).catch(err => {
          console.log(err);
        });
        
      },

      //点击取消关联
      cancelAccount (prisonBankAccountId) {
        $("#cancelConfirm").modal();
        this.prisonBankAccountId = prisonBankAccountId;
      },

      //确认取消银行账户关联
      cancelConfirm() {
        this.$http({
          method: 'post',
          url: '/prisonBankAccount/cancelRelationBankAccount',
          params: {
            'prisonBankAccountId': this.prisonBankAccountId,
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.remind = {
              status: 'success',
              msg: res.data.msg,
            };
            this.getRelatedBank()
          } else {
            this.remind = {
              status: 'failed',
              msg: res.data.msg
            };
          }
          store.dispatch('showRemind');
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
      $('.ic-table').select();
      $('.ic-table').tableHover();
      this.prisonAccountId = this.$route.params.prisonAccountId;
      this.getAccountInfo();
      this.getBanks();
      this.searchAccount();
      this.getRelatedBank();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  #right-side {
    min-height: 100%;
    .text-gray {
      color: #777;
      text-indent: 1em;
    }

    .account-info-box {
      margin-top: 75px;
      margin-left: 2%;
      background: #fff;
      border: #e4e4e4 1px solid;
      height: 60px;
      line-height: 60px;
      padding: 0 2%;
    }

    .search {
      margin-top: 20px;
    }
    
    .subform {
      margin-bottom: 20px;
      .subform-tit {
          background-color: #1aa3ab;
          color: #fff;
          padding-left: 40px;
          font-size: 14px;
      }
    }
  }
</style>
