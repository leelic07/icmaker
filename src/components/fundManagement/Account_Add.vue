<template>
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">账户名称 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">所属监狱 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control">
                                    <option>女子监狱</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">所属监区 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control">
                                    <option>一监区</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label class="pull-right" for="name">账户类型 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control">
                                    <option>全部</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认添加" class="search-button">
                            </div>
                        </div>
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
        mounted(){
            $('#table_id_example').tableHover();
        }
	}
</script>

<style lang="less" scoped>
#right-side{
	position:fixed;
	bottom:0;
	right:0;
	top:0;
	background-color:#f5f5f5;

	.select-box{
        padding:10px;
    }

    .text-box{
        padding:10px;
    }

    .label-box{
        padding:16px 0 10px 0;
    }

    .search-inner-box{
        background-color:#fff;
    }

    label{
        font-weight:normal;
        color:#696969;
    }
}
</style>