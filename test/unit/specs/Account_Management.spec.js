import Vue from 'vue'
import AccountManagement from '@/components/fundManagement/Account_Management'

//属性测试
describe('AccountManagement.vue 属性测试',()=>{
	it('所有监狱账户列表',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountDtos).to.equal('')
	});

	it('所有监狱列表',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonList).to.equal([])
	});

	it('监狱id',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonId).to.equal('')
	});

	it('监狱名称',()=>{
		const Constructor = Vue.extend(prisonName)
		const vm = new Constructor().$mount()
		expect(vm.prisonName).to.equal('')
	});

	
});
