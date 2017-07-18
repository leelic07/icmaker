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
                  <option v-if='prisonList.length > 1' value=''>全部</option>
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
              <!--<label for="prisonDepartmentId">所属监区</label>-->
              <!--<select class="form-control" id="prisonDepartmentId" v-model="prisonDepartmentId">-->
                <!--<option value="">全部</option>-->
                <!--<option v-for = "depart in prisonDepartments" :value = "depart.id">{{depart.prisonDepartmentName}}</option>-->
              <!--</select>-->
              <label for="name">所属监区</label>
              <select class="form-control" v-model='prisonDepartmentId'>
                <option value=''>全部</option>
                <option v-for='pdt in prisonDepartmentsTem' v-text='pdt.prisonDepartmentName' :value='pdt.id'></option>
              </select>
            </div>
            <div class="col-xs-8 select-box">
              <label for="prisonDepartmentId">处遇等级</label>
              <select class="form-control" id="" >
                <option value="">全部</option>
                <option v-for="ll in levelList" :value="ll.id" v-text="ll.levelName"></option>
              </select>
            </div>
          </div>
          <div class='row'>
            <div class="col-xs-8 select-box">
              <label for="prisonerName">罪犯姓名</label>
              <input type="text" class="form-control" id="prisonerName" v-model="prisonerName">
            </div>
            <div class="col-xs-8 select-box">
              <label for="number">罪犯编号</label>
              <input type="text" class="form-control" id="number" v-model="number">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4 col-xs-push-10 button-box">
              <input type="button" value="搜索" class="search-button" @click='getPrisonerLevelRecords()'>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--按钮组部分-->
    <div class="col-xs-24 button">
      <div class="col-xs-2">
        <input type="button" value="同意" class="agree-button" @click="agree()">
      </div>
      <div class="col-xs-2">
        <input type="button" value="拒绝" class="reject-button" @click="reject()">
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
              <th>所属监狱</th>
              <th>所属监区</th>
              <th>罪犯姓名</th>
              <th>罪犯编号</th>
              <th>原处遇等级</th>
              <th>现处遇等级</th>
              <th>申请人</th>
              <th>申请时间</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rs in records">
              <td>
                <div class="info-check info-list-check" :id="rs.id"></div>
              </td>
              <td v-text="rs.prisonName"></td>
              <td v-text="rs.prisonDepartmentName"></td>
              <td v-text="rs.prisonerName"></td>
              <td v-text="rs.number"></td>
              <td v-text="rs.preLevelName"></td>
              <td v-text="rs.levelName"></td>
              <td v-text="rs.userName"></td>
              <td>{{rs.createdAt | formatDate}}</td>
              <td v-text="rs.remark"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 表单底部-->
      <Page :itemSize='recordSize' :pageSize='pageSize' :indexPage='indexPage' v-on:search='getPrisonerLevelRecords'></Page>

    </div>

    <!--模态框-->

    <!--拒绝理由-->
    <div class="modal modal-confirm" id="rejectConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>拒绝理由</h3>
            <textarea class="form-control" rows="5" v-model='remark' placeholder="拒绝理由..."></textarea>
            <button class="confirm-button" @click='rejectExamine()'>提交</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <!-- 同意通过审核-->
    <div class="modal modal-confirm" id="agreeConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h3>同意审核？</h3>
            <button class="confirm-button" @click="agreeExamine()" data-dismiss='modal'>确定</button>
            <button class="cancel-button" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>

    <Remind v-if='remindShow' :status='remind.status' :msg='remind.msg'></Remind>

  </div>
</template>

<script>

  import Page from '../Paginator.vue'
  import Remind from '../Remind.vue'
  import store from '../../store'

  export default {
    data() {
      return {
        indexPage: 1,
        pageSize: 10,
        menuSize: '',
        accountName: '',
        accountType: '',
        type: '',
        prisonList: [],
        prisonId: '',
        prisonDepartmentId:'',
        prisonName: '',
        prisonerName:'',
        number:'',
        prisonCapitalTransfers: [],
        ids: [],
        levelList:[],//处遇等级列表
        remark: '',
        recordSize:'',
        records:[],
        remind: {
          status: '',
          msg: ''
        }
      }
    },
    computed: {
      remindShow: {
        get(){
          return store.getters.remindShow;
        }
      },
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
    watch: {
      //根据监狱名称得到监狱ID
      prisonName() {
        this.prisonId = '';
        this.levelName = '';
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
      },
      prisonId() {
        let pd = this.prisonDepartments;
        let pdt = this.prisonDepartmentsTem;
        pdt.splice(0, pdt.length);
        this.prisonAndPrisonDepartment(pd, pdt);
        this.getLevelsByPrisonId();
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

//      getPrisonDepartInfo () {//获取监区信息
//        this.$http.get('prisoner/getDepartments',{params: {"prisonId":this.prisonId}}).then(res=>{
//          if (res.data.code == 0) {
//            this.prisonDepartments = res.data.data;//赋值监区列表
//          }
//        }).catch(err=>{
//          console.log(err);
//        });
//      },

      getLevelsByPrisonId () {//获取处遇等级信息
        this.$http.get('level/getLevelsByPrisonId',{
          params:{
            prisonId:this.prisonId
          }
        }).then(res=> {
          if (res.data.code == 0) {
            this.levelList = res.data.data;
          }
        }).catch(err=> {
          console.log(err);
        })
      },

      //查询所有监狱列表
      getAllPrison() {
        this.$http({
          method: 'get',
          url: '/prisoner/toAddOrEdit',
        }).then(res => {
          let data = res.data.data;
          if(res.data.code == 0) {
            this.prisonList = data.prisons;
            this.prisonDepartments = data.prisonDepartments;
            if (this.prisonList.length == 1) {
              this.prisonId = this.prisonList[0].id;
              this.prisonName = this.prisonList[0].prisonName;
            }
            this.getPrisonerLevelRecords();
          }
        }).catch(err => {
          console.log(err);
        });
      },

      //获取处遇等级审核列表
      getPrisonerLevelRecords(indexPage) {
        if(indexPage){
          this.indexPage = indexPage;
        }
        this.$http.get('/level/getPrisonerLevelRecords',{
          params:{
            prisonId:this.prisonId,
            prisonDepartmentId:this.prisonDepartmentId,
            levelName:this.levelName,
            prisonerName:this.prisonerName,
            number:this.number,
            indexPage:this.indexPage,
            pageSize:this.pageSize
          }
        }).then(res=> {
          if(res.data.code == 0) {
//            console.log(res.data);
            this.records = res.data.data.records;
            this.recordSize = res.data.data.recordSize;
          }
        }).catch(err=> {
            console.log(err);
        })
      },

      //获取选中的项目
      getAllSelectedRecords() {
        let checkedInfo = $(".info-list-check").filter(".active");
        let treatmentIds = new Array();//批量转监狱罪犯审核的ID数组
        for (let i = 0; i < checkedInfo.length; i++) {
          treatmentIds.push(checkedInfo[i].getAttribute("id"));
        }
        this.ids = treatmentIds;
      },

      //点击同意按钮
      agree() {
        this.getAllSelectedRecords();
        if (this.ids.length == 0) {
          this.remind = {
            status: 'warn',
            msg: '请选择'
          }
          store.dispatch('showRemind');
          return;
        } else {
          $('#agreeConfirm').modal();
        }
      },

      //点击拒绝按钮
      reject() {
        this.getAllSelectedRecords();
        if (this.ids.length == 0) {
          this.remind = {
            status: 'warn',
            msg: '请选择'
          }
          store.dispatch('showRemind');
          return;
        } else {
          $('#rejectConfirm').modal();
        }
      },

      //处遇等级审核同意
      agreeExamine() {
        this.$http.post('/level/levelVerifies',$.param({
          ids:this.ids.join(','),
          verifyType:1,
        })).then(res=> {
          if(res.data.code == 0) {
            this.remind = {
              status: 'success',
              msg: res.data.msg
            }
            store.dispatch('showRemind');
            this.getPrisonerLevelRecords(1);
          } else {
            this.remind = {
              status: 'warn',
              msg: res.data.msg
            }
            store.dispatch('showRemind');
          }
        }).catch(err=> {
          console.log(err);
        });
      },

      //处遇等级审核拒绝
      rejectExamine() {
        if (this.isNull(this.remark)) {
          this.remind = {
            status: 'warn',
            msg: '请填写拒绝理由'
          };
          store.dispatch('showRemind');
          return;
        }

        this.$http.post('/level/levelVerifies',$.param({
          ids:this.ids.join(','),
          verifyType:2,
          remark:this.remark
        })).then(res=> {
          if(res.data.code == 0) {
            this.remind = {
              status: 'success',
              msg: res.data.msg
            }
            store.dispatch('showRemind');
            this.getPrisonerLevelRecords(1);
            $('#rejectConfirm').modal('hide');
          } else {
            this.remind = {
              status: 'warn',
              msg: res.data.msg
            }
            store.dispatch('showRemind');
          }
        }).catch(err=> {
          console.log(err);
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted(){
      $('#table_id_example').tableHover();
      $('#table_id_example').select();
      this.getAllPrison();
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  #right-side {
    .select-box {
      padding: 20px 50px 20px 40px;
    }

    #rejectConfirm {
      textarea {
        margin-top: 30px;
      }
    }
  }
</style>
