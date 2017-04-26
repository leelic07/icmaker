const photoLoadingComponent = require('./PhotoLoading.vue')
const photoLoading = {
  install: function(Vue) {
    Vue.component('photoLoading',photoLoadingComponent);
  }
}
module.exports = photoLoading

