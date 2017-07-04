<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-24 search-inner-box">
          <div class="row">
            <h4>查看明细</h4>
          </div>
          <div class="col-xs-24 middleLine">

          </div>
          <div class="row">
            <div class="col-xs-6">
              <p class="pull-left">罪犯名：</p>
              <p class="pull-left" v-text="prisonerName"></p>
            </div>

            <div class="col-xs-18">
              <p class="pull-left">编号：</p>
              <p class="pull-left" v-text="archivesNumber"></p>
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
              <th>设置处遇等级时间</th>
              <th>状态</th>
              <th>处遇级别</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pl in logList">
              <td>{{pl.createdAt | formatDate}}</td>
              <td v-if="pl.status == 1">设置成功</td>
              <td class="reject-text" v-if="pl.status == 0">未完成设置</td>
              <td class="reject-text" v-if="pl.status == 2">设置失败</td>
              <td v-text="pl.levelName"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 表单底部-->
      <Page :itemSize = "logSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "searchLevelDetails"></Page>
    </div>

    <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg' :path='remind.path'></Remind>
  </div>

</template>

<script>

  import Remind from '../Remind.vue'
  import store from '../../store'
  import axios from 'axios'
  import Page from '../Paginator.vue'

  export default {
    data() {
      return {
        firstMenuList:"",
        secondMenuList:"",
        indexPage:1,
        pageSize:'',
        prisonId:'',
//        prisonerId:'',
        logList:'',//罪犯列表
        logSize:'',//罪犯表长度
        prisonerSize:'',
        prisonerName:'',
        archivesNumber:'',
        remind:{
          status:'',
          msg:'',
          path:''
        },
        roleName:""
      }
    },
    computed: {
      remindShow:{
        get(){
          return store.getters.remindShow;
        }
      }
    },
    methods:{
      //获取处遇等级列表
      getLevelDetails() {
//        this.indexPage = '';
        axios.get('/prisoner/levelDetails',{
            params:{
                prisonerId:this.prisonerId,
                indexPage:this.indexPage,
                pageSize:this.pageSize
            }
        }).then(res=>{
          if(res.data.code == 0){
            this.logList = res.data.data.records;
            this.logSize = res.data.data.logSize;
            if(res.data.data.records.length != 0){
              this.prisonerName = res.data.data.records[0].name;
            }
            this.archivesNumber = res.data.data.prisoner.archivesNumber;
            console.log(this.prisonerName,this.archivesNumber);
          }
        }).catch(err=>{
            console.log(err);
        });
      },
      //搜索处遇等级明细列表
      searchLevelDetails(indexPage) {
        if(indexPage) {
          this.indexPage = indexPage;
        }
        axios.get('/prisoner/levelDetails',{
          params:{
            prisonerId:this.prisonerId,
            indexPage:this.indexPage,
            pageSize:this.pageSize
          }
        }).then(res=>{
          if(res.data.code == 0){
            this.logList = res.data.data.records;
            this.logSize = res.data.data.logSize;
            if(res.data.data.records.length != 0){
              this.prisonerName = res.data.data.records[0].name;
            }
            this.archivesNumber = res.data.data.prisoner.archivesNumber;
            console.log(this.prisonerName,this.archivesNumber);
          }
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    components:{
      Remind,
      Page
    },
    beforeCreate() {
      this.prisonerId = this.$route.params.prisonerId;
    },
    mounted() {
      this.getLevelDetails();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  #right-side{
    /**{*/
      /*border:1px solid #000;*/
    /*}*/
  .middleLine {
    border-bottom:2px solid #F2F2F2;
  }
  .text-box{
    padding:20px 0;
  }
  .label-box{
    padding:25px 0 0 0;
    text-align:center;
  }

  .search-inner-box {
    margin:10px 0;
    background-color:#fff;
    >div{
      &:first-child{
        padding:0 0 5px 20px;
      }

      &:nth-child(3){
        padding:20px 0 5px 20px;
      }
    }
  }

  .label-box label{
    font-weight:normal;
  }
  .add-button {
    color: #fff;
    font-size: 15px;
    background: #1aa3ab;
    width: 90%;
    height: 40px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: 1px solid #1aa3ab;
  }
  .add-roll-button-box {
    margin-bottom: 10px;
  }
  .add {
  >div {
  >div {
     margin-bottom: 10px;
   }
  }
  }
  .menu-box-list {
    -moz-column-count:2; /* Firefox */
    -webkit-column-count:2; /* Safari 和 Chrome */
    column-count:2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }
  .menu-box {
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    width: 100%;
  }
  }
</style>
