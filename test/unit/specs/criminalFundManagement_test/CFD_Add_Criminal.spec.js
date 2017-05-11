/**
 * Created by Administrator on 2017/5/10/010.
 */
import Vue from 'vue'
import CFDAddCriminal from '@/components/criminalFundManagement/CFD_Add_Criminal'
import Filters from '@/filters'

//声明过滤器
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
})

//CFD_Add_Criminal.vue 属性测试
describe('CFD_Add_Criminal.vue 属性测试',() => {
  it('监区id',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartmentId).to.equal('')
  });

  it('姓名',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.name).to.equal('')
  });

  it('档案号',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.archivesNumber).to.equal('')
  });

  it('监区列表',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisonDepartments.toString()).to.equal([].toString())
  });

  it('罪犯列表',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisoners.toString()).to.equal([].toString())
  });

  it('罪犯资金分配id',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisonCapitalAssignId).to.equal('')
  });

  it('罪犯id',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('类型',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.type).to.equal('')
  });

  it('总金额',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.totalMoney).to.equal('')
  });

  it('罪犯id数组字符串',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.ids).to.equal('')
  });

  it('被选中罪犯的数组序号',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.prisonerIndex.toString()).to.equal([].toString())
  });

  it('选中添加罪犯列表',() => {
    const Constructor = Vue.extend(CFDAddCriminal)
    const vm = new Constructor().$mount()
    expect(vm.addPrisoners.toString()).to.equal([].toString())
  });
});

//CFD_Add_Criminal.vue 异步更新DOM测试
describe('CFD_Add_Criminal.vue 异步更新DOM测试',() => {
  it('prisonDepartmentId,prisonDepartments改变 select option变化', done => {
    const vm = new Vue(CFDAddCriminal).$mount()
    vm.prisonDepartmentId = 1
    vm.prisonDepartments = [{
      id:1,
      prisonDepartmentName:'一监区'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonDepartmentId = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) select')
      let id = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) select>option:nth-child(2)')
      expect(vm.prisonDepartments).to.have.lengthOf(1)
      expect(prisonDepartmentId.value).to.equal('1')
      expect(id.textContent).to.equal('一监区')
      expect(id.getAttribute('value')).to.equal('1')
      done()
    })
  });

  it('name改变 input变化',done => {
    const vm = new Vue(CFDAddCriminal).$mount()
    vm.name = '曾志新'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let name = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) input')
      expect(name.value).to.equal('曾志新')
      done()
    })
  });

  it('archivesNumber改变 input变化',done => {
    const vm = new Vue(CFDAddCriminal).$mount()
    vm.archivesNumber = '4352002107'
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let archivesNumber = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) input')
      expect(archivesNumber.value).to.equal('4352002107')
      done()
    })
  });

  it('prisoners改变 table变化',done => {
    const vm = new Vue(CFDAddCriminal).$mount()
    vm.prisoners = [{
      prisonerId:1,
      name:'曾志新',
      archivesNumber:'4352002107',
      prisonName:'长沙监狱',
      prisonDepartmentName:'收押中心'
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonerId = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(1)>div')
      let name = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
      let archivesNumber = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
      let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
      let prisonDepartmentName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')
      expect(vm.prisoners).to.have.lengthOf(1)
      expect(prisonerId.getAttribute('id')).to.equal('1')
      expect(prisonerId.getAttribute('index')).to.equal('0')
      expect(name.textContent).to.equal('曾志新')
      expect(archivesNumber.textContent).to.equal('4352002107')
      expect(prisonName.textContent).to.equal('长沙监狱')
      expect(prisonDepartmentName.textContent).to.equal('收押中心')
      done()
    })
  });

  it('addPrisoners改变 table变化',done => {
    const vm = new Vue(CFDAddCriminal).$mount()
    vm.addPrisoners = [{
      prisonerId:1,
      name:'曾志新',
      archivesNumber:'4352002107',
      prisonName:'长沙监狱',
      prisonDepartmentName:'收押中心',
      money:100
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonerId = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(1)')
      let name = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(2)')
      let archivesNumber = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(3)')
      let prisonName = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(4)')
      let prisonDepartmentName = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(5)')
      let money = vm.$el.querySelector('#table_id_example1 tbody tr td:nth-child(6) input')

      expect(vm.addPrisoners).to.have.lengthOf(1)
      expect(prisonerId.getAttribute('id')).to.equal('1')
      expect(name.textContent).to.equal('曾志新')
      expect(archivesNumber.textContent).to.equal('4352002107')
      expect(prisonName.textContent).to.equal('长沙监狱')
      expect(prisonDepartmentName.textContent).to.equal('收押中心')
      expect(money.value).to.equal('100')
      done()
    })
  });

});
