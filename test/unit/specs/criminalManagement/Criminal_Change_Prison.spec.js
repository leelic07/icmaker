import Vue from 'vue'
import axios from 'axios'
import sinon from 'sinon'
import Validate from '@/../static/js/validate.js'
import '../../test.config.js'
import CriminalChangePrison from '@/components/criminalManagement/Criminal_Change_Prison'

describe('CriminalChangePrison.vue 页面默认数据赋值准确 data()',()=>{
	const vm = new Vue(CriminalChangePrison).$mount()

  it('prisons 根据用户信息出现的监狱列表初始为空', () => {
    expect(vm.prisons).to.equal("")
  })

	it('allPrisons 所有的监狱列表初始为空', () => {
    expect(vm.allPrisons).to.equal("")
  })
  
	it('toPrisons 转至的监狱列表初始为空', () => {
    expect(vm.toPrisons).to.equal("")
  })

  it('prisonDepartments 监区列表初始为空', () => {
    expect(vm.prisonDepartments).to.equal("")
  })

	it('toPrisonDepartments 转至的监区列表初始为空', () => {
    expect(vm.toPrisonDepartments).to.equal("")
  })

	it('statusList 在监状态列表初始为空', () => {
    expect(vm.statusList).to.equal("")
  })

  it('prisonerList 罪犯列表初始为空', () => {
    expect(vm.prisonerList).to.equal("")
  })

  it('prisonerSize 罪犯列表条数初始为空', () => {
    expect(vm.prisonerSize).to.equal("")
  })

  it('currentId 当前操作的罪犯ID初始为空', () => {
    expect(vm.currentId).to.equal("")
  })

	it('ids 批量转监狱选中的罪犯ID初始为空', () => {
    expect(vm.ids).to.equal("")
  })

	it('initPrisonId 默认选中的转至监狱ID初始为空', () => {
    expect(vm.initPrisonId).to.equal("")
  })

  it('prisonName 监狱名初始为空', () => {
    expect(vm.prisonName).to.equal("")
  })

  it('prisonId 所属监狱ID初始为空', () => {
    expect(vm.prisonId).to.equal("")
  })

  it('prisonDepartmentId 所属监区ID初始为空', () => {
    expect(vm.prisonDepartmentId).to.equal("")
  })

  it('status 在监状态初始为空', () => {
    expect(vm.status).to.equal("")
  })

  it('number 编号初始为空', () => {
    expect(vm.number).to.equal("")
  })

  it('archivesNumber 档案号初始为空', () => {
    expect(vm.archivesNumber).to.equal("")
  })

  it('name 罪犯名初始为空', () => {
    expect(vm.name).to.equal("")
  })

  it('toPrisonId 转至监狱ID初始为空', () => {
    expect(vm.toPrisonId).to.equal("")
  })

  it('toPrisonName 转至监狱名初始为空', () => {
    expect(vm.toPrisonName).to.equal("")
  })

	it('toAllPrisonName 批量转监狱名初始为空', () => {
    expect(vm.toAllPrisonName).to.equal("")
  })

	it('toDepartmentId 批量转至监区ID初始为空', () => {
    expect(vm.toDepartmentId).to.equal("")
  })

  it('toPrisonDepartmentId 单个转至监区ID初始为空', () => {
    expect(vm.toPrisonName).to.equal("")
  })

	it('remind 提示初始状态为空', () => {
    expect(vm.remind.status).to.equal('')
		expect(vm.remind.msg).to.equal('')
  })

  it('pageSize 每页显示10条数据', () => {
    expect(vm.pageSize).to.equal(10)
  })

  it('indexPage 初始页为第一页', () => {
    expect(vm.indexPage).to.equal(1)
  })
})

describe('CriminalChangePrison.vue 正确加载状态列表 getStatusList()',()=>{
	const vm = new Vue(CriminalChangePrison).$mount()
	it('DOM层：状态列表下拉可选，默认显示为"全部"', (done) => {	
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
			
		})
		done()
	})
})

describe('CriminalChangePrison.vue 正确加载根据用户信息获取的监狱监区列表，调用获取罪犯信息列表方法 getPrisonInfo()',()=>{
	
	describe('当监狱列表长度大于1时，所属监狱下拉显示全部，所属监区下拉无监区显示',()=>{
	   const vm = new Vue(CriminalChangePrison).$mount()
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
			console.log(vm.prisons)
			expect(vm.prisons).to.have.lengthOf(2)
			expect(vm.prisons[0]).to.eql({"id":1,"prisonName":"长沙监狱"})
			expect(vm.prisons[1]).to.eql({"id":5,"prisonName":"星城监狱"})

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
		const vm = new Vue(CriminalChangePrison).$mount()
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
			expect(vm.prisons[0]).to.eql({"id":1,"prisonName":"长沙监狱"})

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

describe('CriminalChangePrison.vue 正确加载所有的监狱监区列表 getAllPrisonInfo()',()=>{
  describe('批量转监狱时获取全部的监狱列表,此时prisonId不传',()=>{
    const vm = new Vue(CriminalChangePrison).$mount()
    let toPrisonFrequency = sinon.spy(vm,"getToPrisonInfo")
    let promiseCall

    beforeEach(() => {
      promiseCall = sinon.stub(axios, 'get').returnsPromise()
    })

    afterEach(() => {
      axios.get.restore()
    })

    // https://github.com/substantial/sinon-stub-promise
    it('数据层：allPrisons 属性正确', () => {
      promiseCall.resolves({
        data: {
          data:[{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}],
          code:0
        }
      })
      vm.getAllPrisonInfo()
      expect(vm.allPrisons).to.have.lengthOf(2)
      expect(vm.allPrisons[0]).to.eql({"id":1,"prisonName":"长沙监狱"})
      expect(vm.allPrisons[1]).to.eql({"id":5,"prisonName":"星城监狱"})

    })

    it('DOM层：转至监狱下拉可选,转至监区下拉无监区列表', (done) => {		
      Vue.nextTick(()=> {
        let allPrisons = vm.$el.querySelectorAll("#allPrisonList option")
        let allPrisonInput = vm.$el.querySelector("#allPrisonInput")
        let toPrisonDeparts = vm.$el.querySelectorAll("#toDepartmentId option")
    
        expect(allPrisons).to.have.lengthOf(2)
        expect(allPrisons.item(0).textContent).to.equal("长沙监狱")
        expect(allPrisons.item(1).textContent).to.equal("星城监狱")
        
        expect(allPrisonInput.getAttribute("disabled")).to.not.exist
        expect(toPrisonDeparts).to.have.lengthOf(0)

      })
      done()
    })

    it('不调用单个转监狱排除已有监狱的方法',(done)=>{
      Vue.nextTick(()=> {
        expect(toPrisonFrequency.callCount).to.equal(0)
      })
      done()
    })

  })
  describe('单个转监狱时排除当下所在的监狱列表,此时prisonId传值为当前所在监狱ID',()=>{
    const vm = new Vue(CriminalChangePrison).$mount()
    let toPrisonFrequency = sinon.spy(vm,"getToPrisonInfo")
    let promiseCall

    beforeEach(() => {
      promiseCall = sinon.stub(axios, 'get').returnsPromise()
    })

    afterEach(() => {
      axios.get.restore()
    })

    // https://github.com/substantial/sinon-stub-promise
    it('数据层：allPrisons 属性正确', () => {
      promiseCall.resolves({
        data: {
          data:[{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}],
          code:0
        }
      })
      vm.getAllPrisonInfo(5)
      expect(vm.allPrisons).to.have.lengthOf(2)
      expect(vm.allPrisons[0]).to.eql({"id":1,"prisonName":"长沙监狱"})
      expect(vm.allPrisons[1]).to.eql({"id":5,"prisonName":"星城监狱"})

    })

    it('DOM层：转至监狱下拉可选,转至监区下拉无监区列表', (done) => {		
      Vue.nextTick(()=> {
        let allPrisons = vm.$el.querySelectorAll("#allPrisonList option")
        let allPrisonInput = vm.$el.querySelector("#allPrisonInput")
        let toPrisonDeparts = vm.$el.querySelectorAll("#toDepartmentId option")
    
        expect(allPrisons).to.have.lengthOf(2)
        expect(allPrisons.item(0).textContent).to.equal("长沙监狱")
        expect(allPrisons.item(1).textContent).to.equal("星城监狱")
        
        expect(allPrisonInput.getAttribute("disabled")).to.not.exist
        expect(toPrisonDeparts).to.have.lengthOf(0)

      })
      done()
    })

    it('调用单个转监狱排除已有监狱的方法',(done)=>{
      Vue.nextTick(()=> {
        expect(toPrisonFrequency.callCount).to.equal(1)
      })
      done()
    })

  })
})

describe('CriminalChangePrison.vue 正确加载转至的监狱监区列表 getToPrisonInfo()',()=>{
    const vm = new Vue(CriminalChangePrison).$mount()
    vm.allPrisons = [{"id":1,"prisonName":"长沙监狱"},{"id":5,"prisonName":"星城监狱"}]

    // https://github.com/substantial/sinon-stub-promise
    it('数据层：toPrisons 属性正确', () => {
      vm.getToPrisonInfo(1)
      expect(vm.toPrisons).to.have.lengthOf(1)
      expect(vm.toPrisons[0]).to.eql({"id":5,"prisonName":"星城监狱"})

    })

    it('DOM层：转至监狱下拉可选,转至监区下拉无监区列表', (done) => {		
      Vue.nextTick(()=> {
        let toPrisons = vm.$el.querySelectorAll("#toPrisonList option")
        let toPrisonInput = vm.$el.querySelector("#toPrisonInput")
        let toPrisonDeparts = vm.$el.querySelectorAll("#toPrisonDepartmentId option")
    
        expect(toPrisons).to.have.lengthOf(1)
        expect(toPrisons.item(0).textContent).to.equal("星城监狱")
        
        expect(toPrisonInput.getAttribute("disabled")).to.not.exist
        expect(toPrisonDeparts).to.have.lengthOf(0)

      })
      done()
    })
})

describe('CriminalChangePrison.vue 输入监狱名对应到监狱ID watch prisonName()', () => {
  const vm = new Vue(CriminalChangePrison).$mount()
  const vm2 = new Vue(CriminalChangePrison).$mount()
  const vm3 = new Vue(CriminalChangePrison).$mount()

  it('当匹配到监狱名时，返回其对应的监狱ID。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency = sinon.spy(vm, "getPrisonDepartInfo")
    vm.prisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm.prisonName = "星城监狱"
    Vue.nextTick(() => {
      expect(vm.prisonId).to.equal(5)
      expect(departFrequency.callCount).to.equal(1)
    })
    done()
  })

  it('监狱名为空时，返回监狱ID值为空。监狱名未变化，不调用获取监区方法', (done) => {
    let departFrequency2 = sinon.spy(vm2, "getPrisonDepartInfo")
    vm2.prisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm2.prisonName = ""
    Vue.nextTick(() => {
      expect(vm2.prisonId).to.equal("")
      expect(departFrequency2.callCount).to.equal(0)
    })
    done()
  })

  it('当未匹配到监狱名且不为空时，监狱ID返回-1。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency3 = sinon.spy(vm3, "getPrisonDepartInfo")
    vm3.prisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm3.prisonName = "长沙监"
    Vue.nextTick(() => {
      expect(vm3.prisonId).to.equal(-1)
      expect(departFrequency3.callCount).to.equal(1)
    })
    done()
  })

})

describe('CriminalChangePrison.vue 输入单个转至监狱名对应到转至监狱ID watch toPrisonName()', () => {
  const vm = new Vue(CriminalChangePrison).$mount()
  const vm2 = new Vue(CriminalChangePrison).$mount()
  const vm3 = new Vue(CriminalChangePrison).$mount()

  it('当匹配到监狱名时，返回其对应的监狱ID。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency = sinon.spy(vm, "getToPrisonDepartInfo")
    vm.toPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm.toPrisonName = "星城监狱"
    Vue.nextTick(() => {
      expect(vm.toPrisonId).to.equal(5)
      expect(departFrequency.callCount).to.equal(1)
    })
    done()
  })

  it('监狱名为空时，返回监狱ID值为空。监狱名未变化，不调用获取监区方法', (done) => {
    let departFrequency2 = sinon.spy(vm2, "getToPrisonDepartInfo")
    vm2.toPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm2.toPrisonName = ""
    Vue.nextTick(() => {
      expect(vm2.toPrisonId).to.equal("")
      expect(departFrequency2.callCount).to.equal(0)
    })
    done()
  })

  it('当未匹配到监狱名且不为空时，监狱ID返回-1。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency3 = sinon.spy(vm3, "getToPrisonDepartInfo")
    vm3.toPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm3.toPrisonName = "长沙监"
    Vue.nextTick(() => {
      expect(vm3.toPrisonId).to.equal(-1)
      expect(departFrequency3.callCount).to.equal(1)
    })
    done()
  })

})

describe('CriminalChangePrison.vue 输入批量转至监狱名对应到转至监狱ID watch toAllPrisonName()', () => {
  const vm = new Vue(CriminalChangePrison).$mount()
  const vm2 = new Vue(CriminalChangePrison).$mount()
  const vm3 = new Vue(CriminalChangePrison).$mount()

  it('当匹配到监狱名时，返回其对应的监狱ID。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency = sinon.spy(vm, "getToPrisonDepartInfo")
    vm.allPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm.toAllPrisonName = "星城监狱"
    Vue.nextTick(() => {
      expect(vm.toPrisonId).to.equal(5)
      expect(departFrequency.callCount).to.equal(1)
    })
    done()
  })

  it('监狱名为空时，返回监狱ID值为空。监狱名未变化，不调用获取监区方法', (done) => {
    let departFrequency2 = sinon.spy(vm2, "getToPrisonDepartInfo")
    vm2.allPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm2.toAllPrisonName = ""
    Vue.nextTick(() => {
      expect(vm2.toPrisonId).to.equal("")
      expect(departFrequency2.callCount).to.equal(0)
    })
    done()
  })

  it('当未匹配到监狱名且不为空时，监狱ID返回-1。监狱名改变，调用一次获取监区方法', (done) => {
    let departFrequency3 = sinon.spy(vm3, "getToPrisonDepartInfo")
    vm3.allPrisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
    vm3.toAllPrisonName = "长沙监"
    Vue.nextTick(() => {
      expect(vm3.toPrisonId).to.equal(-1)
      expect(departFrequency3.callCount).to.equal(1)
    })
    done()
  })

})

describe('CriminalChangePrison.vue 根据监狱ID加载监区列表 getPrisonDepartInfo ()', () => {
  const vm = new Vue(CriminalChangePrison).$mount()
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
        data: [{"id": 1, "prisonDepartmentName": "一监区"}],
        code: 0
      }
    })
    vm.getPrisonDepartInfo()
    expect(promiseCall.calledWithMatch('prisoner/getDepartments', {params: {"prisonId": 2}})).to.equal(true)
    expect(vm.prisonDepartments).to.have.lengthOf(1)
    expect(vm.prisonDepartments[0]).to.eql({"id": 1, "prisonDepartmentName": "一监区"})
  })

  it('DOM层：调用获取监区列表成功后 监区列表正确,默认选中为全部', (done) => {
    Vue.nextTick(() => {
      let prisonDepartmentId = vm.$el.querySelectorAll("#prisonDepartmentId option");
      expect(prisonDepartmentId).to.have.lengthOf(2)
      expect(prisonDepartmentId.item(0).textContent).to.equal("全部")
      expect(prisonDepartmentId.item(0).getAttribute("value")).to.equal("")
      expect(prisonDepartmentId.item(1).textContent).to.include("一监区")
      expect(prisonDepartmentId.item(1).getAttribute("value")).to.equal("1")
    })
    done()
  })
})

describe('CriminalChangePrison.vue 根据转至监狱ID加载监区列表 getToPrisonDepartInfo ()', () => {
  const vm = new Vue(CriminalChangePrison).$mount()
  let promiseCall

  beforeEach(() => {
    promiseCall = sinon.stub(axios, 'get').returnsPromise()
  })

  afterEach(() => {
    axios.get.restore()
  })

  it('数据层：调用获取监区列表应该传值正确的监狱ID，成功后prisonDepartments toDepartmentId toPrisonDepartmentId正确', () => {
    vm.toPrisonId = 2
    promiseCall.resolves({
      data: {
        data: [{"id": 1, "prisonDepartmentName": "一监区"},{"id": 3, "prisonDepartmentName": "四监区"}],
        code: 0
      }
    })
    vm.getToPrisonDepartInfo ()

    expect(promiseCall.calledWithMatch('prisoner/getDepartments', {params: {"prisonId": 2}})).to.equal(true)
    expect(vm.toPrisonDepartments).to.have.lengthOf(2)
    expect(vm.toPrisonDepartments[0]).to.eql({"id": 1, "prisonDepartmentName": "一监区"})
    expect(vm.toPrisonDepartments[1]).to.eql({"id": 3, "prisonDepartmentName": "四监区"})
    expect(vm.toDepartmentId).to.equal(1)
    expect(vm.toPrisonDepartmentId).to.equal(1)
  })

  it('DOM层：调用获取监区列表成功后 监区列表正确,批量转监和单个转监的监区ID默认为第一项', (done) => {
    Vue.nextTick(() => {
      let toPrisonDepartmentId = vm.$el.querySelectorAll("#toPrisonDepartmentId option")
      let toDepartmentId = vm.$el.querySelectorAll("#toDepartmentId option")

      expect(toPrisonDepartmentId).to.have.lengthOf(2)
      expect(toPrisonDepartmentId).to.have.lengthOf(2)
      expect(toPrisonDepartmentId.item(0).textContent).to.equal("一监区")
      expect(toPrisonDepartmentId.item(0).getAttribute("value")).to.equal("1")
      expect(toPrisonDepartmentId.item(1).textContent).to.include("四监区")
      expect(toPrisonDepartmentId.item(1).getAttribute("value")).to.equal("3")

      expect(toDepartmentId.item(0).textContent).to.equal("一监区")
      expect(toDepartmentId.item(0).getAttribute("value")).to.equal("1")
      expect(toDepartmentId.item(1).textContent).to.include("四监区")
      expect(toDepartmentId.item(1).getAttribute("value")).to.equal("3")
 
    })
    done()
  })
})

describe('CriminalChangePrison.vue 罪犯信息列表获取 criminalSearch()',()=>{
	const vm = new Vue(CriminalChangePrison).$mount()
  let axiosFrequency

	beforeEach(() => {
		axiosFrequency = sinon.spy(axios,"get")
		vm.prisonName = "星城监狱"
		vm.prisonDepartmentId = 2
		vm.status = 1
		vm.name = "    大卫"
		vm.number = "  123456 "
		vm.archivesNumber = " 322223344    "
		vm.indexPage = "5"
		vm.prisons = [{"id": 1, "prisonName": "长沙监狱"}, {"id": 5, "prisonName": "星城监狱"}]
	})

	afterEach(()=>{
		axios.get.restore()
	})

  it ('搜索传值应该准确',(done) =>{
		vm.criminalSearch(3)

		let callUrl = axiosFrequency.getCall(0).args[0]
		let callParams = axiosFrequency.getCall(0).args[1].params
		
		expect(axiosFrequency.callCount).to.equal(1)
		expect(callUrl).to.equal('prisoner/getPrisoners')
    expect(callParams.type).to.equal(1)
		expect(callParams.prisonId).to.equal(5)
		expect(callParams.prisonDepartmentId).to.equal(2)
		expect(callParams.status).to.equal(1)
		expect(callParams.name).to.equal("大卫")
		expect(callParams.number).to.equal("123456")
		expect(callParams.archivesNumber).to.equal("322223344")
		expect(callParams.indexPage).to.equal(3)
		expect(callParams.pageSize).to.equal(10)

		done()
	})

})

describe('罪犯列表数据展示与修改删除操作 deletePrisoner()',()=>{
	const vm = new Vue(CriminalChangePrison).$mount()
	const vm2 = new Vue(CriminalChangePrison).$mount()
	const vm3 = new Vue(CriminalChangePrison).$mount()

	const prisonerInfo = [{
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
			enabled:0,
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

	describe('罪犯列表页面展示正确',()=>{

		beforeEach(()=>{
			vm.prisonerList = prisonerInfo
			
		})

		it ('列表数据展示正确',(done) =>{
			Vue.nextTick(()=> {
				let prisoners = vm.$el.querySelectorAll(".ic-table tbody tr")
				let name =vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(2)").textContent
				let number = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(3)").textContent
				let archivesNumber = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(4)").textContent
				let address = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(5)").textContent
				let cardNo = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(6)").textContent
				let prisonName = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(7)").textContent
				let prisonDepartmentName = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(8)").textContent
				let status = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(9)").textContent
        let applyStatus = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(10)").textContent
				let intoPrisonDate = vm.$el.querySelector(".ic-table tbody tr:nth-child(1) td:nth-child(11)").textContent
			

				expect(prisoners).to.have.lengthOf(2)
				expect(name).to.equal("测试000")
				expect(number).to.equal("43450115899")
				expect(archivesNumber).to.equal("43450115899")
				expect(address).to.equal("长沙市金星路")
				expect(cardNo).to.equal("420581188503121767")
				expect(prisonName).to.equal("长沙监狱")
				expect(prisonDepartmentName).to.include("收押中心")
				expect(status).to.equal("在监")
        expect(applyStatus).to.equal("未申请")
				expect(intoPrisonDate).to.equal("2017-04-20 ")

			})
			done()
		})

		beforeEach(()=>{
			vm.prisonerSize = 10
			vm.pageSize = 2
			vm.indexPage = 2
		})

		it ('数据超过一页出现分页，每页显示2条数据，共5页，当前为第2页',(done) =>{
			Vue.nextTick(()=> {
				let prisoners = vm.$el.querySelectorAll(".ic-table tbody tr")
				let prisonersSize = vm.$el.querySelector(".form-footer p").textContent

				expect(prisoners).to.have.lengthOf(2)
				expect(prisonersSize).to.equal("共有10条信息")

				//expect(page.innerHTML).to.not.empty

			})
			done()
		})
	})

	// describe('列表操作显示正确',()=>{

	// 	beforeEach(()=>{
	// 		vm.prisonerList = prisonerInfo
			
	// 	})

	// 	it ('单个转监狱操作显示正确，点击转监狱显示确认弹出框',(done) =>{
	// 		  let delCriminalConfirm = vm.$el.querySelector("#delCriminalConfirm")
  //       let modalFrequency = sinon.spy($(delCriminalConfirm),"modal")
  //       Vue.nextTick(()=> {
  //         let deleteLink = vm.$el.querySelectorAll(".delete-link").item(0)

  //         expect(deleteLink.textContent).to.equal("转监狱")
  //         expect(deleteLink.getAttribute("id")).to.equal("44")
  //         vm.deletePrisoner(deleteLink)
  //         expect(vm.currentId).to.equal("44")
  //       //  expect(modalFrequency.callCount).to.equal(1)
  //       })

	// 		  done()
	// 	})

	// 	let axiosSpy

	// 	beforeEach(() => {
	// 		 axiosSpy = sinon.spy(axios, 'post')
	// 	})

	// 	afterEach(() => {
	// 		 axios.post.restore()
	// 	})

	// 	it ('确认删除,传值为删除罪犯ID应该正确',(done) =>{
	// 		vm.currentId = 2
	// 		vm.deleteConfirm()

	// 		expect(axiosSpy.callCount).to.equal(1)
	// 		expect(axiosSpy.getCall(0).args[0]).to.equal('prisoner/deletePrisoner')
	// 		expect(axiosSpy.getCall(0).args[1]).to.equal('prisonerId=2')
	// 	  done()
	// 	})

  // })
	// describe('列表操作调用axios正确',()=>{
	// 	let promiseCall
	// 	let listFrequency

	// 	beforeEach(() => {
	// 		 promiseCall = sinon.stub(axios, 'post').returnsPromise()
	// 		 listFrequency = sinon.spy(vm,'CriminalChangePrison')
	// 		 vm.indexPage = 3
	// 	})

	// 	afterEach(() => {
	// 		axios.post.restore()
	// 		vm.CriminalChangePrison.restore()
	// 	})

	// 	it ('确认删除成功后，调用成功提示框并重新加载罪犯列表页',(done) =>{
	// 		promiseCall.resolves({
	// 			data: {
	// 				code: 0,
	// 				msg: "删除罪犯信息成功"
	// 			}
	// 		})
	// 		vm.deleteConfirm()

  // 		expect(vm.remind).to.eql({status: 'success',msg: "删除罪犯信息成功"})
	// 		expect(listFrequency.withArgs(3).callCount).to.equal(1)

	// 		Vue.nextTick(()=> {
	// 			let remindConfirm = vm.$el.querySelector("#remindConfirm")
	// 			expect(remindConfirm).to.exist
	// 		})

	// 	  done()
	// 	})

  //   it ('确认删除失败后，调用失败提示框不重新加载罪犯列表页',(done) =>{
	// 		promiseCall.resolves({
	// 			data: {
	// 				code: 9999,
	// 				msg: "罪犯不能删除！"
	// 			}
	// 		})
	// 		vm.deleteConfirm()
			
  // 		expect(vm.remind).to.eql({status: 'failed',msg: "罪犯不能删除！"})
	// 		expect(listFrequency.withArgs(3).callCount).to.equal(0)

	// 		Vue.nextTick(()=> {
	// 			let remindConfirm = vm.$el.querySelector("#remindConfirm")
	// 			expect(remindConfirm).to.exist
	// 		})
			
	// 	  done()
	// 	})

	// })	
	
})


