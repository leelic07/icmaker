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

  it('accountType改变 select变化',done=> {
    const vm = new Vue(TransferApplication).$mount()
    vm.accountType = 0
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountType = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select')
      let accountTypeOption = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select option:nth-child(2)')
      expect(accountType.value).to.equal('0')
      expect(accountTypeOption.getAttribute('value')).to.equal('0')
      expect(accountTypeOption.textContent).to.equal('财务账户')
      done()
    })
  });

  it('accountName改变 input变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.accountName = '星城监狱总账户'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) input')
      expect(accountName.value).to.equal('星城监狱总账户')
      done()
    })
  });

  it('prisonAccountDtos改变 table变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.prisonAccountDtos = [{
      prisonAccountId:1,
      prisonName:'星城监狱',
      accountName:'星城监狱总账户',
      accountType:2,
      total:100000
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
      let accountName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
      let accountType = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
      let total = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')

      expect(vm.prisonAccountDtos).to.have.lengthOf(1)
      expect(prisonName.textContent).to.equal('星城监狱')
      expect(accountName.textContent).to.equal('星城监狱总账户')
      expect(accountType.textContent).to.equal('监狱总账户')
      expect(total.textContent).to.equal('1000')
      done()
    })
  });

  it('money可转账金额改变 span变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.money = 10000
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let money = vm.$el.querySelector('.bind-info-list>li:nth-child(1)>span:nth-child(2)')
      expect(money.textContent).to.equal('100')
      done()
    })
  });

  it('bankId,banks改变 select option变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.bankId = 1
    vm.banks = [{
      id:1,
      bankName:'建设银行'
    },{
      id:2,
      bankName:'平安银行'
    },{
      id:3,
      bankName:'招商银行'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let bankId = vm.$el.querySelector('.bind-info-list>li:nth-child(2) select')
      let construction = vm.$el.querySelector('.bind-info-list>li:nth-child(2) select option:nth-child(2)')
      let safety = vm.$el.querySelector('.bind-info-list>li:nth-child(2) select option:nth-child(3)')
      let business = vm.$el.querySelector('.bind-info-list>li:nth-child(2) select option:nth-child(4)')

      expect(bankId.value).to.equal('1')
      expect(construction.textContent).to.equal('建设银行')
      expect(construction.getAttribute('value')).to.equal('1')
      expect(safety.textContent).to.equal('平安银行')
      expect(safety.getAttribute('value')).to.equal('2')
      expect(business.textContent).to.equal('招商银行')
      expect(business.getAttribute('value')).to.equal('3')
      done()
    })
  });

  it('bankAccountId,prisonBankAccountDtos改变 select option变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.bankShow = true
    vm.bankId = 1
    vm.bankAccountId = 1
    vm.prisonBankAccountDtosTem = [{
      bankId:1,
      bankAccountId:1,
      bankAccountName:'李国栋'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let bankAccountId = vm.$el.querySelector('.bind-info-list>li:nth-child(3) select:nth-child(1)')
      let bankAccount = vm.$el.querySelector('.bind-info-list>li:nth-child(3) select option:nth-child(2)')
      expect(bankAccountId.value).to.equal('1')
      expect(bankAccount.textContent).to.equal('李国栋')
      expect(bankAccount.getAttribute('value')).to.equal('1')
      done()
    })
  });

  it('toPrisonAccountId,prisonAccount改变 select option变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.bankShow = false
    vm.toPrisonAccountId = 1
    vm.prisonAccounts = [{
      id:1,
      accountName:'星城沃尔超市'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let toPrisonAccountId = vm.$el.querySelector('.bind-info-list>li:nth-child(3) select')
      let prisonAccount = vm.$el.querySelector('.bind-info-list>li:nth-child(3) select option:nth-child(2)')
      expect(toPrisonAccountId.value).to.equal('1')
      expect(prisonAccount.textContent).to.equal('星城沃尔超市')
      expect(prisonAccount.getAttribute('value')).to.equal('1')
      done()
    })
  });

  it('transferMoney改变 input变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.transferMoney = 20
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let transferMoney = vm.$el.querySelector('.modal-body>div:nth-child(3)>input:nth-child(1)')
      expect(transferMoney.value).to.equal('20')
      done()
    })
  });

  it('remark改变 input变化',done => {
    const vm = new Vue(TransferApplication).$mount()
    vm.remark = '转账给星城沃尔超市'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let remark = vm.$el.querySelector('.modal-body>div:nth-child(3)>input:nth-child(2)')
      expect(remark.value).to.equal('转账给星城沃尔超市')
      done()
    })
  });


});
