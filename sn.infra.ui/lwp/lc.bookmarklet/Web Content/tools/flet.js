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

var Feedlet = {	
	version: "1.0",
	path: "",
	requires: [],
	kID: "feedlet_postUrl",
	
	init: function () {
		var included_libs,scripts,src,lib;
		included_libs=[];
		scripts = document.getElementsByTagName('script');
		for (var i=0,imax=scripts.length;i<imax;i++) {
			src = scripts[i].src;
			if (src) {
				included_libs[src.slice(1+src.lastIndexOf("\/"))] = true;
				if (!Feedlet.path){
					if (src.match(/tools\/flet\.js(\?.*)?$/)) {
						Feedlet.path = src.replace(/tools\/flet\.js(\?.*)?$/,'');
					}
				}
			}
		}
		for (i=0; i<Feedlet.requires.length; i++) {
			lib = Feedlet.requires[i];
			if (!included_libs[lib]) {
				var script=document.createElement('script');
				script.charset='UTF-8';
				script.src=Feedlet.path + lib;
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
		var verbiage=(desc&&desc.content)?encodeURIComponent(desc.content):'';
		
		var perma = 'false';
		var url = location.href;
		var title = document.title;
		head = document.getElementsByTagName("head")[0];
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


		if (!document.getElementById(Feedlet.kID)) {
			var postUrl = Feedlet.path + 'postFeed?url='+encodeURIComponent(url)+
				'&title='+encodeURIComponent(title)+
				'&verbiage='+verbiage+
				'&perma='+perma;
			
			feedPostUrl = document.createElement('dogear:postUrl');
			feedPostUrl.charset='UTF-8';
			feedPostUrl.style.display = 'none';
			feedPostUrl.id = Feedlet.kID;
			feedPostUrl.href = postUrl;
			document.body.appendChild(feedPostUrl);

		}
	},
	
	openBookmarklet: function(){
		var u=document.getElementById('dogear_postUrl');
		var h = DogearBookmarklet.path;
		var e=encodeURIComponent;
		var t = setTimeout;
		if (_inframe){
			t("var u=document.getElementById('dogear_postUrl');if(u){u=u.href;}else{u=h+'/post?url='+e(location.href)+'&title='+e(document.title);}location.href=u+'&inframe=true&ver=0.9';",250)
		}else{
			t("var u=document.getElementById('dogear_postUrl');if(u){u=u.href;}else{u=h+'/post?url='+e(location.href)+'&title='+e(document.title);}dw=open(u+'&ver=0.9','dogear','toolbars=no,scrollbars=yes,resizable=yes,width=670,height=750');if(!(dw==null||typeof(dw)=='undefined')){dw.focus()}",250)
		}
	}
}

Feedlet.init();
Feedlet.addPostUrlTag();
if(navigator.userAgent.indexOf("MSIE")>0) { 
	DogearBookmarklet.openBookmarklet();
}
