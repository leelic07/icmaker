import Vue from 'vue'
import axios from 'axios'
import sinon from 'sinon'
import AccountManagement from '@/components/fundManagement/Account_Management'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)
//属性测试
describe('AccountManagement.vue 属性测试', () => {
  it('所有监狱账户列表', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonAccountDtos).to.equal('')
  });

  it('所有监狱列表', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonList.toString()).to.equal([].toString())
  });

  it('监狱id', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('监狱名称', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonName).to.equal('')
  });

  it('监区数组', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartments.toString()).to.equal([].toString())
  });

  it('监区id', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartmentId).to.equal('')
  });

  it('账户类型', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.accountType).to.equal('')
  });

  it('账户名称', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.accountName).to.equal('')
  });

  it('监狱账户总余额', () => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    expect(vm.prisonAccountsTotal).to.equal('')
  });
});

//异步更新DOM
describe('Account_Management.vue 异步更新DOM', () => {
  it('prisonList改变 datalist的变化', done => {
    const Constructor = Vue.extend(AccountManagement)
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
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    vm.prisonList = [{
      prisonName: '长沙监狱'
    }]
    vm.prisonName = vm.prisonList[0].prisonName
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('[disabled]')
      expect(prisonName.value).to.equal('长沙监狱');
      done()
    });
  });

  it('prisonDepartments改变 select的变化', done => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    vm.prisonDepartments = [{
      prisonDepartmentName: '收押中心',
      prisonId: 1,
      id: 0
    },
      {
        prisonDepartmentName: '一监区',
        prisonId: 1,
        id: 1
      }]
    vm.prisonDepartmentId = vm.prisonDepartments[0].id
    vm.prisonId = vm.prisonDepartments[0].prisonId
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonDepartmentName = vm.$el.querySelector('.search-inner-box >div:nth-child(1) >div:nth-child(2) select option:nth-child(3)')
      expect(prisonDepartmentName.textContent).to.equal('一监区')
      expect(prisonDepartmentName.getAttribute('value')).to.equal('1')
      done()
    });
  });

  it('accountName改变 input的变化', done => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    vm.accountName = '长沙监狱财务'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let accountName = vm.$el.querySelector('.search-inner-box >div:nth-child(2) input')
      expect(accountName.value).to.equal('长沙监狱财务')
      done()
    });
  });

  it('prisonAccountDtos改变 table的变化', done => {
    const Constructor = Vue.extend(AccountManagement)
    const vm = new Constructor().$mount()
    vm.prisonAccountDtos = [{
      prisonName: '长沙监狱',
      prisonDepartmentName: '一监区',
      accountType: 0,
      accountName: '长沙监狱财务',
      virtualAccountNo: '10071509945001888870002',
      total: '201717',
      prisonAccountId: '1'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
      expect(prisonName.textContent).to.equal('长沙监狱')
      done()
    });
  });
});

//Account_Management.vue ajax单元测试
describe('Account_Management.vue ajax单元测试',() => {
  const vm = new Vue(AccountManagement).$mount()
  let promiseCall

  beforeEach(() => {
    promiseCall = sinon.stub(axios,'get').returnsPromise()
  })

  afterEach(() => {
    axios.get.restore()
  })

  it('数据层:prisonAccountDtos menuSize prisonAccountsTotal',done => {
    promiseCall.resolves({
      data:{
        data:{
          prisonAccountDtos:[{
            prisonName:'长沙监狱',
            prisonDepartmentName:'收押中心',
            accountType:2,
            accountName:'长沙监狱总账户',
            virtualAccountNo:'10071509945001888800001',
            total:100000
          }],
          prisonAccountDtoSize:1,
          prisonAccountsTotal:200000
        }
      }
    })
    vm.getPrisonAccountDtos()

    let prisonAccountDtos = vm.prisonAccountDtos[0]
    console.log(prisonAccountDtos)
    // expect(prisonAccountDtos).to.be.empty
    expect(prisonAccountDtos.prisonName).to.equal('长沙监狱')
    expect(prisonAccountDtos.prisonDepartmentName).to.equal('收押中心')
    expect(prisonAccountDtos.accountType).to.equal(2)
    expect(prisonAccountDtos.accountName).to.equal('长沙监狱总账户')
    expect(prisonAccountDtos.virtualAccountNo).to.equal('10071509945001888800001')
    expect(prisonAccountDtos.total).to.equal(100000)
    expect(vm.menuSize).to.equal(1)
    expect(vm.prisonAccountsTotal).to.equal(200000)
    done()
  });

  it('数据层：prisonList prisonDepartments属性正确', done => {
    promiseCall.resolves({
      data: {
        data: {
          prisons: [{
            id: 1,
            prisonName: '长沙监狱'
          }, {
            id: 5,
            prisonName: '星城监狱'
          }]
        },
        code: 0
      }
    })
    vm.getAllPrison()

    expect(vm.prisonList).to.have.lengthOf(2)
    expect(vm.prisonList[0].prisonName).to.be.equal('长沙监狱')
    expect(vm.prisonList[0].id).to.be.equal(1)
    expect(vm.prisonList[1].prisonName).to.be.equal('星城监狱')
    expect(vm.prisonList[1].id).to.be.equal(5)
    done()
  });

  it('数据层：prisonAccountDtos menuSize prisonAccountTotal',done => {
    promiseCall.resolves({
      data:{
        data:{
          prisonAccountDtos:[{
          prisonName:'星城监狱',
          prisonDepartmentName:'收押中心',
          accountType:2,
          accountName:'星城监狱总账户',
          virtualAccountNo:'10071509945001888801586',
          total:100000
          }],
          prisonAccountDtoSize:1,
          prisonAccountsTotal:200000
        }
      }
    })
    vm.searchAccount()

    let prisonAccountDtos = vm.prisonAccountDtos[0]
    // expect(prisonAccountDtos).to.be.empty
    expect(prisonAccountDtos.prisonName).to.equal('星城监狱')
    expect(prisonAccountDtos.prisonDepartmentName).to.equal('收押中心')
    expect(prisonAccountDtos.accountType).to.equal(2)
    expect(prisonAccountDtos.accountName).to.equal('星城监狱总账户')
    expect(prisonAccountDtos.virtualAccountNo).to.equal('10071509945001888801586')
    expect(prisonAccountDtos.total).to.equal(100000)
    expect(vm.menuSize).to.equal(1)
    expect(vm.prisonAccountsTotal).to.equal(200000)
    done()
  });


});
