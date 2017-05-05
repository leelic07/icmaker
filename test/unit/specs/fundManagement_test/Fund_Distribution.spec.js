import Vue from 'vue'
import FundDistribution from '@/components/fundManagement/Fund_Distribution'
import Filters from '@/filters'

//声明过滤器
Object.keys(Filters).forEach(key => {
	Vue.filter(key,Filters[key])
})

//Fund_Distribution.vue 属性测试
describe('Fund_Distribution.vue 属性测试',() => {
	it('类型数组',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.type.toString()).to.equal([].toString())
	});

	it('分配资金数组',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.money.toString()).to.equal([].toString())
	});

	it('被选中的罪犯序号',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.index).to.equal(0)
	});

	it('分配金额和类型数组',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.distributionItems[0].money).to.equal('')
		expect(vm.distributionItems[0].type).to.equal('')
	});

	it('可分配金额',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.avilableTotal).to.equal('')
	});

	it('监狱资金分配列表',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.prisonCapitalAssignsList.toString()).to.equal([].toString())
	});

	it('用户信息',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.userInfo).to.equal('')
	});

	it('无权限提示信息',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.errMsg).to.equal('')
	});

	it('无权限背景颜色控制参数',() => {
		const Constructor = Vue.extend(FundDistribution)
		const vm = new Constructor().$mount()
		expect(vm.noAuthority).to.equal(false)
	});

});

//Fund_Distribution.vue 异步更新DOM测试
describe('Fund_Distribution.vue 异步更新DOM测试',() => {
	it('userInfo.userType改变 h3变化',done => {
		const vm = new Vue(FundDistribution).$mount()
		vm.userInfo = {
			userType:0
		}
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let noAuthority = vm.$el.querySelector('.noAuthority h3')
			expect(noAuthority.textContent).to.equal('您没有权限访问该页面，只有监狱账户才可以分配资金！')
			done()
		});
	});

	it('userInfo.userType和errMsg改变 h3变化',done => {
		const vm = new Vue(FundDistribution).$mount()
		vm.userInfo = {
			userType:2
		}
		vm.errMsg = '您没有绑定虚拟账号，请绑定账号之后再进行操作'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let noAuthority = vm.$el.querySelector('.noAuthority h3')
			expect(noAuthority.textContent).to.equal('您没有绑定虚拟账号，请绑定账号之后再进行操作')
			done()
		});
	});

	it('userInfo.userType和errMsg改变 h3变化',done => {
		const vm = new Vue(FundDistribution).$mount()
		vm.userInfo = {
			userType:2
		}
		vm.avilableTotal = 10000
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let noAuthority = vm.$el.querySelector('.search-inner-box h3')
			expect(noAuthority.textContent).to.equal('100')
			done()
		});
	});

	it('prisonCapitalAssignsList改变 p变化',done => {
		const vm = new Vue(FundDistribution).$mount()
		vm.prisonCapitalAssignsList = [{
			money:120000,
			type:0
		}]
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let money = vm.$el.querySelector('.distributionItem>div:nth-child(1) p')
			let type = vm.$el.querySelector('.distributionItem>div:nth-child(2) p')
			expect(money.textContent).to.equal('1200')
			expect(type.textContent).to.equal('低报酬')
			done()
		});
	});

	it('distributionItems改变 input select变化',done => {
		const vm = new Vue(FundDistribution).$mount()
		vm.distributionItems = [{
			money:20000,
			type:1
		},
		{
			money:30000,
			type:0
		}]
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let money = vm.$el.querySelector('.distributionItem>div:nth-child(1) input')
			let type = vm.$el.querySelector('.distributionItem>div:nth-child(2) select')
			expect(vm.distributionItems).to.have.lengthOf(2)
			expect(money.value).to.equal('20000')
			expect(type.value).to.equal('1')
			done()
		});
	});
});