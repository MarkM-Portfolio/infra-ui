/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/query",
	"dijit/Menu",
	"dijit/MenuItem",
	"ic-ee/config",
	"ic-ee/widget/Button",
	"ic-incontext/util/url"
], function (dojo, array, lang, windowModule, domAttr, domClass, domConstruct, on, query, Menu, MenuItem, config, Button, url) {

	return {
		   
		   getItemIdFromRollupUrl: function(rollupUrl) {
		      var uu = url;
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
	          array.forEach(actions, function(action) {
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
	                      actionButton = domConstruct.create("span", {}, ctnr);
	                      menu = new Menu({"class": "lotusActionMenu lotusPlain"});
	                   }
	                   menuItem = new MenuItem({
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
		      var btn = domConstruct.create("button", {type: "button", className: "lotusBtn lotusBtnSpecial lotusFirst", title: action.title}, ctnr);
		         btn.appendChild(windowModule.doc.createTextNode(action.name));
		         if(action.optClasses)
		            domClass.add(btn, action.optClasses);	
		         if (action.isDisabled && action.isDisabled()){
			        domClass.add(btn, "lotusBtnDisabled");	
			 		btn.setAttribute("disabled", "true");
					btn.setAttribute("aria-disabled", "true");
		         }
		         else {
		            domClass.remove(btn, "lotusBtnDisabled");
			 		btn.removeAttribute("disabled");
					btn.removeAttribute("aria-disabled");
		         }
	             on(btn, "click", lang.hitch(action, "execute"));
	  
	         if (action.isFollow)
	            scope.followBtn = btn;
	         ctnr.style.display = "";   
		   },
	       isImage: function(ext) {
	          var imageTypes = config.common.imageFileTypes;
	          var index = array.indexOf(imageTypes, ext);
	          if (index != -1)
	             return true;
	          else
	             return false;
	       },
	       addMessageToNewWindowLinks: function() {
	    	   
	
	    	   var strings = i18nactivitystream;
	    	   
	    	   query("a").forEach(function(node, index, arr){
	    		
	    		   if(domAttr.get(node, "target") == "_blank") {
	    			   var title = domAttr.get(node, "title");
	    			   
	    			   if(domAttr.get(node, "newWindowLink"))
	        			   return;
	    			   
	    			   //if there isn't a title, there is probably a good reason for it, so let's leave as it is
	    			   if(title && strings && strings.opensInNewWindow){
	    				   title = title + " "+ strings.opensInNewWindow;
	    				   domAttr.set(node, "title", title);
	    				   domAttr.set(node, "newWindowLink", "true");
	    				   //remove aria-label to prevent JAWS to read it twice
	    				   domAttr.remove(node, "aria-label");
	    			   }
	    		   }
	    	   });
	       }
		};
});
