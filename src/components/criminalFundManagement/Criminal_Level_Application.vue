<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">

    <!--按钮组部分-->
    <div class="col-xs-24 button">
      <div class="col-xs-2">
        <input type="button" value="上传excel文件" class="reject-button">
        <input id="ExcelId" type="file" class="col-xs-24">
      </div>
      <div class="col-xs-2">
        <input type="button" value="下载excel模板" class="reject-button" id="download" @click="downLevelTemplate()">
      </div>
    </div>

    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example">
          <thead>
          <tr>
            <th></th>
            <th>罪犯姓名</th>
            <th>罪犯编号</th>
            <th>申请等级</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="pl in prisonerLevels">
              <td></td>
              <td v-text="pl.name"></td>
              <td v-text="pl.number"></td>
              <td v-text="pl.level"></td>
              <td class="reject-text" v-text="pl.tips"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize='prisonerLevelSize' :pageSize='pageSize' :indexPage='indexPage'
            v-on:search='getPrisonerLevelData'></Page>

      <div class="confirm pull-left col-xs-23">

        <div class="col-xs-10">
          <button class="pull-right" :disabled="hasErrMsg" :class="{disabledBtn:hasErrMsg}"  @click="addPrisonerLevel()">确认上传</button>
        </div>

        <div class="col-xs-11 col-xs-offset-3">
          <button class="pul" @click="reUploadExcel()">重新上传</button>
        </div>

      </div>

    </div>

    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>

    <!--<CriminalFundDistribution v-show='cfdshow' v-on:prisonCapitalIncomes="getPrisonCapitalIncomes"></CriminalFundDistribution>-->

  </div>

</template>

<script>
  import Page from '../Paginator.vue'
  import axios from 'axios'
  import store from '../../store/index'
  import CriminalFundDistribution from './Criminal_Fund_Distribution.vue'
  import Remind from '../Remind.vue'
  import Util from '../../../static/js/util.js'

  export default {
    data() {
      return {
        indexPage: 1,
        pageSize: 10,
        menuSize: '',
        prisonId: '',
        prisonName: '',
        prisonList: [],
        prisonerLevels:[],
        prisonerLevelSize:'',
        uploadExcelUrl:'http://10.10.10.112:8080/icmaker/level/importPrisonerLevel',
        downloadExcelUrl:'http://10.10.10.112:8080/icmaker/level/downLevelTemplate',
        hasErrMsg:true,//有错误信息
        dataId:'',//excelId
        remind: {
          status: '',
          msg: ''
        }
      }
    },
    watch: {
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
      prisonerLevels() {
        $.each(this.prisonerLevels, (index, value) => {
          if (value.tips == '数据存在问题，请检查') {
            this.hasErrMsg = true;
            return;
          }else{
            this.hasErrMsg = false;
          }
        });
      },
      dataId(){
         this.hasErrMsg = false;
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
      downLevelTemplate() {
        //window.location.href = "http://106.14.18.98:8080/icmaker/level/downLevelTemplate";
        window.location.href = this.downloadExcelUrl;
      },
      //上传excel文件
      criminalLevelImport(e) {
        let self = this;
        let uploadExcelUrl = this.uploadExcelUrl;

        $('#ExcelId').on("change",function(e) {
          let file = e.target.files[0];
          if (self.isExcel(file)) {
//          Util.readUploadExcel(file,self,"http://106.14.18.98:8080/icmaker/level/importPrisonerLevel");
            Util.readUploadExcel(file,self,store,uploadExcelUrl);
          } else {
            self.remind = {
              status:'warn',
              msg:'请上传格式正确的Excel文件'
            }
            store.dispatch('showRemind');
          }
        });
      },
      //分页获取罪犯资金分配数据
      getPrisonerLevelData(indexPage) {
        this.indexPage = indexPage;
        axios.get('/level/getPrisonerLevelData',{
            params:{
              indexPage:this.indexPage,
              pageSize:this.pageSize,
              dataId:this.dataId
            }
        }).then(res=>{
            if(res.data.code == 0){
              this.prisonerLevels = res.data.data.prisonerLevels;
              this.prisonerLevelSize = res.data.data.prisonLevelSize;
            }
        }).catch(err=>{
            console.log(err);
        })
      },

      //添加罪犯资金分配
      addPrisonerLevel() {
        let dataId = this.dataId;
        console.log(this.dataId,dataId);

        axios({
          url: '/level/addPrisonerLevel',
          method: 'post',
          data: this.dataId
        }).then(res=>{
          if(res.data.code == 0){
            this.remind = {
              status: 'success',
              msg: '上传成功',
            };
            store.dispatch('showRemind');
          } else {
            this.remind = {
              status: 'warn',
              msg: res.data.msg,
            };
            store.dispatch('showRemind');
          }
        }).catch(err => {
          console.log(err);
        })
      },

      //重新上传
      reUploadExcel() {
        axios({
          url: '/level/clearCachePrisonerLevel',
          method: 'post',
          data: this.dataId
        }).then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.prisonerLevels = '';
            this.remind = {
              status: 'success',
              msg: '重新上传成功',
            };
            store.dispatch('showRemind');
          } else {
            this.remind = {
              status: 'warn',
              msg:res.data.msg,
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
      this.criminalLevelImport();
//      this.getPrisonerLevelData();
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

  .button{
    margin-top:81px;
    >div{
      &:first-child{
        input{
          &:nth-child(2){
            border:1px solid #000;
            margin-top:-31px;
            height:30px;
            opacity:0;
          }
        }
      }
    }
  }

  .form {
    margin-top: 10px;
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
        button {
          .button(@green, @white, 35px, 150px);
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
