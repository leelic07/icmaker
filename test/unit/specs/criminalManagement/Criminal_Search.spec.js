import Vue from 'vue'
import CriminalSearch from '@/components/criminalManagement/Criminal_Search'

//prisons属性
describe('CriminalSearch.vue',()=>{
	it('所有监狱列表',()=>{
		// const Constructor = Vue.extend(CriminalSearch)
    	// const vm = new Constructor().$mount()
        const vm = new Vue(CriminalSearch).$mount()
		expect(vm.prisons).to.equal('')
	});
});