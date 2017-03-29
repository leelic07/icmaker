<template>
    <!--切换页面tab组-->
    <div class="col-xs-24 tab">
        <ul class="col-xs-8 tab-box clearfix">
            <li class="col-xs-12 pull-left" :class="{'active':active.prison}" @click = "isActive(0)">
                <router-link class="col-xs-24 pull-left" to="/crimchange/prison">转监狱</router-link>
            </li>
            <li class="col-xs-12 pull-left":class="{'active':active.ward}" @click = "isActive(1)">
                <router-link class="col-xs-24 pull-left" to="/crimchange/ward">转监区</router-link>   
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .tab {
        a {
            color: #666;
        }
        .active {
            a {
                color: #333;
                font-weight: bold;
            }
        }
    }
</style>
<script> 
    export default {
        data(){
			return{
                active:{
                    "prison" : true,
                    "ward" : false
                }
			}
		},
        methods:{
            isActive(i){
                console.log(i);
                if (i == 0) {//监狱
                    this.active.ward = false
                    this.active.prison = true;
                }else {//监区
                    this.active.prison = false;
                    this.active.ward = true;
                }
            },
            currentActive() {
                if (this.$route.path == "/crimchange/prison") {//转监狱页面
                    this.active.prison = true;
                    this.active.ward = false;
                }else {
                    this.active.prison = false;
                    this.active.ward = true;
                }
            }
        },
        mounted(){
            this.currentActive();
        }
    }
</script>