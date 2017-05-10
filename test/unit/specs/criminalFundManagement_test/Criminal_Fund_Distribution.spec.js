/**
 * Created by Administrator on 2017/5/10/010.
 */
import Vue from 'vue'
import CriminalFundDistribution from '@/components/criminalFundManagement/Criminal_Fund_Distribution'

//Criminal_Fund_Distribution.vue 属性测试
describe('Criminal_Fund_Distribution.vue 属性测试',() => {
  it('监狱id',() => {
    const Constructor  = Vue.extend(CriminalFundDistribution)
    const vm = new Constructor().$mount()
    expect(vm.prisonId).to.equal('')
  });

  it('监狱名称',() => {
    const Constructor = Vue.extend(CriminalFundDistribution)
    const vm = new Constructor().$mount()
    expect(vm.prisonName).to.equal('')
  });

  it('类型',() => {
    const Constructor = Vue.extend(CriminalFundDistribution)
    const vm = new Constructor().$mount()
    expect(vm.type).to.equal('')
  });

  it('监狱列表',() => {
    const Constructor = Vue.extend(CriminalFundDistribution)
    const vm = new Constructor().$mount()
    expect(vm.prisonList.toString()).to.equal([].toString())
  });

  it('罪犯资金分配列表',() => {
    const Constructor = Vue.extend(CriminalFundDistribution)
    const vm = new Constructor().$mount()
    expect(vm.criminalFundAllocationList.toString()).to.equal([].toString())
  });
});

//Criminal_Fund_Distribution.vue 异步更新DOM测试
describe('Criminal_Fund_Distribution.vue 异步更新DOM测试', () => {
  it('prisonList改变 datalist的变化', done => {
    const Constructor = Vue.extend(CriminalFundDistribution)
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
    const Constructor = Vue.extend(CriminalFundDistribution)
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

  it('type改变 select变化',done => {
    const vm = new Vue(CriminalFundDistribution).$mount()
    vm.type = 0
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let type = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select')
      let typeOption = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select>option:nth-child(2)')
      expect(typeOption.textContent).to.equal('低报酬')
      expect(typeOption.value).to.equal('0')
      expect(type.value).to.equal('0')
      done()
    })
  });

  it('criminalFundAllocationList改变 table变化',done => {
    const vm = new Vue(CriminalFundDistribution).$mount()
    vm.criminalFundAllocationList = [{
      id:1,
      prison_id:1,
      prison_name:'长沙监狱',
      type:0,
      money:100000
    }]
    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      let prisonId = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(1)')
      let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
      let type = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
      let money = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')

      expect(vm.criminalFundAllocationList).to.have.lengthOf(1)
      expect(prisonId.getAttribute('id')).to.equal('1')
      expect(prisonName.textContent).to.equal('长沙监狱')
      expect(type.textContent).to.equal('低报酬')
      expect(money.textContent).to.equal('1000')
      done()
    })
  });
});
