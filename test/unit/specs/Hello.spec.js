import Vue from 'vue'
import Hello from '@/components/Hello'
// import App from '../../../src/App.vue'
import App from '@/App.vue'

//Hello.vue
describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})

//App.vue
// describe('App.vue', () => {
//   it('组件加载后，isNotLogin应该是false', () => {
//     const Constructor = Vue.extend(App)
//     const vm = new Constructor().$mount()
//     expect(vm.$el.isNotLogin).to.equal(false)
//   })
// })