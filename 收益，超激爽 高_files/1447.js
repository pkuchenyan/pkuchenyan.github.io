var reg_callback = {'url':"",'func':""};
var callback_str = "";
var reg_account_tmp=Date.parse(new Date());//模拟注册账号

//百度统计代码
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c162114d26d4372da84b0ad9769ab592";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

//待注册完成回调
reg_callback.url = '';
//百度统计代码
reg_callback.func +='_hmt.push(["_trackEvent", "register", "callback",'+ placeid+'])';

//百度ocpc
var reg_callback_ocpc = {'url':"",'func':""};
window._agl = window._agl || [];
(function () {
    _agl.push(
        ['production', '_f7L2XwGXjyszb4d1e2oxPybgD']
    );
    (function () {
        var agl = document.createElement('script');
        agl.type = 'text/javascript';
        agl.async = true;
        agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(agl, s);
    })();
})();

//待注册完成回调
reg_callback_ocpc.url = '';

//待注册完成回调
reg_callback_ocpc.func = '';
reg_callback_ocpc.func += 'window._agl && window._agl.push(["track", ["success", {t: 3}]]);';