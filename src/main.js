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

const router = new VueRouter({
	routes
});

new Vue({
	router,
  	el: '#app',
  	render: h => h(App)
})
