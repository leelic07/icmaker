<template>
      <!--左侧边栏-->
        <div id="left-side" class="col-xs-4">
            <div class="col-xs-24 top">
                <p>监狱“一卡通”消费管理系统</p>
                <img src="../../static/img/badge.png" alt=""/>
            </div>
            <div class="col-xs-24 top">
                <p>{{userInfo.prisonName}}</p>
            </div>
            
            <div class="col-xs-24 menuList" v-for = "(menu,index) in sideInfo">
                <a class="col-xs-24 collapsed" data-toggle="collapse" :href = "'#menu'+menu.id" @click = "isCollapse(index)">
                    <div class="col-xs-6" v-if = "collapsed[index] == true">
                        <b class="pull-left"><img :src="menu.menuIconUrl" v-if = "menu.menuIconUrl != null && menu.menuIconUrl != ''"><img src="../../static/img/ICka.png" v-else></b>
                    </div>
                    <div class="col-xs-6" v-else>
                        <b class="pull-left"><img :src="menu.menuActiveIconUrl" v-if = "menu.menuActiveIconUrl != null && menu.menuActiveIconUrl != ''"><img src="../../static/img/ICka-click.png" v-else></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">{{menu.menuName}}</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul class="col-xs-24 subItem collapse" :id="'menu'+menu.id">
                    <li v-for = "subMenu in menu.subMenuList" @click = "changeActive($event)">
                        <router-link class="col-xs-24 pull-left" :to = 'subMenu.pageUrl' v-if = "subMenu.pageUrl != null" >{{subMenu.menuName}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
</template>
<style lang="less" scoped>
    #left-side {
        .top:nth-child(1){
            p{
                font-size: 16px;
                line-height: 50px;
            }
        }
        .top:nth-child(2){
            p{
                font-size: 15px;
                margin-top:65px;
            }
        }
        .menuList {
            a {
                img {
                    width: 25px;
                    height: 18px;
                    margin-top: 16px;
                    margin-left: 120%;
                }
            }
            a:not(.collapsed) {
                span {
                    color: #fff;
                }
                i {
                    background: url(../../static/img/arrow-white.png) no-repeat 0 0;
                }
            }
        }
    }
    @media screen and (min-width: 1560px) {
        #left-side{
            .top:nth-child(1){
                p{
                    font-size: 18px;
                    line-height: 50px;
                }
            }
            .top:nth-child(2){
                p{
                    font-size: 16px;
                    margin-top:60px;
                }
            }
        }
    }
</style>
<script>
    import store from './../store'
    export default{
        data(){
            return{
                sideInfo: "",
                userInfo: "",
                collapsed: []
            }
        },
        computed: {
            sideReload:{
                get(){
                    return store.getters.sideReload;
                }
            }
        },
        watch:{
           sideReload() {
               this.getSideList();
           }
        },
        methods:{
            getSideList(){
                if (this.$route.path != "/login") {
                    this.$http.get('getIndex').then(res=>{
                        // console.log("侧边栏");
                        // console.log(res);
                        if (res.data.code == 0) {
                            this.sideInfo = res.data.data.menuHierarchyDtos;
                            for (let i = 0; i < this.sideInfo.length; i++) {
                                this.sideInfo[i].isActive = false;
                                this.collapsed.push(true);
                            }
                            this.userInfo = res.data.data.user;
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },

            changeActive(e) {
                $(e.target).addClass('active');
            },

            isCollapse(i) {
                if (this.collapsed[i] == true) {
                    this.$set(this.collapsed,i,false);
                }else {
                    this.$set(this.collapsed,i,true);
                }
            }
        },
        mounted(){
            this.getSideList();
        }
    }
</script>
