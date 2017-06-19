<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">

    <!--表格部分-->
    <div class="col-xs-24 form">
      <div class="col-xs-23">
        <table class="display table ic-table" id="table_id_example">
          <thead>
            <tr>
              <th></th>
              <th>所属监狱</th>
              <th>所属监区</th>
              <th>罪犯名</th>
              <th>罪犯编号</th>
              <th>分配金额</th>
              <th>提示</th>
            </tr>
          </thead>
          <tbody>
          <tr >
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize='menuSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='searchLocation'></Page>

      <div class="remarkBox pull-left col-xs-23">

        <div class="col-xs-1">
          <label for="remark" class="pull-left col-xs-24">备注</label>
        </div>

        <div class="col-xs-12">
          <input id="remark" type="text" class="col-xs-24">
        </div>

        <div class="col-xs-1">
          <span class="remind-text pull-left col-xs-24 text-center">必填</span>
        </div>

      </div>

      <div class="confirm pull-left col-xs-23">

        <div class="col-xs-13">
          <button class="pull-right">确认分配</button>
        </div>

        <div class="col-xs-5">
          <span>罪犯信息错误，无法分配</span>
        </div>

        <div class="col-xs-6">
          <button class="">重新上传</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import Page from '../Paginator.vue'

  export default{
    data(){
      return {
        indexPage: 1,
        pageSize: 10,
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
            this.prisonId = -1
          }
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
          if (this.prisonList.length == 1) {
            this.prisonId = this.prisonList[0].id;
            this.prisonName = this.prisonList[0].prisonName;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //查询罪犯资金分配列表
      getLocationList(){
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
      }

    },
    components: {
      Page
    },
    mounted(){
      this.getAllPrison();
      this.getLocationList();
      $('#table_id_example').tableHover();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  @white:#fff;
  @gray:#C1C1C1;
  @textGray:#B8B8B8;
  *{
    border:1px solid #000;
  }
  .reject-text{
    margin-left:15%;
    color:#ff1616;
  }
  .form{
    margin-top:81px;
  }

  .remarkBox{
    margin-left:2%;
    background:@white;
    margin-bottom:20px;
    padding:20px 10px 15px 10px;
    border:1px solid #E9E9E9;
    >div{
      &:first-child{
        margin-left:1%;
      }

      &:nth-child(2){
        input{
          height:30px;
          margin-top:-5px;
        }
      }
    }
    .remind-text{
      color:#ff1616;
    }
  }

  .confirm{

  }

  .button(@bgColor,@color,@height,@width){
    background:@gray;
    color:@white;
  }
</style>
