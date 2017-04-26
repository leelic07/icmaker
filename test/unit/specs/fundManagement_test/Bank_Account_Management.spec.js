import Vue from 'vue'
import BankAccountManagement from '@/components/fundManagement/Bank_Account_Management'

//属性测试
describe('Bank_Account_Management.vue 属性测试',() => {
	it('银行账户名称',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountName).to.equal('')
	})
});