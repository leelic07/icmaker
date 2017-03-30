
export default{
	//金钱过滤器
	currency(total){
		if(total){
			total = total/100;
			return total;
		}
	},

	//账户类型过滤器
	accountType(accountType){
		if(accountType && accountType == 0){
			return '财务账户'
		}else{
			return '商户账户'
		}
	},

	//IC卡状态
	formatIcStatus(value){
		let status = "";
		switch(Number(value))
		{
		case 0 :
			status = "正常使用";
			break;
		case 1 :
			status = "已挂失";
			break;
		case 2 :
			status = "已销卡";
			break;
		default :
			status = "";
		}
		return status;
	},

    //申请状态过滤器
	formatEnabled(value){
		let status = "";
		switch(Number(value))
		{
		case 0 :
			status = "已申请";
			break;
		case 1 :
			status = "未申请";
			break;
		default :
			status = "";
		}
		return status;
	},

    //审核状态过滤器
	formatExamStatus(value) {
		let status = "";
		switch(Number(value))
		{
		case 0 :
			status = "审核中";
			break;
		case 1 :
			status = "审核成功";
			break;
		case 2 :
			status = "审核失败";
			break;
		default :
			status = "";
		}
		return status;	
	},

    //在监状态过滤器
	formatStatus(value) {
		let status = "";
		switch(Number(value))
		{
		case 0 :
			status = "离监";
			break;
		case 1 :
			status = "在监";
			break;
		default :
			status = "";
		}
		return status;
	},

    //账户类型过滤器
	formatUserType(value) {
		let userType = "";
		switch(Number(value))
		{
		case 0 :
			userType = "平台";
			break;
		case 1 :
			userType = "监狱局";
			break;
		case 2 :
			userType = "监狱科室";
			break;
		case 3 :
			userType = "监狱商户";
			break;
		default :
			userType = "";
		}
		return userType;
	},

    //菜单类别过滤器
	formatMenuType(value) {
		let menuType = "";
		switch(Number(value))
		{
		case 0 :
			menuType = "一级菜单";
			break;
		case 1 :
			menuType = "二级菜单";
			break;
		default :
			menuType = "";
		}
		return menuType;
	},

	//菜单列表是否启用过滤器
	formatIsEnable(value) {
		let isEnable = "";
		switch(value)
		{
		case 0 :
			isEnable = "禁用";
			break;
		case 1 :
			isEnable = "启用";
			break;
		default :
			isEnable = "";
		}
		return isEnable;
	},

	//时间戳转日期格式过滤器
	formatDate(value) {
		//日期中补零函数
		let buling = value => {
			value = 1*value;
			if (value < 10){
				value = '0' + value;
			}
			return value;
		};
		if (value == null) {
			return null;
		}else {
			let now=new Date(value);
			let year=now.getFullYear();     
			let month=buling(now.getMonth()+1);     
			let date=buling(now.getDate()); 
			let hour=buling(now.getHours());
			let minute=buling(now.getMinutes());
			let second=buling(now.getSeconds());
			return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
		}
	}
}