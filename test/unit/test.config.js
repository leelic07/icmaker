import Vue from 'vue'
import axios from 'axios'
import Filters from '@/filters'
import Validate from '@/../static/js/validate.js'
import VueRouter from 'vue-router'
import sinon from 'sinon'
import sinonStubPromise from 'sinon-stub-promise'
import '@/../static/js/bootstrap.min.js'
//import '@/../static/js/jquery.pagination.min.js'

sinonStubPromise(sinon)
//声明过滤器
Object.keys(Filters).forEach((key)=>Vue.filter(key,Filters[key]));

//控件，参数验证
Object.keys(Validate).forEach((key)=>{
  Vue.prototype[key] = Validate[key];
});

//ajax请求
Vue.prototype.$http = axios;

//ajax请求拦截器
axios.interceptors.request.use(function(config){
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

//ajax url头部设置

 axios.defaults.baseURL='http://106.14.18.98:8080//icmaker/';





