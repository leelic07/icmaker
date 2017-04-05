//表格鼠标划入效果
$.fn.tableHover = function(){
	$(this).on('mouseover mouseout','tr',function(e){
		let _this = $(this);
	    if(e.type == 'mouseover'){
	      _this.css({
	          outlineColor:'#3FB2B9'
	      });
	    }else{
	      _this.css({
	          outlineColor:'transparent'
	      });
	    }
	})
}


//选择与全选
$.fn.select = function(){
    $(this).on('click','.info-check',function(){
        let _this = $(this);
        if(_this.parents('thead')){
            if(_this.hasClass('active')){      
                _this.removeClass('active').parents('thead').siblings('tbody').find('.info-check').removeClass('active');
                // store.dispatch('cancelSelectAll');
            }else{
                _this.addClass('active').parents('thead').siblings('tbody').find('.info-check').addClass('active');
                // store.dispatch('confirmSelectAll');
            }
        }else{
            if(_this.hasClass('active')){
                _this.removeClass('active');
                store.dispatch('cancelSelectAll');
            }else{
                _this.addClass('active');
            }
        }
    })
}


//新增角色全选
$.fn.selectRole = function(){
    $(this).on('click','.info-check',function(){
        let _this = $(this);
        if(_this.hasClass('active')){
            _this.removeClass('active');
            if(_this.siblings('span').html() == '全选'){
                _this.parent().siblings('label').children('.info-check').removeClass('active');
            }
        }else{
            _this.addClass('active');
            if(_this.siblings('span').html() == '全选') {
                _this.parent().siblings('label').children('.info-check').addClass('active');
            }
        }
    })
}

//读取Cookie
let getCookie = name => {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

getCookie("userId");
console.log("Cookie"+getCookie("userId"));

//配置时效
let getsec = str => {
    let str1 = str.substring(1,str.length)*1;
    let str2 = str.substring(0,1);
    if (str2=="s")
    {
    return str1*1000;
    }
    else if (str2=="h")
    {
    return str1*60*60*1000;
    }
    else if (str2=="d")
    {
    return str1*24*60*60*1000;
    }
}

//设置Cookie
let setCookie = (name,value,time) => {
    let strsec = getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export default {
    //上传读取图片路径
    readImgUrl(file,_this,dataName){
        console.log(dataName);
        let oMyForm = new FormData();
        oMyForm.append("file", file);
        let oReq = new XMLHttpRequest();
        oReq.open("POST", "http://106.14.18.98:8080/icmaker/fileUpload");
        oReq.send(oMyForm);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                let response = $.parseJSON(this.response);
                if (response.code == 0) {//图片上传成功
                    _this[dataName] = response.data.imgUrl;
                }
            } else {
                console.log("上传图片错误，错误码：" + oReq.status);
            }
        };
    }
}
