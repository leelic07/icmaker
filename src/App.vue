<template>
  <div id="app" class="container-fluid">
    <loading v-show="false"></loading>
    <LeftSide></LeftSide>
    <NavBar></NavBar>
        <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import LeftSide from './components/Left-side.vue'
import NavBar from './components/NavBar.vue'
import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  computed:mapGetters(['loadingShow']),
  methods:{
  
  },
  components:{
    LeftSide,
    NavBar
  },
  mounted(){
    
  }
}
</script>

<style>
</style>
