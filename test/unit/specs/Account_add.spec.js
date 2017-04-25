window.localStorage.setItem('userId',1);
import Vue from 'vue'
import '../../../src/main.js';
import AccountAdd from '@/components/fundManagement/Account_Add'


//prisonList属性
describe('AccountAdd.vue',()=>{
	it('所有监狱列表',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
		expect(vm.prisonList).to.equal('')
	});
});

//getAllPrsion方法
describe('AccountAdd.vue',()=>{
	it('获取所有监狱列表',()=>{
		const Constructor = Vue.extend(AccountAdd)
    	const vm = new Constructor().$mount()
    	vm.getAllPrison();
		expect(vm.prisonList).to.equal('')
	});
});