import Validate from '../../static/js/validate.js'
export default{
	//金钱过滤器
	currency(total){
		if(total == null || total == undefined){
			return 0;
		}else{
			total = total/100;
			return total;
		}
	},

	//配置消费额度金额过滤器
	setCurrency(total){
		total = total + "";
		if(total == "null" || total == "undefined" || total == ""){
			return "";
		}if (total == "0") {
			return 0;
		}else{
			total = total/100;
			return total;
		}
	},

	//账户类型过滤器
	accountType(accountType){
		if(accountType == 0){
			return '财务账户';
		}else if(accountType == 1){
			return '商户账户';
		}else if(accountType == 2){
			return '监狱总账户';
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
	},

	formatPrisonDate(value) {
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
			return year+"-"+month+"-"+date+" ";
		}
	},

	//虚拟账号状态
	formatAccountStatus(value) {
		let accountStatus = "";
		switch(Number(value))
		{
		case 1 :
			accountStatus = "可用";
			break;
		case 2 :
			accountStatus = "已绑定";
			break;
		default :
			accountStatus = "";
		}
		return accountStatus;
	},

	formatAccountType(value) {
		let accountType = "";
		switch(Number(value))
		{
		case 0 :
			accountType = "罪犯虚拟银行";
			break;
		case 1 :
			accountType = "监狱虚拟银行";
			break;
		case 2 :
			accountType = "监狱局";
			break;
		default :
			accountType = "";
		}
		return accountType;
	},

	//类型过滤器
	isSameBank(isSame){
		if(isSame == '0'){
			return '跨行';
		}else if(isSame == '1'){
			return '同行';
		}
	},
	
	//公私标识过滤器
	isPublic(isPublic){
		if(isPublic == '0'){
			return '对公付款';
		}else if(isPublic == '1'){
			return '对私付款';
		}
	},

	//银行过滤器
	bank(bankId){
		if(bankId == '1'){
			return '建设银行';
		}else if(bankId == '2'){
			return '平安银行';
		}else if(bankId == '3'){
			return '招商银行';
		}else if(bankId == '4'){
			return '邮储储蓄银行';
		}
	},

	//申请状态
	formatApplyStatus(value) {
		let applyType = "";
		switch(Number(value))
		{
		case 0 :
			applyType = "未制卡";
			break;
		case 1 :
			applyType = "正在制卡";
			break;
		case 2 :
			applyType = "已制卡";
			break;
		case 3 :
			applyType = "拒绝制卡";
			break;
		case 4 :
			applyType = "拒绝补卡";
			break;
		default :
			applyType = "";
		}
		return applyType;
	},

	//发卡状态
	formatDeliveryStatus(value) {
		let deliveryType = "";
		switch(Number(value))
		{
		case 0 :
			deliveryType = "未绑定";
			break;
		case 1 :
			deliveryType = "已绑定虚拟账户";
			break;
		case 2 :
			deliveryType = "已绑定IC卡";
			break;
		default :
			deliveryType = "";
		}
		return deliveryType;
	},

	//补卡状态
	formatExmineStatus(value) {
		let exmineType = "";
		switch(Number(value))
		{
		case 0 :
			exmineType = "制卡";
			break;
		case 1 :
			exmineType = "补卡";
			break;
		default :
			exmineType = "";
		}
		return exmineType;
	},

	//类型过滤器
	isSameBank(isSame){
		if(isSame == '0'){
			return '跨行';
		}else if(isSame == '1'){
			return '同行';
		}
	},
	
	//公私标识过滤器
	isPublic(isPublic){
		if(isPublic == '0'){
			return '对公付款';
		}else if(isPublic == '1'){
			return '对私付款';
		}
	},

	//银行过滤器
	bank(bankId){
		if(bankId == '1'){
			return '建设银行';
		}else if(bankId == '2'){
			return '平安银行';
		}else if(bankId == '3'){
			return '招商银行';
		}
	},

	//监狱资金分配类别过滤器
	distributionType(type){
		if(type == 0){
			return '低报酬';
		}else if(type == 1){
			return 'IC卡资金'
		}
	},


   //资金明细类别
	formatFundType(value) {
		let fundType = "";
		switch(Number(value))
		{
		case 0 :
			fundType = "刷卡消费";
			break;
		case 1 :
			fundType = "取现";
			break;
		case 2 :
			fundType = "制卡费";
			break;
		case 3 :
			fundType = "家属汇款";
			break;
		case 4 :
			fundType = "低报酬";
			break;
		case 5 :
			fundType = "IC卡资金";
			break;
		default :
			fundType = "";
		}
		return fundType;
	},

	//罪犯资金分配类别过滤器
	locationType(type){
		let locationTye = '';
		switch(type){
			case 0 :
				locationTye = '低报酬';
				break;
			case 1 :
				locationTye = 'IC卡资金'
				break;
		}
		return locationTye;
	},

	formatInteger(value) {
		if (value != "") {
			let  integer = Math.floor(value/100);
			return integer;
		}else {
			return '0';
		}
	},

	formatDecimal(value) {
		if (value != "") {
			let decimal = (value/100 - Math.floor(value/100)).toFixed(2).split(".");
		    return '.' + decimal[1];
		}else {
			return '.00';
		}
		
	},

	//监狱资金管理--资金明细--状态过滤器
	fundDetailStatus(status){
		let fundStatus = '';
		switch(status){
			case 0 :
				fundStatus =  '审核中';
				break;
			case 1 :
				fundStatus = '处理中';
				break;
			case 2 :
				fundStatus = '审核拒绝';
				break;
			case 3 :
				fundStatus = '交易成功';
				break;
			case -1 :
				fundStatus = '交易失败';
				break;
		}
		return fundStatus;
	},

	formatRemark(word) {
		if (!Validate.isNull(word)){
			return word.substr(0,5) + "...";
		}else {
			return "";
		}	
	}

}