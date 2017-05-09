import Vue from 'vue'
import CriminalSearch from '@/components/criminalManagement/Criminal_Search'
import axios from 'axios'
import sinon from 'sinon'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

describe('正确加载状态列表 getStatusList()',(done)=>{
	it('DOM层：状态列表下拉可选，默认显示为"全部"', (done) => {
		const vm = new Vue(CriminalSearch).$mount()
		Vue.nextTick(()=> {
			let status = vm.$el.querySelectorAll("#status option")
			expect(status).to.have.lengthOf(3)
			expect(status.item(0).textContent).to.equal("全部")
			expect(status.item(1).textContent).to.equal("离监")
			expect(status.item(2).textContent).to.equal("在监")
			expect(status.item(0).getAttribute("value")).to.equal("")
			expect(status.item(1).getAttribute("value")).to.equal("0")
			expect(status.item(2).getAttribute("value")).to.equal("1")
			done()
		})
	})
})

describe('正确加载监狱监区列表 getPrisonInfo()',()=>{

	describe('当监狱列表长度大于1时，所属监狱下拉显示全部，所属监区下拉无监区显示',()=>{
	   const vm = new Vue(CriminalSearch).$mount()
	   let promiseCall

		beforeEach(() => {
			promiseCall = sinon.stub(axios, 'get').returnsPromise()
		})

		afterEach(() => {
			axios.get.restore()
		})

		// https://github.com/substantial/sinon-stub-promise
		it('数据层：prisons prisonName prisonId prisonDepartments 属性正确', () => {
			promiseCall.resolves({
				data: {
					data:{
						prisons:[{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]
					},
					code:0
				}
			})
			vm.getPrisonInfo()
			expect(vm.prisons).to.have.lengthOf(2)
			expect(vm.prisons[0].id).to.be.equal(1)
			expect(vm.prisons[0].prisonName).to.be.equal("长沙监狱")
			expect(vm.prisons[1].id).to.be.equal(5)
			expect(vm.prisons[1].prisonName).to.be.equal("星城监狱")
			expect(vm.prisonName).to.be.equal('')
			expect(vm.prisonId).to.be.equal('')
			expect(vm.prisonDepartments).to.be.equal('')
		})

		it('DOM层：所属监狱下拉可选，默认显示为"全部",所属监区下拉无监区列表，默认显示为“全部”', (done) => {
			Vue.nextTick(()=> {
				let prisons = vm.$el.querySelectorAll("#prisonList option")
				let prisonInput = vm.$el.querySelector("#prisonInput")
				let prisonDeparts = vm.$el.querySelectorAll("#prisonDepartmentId option")
				expect(prisons).to.have.lengthOf(2)
				expect(prisons.item(0).textContent).to.equal("长沙监狱")
				expect(prisons.item(1).textContent).to.equal("星城监狱")
				expect(prisons.item(0).getAttribute("prisonId")).to.equal("1")
				expect(prisons.item(1).getAttribute("prisonId")).to.equal("5")
				expect(prisonInput.getAttribute("disabled")).to.not.exist
				expect(prisonInput.getAttribute("placeholder")).to.equal("全部")
				expect(prisonDeparts).to.have.lengthOf(1)
				expect(prisonDeparts.item(0).textContent).to.equal("全部")
			})
			done()
		})
    })

	describe('当监狱列表长度等于1时，所属监狱显示第一条，所属监区不为空',()=>{
		const vm = new Vue(CriminalSearch).$mount()

		let promiseCall

		beforeEach(() =>{
			promiseCall = sinon.stub(axios, 'get').returnsPromise()
		})

		afterEach(() => {
			axios.get.restore()
		})

		it('数据层：prisons prisonName prisonId prisonDepartments属性正确', () => {
			promiseCall.resolves({
				data: {
					data:{
						prisons:[{"id":1,"prisonName":"长沙监狱"}]
					},
					code:0
				}
			})
			vm.getPrisonInfo()
			expect(vm.prisons).to.have.lengthOf(1)
			expect(vm.prisons[0].id).to.be.equal(1)
			expect(vm.prisons[0].prisonName).to.be.equal("长沙监狱")
			expect(vm.prisonName).to.be.equal('长沙监狱')
			expect(vm.prisonId).to.be.equal(1)
			expect(vm.prisonDepartments).to.not.equal("")
		})

		it('DOM层：所属监狱默认选中第一条，且不可修改', (done) => {
			Vue.nextTick(()=> {
				let prisons = vm.$el.querySelectorAll("#prisonList option");
				let prisonInput = vm.$el.querySelector("#prisonInput");
				let prisonDeparts = vm.$el.querySelectorAll("#prisonDepartmentId option")
				expect(prisons).to.have.lengthOf(1)
				expect(prisons.item(0).textContent).to.equal("长沙监狱")
				expect(prisons.item(0).getAttribute("prisonId")).to.equal("1")
				expect(prisonInput.getAttribute("disabled")).to.equal("disabled")
			})
			done()
		})
	})
})

describe('输入监狱名对应到监狱ID prisonName()',()=>{
	    const vm = new Vue(CriminalSearch).$mount()
		after(() =>{
			vm.prisons = [{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]
			vm.prisonName = "长沙监狱"
		})
		it('当匹配到监狱名时，返回其对应的ID', () => {
			console.log("change")
			console.log(vm.prisons)
			// expect(vm.prisonId).to.equal(1)
		})
})

describe('选中监狱正确加载其下的监区列表 getPrisonDepartInfo ()',()=>{
	    // const vm = new Vue(CriminalSearch).$mount()

		// it('数据层：prisons prisonName prisonId属性正确', () => {
		// 	vm.prisonName = "长沙监狱"
		// 	console.log();
		// })
		// let promiseCall

		// beforeEach(function () {
		// 	promiseCall = sinon.stub(axios, 'get').returnsPromise()
		// })

		// afterEach(function () {
		// 	axios.get.restore()
		// })

		// it('数据层：prisons prisonName prisonId属性正确', () => {
		// 	promiseCall.resolves({
		// 		data: {
		// 			data:{
		// 				prisons:[{"id":1,"prisonName":"长沙监狱"}]
		// 			},
		// 			code:0
		// 		}
		// 	})
		// 	vm.getPrisonInfo()
		// 	expect(vm.prisons).to.have.lengthOf(1)
		// 	expect(vm.prisons[0].id).to.be.equal(1)
		// 	expect(vm.prisons[0].prisonName).to.be.equal("长沙监狱")
		// 	expect(vm.prisonName).to.be.equal('长沙监狱')
		// 	expect(vm.prisonId).to.be.equal(1)
			// promiseCall.resolves({
			// 	data: {
			// 		data:[{"id":1,"prisonDepartmentName":"收押中心"}],
			// 		code:0
			// 	}
			// })
			// vm.getPrisonDepartInfo ()
			// expect(vm.prisonDepartments).to.be.equal("收押中心")
			// console.log("here")
			// console.log(vm.prisonDepartments)
		//})

})
// describe('CriminalSearch.vue',()=>{
// 	const vm = new Vue(CriminalSearch).$mount()
// 	vm.prisons = [{

// 	}]
// 	// vm.prisonerList = [{
// 	// 	address:"",
// 	// 	archivesNumber:"43450115899",
// 	// 	cardNo:"",
// 	// 	enabled:1,
// 	// 	intoPrisonDate:1492617600000,
// 	// 	name:"测试000",
// 	// 	number:"43450115899",
// 	// 	prisonDepartmentId:1,
// 	// 	prisonDepartmentName:"收押中心",
// 	// 	prisonId:1,
// 	// 	prisonName:"长沙监狱",
// 	// 	prisonerId:44,
// 	// 	status:1
// 	// },{
// 	// 	address:"",
// 	// 	archivesNumber:"43450115899",
// 	// 	cardNo:"",
// 	// 	enabled:1,
// 	// 	intoPrisonDate:1492617600000,
// 	// 	name:"李佳",
// 	// 	number:"43450115899",
// 	// 	prisonDepartmentId:1,
// 	// 	prisonDepartmentName:"收押中心",
// 	// 	prisonId:1,
// 	// 	prisonName:"株洲监狱",
// 	// 	prisonerId:44,
// 	// 	status:1
// 	// }];
// 	// it('所有监狱列表',()=>{
// 	// 	expect(vm.prisons).to.equal('')
// 	// });
// 	// it('所有监狱列表',()=>{
// 	// 	expect(vm.prisons).to.equal('')
// 	// });

// });
