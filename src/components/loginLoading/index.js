const LoadingComponent = require('./Loading.vue')
const loginLoading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
module.exports = loginLoading;

