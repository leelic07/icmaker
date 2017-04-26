import Vue from 'vue'
import AccountModify from '@/components/fundManagement/Account_Modify'

//属性测试
describe('Account_Modify.vue 属性测试',() => {
	it('监狱账户id',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		// vm.$route.params.prisonAccountId = 1
		expect(vm.prisonAccountId).to.equal(undefined)
	});

	it('账户类型',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		expect(vm.accountType).to.equal(undefined)
	});

	it('账户名称',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		expect(vm.accountName).to.equal(undefined)
	});

	it('监狱id',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonId).to.equal(undefined)
	});

	it('监区id',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonDepartmentId).to.equal(undefined)
	});

	it('所有监狱列表',() => {
		const Constructor = Vue.extend(AccountModify)
		const vm = new Constructor().$mount()
		expect(vm.prisonList.toString()).to.equal([].toString())
	});

	// it('所有监区数组',() => {
	// 	const Constructor = Vue.extend(AccountModify)
	// 	const vm = new Constructor().$mount()
	// 	expect(vm.prisonDepartments.toString()).to.equal([].toString())
	// });

	// it('监狱名称',() => {
	// 	const Constructor = Vue.extend(AccountModify)
	// 	const vm = new Constructor().$mount()
	// 	expect(vm.prisonName).to.equal('')
	// });
});

//异步更新DOM
// describe('Account_Modify.vue 异步更新DOM',() => {
	
// });