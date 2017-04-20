const LoginLoadingComponent = require('./LoginLoading.vue')
const loginLoading = {
  install: function(Vue) {
    Vue.component('loginLoading', LoginLoadingComponent);
  }
}
module.exports = loginLoading;

