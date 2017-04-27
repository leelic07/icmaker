import Vue from 'vue'
import BankAccountManagement from '@/components/fundManagement/Bank_Account_Management'

//属性测试
describe('Bank_Account_Management.vue 属性测试',() => {
	it('银行账户名称',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountName).to.equal('')
	});

	it('银行账户编号',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankNo).to.equal('')
	});

	it('银行id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankId).to.equal('')
	});

	it('监狱银行账户id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonBankAccountId).to.equal('')
	});

	it('同行/跨行',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.isSameBank).to.euqal('')
	});

	it('对公/对私',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.isPublic).to.equal('')
	});

	it('银行列表',() => {
		const Constructor = VUe.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.banks.toString().to.equal([].toString())
	});

	it('监狱账户id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountId).to.equal('')
	});

	it('银行账户列表',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountList.toString()).to.equal([].toString())
	});
});


//异步更新DOM
describe('Bank_Account_Management.vue 异步更新DOM',() => {
	it('bankAccountName改变 input变化',() => {
		
	})
})