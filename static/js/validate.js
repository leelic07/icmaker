export default{
	//判断是否为空
    isNull(){
        for(let i = 0;i < arguments.length;i++){
            arguments[i] += '';
            if(arguments[i].replace(/(^\s*)|(\s*$)/g,'') == ''){
                return true;
            }
        }
        return false;
    },

    //判断是否为空，并且是否为正整数或浮点数
    isNumber(){
        let pattNum = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$');
        for(let i = 0;i < arguments.length;i++){
            if(this.isNull(arguments[i]) || !pattNum.test(arguments[i])){
                return false;
            }
        }
        return true;
    },

    empty(){
        let args = [];
        for(let i = 0;i < argument.length; i++) {
            if (argument[i] == null || argument[i] == undefined) {
                argument[i] = "";
            }
            args.push(argument[i]);
        }
        return args;
    }
}