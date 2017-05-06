import Vue from 'vue'
import FundDetail from '@/components/fundManagement/Fund_Detail'
import Filters from '@/filters'

//声明过滤器
Object.keys(Filters).forEach(key => {
	Vue.filter(key,Filters[key])
})

//Fund_Detail.vue 属性测试
describe('Fund_Detail.vue 属性测试',() => {
	it('监狱id',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonId).to.equal('')
	});

	it('类型',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.type).to.equal('')
	});

	it('账户名',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.accountName).to.equal('')
	});

	it('监狱列表',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonList.toString()).to.equal([].toString())
	});

	it('监狱资金明细列表',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonCapitalDetailDtos.toString()).to.equal([].toString())
	});

	it('监狱名',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonName).to.equal('')
	});

	it('监狱资金收入总金额',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonCapitalIncomeTotal).to.equal('')
	});

	it('监狱资金支出总金额',() => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		expect(vm.prisonCapitalOutTotal).to.equal('')
	});
});


//Fund_Detail.vue 异步更新DOM测试
describe('Fund_Detail.vue 异步更新DOM',() => {
	it('prisonList改变 datalist的变化', done => {
	  	const Constructor = Vue.extend(FundDetail)
	  	const vm = new Constructor().$mount()
		vm.prisonList =  [{
		  	prisonName:'长沙监狱'
		  },
		  {
		  	prisonName:'株洲监狱'
		}]
	  	// 在状态改变后和断言 DOM 更新前等待一刻
	  	Vue.nextTick(() => {
	  		let prisonName = vm.$el.querySelector('datalist option:nth-child(1)')
		    expect(prisonName.textContent).to.equal('长沙监狱');
		    done()
		});
	});

	it('prisonList改变 input的变化', done => {
	  	const Constructor = Vue.extend(FundDetail)
	  	const vm = new Constructor().$mount()
		vm.prisonList =  [{
		  	prisonName:'长沙监狱'
		  }]
  		vm.prisonName = vm.prisonList[0].prisonName
	  	// 在状态改变后和断言 DOM 更新前等待一刻
	  	Vue.nextTick(() => {
	  		let prisonName = vm.$el.querySelector('[disabled]')
		    expect(prisonName.value).to.equal('长沙监狱');
		    done()
		});
	});

	it('type改变 select变化',done => {
		const Constructor = Vue.extend(FundDetail)
		const vm = new Constructor().$mount()
		vm.type = '0'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let type = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) select')
			expect(type.value).to.equal('0')
			done()
		});
	});

	it('accountName改变 input变化',done => {
		const vm = new Vue(FundDetail).$mount()
		vm.accountName = '监狱局总账户'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let accountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) input')
			expect(accountName.value).to.equal('监狱局总账户')
			done()
		});
	});

	it('prisonCapitalIncomeTotal改变 span变化',done => {
		const vm = new Vue(FundDetail).$mount()
		vm.prisonCapitalIncomeTotal = '100000'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let prisonCapitalIncomeTotal = vm.$el.querySelector('.prison-total ul>li:nth-child(1) span')
			expect(prisonCapitalIncomeTotal.textContent).to.equal('1000')
			done()
		});
	});

	it('prisonCapitalOutTotal改变 span改变',done => {
		const vm = new Vue(FundDetail).$mount()
		vm.prisonCapitalOutTotal = '200000'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let prisonCapitalOutTotal = vm.$el.querySelector('.prison-total ul>li:nth-child(2) span')
			expect(prisonCapitalOutTotal.textContent).to.equal('2000元')
			done()
		});
	});

	it('prisonCapitalDetailDtos改变 table变化',done => {
		const vm = new Vue(FundDetail).$mount()
		vm.prisonCapitalDetailDtos = [{
			prisonCapitalDetailId:'1',
			prisonName:'长沙监狱',
			prisonDepartmentName:'一监区',
			accountName:'监狱局总账户',
			accountNo:'10071509945001888800000',
			toAccountName:'张三',
			toAccountNo:'121421',
			capitalType:'0',
			money:'10000',
			createdAt:'2017-05-03 11:47:53',
			status:'1',
			remark:'资金分配,IC卡资金'
		}]
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let prisonCapitalDetailId = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(1)')
			let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
			let prisonDepartmentName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
			let accountName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
			let accountNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')
			let toAccountName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(6)')
			let toAccountNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(7)')
			let capitalType = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(8)')
			let money = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(9)')
			let createdAt = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(10)')
			let status = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(11)')
			let remark = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(12)')

			expect(prisonCapitalDetailId.getAttribute('id')).to.equal('1')
			expect(prisonName.textContent).to.equal('长沙监狱')
			expect(prisonDepartmentName.textContent).to.equal('一监区')
      done()
		})
	})
});
