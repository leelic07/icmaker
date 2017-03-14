import Examine from './components/Examine.vue'
import Delivery from './components/Delivery.vue'
import Cancel from './components/Cancel.vue'
import Management from './components/Management.vue'
import Application from './components/Application.vue'
import MenuManagement from './components/SystemManagement/Menu_Management.vue'
import RoleManagement from './components/SystemManagement/Role_Management.vue'
import TraderManagement from './components/SystemManagement/Trader_Management.vue'
import UserManagement from './components/SystemManagement/User_Management.vue'
import MenuAdd from './components/SystemManagement/Menu_Add.vue'
import RoleAdd from './components/SystemManagement/Role_Add.vue'
import UserAdd from './components/SystemManagement/User_Add.vue'
import Criminal_Add from './components/criminalManagement/Criminal_Add.vue'
import Criminal_Search from './components/criminalManagement/Criminal_Search.vue'
import Criminal_Examine from './components/criminalManagement/Criminal_Examine.vue'
import Criminal_Examine_Ward from './components/criminalManagement/Criminal_Examine_Ward.vue'
import Criminal_Examine_Prison from './components/criminalManagement/Criminal_Examine_Prison.vue'
import Criminal_Change from './components/criminalManagement/Criminal_Change.vue'
import Criminal_Change_Ward from './components/criminalManagement/Criminal_Change_Ward.vue'
import Criminal_Change_Prison from './components/criminalManagement/Criminal_Change_Prison.vue'
import AccountManagement from './components/fundManagement/Account_Management.vue'
import AccountAdd from './components/fundManagement/Account_Add.vue'
import BankAccountManagement from './components/fundManagement/Bank_Account_Management.vue'
import FundDetail from './components/fundManagement/Fund_Detail.vue'
import TransferApplication from './components/fundManagement/Transfer_Application.vue'
import TransferExamine from './components/fundManagement/Transfer_Examine.vue'
import CriminalFundLimit from './components/criminalFundManagement/Criminal_Fund_Limit.vue'
import PrisonAreaLimit from './components/criminalFundManagement/Prison_Area_Limit.vue'
import PrisonLimit from './components/criminalFundManagement/Prison_Limit.vue'

export default [
	{
		path:'/examine',
		component:Examine
	},
	{
		path:'/delivery',
		component:Delivery
	},
	{
		path:'/cancel',
		component:Cancel
	},
	{
		path:'/management',
		component:Management
	},
	{
		path:'/application',
		component:Application
	},
	{
		path:'/menu_management',
		component:MenuManagement
	},
	{
		path:'/role_management',
		component:RoleManagement
	},
	{
		path:'/trader_management',
		component:TraderManagement
	},
	{
		path:'/user_management',
		component:UserManagement
	},
	{
		path:'/menu_add',
		component:MenuAdd
	},
	{
		path:'/role_add',
		component:RoleAdd
	},
	{
		path:'/user_add',
		component:UserAdd
	},
	{
		path:'/crimadd',
		component: Criminal_Add
	},
	{
		path:'/crimsearch',
		component: Criminal_Search
	},
	{
		path:'/crimexamine',
		component: Criminal_Examine,
		children: [
			{
				path:'/crimexamine/ward',
				component: Criminal_Examine_Ward
			},
			{
				path:'/crimexamine/prison',
				component: Criminal_Examine_Prison
			}
		]
	},
	{
		path:'/crimchange',
		component: Criminal_Change,
		children: [
			{
				path:'/crimchange/ward',
				component: Criminal_Change_Ward
			},
			{
				path:'/crimchange/prison',
				component: Criminal_Change_Prison
			}
		]
	},
	{
		path:'/account_management',
		component:AccountManagement
	},
	{
		path:'/account_add',
		component:AccountAdd
	},
	{
		path:'/bank_account_management',
		component:BankAccountManagement
	},
	{
		path:'/fund_detail',
		component:FundDetail
	},
	{
		path:'/transfer_application',
		component:TransferApplication
	},
	{
		path:'/transfer_examine',
		component:TransferExamine
	},
	{
		path:'/criminal_fund_limit',
		component:CriminalFundLimit
	},
	{
		path:'/prison_area_limit',
		component:PrisonAreaLimit
	},
	{
		path:'/prison_limit',
		component:PrisonLimit
	},
	{
		path:'*',
		redirect:'/examine'
	}
]