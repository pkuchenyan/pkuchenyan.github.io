 !(function() {
     var App = {
         /*获取url中的参数*/
         getParam: function(param) {
             try {
                 var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
                 var r = window.location.search.substr(1).match(reg);
                 if (r != null) return unescape(r[2]);
                 return '';
             } catch (_e) {
                 return '';
             }
         },

         /*标题闪动*/
         flash_title: function() {
             //document.title = _title;return;
             if (flash_tit.flag) {
                 var title_arr = _title.split("");
                var title_length = title_arr.length;
                
                if (flash_tit.step > title_length) {
                    flash_tit.step = 0;
                }
                 
                var t='', t2='', t3='';
                for(var i in title_arr){
                    if(i>flash_tit.step){
                        t2 += title_arr[i];
                    }else{
                        t += title_arr[i];
                    }
                }
                t3 = t2+'    '+t;
                
                flash_tit.step++;
                document.title = t3;
                /*
                 flash_tit.step++;
                 if (flash_tit.step == 3) {
                     flash_tit.step = 1
                 }
                 if (flash_tit.step == 1) {
                     document.title = flash_tit.space
                 }
                 if (flash_tit.step == 2) {
                     document.title = _title
                 }
                 */
                 setTimeout("App.flash_title()", 500);
             } else if (!flash_tit.flag) {
                 document.title = _title;
             }
         },

         /*非flash注册框input校验成功时返回的信息 */
         successInfo: function(id, message) {
             $$(id) ? $$(id).className = 'normal' : '';
             $$(id) ? $$(id).innerHTML = message : '';
             return true;
         },

         /*非flash注册框input校验失败时返回的信息*/
         errorInfo: function(id, message) {
             $$(id) ? $$(id).className = 'error' : '';
             $$(id) ? $$(id).innerHTML = message : '';
             return false;
         },

         /*非flash注册框校验用户名*/
         checkLoginAccount: function(value) {
             return /^[A-Za-z0-9_]{6,20}$/.test(value) ? App.successInfo('u_info', '<font style="color:#008000;">帐号填写正确！</font>') : App.errorInfo('u_info', '6-20个字符,由字母或数字组成！');
         },

         /*非flash注册框校验密码*/
         checkPassword: function(value) {
             return /^[\x01-\xfe]{6,20}$/.test(value) ? App.successInfo('w_info', '<font style="color:#008000;">密码填写正确！</font>') : App.errorInfo('w_info', '长度6-20个字符！');
         },

         /*非flash注册框校验再次输入密码*/
         checkPassword1: function(value) {
             var value1 = arguments[1] ? arguments[1] : $$('password').value;
             return (/^[\x01-\xfe]{6,20}$/.test(value)) ? ((value1 == value) ? App.successInfo('p_info', '<font style="color:#008000;">两次填写的密码一致！</font>') : App.errorInfo('p_info', '两次填写的密码不一致！')) : App.errorInfo('p_info', '长度6-20个字符！');
         },

         /*flash注册框校验成功返回的信息*/
         successInfoNew: function(id, message) {
             return message;
         },

         /*flash注册框校验失败返回的信息*/
         errorInfoNew: function(id, message) {
             return message;
         },

         /*flash注册框校验用户名*/
         checkLoginAccountNew: function(value) {
            if(!value){
                return App.errorInfoNew('u_info', '<font color="#FF0000">请正确填写用户名</font>');
            }
            return /^[A-Za-z0-9_]{6,20}$/.test(value) ? App.successInfoNew('u_info', '<font color="#008000">帐号填写正确！</font>') : App.errorInfoNew('u_info', '<font color="#FF0000">帐号不符合规定！</font>');
         },
         
         /*flash注册框校验用户名*/
         checkLoginAccountNewV3_bak: function(value) {
            if(!value){
                return App.errorInfoNew('u_info', '<font color="#FF0000">请正确填写用户名</font>');
            }
            return /^[A-Za-z0-9_]{6,20}$/.test(value) ? App.successInfoNew('u_info', '<font color="#008000">帐号填写正确！</font>') : App.errorInfoNew('u_info', '<font color="#FF0000">帐号不符合规定！</font>');
         },
         
         /*flash注册框校验用户名(api检查账号可用性)*/
         checkLoginAccountNewV3: function(value) {
            if(!value){
                return App.errorInfoNew('u_info', '<font color="#FF0000">请正确填写用户名</font>');
            }
            if(/^[A-Za-z0-9_]{6,20}$/.test(value)){
                 if(oldusername!=value){
                     Jsonp(apiUrl+'?action=check&login_account='+value+ab_param, function(data) {
                         var message = '';
                         if (data.success == 1) {
                             window.regAccountFlag = true;
                             message = '<font color="#008000">' + data.message + '</font>';
                         }  else {
                             window.regAccountFlag = false;
                             message = '<font color="#FF0000">' + data.message + '</font>';
                         }
                         
                         try {
                             App.getFlashMovieObjectNew("flash_obj").alertInfoAccount(message);
                         } catch (e) {
                             if(!regAccountFlag){
                                //App.newWarmBox(data.message);
                             }
                         }
                     });
                 }                 
                 return App.successInfoNew('u_info', '<font color="#008000">帐号填写正确！</font>');
            }else{
                return App.errorInfoNew('u_info', '<font color="#FF0000">帐号不符合规定！</font>');
            }
         },

         /*flash注册框校验密码*/
         checkPasswordNew: function(value) {
             return /^[\x01-\xfe]{6,20}$/.test(value) ? App.successInfoNew('w_info', '<font color="#008000">密码填写正确！</font>') : App.errorInfoNew('w_info', '<font color="#FF0000">密码不符合规定！</font>');
         },

         /*flash注册框校验再次输入密码*/
         checkPassword1New: function(value, value1) {
             return (/^[\x01-\xfe]{6,20}$/.test(value)) ? ((value1 == value) ? App.successInfoNew('p_info', '<font color="#008000">两次填写的密码一致！</font>') : App.errorInfoNew('p_info', '<font color="#FF0000">两次填写的密码不一致！</font>')) : App.errorInfoNew('p_info', '<font color="#FF0000">密码不符合规定！</font>');
         },

         /*flash注册框校验用户名*/
         checkLoginAccountV2: function(value) {
             return /^[A-Za-z0-9_]{6,20}$/.test(value) ? true : false;
         },

         /*flash注册框校验密码*/
         checkPasswordV2: function(value) {
             return /^[\x01-\xfe]{6,20}$/.test(value) ? true : false;
         },

         /*flash注册框校验再次输入密码*/
         checkPassword1V2: function(value, value1) {
             return (/^[\x01-\xfe]{6,20}$/.test(value)) ? ((value1 == value) ? true : false) : false;
         },

         /*flash微端注册成功提示*/
         wdDownLoadShow: function(down_url) {
             window.down_url = down_url;
             App.getFlashMovieObjectNew("flash_obj").wdRegSucc();
         },
         /*flash微端下载*/
         wdDownLoad: function() {
             window.open(window.down_url);
         },

         /*获取flash DOM方法*/
         getFlashMovieObjectNew: function(movieName) {
             if (navigator.appName.indexOf("Microsoft") == -1) {
                 if (document.embeds && document.embeds[movieName]) return document.embeds[movieName]
             } else if (window.document[movieName]) {
                 return window.document[movieName]
             } else {
                 return document.getElementById(movieName)
             }
         },
         
         /*验证码信息框显示出来*/
         showValidation: function() {
             var $validate = $$("validation");
             $validate.className = 'addbg';
             $$('validation_register').className = 'addbg';
             $$('val-pop-close-bg').className = 'addbg val-pop-close';
             $validate.style.left = document.body.scrollHeight + "px";
             $validate.style.top = (document.body.scrollTop + (window.screen.availHeight / 2) - 200) + "px";
             $validate.style.display = "block";
             $$("check-code").focus();
         },

         /*隐藏验证码信息框*/
         hideValidation: function() {
             $$("validation").style.display = "none";
         },

         /*用http+post+密码加密传输方法,js生成form表单post提交*/
         register: function(param1, param2, param3) {
             var myframe = 'myframe';
             var idname = 'myform';
             var action = formUrl+"?act=1" +
                 "&" + ab_param +
                 "&from_url=" + encodeURIComponent(ref);
             if (document.getElementById(myframe) === null) {
                 var _myframe;
                 try {
                     _myframe = document.createElement('<iframe name="myframe">');
                 } catch (ex) {
                     _myframe = document.createElement('iframe');
                 }
                 _myframe.id = 'myframe';
                 _myframe.name = 'myframe';
                 _myframe.width = 0;
                 _myframe.height = 0;
                 _myframe.marginHeight = 0;
                 _myframe.marginWidth = 0;

                 _myframe.setAttribute('id', 'myframe');
                 _myframe.setAttribute('name', 'myframe');
                 _myframe.setAttribute('height', 0);
                 _myframe.setAttribute('width', 0);
                 _myframe.setAttribute('marginheight', 0);
                 _myframe.setAttribute('marginwidth', 0);
                 _myframe.setAttribute('frameborder', 0);

                 document.body.appendChild(_myframe);
             }
             var _element = document.getElementById(idname);
             if (_element !== null) {
                 var _parentElement = _element.parentNode;
                 if (_parentElement) {
                     _parentElement.removeChild(_element);
                 }
             }
             var _mf = document.createElement('form');
             _mf.setAttribute('id', 'myform');
             _mf.setAttribute('action', action);
             _mf.setAttribute('method', 'post');
             _mf.setAttribute('target', 'myframe');

             _mf.appendChild(App.appendInput('login_name', param1));
             _mf.appendChild(App.appendInput('login_pwd', param2));
             _mf.appendChild(App.appendInput('verify_code', (param3 !== undefined ? param3 : '')));
             document.body.appendChild(_mf);
             ieWin=App.newWin();
             document.getElementById(idname).submit();
         },

         /*第三方登录，弹出小窗口*/
         registerWinopen: function(otype) {
             var otypeMapping = { "qq": "qqlogin", "weibo": "weibologin", "wechat": "wxlogin" };
             var ot = otypeMapping[otype] ? otypeMapping[otype] : "qqlogin";
             var url = window.http + "://www.tanwan.com/api/" + ot + "?" +
                 "&open=newwindow" +
                 "&" + ab_param +
                 "&from_url=" + encodeURIComponent(ref) +
                 "&from=" + encodeURIComponent(window.http + '://' + document.domain + '/api_login.html');
            //var newWin = window.open("", "newwindow", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
            //    newWin.location.href = url;
            window.registerOpen = window.open(url, "newwindow", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
         },

         /*第三方登录失败信息弹框*/
         newWarmBox: function(str) {
             var $warm_box = document.createElement('div');
             $warm_box.id = 'warm_box_wrap';
             $warm_box.innerHTML = '<div id="warm_box"><p id="txt_warm">' + str + '</p><span id="warm_box_asure"></span><span href="javascript:;" target="_self" id="close_warm"></a></span>';
             document.body.appendChild($warm_box);
             var $asure = document.getElementById('warm_box_asure');
             var $close_warm = document.getElementById('close_warm');
             $asure.onclick = $close_warm.onclick = function() {
                 var $dom = document.getElementById('warm_box_wrap');
                 document.body.removeChild($dom);
             }
         },

         /*动态生成input方法*/
         appendInput: function(param1, param2) {
             var inp = document.createElement('input');
             inp.setAttribute('type', 'hidden');
             inp.setAttribute('id', param1);
             inp.setAttribute('name', param1);
             inp.setAttribute('value', param2);
             return inp;
         },

         /*checkform的复用代码 */
         checkformCommon: function(password, loginAccount, verify_code) {
             var data = {
                 url: '',
                 regapi: ''
             };

             var url = apiUrl + "?action=reg&login_account=" + encodeURIComponent(loginAccount) +
                 "&password=" + password +
                 "&passwordType=1" +
                 "&verify_code=" + verify_code +
                 "&" + ab_param +
                 "&from_url=" + encodeURIComponent(ref);
             data.url = url;
             data.regapi = '';
             return data;
         },

         /*生成ICP方法*/
         createIcp: function() {
             var tmp_txt = '';
             var domain = document.domain;
             //domain = 'a.ds.twzui6.com';
             var t = domain.split('.');
             var d = t[t.length-2]+'.'+t[t.length-1];
             var beianAll = {
                 'xulizui6.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-4', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 'twzui6.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-4', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 'dajiadou6.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-4', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 'yyxx999.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-5', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 '3q176.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-5', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 '7kww.net':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-5', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 '9kwww.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-5', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 'mosenni.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-5', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},
                 'xuxiyx.com':{'w':'泸网文（2016）1820-076号', 'icp':'沪ICP备16009863号-2', 'add': '上海市嘉定区真南路4268号2幢J550室', 'wht':'35EE6340BA2B7151E0530140A8C0E25A', 'com':'上海旭禧网络科技有限公司'},

                 //上海赞钛
                 'zantainet.com':{'w':'泸网文（2016）6645-504号', 'icp':'沪ICP备16047984号-1', 'add': '上海市嘉定区真南路4268号2幢J1819室', 'wht':'43CCBC670D940C06E0530140A8C05982', 'com':'上海赞钛网络科技有限公司'},
                 '1377.com':{'w':'泸网文（2016）6645-504号', 'icp':'赣ICP备18003082号-1', 'add': '上海市嘉定区真南路4268号2幢J1819室', 'wht':'43CCBC670D940C06E0530140A8C05982', 'com':'上海赞钛网络科技有限公司'},

                 //上海争游
                 '6c6c.com':{'w':'泸网文（2016）2601-153号', 'icp':'沪ICP备16022939号-1', 'add': '上海市嘉定区真南路4268号2幢J549室', 'wht':'36774C6BEB33A63EE0530140A8C0EF40', 'com':'上海争游网络科技有限公司'},
                 'gaore.com':{'w':'泸网文（2016）2601-153号', 'icp':'沪ICP备16022939号-2', 'add': '上海市嘉定区真南路4268号2幢J549室', 'wht':'36774C6BEB33A63EE0530140A8C0EF40', 'com':'上海争游网络科技有限公司'},
                 '8l8l.com':{'w':'泸网文（2016）2601-153号', 'icp':'沪ICP备16022939号-3', 'add': '上海市嘉定区真南路4268号2幢J549室', 'wht':'36774C6BEB33A63EE0530140A8C0EF40', 'com':'上海争游网络科技有限公司'},
                 'zhihei.com':{'w':'泸网文（2016）2601-153号', 'icp':'沪ICP备16022939号-4', 'add': '上海市嘉定区真南路4268号2幢J549室', 'wht':'36774C6BEB33A63EE0530140A8C0EF40', 'com':'上海争游网络科技有限公司'},

                 //九一五站点
                 'mianxiong.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-1', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'shibeiou.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-10', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'miaobali.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-11', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'taohunbao.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-12', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'xiongce.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-13', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'meiduolai.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-14', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'feishili.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-15', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'haoxiannai.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-16', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'yadean.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-2', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'xiongyin.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-3', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'mianwai.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-4', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'xiongdong.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-5', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'nafeini.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-6', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'niudashu.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-7', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 'beigedi.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-8', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},
                 '915.com':{'w':'粤网文[2017]7242-1761号', 'icp':'粤ICP备17093371号-9', 'add': '广州市天河区黄埔大道中299号西3-317众创空间', 'wht':'b50f5a5b4581479dbe6435be257c796d', 'com':'广州九一五信息技术有限公司'},

                 //贪玩站点
                 '695721.com':{'w':'粤网文[2017]9619-2451号', 'icp':'粤ICP备17127047号-4', 'add': '广州市天河区员村四横路128号A4-B', 'wht':'7817b41ff71a44adb34c72b5742ec63c', 'com':'广州贪玩信息技术有限公司'},
                 '695719.com':{'w':'粤网文[2017]9619-2451号', 'icp':'粤ICP备17127047号-5', 'add': '广州市天河区员村四横路128号A4-B', 'wht':'7817b41ff71a44adb34c72b5742ec63c', 'com':'广州贪玩信息技术有限公司'},
                 '695735.com':{'w':'粤网文[2017]9619-2451号', 'icp':'粤ICP备17127047号-1', 'add': '广州市天河区员村四横路128号A4-B', 'wht':'7817b41ff71a44adb34c72b5742ec63c', 'com':'广州贪玩信息技术有限公司'},
                 '693971.com':{'w':'粤网文[2017]9619-2451号', 'icp':'粤ICP备17127047号-2', 'add': '广州市天河区员村四横路128号A4-B', 'wht':'7817b41ff71a44adb34c72b5742ec63c', 'com':'广州贪玩信息技术有限公司'},
                 '695729.com':{'w':'粤网文[2017]9619-2451号', 'icp':'粤ICP备17127047号-3', 'add': '广州市天河区员村四横路128号A4-B', 'wht':'7817b41ff71a44adb34c72b5742ec63c', 'com':'广州贪玩信息技术有限公司'},

                 'tanwan.cn':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-1', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 'tanwan.com':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-2', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 'twyx.cn':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-7', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 '17tanwan.com':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-5', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 'mytanwan.com':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-4', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 '91tw.net':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-8', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 'jjyx.com':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-3', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},
                 'tanwan123.net':{'w':'赣网文[2017]2191-007号', 'icp':'赣ICP备16012630号-6', 'add': '江西省上饶市上饶县凤凰西大道76号阳光时代写字楼1幢2501-2508室', 'wht':'e58a4f98fe6c483e9c99337839875981', 'com':'江西贪玩信息技术有限公司'},

                 'jx915.cn':{'w':'赣网文[2018]3022-031号', 'icp':'赣ICP备17017065号-1', 'add': '江西省上饶市鄱阳县鄱阳镇七条巷70号', 'wht':'b10702bff9c645a78d03ebacefcda07a', 'com':'江西九一五信息技术有限公司'},

                 '519537.com':{'w':'赣网文[2018]3021-030号', 'icp':'赣ICP备17010039号-2', 'add': '江西省上饶市鄱阳县鄱阳镇桃花源记24号楼108店铺', 'wht':'2c49e84ea8634cabb9a0200646e549cb', 'com':'鄱阳县伟如信息技术有限公司'},
                 '519397.com':{'w':'赣网文[2018]3021-030号', 'icp':'赣ICP备17010039号', 'add': '江西省上饶市鄱阳县鄱阳镇桃花源记24号楼108店铺', 'wht':'2c49e84ea8634cabb9a0200646e549cb', 'com':'鄱阳县伟如信息技术有限公司'},

                  //广州柏洲
                 'bozhouapp.com':{'w':'粤网文〔2018〕7516-2695号', 'icp':'ICP备18085965号', 'add': '广州市天河区黄村荔苑路9-11号自编17房112', 'wht':'496174a9c22f4d29bfdaeff5ce183925', 'com':'广州柏洲网络科技有限公司'},
                 'gzbozhouo2o.com':{'w':'粤网文〔2018〕7516-2695号', 'icp':'ICP备18085965号', 'add': '广州市天河区黄村荔苑路9-11号自编17房112', 'wht':'496174a9c22f4d29bfdaeff5ce183925', 'com':'广州柏洲网络科技有限公司'},
                 '9191bozhou.com':{'w':'粤网文〔2018〕7516-2695号', 'icp':'ICP备18085965号', 'add': '广州市天河区黄村荔苑路9-11号自编17房112', 'wht':'496174a9c22f4d29bfdaeff5ce183925', 'com':'广州柏洲网络科技有限公司'},
                 '168bozhou.com':{'w':'粤网文〔2018〕7516-2695号', 'icp':'ICP备18085965号', 'add': '广州市天河区黄村荔苑路9-11号自编17房112', 'wht':'496174a9c22f4d29bfdaeff5ce183925', 'com':'广州柏洲网络科技有限公司'},

                 '361759.com':{'w':'赣网文（2018）4864-042号', 'icp':'赣ICP备16012630号-2', 'add': '江西省南昌市红谷滩新区赣江北大道1号中航国际广场2205室(第22层)', 'wht':'', 'com':'南昌市如玩信息技术有限公司'},

                 //上海誉点
                 'oq78.com':{'w':'沪网文【2018】2322-167号', 'icp':'沪ICP备14052946号-31', 'add': '上海市嘉定区陈翔路88号6幢1楼A区1106室', 'wht':'4028c08c4d9f1f09014dac9bbf0202ee', 'com':'上海誉点信息技术有限公司'}
            };
             if(beianAll[d]!=undefined){
				 if(icp_flag.flag && icp_flag.text.indexOf('声明')>-1){
					 tmp_txt += icp_flag.text+'<br/>';
				 }
                 tmp_txt += beianAll[d]['com']+'&nbsp;&nbsp;'+beianAll[d]['w']+'&nbsp;&nbsp;'+beianAll[d]['icp']+'&nbsp;&nbsp;'+beianAll[d]['add']+'<br>广告仅供参考，请以游戏为准<br><a href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/'+beianAll[d]['wht']+'" target="_blank"><img src="/flash_style/images/wenhuajingying.png" width="52" height="52"></a>';
             }
             else if (icp_flag.flag) {
                 tmp_txt = icp_flag.text+'<br/>广告仅供参考，请以游戏为准';
             }
             else{
                tmp_txt = '广告仅供参考，请以游戏为准';
             }
             
             var $p = document.createElement('p');
                 $p.className = 'txt_icp';
                 $p.innerHTML = tmp_txt;

                 document.body.appendChild($p);
         },

         /*退弹方法*/
         popWin: function(url) {
             var url = url + "?" + ab_param + "&ref=" + encodeURIComponent(ref);
             var obj = document.createElement('object');
             obj.setAttribute('classid', 'CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6');
             obj.style.cssText = 'position:absolute;left:1px;top:1px;width:1px;height:1px;';
             document.body.appendChild(obj);
             var winOpen = function(url) {
                 var f = window[String.fromCharCode(111, 112, 101, 110)];
                 var w = f(
                     url,
                     '_blank',
                     'left=0,top=0,toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,' +
                     'resizable=yes,width=' + screen.width + ',height=' + screen.height
                 );
                 return w;
             };
             var objOpen = function(url) {
                 obj.launchURL(url);
             };
             document.body.onunload = function() {
                 try {
                     if (isPopWin.flag) {
                         if (!winOpen(url)) {
                             objOpen(url);
                         }
                     }
                 } catch (e) {}
             }
         },

         /*退弹方法2*/
         popWin2: function(url) {
             var a_height = document.body.clientHeight || document.documentElement.clientHeight;
             var _t = null;
             if (isPopWin.text == '') {
                 isPopWin.text = "亲，确定要离开吗？"
             }
             isPopWin.text +="\r\n -------------------------------------\r\n 贪玩游戏，找回年少时贪玩的你 \r\n -------------------------------------\r\n更多好玩游戏，请关注贪玩游戏平台";
             var confirmClose = isPopWin.text;
             var newdiv=document.createElement("div");
             newdiv.id="newdiv";
             
             newdiv.innerHTML="<iframe src='" + isPopWin.url + "' style='width:100%;display:none;height:100%' frameborder=0 id='my_iframe'></iframe>";
             $$('body_id').appendChild(newdiv);
             //document.body.innerHTML = "<iframe src='" + isPopWin.url + "' style='width:100%;display:none;height:" + (a_height + "px") + "' frameborder=0 id='my_iframe'></iframe>" + document.body.innerHTML;
             window.onbeforeunload = function(event) {
                 event = event || window.event;
                 setTimeout(function() { _t = setTimeout(onunloadcancel, 0) }, 0);
                 var browser = navigator.appName;
                 if (event && isPopWin.flag) {
                     isPopWin.flag = false;
                     event.returnValue = confirmClose;
                     document.getElementsByTagName('html')[0].style.backgroundColor = "#ffffff";
                     document.body.style.backgroundColor = "#ffffff";
                     newdiv.style.height="100%";
                     $$("my_iframe").style.display = "block";
                     document.documentElement.style.overflowY = 'hidden';
                     document.body.style.overflowY = 'hidden';
                     for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
                         document.getElementsByTagName("div")[i].style.display = "none";
                     }
                     $$('newdiv').style.display = "block";
                     if ($$('flash') != undefined) { 
                         $$('flash').innerHTML='';
                     }
                     App.downloadUrl();
                 }
                 if (isPopWin.flag) {
                     if (browser == "Netscape") {
                         return confirmClose;
                     } else {
                         window.event.returnValue = confirmClose;
                     }
                 }
             }
             
             window.onunload = function(event) {
                 event = event || window.event;
                 setTimeout(function() { _t = setTimeout(onunloadcancel, 0) }, 0);
                 var browser = navigator.appName;
                 if (event && isPopWin.flag) {
                     isPopWin.flag = false;
                     event.returnValue = confirmClose;
                     document.getElementsByTagName('html')[0].style.backgroundColor = "#ffffff";
                     document.body.style.backgroundColor = "#ffffff";
                     newdiv.style.height="100%";
                     $$("my_iframe").style.display = "block";
                     document.documentElement.style.overflowY = 'hidden';
                     document.body.style.overflowY = 'hidden';
                     for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
                         document.getElementsByTagName("div")[i].style.display = "none";
                     }
                     $$('newdiv').style.display = "block";
                     if ($$('flash') != undefined) { 
                         $$('flash').innerHTML='';
                     }
                     App.downloadUrl();
                 }
                 if (isPopWin.flag) {
                     if (browser == "Netscape") {
                         return confirmClose;
                     } else {
                         window.event.returnValue = confirmClose;
                     }
                 }
             }
             window.onunloadcancel = function() {
                 clearTimeout(_t);
             }
         },
         
         /*弹出下载地址*/
         downloadUrl:function(){
             return true;
             if(typeof placeid == 'undefined' || placeid!=321) return true;
             var url = 'http://wd.tanwan.com/download/0708102049E070004000013F.exe';
             var downloadDiv=document.createElement("div");
             downloadDiv.id="downloadDiv";
             downloadDiv.innerHTML="<iframe src='" + url + "' style='width:0px;display:none;height:0px' frameborder=0 id='downloadDiv_iframe'></iframe>";
             $$('body_id').appendChild(downloadDiv);
         },

         /*注册成功后的回调*/
         regSuccess: function(game_url,owin) {
             if (regCallbackFlag && typeof reg_callback != 'undefined') {
                 if (reg_callback.url != '') {
                     (new Image).src = reg_callback.url + '&rnd=' + Math.floor(Math.random() * Math.pow(2, 31));
                     setTimeout(function() { 
                        App.jumpUrl(game_url,owin);
                     }, 200);
                     return true;
                 } else if (reg_callback.func != '') {
                     try {
						 if(document.getElementById('storage_login_account')){
							 var replace_username=document.getElementById('storage_login_account').value;
							//alert(replace_username);
							reg_callback.func = reg_callback.func.replace('replace_username', replace_username);
						 }
                         eval(reg_callback.func);
						 
						 //ocpc回传
						 if(typeof reg_callback_ocpc !='undefined' && reg_callback_ocpc.func !=''){
                             eval(reg_callback_ocpc.func);
                         }

                         setTimeout(function() {
                             App.jumpUrl(game_url,owin);
                         }, 200);
                         return true;

                     } catch (e) {}
                 }
             }
             App.jumpUrl(game_url,owin);
             return true;
         },

         /*免二登方法*/
         freeLog: function() {
             try {
                 if (_loginName && _loginUrl && !_loginClick) {
                     _loginClick = 1;
                     
                     if (isPopWin.flag) isPopWin.flag = false;
                     window.regCallbackFlag = false; //取消注册完成回调
                     var oNewWindow=App.newWin();
                     App.regSuccess(_loginUrl,oNewWindow);
                 }
             } catch (e) {}
         },

         /*浏览器没有flash会生成个新的注册框跟背景图*/
         newFlashReg: function() {
             $$('flash').innerHTML = '';
             $$('show').innerHTML = '';
             var $body = document.body;
             var $main = $$('main');
             $body.style.cursor = 'pointer';
             var oImgWrap = document.createElement('div');
             oImgWrap.className = 'oImgWrap';
             $body.appendChild(oImgWrap);
             var oImg = document.createElement('img');
             oImg.src = swf_path + "/pm.jpg";
             oImg.className = 'add_bg_cover';
             oImg.onerror = function() {
                 oImg.src = "/flash_style/images/bg.jpg";
                 oImg.onerror = null;
             };
             oImgWrap.appendChild(oImg);
             oImg.onload = function(){oImg.setAttribute('style', 'width:100%; height:100%;max-width:'+oImg.width+'px; max-height:'+oImg.height+'px;');};
             $main.className = 'addbg';
             $body.style.width = '100%';
             $body.style.height = '100%';
             $main.style.width = '100%';
             $main.style.height = '100%';
             var newDiv = document.createElement('div');
             newDiv.setAttribute('id', 'new_reg_wrap');
             newDiv.innerHTML = ['<div id="box_register" class="clearfix2">',
                 '    <form id="register_form" style="margin:0" action="#" method="post" onsubmit="return checkForm(this);">',
                 '         <div class="reg_wrap" id="reg_wrap">',
                 '             <p class="p_inp_wrap">',
                 '                 <span class="label">用户名</span>',
                 '                 <input type="text" class="inp_user inp" id="login_account" name="login_account" onblur="checkLoginAccount(this.value);"  onkeypress="checkSubmit();" />',
                 '                 <span class="icon_inp user"></span>',
                 '             </p>',
                 '             <div class="normal p_infos" id="u_info" >6-20个字符,由字母或数字组成</div>',
                 '             <p class="p_inp_wrap">',
                 '                 <span class="label">登录密码：</span>',
                 '                  <input id="password" type="password" name="password" class="inp" onblur="checkPassword(this.value);" onfocus="checkLoginAccount($$(\'login_account\').value);" onkeypress="checkSubmit();" />',
                 '                 <span class="icon_inp pwd"></span>',
                 '             </p>',
                 '             <div class="normal p_infos" id="w_info" >长度6-20个字符</div>',
                 '             <div id="tr_cxzc" style="display:none;">',
                 '                     <a href="javascript: clearCookie();" class="btn_re_register">重新注册</a>',
                 '             </div>',
                 '             <div id="tr_password1" class="p_inp_wrap p_inp_wrap_last">',
                 '                 <span class="label">重复密码：</span>',
                 '                 <input id="password1" type="password" name="password1" class="text inp" onblur="checkPassword1(this.value);" onkeypress="checkSubmit();" />',
                 '                 <div class="normal p_infos" id="p_info">两次输入的密码请保持一致</div>',
                 '                 <span class="icon_inp pwd"></span>',
                 '             </div>',
                 '             <input type="submit" name="SubmitBtn"  id="submitbtn" />',
                 '       </div>',
                 '            <div  class="other_reg">',
                 '              <p class="p_reg_tit">使用其他帐号登录</p>',
                 '              <div class="icon_wrap">',
                 '                 <a href="javascript:;" class="a_reg_qq" onclick="registerWinopen(\'qq\')"></a>',
                 '                 <a href="javascript:;" class="a_reg_wx" onclick="registerWinopen(\'wechat\')"></a>',
                 '                 <a href="javascript:;" class="a_reg_wb" onclick="registerWinopen(\'weibo\')"></a>',
                 '             </div>',
                 '            </div>',
                 '     </form>',
                 ' </div>'
             ].join("");
             $main.appendChild(newDiv);
             if ($$('reg_wrap') != undefined) {
                 
                 var $div = document.createElement('div');
                 $div.innerHTML = "<div class='p_agree'>" + '<td height="10" colspan="3" align="left"><input type="checkbox" checked="checked" value="checkbox" id="checkservice" name="checkservice" style="margin-left:94px;height:13px;width:13px;"><a target="_blank" id="agreement" href="http://www.tanwan.com/news/xwgg/2014-02/83.html" style="text-decoration:none;color:black;">阅读并同意《用户协议及隐私协议》</a></td>' + "</div>"
                 $$('reg_wrap').appendChild($div);

                 $$('new_reg_wrap').style.width = '100%';
                 $$('new_reg_wrap').style.height = '100%';
             }
             loadAdTrack();
         },

         /*判断是否有禁止flash*/
         flashChecker: function() {
             var a = 0;
             try {
                 if (document.all) {
                     var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                     if (c) {
                         a = 1
                     }
                 } else {
                     if (navigator.plugins && navigator.plugins.length > 0) {
                         var c = navigator.plugins["Shockwave Flash"];
                         if (c) {
                             a = 1
                         }
                         
                         //火狐版本52以上全部显示图片
                        var ua = navigator.userAgent.toLowerCase(), version = 0;
                        if(ua.match(/firefox\/([\d.]+)/)) {
                            version = (ua.match(/firefox\/([\d.]+)/)[1]).split('.')[0];
                            //if(version>=52) a=0;
                        }
                     }
                 }
                 return a
             } catch (e) {
                 return a
             }
         },

         /*检测是否是移动端平台*/
         testDevice:function (){
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return true;
            } else {
                return false
            }
         },
         /*注册成功跳转url 方法*/
         jumpUrl:function(game_url,owin){
            if(typeof(wd_flag)!='undefined' && wd_flag){
                App.closeWin(owin);
                var downloadUrl = 'http://download.tanwan.com/pc/tg/%E8%B4%AA%E7%8E%A9%E8%93%9D%E6%9C%88_'+agent_id+'_'+placeid+'.exe';
                if(typeof(game_id)!='undefined' && game_id==174){
                    downloadUrl = 'http://download.tanwan.com/pc/tg/%E8%B4%AA%E7%8E%A9%E4%BC%A0%E4%B8%96_'+agent_id+'_'+placeid+'.exe';
                }else if(typeof(game_id)!='undefined' && game_id==1306){
                    downloadUrl = 'http://download.tanwan.com/pc/tg/%E6%AD%A6%E6%9E%973_'+agent_id+'_'+placeid+'.exe';
                }else if(typeof(game_id)!='undefined' && game_id==2395){
                    downloadUrl = 'http://download.tanwan.com/pc/tg/%e5%8e%9f%e5%a7%8b%e4%bc%a0%e5%a5%87.msi';
                }else if(typeof(game_id)!='undefined' && game_id==1530){
                    downloadUrl = 'http://download.tanwan.com/pc/tg/%e7%9c%9f%e9%be%99%e4%b8%bb%e5%ae%b0.exe';
                }

                // 是否开启flash
                if(!flash_flag){
                    App.newGameExeBox(downloadUrl);
                }else{
                    try{
                        App.wdDownLoadShow(downloadUrl);
                    }catch (e) {
                        App.newGameExeBox(downloadUrl);
                    }
                }

                return;
            }
        
            if(owin){
                owin.window.location = game_url;
                location.href='http://www.tanwan.com/?agent_id='+agent_id+'&placeid='+placeid+'&adid='+adid;
                //location.href='http://www.tanwan.com/huodong/2017yxj/yy.html?agent_id='+agent_id+'&placeid='+placeid+'&adid='+adid;
            }
            else{
                top.window.location = game_url;
            }
           
         },
         //创建新窗口
         newWin:function(){
             var oNewWindow=null;
             if(window.url_blank){
                var oNewWindow = window.open('','_blank');
             }
             return oNewWindow;
         },
         closeWin:function(oNewWindow){
             if(oNewWindow){
                oNewWindow.close();
             }
         },
         //微端窗口
         newGameExeBox: function(downloadUrl) {
            var loginAccount = $$('storage_login_account').value;
            //var downloadUrl = 'http://cdn.cycs.9377.com/dlq/%E8%B4%AA%E7%8E%A9%E8%B5%A4%E6%9C%88%E4%BC%A0%E8%AF%B4%E7%99%BB%E5%BD%95%E5%99%A8.exe';
            var $game_exe_box = document.createElement('div');
                $game_exe_box.id = 'game_exe_box_wrap';
                $game_exe_box.innerHTML = ['<div style="position: fixed; width: 100%; height: 100%; background: url(/flash_style/images/bg_cover2.png);top: 0;left: 0;z-index: 9999;">',
                    '<div style="width:420x; height:250px; position:fixed; left:50%; margin-left:-210px; top:200px; padding:0px 10px 10px 10px">',
                    '<ul>',
                    '<li style="width:338px; height:66px; padding-top:6px; background:#FFFF00; font-size:16px; line-height:28px; font-weight:bold;text-align:center;">',
                    '<div>恭喜您，注册成功！</div>',
                    '<div style="color:red;">您的账号是：'+loginAccount+'</div>',
                    '</li>',
                    '<li><a href="'+downloadUrl+'"><img src="/flash_style/images/wd.gif" border="0"></a></li>',
                    '</ul>',
                    '</div>',
                    '</div>'
                ].join(""); 
             document.body.appendChild($game_exe_box);
         }
     };

     /*把一些方法设为全局函数*/
     window.App = window.App || App;
     window.getParam = App.getParam;
     window.checkLoginAccount = App.checkLoginAccount;
     window.checkPassword = App.checkPassword;
     window.checkPassword1 = App.checkPassword1;
     window.checkLoginAccountNew = App.checkLoginAccountNew;
     window.checkPasswordNew = App.checkPasswordNew;
     window.checkPassword1New = App.checkPassword1New;
     window.checkLoginAccountV2 = App.checkLoginAccountV2;
     window.checkPasswordV2 = App.checkPasswordV2;
     window.checkPassword1V2 = App.checkPassword1V2;
     window.checkLoginAccountNewV3 = App.checkLoginAccountNewV3;
     window.getFlashMovieObjectNew = App.getFlashMovieObjectNew;
     window.registerWinopen = App.registerWinopen;
     window.showValidation = App.showValidation;
     window.hideValidation = App.hideValidation;
     window.wdDownLoad      = App.wdDownLoad;
     window.wdDownLoadShow  = App.wdDownLoadShow;
     window.down_url        = '';
     window.url_blank = true;

     if(typeof(url_blank_flag)!='undefined' && !url_blank_flag){
         window.url_blank = false;
     }
     if(typeof(wd_flag)!='undefined' && wd_flag){
         window.url_blank = false;
     }

 })()

 /*变量声明*/
 if(typeof(http)=='undefined' || !window.http){
     window.http = 'http';
 }
 //if(tc_domain && tc_domain.indexOf('https')>-1 ){
 //    window.http = 'https';
 //}
 //加强域名判断
 var protocol = 'https:'==document.location.protocol;
 if(protocol){
     window.http = 'https';
     //素材域名是否为https
     if(tc_domain && tc_domain.indexOf('https')==-1 ){
         alert("抱歉，素材域名有误！");
         location.href="https://app.zantainet.com/htmlcode/8164.html?cplaceid="+agent_id+"_"+placeid+"&"+location.search;
     }
 }else{
    window.http = 'http';
 }
 var formUrl = window.http + "://www.tanwan.com/api/reg_x.php";
 var apiUrl = window.http + "://www.tanwan.com/api/reg_x3.php";
 if(typeof cplaceid=='undefined'){var cplaceid = getParam("cplaceid") || getParam("ext") || "";}
 var ref = getParam("referer") || document.referrer || (placeid+'.html');
     ref = ref.substring(0,50);
 var regType = "ajax"; //注册方式
 var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
 if(regType=='form'){
     window.url_blank = false;
     if (isPopWin.flag) isPopWin.flag = false;
 }
 
 //非新模板，跳转到旧模板去
 if(typeof swf_height!='undefined' && swf_height<1){
     //落地页媒体来源参数
     var ext_param = "";
     if(getParam("qhclickid")){ ext_param +="&qhclickid="+getParam("qhclickid"); }
     if(getParam("sourceid")){ ext_param +="&sourceid="+getParam("sourceid"); }
     if(getParam("bd_vid")){ ext_param +="&bd_vid="+getParam("bd_vid"); }

     var gurl = swf_path+'index.html?agent_id='+agent_id+'&placeid='+placeid+'&cplaceid='+cplaceid+'&type='+adtype+'&game_id='+game_id+'&aid='+adid+'&rand='+rand+'&ref='+ref+ext_param;
     location.href = gurl;
 }
 if(typeof agent_id!='undefined' && agent_id==1653){
     isPopWin.type = 1;
 }
 if(typeof regCookieName=='undefined'){var regCookieName = 'pusername_'+placeid;}
 if(typeof regCookieUPass=='undefined'){var regCookieUPass = 'puserpass_'+placeid;}
 var _qs = 0;
 var isFlash = true;
 var logAccount = '';
 var regCallbackFlag = true; //注册成功后统计回调标识
 var regAccountFlag = true; //账号可用性标识
 var registerOpen = null; //第三登录新窗口标识

 //落地页来源参数
 if(typeof sourceid=='undefined'){var sourceid = getParam("bd_vid") || getParam("sourceid") || getParam("qhclickid") || "";}

 //统计公共参数
 var ab_param = "&agent_id=" + agent_id + "&placeid=" + placeid + "&game_id=" + game_id + "&type=" + adtype + "&adid=" + adid + "&rand=" + rand + "&cplaceid=" + cplaceid +"&sourceid="+ sourceid;

 /*变量声明*

 /*回调函数*/
 var CallBackHandler = {
     tid: 0,
     callbacks: {},
     getTid: function() {
         return ++this.tid;
     },
     registerCallBack: function(tid, func) {
         this.callbacks[tid] = func;
     },
     handleCallBack: function(tid, data) {
         var func = this.callbacks[tid];
         if (func && (typeof func == 'function')) func(data);
         var script = document.getElementById('jsonp_invoker_' + tid);
         if (script) try {
             script.parentNode.removeChild(script);
         } catch (e) {}
     }
 };
 /*jsonp方法*/
 var Jsonp = function(url, callback) {
     var tid = CallBackHandler.getTid();
     var script = document.createElement('script');
     with(script) {
         id = 'jsonp_invoker_' + tid;
         type = 'text/javascript';
         src = url.indexOf('?') > 0 ? (url + '&tid=' + tid + '&' + Math.random()) : (url + '?tid=' + tid + '&' + Math.random());
     }
     if (callback) CallBackHandler.registerCallBack(tid, callback);
     var head = document.getElementsByTagName('head');
     if (head[0]) {
         head[0].appendChild(script);
     } else {
         document.body.appendChild(script);
     }
 };
 /*获取dom id的方法*/
 function $$(id) {
     return document.getElementById(id);
 }
 /*enter键提交*/
 function checkSubmit(event) {
     var event = event || window.event || arguments.callee.caller.arguments[0];
     if (event.keyCode != 13) return false;
     verifyRegister();

 }
 /*判断flash注册框注册还是非flash注册框注册*/
 function verifyRegister() {
     if (!isFlash || !flash_flag) {
         checkForm($$('register_form'));
     } else {
         flashCheckForm();
     }
 }
 /*用户注册服务协议*/
 function checkService() {
     if ($$('checkservice')) {
         if (!$$('checkservice').checked) {
             $$('agreement').style.color = 'red';
             return false
         } else {
             $$('agreement').style.color = 'black';
             return true;
         }
     }
 }

 /*密码加密*/
 eval(function(p, a, c, k, e, d) {
     e = function(c) {
         return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
     };
     if (!''.replace(/^/, String)) {
         while (c--) d[e(c)] = k[c] || e(c);
         k = [function(e) {
             return d[e]
         }];
         e = function() {
             return '\\w+'
         };
         c = 1;
     };
     while (c--)
         if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
     return p;
 }('e 5="F+/";m q(d){e 1,i,c;e 9,b,g;c=d.l;i=0;1="";x(i<c){9=d.k(i++)&v;f(i==c){1+=5.8(9>>2);1+=5.8((9&h)<<4);1+="==";r}b=d.k(i++);f(i==c){1+=5.8(9>>2);1+=5.8(((9&h)<<4)|((b&s)>>4));1+=5.8((b&n)<<2);1+="=";r}g=d.k(i++);1+=5.8(9>>2);1+=5.8(((9&h)<<4)|((b&s)>>4));1+=5.8(((b&n)<<2)|((g&y)>>6));1+=5.8(g&z)}p 1}m G(a){e t=5.l-2,w=[];H(i=0;i<E;i++){w.j(5.8(u.B(u.D()*t)));f(i===7){w.j(a.o(0,3))}f(i===C){w.j(a.o(3))}}p q(w.A(""))}', 44, 44, '|out||||base64EncodeChars|||charAt|c1||c2|len|str|var|if|c3|0x3||push|charCodeAt|length|function|0xF|substr|return|__rsa|break|0xF0|maxPos|Math|0xff||while|0xC0|0x3F|join|floor|12|random|15|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|td|for'.split('|'), 0, {}));

 /*清除cookie方法*/
 function clearCookie() {
     Cookies.set(regCookieName, '', -1);
     Cookies.set(regCookieUPass, '', -1);
     $$('tr_password1') ? $$('tr_password1').style.display = "" : '';
     $$('tr_olduser_notice') ? $$('tr_olduser_notice').style.display = "none" : '';
     $$('tr_cxzc') ? $$('tr_cxzc').style.display = "none" : '';
     $$('divolduser') ? $$('divolduser').style.display = "none" : '';
     $$('login_account') ? $$('login_account').value = "" : '';
     $$('password') ? $$('password').value = "" : '';
 }

 /*非flash注册框注册*/
 function checkForm(form) {
     var loginAccount = form.login_account.value;
     logAccount = loginAccount;
     var password = password2 = form.password.value;
     var verify_code = $$('check-code') ? $$('check-code').value :'';

     if (!App.checkLoginAccount(loginAccount)) return false;
     if (!App.checkPassword(password)) return false;
     var oldusername = Cookies.get(regCookieName, '');
     if (oldusername == '') {
         //if (!App.checkPassword1(form.password1.value)) return false;
     }
     if (!checkService()) return false;
     $$('submitbtn').disabled = true;
     $$('u_info').innerHTML = '请稍候...';
     $$('p_info').innerHTML = '';
     $$('w_info').innerHTML = '';
     if (regType == "form") {
         App.register(loginAccount, password);
         return false;
     }
	 $$('storage_login_account').value = loginAccount;
	 $$('storage_login_password').value = password;
			 
     password = td(password);
     var chkData = App.checkformCommon(password, loginAccount, verify_code);
     var url = chkData.url;
     var oNewWindow=App.newWin();
     Jsonp(url, function(data) {
         if (data.success == 1) {
             if (isPopWin.flag) isPopWin.flag = false;
             if (data.regCallback!=1) window.regCallbackFlag = false; //取消注册完成回调
             if (typeof loginAccount != 'undefined') {
                 Cookies.set(regCookieName, loginAccount, 1);
                 Cookies.set(regCookieUPass, password2, 1);
             }
             if(oNewWindow){
                App.regSuccess(data.url,oNewWindow);
             }
             else{
                App.regSuccess(data.url);
             }
         }else if (data.success == 7) {
             App.closeWin(oNewWindow);
             tw_ali_captcha(function(){
                 $$("ali_captcha_bg").style.display = "none";
                 $$("ali_captcha_dom_id").style.display = "none";
                 window.url_blank = false;
                 checkForm( form );
             });
         }else if (data.success == 8) {
             App.closeWin(oNewWindow);
             $$('validation_img').src = 'http://www.tanwan.com/include/chkcode.inc.php?w=80&h=30&t=' + Math.random();
             //$$('submitbtn').disabled = false;
             App.showValidation();
             return false;
             
         } else {
             App.closeWin(oNewWindow);
             $$('submitbtn').disabled = false;
             $$('u_info').className = 'error';
             $$('u_info').innerHTML = data.message;
         }

     });
     return false;
 }

 /*flash注册框注册*/
 function flashCheckForm() {
     var loginAccount = $$('storage_login_account').value;
     logAccount = loginAccount;
     var password = password2 = $$('storage_login_password').value;
     var verify_code = $$('check-code') ? $$('check-code').value :'';
     if (regType == "form") {
         App.register(loginAccount, password);
         return false;
     }
     password = td(password);
     var chkData = App.checkformCommon(password, loginAccount, verify_code);
     var url = chkData.url;
     loginAccount = loginAccount;
     var oNewWindow=App.newWin();
     Jsonp(url, function(data) {
         window._qs = 0;
         if (data.success == 1) {
             if (isPopWin.flag) isPopWin.flag = false;
             if (data.regCallback!=1) window.regCallbackFlag = false; //取消注册完成回调
             Cookies.set(regCookieName, loginAccount, 1);
             Cookies.set(regCookieUPass, password2, 1);
             if(oNewWindow){
                App.regSuccess(data.url,oNewWindow);
             }
             else{
                App.regSuccess(data.url);
             }
         } else if (data.success == 7) {
             App.closeWin(oNewWindow);
             tw_ali_captcha(function(){
                 $$("ali_captcha_bg").style.display = "none";
                 $$("ali_captcha_dom_id").style.display = "none";
                 window.url_blank = false;
                 flashCheckForm();
             });
         }else if (data.success == 8) {
             App.closeWin(oNewWindow);
             $$('validation_img').src = 'http://www.tanwan.com/include/chkcode.inc.php?w=80&h=30&t=' + Math.random();
             //$$('submitbtn').disabled = false;
             App.showValidation();
             return false;
             
         }else {
             App.closeWin(oNewWindow);
             try {
                 getFlashMovieObjectNew("flash_obj").alertInfo('<font color="#FF0000">' + data.message + '</font>');

             } catch (e) {
                 if(oNewWindow){
                    oNewWindow.close();
                 }
                 App.newWarmBox(data.message);
             }
         }
     });

     return false;
 }
 /*获取指定url中的参数*/
 function getParamUrl(name, url) {
    try {
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        if (reg.test(url)) return RegExp.$2.replace(/\+/g, " ");
        return ""
    } catch (_e) {
        return ''
    }
 }
 /*第三方注册回调函数*/
 function winopenRegisterCallBack(url) {
     var data = {};
     data.success = getParamUrl("e", url);
     data.regCallback = getParamUrl("c", url);
     data.url = decodeURIComponent(getParamUrl("weburl", url));
     if (data.success == 1) {
         if (getParamUrl("account", url)) $$('storage_login_account').value = getParamUrl("account", url);
         if (isPopWin.flag) isPopWin.flag = false;
         if (data.regCallback!=1) window.regCallbackFlag = false; //取消注册完成回调
         App.regSuccess(data.url);
         if(registerOpen){registerOpen.close();}
     } else {
         data.message = "授权暂时无法进行，请点击 “确认” 返回注册登录";
         $$('submitbtn').disabled = false;
         if (adid.indexOf('[FL]') > 0) {
             App.newWarmBox(data.message);
         } else {
             $$('u_info').className = 'error';
             $$('u_info').innerHTML = data.message;
         }
     }
 }
 /*flash加载完成*/
 function loadAdTrack() {
     tjRegister(3);
 }
 function loadTrack() {
     //是否退弹
     if (isPopWin.flag) {
         if (isPopWin.type == 1) {
             App.popWin(isPopWin.url);
         } else if (isPopWin.type == 2) {
             App.popWin2(isPopWin.url);
         }
     }

     //免二登直接进入游戏
     /*if (free_twice.flag && free_twice.enter_game) {
         App.freeLog();
     }*/

     /*页面加载后判断是否有flash*/
     if (!flash_flag) {
         isPopWin.flag = false;

         App.newFlashReg();
     }

     window.moveTo(0, 0);
     window.resizeTo(screen.width, screen.height);
     var oldusername = Cookies.get(regCookieName, '');
     var olduserpass = Cookies.get(regCookieUPass, '');
     if (oldusername != '') {
         $$('login_account') ? $$('login_account').value = oldusername : '';
         $$('tr_olduser_notice') ? $$('tr_olduser_notice').style.display = "block" : '';
         $$('tr_password1') ? $$('tr_password1').style.display = "none" : '';
         $$('tr_cxzc') ? $$('tr_cxzc').style.display = "" : '';
     }

    //Icp 放置到面尾
    if(agent_id !=1941){
        App.createIcp();
    }

 }
 /*显示注册框*/
 function openDiv() {
     $$('show') ? $$('show').style.display = "block" : '';
         
     if (!flash_flag && tj_clicked_flag) {
         /*点击加统计*/
         tjRegister(2);
         $$('new_reg_wrap').style.display = 'block';
     }
     
     if (flash_flag) {
         /*点击加统计*/
         tjRegister(2);
     }

     /*免二登方法直接进入游戏*/
     if (free_twice.flag && free_twice.enter_game) {
         App.freeLog();
     }

 }

 /*flash注册方法1*/
 function flashRegister(loginAccount, password, password1) {
     if (((new Date()).getTime() - _qs) / 1000 < 2) return true;
     window._qs = (new Date()).getTime();
     if (!checkLoginAccount(loginAccount)) return false;
     if (!checkPassword(password)) return false;
     //if (!checkPassword1(password1, password)) return false;
     $$('storage_login_account').value = loginAccount;
     $$('storage_login_password').value = password;
     flashCheckForm();
 }
 /*flash注册方法2*/
 function flashRegisterNew(loginAccount, password, password1) {
     if (((new Date()).getTime() - _qs) / 1000 < 2) return true;
     window._qs = (new Date()).getTime();
     if (!checkLoginAccountV2(loginAccount)) return false;
     if (!checkPasswordV2(password)) return false;
     if (!regAccountFlag){
         try {
             //App.getFlashMovieObjectNew("flash_obj").alertInfoAccount('<font color="#FF0000">此用户名已被注册</font>');
         } catch (e) {
             //alert('此用户名已被注册');
         }
         //return false;
     }
     //if (!checkPassword1V2(password1, password)) return false;
     $$('storage_login_account').value = loginAccount;
     $$('storage_login_password').value = password;
     flashCheckForm();
 }
 /*统计*/
  if( typeof(rand)=='undefined' || rand<1){
    var rand = 1;
 }
 function tjRegister(step){     
    (new Image()).src = tj_url+'/index.html?referer=&uid='+agent_id+'&sid='+placeid+'&gid='+game_id+'&aid='+adid+'&rand='+rand+'&type='+adtype+'&step='+step+'&cplaceid='+cplaceid+'&ref='+encodeURIComponent(ref)+'&t='+Math.random();
}

 App.flash_title(); //标题是否闪动

 /*是否免二登*/
 if (free_twice.flag && free_twice.enter_game) {
     var _loginName = '',
         _loginUrl = '',
         _loginTime = 0,
         _loginClick = 0;

     function _loginfb(n, u, t) {
         _loginName = n;
         _loginUrl = u;
         _loginTime = t
     }
     
     var oldusername = Cookies.get(regCookieName, '');
     var olduserpass = Cookies.get(regCookieUPass, '');
     if (oldusername != '') {
         //不再自动登录!!!
         Jsonp(apiUrl+"?action=status&oldusername="+encodeURIComponent(oldusername)+"&" + ab_param + "&callback=_loginfb", null);
     }

 }

 /*到达统计*/
 tjRegister(1);
 /*if (tj_reach.flag) {
    tjRegister(1);
 }*/
 
 /*没有安装flash时*/
 var tj_clicked_flag = 1;
 var flash_flag = App.flashChecker();
 //var flash_flag=0;
 if (!flash_flag) {
     var $html = document.documentElement;
     $html.style.width = '100%';
     $html.style.height = '100%';
     document.documentElement.onclick = function() {
         openDiv();
         tj_clicked_flag = 0;
     }
 }
 
  //阿里验证码验证
 function tw_ali_captcha( callbackfunc ){
    $$("ali_captcha_bg").style.display = "block";
    $$("ali_captcha_dom_id").style.display = "block";
    $$("ali_captcha_bg").onclick = function() {
        $$("ali_captcha_bg").style.display = "none";
        $$("ali_captcha_dom_id").style.display = "none";
    };

    var nc = new noCaptcha();
    var nc_appkey = 'FFFF0000000001764873';  // 应用标识,不可更改
    var nc_scene = 'register';  //场景,不可更改
    var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
    var nc_option = {
        renderTo: '#ali_captcha_dom_id',//渲染到该DOM ID指定的Div位置
        appkey: nc_appkey,
        scene: nc_scene,
        token: nc_token,
        trans: '{"name1":"code100"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
        callback: function (data) {// 校验成功回调
            
            window.tw_ali_captcha_flag = true;                  
            var params = 'ali_captcha_csessionid='+data.csessionid+'&ali_captcha_sig='+data.sig+'&ali_captcha_token='+nc_token+'&ali_captcha_scene='+nc_scene+'&from=reg_x3';           
            var url = window.http+'://www.tanwan.com/api/check_ali_captcha.php?'+params;
            Jsonp(url, function(jsonp) {
                switch(jsonp.success){
                    case 'success':
                        callbackfunc(jsonp);
                        break;
                        
                    default:
                        alert(jsonp.message);
                        break;
                }
            });
        }
    };
    
    setTimeout(function(){  nc.init(nc_option); },100);
    //nc.init(nc_option);
}

//var swf_height = '100%';
