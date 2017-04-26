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
		expect(vm.prisonList.toString()).to.equal([].toString())
	});

	it('监狱id',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonId).to.equal('')
	});

	it('监狱名称',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonName).to.equal('')
	});

	it('监区数组',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonDepartments.toString()).to.equal([].toString())
	});

	it('监区id',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonDepartmentId).to.equal('')
	});

	it('账户类型',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.accountType).to.equal('')
	});

	it('账户名称',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.accountName).to.equal('')
	});

	it('监狱账户总余额',()=>{
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountsTotal).to.equal('')
	});
});

//异步更新DOM
describe('Account_Management.vue 异步更新DOM',()=>{
	it('prisonList改变 datalist的变化', done => {
	  	const Constructor = Vue.extend(AccountManagement)
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
	  	const Constructor = Vue.extend(AccountManagement)
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

	it('prisonDepartments改变 select的变化', done => {
	  	const Constructor = Vue.extend(AccountManagement)
	  	const vm = new Constructor().$mount()
		vm.prisonDepartments =  [{
			prisonId:1,
			id:0,
		  	prisonDepartmentName:'收押中心'
		  },
		  {
		  	prisonId:1,
		  	id:1,
		  	prisonDepartmentName:'一监区'
		}]
		vm.prisonDepartmentId = vm.prisonDepartments[0].id
		vm.prisonId = vm.prisonDepartments[0].prisonId
	  	// 在状态改变后和断言 DOM 更新前等待一刻
	  	Vue.nextTick(() => {
	  		let prisonDepartmentName = vm.$el.querySelector('.search-inner-box >div:nth-child(1) >div:nth-child(2) select option:nth-child(2)')
		    expect(prisonDepartmentName.textContent).to.equal('收押中心')
		    expect(prisonDepartmentName.value).to.equal('0')
		    done()
		});
	});

	it('accountName改变 input的变化',done => {
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		vm.accountName = '长沙监狱财务'
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let accountName = vm.$el.querySelector('.search-inner-box >div:nth-child(2) input')
			expect(accountName.value).to.equal('长沙监狱财务')
			done()
		});
	});

	it('prisonAccountDtos改变 table的变化',done => {
		const Constructor = Vue.extend(AccountManagement)
		const vm = new Constructor().$mount()
		vm.prisonAccountDtos = [{
			prisonName:'长沙监狱',
			prisonDepartmentName:'一监区',
			accountType:0,
			accountName:'长沙监狱财务',
			virtualAccountNo:'10071509945001888870002',
			total:'201717',
			prisonAccountId:'1'
		}]
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let prisonName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
			expect(prisonName.textContent).to.equal('长沙监狱')
			done()
		});
	});
});