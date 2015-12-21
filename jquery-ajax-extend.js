(function($){
    //备份jquery的ajax方法
    var _ajax=$.ajax;

    //重写jquery的ajax方法
    $.ajax=function(opt){
        //备份opt中error和success方法
        var fn = {
            error:function(XMLHttpRequest, textStatus, errorThrown){},
            success:function(data, textStatus){}
        }
        opt= $.extend({},opt);
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.success){
            fn.success=opt.success;
        }
        //扩展增强处理
        var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(res, textStatus){
                //成功回调方法增强处理
                var data;
                if(typeof res=='string'){
                    try{
                        data=JSON.parse(res);
                    }catch(e){
                        console.log(e);
                        return false;
                    }
                }else{
                    data=res;
                }
                switch (data.s){
                    case 200:
                        break;
                    case 401:
                        alert('请登录');
                        location.href='/login';
                        break;
                    default :
                        alert(data.s+';'+data.msg);
                        //location.reload();
                        break;
                }
                fn.success.bind(this)(res, textStatus);
            }
        });
        return _ajax(_opt);
    };
})(jQuery);