export default{
	//判断是否为空
    isNull(){
        for(let i = 0;i < arguments.length;i++){
            arguments[i] += '';
            if(arguments[i].replace(/(^\s*)|(\s*$)/g,'') == ''){
                return true;//为空
            }
        }
        return false;//不为空
    },

    //判断是否为空，并且是否为正整数或浮点数
    isNumber(){
        let pattNum = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$');
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

}