<template>
  <div id="app" class="container-fluid">
    <loading v-show="loadingShow"></loading>
    <LeftSide v-show = "isNotLogin"></LeftSide>
    <NavBar v-show = "isNotLogin"></NavBar>
        <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
    button[disabled]{
       background: #ccc !important ;
    }
</style>
<script>
import Vue from 'vue'
import LeftSide from './components/Left-side.vue'
import NavBar from './components/NavBar.vue'
import store from './store'
import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      isNotLogin: true
    }
  },
  watch:{
      $route(to){//监听路由变化
        const loginUrl = "/login";
        if (to.path == loginUrl ) {//进入登陆页面
            this.isNotLogin = false;//将侧边栏和顶栏隐藏
        }else {
            this.isNotLogin = true;
        } 
      }
  },
  computed:{
    loadingShow:{
      get(){
        return store.state.mutations.loading;
      }
    }
  },
  methods:{
    hidebar(){
      const loginUrl = "/login";
      if (this.$route.path == loginUrl ) {//进入登陆页面
          this.isNotLogin = false;//将侧边栏和顶栏隐藏
      } 
    }
  },
  components:{
    LeftSide,
    NavBar
  },
  mounted(){
    //初始为登陆页时隐藏侧边和顶边栏
    this.hidebar();
  }
}
</script>

<style>
  #app {
    height: 100%;
    overflow-x: hidden;
  }
</style>
