<template>
	<div class="col-xs-23 form-footer">
		<p class="pull-left">共有{{itemSize}}条信息</p>
		<div id="page" class="pull-right M-box2"></div>
	</div>
</template>

<script>
import '../../static/js/jquery.pagination.min.js'
	export default{
		props: ['itemSize','pageSize','indexPage'],//itemSize:总条数  pageSize:每页显示的条数
		data(){
			return{
				
			}
		},
		watch:{
			'itemSize':function () {
				this.pageInit(this);
			}
		},
		methods:{
			pageInit(_this){
				$('.M-box2').html(' ');
				if (this.itemSize/this.pageSize > 1) {
					$('.M-box2').pagination({
						coping: true,
						homePage: '首页',
						endPage: '末页',
						prevContent: '上一页',
						nextContent: '下一页',
						count: 5,
						totalData: this.itemSize,
						showData: this.pageSize,
						current: this.indexPage,
						callback: function (api){
							//获取点击时的当前页码再重新加载当前页的数据
							let now = api.getCurrent();
							_this.$emit("search",now);
						}
					});
				}
			}
		},
		mounted(){
			this.pageInit(this);
		}
	}
</script>

<style>
	@import '../../static/css/jqueryPage/pagination.css';
	.form-footer {
		height: 50px;
	}
</style>