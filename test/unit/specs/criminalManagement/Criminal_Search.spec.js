import Vue from 'vue'
import CriminalSearch from '@/components/criminalManagement/Criminal_Search'
import axios from 'axios'
import sinon from 'sinon'
import Filters from '@/filters'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

//声明过滤器
Object.keys(Filters).forEach(key => {
	Vue.filter(key,Filters[key])
})

describe('CriminalSearch页面默认数据赋值准确 data()',(done)=>{
	const vm = new Vue(CriminalSearch).$mount()

	it('prisons 监狱列表初始为空',()=>{
		expect(vm.prisons).to.equal("")
	})

	it('prisonDepartments 监区列表初始为空',()=>{
		expect(vm.prisonDepartments).to.equal("")
	})

	it('prisonerList 罪犯列表初始为空',()=>{
		expect(vm.prisonerList).to.equal("")
	})

	it('prisonerSize 罪犯列表条数初始为空',()=>{
		expect(vm.prisonerSize).to.equal("")
	})

	it('currentId 当前操作的罪犯ID初始为空',()=>{
		expect(vm.currentId).to.equal("")
	})

	it('prisonName 监狱名初始为空',()=>{
		expect(vm.prisonName).to.equal("")
	})

	it('prisonId 所属监狱ID初始为空',()=>{
		expect(vm.prisonId).to.equal("")
	})

	it('prisonDepartmentId 所属监区ID初始为空',()=>{
		expect(vm.prisonDepartmentId).to.equal("")
	})

	it('status 在监状态初始为空',()=>{
		expect(vm.status).to.equal("")
	})

	it('number 编号初始为空',()=>{
		expect(vm.number).to.equal("")
	})

	it('archivesNumber 档案号初始为空',()=>{
		expect(vm.archivesNumber).to.equal("")
	})

	it('name 罪犯名初始为空',()=>{
		expect(vm.name).to.equal("")
	})

	it('toUrl 到达路由初始为空',()=>{
		expect(vm.toUrl).to.equal("")
	})

	it('fromUrl 进入路由初始为空',()=>{
		expect(vm.fromUrl).to.equal("")
	})

	it('isManage 初始为罪犯搜索页面',()=>{
		expect(vm.isManage).to.equal(true)
	})

	it('pageSize 每页显示10条数据',()=>{
		expect(vm.pageSize).to.equal(10)
	})

	it('indexPage 初始页为第一页',()=>{
		expect(vm.indexPage).to.equal(1)
	})
})

describe('正确加载状态列表 getStatusList()',(done)=>{
	it('DOM层：状态列表下拉可选，默认显示为"全部"', (done) => {
		const vm = new Vue(CriminalSearch).$mount()
		vm.getStatusList()
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

describe('正确加载监狱监区列表，调用获取罪犯信息列表方法 getPrisonInfo()',()=>{
	
	describe('当监狱列表长度大于1时，所属监狱下拉显示全部，所属监区下拉无监区显示',()=>{
	   const vm = new Vue(CriminalSearch).$mount()
	   let listFrequency = sinon.spy(vm,"criminalSearch")
	   let departFrequency = sinon.spy(vm,"getPrisonDepartInfo")
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

		it('不调用获取监区信息方法，调用一次获取罪犯信息列表方法',(done)=>{
			Vue.nextTick(()=> {
				expect(listFrequency.withArgs(1).callCount).to.equal(1)
		 	    expect(departFrequency.callCount).to.equal(0)
			})
			done()
		})

    })

	describe('当监狱列表长度等于1时，所属监狱显示第一条，所属监区不为空',()=>{
		const vm = new Vue(CriminalSearch).$mount()
		let listFrequency = sinon.spy(vm,"criminalSearch")
		let departFrequency = sinon.spy(vm,"getPrisonDepartInfo")
		let promiseCall

		beforeEach(() =>{
			promiseCall = sinon.stub(axios, 'get').returnsPromise()
			vm.indexPage = 2
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

		it('调用一次获取监区信息方法和获取罪犯信息列表方法',(done)=>{
			Vue.nextTick(()=> {
				expect(listFrequency.withArgs(2).callCount).to.equal(1)
		 	    expect(departFrequency.callCount).to.equal(1)
			})
			done()
		})

	})
})

describe('输入监狱名对应到监狱ID watch prisonName()',()=>{
	    const vm = new Vue(CriminalSearch).$mount()
		const vm2 = new Vue(CriminalSearch).$mount()
		const vm3 = new Vue(CriminalSearch).$mount()

		it('当匹配到监狱名时，返回其对应的监狱ID。监狱名改变，调用一次获取监区方法', (done) => {
			let departFrequency = sinon.spy(vm,"getPrisonDepartInfo")
			vm.prisons = [{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]
			vm.prisonName = "星城监狱"
			Vue.nextTick(()=> {
                expect(vm.prisonId).to.equal(5)
				expect(departFrequency.callCount).to.equal(1)
			})
			done()
		})

		it('监狱名为空时，返回监狱ID值为空。监狱名未变化，不调用获取监区方法', (done) => {
			let departFrequency2 = sinon.spy(vm2,"getPrisonDepartInfo")
			vm2.prisons = [{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]
			vm2.prisonName = ""
			Vue.nextTick(()=> {
                expect(vm2.prisonId).to.equal("")
				expect(departFrequency2.callCount).to.equal(0)
			})
			done()
		})

        it('当未匹配到监狱名且不为空时，监狱ID返回-1。监狱名改变，调用一次获取监区方法', (done) => {
			let departFrequency3 = sinon.spy(vm3,"getPrisonDepartInfo")
			vm3.prisons = [{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]
			vm3.prisonName = "长沙监"
			Vue.nextTick(()=> {
                expect(vm3.prisonId).to.equal(-1)
				expect(departFrequency3.callCount).to.equal(1)
			})
			done()
		})

})

describe('根据监狱ID加载监区列表 getPrisonDepartInfo ()',()=>{
	    const vm = new Vue(CriminalSearch).$mount()
		let promiseCall

		beforeEach(() => {
			promiseCall = sinon.stub(axios, 'get').returnsPromise()
		})

		afterEach(() => {
			axios.get.restore()
		})

		it('数据层：调用获取监区列表应该传值正确的监狱ID，成功后prisonDepartments正确', () => {
			vm.prisonId = 2
			promiseCall.resolves({
				data: {
					data:[{"id":1,"prisonDepartmentName":"收押中心"}],
					code:0
				}
			})
			vm.getPrisonDepartInfo ()
			expect(promiseCall.calledWithMatch('prisoner/getDepartments',{params: {"prisonId":2}})).to.equal(true)
			expect(vm.prisonDepartments).to.have.lengthOf(1)
		    expect(vm.prisonDepartments[0].prisonDepartmentName).to.equal("收押中心")
		})  

		it('DOM层：调用获取监区列表成功后 监区列表正确默认选中为全部', (done) => {
			Vue.nextTick(()=> {
			   let prisonDepartmentId = vm.$el.querySelectorAll("#prisonDepartmentId option");
			   expect(prisonDepartmentId).to.have.lengthOf(2)
			   expect(prisonDepartmentId.item(0).textContent).to.equal("全部")
			   expect(prisonDepartmentId.item(0).getAttribute("value")).to.equal("")
		       expect(prisonDepartmentId.item(1).textContent).to.equal("收押中心")
			   expect(prisonDepartmentId.item(1).getAttribute("value")).to.equal("1")
		   })
			done()
		}) 
})

describe('为编辑页面时列表页面隐藏 hideCriminalList()',()=>{
	const vm = new Vue(CriminalSearch).$mount()
	const vm2 = new Vue(CriminalSearch).$mount()
	
	it ('数据层：初始为罪犯搜索页面时,isManage为true',() =>{
		const currentUrl = "/crimsearch"
		vm.hideCriminalList(currentUrl)
		expect(vm.isManage).to.equal(true)
	})

	it ('DOM层：初始为罪犯搜索页面时,罪犯搜索页显示',(done) =>{
		 Vue.nextTick(()=> {
			let criminalSearch = vm.$el.querySelector(".criminal-search");
			expect(criminalSearch).to.be.exist
		 })
		 done()
	})

	it ('数据层：初始为罪犯编辑页面时,isManage为false',() =>{
		const currentUrl2 = "/crimsearch/edit/2"
		vm2.hideCriminalList(currentUrl2)
		expect(vm2.isManage).to.equal(false)
	})

	it ('DOM层：初始为罪犯编辑页面时,罪犯编辑页面不显示',(done) =>{
		 Vue.nextTick(()=> {
			let criminalSearch = vm2.$el.querySelector(".criminal-search")	
			expect(criminalSearch).to.not.exist
		 })
		 done()
	})

})

describe('路由变化时控制罪犯搜索页的显示与隐藏 watch toUrl()',()=>{
	const vm = new Vue(CriminalSearch).$mount()
	const vm2 = new Vue(CriminalSearch).$mount()
	
	beforeEach(() => {
		vm.toUrl = "/crimsearch/edit/2"
	})

	it ('进入到罪犯编辑页面时,罪犯搜索页面不显示',(done) =>{
		 Vue.nextTick(()=> {
			let criminalSearch = vm.$el.querySelector(".criminal-search")	
			expect(vm.isManage).to.equal(false)
			expect(criminalSearch).to.not.exist
		 })
		 done()
	})

    beforeEach(() => {
		vm2.toUrl = "/crimsearch"
	})

	it ('进入到罪犯搜索页面,罪犯搜索页面显示',(done) =>{
		 Vue.nextTick(()=> {
			let criminalSearch = vm2.$el.querySelector(".criminal-search")	
			expect(vm2.isManage).to.equal(true)
			expect(criminalSearch).to.be.exist
		 })
		 done()
	})

})

describe('路由变化时控制罪犯搜索页的列表重新加载 watch fromUrl()',()=>{
	const vm = new Vue(CriminalSearch).$mount()
	const vm2 = new Vue(CriminalSearch).$mount()
	const vm3 = new Vue(CriminalSearch).$mount()

	beforeEach(() => {
		vm.fromUrl = "/crimadd"
	})

	it ('从罪犯新增页进入罪犯搜索界面时,罪犯搜索页面列表重新加载',(done) =>{
		 let listFrequency = sinon.spy(vm,"criminalSearch")
		 Vue.nextTick(()=> {
			expect(listFrequency.callCount).to.equal(1)
		 })
		 done()
	})

    beforeEach(() => {
		vm2.fromUrl = "/crimsearch/edit/2"
	})

	it ('从罪犯编辑页进入罪犯搜索界面时,罪犯搜索页面列表重新加载',(done) =>{
		let listFrequency = sinon.spy(vm2,"criminalSearch")
		 Vue.nextTick(()=> {
			expect(listFrequency.callCount).to.equal(1)
		 })
		 done()
	})

    beforeEach(() => {
		vm3.fromUrl = "/examine"
	})

	it ('从其他页面进入罪犯搜索界面时,罪犯搜索页面列表不会重新加载',(done) =>{
		let listFrequency = sinon.spy(vm3,"criminalSearch")
		 Vue.nextTick(()=> {
			expect(listFrequency.callCount).to.equal(0)
		 })
		 done()
	})
})

describe('罪犯列表数据展示与删除 deletePrisoner()',()=>{
	const vm = new Vue(CriminalSearch).$mount()

	beforeEach(()=>{
		vm.prisonerList = [{
			address:"长沙市金星路",
			archivesNumber:"43450115899",
			cardNo:"420581188503121767",
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
	})
	//vm.deletePrisoner()
	
	it ('Dom层：列表数据展示正确',(done) =>{
		Vue.nextTick(()=> {
			let prisoners = vm.$el.querySelectorAll(".ic-table tbody tr")
			let name =vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(1)").textContent
			let number = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(2)").textContent
			let archivesNumber = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(3)").textContent
            let address = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(4)").textContent
			let cardNo = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(5)").textContent
			let prisonName = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(6)").textContent
			let prisonDepartmentName = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(7)").textContent
			let status = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(8)").textContent
			let intoPrisonDate = vm.$el.querySelectorAll(".ic-table tbody tr:nth-child(1) td:nth-child(9)").textContent

			expect(prisoners).to.have.lengthOf(2)
			expect(name).to.equal("测试000")
			expect(number).to.equal("43450115899")
			expect(archivesNumber).to.equal("43450115899")
			expect(address).to.equal("长沙市金星路")
			expect(cardNo).to.equal("420581188503121767")
			expect(prisonName).to.equal("长沙监狱")
			expect(prisonDepartmentName).to.equal("收押中心")
			expect(status).to.equal("在监")
			expect(intoPrisonDate).to.equal("2017-04-20")
		    console.log(vm.$el.querySelector(".ic-table tbody tr:nth-child(1)"))
		})
		done()
	})
})
// describe('罪犯信息列表获取 criminalSearch()',()=>{
// 	const vm = new Vue(CriminalSearch).$mount()
//    let axiosFrequency = sinon.spy(axios,"get")

// 	beforeEach(() => {
// 		vm.prisonId = 1
// 		vm.prisonDepartmentId = 2
// 		vm.status = 1
// 		vm.name = "    大卫"
// 		vm.number = "  123456 "
// 		vm.archivesNumber = " 322223344    "
// 	})

//     it ('搜索传值应该准确',(done) =>{
// 		vm.criminalSearch()
// 		Vue.nextTick(()=> {
// 			expect(listFrequency.withArgs(2).callCount).to.equal(1)
// 			expect(axiosFrequency.callCount).to.equal(1)
// 		})
// 		done()
// 	})
	
// });
