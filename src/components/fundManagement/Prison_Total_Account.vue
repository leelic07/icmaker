<template>
    <!-- 右侧内容-->
    <div id="right-side" class="col-xs-20 pull-right">
        <!--监狱资金总收入，总支出-->
        <div class='row'>
            <div class='prison-total col-xs-23' v-if = "countTotal != ''">
                <ul>
                    <li class='pull-left text-green'>所有监狱总金额 <span
                        class='text-red'>{{countTotal | currency}}元</span></li>
                    </li>
                </ul>
            </div>
        </div>

        <!--表格部分-->
        <div class="col-xs-24 account-table-box">
            <div class="col-xs-23" style = "margin-bottom: 10px;" v-for = "account in prisonAccountInfo">
                <table class="display table ic-table table-bordered">
                    <thead>
                        <tr>
                            <th colspan = "2">{{account.prisonName}}总余额 <span class='text-red'>{{account.prisonTotal | currency}}<em class="text-small">元</em></span></th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan = "2">监狱罪犯总余额: <span class='text-red'>{{account.prisonerTotal | currency}}元</span></td>
                        </tr>  
                        <tr>
                            <td :rowspan = "account.data.length + 1" width = "300">监狱账户总余额: <span class='text-red'>{{account.prisonAccountTotal | currency}}元</span></td>
                        </tr>   
                        <tr v-for = "data in account.data">
                            <td>{{data.accountName}}余额: <span class='text-red'>{{data.total | currency}}元</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class = "form" v-if = "countTotal != ''">
            <div></div>
            <!-- 表单底部-->
            <Page :itemSize = "accountSize" :pageSize = "pageSize" :indexPage = "indexPage" v-on:search='getAccountInfo'></Page>
        </div>
         
        <Remind v-if = "remindShow" :status='remind.status' :msg='remind.msg'></Remind>
    </div>
</template>

<script>
    import Page from '../Paginator.vue'
    import Remind from '../Remind.vue'
    import store from '../../store'

    export default {
        data(){
            return {
                indexPage: 1,
                pageSize: 3,
                countTotal: '',
                accountSize: '',
                prisonAccountInfo: ''
            }
        },
        computed: {
            remindShow: {
                get(){
                    return store.getters.remindShow;
                }
            }
         },
        methods: {
            getAccountInfo (index) {
                this.indexPage = index;
                this.$http({
                    method: 'get',
                    url: 'prisonAccount/getPrisonAccountTotals',
                    params: {
                        indexPage: this.indexPage,
                        pageSize: this.pageSize,
                    }
                }).then(res => {
                    let data = res.data.data;
                    console.log(data);
                    this.countTotal = data.countTotal;
                    this.prisonAccountInfo = data.prisonAccountListDtos;
                    this.accountSize = data.prisonAccountListDtoSize;
                    
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        components: {
            Page,
            Remind
        },
        mounted(){
            $('.table').tableHover();
            this.getAccountInfo (this.indexPage);
        }
    }
</script>
<style type="text/less" lang="less" scoped>
    #right-side {
        min-height: 100%;

        .row:nth-child(1){
            margin: 100px 0 20px 30px;
        }
        
        .account-table-box {
            .table {
                background: #fff;
                margin-left: 30px;
                color: #666;
                th {
                    font-size: 16px;
                }
                td {
                    vertical-align: middle;
                }
            }
        }

        .form-footer {
            margin-left: 30px;
            background: #f2f7f7;
        }

        .prison-total {
            font-size: 16px;
        }
        .text-small {
            font-size: 14px;
        }

        .text-red {
            color: #E96900;
        }

        .text-green {
            color: #36A5B0;
        }
    }
</style>