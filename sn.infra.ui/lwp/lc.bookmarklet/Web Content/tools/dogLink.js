/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
	Utility functions to generate HTML that correctly
	pops up a dogear posting interface.
*/
var DogLink = {
	version: "1.0",
	path: "",
	requires: [],
	count: 0,
	reqElems: new Array(5),
	
	nothing: function () {
		return false;
	},
	
	init: function() {
		var included_libs,head,scripts,s,src,num,lib,param;
		included_libs = new Array();
		scripts = document.getElementsByTagName("script");
		for (var i=0; i<scripts.length; i++) {
			s = scripts[i];
			src = s.src;
			if (src) {
				num = src.lastIndexOf("\/");
				lib = src.slice(num+1);
				included_libs[lib] = true;
				if (src.match(/tools\/dogLink\.js(\?.*)?$/)) {
					DogLink.path = src.replace(/tools\/dogLink\.js(\?.*)?$/,'');
					break;
				}
			}
		}
		for (i=0; i<DogLink.requires.length; i++) {
			lib = DogLink.requires[i];
			if (!included_libs[lib]) {
				var script=document.createElement('script');
				script.charset='UTF-8';
				script.src=DogLink.path + lib;
				head[0].appendChild(script);
			}
		}
	},
	
	post_to_dogear: function(url, title, tags, description)
	{
		dw = window.open(
			DogLink.path + 'post?url=' + encodeURIComponent(url) +
				'&tags=' + encodeURIComponent(tags) + 
				'&title=' + encodeURIComponent(title) + 
				'&ver=4.5' + 
				'&verbiage=' + encodeURIComponent(description),
			 'dogear',
			 'toolbars=no,scrollbars=yes,resizable=yes,width=760,height=500');
		setTimeout('dw.focus();', 250);
	},
	
	escape_q: function(s)
	{
		var t = '';
		for (var i = 0; i < s.length; i++)
		{
			var c = s.charAt(i) ;
			if (c == '"' || c == "'" || c == '\\')
				t += '\\';
			t += c;
		}
		return t;
	},
	
	unescape_bc: function (s)  
	{  
  		var t = '';  
		for (var i = 0; i < s.length; i++)  
		{  
			var c = s.charAt(i) ;  
			if (c == '+')  
		                t += ' ';  
  	 	         else  
	               t += c;  
  		}  
  	        return unescape(t);  
  	},
  	 	 
	
	makePost: function(url, title, tags, description)
	{
		// fix double-encoding bug from bcv2  
		title = DogLink.unescape_bc(title);   
		url = DogLink.unescape_bc(url);   
           
		if (arguments.length < 1)
			url = location.href;
		if (arguments.length < 2)
			title = document.title;
		if (arguments.length < 3)
			tags = '';
		if (arguments.length < 4)
			description = document.getElementsByName('description')[0];
		if(!description)
			description = document.getElementsByName('Description')[0];
		if(!description)
			description = document.getElementsByName('DC:Description')[0];
		if (!description)
			description = '';
			
		document.write("<a class='dogpost' title='Bookmark \"" + DogLink.escape_q(title) + "\" on dogear' href=\"javascript:(function(){DogLink.post_to_dogear('" + DogLink.escape_q(url) + "', '" + DogLink.escape_q(title) + "', '" + DogLink.escape_q(tags) + "', '" + DogLink.escape_q(description) + "');})();\">");
		document.write("<img src='"+  DogLink.path +"/misc/favicon.gif' width='16' height='16' border='0' />");
		document.write("</a>");
	}
	
	
}

DogLink.init();
