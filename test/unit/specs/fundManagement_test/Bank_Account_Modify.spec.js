import Vue from 'vue'
import BankAccountModify from '@/components/fundManagement/Bank_Account_Modify'

describe('Bank_Account_Modify.vue 属性测试',() => {
	it('银行账户名称',() => {
		const Constructor = Vue.extend(BankAccountModify)
		const vm = new Constructor().$mount()
		
	})
});