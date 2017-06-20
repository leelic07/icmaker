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
                <option value='0'>低报酬</option>
                <option value='1'>IC卡资金</option>
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
        <input type="file" value="上传excel" id="upload">
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
              <td :id='cfal.prison_id'></td>
              <td v-text='cfal.prison_name'></td>
              <td>{{cfal.type | locationType}}</td>
              <td>{{cfal.money | currency}}</td>
              <td class="col-xs-5">
                <router-link
                  :to="'/cfd_add_criminal/'+ cfal.prison_id + '/' + cfal.id + '/' + cfal.type + '/' + cfal.money"
                  class="agree-text">选择罪犯
                </router-link>
                <!--<router-link to="" class="reject-text">上传excel文件</router-link>-->
                <a href="#" @click="$event.preventDefault()" class="reject-text">上传excel文件</a>
                <input class="file" type="file" :id="index">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchLocation'></Page>
    </div>
  </div>
</template>

<script>
  import Page from '../Paginator.vue'
  import axios from 'axios'
  import Util from '../../../static/js/util.js'

  export default{
    data(){
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
      searchLocation(index){
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
          //  axios.get('prisonCapital/downTemplate');
          window.location.href="http://10.10.10.101:8080/icmaker/prisonCapital/downTemplate";
      },
      uploadExcel() {

        let self = this;
        console.log('upload');

        $("#upload").on("change",function (e) {
          let file = e.target.files[0];
          console.log(file);
          if (self.isExcel(file)) {
            Util.readExcel(file,self,'ExcelUrl');
          } else {
            self.remind = {
              status:'warn',
              msg:'请上传格式正确的Excel文件'
            }
            store.dispatch('showRemind');
          }

        });
//        this.$router.push({
//          path:'/upload_excel'
//        });
//        console.log('ok');

//        $('[type=file]').on('change',function(e){
//          let file = event.target.files[0];
//          let formdata;
//          formdata = new FormData();
//          formdata.append('fileId',file);
////          formdata.append('action','test');
//
//          axios({
//            url:'prisonCapital/importPrisonerCapitalIncome',
//            method:'post',
//            data:formdata,
////            headers: { 'Content-Type': 'multipart/form-data' }
//          }).then((res)=>{
//            console.log(res.data);
//            if(res.data.code == 0){
//
//            }
//          }).catch(err => {
//            console.log(err);
//          })
//        })

//        console.log(event.target.files[0]);
//        $.ajaxFileUpload({
//          url:'http://10.10.10.101:8080/icmaker/prisonCapital/importPrisonerCapitalIncome',
//          secureuri:false,
//          fileElementId:fileIndex,//文件选择框的id属性（必须）
//          dataType: 'json',
//          success: function (data, status){
//            if(data.code == 0){
//
//            }
//          },
//          error: function (data, status, e){
//            console.log(data);
//          }
//        });
        }
      },
    components: {
      Page
    },
    mounted(){
      this.getAllPrison();
      this.getLocationList();
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
