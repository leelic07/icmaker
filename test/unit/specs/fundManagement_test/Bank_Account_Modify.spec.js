import Vue from 'vue'
import BankAccountModify from '@/components/fundManagement/Bank_Account_Modify'

describe('Bank_Account_Modify.vue 属性测试',() => {
	it('监狱银行账户id',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonBankAccountId).to.equal('')
	});

	it('银行账户id',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountId).to.equal('')
	});

	it('监狱账户id',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountId).to.equal('')
	});

	it('银行数组',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountId.toString()).to.equal([].toString())
	});

	it('银行账户数组',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		expect(vm.bankAccount.toString()).to.equal([].toString())
	});
});

//Bank_Account_Modify.vue 异步更新DOM测试
describe('Bank_Account_Modify.vue 异步更新DOM',() => {
	it('bankAccount.bankAccountName改变 input变化',done => {
		const vm = new Vue(BankAccountModify).$mount()
		vm.bankAccount = {
			bankAccountName:'李国栋'
		}

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankAccountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) input')
			expect(bankAccountName.value).to.equal('李国栋')
			done()
		});
	});

	it('bankAccount.bankNo改变 input变化',done => {
		const vm = new Vue(BankAccountModify).$mount()
		vm.bankAccount = {
			bankNo:'334322'
		}
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankNo = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) input')
			expect(bankNo.value).to.equal('334322')
			done()
		});
	});

	it('banks改变 select option变化',done => {
		const vm = new Vue(BankAccountModify).$mount()
		vm.banks = [{
			id:'1',
			bankName:'建设银行'
		},
		{
			id:'2',
			bankName:'平安银行'
		},
		{
			id:'3',
			bankName:'招商银行'
		}]
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let construction = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select option:nth-child(2)')
			let safety = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select option:nth-child(3)')
			let business = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select option:nth-child(4)')
			expect(vm.banks).to.have.lengthOf(3)
			expect(construction.textContent).to.equal('建设银行')
			expect(construction.value).to.equal('1')
			expect(safety.textContent).to.equal('平安银行')
			expect(safety.value).to.equal('2')
			expect(business.textContent).to.equal('招商银行')
			expect(business.value).to.equal('3')
			done()
		});
	});

	// it('bankAccount.bankId改变 select变化',done => {
	// 	const vm = new Vue(BankAccountModify).$mount()
	// 	vm.bankAccount = {
	// 		bankId:'1'
	// 	}

	// 	// 在状态改变后和断言 DOM 更新前等待一刻
	// 	Vue.nextTick(() => {
	// 		let bankId = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select')
	// 		expect(bankId.value).to.equal('1')
	// 		done()
	// 	});
	// });

	it('bankAccount.bankAccountNo改变 input变化',done => {
		const vm = new Vue(BankAccountModify).$mount()
		vm.bankAccount = {
			bankAccountNo:'6235478965412364'
		}
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankAccountNo = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(1) input')
			expect(bankAccountNo.value).to.equal('6235478965412364')
			done()
		});
	});

	it('bankAccount.isSameBank改变 select变化',done => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		vm.bankAccount = {
			isSameBank:'0'
		}
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let isSameBank = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(2) select')
			let isSameBankOption = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(2) select option:nth-child(2)')
			expect(isSameBank.value).to.equal('0')
			expect(isSameBankOption.textContent).to.equal('跨行')
			done()
		});
	});

	it('bankAccount.isPublic改变 select变化',done => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		vm.bankAccount = {
			isPublic:'0'
		}
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let isPublic = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(3) select')
			let isPublicOption = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(3) select option:nth-child(2)')
			expect(isPublic.value).to.equal('0')
			expect(isPublicOption.textContent).to.equal('对公付款')
			done()
		});
	});

});