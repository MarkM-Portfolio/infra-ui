/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

var DogearBookmarklet = {	
	//For IE, this version num will be overwrited in DogearBookmarklet.init()

	version: "4.5",
	path: "",
	requires: [],
	kID: "dogear_postUrl",
	inframe: "false",
	
	init: function () {
		var included_libs,scripts,src,lib,ver;
		included_libs=[];
		scripts = document.getElementsByTagName('script');
		for (var i=scripts.length-1;i>=0;i--) {
			src = scripts[i].src;
			// Before 4.5, the ver is null
			ver = scripts[i].ver;
			if (src) {
				included_libs[src.slice(1+src.lastIndexOf("\/"))] = true;
				if (!DogearBookmarklet.path){
					if (src.match(/tools\/blet\.js(\?.*)?$/)) {
						DogearBookmarklet.path = src.replace(/tools\/blet\.js(\?.*)?$/,'');
						DogearBookmarklet.version=ver;
					}
				}
                if(DogearBookmarklet.path) break;
			}
		}
		for (i=0; i<DogearBookmarklet.requires.length; i++) {
			lib = DogearBookmarklet.requires[i];
			if (!included_libs[lib]) {
				var script=document.createElement('script');
				script.charset='UTF-8';
				script.src=DogearBookmarklet.path + lib;
				document.body.appendChild(script);
			}
		}
	},
	

	addPostUrlTag: function ()
	{

		var desc=document.getElementsByName('description')[0];
		if(!desc) {
			desc=document.getElementsByName('Description')[0];
		}
		if(!desc) {
			desc=document.getElementsByName('DC:Description')[0];
		}
		if (!desc) {
			desc = '';
		}
		var verbiage=(desc&&desc.content)?(desc.content):'';
		
		var perma = 'false';
		var url = location.href;
		var title = document.title;
		var head = document.getElementsByTagName("head")[0];
		if (head) {
			link =head.getElementsByTagName('Link');
			if(link.length > 0) {
				for(var i=0; i <= link.length; i++) {
					if(link[i]) {
						rel=link[i].getAttribute('rel');
						if(rel=='bookmark') {
							url=link[i].getAttribute('href');
							perma='true';
							if(url.indexOf('/') == 0) {
						      url = location.protocol + '//' + location.host + url;
							}
							relTitle=link[i].getAttribute('title');
							if(relTitle) title = relTitle;
							break;
						}
					}
				}
			}
		}
        
        var postUrl = DogearBookmarklet.path + 'post?url='+encodeURIComponent(url)+
        	'&ver='+ DogearBookmarklet.version+
			'&title='+encodeURIComponent(title)+
			'&verbiage='+encodeURIComponent(verbiage)+
			'&perma='+perma;
		
		dogearPostUrl = document.createElement('dogear:postUrl');
		dogearPostUrl.charset='UTF-8';
		dogearPostUrl.style.display = 'none';
		dogearPostUrl.id = DogearBookmarklet.kID;
		dogearPostUrl.href = postUrl;
		//alert(title);
		dogearPostUrl.title = unescape(title.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}));
		//alert(dogearPostUrl.title);
		dogearPostUrl.url = (url.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}));
		dogearPostUrl.verbiage = unescape(verbiage.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}));
		dogearPostUrl.version = DogearBookmarklet.version;
		
        var oldPostChild = document.getElementById(DogearBookmarklet.kID);
        
		if (oldPostChild) {
            document.body.replaceChild(dogearPostUrl, oldPostChild);
        }else {
			document.body.appendChild(dogearPostUrl);
		}
	},
	
	openBookmarklet: function(){
		var u=document.getElementById('dogear_postUrl');
		var h = DogearBookmarklet.path;
		var e=encodeURIComponent;
		var t = setTimeout;
		var _form = document.forms["dogear_post_form"];
		if (!_form){
			_form = document.createElement("form");
			//_form.style.display = "none";
			_form.style.position = "absolute";
			_form.style.top = "-9999px";
			_form.style.left = "0px";
			_form.method = "post";
			_form.action = h + "post";
			_form.id = "dogear_post_form";
		}
		_form.innerHTML = "<input type='text' name='url'><input type='text' name='title'><textarea name='verbiage'></textarea><input type='text' name='ver'>";
		document.body.insertBefore(_form, document.body.firstChild);
		document.forms["dogear_post_form"].title.value = u.title;
		document.forms["dogear_post_form"].url.value = u.url;
		document.forms["dogear_post_form"].verbiage.value = u.verbiage;
		document.forms["dogear_post_form"].ver.value=u.version;
		if (_inframe){
			_inframeInput = document.createElement("input");
			_inframeInput.type = "hidden";
			_inframeInput.name = "inframe";
			_inframeInput.value = "true";
			_form.appendChild(_inframeInput);
			_form.target = "_self";
			t("var u=document.getElementById('dogear_postUrl');if(u){document.forms['dogear_post_form'].submit();}else{u=h+'/post?url='+e(location.href)+'&title='+e(document.title);location.href=u+'&inframe=true&ver=4.5';}",250)
		}else{
			var submitFunc = function(){
				var u=document.getElementById('dogear_postUrl');
				var dw;
				if (u){
					if (u.href.length <= 2083){
						dw=window.open(u.href, '_dogear', 'toolbars=no,scrollbars=yes,resizable=yes,width=760,height=450');
					}else {
						dw=window.open(h+'post/blank', '_dogear', 'toolbars=no,scrollbars=yes,resizable=yes,width=760,height=450');
						document.forms['dogear_post_form'].target='_dogear';
						document.forms['dogear_post_form'].submit();
					}
				}else {
					u=h+'/post?url='+e(location.href)+'&title='+e(document.title);
					dw=open(u+'&ver='+DogearBookmarklet.version,'_dogear','toolbars=no,scrollbars=yes,resizable=yes,width=760,height=450');
				}
				if(!(dw==null||typeof(dw)=='undefined')){dw.focus()}
			}
			t(submitFunc,250)
		}
	}
}

DogearBookmarklet.init();
DogearBookmarklet.addPostUrlTag();
if(navigator.userAgent.indexOf("MSIE")>0) { 
	DogearBookmarklet.openBookmarklet();
}
