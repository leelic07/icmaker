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
Object.keys(routes).forEach((key)=>routes[key].meta={
  requireAuth: true,
});

routes[0].meta = {requireAuth: false};

Vue.use(VueRouter);
Vue.use(Loading);
Vue.prototype.$http = axios;

//ajax请求拦截器
axios.interceptors.request.use(function(config){
	store.dispatch('showLoading');
	// console.log(config);
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
  // console.log(response);
	return response;
},function(err){
  	return Promise.reject(err);
});

//ajax url头部设置

//axios.defaults.baseURL='http://10.10.10.103:8080/icmaker/';

// axios.defaults.baseURL='http://10.10.10.130:8080/icmaker/';

//axios.defaults.baseURL='http://10.10.10.104:8080/icmaker/';

axios.defaults.baseURL='http://106.14.18.98:8080/icmaker/';

//设置路由
const router = new VueRouter({
	routes
});

//判断是否已经登录
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.getItem('userId')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});


new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
});




