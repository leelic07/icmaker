import Vue from 'vue'
import Filters from '@/filters'
import BankAccountManagement from '@/components/fundManagement/Bank_Account_Management'

//声明过滤器
Object.keys(Filters).forEach((key)=>Vue.filter(key,Filters[key]));

//属性测试
describe('Bank_Account_Management.vue 属性测试',() => {
	it('银行账户名称',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountName).to.equal('')
	});

	it('银行账户编号',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankNo).to.equal('')
	});

	it('银行id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankId).to.equal('')
	});

	it('监狱银行账户id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonBankAccountId).to.equal('')
	});

	it('同行/跨行',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.isSameBank).to.equal('')
	});

	it('对公/对私',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.isPublic).to.equal('')
	});

	it('银行列表',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.banks.toString()).to.equal([].toString())
	});

	it('监狱账户id',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.prisonAccountId).to.equal('')
	});

	it('银行账户列表',() => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		expect(vm.bankAccountList.toString()).to.equal([].toString())
	});
});


//异步更新DOM
describe('Bank_Account_Management.vue 异步更新DOM',() => {
	it('bankAccountName改变 input变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.bankAccountName = '李国栋'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankAccountName = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(1) input')
			expect(bankAccountName.value).to.equal('李国栋')
			done()
		});
	});

	it('bankNo改变 input变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.bankNo = '654789321456'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankNo = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(2) input')
			expect(bankNo.value).to.equal('654789321456')
			done()
		});
	});

	it('bankId改变 select变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.banks = [{
			id:'1',
			bankName:'中国邮政储蓄银行'
		},
		{
			id:'2',
			bankName:'建设银行'
		}]
		vm.bankId = '1'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankId = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select')
			let bank = vm.$el.querySelector('.search-inner-box>div:nth-child(1)>div:nth-child(3) select option:nth-child(2)')
			expect(bankId.value).to.equal('1')
			expect(bank.textContent).to.equal('中国邮政储蓄银行')
			done()
		});
	});

	it('bankAccountNo改变 input变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.bankAccountNo = '6523147896543216'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let bankAccountNo = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(1) input')
			expect(bankAccountNo.value).to.equal('6523147896543216')
			done()
		});
	});

	it('isSameBank改变 select变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.isSameBank = '0'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let isSameBank = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(2) select')
			let isSameBankOption = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(2) select option:nth-child(2)')
			expect(isSameBank.value).to.equal('0')
			expect(isSameBankOption.textContent).to.equal('跨行')
			done()
		});
	});

	it('isPublic改变 select变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.isPublic = '0'

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let isPublic = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(3) select')
			let isPublicOption = vm.$el.querySelector('.search-inner-box>div:nth-child(2)>div:nth-child(3) select option:nth-child(2)')
			expect(isPublic.value).to.equal('0')
			expect(isPublicOption.textContent).to.equal('对公付款')
			done()
		});
	});

	it('bankAccountList改变 table变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.bankAccountList = [{
			prisonBankAccountId:'1',
			bankAccountId:'1',
			bankAccountName:'李金',
			bankAccountNo:'6523147896543216',
			bankNo:'454789321456',
			bankName:'建设银行',
			isSameBank:'0',
			isPublic:'0'
		}];

		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let id = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(1)')
			let bankAccountName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
			let bankAccountNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
			let bankNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
			let bankName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')
			let isSameBank = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(6)')
			let isPublic = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(7)')

			expect(id.getAttribute('id')).to.equal('1')
			expect(bankAccountName.textContent).to.equal('李金')
			expect(bankAccountNo.textContent).to.equal('6523147896543216')
			expect(bankNo.textContent).to.equal('454789321456')
			expect(bankName.textContent).to.equal('建设银行')
			expect(isSameBank.textContent).to.equal('跨行')
			expect(isPublic.textContent).to.equal('对公付款')
			done()
		});

	});

	it('bankAccountList改变 table变化',done => {
		const Constructor = Vue.extend(BankAccountManagement)
		const vm = new Constructor().$mount()
		vm.bankAccountList = [{
			bankAccountId:'1',
			bankAccountName:'琳琳',
			bankAccountNo:'6523147896543216',
			bankNo:'454789321456',
			bankId:'2',
			isSameBank:'1',
			isPublic:'1'
		}];
		// 在状态改变后和断言 DOM 更新前等待一刻
		Vue.nextTick(() => {
			let id = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(1)')
			let bankAccountName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(2)')
			let bankAccountNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(3)')
			let bankNo = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(4)')
			let bankName = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(5)')
			let isSameBank = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(6)')
			let isPublic = vm.$el.querySelector('#table_id_example tbody tr td:nth-child(7)')

			expect(id.getAttribute('id')).to.equal('1')
			expect(bankAccountName.textContent).to.equal('琳琳')
			expect(bankAccountNo.textContent).to.equal('6523147896543216')
			expect(bankNo.textContent).to.equal('454789321456')
			expect(bankName.textContent).to.equal('平安银行')
			expect(isSameBank.textContent).to.equal('同行')
			expect(isPublic.textContent).to.equal('对私付款')
			done()
		});
	});

});
