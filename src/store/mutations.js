import getters from './getters'
//状态参数
const state = {
	loading:false,
	remind:false
}

//设置状态
const mutations = {
	//显示loading
	showLoading(state){
		state.loading = true;
	},

	//隐藏loading
	hideLoading(state){
		state.loading = false;
	},

	//显示remind
	showRemind(state){
		state.remind = true;
	},

	//隐藏remind
	hideRemind(state){
		state.remind = false;
	}
}


// //获取状态
// const getters = {
// 	//返回loading的状态
// 	loadingShow(state){
// 		return state.loading;
// 	},

// 	//返回remind的状态
// 	remindShow(state){
// 		return state.remind;
// 	}
// }

export default {
	state,
	mutations,
	getters
}