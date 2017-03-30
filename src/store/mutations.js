
const state = {
	loading:false,
	selectAll:true,
}

const mutations = {
	showLoading(state){
		state.loading = true;
	},
	hideLoading(state){
		state.loading = false;
	},
	confirmSelectAll(state){
		state.selectAll = true;
	},
	cancelSelectAll(state){
		state.selectAll = false;
	}
}

const getters = {
	loadingShow(state){
		return state.loading;
	},
	selectAll(state){
		return state.selectAll;
	}
}

export default {
	state,
	mutations,
	getters
}