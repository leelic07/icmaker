// window.localStorage.setItem('userId',1);
import Vue from 'vue'
import AccountAdd from '@/components/fundManagement/Account_Add'


//属性测试
describe('AccountAdd.vue 属性测试',()=>{
	it('所有监狱列表',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonList).to.equal('')
	});

	it('所有监区列表',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonDepartments).to.equal('')
	});

	it('监区id',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonDepartmentId).to.equal('')
	});

	it('账户类型',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.accountType).to.equal('')
	});

	it('账户名称',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.accountName).to.equal('')
	});

	it('监狱id',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonId).to.equal('')
	});

	it('监狱名称',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonName).to.equal('')
	});
});

//异步更新DOM
describe('AccountAdd.vue 异步更新DOM',()=>{
	it('prisonList改变 datalist的变化', done => {
	  	const Constructor = Vue.extend(AccountAdd)
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
	  	const Constructor = Vue.extend(AccountAdd)
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
	  	const Constructor = Vue.extend(AccountAdd)
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
	  		let prisonDepartmentName = vm.$el.querySelector('.search-inner-box >div:nth-child(3) select option:nth-child(2)')
		    expect(prisonDepartmentName.textContent).to.equal('收押中心')
		    expect(prisonDepartmentName.value).to.equal('0')
		    done()
		});
	});

	it('accountType改变 select的变化', done => {
	  	const Constructor = Vue.extend(AccountAdd)
	  	const vm = new Constructor().$mount()
		vm.accountType = 0;
	  	// 在状态改变后和断言 DOM 更新前等待一刻
	  	Vue.nextTick(() => {
	  		let accountTypeName = vm.$el.querySelector('.search-inner-box >div:nth-child(4) select option:nth-child(2)')
		    let accountTypeId = vm.$el.querySelector('.search-inner-box >div:nth-child(4) select')
		    expect(accountTypeName.textContent).to.equal('财务账户')
		    expect(accountTypeId.value).to.equal('0')
		    done()
		});
	});


});