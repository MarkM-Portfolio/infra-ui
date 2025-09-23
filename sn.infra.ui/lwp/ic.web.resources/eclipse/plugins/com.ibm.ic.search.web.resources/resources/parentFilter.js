/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.           */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n!./nls/searchData",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/on",
	"dojo/query",
	"dojo/dom-geometry",
	"dijit/_Widget"
], function (declare, lang, i18nsearchData, domAttr, domClass, domConstruct, domStyle, on, query, domGeom, _Widget) {

	var parentFilter = declare(
		"lconn.search.parentFilter",
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
			if (component!=="activities" && component!=="forums" && component!=="blogs"
					&& component!=="files" && component!=="all_files"
					&& component!=="wikis" && component!=="status_updates"){
				return;
			}
	
			var isNone = (this.apiHandler.getParent() === "none");
			var isCommunities = (this.apiHandler.getParent() === "communities");
			var isAll = (isNone===false)&&(isCommunities===false);
	
			var select=domConstruct.create("select", {
				"id": this.id+"_select",
				"aria-label": this._strings.PARENT_FILTER_LABEL,
				"aria-describedby": "lconnSearchResultsFiltersDescription"
			});
	
			if (component!=="files" && component!=="all_files" && component!=="ecm_files" && component!=="status_updates"){
				var span=domConstruct.create('span',{
					"innerHTML": "&nbsp;"
				}, this.domNode);
			} else {
				var label=domConstruct.create('label',{
					"for": domAttr.get(select, "id"),
					"innerHTML": this._strings.SHOW+"&nbsp;" 
				}, this.domNode);
				
				if(domGeom.isBodyLtr()){
					domStyle.set(label, "marginRight", "5px");
				} else {
					domStyle.set(label, "marginLeft", "5px");
				}
			}
	
			domConstruct.place(this._createOption(this._getAllLabel(),"all",isAll), select);
			domConstruct.place(this._createOption(this._getStandaloneLabel(),"none",isNone), select);
			domConstruct.place(this._createOption(this._getCommunityLabel(),"communities",isCommunities), select);
			domConstruct.place(select, this.domNode);
	
			this.connect(select, "onchange", lang.hitch(this, function(e){this.setParentFilter(select.value);}));
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
	
		setParentFilter:function(value){
			if (value==="none" || value==="communities"){
				this.apiHandler.setParent(value);
			} else {
				this.apiHandler.setParent(null);
			}
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
			if (component==="activities"){
				return this._strings.ALLTYPESACTIVITIES;
			} else if (component==="forums"){
				return this._strings.ALLTYPESFORUMS;
			} else if (component==="blogs"){
				return this._strings.ALLTYPESBLOGS;
			} else if (component==="dogear"){
				return this._strings.ALLTYPESBOOKMARKS;
			} else if (component==="files"||component==="all_files"){
				return this._strings.ALLTYPESFILES;
			} else if (component==="wikis"){
				return this._strings.ALLTYPESWIKIS;
			} else if (component==="status_updates"){
				return this._strings.ALLTYPESSTATUSUPDATES;
			}
		},
	
		_getCommunityLabel:function(){
			var component = this.apiHandler.getComponentFilter();
			if (component==="activities"){
				return this._strings.COMMUNITYACTIVITIES;
			} else if (component==="forums"){
				return this._strings.COMMUNITYFORUMS;
			} else if (component==="blogs"){
				return this._strings.COMMUNITYBLOGS;
			} else if (component==="dogear"){
				return this._strings.COMMUNITYBOOKMARKS;
			} else if (component==="files"||component==="all_files"){
				return this._strings.COMMUNITYFILES;
			} else if (component==="wikis"){
				return this._strings.COMMUNITYWIKIS;
			} else if (component==="status_updates"){
				return this._strings.COMMUNITYSTATUSUPDATES;
			}
		},
	
		_getStandaloneLabel:function(){
			var component = this.apiHandler.getComponentFilter();
			if (component==="activities"){
				return this._strings.STANDALONEACTIVITIES;
			} else if (component==="forums"){
				return this._strings.STANDALONEFORUMS;
			} else if (component==="blogs"){
				return this._strings.STANDALONEBLOGS;
			} else if (component==="dogear"){
				return this._strings.STANDALONEBOOKMARKS;
			} else if (component==="files"||component==="all_files"){
				return this._strings.STANDALONEFILES;
			} else if (component==="wikis"){
				return this._strings.STANDALONEWIKIS;
			} else if (component==="status_updates"){
				return this._strings.STANDALONESTATUSUPDATES;
			}
		}
	});
	
	return parentFilter;
});
