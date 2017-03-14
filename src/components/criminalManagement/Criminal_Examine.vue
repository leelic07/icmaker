<template>
    <!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--切换页面tab组-->
        <right-tab></right-tab>
        <keep-alive>
           <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import RightTab from './Examine_Right_Tab'
export default {
  data () {
    return {
        
    }
  },
  components:{
    RightTab
  }
}
</script>