<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label for="name">角色名称 :</label>
                            </div>
                            <div class="col-xs-5 text-box">
                                <input type="text" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 添加角色-->
            <div id="addRole" class="col-xs-24 add">
                <div class="col-xs-23">
                    <div class="pull-left">
                        <div class="col-xs-20 col-xs-push-2">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">IC卡管理权限</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">申请IC卡</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">销卡</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">虚拟账号管理</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">发卡</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">IC卡审核</span>
                                <div class="info-check pull-right"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                    <div class="pull-right">
                        <div class="col-xs-20 col-xs-push-2">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">监狱资金管理权限</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增账户</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">账户管理</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">转账申请</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">转账审核</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">资金明细</span>
                                <div class="info-check pull-right"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                </div>
                <div class="col-xs-23">
                    <div class="pull-left">
                        <div class="col-xs-20 col-xs-push-2">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">罪犯资金管理权限</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">个人罪犯消费限制</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">监狱罪犯消费限制</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">监区罪犯消费限制</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">罪犯资金分配</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">罪犯资金明细查询</span>
                                <div class="info-check pull-right"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                    <div class="pull-right">
                        <div class="col-xs-20 col-xs-push-2">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">犯罪信息权限</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增犯罪</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">罪犯管理</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">罪犯转监申请</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">罪犯转监审核</span>
                                <div class="info-check pull-right"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                </div>
                <div class="col-xs-23">
                    <div class="pull-left">
                        <div class="col-xs-20 col-xs-push-2">
                            <label class="col-xs-24" for="first">
                                <b class="pull-left">系统管理权限</b>
                                <div class="info-check pull-right"></div>
                                <span class="pull-right">全选</span>
                            </label>
                            <div class="col-xs-24"></div>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增菜单</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">菜单管理</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增角色</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">角色管理</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增用户</span>
                                <div class="info-check pull-right"></div>
                            </label>
                            <label class="col-xs-24" for="first">
                                <span class="pull-left">新增用户</span>
                                <div class="info-check pull-right"></div>
                            </label>
                        </div>
                        <div class="right-top-icon"></div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods:{

		},
        mounted(){
            $('#addRole').selectRole();
        }
	}
</script>

<style lang="less" scoped>
#right-side{
    .text-box{
        padding:20px 0;
    }
    .label-box{
        padding:25px 0 0 0;
        text-align:center;
    }
    .search-inner-box{
        background-color:#fff;
    }

    .label-box label{
        font-weight:normal;
    }
}
</style>