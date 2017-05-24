<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">

    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-6 select-box">
              <label for="name">所属监狱</label>
              <input list="prisons" placeholder="全部" class='form-control' v-model='prisonName'
                     v-if='prisonList.length > 1'>
              <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1'
                     disabled>
              <datalist id="prisons">
                <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
              </datalist>
            </div>
            <div class="col-xs-6 text-box">
              <label for="name">开户银行</label>
              <select class="form-control" v-model='bankId'>
                  <option value=''>全部</option>
                  <option v-for='bank in banks' :value='bank.id' v-text='bank.bankName'></option>
                </select>
            </div>
            <div class="col-xs-6 text-box">
              <label for="name">银行账号</label>
              <input type="text" class="form-control" v-model='bankAccountNo'/>
            </div>
            <div class="col-xs-6 text-box">
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

    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>银行账号</th>
              <th>所属监狱</th>
              <th>银行行号</th>
              <th>开户银行</th>
              <th>类型</th>
              <th>公私标识</th>
              <th colspan="2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='b in bankAccountList'>
              <td v-text='b.bankAccountName'></td>
              <td v-text='b.bankAccountNo'></td>
              <td v-text='b.prisonName'></td>
              <td v-text='b.bankNo'></td>
              <td v-text='b.bankName'></td>
              <td>{{b.isSameBank | isSameBank}}</td>
              <td>{{b.isPublic | isPublic}}</td>
              <td>
                <em class="agree-text" @click='modifyAccount(b.bankAccountId)'>修改</em>
              </td>
              <td>
                <em class="reject-text" @click='deleteAccount(b.bankAccountId)'>删除</em>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       <!-- 表单底部-->
      <Page :itemSize='bankAccountListSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchAccount'></Page>
    </div>

    <!--模态框-->

    <!-- 确认删除-->
    <div class="modal modal-confirm" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>确定删除？</h3>
            <button class="confirm-button" @click="deleteConfirm()" data-dismiss='modal'>确定</button>
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
        prisonList: [],
        prisonName: "",
        prisonId: "",
        bankAccountId: "",
        bankAccountNo: "",
        bankAccountName: "",
        bankId: '',
        banks: [],
        bankAccountListSize: '',
        bankAccountList: [],
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
    computed: {
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
      }
    },
    methods: {
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
          this.searchAccount(this.indexPage);
        }).catch(err => {
          console.log(err);
        });

      },

      //获得所有银行账户列表信息
      searchAccount(index){
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: '/prisonBankAccount/getBankAccounts',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            bankAccountNo: this.bankAccountNo,
            bankAccountName: this.bankAccountName,
            bankId: this.bankId,
            prisonId: this.prisonId
          }
        }).then(res => {
          let data = res.data.data;
          this.bankAccountList = data.prisonBankAccounts;
          this.bankAccountListSize = data.bankAccountDtoSize;
        }).catch(err => {
          console.log(err);
        });
      },

      //点击修改银行账户
      modifyAccount(bankAccountId){
        this.$router.push({
          path: '/bank_account_modify' + '/' + bankAccountId 
        });
      },

      //点击删除银行账户
      deleteAccount(bankAccountId){
        $('#deleteConfirm').modal();
        this.bankAccountId = bankAccountId;
      },

      //点击确定删除
      deleteConfirm(){
        this.$http({
          method: 'post',
          url: '/prisonBankAccount/deleteBankAccount',
          params: {
            'bankAccountId': this.bankAccountId,
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.remind = {
              status: 'success',
              msg: res.data.msg
            };

            this.searchAccount();
          } else {
            this.remind = {
              status: 'failed',
              msg: res.data.msg
            }
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
      this.getBanks();
      this.getAllPrison();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  #right-side {
    min-height: 100%;
  }
</style>
