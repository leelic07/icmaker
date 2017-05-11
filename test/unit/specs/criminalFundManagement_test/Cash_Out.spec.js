/**
 * Created by Administrator on 2017/5/8 0008.
 */
import Vue from 'vue'
import CashOut from '@/components/criminalFundManagement/Cash_Out'
import Filters from '@/filters'

//声明过滤器
Object.keys(Filters).forEach(key => {
  Vue.filter(key,Filters[key]);
});

//Cash_Out.vue 属性测试
describe('Cash_Out.vue 属性测试',() => {
  it('监狱id',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('罪犯id',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonerId).to.equal('')
  });

  it('监区id',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartmentId).to.equal('')
  });

  it('监狱名称',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonName).to.equal('')
  });

  it('监狱列表',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonList.toString()).to.equal([].toString())
  });

  it('监区列表',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartments.toString()).to.equal([].toString())
  });

  it('监区临时列表',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartmentsTem.toString()).to.equal([].toString())
  });

  it('取现列表',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.cashOutList.toString()).to.equal([].toString())
  });

  it('取现金额',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.cash).to.equal('')
  });

  it('可取现金额',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.total).to.equal('')
  });

  it('罪犯姓名',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.name).to.equal('')
  });

  it('档案号',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.archivesNumber).to.equal('')
  });

  it('id卡号',() => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    expect(vm.idCardNo).to.equal('')
  });

});

//Cash_Out.vue 异步更新DOM测试
describe('Cash_Out.vue 异步更新DOM测试',() => {
  it('prisonList改变 datalist的变化', done => {
    const Constructor = Vue.extend(CashOut)
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
    const Constructor = Vue.extend(CashOut)
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

  it('prisonDepartmentId改变 select变化',done => {
    const Constructor = Vue.extend(CashOut)
    const vm = new Constructor().$mount()
    vm.prisonDepartmentId = 1
    vm.prisonDepartmentsTem = [{
      prisonId:1,
      id:1,
      prisonDepartmentName:'一监区'
    }]
    //在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonDepartmentId = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select')
      expect(prisonDepartmentId.value).to.equal('1')
      done()
    })
  });

  it('prisonDepartmentsTem改变 select option变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.prisonName = '长沙监狱'
    vm.prisonList = [{
      id:1,
      prisonName:'长沙监狱'
    }]
    vm.prisonDepartments = [{
      prisonId:1,
      id:1,
      prisonDepartmentName:'一监区'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonDepartment = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select option:nth-child(2)')
      expect(prisonDepartment.textContent).to.equal('一监区')
      expect(prisonDepartment.getAttribute('value')).to.equal('1')
      done()
    })
  });

  it('name改变 input变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.name = '张三'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let name = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(1) input')
      expect(name.value).to.equal('张三')
      done()
    })
  });

  it('archivesNumber改变 input变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.archivesNumber = '04352002206'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let archivesNumber = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(2) input')
      expect(archivesNumber.value).to.equal('04352002206')
      done()
    })
  });

  it('idCardNo改变 input变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.idCardNo = '02458619'
    Vue.nextTick(() => {
      let idCardNo = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(3) input')
      expect(idCardNo.value).to.equal('02458619')
      done()
    })
  });

  it('cashOutList改变 table变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.cashOutList = [{
      prison_id:1,
      prison_name:'长沙监狱',
      prison_department_name:'一监区',
      archives_number:'04352002206',
      name:'张三',
      virtual_account_no:'10071509945001888840003',
      total:2000
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
      let prisonDepartmentName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
      let archivesNumber = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
      let name = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')
      let virtualAccountNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(6)')
      let total = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(7)')

      expect(vm.cashOutList).to.have.lengthOf(1)
      expect(prisonName.textContent).to.equal('长沙监狱')
      expect(prisonDepartmentName.textContent).to.equal('一监区')
      expect(archivesNumber.textContent).to.equal('04352002206')
      expect(name.textContent).to.equal('张三')
      expect(virtualAccountNo.textContent).to.equal('10071509945001888840003')
      expect(total.textContent).to.equal('20')
      done()
    })
  });

  it('cash改变 input变化',done => {
    const vm = new Vue(CashOut).$mount()
    vm.cash = 10
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let cash = vm.$el.querySelector('.modal-body>div:nth-child(2) input')
      expect(cash.value).to.equal('10')
      done()
    })
  });
});
