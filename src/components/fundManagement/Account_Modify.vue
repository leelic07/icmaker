<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-3 label-box">
              <label class="pull-right" for="name"><em class="important">*</em>账户名称 :</label>
            </div>
            <div class="col-xs-6 text-box">
              <input type="text" class="form-control" id="" v-model='accountName'>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3 label-box">
              <label class="pull-right" for="name"><em class="important">*</em>所属监狱 :</label>
            </div>
            <div class="col-xs-6 select-box">
              <!-- <select id='prison' class="form-control" v-model='prisonId' @change='getPrisonDepartments($event.target.value)'>
                  <option value=''>请选择</option>
                  <option v-for='prison in prisonList' v-text='prison.prisonName' :value='prison.id'></option>
              </select> -->
              <input list="prisons" placeholder="请选择" class='form-control' v-model='prisonName'
                     v-if='prisonList.length > 1' @change='getPrisonDepartments(prisonName)'>
              <input list="prisons" class='form-control' v-model='prisonName' v-else-if='prisonList.length == 1'
                     disabled>
              <datalist id="prisons">
                <option v-for='prison in prisonList' v-text='prison.prisonName'></option>
              </datalist>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3 label-box">
              <label class="pull-right" for="name">所属监区 :</label>
            </div>
            <div class="col-xs-6 select-box">
              <select id='prisonDepartment' v-model='prisonDepartmentId' class="form-control">
                <option value=''>请选择</option>
                <option v-for='pdt in prisonDepartments' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3 label-box">
              <label class="pull-right" for="name"><em class="important">*</em>账户类型 :</label>
            </div>
            <div class="col-xs-6 select-box">
              <select class="form-control" v-model='accountType'>
                <option value=''>请选择</option>
                <option value='0'>财务账户</option>
                <option value='1'>商户账户</option>
                <option value='2'>监狱总账户</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3 col-xs-push-3 button-box">
              <input type="button" value="确认修改" class="search-button" @click='modifyAccount()'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg' :back='remind.back'></Remind>
  </div>
</template>

<script>
  import Remind from '../Remind.vue'
  import store from '../../store'
  export default {
    data(){
      return {
        prisonAccountId: '',
        accountName: '',
        accountType: '',
        prisonId: '',
        prisonDepartmentId: '',
        prisonList: [],
        prisonDepartments: [],
        prisonName: ''
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
          this.prisonId == '' ? this.prisonId = -1 : '';
        } else {
          this.prisonId = '';
        }
      }
    },
    methods: {

      //查询所有监狱列表
      getAllPrison(){
        this.$http({
          method: 'get',
          url: '/prisoner/toAddOrEdit',
        }).then(res => {
          let data = res.data.data;
          this.prisonList = data.prisons;
          this.getPrisonNameById(this.prisonList);
        }).catch(err => {
          console.log(err);
        });
      },

      //新增账户
      addAccount(){
        let params = {
          accountType: this.accountType,
          prisonId: this.prisonId,
          prisonDepartmentId: this.prisonDepartmentId,
          accountName: this.accountName
        };
        if (this.accountName == '') {
          return;
        } else {
          this.$http({
            method: 'post',
            url: '/prisonAccount/addOrUpdatePrisonAccount',
            params: params
          }).then(res => {
            $.each(params, (index, value) => {
              value = '';
            });
          }).catch(err => {
            console.log(err);
          });
        }
      },

      //根据监狱查询监区
      getPrisonDepartments(prisonName){
        $.each(this.prisonList, (index, value) => {
          if (value.prisonName == prisonName) {
            this.prisonId = value.id;
          }
        });
        this.$http({
          method: 'get',
          url: 'prisoner/getDepartments',
          params: {
            prisonId: this.prisonId
          }
        }).then(res => {
          this.prisonDepartments = res.data.data;
          if (arguments.length < 2) {
            this.prisonDepartmentId = '';
          } else {
            this.prisonDepartmentId = this.$route.params.prisonDepartmentId;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //点击确认修改银行账户信息
      modifyAccount(){
        let isNull = false;
        let noPrison = false;
        if (this.isNull(this.prisonId, this.accountType, this.accountName)) {
          isNull = true;
          this.remind = {
            status: 'warn',
            msg: '选项不能为空'
          }
          store.dispatch('showRemind');
        } else if (this.prisonId == -1) {
          noPrison = true;
          this.remind = {
            status: 'warn',
            msg: '无此监狱'
          }
          store.dispatch('showRemind');
        }
        if (!isNull && !noPrison) {
          this.$http({
            method: 'post',
            url: '/prisonAccount/addOrUpdatePrisonAccount',
            params: {
              id: this.prisonAccountId,
              accountType: this.accountType,
              prisonId: this.prisonId,
              prisonDepartmentId: this.prisonDepartmentId,
              accountName: this.accountName
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.remind = {
                status: 'success',
                msg: res.data.msg,
                back: true
              }
            } else {
              this.remind = {
                status: 'failed',
                msg: res.data.msg
              }
              console.log(res.data.code, res.data.msg);
            }
            store.dispatch('showRemind');
          }).catch(err => {
            console.log(err);
          });
        }
      },

      //根据监狱ID查询监狱名称
      getPrisonNameById(prisonList){
        $.each(prisonList, (index, value) => {
          if (value.id == this.$route.params.prisonId) {
            this.prisonName = value.prisonName;
          }
        });
      }
    },
    components: {
      Remind
    },
    beforeCreate(){
      //判断参数 prisonDepartmentId 是否为null
      if (this.$route.params.prisonDepartmentId == 'null') {
        this.$route.params.prisonDepartmentId = '';
      }
    },
    mounted(){
      $('#table_id_example').tableHover();
      this.prisonAccountId = this.$route.params.prisonAccountId;
      this.accountName = this.$route.params.accountName;
      this.accountType = this.$route.params.accountType;
      this.prisonId = this.$route.params.prisonId;
      this.getAllPrison();
      this.getPrisonDepartments(this.prisonName, 'Init');
    }
  }
</script>

<style lang="less" scoped>
  #right-side {
    background-color: #f5f5f5;

    .select-box {
      padding: 10px;
    }

    .text-box {
      padding: 10px;
    }

    .label-box {
      padding: 16px 0 10px 0;
    }

    .search-inner-box {
      background-color: #fff;
    }

    label {
      font-weight: normal;
      color: #696969;
    }
  }
</style>
