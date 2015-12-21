(function($){
    //����jquery��ajax����
    var _ajax=$.ajax;

    //��дjquery��ajax����
    $.ajax=function(opt){
        //����opt��error��success����
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
        //��չ��ǿ����
        var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //���󷽷���ǿ����
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(res, textStatus){
                //�ɹ��ص�������ǿ����
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
                        alert('���¼');
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