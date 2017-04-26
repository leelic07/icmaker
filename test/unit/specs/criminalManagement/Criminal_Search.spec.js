import Vue from 'vue'
import CriminalSearch from '@/components/criminalManagement/Criminal_Search'

//prisons属性
describe('CriminalSearch.vue',()=>{
	const vm = new Vue(CriminalSearch).$mount()
	vm.prisonerList = [{
		address:"",
		archivesNumber:"43450115899",
		cardNo:"",
		enabled:1,
		intoPrisonDate:1492617600000,
		name:"测试000",
		number:"43450115899",
		prisonDepartmentId:1,
		prisonDepartmentName:"收押中心",
		prisonId:1,
		prisonName:"长沙监狱",
		prisonerId:44,
		status:1
	},{
		address:"",
		archivesNumber:"43450115899",
		cardNo:"",
		enabled:1,
		intoPrisonDate:1492617600000,
		name:"李佳",
		number:"43450115899",
		prisonDepartmentId:1,
		prisonDepartmentName:"收押中心",
		prisonId:1,
		prisonName:"株洲监狱",
		prisonerId:44,
		status:1
	}];
	it('所有监狱列表',()=>{
		expect(vm.prisons).to.equal('')
	});

	
});