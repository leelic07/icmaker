<template>
      <!--左侧边栏-->
        <div id="left-side" class="col-xs-4">
            <div class="col-xs-24 top">
                <p>IC卡管理平台</p>
                <img src="../../static/img/badge.png" alt=""/>
            </div>
            <div class="col-xs-24 top">
                <p>长沙市女子监狱</p>
            </div>
            <div class="col-xs-24">
                <a href="#" class="col-xs-24" :class="{'ic-active':icActive}" @click="icClick">
                    <div class="col-xs-6">
                        <b class="pull-left ic-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">IC卡管理</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul v-show="icActive" class="col-xs-24 subItem">
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/examine">IC卡审核</router-link>
                    </li>
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/delivery">发卡</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">销卡/挂失/解挂</a> -->
                        <router-link class="col-xs-24 pull-left" to="/cancel">销卡/挂失/解挂</router-link>
                    </li>
                    <li>
                        <!-- <a class="active col-xs-24 pull-left" href="#">虚拟账号管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/management">虚拟账号管理</router-link>
                    </li>
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/application">申请制卡</router-link>
                    </li>    
                    <li>
                        
                    
                    </li>
                </ul>
            </div>
            <div class="col-xs-24">
                <a href="#" class="col-xs-24" :class="{'prison-fund-active':fundActive}" @click="fundClick">
                    <div class="col-xs-6">
                        <b class="pull-left prison-fund-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">监狱资金管理</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul v-show="fundActive" class="col-xs-24 subItem">
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">新增账户</a> -->
                        <router-link class="col-xs-24 pull-left" to="/account_add">新增账户</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">账户管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/account_management">账户管理</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">转账申请</a> -->
                        <router-link class="col-xs-24 pull-left" to="/transfer_application">转账申请</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">转账审核</a> -->
                        <router-link class="col-xs-24 pull-left" to="/transfer_examine">转账审核</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">资金明细</a> -->
                        <router-link class="col-xs-24 pull-left" to="/fund_detail">资金明细</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-xs-24">
                <a href="#" class="col-xs-24" :class="{'crim-fund-active':crimFundActive}" @click="crimFundClick">
                    <div class="col-xs-6">
                        <b class="pull-left crim-fund-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">罪犯资金管理</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul v-show="crimFundActive" class="col-xs-24 subItem">
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">个人罪犯消费限制</a> -->
                        <router-link class="col-xs-24 pull-left" to="/criminal_fund_limit">个人罪犯消费限制</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">监狱罪犯消费限制</a> -->
                        <router-link class="col-xs-24 pull-left" to="/prison_limit">监狱罪犯消费限制</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">监区罪犯消费限制</a> -->
                        <router-link class="col-xs-24 pull-left" to="/prison_area_limit">监区罪犯消费限制</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">罪犯资金分配</a> -->
                        <router-link class="col-xs-24 pull-left" to="/criminal_fund_distribution">罪犯资金分配</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">罪犯资金明细查询</a> -->
                        <router-link class="col-xs-24 pull-left" to="/criminal_fund_detail">罪犯资金明细查询</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-xs-24">
                <a href="#" class="col-xs-24" :class="{'crim-active':crimActive}" @click="crimClick">
                    <div class="col-xs-6">
                        <b class="pull-left crim-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">罪犯信息</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul v-show="crimActive" class="col-xs-24 subItem">
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/crimadd">新增罪犯</router-link>
                    </li>
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/crimsearch">罪犯查询</router-link>
                    </li>
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/crimchange/prison">罪犯转监</router-link>
                    </li>
                    <li>
                        <router-link class="col-xs-24 pull-left" to="/crimexamine/prison">罪犯转监审核</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-xs-24">
                <a href="#" class="col-xs-24" :class="{'sys-active':sysActive}" @click="sysClick">
                    <div class="col-xs-6">
                        <b class="pull-left sys-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">系统管理</span>
                    </div>
                    <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div>
                </a>
                <ul v-show="sysActive" class="col-xs-24 subItem">
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">新增菜单</a> -->
                        <router-link class="col-xs-24 pull-left" to="/menu_add">新增菜单</router-link>
                    </li>
                    <li>
                        <!-- <a class="active col-xs-24 pull-left" href="#">菜单管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/menu_management">菜单管理</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">新增角色</a> -->
                        <router-link class="col-xs-24 pull-left" to="/role_add">新增角色</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">角色管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/role_management">角色管理</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">新增用户</a> -->
                        <router-link class="col-xs-24 pull-left" to="/user_add">新增用户</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">用户管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/user_management">用户管理</router-link>
                    </li>
                    <li>
                        <!-- <a class="col-xs-24 pull-left" href="#">商户管理</a> -->
                        <router-link class="col-xs-24 pull-left" to="/trader_management">商户管理</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-xs-24">
                <a href="/consumption" class="col-xs-24" :class="{'consumption-active':consumptionActive}" @click="consumptionClick">
                    <div class="col-xs-6">
                        <b class="pull-left consumption-icon"></b>
                    </div>
                    <div class="col-xs-12">
                        <span class="pull-left">消费管理</span>
                    </div>
                    <!-- <div class="col-xs-6">
                        <i class="pull-left"></i>
                    </div> -->
                </a>
            </div>
        </div>
</template>
<script>
    export default{
        data(){
            return{
                icActive:false,
                sysActive:false,
                crimActive:false,
                fundActive:false,
                crimFundActive:false,
                consumptionActive:false
            }
        },
        methods:{
            itemActive(){
                $('.subItem').on('click','a',function(){
                    $(this).addClass('active');
                    $(this).parent().siblings('a').removeClass('active');
                })
            },
            preventDefault(){
                $('a').on('click',function(e){
                    e.preventDefault();
                })
            },
            icClick(){
                if(this.icActive == false){
                    this.icActive = true;
                }else{
                    this.icActive = false;
                }
            },
            sysClick(){
                if(this.sysActive == false){
                    this.sysActive = true;
                }else{
                    this.sysActive = false;
                }
            },
            crimClick(){
                if(this.crimActive == false){
                    this.crimActive = true;
                }else{
                    this.crimActive = false;
                }
            },
            fundClick(){
                if(this.fundActive == false){
                    this.fundActive = true;
                }else{
                    this.fundActive = false;
                }
            },
            crimFundClick(){
                if(this.crimFundActive == false){
                    this.crimFundActive = true;
                }else{
                    this.crimFundActive = false;
                }
            },
            consumptionClick(){
                if(this.consumptionActive == false){
                    this.consumptionActive = true;
                }else{
                    this.consumptionActive = false;
                }
            }
        },
        mounted(){
            this.itemActive();
            this.preventDefault();
        }
    }
</script>
