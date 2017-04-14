
//获取状态
export default {
	//返回loading的状态
	loadingShow(state){
		return state.loading;
	},

	//返回remind的状态
	remindShow(state){
		return state.remind;
	},

	//返回logout的状态
	logoutShow(state){
		return state.logout;
	},

	//返回sideReload的状态
	sideReload(state){
		return state.sideReload;
	},

	//返回loginLoading的状态
	loginLoadingShow(state){
		return state.loginLoading;
	}
}