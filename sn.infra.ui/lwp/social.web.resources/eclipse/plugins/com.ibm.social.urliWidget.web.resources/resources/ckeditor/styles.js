dojo.provide("lconn.box.ckeditor.styles");

 
if(!document.getElementById('_lconnBoxCKEditorStyleSheet')){
   var linkstyle = document.createElement('link');
	linkstyle.type = 'text/css';
	linkstyle.rel = 'stylesheet';
	linkstyle.id = '_lconnBoxCKEditorStyleSheet';
	var el = document.getElementsByTagName('html')[0];
	var webresources = lconn.core.config.services.webresources; 
	var uri = webresources.secureEnabled ? webresources.secureUrl : webresources.url;
	if( el && el.dir === "rtl"){
	  uri += '/web/lconn.box/css/ckeditorRTL.css';
	} else {
	  uri += '/web/lconn.box/css/ckeditor.css';
	}
	linkstyle.href = uri;
     
  	var elHead = document.getElementsByTagName('head')[0];
  	if(elHead){
    	elHead.appendChild(linkstyle);
  	}
}