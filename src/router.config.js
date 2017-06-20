import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Examine from './components/Examine.vue'
import Delivery from './components/Delivery.vue'
import Cancel from './components/Cancel.vue'
import Management from './components/Management.vue'
import Virtual_Account_Add from './components/Virtual_Account_Add.vue'
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
import BankAccountModify from './components/fundManagement/Bank_Account_Modify.vue'
import BankAccountAdd from './components/fundManagement/Bank_Account_Add.vue'
import FundDetail from './components/fundManagement/Fund_Detail.vue'
import TransferApplication from './components/fundManagement/Transfer_Application.vue'
import TransferExamine from './components/fundManagement/Transfer_Examine.vue'
import AccountModify from './components/fundManagement/Account_Modify.vue'
import FundDistribution from './components/fundManagement/Fund_Distribution.vue'
import CriminalFundLimit from './components/criminalFundManagement/Criminal_Fund_Limit.vue'
import PrisonAreaLimit from './components/criminalFundManagement/Prison_Area_Limit.vue'
import PrisonLimit from './components/criminalFundManagement/Prison_Limit.vue'
import CriminalFundDetail from './components/criminalFundManagement/Criminal_Fund_Detail.vue'
import CFD_AddCriminal from './components/criminalFundManagement/CFD_Add_Criminal.vue'
import CriminalFundDistribution from './components/criminalFundManagement/Criminal_Fund_Distribution.vue'
import CashOut from './components/criminalFundManagement/Cash_Out.vue'
import CashOutExamine from './components/criminalFundManagement/Cash_Out_Examine.vue'
import SetLevelLimit from './components/criminalFundManagement/Set_Level_Limit.vue'
import Consumption from './components/consumption/Consumption.vue'
import Capital_Composition from './components/statistics/Capital_Composition.vue'
import Income_Expenditure from './components/statistics/Income_Expenditure.vue'
import Balance from './components/statistics/Balance.vue'
import Related_Bank_Account from './components/fundManagement/Related_Bank_Account.vue'

export default [
	{
		path:'/login',
		component:Login
	},
	{
		path:'/welcome',
		component: Welcome
	},
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
		path:'/virtual_account_add',
		component:Virtual_Account_Add
	},
	{
		path:'/application',
		component:Application
	},
	{
		path:'/menu_management',
		component:MenuManagement,
		children:[{
			path:'/menu_management/edit/:id',
			component:MenuAdd
		}]
	},
	{
		path:'/role_management',
		component:RoleManagement,
		children:[{
			path:'/role_management/edit/:id',
			component:RoleAdd
		}]
	},
	{
		path:'/trader_management',
		component:TraderManagement
	},
	{
		path:'/user_management',
		component:UserManagement,
		children:[{
			path:'/user_management/edit/:id',
			component:UserAdd
		}]
	},
	{
		path:'/menu_add/:firstMenuId?',
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
		component: Criminal_Search,
		children:[{
			path:'/crimsearch/edit/:id',
			component:Criminal_Add
		}]
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
		path:'/account_modify/:prisonId/:prisonDepartmentId/:accountName/:accountType/:prisonAccountId',
		component:AccountModify
	},
	{
		path:'/bank_account_management',
		component:BankAccountManagement
	},
	{
		path:'/bank_account_modify/:bankAccountId',
		component:BankAccountModify
	},
	{
		path:'/bank_account_add',
		component:BankAccountAdd
	},
	{
		path:'/related_bank_account/:prisonAccountId',
		component:Related_Bank_Account
	},
	{
		path:'/fund_detail',
		component:FundDetail
	},
	{
		path:'/fund_distribution',
		component:FundDistribution
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
		path:'/criminal_fund_detail',
		component:CriminalFundDetail
	},
	{
		path:'/cfd_add_criminal/:prisonId/:prisonCapitalAssignId/:type/:money',
		component:CFD_AddCriminal
	},
	{
		path:'/criminal_fund_distribution',
		component:CriminalFundDistribution
	},
	{
		path:'/cash_out',
		component:CashOut
	},
	{
		path:'/cash_out_examine',
		component:CashOutExamine
	},
	{
		path:'/consumption',
		component:Consumption
	},
	{
		path:'/capital_composition',
		component:Capital_Composition
	},
	{
		path:'/income_expenditure',
		component:Income_Expenditure
	},
	{
		path:'/balance',
		component:Balance
	},
  {
    path:'/set_level_limit',
    component:SetLevelLimit
  },
	{
		path:'*',
		redirect:'/login'
	}
]
