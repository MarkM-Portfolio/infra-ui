/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.widget.Button");
dojo.require("com.ibm.social.ee.config");

(function () {
	var misc = com.ibm.social.ee.util.misc = {
	   
	   // gatekeeper setting for showing AVT tooltips
	   CONNECTIONS_TOOLTIP_GK: "common-tooltip",		
			
	   getItemIdFromRollupUrl: function(rollupUrl) {
	      var uu = com.ibm.social.incontext.util.url;
	      var urlObj = uu.parse(rollupUrl);
		   return urlObj.queryParameters.filterValue;
	   },
      getItemId: function(ctxId) {
         return misc._getTextAfterLastIden(ctxId,":");
      },
	   _getTextAfterLastIden: function(str, iden) {
		   var id = str, index =-1;
		   if(id) {
		      index = id.lastIndexOf(iden);
		      if(index != -1)
		    	  id = id.substring(index+1);
		   }
		   return id;
	   },
	   generateActionBtns: function(scope, ctnr, actions, nls) {
   	    var actionButton = null, menu = null, menuItem = null, firstItem = false, secondItem = false, misc = this, size = actions.length;
          dojo.forEach(actions, function(action) {
             if (action.isVisible()) {
                if (!firstItem) {
                   misc.createButton(ctnr, action, scope);
                   firstItem = true;
                }
                else if(!secondItem && (size <= 2)) {
                   //Only show second button if there are 2 actions total. Otherwise, show More drop down.
                   misc.createButton(ctnr, action, scope);
                   secondItem = true;
                }
                else {
                   if (!menu) {
                      actionButton = dojo.create("span", {}, ctnr);
                      menu = new dijit.Menu({"class": "lotusActionMenu lotusPlain"});
                   }
                   menuItem = new dijit.MenuItem({
                      label: action.name,
                      title: action.title,
                      onClick: action.execute
                   });
                   menu.addChild(menuItem);
                   if(action.isFollow)
                      scope.followBtn = menuItem.containerNode;
                }
             }
          });
          if(menu && menuItem && actionButton) {
             var menuOpts = {};
             menuOpts["label"] = nls.common.more.label;
             menuOpts["tooltip"] = nls.common.more.tooltip;
             menuOpts["a11yLabel"] = "";
             menuOpts["dropDown"] = menu;
             menuOpts["showMenuLabel"] = nls.common.more.label;
             new com.ibm.social.ee.widget.DropDownButton(menuOpts, actionButton);
          }	      
	   },
	   createButton: function(ctnr, action, scope) {
	      var btn = dojo.create("button", {type: "button", className: "lotusBtn lotusBtnSpecial lotusFirst", title: action.title}, ctnr);
	         btn.appendChild(dojo.doc.createTextNode(action.name));
	         if(action.optClasses)
	            dojo.addClass(btn, action.optClasses);	
	         if (action.isDisabled && action.isDisabled()){
		        dojo.addClass(btn, "lotusBtnDisabled");	
		 		btn.setAttribute("disabled", "true");
				btn.setAttribute("aria-disabled", "true");
	         }
	         else {
	            dojo.removeClass(btn, "lotusBtnDisabled");
		 		btn.removeAttribute("disabled");
				btn.removeAttribute("aria-disabled");
	         }
             dojo.connect(btn, "onclick", action, "execute");
  
         if (action.isFollow)
            scope.followBtn = btn;
         ctnr.style.display = "";   
	   },
       isImage: function(ext) {
          var imageTypes = com.ibm.social.ee.config.common.imageFileTypes;
          var index = dojo.indexOf(imageTypes, ext);
          if (index != -1)
             return true;
          else
             return false;
       },
       addMessageToNewWindowLinks: function() {
    	   

    	   var strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
    	   
    	   dojo.query("a").forEach(function(node, index, arr){
    		
    		   if(dojo.attr(node, "target") == "_blank") {
    			   var title = dojo.attr(node, "title");
    			   
    			   if(dojo.attr(node, "newWindowLink"))
        			   return;
    			   
    			   //if there isn't a title, there is probably a good reason for it, so let's leave as it is
    			   if(title && strings && strings.opensInNewWindow){
    				   title = title + " "+ strings.opensInNewWindow;
    				   dojo.attr(node, "title", title);
    				   dojo.attr(node, "newWindowLink", "true");
    				   //remove aria-label to prevent JAWS to read it twice
    				   dojo.removeAttr(node, "aria-label");
    			   }
    		   }
    	   });
       }
	};
})();
