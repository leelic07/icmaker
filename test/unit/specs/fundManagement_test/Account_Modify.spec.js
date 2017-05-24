import Vue from 'vue'
import AccountModify from '@/components/fundManagement/Account_Modify'

//属性测试
describe('Account_Modify.vue 属性测试', () => {
  // AccountModify.$route.params = {
  // 	prisonAccountId:'1',
  // 	accountName:'长沙监狱财务',
  // 	accountType:'0',
  // 	prisonId:'1',
  // 	prisonDepartmentId:'0'
  // }


  it('所有监狱列表', () => {
    expect(typeof AccountModify.data).to.equal('function')
    const defaultData = AccountModify.data()
    expect(defaultData.prisonList.toString()).to.equal([].toString())
  });

  it('所有监区数组', () => {
    expect(typeof AccountModify.data).to.equal('function')
    const defaultData = AccountModify.data()
    expect(defaultData.prisonDepartments.toString()).to.equal([].toString())
  });

  it('监狱名称', () => {
    expect(typeof AccountModify.data).to.equal('function')
    const defaultData = AccountModify.data()
    expect(defaultData.prisonName).to.equal('')
  });

  it('监狱账户id', () => {
    const Constructor = Vue.extend(AccountModify)
    const vm = new Constructor().$mount()
    // vm.$route.params.prisonAccountId = 1
    expect(vm.prisonAccountId).to.equal('')
  });

  it('账户类型', () => {
    const Constructor = Vue.extend(AccountModify)
    const vm = new Constructor().$mount()
    expect(vm.accountType).to.equal('')
  });

  it('账户名称', () => {
    const Constructor = Vue.extend(AccountModify)
    const vm = new Constructor().$mount()
    expect(vm.accountName).to.equal('')
  });

  it('监狱id', () => {
    const Constructor = Vue.extend(AccountModify)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('监区id', () => {
    const Constructor = Vue.extend(AccountModify)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartmentId).to.equal('')
  });
});

//异步更新DOM
describe('Account_Modify.vue 异步更新DOM', () => {
  it('accountName改变 input变化', done => {
    // const Constructor = Vue.extend(AccountModify)
    const vm = new Vue(AccountModify).$mount()
    vm.accountName = '长沙监狱财务'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1) input')
      expect(accountName.value).to.equal('长沙监狱财务')
      done()
    });
  });

  it('prisonList改变 datalist的变化', done => {
    // const Constructor = Vue.extend(AccountModify)
    const vm = new Vue(AccountModify).$mount()
    vm.prisonList = [{
      prisonName: '长沙监狱'
    },
      {
        prisonName: '株洲监狱'
      }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('datalist option:nth-child(1)')
      expect(prisonName.textContent).to.equal('长沙监狱');
      done()
    });
  });
});


