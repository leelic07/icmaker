<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div v-if="isDistribution">
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-8 select-box">
              <!-- <label for="name">所属监狱</label>
              <select class="form-control" v-model='prisonId'>
                  <option value=''>全部</option>
                  <option v-for='prison in prisonList' :value='prison.id' v-text='prison.prisonName'></option>
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
              <label for="name">资金分配类型</label>
              <select class="form-control" v-model='type'>
                <option value=''>全部</option>
                <!-- <option value='0'>家属汇款</option> -->
                <option value='0'>财务账户</option>
                <option value='1'>商户账户</option>
                <option value="2">监狱总账户</option>
                <option value="3">监狱总局账户</option>
                <option value="4">零花钱</option>
                <option value="5">IC卡资金账户</option>
                <option value="6">低报酬</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='searchLocation()'>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--按钮组部分-->
    <div class="col-xs-24 button">
      <div class="col-xs-2">
        <input type="button" value="下载excel模板" class="reject-button" @click="downLoadTemplate()">
      </div>
      <div class="col-xs-2">
        <!--<input type="file" value="上传excel" id="upload">-->
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
              <th>资金分配类型</th>
              <th>可分配余额(元)</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='cfal,index in criminalFundAllocationList'>
              <td :id='cfal.prisonId'></td>
              <td v-text='cfal.prisonName'></td>
              <td>{{cfal.accountName}}</td>
              <td>{{cfal.money | currency}}</td>
              <td class="col-xs-5">
                <router-link
                  :to="'/cfd_add_criminal/'+ cfal.prison_id + '/' + cfal.id + '/' + cfal.type + '/' + cfal.money"
                  class="agree-text">选择罪犯
                </router-link>
                <!--<router-link to="" class="reject-text">上传excel文件</router-link>-->
                <a href="#" @click="$event.preventDefault()" class="reject-text">上传excel文件</a>
                <input class="file" type="file" :id="index" :uploadType="cfal.type" :prisonName="cfal.prisonName">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchLocation'></Page>
      </div>
    </div>
    <!--<router-view :excelData="prisonCapitalIncomes"></router-view>-->
    <UploadExcel v-show="!isDistribution" :excelData="prisonCapitalIncomes" :dataId="dataId"></UploadExcel>

  </div>
</template>

<script>

  import Page from '../Paginator.vue'
  import axios from 'axios'
  import Util from '../../../static/js/util.js'
  import store from '../../store'
  import UploadExcel from './Upload_Excel.vue'

  export default {
    data() {
      return {
        indexPage: 1,
        pageSize: 10,
        dataId:'',//excelId
        menuSize: '',
        prisonId: '',
        prisonName: '',
        type: '',
        prisonList: [],
        criminalFundAllocationList: [],
        prisonCapitalIncomes: [],
        prisonCapitalIncomesList:[],
        uploadSuccess:'',
        isDistribution:true,
        toUrl:'',
        fromUrl:'',
        uploadType:'',//上传Excel类型
        remind: {
          status: '',
          msg: ''
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
            this.prisonId = -1;
          }
        } else {
          this.prisonId = '';
        }
      },
      prisonCapitalIncomes(){
          this.isDistribution = false;
      },
      $route(to, from) {//监听路由变化
        this.toUrl = to.path;
        this.fromUrl = from.path;
      },
      toUrl() {
        let url = window.location.href;
        let index = url.lastIndexOf('/');
        console.log(this.toUrl.substring(0, index));
        if (this.toUrl.substring(0, index) == '/criminal_fund_distribution/upload_excel') {
          this.isDistribution = false;
        } else {
          this.isDistribution = true;
        }
      },
      fromUrl() {
        const editUrl = '/criminal_fund_distribution/upload_excel';
        if(this.fromUrl == '/criminal_fund_distribution/upload_excel'){
        }
      }
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
      getAllPrison(){
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

      //查询罪犯资金分配列表
      getLocationList() {
        this.$http({
          method: 'get',
          url: '/criminalFundAllocationList',
          params: {
            indexPage: this.indexPage,
            pageSize: this.pageSize
          }
        }).then(res => {
          let data = res.data.data;
          this.criminalFundAllocationList = data.criminalFundAllocationList;
          this.menuSize = data.criminalFundAllocationListSize;
        }).catch(err => {
          console.log(err);
        });
      },

      //点击搜索查询罪犯资金分配列表
      searchLocation(index) {
        this.indexPage = index;
        this.$http({
          method: 'get',
          url: '/criminalFundAllocationList',
          params: {
            prisonId: this.prisonId,
            type: this.type,
            indexPage: this.indexPage,
            pageSize: this.pageSize
          }
        }).then(res => {
          let data = res.data.data;
          this.criminalFundAllocationList = data.criminalFundAllocationList;
          this.menuSize = data.criminalFundAllocationListSize;
        }).catch(err => {
          console.log(err);
        });
      },
      downLoadTemplate() {
          window.location.href="http://106.14.18.98:8080/icmaker/downTemplate";
      },
      uploadExcel() {
        let self = this;
        $('#table_id_example').on("change",".file",function(e) {
          let file = e.target.files[0];
          //console.log(e.target.getAttribute('uploadType'));
          let uploadType = e.target.getAttribute('uploadType');
          let prisonName = e.target.getAttribute('prisonName');
          if (self.isExcel(file)) {
            Util.readExcel(file,self,'prisonCapitalIncomes','dataId',uploadType,prisonName);
          } else {
            self.remind = {
              status:'warn',
              msg:'请上传格式正确的Excel文件'
            }
            store.dispatch('showRemind');
          }
        });
      },
    },
    components: {
      Page,
      UploadExcel
    },
    mounted() {
      this.getAllPrison();
      this.getLocationList();
      console.log($('#upload'));
      this.uploadExcel();
      //this.downLoadTemplate();
      $('#table_id_example').tableHover();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .reject-text{
    margin-left:15%;
  }

  #table_id_example{
    tbody{
      tr{
        td{
          &:last-child{
            position:relative;
            input{
              position:absolute;
              width:35%;
              top:30%;
              left:40%;
              opacity:0;
            }
          }
        }
      }
    }
  }
</style>
