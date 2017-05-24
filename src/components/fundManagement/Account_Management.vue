<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-8 select-box">
              <!-- <label for="name">所属监狱</label>
              <select class="form-control" v-model='prisonId' :disabled='prisonList.length <= 1'>
                  <option v-if='prisonList.length > 1' value=''>请选择</option>
                  <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
              </select> -->
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
              <label for="name">所属监区</label>
              <select class="form-control" v-model='prisonDepartmentId'>
                <option value=''>全部</option>
                <option v-for='pdt in prisonDepartmentsTem' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
              </select>
            </div>
            <div class="col-xs-8 select-box">
              <label for="name">账户类型</label>
              <select class="form-control" v-model='accountType'>
                <option value=''>全部</option>
                <option value='0'>财务账户</option>
                <option value='1'>商户账户</option>
                <option value='2'>监狱总账户</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-7 text-box">
              <label for="name">账户名</label>
              <input type="text" class="form-control" id="" v-model='accountName'>
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

    <!--监狱账户总余额-->
    <div class='row'>
      <div class='account-total col-xs-23'>
        <ul>
          <li class='pull-left text-green'>监狱账户余额: <span class='text-red'>{{prisonAccountsTotal | currency}}元</span>
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
            <th>账户类型</th>
            <th>账户名</th>
            <th>虚拟账户号</th>
            <th>账户余额(元)</th>
            <th colspan="2">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='pad in prisonAccountDtos'>
            <td></td>
            <td v-text='pad.prisonName'></td>
            <td v-text='pad.prisonDepartmentName'></td>
            <td>{{pad.accountType | accountType}}</td>
            <td v-text='pad.accountName'></td>
            <td v-text='pad.virtualAccountNo'></td>
            <td>{{pad.total | currency}}</td>
            <td><em class="agree-text" @click='getPrisonAccount(pad.prisonAccountId)'>修改</em></td>
            <!-- <td><em class="agree-text">银行账户管理</em></td> -->
            <td>
              <router-link :to="'/related_bank_account/'+ pad.prisonAccountId"><em class="agree-text">关联银行账户</em>
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchAccount'></Page>
    </div>
  </div>
</template>

<script>
  import Page from '../Paginator.vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        prisonAccountDtos: '',
        prisonList: [],
        prisonId: '',
        prisonName: '',
        prisonDepartments: [],
        prisonDepartmentId: '',
        accountType: '',
        accountName: '',
        pageSize: 10,
        indexPage: 1,
        menuSize: '',
        prisonAccountsTotal: ''//监狱账户总余额
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
      },

      //监听监狱ID
      prisonId(){
        let pd = this.prisonDepartments;
        let pdt = this.prisonDepartmentsTem;
        pdt.splice(0, pdt.length);
        this.prisonAndPrisonDepartment(pd, pdt);
      }
    },
    computed: {
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

      //获取监狱账户信息
      getPrisonAccountDtos(){
        axios.get('/prisonAccount/getPrisonAccountDtos',
          {
            params: {
              indexPage: this.indexPage,
              pageSize: this.pageSize,
              prisonId: this.prisonId
            }
          }
        ).then(res => {
          this.prisonAccountDtos = res.data.data.prisonAccountDtos;
          this.menuSize = res.data.data.prisonAccountDtoSize;
          this.prisonAccountsTotal = res.data.data.prisonAccountsTotal;
        }).catch(err => {
          console.log(err);
        });
      },

      //查询所有监狱列表
      getAllPrison(){
        axios.get('/prisoner/toAddOrEdit').then(res => {
          let data = res.data.data;
          this.prisonList = data.prisons;
          this.prisonDepartments = data.prisonDepartments;
          if (this.prisonList.length == 1) {
            this.prisonId = this.prisonList[0].id;
            this.prisonName = this.prisonList[0].prisonName;
          }
          this.getPrisonAccountDtos();
        }).catch(err => {
          console.log(err);
        });
      },

      //点击搜索获取账户列表
      searchAccount(index){
        this.indexPage = index;
        axios.get(
          '/prisonAccount/getPrisonAccountDtos',
          {
            params: {
              prisonId: this.prisonId,
              prisonDepartmentId: this.prisonDepartmentId,
              accountType: this.accountType,
              accountName: this.accountName,
              indexPage: this.indexPage,
              pageSize: this.pageSize
            }
          }).then(res => {
          this.prisonAccountDtos = res.data.data.prisonAccountDtos;
          this.menuSize = res.data.data.prisonAccountDtoSize;
          this.prisonAccountsTotal = res.data.data.prisonAccountsTotal;
        }).catch(err => {
          console.log(err);
        })
      },

      //点击修改获得修改的账户信息
      getPrisonAccount(prisonAccountId){
        axios.get('prisonAccount/getPrisonAccount',
          {
            params: {
              'prisonAccountId': prisonAccountId
            }
          }).then(res => {
          let data = res.data.data;
          this.$router.push({
            path: '/account_modify' + '/' + data.prisonId + '/' + data.prisonDepartmentId + '/' + data.accountName + '/' + data.accountType + '/' + prisonAccountId
          });
        }).catch(err => {
          console.log(err);
        })
      }
    },
    components: {
      Page
    },
    mounted(){
      $('#table_id_example').tableHover();
      this.getAllPrison();
    }
  }
</script>

<style lang="less" scoped>
  #right-side {

  .select-box {
    padding: 20px 50px 20px 40px;
  }

  .text-box {
    padding-left: 40px;
  }

  table {

  tr {

  th, td {
    text-align: center;
  }

  th:last-child {
    text-align: left;
    padding-left: 3%;
  }

  td {

  &
  :nth-child(6),

  &
  :last-child {
    text-align: center;
  }

  }
  }
  }

  .account-total {
    margin-left: 2%;
    padding: 10px 0 15px 0;
  }

  .text-red {
    color: #E96900;
  }

  .text-green {
    color: #36A5B0;
  }

  }
</style>
