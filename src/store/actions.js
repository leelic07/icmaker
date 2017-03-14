export default {
	showLoading:({commit})=>{
		commit('showLoading');
	},
	hideLoading:({commit})=>{
		commit('hideLoading');
	},
	cancelSelectAll:({commit})=>{
		commit('cancelSelectAll');
	}
}