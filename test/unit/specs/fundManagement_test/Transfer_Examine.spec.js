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


describe('accountType改变 select变化',() => {
  it('');
});
