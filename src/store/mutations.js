import getters from './getters'
//状态参数
const state = {
	loading:false,
	remind:false,
	logout:false,
	sideReload:false
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
	},

	//显示logout
	showLogout(state){
		state.logout = true;
	},

	//隐藏logout
	hideLogout(state){
		state.logout = false;
	},

    //重载侧边栏
	reloadSide(state){
		state.sideReload = !state.sideReload;
	}

	

}

export default {
	state,
	mutations,
	getters
}