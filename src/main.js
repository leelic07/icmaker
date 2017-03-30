import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.config.js'
import store from './store'
import axios from 'axios'
import Loading from './components/loading'
import $ from 'jquery'
import Filters from './filters'
import '../static/js/bootstrap.min.js'
import '../static/css/datepicker/bootstrap-datetimepicker.min.js'
import '../static/css/datepicker/bootstrap-datetimepicker.zh-CN.js'
import '../static/js/util.js'

Object.keys(Filters).forEach((key)=>Vue.filter(key,Filters[key]));
Vue.use(VueRouter);
Vue.use(Loading);
Vue.prototype.$http = axios;

//ajax请求拦截器
axios.interceptors.request.use(function(config){
	store.dispatch('showLoading');
	console.log(config);
        // config.headers.Authorization = `token ${store.state.mutations.token}`;
        if(config.method == 'get'){
          if(config.params){
            config.params.userId = window.localStorage.getItem('userId');
          }else{
            config.url += '?userId=' + window.localStorage.getItem('userId');
          }  
        }	
        if(config.method == 'post' && config.url != config.baseURL+'login'){
        	config.data += '&userId=' + window.localStorage.getItem('userId');
        }
	return config;
},function(err){
	return Promise.reject(err);
});

//ajax响应拦截器
axios.interceptors.response.use(function(response){
	store.dispatch('hideLoading');
	return response;
},function(err){
  	return Promise.reject(err);
});

//ajax url头部设置
axios.defaults.baseURL='http://10.10.10.103:8080/icmaker/';

//设置路由
const router = new VueRouter({
	routes
});

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
});




