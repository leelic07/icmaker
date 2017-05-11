<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-7 select-box">
              <label for="name">所属监区</label>
              <select class="form-control" v-model='prisonDepartmentId'>
                <option value=''>全部</option>
                <option v-for='pd in prisonDepartments' :value='pd.id' v-text='pd.prisonDepartmentName'></option>
              </select>
            </div>
            <div class="col-xs-7 text-box">
              <label for="name">罪犯名</label>
              <input type="text" class="form-control" v-model='name'/>
            </div>
            <div class="col-xs-7 text-box">
              <label for="name">档案号</label>
              <input type="text" class="form-control" v-model='archivesNumber'/>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='searchPrisoners()'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--按钮组部分-->
    <div class="col-xs-24 button">
      <div class="col-xs-2">
        <input type="button" value="确认添加" class="reject-button" @click='addCriminal()'>
      </div>
    </div>
    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example">
          <thead>
            <tr>
              <th>
                <div class="info-check"></div>
              </th>
              <th>罪犯名</th>
              <th>档案号</th>
              <th>所属监狱</th>
              <th>所属监区</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='p,index in prisoners'>
              <td>
                <div class="info-check info-list-check" :id='p.prisonerId' :index='index'></div>
              </td>
              <td v-text='p.name'></td>
              <td v-text='p.archivesNumber'></td>
              <td v-text='p.prisonName'></td>
              <td v-text='p.prisonDepartmentName'></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize='prisonerSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchPrisoners'></Page>
    </div>
    <!--子表单-->
    <div class="col-xs-24 form subform">
      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example1">
          <thead>
            <tr>
              <th></th>
              <th>罪犯名</th>
              <th>档案号</th>
              <th>所属监狱</th>
              <th>所属监区</th>
              <th class="text-center">分配金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='ap in addPrisoners'>
              <td :id='ap.prisonerId'></td>
              <td v-text='ap.name'></td>
              <td v-text='ap.archivesNumber'></td>
              <td v-text='ap.prisonName'></td>
              <td v-text='ap.prisonDepartmentName'></td>
              <td><input type="text" class="form-control money-item" placeholder="输入分配金额" v-model='ap.money'/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--提交框-->
    <div class="col-xs-24 submit-box">
      <div class="col-xs-23">
        <div class="col-xs-4 col-xs-push-10 button-box">
          <input type="button" value="提交" class="search-button" @click='submit()'>
        </div>
      </div>
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
        prisonerSize: '',
        prisonDepartmentId: '',
        name: '',
        archivesNumber: '',
        prisonDepartments: [],
        prisoners: [],
        prisonCapitalAssignId: '',
        prisonId: '',
        type: '',
        totalMoney: '',
        ids: '',
        prisonerIndex: [],
        addPrisoners: []
      }
    },
    watch: {
      addPrisoners: {
        handler(){
          $.each(this.addPrisoners, (index, value) => {
            // console.log(value.money);
            if (value.prisonId != '' && value.money) {
              value.money = this.saveTwo(value.money);
            }
          });
        },
        deep: true
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
      //根据监狱查询监区
      getPrisonDepartments(prisonId){
        this.$http({
          method: 'get',
          url: 'prisoner/getDepartments',
          params: {
            prisonId: prisonId
          }
        }).then(res => {
          this.prisonDepartments = res.data.data;
        }).catch(err => {
          console.log(err);
        });
      },

      //获得所有罪犯信息
      getPrisoners(){
        this.$http({
          method: 'get',
          url: '/prisoner/getPrisonersByCapital',
          params: {
            prisonId: this.prisonId,
            indexPage: this.indexPage,
            pageSize: this.pageSize
          }
        }).then(res => {
          let data = res.data.data;
          this.prisoners = data.prisoners;
          this.prisonerSize = data.prisonerSize;
        }).catch(err => {
          console.log(err);
        });
      },

      //点击搜索查询罪犯列表
      searchPrisoners(index){
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: '/prisoner/getPrisonersByCapital',
          params: {
            prisonId: this.prisonId,
            indexPage: this.indexPage,
            pageSize: this.pageSize,
            prisonDepartmentId: this.prisonDepartmentId,
            name: this.name,
            archivesNumber: this.archivesNumber
          }
        }).then(res => {
          let data = res.data.data;
          this.prisoners = data.prisoners;
        }).catch(err => {
          console.log(err);
        });
      },

      //获取选中的罪犯
      getAllCriminal(){
        this.prisonerIndex.splice(0, this.prisonerIndex.length);
        let checkedInfo = $(".info-list-check").filter(".active");
        if (checkedInfo.length > 0) {
          let prisonerIds = new Array();//批量转监狱罪犯审核的ID数组
          for (let i = 0; i < checkedInfo.length; i++) {
            prisonerIds.push(checkedInfo[i].getAttribute("id"));
            this.prisonerIndex.push(checkedInfo[i].getAttribute("index"));
          }
          this.ids = prisonerIds.join(',');
          return true;
        } else {
          return false;
        }
      },

      //点击确认添加按钮
      addCriminal(){
        let addPrisoners = this.addPrisoners;
        if (this.getAllCriminal()) {
          $.each(this.prisonerIndex, (index, value) => {
            addPrisoners.push(this.prisoners[value]);
            addPrisoners[index].money = '';
          });

          //去掉addPrisoners重复的元素
          $.each(addPrisoners, (index, value) => {
            for (let i = index + 1; i < addPrisoners.length; i++) {
              if (value.prisonerId == addPrisoners[i].prisonerId) {
                addPrisoners.splice(i, 1);
              }
            }
          });
        } else {
          this.remind = {
            status: 'warn',
            msg: '请选择罪犯'
          };
          store.dispatch('showRemind');
        }
      },

      //点击提交执行的方法
      submit(){
        if (this.addPrisoners.length == 0) {
          this.remind = {
            status: 'warn',
            msg: '请选择罪犯'
          };
          store.dispatch('showRemind');
          return;
        } else {
          let isNumber = true;
          let prisonerId = [];
          let money = [];
          let status = [];

          //过滤掉输入资金分配为空，或者为0的选项
          $.each(this.addPrisoners, (index, value) => {
            if (value.money != 0 && !this.isNull(value.money)) {
              prisonerId.push(value.prisonerId);
              money.push(this.toCent(value.money));
              status.push(0);
            }
          });

          //判断输入分配金额是否合法
          if (prisonerId.length == 0 || money.length == 0) {
            this.remind = {
              status: 'warn',
              msg: '输入分配金额不合法'
            };
            store.dispatch('showRemind');
            return;
          }
          //判断输入分配金额是否合法
          let total = 0;
          $.each(money, (index, value) => {
            if (!this.isNumber(value)) {
              isNumber = false;
              return;
            } else {
              total += Number(value);
            }
          });

          if (total && total > this.totalMoney) {
            this.remind = {
              status: 'warn',
              msg: '分配金额大于可分配金额'
            };
            store.dispatch('showRemind');
            return;
          } else if (isNumber) {
            this.$http({
              method: 'post',
              url: '/criminalFundAllocation',
              params: {
                'prisonerId': prisonerId.join(','),
                'prisonId': this.prisonId,
                'money': money.join(','),
                'status': status.join(','),
                prisonCapitalAssignId: this.prisonCapitalAssignId,
                type: this.type
              }
            }).then(res => {
              if (res.data.code == 0) {
                this.remind = {
                  status: 'success',
                  msg: res.data.msg,
                  path: '/criminal_fund_distribution'
                };
                $.each(this.addPrisoners, (index, value) => {
                  value.money = ''
                });
              } else {
                this.remind = {
                  status: 'failed',
                  msg: res.data.msg
                };
              }
              store.dispatch('showRemind');
              console.log(res.data.code, res.data.msg);
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.remind = {
              status: 'warn',
              msg: '输入分配金额不合法'
            };
            store.dispatch('showRemind');
          }
        }
      }
    },
    components: {
      Page,
      Remind
    },
    mounted(){
      $('#table_id_example').select();
      $('#table_id_example').tableHover();
      $('#table_id_example1').tableHover();
      this.prisonCapitalAssignId = this.$route.params.prisonCapitalAssignId;
      this.prisonId = this.$route.params.prisonId;
      this.type = this.$route.params.type;
      this.totalMoney = this.$route.params.money;
      this.getPrisonDepartments(this.prisonId);
      this.getPrisoners();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  #bindConfirm {
    h3 {
      font-weight: bold;
    }

    .bind-info-list {
      width: 90%;
      margin-left: 5%;
    }

    .modal-dialog {
      width: 36%;
    }

    .bind-info {
      margin-top: 40px;
    }

    .info-label {
      color: #B1B1B1;
    }

    .confirm-button {
      margin-left: 5%;
    }

    .confirm-button, .cancel-button {
      width: 38%;
    }

  }
</style>
