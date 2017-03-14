<template>
    <!--切换页面tab组-->
    <div class="col-xs-24 tab">
        <ul class="col-xs-8 tab-box clearfix">
            <li class="col-xs-12 active pull-left">
                <router-link class="col-xs-24 pull-left" to="/crimchange/prison">转监狱</router-link>
            </li>
            <li class="col-xs-12 pull-left">
                <router-link class="col-xs-24 pull-left" to="/crimchange/ward">转监区</router-link>   
            </li>
        </ul>
    </div>
</template>

<script> 
    export default {
        data(){
            return {
                
            }
        },
        methods:{

        }
    }
</script>