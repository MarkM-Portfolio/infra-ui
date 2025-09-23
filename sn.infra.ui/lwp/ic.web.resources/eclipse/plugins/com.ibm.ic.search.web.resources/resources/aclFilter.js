/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.           */

define([
	"dojo/on",
	"dojo/i18n!./nls/searchData",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/_base/lang",
	"dojo/dom-style",
	"dojo/query",
	"dojo/dom-geometry",
	"dijit/_Widget",
	"./searchAPI"
], function (on, i18nsearchData, domAttr, domConstruct, declare, domClass, lang, domStyle, query, domGeom, _Widget, searchAPI) {

	var aclFilter = declare(
		"lconn.search.aclFilter",
		_Widget,
	{
		apiHandler: null,
		_changed: false,
		_strings: null,
		onSubmit: null,
	
		postCreate: function(){		
			this._strings = i18nsearchData;
			
			domClass.add(this.domNode,"lotusLeft");
			
			var component = this.apiHandler.getComponentFilter();
			if (component==="profiles"){
				return;
			} else if (component!==""){
				if(domGeom.isBodyLtr()){
					domStyle.set(this.domNode, "marginRight", "10px");
				} else {
					domStyle.set(this.domNode, "marginLeft", "10px");
				}
			}
			
			var isPersonal = this.apiHandler.getPersonalOnly();
			var isAll = (isPersonal===false);
			
			var label=domConstruct.create('label',{
				"for": this.id+"_select",
				"innerHTML": this._strings.FILTERBY+"&nbsp;"
			}, this.domNode);
			
			if(domGeom.isBodyLtr()){
				domStyle.set(label, "marginRight", "5px");
			} else {
				domStyle.set(label, "marginLeft", "5px");
			}
			
			var select=domConstruct.create("select",{
				"id":this.id+"_select",
				"aria-label":this._strings.ACL_FILTER_LABEL,
				"aria-describedby":"lconnSearchResultsFiltersDescription"
			});
			domConstruct.place(this._createOption(this._getAllLabel(),"all",isAll),select);
			domConstruct.place(this._createOption(this._getPersonalLabel(),"personalOnly",isPersonal),select);
			domConstruct.place(select, this.domNode);
			
			this.connect(select, "onchange", lang.hitch(this, function(e){this.setAclFilter(select.value);}));
			this.connect(select, "onclick", lang.hitch(this, function(){
				if (this._changed){
					this.onSubmit({focusNode: this.id}); 
					this._changed = false;
				}
			}));
		},
		
		focus:function(){
			var select = query("select", this.domNode);
			if (select && select.length > 0){
				select[0].focus();
			}
		},
		
		setAclFilter:function(value){
			this.apiHandler.setPersonalOnly(value==="personalOnly");
			this._changed = true;
		},
		
		_createOption:function(label, value, selected){
			var option = domConstruct.create("option");
			if (selected === true){
				domAttr.set(option, "selected", "selected");
			}
			domAttr.set(option, "value", value);
			domAttr.set(option, "innerHTML", label);
			return option;
		},
		
		_getAllLabel:function(){
			var component = this.apiHandler.getComponentFilter();
			if (component==="communities"){
				return this._strings.ALLCOMMUNITIES;
			} else if (component==="activities"){ 
				return this._strings.ALLACTIVITIES;
			} else if (component==="forums"){
				return this._strings.ALLFORUMS;
			} else if (component==="blogs"){
				return this._strings.ALLBLOGS;
			} else if (component==="dogear"){
				return this._strings.ALLBOOKMARKS;
			} else if (component==="files"){
				return this._strings.ALLFILES;
			} else if (component==="wikis"){
				return this._strings.ALLWIKIS;
			} else if (component==="status_updates"){
				return this._strings.ALLSTATUSUPDATES;
			}
			return this._strings.ALLRESULTS;
		},
		
		_getPersonalLabel:function(){
			var component = this.apiHandler.getComponentFilter();
			if (component==="communities"){
				return this._strings.MYCOMMUNITIES;
			} else if (component==="activities"){
				return this._strings.MYACTIVITIES;
			} else if (component==="forums"){
				return this._strings.MYFORUMS;
			} else if (component==="blogs"){
				return this._strings.MYBLOGS;
			} else if (component==="dogear"){
				return this._strings.MYBOOKMARKS;
			} else if (component==="files"){
				return this._strings.MYFILES;
			} else if (component==="wikis"){
				return this._strings.MYWIKIS;
			} else if (component==="status_updates"){
				return this._strings.MYSTATUSUPDATES;
			}
			return this._strings.MYCONTENT;
		}
	});
	
	return aclFilter;
});
