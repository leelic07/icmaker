import Vue from 'vue'
import TransferApplication from '@/components/fundManagement/Transfer_Application'

//Transfer_Application.vue 属性测试
describe('Transfer_Application.vue 属性测试', () => {
  it('监狱账户列表', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonAccountDtos.toString()).to.equal([].toString())
  });

  it('账户类型', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.accountType).to.equal('')
  });

  it('账户名称', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.accountName).to.equal('')
  });

  it('银行数组', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.banks.toString()).to.equal([].toString())
  });

  it('监狱银行账户列表', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonBankAccountDtos.toString()).to.equal([].toString())
  });

  it('监狱银行账户临时列表', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonBankAccountDtosTem.toString()).to.equal([].toString())
  });

  it('银行id', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.bankId).to.equal('')
  });

  it('银行账户id', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.bankAccountId).to.equal('')
  });

  it('对方监狱账户id', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.toPrisonAccountId).to.equal('')
  });

  it('账户余额', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.money).to.equal('')
  });

  it('监狱账户列表', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonAccounts.toString()).to.equal([].toString())
  });

  it('显示银行下拉菜单参数', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.bankShow).to.equal(true)
  });

  it('类型', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.type).to.equal('')
  });

  it('转账金额', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.transferMoney).to.equal('')
  });

  it('备注', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.remark).to.equal('')
  });

  it('监狱id', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('监狱名称', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonName).to.equal('')
  });

  it('监狱列表', () => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    expect(vm.prisonList.toString()).to.equal([].toString())
  });
});

//Transfer_Application.vue 异步更新DOM测试
describe('Transfer_Application.vue 异步更新DOM测试', () => {
  it('prisonList改变 datalist的变化', done => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    vm.prisonList = [{
      prisonName: '长沙监狱'
    },
      {
        prisonName: '株洲监狱'
      }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('datalist option:nth-child(1)')
      expect(prisonName.textContent).to.equal('长沙监狱')
      done()
    });
  });

  it('prisonList改变 input的变化', done => {
    const Constructor = Vue.extend(TransferApplication)
    const vm = new Constructor().$mount()
    vm.prisonList = [{
      prisonName: '长沙监狱'
    }]
    vm.prisonName = vm.prisonList[0].prisonName
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('[disabled]')
      expect(prisonName.value).to.equal('长沙监狱')
      done()
    });
  });

  
});
