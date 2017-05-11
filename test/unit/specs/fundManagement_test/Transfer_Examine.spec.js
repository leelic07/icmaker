import Vue from 'vue'
import TransferExamine from '@/components/fundManagement/Transfer_Examine'

//Transfer_Examine.vue 属性测试
describe('Transfer_Examine.vue 属性测试',() => {
  it('账户名称',() => {
    const Constructor = Vue.extend(TransferExamine)
    const vm = new Constructor().$mount()
    expect(vm.accountName).to.equal('')
  });

  it('账户类型',() => {
    const Constructor  = Vue.extend(TransferExamine)
    const vm = new Constructor().$mount()
    expect(vm.accountType).to.equal('')
  });

  it('类型',() => {
    const Constructor = Vue.extend(TransferExamine)
    const vm = new Constructor().$mount()
    expect(vm.type).to.equal('')
  });

  it('监狱列表',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.prisonList.toString()).to.equal([].toString())
  });

  it('监狱id',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('监狱名称',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.prisonName).to.equal('')
  });

  it('监狱资金转账明细列表',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.prisonCapitalTransfers.toString()).to.equal([].toString())
  });

  it('选中的监狱账户id',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.ids.toString()).to.equal([].toString())
  });

  it('备注',() => {
    const vm = new Vue(TransferExamine).$mount()
    expect(vm.remark).to.equal('')
  });

});

//Transfer_Examine.vue  异步更新DOM测试
describe('Transfer_Examine.vue 异步更新DOM测试',() => {
  it('accountType改变 select变化',done => {
    const vm = new Vue(TransferExamine).$mount()
    vm.accountType = 0
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountType = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) select')
      let accountTypeOption = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) select option:nth-child(2)')
      expect(accountType.value).to.equal('0')
      expect(accountTypeOption.textContent).to.equal('财务账户')
      expect(accountTypeOption.getAttribute('value')).to.equal('0')
      done()
    })
  });

  it('accountName改变 input变化',done => {
    const vm = new Vue(TransferExamine).$mount()
    vm.accountName = '星城监狱总账户'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) input')
      expect(accountName.value).to.equal('星城监狱总账户')
      done()
    })
  });

  it('type改变 select变化',done => {
    const vm = new Vue(TransferExamine).$mount()
    vm.type = 4
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let type = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select')
      let typeOption = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select>option:nth-child(2)')
      expect(type.value).to.equal('4')
      expect(typeOption.textContent).to.equal('内部转账')
      expect(typeOption.getAttribute('value')).to.equal('4')
      done()
    })
  });
});
