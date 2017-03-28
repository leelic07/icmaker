<template>
	<div class="col-xs-23 form-footer">
		<p class="pull-left">共有{{itemSize}}条信息</p>
		<div id="page" class="col-xs-18 pull-right"></div>
	</div>
</template>

<script>
import '../../static/js/jquery.page.js'
	export default{
		props: ['itemSize','pageSize'],
		data(){
			return{
				
			}
		},
		methods:{
			pageInit(totalPage,_this){		
				$("#page").Page({
	                totalPages: totalPage,//分页总数
	                liNums: 7,//分页的数字按钮数(建议取奇数)
	                activeClass: 'activP', //active 类样式定义
	                callBack : function(page){  
	                	 console.log(page); 
						 _this.$emit("searchMenu");
	                }
            	});
			}
		},
		mounted(){
			let totalPage = Math.ceil(this.itemSize/this.pageSize);
			console.log(totalPage);
			console.log(this);
			//if (totalPage > 0) {
				this.pageInit(totalPage,this);
			//}
			
		}
	}
</script>

<style>
	@import '../../static/css/jqueryPage/jquery.page.css';
</style>