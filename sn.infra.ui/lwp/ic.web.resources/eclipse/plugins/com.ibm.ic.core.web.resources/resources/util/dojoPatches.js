/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/has"
], function (dojo, lang, windowModule, domConstruct, domStyle, has) {

	dijit._frames = new function(){
	   // summary:
	   //    cache of iframes
	   var queue = [];
	   this.pop = function(){
	      var iframe;
	      if(queue.length){
	         iframe = queue.pop();
	         iframe.style.display="";
	      }else{
	         if(has("ie")){
	            var burl = dojo.config["dojoBlankHtmlUrl"] || (require.toUrl("dojo/resources/blank.html")+"") || "javascript:\"\"";
	            
	            if(has("ie") > 8) {
	               iframe = windowModule.doc.createElement('iframe');
	               iframe.setAttribute("src", burl);
	               iframe.setAttribute("style", "position: absolute; left: 0px; top: 0px;" + "z-index: -1; filter:Alpha(Opacity=\"0\");");
	            } else {
	               var html="<iframe src='" + burl + "'"
	                  + " style='position: absolute; left: 0px; top: 0px;"
	                  + "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
	               iframe = windowModule.doc.createElement(html);
	            }
	         } else {
	            iframe = domConstruct.create("iframe");
	            iframe.src = 'javascript:""';
	            iframe.className = "dijitBackgroundIframe";
	            domStyle.set(iframe, "opacity", 0.1);
	         }
	         iframe.tabIndex = -1; // Magic to prevent iframe from getting focus on tab keypress - as style didnt work.
	         
	         // Workaround for accessibility issue (defect 31277), where attribute role='presentation' is missing in dojo-1.4 dijit.backgroundIframe  
	         if (!dijit.hasWaiRole(iframe)) {
	            dijit.setWaiRole(iframe, "presentation");
	         }
	      }
	      return iframe;
	   };
	
	   this.push = function(iframe){
	      iframe.style.display="none";
	      queue.push(iframe);
	   }
	}();
	
	
	//Detects the new MSEdge browser
	(function() {
		if (typeof dojo.isEdge == "undefined") {
			dojo.isEdge = false;
			try {
				var vers = navigator.appVersion + ".";
				if (vers.indexOf(" Edge/") > -1) {
					vers = vers.substring(vers.indexOf(" Edge/")+6);
					vers = vers.substring(0, vers.indexOf("."));
					vers = parseInt(vers, 10);
					
					dojo.isEdge = vers;
				}
			} catch (e) {

			}

		}	
	})();
	
	
	// Friendly reminder to callers of runtime dojo.require
	(function(dj) {
	   if (dj.config.isDebug) return;
	   function n(args) {
	      var mc = lang.getObject("callee.caller", false, args),
	         cn = mc ? /function ?([^\(]*)/.exec(mc)[1] : null;
	      return cn || "(anonymous)";
	   };
	   var _dj_require = dj.require;
	   dj.require = function() {
	      var c = arguments[0];
	      if (!dj.getObject(c))
	         console.warn("Avoid calling dojo.require() to load classes at runtime, use net.jazz.ajax.xdloader.load_async() instead. Function '%s' required class '%s'.", n(arguments), c);
	      _dj_require.apply(dj, arguments);
	   }
	})(dojo);
	
	return lconn.core.util.dojoPatches;
});
