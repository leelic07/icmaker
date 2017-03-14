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