<template>
    <!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--切换页面tab组-->
        <right-tab></right-tab>
        <router-view></router-view>
    </div>
</template>
<script>
    import RightTab from './Change_Right_Tab'
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