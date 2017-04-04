export default {
	showLoading:({commit})=>{
		commit('showLoading');
	},
	hideLoading:({commit})=>{
		commit('hideLoading');
	},
	showRemind:({commit})=>{
		commit('showRemind');
	},
	hideRemind:({commit})=>{
		commit('hideRemind');
	}
}