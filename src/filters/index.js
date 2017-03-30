
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
	}
}