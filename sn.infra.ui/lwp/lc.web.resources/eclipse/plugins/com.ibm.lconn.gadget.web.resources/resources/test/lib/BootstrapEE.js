/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.test.lib.BootstrapEE');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');
dojo.require('dijit._Templated');

dojo.require('lconn.core.url');
dojo.require('lconn.core.config.services');
dojo.require('com.ibm.oneui.util.proxy');
dojo.require('com.ibm.social.incontext.util.proxy');

dojo.require('com.ibm.lconn.gadget.test.lib.authUtils');

dojo.require('com.ibm.lconn.gadget.container.iContainer2');
dojo.require('com.ibm.lconn.gadget.util.trace');

(function(
 dojo,
 _Widget,
 _Container,
 _Templated,
 iContainer,
 _trace,
 lconn_core_url_,
 lconn_core_config_services_,
 com_ibm_oneui_util_proxy_) {
	
	// hook to indicate login fail
	var loginSuccess_ = com.ibm.lconn.gadget.test.lib.authUtils.isAuthenticated;
	
	dojo.declare('com.ibm.lconn.gadget.test.lib.BootstrapEE', [_Widget, _Container, _Templated], {
		/* template path */
		templatePath: dojo.moduleUrl('com.ibm.lconn.gadget', 'test/lib/templates/BootstrapEE.html'),
		
		// Widgets in template are optionally supported by _Templated. Use _WidgetsInTemplateMixin in the future
		// See http://dojotoolkit.org/reference-guide/1.7/releasenotes/1.7.html#templatedmixin-widgetsintemplatemixin
		widgetsInTemplate: true,
		
		disableButtons : (loginSuccess_) ? '' : 'disabled="disabled"', 
				
		buttonStyle : (loginSuccess_) ? 'lotusBtn' : 'lotusBtnDisabled',
		
		// Widget attributes
		definitionUrl : '',
		
		// attach points
		eeDataModel : null,
		eeGadgetRootNode : null,
		eeGadgetPostForm : null,
		eeGadgetPostUrl : null,
		eeGadgetPostText : null,
		
		loadGadgetButton : null,
		unloadGadgetButton : null,
		setupPostGadgetButton : null,
		postGadgetButton : null,
		
		//
		postCreate : function() {
			this.connect(this.loadGadgetButton, 'onclick', '_handleLoad');
			this.connect(this.unloadGadgetButton, 'onclick', '_handleUnload');
			this.connect(this.setupPostGadgetButton, 'onclick', '_handleSetupPostToAS');
			this.connect(this.postGadgetButton, 'onclick', '_handlePostToAS');
		},
		
		// set the definition URL
		setDefinitionUrl : function(url) {
			this.definitionUrl = url;
		},
		
		getOptions : function() {
			return {"eeDataModel":this.eeDataModel.value, "eeGadgetPostText":this.eeGadgetPostText.value};
		},
		
		setOptions : function(options) {
			this.eeDataModel.value = options.eeDataModel ? options.eeDataModel : this.eeDataModel.value;
			if(loginSuccess_ && options.eeGadgetPostText) {
				this.eeGadgetPostText.value = options.eeGadgetPostText;
			}
		},
		
		// common unload method
		unload : function() {
			this._handleUnload();
		},
		
		/* Load the gadget */
		_handleLoad : function() {
			this._handleUnload();

			var spec = {
				definitionUrl: this.definitionUrl,
				componentType : 'gadget',
				placement : this.eeGadgetRootNode,
				instanceData : {
					renderParams : { },
					eeDataModel: {
						context: this._getJsonData("eeDataModel")
					}
				}
			};
			
			this._handle = iContainer.loadWidget(spec);
		},
		
		/* Unload the gadget */
		_handleUnload : function() {
			dojo.style(this.eeGadgetPostForm, "display", "none");
			dojo.style(this.eeGadgetRootNode, "display", "block");
			if (this._handle) {
				this._handle.unload();
				this._handle = null;
			}
		},
		
		_handleSetupPostToAS : function() {
			var location_ = dojo.global.location,
			creResUrl_ = lconn_core_config_services_.opensocial,
			creResUrlObj_ = lconn_core_url_.parse(
				location_.toString(), creResUrl_ ? com_ibm_oneui_util_proxy_(
					lconn_core_url_.getServiceUrl(creResUrl_).toString()) : "");
			var ASurl = com.ibm.social.incontext.util.proxy(creResUrlObj_.toString() +  "/rest/activitystreams/@me/@all/@all");
			var postBody = {
					  "generator": {
						    "image": {"url": "/homepage/nav/common/images/iconProfiles16.png"},
						    "id": "demoApp",
						    "displayName": "Demo Application",
						    "url": "http://www.ibm.com/"
						  },
						  "actor": {
						    "id": "@me"
						  },
						  "verb": "post",
						  "title": "${share}",
						  "content":"Embedded Experience posted from Bootstrap Page",
						  "updated": "2012-01-01T12:00:00.000Z",
						  "object": {
						    "summary": "Bootstrap EE",
						    "objectType": "note",
						    "id": "bootstrapEE",
						    "displayName": "Bootstrap EE",
						    "url": "http://www.ibm.com/"
						  },
						  "target": {
						    "summary": "Bootstrap EE",
						    "objectType": "Bootstrap EE",
						    "id": "bootstrapEE",
						    "displayName": "bootstrapEE",
						    "url": "http://www.ibm.com/"
						  },
						 "openSocial": {
						    "embed": {
						      "gadget": this.definitionUrl,
						      "context": this._getJsonData("eeDataModel")
						    }
						  },
						  "connections": {
						    "rollupid": "bootstrapEE" + new Date().getTime() // this must be unique to make a new post
						  }

						};
			dojo.style(this.eeGadgetPostForm, "display", "block");
			dojo.style(this.eeGadgetRootNode, "display", "none");
			if(loginSuccess_) {
				this.eeGadgetPostUrl.value = ASurl;
				
				// only do a hard update if it's the first run
				if(this.eeGadgetPostText.value[0]!=="{") {
					this.eeGadgetPostText.value = dojo.toJson(postBody, 4);
				}
				else { // otherwise just update the dataModel
					var currentVal = this._getJsonData("eeGadgetPostText");
					currentVal.openSocial.embed.context = this._getJsonData("eeDataModel");
					this.eeGadgetPostText.value = dojo.toJson(currentVal, 4);
				}
			}
			
		},
		_handlePostToAS: function() {
			dojo.xhrPost({
				"handleAs":"json",
				"headers": { "Content-Type": "application/json; charset=utf-8"},
				"url":this.eeGadgetPostUrl.value,
				"postData":this.eeGadgetPostText.value,
				"load":function(){_trace.log("EE successfully posted");},
				"error":_trace.error
				});
		},
		
		_getJsonData: function(dojoAttachPoint) {
			var jsonData = this[dojoAttachPoint].value;
			try {
				jsonData = dojo.fromJson(jsonData);
			} catch(e) {
				_trace.log("error running dojo.fromJson on " + dojoAttachPoint + ", sending plain-text anyway...");
			}
			return jsonData;
		}
	});

})
(dojo,
 dijit._Widget,
 dijit._Container,
 dijit._Templated,
 com.ibm.lconn.gadget.container.iContainer2,
 com.ibm.lconn.gadget.util.trace,
 lconn.core.url,
 lconn.core.config.services,
 com.ibm.oneui.util.proxy);
