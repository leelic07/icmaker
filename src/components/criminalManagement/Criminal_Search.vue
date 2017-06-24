<template>
  <div class="box">
    <!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right criminal-search" v-if="isManage">
      <!--搜索框部分-->
      <div class="col-xs-24 search">
        <div class="col-xs-23 search-box">
          <div class="col-xs-23 search-inner-box">
            <div class="row">
              <div class="col-xs-8 select-box">
                <label for="prisonId">所属监狱</label>
                <input type="text" class="form-control" list="prisonList" placeholder="全部" v-model="prisonName"
                       :disabled="prisons.length == 1" id="prisonInput">
                <datalist class="form-control hidden" id="prisonList">
                  <option v-for="prison in prisons" :prisonId="prison.id">{{prison.prisonName}}</option>
                </datalist>
              </div>
              <div class="col-xs-8 select-box">
                <label for="prisonDepartmentId">所属监区</label>
                <select class="form-control" id="prisonDepartmentId" v-model="prisonDepartmentId">
                  <option value="">全部</option>
                  <option v-for="depart in prisonDepartments" :value="depart.id">{{depart.prisonDepartmentName}}
                  </option>
                </select>
              </div>
              <div class="col-xs-8 select-box">
                <label for="status">在监状态</label>
                <select class="form-control" id="status" v-model="status">
                  <option v-for="status in statusList" :value="status.value">{{status.name}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-box">
                <label for="number">编号</label>
                <input type="text" class="form-control" id="number" v-model="number">
              </div>
              <div class="col-xs-6 text-box">
                <label for="archivesNumber">档案号</label>
                <input type="text" class="form-control" id="archivesNumber" v-model="archivesNumber">
              </div>
              <div class="col-xs-6 text-box">
                <label for="name">罪犯名</label>
                <input type="text" class="form-control" id="name" v-model="name">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4 col-xs-push-10 button-box">
                <input type="button" value="搜索" class="search-button" @click="criminalSearch(1)">
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
                          <th>姓名</th>
                          <th>编号</th>
                          <th>档案号</th>
                          <th>户籍</th>
                          <th>身份证</th>
                          <th>所属监狱</th>
                          <th>所属监区</th>
                          <th>在监状态</th>
                          <th>入监日期</th>
                          <th colspan="3">操作</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for = "prisoner in prisonerList">
                          <td>{{prisoner.name}}</td>
                          <td>{{prisoner.number}}</td>
                          <td>{{prisoner.archivesNumber}}</td>
                          <td>{{prisoner.address}}</td>
                          <td>{{prisoner.cardNo}}</td>
                          <td>{{prisoner.prisonName}}</td>
                          <td>{{prisoner.prisonDepartmentName}}</td>
                          <td>{{prisoner.status | formatStatus}}</td>
                          <td>{{prisoner.intoPrisonDate | formatPrisonDate}}</td>
                          <td><router-link class="agree-text edit-link" :to = '"/crimsearch/edit/"+prisoner.prisonerId'>修改</router-link></td>
                          <td><em class="reject-text delete-link" :id = "prisoner.prisonerId" @click = "deletePrisoner($event.target)">删除</em></td>
                          <td><em class="agree-text restore-link" :id = "prisoner.prisonerId" @click = "restore($event.target)" v-if = "prisoner.status == 1">出监</em></td>
                          <td><em class="agree-text restore-link" :id = "prisoner.prisonerId" @click = "levelDetails($event.target,prisoner.prisonerId)">明细</em></td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <!-- 表单底部-->
          <Page :itemSize = "prisonerSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search = "criminalSearch"></Page>
        </div>
        <!-- 删除确认框-->
        <div class="modal modal-confirm" id="delCriminalConfirm" tabindex="-1" role="dialog"
            aria-labelledby="myModalLabel" aria-hidden="false">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <h3>确认删除?</h3>
                <button class="confirm-button" :id="currentId" data-dismiss="modal" @click="deleteConfirm">确定</button>
                <button class="cancel-button" data-dismiss="modal">取消</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>

        <!-- 出监确认框-->
        <div class="modal modal-confirm" id="restoreConfirm" tabindex="-1" role="dialog"
            aria-labelledby="myModalLabel" aria-hidden="false">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="false">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <h3>确认出监?</h3>
                <button class="confirm-button" :id="currentId" data-dismiss="modal" @click="restoreConfirm">确定</button>
                <button class="cancel-button" data-dismiss="modal">取消</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>

        <Remind v-if="remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>

    <!--点击编辑路由入口-->
    <router-view></router-view>
  </div>
</template>
<script>
import Remind from '../Remind.vue'
import store from '../../store'
import Page from '../Paginator.vue'
import axios from 'axios'

    export default {
        data(){
            return {
                prisons: "",//监狱列表
                prisonDepartments: "",//监区列表
                statusList: "",//在监状态列表
                prisonerList: "",//罪犯信息列表
                prisonerSize: "",//罪犯信息条数
                currentId: "",//当前操作的罪犯ID
                prisonName: "",//监狱名
                prisonId: "",//所属监狱ID
                prisonDepartmentId: "",//所属监区ID
                status: "",//在监状态
                number: "",//编号
                archivesNumber: "",//档案号
                name: "",//罪犯名
                toUrl: "",//到达路由
                fromUrl: "",//进入路由
                remind:{
                    status:'',
                    msg:''
                },
                isManage: true,//是否为管理页
                pageSize: 10,//每页显示的条数
                indexPage: 1
            }
        },
        computed: {
            remindShow:{
                get(){
                    return store.getters.remindShow;
                }
            }
        },
      watch: {
        prisonName(){
          let oldPrisonId = this.prisonId;
          for (let i = 0; i < this.prisons.length; i++) {
            if (this.prisons[i].prisonName == this.prisonName) {
              this.prisonId = this.prisons[i].id;
              break;
            } else if (this.prisonName == "") {
              this.prisonId = "";
            } else {
              this.prisonId = -1;
            }
          }
          if (this.prisonId != oldPrisonId) {
            this.getPrisonDepartInfo();
          } else {
            this.prisonDepartments = "";
          }
        },
        $route(to, from){//监听路由变化
          this.toUrl = to.path;
          this.fromUrl = from.path;
        },
        toUrl() {
          const editUrl = "/crimsearch/edit/2";
          const detailsUrl = "/crimsearch/criminal_details/2";
          const index = editUrl.lastIndexOf('/');
          const dIndex = detailsUrl.lastIndexOf('/');
          if (this.toUrl.substring(0, index) == "/crimsearch/edit" || this.toUrl.substring(0, dIndex) == "/crimsearch/criminal_details") {//进入编辑页面
            this.isManage = false;//将管理页隐藏
          } else {
            this.isManage = true;
          }
        },
        fromUrl() {
          const editUrl = "/crimsearch/edit/2";
          const detailsUrl = "/crimsearch/criminal_details/2";
          const index = editUrl.lastIndexOf('/');
          const dIndex = detailsUrl.lastIndexOf('/');
          if (this.fromUrl.substring(0, index) == "/crimsearch/edit" || this.fromUrl == '/crimadd' || this.toUrl.substring(0, dIndex) == "/crimsearch/criminal_details") {//从新增或者编辑页进入
            this.criminalSearch(this.indexPage);
          }
        }
    },
    methods: {
      //初始为编辑页时隐藏管理页
      hideCriminalList(url) {
          const editUrl = "/crimsearch/edit/2";
          const index = editUrl.lastIndexOf('/');
          if (url.substring(0, index) == "/crimsearch/edit") {//进入编辑页面
            this.isManage = false;//将管理页隐藏
          }
      },

      getStatusList(){//赋值状态列表
          this.statusList = [{"value": "", "name": "全部"}, {"value": 0, "name": "离监"}, {"value": 1, "name": "在监"}]
      },

      getPrisonInfo() {//根据用户信息获取监狱信息
          axios.get('prisoner/toAddOrEdit').then(res => {
            if (res.data.code == 0) {
              this.prisons = res.data.data.prisons;//赋值监狱列表
              if (this.prisons.length == 1) {
                this.prisonName = this.prisons[0].prisonName;
                this.prisonId = this.prisons[0].id;
                this.getPrisonDepartInfo();
              }
              this.criminalSearch(this.indexPage);
            }
          }).catch(err => {
            console.log(err);
          });
      },

      getPrisonDepartInfo () {//获取监区信息
          axios.get('prisoner/getDepartments', {params: {"prisonId": this.prisonId}}).then(res => {
            if (res.data.code == 0) {
              this.prisonDepartments = res.data.data;//赋值监区列表
            }
          }).catch(err => {
            console.log(err);
          });
      },

      criminalSearch(index){
          this.indexPage =index;
          for (let i = 0; i< this.prisons.length; i++)  {
              if (this.prisons[i].prisonName == this.prisonName) {
                  this.prisonId = this.prisons[i].id;
                  break;
              } else if (this.prisonName == "") {
                this.prisonId = "";
              } else {
                this.prisonId = -1;
              }
          }
          let searchData = {
              "prisonId": this.prisonId,
              "prisonDepartmentId": this.prisonDepartmentId,
              "status": this.status,
              "name":  this.empty(this.name)[0],
              "number": this.empty(this.number)[0],
              "archivesNumber":this.empty(this.archivesNumber)[0],
              "indexPage":this.indexPage,
              "pageSize":this.pageSize
          };
          // console.log(searchData);
          axios.get('prisoner/getPrisoners',{params:searchData}).then(res=>{
              //console.log(res);
              if (res.data.code == 0) {
                  this.prisonerList = res.data.data.prisoners;//赋值罪犯列表
                  this.prisonerSize = res.data.data.prisonerSize;//赋值罪犯列表数
              }
          }).catch(err=>{
              console.log(err);
          });
      },

      restore (tar) {//点击出监按钮
          $('#restoreConfirm').modal();
          this.currentId = tar.getAttribute("id");
      },

      restoreConfirm() {//点击确认出监
          const resUrl = '/prisoner/outPrison';
          axios.post(resUrl, $.param({'prisonerId': this.currentId})).then(res => {
            if (res.data.code == 0) {
              this.remind = {
                status: 'success',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
              this.criminalSearch(this.indexPage);
            } else {
              this.remind = {
                status: 'failed',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
            }

          }).catch(err => {
            console.log(err);
          });
      },

      deletePrisoner (tar) {//点击删除按钮
          $('#delCriminalConfirm').modal();
          this.currentId = tar.getAttribute("id");
          console.log("删除确认")
      },

      deleteConfirm() {//点击确认删除
          const delUrl = 'prisoner/deletePrisoner';
          axios.post(delUrl, $.param({'prisonerId': this.currentId})).then(res => {
            if (res.data.code == 0) {
              this.remind = {
                status: 'success',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
              this.criminalSearch(this.indexPage);
            } else {
              this.remind = {
                status: 'failed',
                msg: res.data.msg
              }
              store.dispatch('showRemind');
            }

          }).catch(err => {
            console.log('删除罪犯列表服务器异常' + err);
          });
      },
      levelDetails(e,prisonerId) {
        this.$router.push({
          path:'/crimsearch/criminal_details/'+prisonerId
        });
      }
    },
    components: {
      Page,
      Remind
    },
    mounted(){
      this.getStatusList();
      this.getPrisonInfo();
      this.hideCriminalList(this.$route.path);
    },
    updated(){
      $('#table_id_example').tableHover();
    }
  }

</script>
