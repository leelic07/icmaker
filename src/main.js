import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.config.js'
import store from './store'
import axios from 'axios'
import Loading from './components/loading'
import $ from 'jquery'
import '../static/js/bootstrap.min.js'
import '../static/css/datepicker/bootstrap-datetimepicker.min.js'
import '../static/css/datepicker/bootstrap-datetimepicker.zh-CN.js'
import '../static/js/util.js'


Vue.use(VueRouter);
Vue.use(Loading);
Vue.prototype.$http = axios;


axios.interceptors.request.use(function(config){
	store.dispatch('showLoading');
	return config;
},function(err){
	return Promise.reject(err);
});

axios.interceptors.response.use(function(response){
	store.dispatch('hideLoading');
	return response;
},function(err){
  	return Promise.reject(err);
});

axios.defaults.baseURL='http://10.10.10.104:8080/icmaker/'

const router = new VueRouter({
	routes
});

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
});

//日期中补零函数
let buling = value => {
	value = 1*value;
	if (value < 10){
		value = '0' + value;
	}
	return value;
};

//时间戳转日期格式过滤器
Vue.filter("formatDate",value =>{
	if (value == null) {
		return null;
	}else {
		let now=new Date(value);
		let year=now.getFullYear();     
	    let month=buling(now.getMonth()+1);     
	    let date=buling(now.getDate()); 
	    let hour=buling(now.getHours());
	    let minute=buling(now.getMinutes());
	    let second=buling(now.getSeconds());
	    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	}
});

//菜单列表是否启用过滤器
Vue.filter("formatIsEnable",value =>{
	let isEnable = "";
	switch(value)
	{
	case 0 :
		isEnable = "禁用";
		break;
	case 1 :
		isEnable = "启用";
		break;
	default :
		isEnable = "";
	}
	return isEnable;
});

//菜单类别过滤器
Vue.filter("formatMenuType",value =>{
	let menuType = "";
	switch(Number(value))
	{
	case 0 :
		menuType = "一级菜单";
		break;
	case 1 :
		menuType = "二级菜单";
		break;
	default :
		menuType = "";
	}
	return menuType;	
});

//账户类型过滤器
Vue.filter("formatUserType",value =>{
	let userType = "";
	switch(Number(value))
	{
	case 0 :
		userType = "平台";
		break;
	case 1 :
		userType = "监狱局";
		break;
	case 2 :
		userType = "监狱科室";
		break;
	case 3 :
		userType = "监狱商户";
		break;
	default :
		userType = "";
	}
	return userType;	
});

//在监状态过滤器
Vue.filter("formatStatus",value =>{
	let status = "";
	switch(Number(value))
	{
	case 0 :
		status = "离监";
		break;
	case 1 :
		status = "在监";
		break;
	default :
		status = "";
	}
	return status;	
});

//审核状态过滤器
Vue.filter("formatExamStatus",value =>{
	let status = "";
	switch(Number(value))
	{
	case 0 :
		status = "审核中";
		break;
	case 1 :
		status = "审核成功";
		break;
	case 2 :
		status = "审核失败";
		break;
	default :
		status = "";
	}
	return status;	
});

//申请状态过滤器
Vue.filter("formatEnabled",value =>{
	let status = "";
	switch(Number(value))
	{
	case 0 :
		status = "已申请";
		break;
	case 1 :
		status = "未申请";
		break;
	default :
		status = "";
	}
	return status;	
});