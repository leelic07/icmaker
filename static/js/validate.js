export default{
	//判断是否为空
    isNull(){
        for(let i = 0;i < arguments.length;i++){
            if(arguments[i] == null || arguments[i] == undefined || arguments[i] === ''){
                return true;//为空
            }else{
                arguments[i] = arguments[i].toString();
                arguments[i] = arguments[i].replace(/(^\s*)|(\s*$)/g,'');
                if(arguments[i] == ''){
                    return true;//为空
                }
            }  
        }
        return false;//不为空
    },

    //判断是否为空，并且是否为正整数或浮点数
    isNumber(){
        let pattNum = new RegExp('^(([0-9]+\.[0-9]*[0-9][0-9]*)|([0-9]*[0-9][0-9]*\.[0-9]+)|([0-9]*[0-9][0-9]*))$');
        for(let i = 0;i < arguments.length;i++){
            if(this.isNull(arguments[i]) || !pattNum.test(arguments[i])){
                return false;//不是数字
            }
        }
        return true;//是数字
    },

    //可以为空或者为数值型
    isNum(){
        let numReg = new RegExp("^[0-9]*$");
        for(let i = 0;i < arguments.length;i++){
            if(!this.isNull(arguments[i]) && !numReg.test(arguments[i])){
                return false;
            }
        }
        return true;
    },

    //可以为空，或者是正整数或浮点数
    isNullOrNumber(){
        let pattNum = new RegExp('^(([0-9]+\.[0-9]*[0-9][0-9]*)|([0-9]*[0-9][0-9]*\.[0-9]+)|([0-9]*[0-9][0-9]*))$');
        for(let i = 0;i < arguments.length;i++){
            if(!this.isNull(arguments[i]) && !pattNum.test(arguments[i])){
                return false;//不是数字
            }
        }
        return true;//是数字
    },

    //将undefined和null转换为'',并给所有参数去除空格

    empty(){
        let args = [];
        for(let i = 0;i < arguments.length; i++) {
             arguments[i] += '';
            if (arguments[i] == 'null' || arguments[i] == 'undefined') {
                arguments[i] = "";
            }
            args.push(arguments[i].replace(/(^\s*)|(\s*$)/g,""));
        }
        return args;
    },

    //可以为空或者是合法的身份证号
    isCard(){
        let pattNum = new RegExp("^\\d{17}(\\d|x)$");
        for(let i = 0;i < arguments.length;i++){
            if(!this.isNull(arguments[i]) && !pattNum.test(arguments[i])){
                return false;
            }
        }
        return true;
    },

     //取小数点后两位
    fixTwo(){
        let args = [];
        for(let i = 0;i < arguments.length;i++){
            if(!this.isNumber(arguments[i])){
                return [];
            }else{
                arguments[i] = arguments[i].toFixed(2);
                args.push(arguments[i]);
            } 
        };
        if(arguments.length == 1){
            return args[0];
        }else{
            return args;
        }  
    },

    //小数点两位之后禁止输入
    saveTwo(money){
        let afterPoint = money.toString().split('.')[1];
        if(afterPoint && afterPoint.length > 2){
            money = money.toString().substring(0,money.length-1);
        }
        return money;
    },

    //钱单位转化为分
    toCent(){
        let args = []; 
        for(let i = 0;i < arguments.length;i++){
            if(!this.isNumber(arguments[i])){
                return [];
            }else{
                arguments[i] = Math.round(arguments[i] * 100);
                args.push(arguments[i]);
            }   
        }
        if(arguments.length == 1){
            return args[0];
        }else{
            return args;
        }  
    }
}