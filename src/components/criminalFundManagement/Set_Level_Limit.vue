<template>
  <!-- 右侧内容-->
  <div id="right-side" class="col-xs-20 pull-right">
    <!--搜索框部分-->
    <div class="col-xs-24 search">
      <div class="col-xs-23 search-box">
        <div class="col-xs-23 search-inner-box">
          <div class="row">
            <div class="col-xs-8 select-box">
              <label for="prisonId">所属监狱</label>
              <input type="text" class="form-control" list = "prisonList" placeholder = "全部" v-model = "prisonName" :disabled = "prisons.length == 1">
              <datalist class="form-control hidden" id="prisonList">
                <option v-for = "prison in prisons" :prisonId = "prison.id">{{prison.prisonName}}</option>
              </datalist>
            </div>
            <!--<div class="col-xs-8 select-box">-->
              <!--<label for="prisonDepartmentId">所属监区</label>-->
              <!--<select class="form-control" id="prisonDepartmentId" v-model = "prisonDepartmentId">-->
                <!--<option value="">全部</option>-->
                <!--<option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>-->
              <!--</select>-->
            <!--</div>-->
          <div class="col-xs-8 select-box">
            <label for="prisonDepartmentId">处遇等级</label>
            <select class="form-control" id="" >
              <option value="">全部</option>
              <option v-for="ll in levelList" :value="ll.id" v-text="ll.levelName"></option>
            </select>
          </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click="getLevels()">
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
              <th></th>
              <th>所属监狱</th>
              <th>处遇等级</th>
              <th>B卡日限额</th>
              <th>总月限额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="le in levels">
              <td :id="le.id"></td>
              <td v-text="le.prisonName"></td>
              <td v-text="le.levelName"></td>
              <td v-text="le.dayMoney"></td>
              <td v-text="le.monthMoney"></td>
              <td><em class="agree-text"  @click="setFund($event,le.id,le.dayMoney,le.monthMoney,le.prisonName,le.levelName)" >设置</em></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize = "levelSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "getLevels"></Page>
    </div>


    <!--模态框-->

    <!--设置限额 -->
    <div class="modal modal-confirm modal-bind" id="setConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>设置罪犯限额</h3>
            <div class="clearfix bind-info">
              <ul class="pull-left clearfix bind-info-list">
                <li class="clearfix"><span class="pull-left info-label">所属监狱</span><span class="pull-right">{{setLevelPrisonName}}</span></li>
                <li class="clearfix"><span class="pull-left info-label">处遇等级</span><span class="pull-right">{{levelName}}</span></li>
              </ul>
            </div>
            <div class="col-xs-24">
              <div class="form-group fee-input clearfix">
                <label for="dayMoney" class="col-xs-6 pull-left">B卡日限额：</label>
                <div class="col-xs-18 pull-left">
                  <input type="text" class="form-control" id="dayMoney" placeholder="输入B卡日限额" v-model="dayMoney">
                </div>
              </div>
              <div class="form-group fee-input clearfix">
                <label for="monthMoney" class="col-xs-6 pull-left">总月限额：</label>
                <div class="col-xs-18 pull-left">
                  <input type="text" class="form-control" id="monthMoney" placeholder="输入总月限额" v-model="monthMoney">
                </div>
              </div>
            </div>
            <button class="confirm-button" @click="setLevelMoney()">保存</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
  </div>
</template>

<style type="text/less" lang="less" scoped>
  button[disabled]{
    background: #999 !important ;
    border: 1px solid #999;
  }
  .modal {
  label {
    color: #666;
    line-height: 30px;
  }
  }
</style>

<script>
  import Remind from '../Remind.vue'
  import store from '../../store'
  import Page from '../Paginator.vue'
  import axios from 'axios'

  export default{
    data() {
      return {
        prisons: "",//监狱列表
        prisonDepartments: "",//监区列表
        prisonName: "",//监狱名
        prisonId: "",//监狱ID
        prisonDepartmentId: "",//监区ID

        id: "",//新增时候为-999 修改时候为具体数字

        dayMoney: "",//日限制额度
        monthMoney: "",//月限制额度
        typeId: 1,//0-按监狱限额；1-按监区限额
        levelDetails:'',//等级明细
        remind:{
          status:'',
          msg:''
        },
        pageSize: 10,
        indexPage: 1,
        levels:[],//处遇等级分页查询列表
        levelSize:'',//处遇等级长度
        levelList:[],//处遇等级列表
        levelId:'',//处遇等级Id
        setLevelPrisonName:''//设置处遇等级监狱名称
      }
    },
    computed: {
      remindShow: {
        get() {
          return store.getters.remindShow;
        }
      }
    },
    watch: {
      prisonName() {
        let oldPrisonId = this.prisonId;
        for (let i = 0; i< this.prisons.length; i++)  {
          if (this.prisons[i].prisonName == this.prisonName) {
            this.prisonId = this.prisons[i].id;
          }
        }
        if (this.prisonId != oldPrisonId) {
          this.getPrisonDepartInfo();
        }else {
          this.prisonId = "";
          this.prisonDepartments = "";
        }
      },
      prisonId(){
        this.getLevelsByPrisonId();
      },
      //删除小数点两位后的数字
      dayMoney(){
        this.dayMoney = this.saveTwo(this.dayMoney);
      },

      monthMoney(){
        this.monthMoney = this.saveTwo(this.monthMoney);
      }
    },
    methods:{
      getPrisonInfo() {//根据用户信息获取监狱信息
        this.$http.get('prisoner/toAddOrEdit').then(res=> {
          // console.log(res);
          if (res.data.code == 0) {
            this.prisons = res.data.data.prisons;//赋值监狱列表
            if (this.prisons.length == 1) {
              this.prisonName = this.prisons[0].prisonName;
              this.prisonId = this.prisons[0].id;
              this.getPrisonDepartInfo();
            }
            this.getLevels(this.indexPage);
          }
        }).catch(err=> {
          console.log(err);
        });
      },

      getLevelsByPrisonId () {//获取处遇等级信息
        this.$http.get('level/getLevelsByPrisonId',{
          params:{
            prisonId:this.prisonId
          }
        }).then(res=> {
          // console.log(res);
          if (res.data.code == 0) {
            this.levelList = res.data.data;
          }
        }).catch(err=> {
          console.log(err);
        })
      },

      //获取处遇等级查询列表
      getLevels(indexPage) {
//        console.log('level');
        this.indexPage = indexPage;
        axios.get('/level/getLevels',{
          params:{
            prisonId:this.prisonId,
            levelName:this.levelName,
            indexPage:this.indexPage,
            pageSize:this.pageSize
          }
        }).then(res=>{
          if(res.data.code == 0){
            this.levels = res.data.data.levels;
            this.levelSize = res.data.data.levelSize;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //点击设置执行的方法
      setFund (e,levelId,dayMoney,monthMoney,setLevelPrisonName,levelName) {
        this.levelId = levelId;
        this.dayMoney = dayMoney;
        this.monthMoney = monthMoney;
        this.setLevelPrisonName = setLevelPrisonName;
        this.levelName = levelName;
        $('#setConfirm').modal();
      },
      setLevelMoney() {
//        console.log(this.levelId,typeof parseInt(this.dayMoney),typeof parseInt(this.monthMoney));
        axios.post('/level/setLevelMoney',{
          params:{
            levelId:this.levelId,
            dayMoney:parseInt(this.dayMoney),
            monthMoney:parseInt(this.monthMoney)
          }
        }).then(res=>{
          if(res.data.code == 0){
            this.remind = {
              status: 'success',
              msg: '设置处遇等级成功',
            };
            store.dispatch('showRemind');
          }else{
            this.remind = {
              status: 'warn',
              msg: res.data.msg,
            };
            store.dispatch('showRemind');
          }
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted() {
      $('#table_id_example').tableHover();
      $('#table_id_example').select();
      this.getPrisonInfo();
    }
  }
</script>

<style type="text/less" lang='less' scoped>
  #setConfirm{
  h3{
    font-weight:bold;
  }

  .bind-info-list{
    width:100%;
  }

  .modal-dialog{
    width:36%;
  }

  .bind-info{
    margin-top:40px;
  }

  .info-label{
    color:#B1B1B1;
  }

  .confirm-button{
    width:44%;
    margin-left:0;
  }

  .cancel-button{
    width:44%;
  }

  .modal-body{
    padding:0 80px;
  }
  }
</style>
