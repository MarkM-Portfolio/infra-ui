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
	"dijit/_Widget",
	"ic-core/config/features"
], function (declare, lang, i18nsearchData, domAttr, domClass, domConstruct, domStyle, on, query, domGeom, _Widget, has) {

	var typeFilter = declare(
		"lconn.search.typeFilter",
		_Widget,
	{
		apiHandler: null,
		_changed: false,
		communitiesEnabled: false,
		defaultProfilesUserStateSearch: false,
		forumCategoriesEnabled: false,
		ideationBlogsEnabled: false,
		_strings: null,
		onSubmit: null,
		
		postCreate: function(){
			this._strings = i18nsearchData;
			
			domClass.add(this.domNode,"lotusLeft");
			
			var component = this.apiHandler.getComponentFilter();
			if (component!=="activities" && component!=="forums" && component!=="blogs"
				&& component!=="communities" && component!=="wikis" && component!=="profiles"){
				return;
			}
			
			if(domGeom.isBodyLtr()){
				domStyle.set(this.domNode, "marginRight", "5px");
			} else {
				domStyle.set(this.domNode, "marginLeft", "5px");
			}
			
			var label=domConstruct.create('label',{
				"for": this.id+"_select",
				"innerHTML": this._strings.SHOW+"&nbsp;" 
			}, this.domNode);
			
			if(domGeom.isBodyLtr()){
				domStyle.set(label, "marginRight", "5px");
			} else {
				domStyle.set(label, "marginLeft", "5px");
			}
			
			var select=domConstruct.create("select", {
				"id": this.id+"_select",
				"aria-label": this._strings.TYPE_FILTER_LABEL,
				"aria-describedby": "lconnSearchResultsFiltersDescription"
			});
			
			if (component==="activities"){
				this._addActivitiesOptions(select);
			} else if (component==="blogs"){
				this._addBlogsOptions(select);
			} else if (component==="communities"){
				this._addCommunitiesOptions(select);
			} else if (component==="forums"){
				this._addForumsOptions(select);
			} else if (component==="profiles"){
				this._addProfilesOptions(select);
			} else if (component==="wikis"){
				this._addWikisOptions(select);
			}
			
			domConstruct.place(select, this.domNode);
			
			this.connect(select, "onchange", lang.hitch(this, function(e){this.setTypeFilter(select.value);}));
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
		
		setTypeFilter:function(value){
			var component = this.apiHandler.getComponentFilter();
			if (component==="profiles"){
				var field = 'FIELD_USER_STATE';
				var oldValue = this.apiHandler.getFieldConstraintParameter(field); 
				this.apiHandler.removeFieldConstraintParameter(field,oldValue,false);
				this.apiHandler.addFieldConstraintParameter(field,value,false);
			} else {
				this.apiHandler.changeComponent(value);
			}
			this._changed = true;
		},
		
		_createOption:function(label, value){
			var option = domConstruct.create("option");
			
			var selected = this.apiHandler.getComponentFilterFull(); 
			
			if (selected === value){
				domAttr.set(option, "selected", "selected");
			}
			domAttr.set(option, "value", value);
			domAttr.set(option, "innerHTML", label);
			return option;
		},
		
		_createFieldValueOption:function(label, field, value){
			var option = domConstruct.create("option");
			
			var selected = this.apiHandler.getFieldConstraintParameter(field); 
			
			if (lang.isArray(selected)){
				selected = selected.pop();
			}
			
			if (!selected){
				selected = this.defaultProfilesUserStateSearch.substring(field.length+1);
			}
			
			if (selected === value){
				domAttr.set(option, "selected", "selected");
			}
			
			domAttr.set(option, "value", value);
			domAttr.set(option, "innerHTML", label);
			return option;
		},
		
		_addActivitiesOptions:function(select){
			select.appendChild(this._createOption(this._strings.EVERYTHINGACTIVITIES,'activities'));
			select.appendChild(this._createOption(this._strings.ACTIVITIESONLY,'activities:activity'));
			select.appendChild(this._createOption(this._strings.SECTIONSACTIVITIES,'activities:section'));
			select.appendChild(this._createOption(this._strings.ENTRIESACTIVITIES,'activities:entry'));
			select.appendChild(this._createOption(this._strings.TODOSACTIVITIES,'activities:task'));
			if(!has('search-activities-in-solr')) {
				select.appendChild(this._createOption(this._strings.BOOKMARKSACTIVITIES,'activities:bookmark'));
			}
			//select.appendChild(this._createOption(this._strings.FILESACTIVITIES,'activities:file'));
		},
		
		_addBlogsOptions:function(select){
			select.appendChild(this._createOption(this._strings.EVERYTHINGBLOGS,'blogs'));
			select.appendChild(this._createOption(this._strings.BLOGSONLY,'blogs:main'));
			select.appendChild(this._createOption(this._strings.ENTRIESBLOGS,'blogs:entry'));
			//select.appendChild(this._createOption(this._strings.FILESBLOGS,'blogs:file'));
			if(this.communitiesEnabled && this.ideationBlogsEnabled){
				select.appendChild(this._createOption(this._strings.EVERYTHINGIDEATIONBLOGS,'blogs:ideationblogs'));
				select.appendChild(this._createOption(this._strings.BLOGSIDEATIONBLOGS,'blogs:ideationblogs:ideationblog'));
				select.appendChild(this._createOption(this._strings.BLOGSIDEAS,'blogs:ideationblogs:idea'));
			}
		},
		
		_addCommunitiesOptions:function(select){
			select.appendChild(this._createOption(this._strings.EVERYTHINGCOMMUNITIES,'communities'));
			select.appendChild(this._createOption(this._strings.COMMUNITIESONLY,'communities:entry'));
			select.appendChild(this._createOption(this._strings.COMMUNITIESCONTENT,'communities:content'));
		},
		
		_addForumsOptions:function(select){
			select.appendChild(this._createOption(this._strings.EVERYTHINGFORUMS,'forums'));
			select.appendChild(this._createOption(this._strings.FORUMSONLY,'forums:forum'));
			select.appendChild(this._createOption(this._strings.TOPICSFORUMS,'forums:topic'));
			if(this.forumCategoriesEnabled){
				select.appendChild(this._createOption(this._strings.FORUMCATEGORIES,'forums:category'));
			}
			//select.appendChild(this._createOption(this._strings.FILESFORUMS,'forums:file'));
		},
		
		_addProfilesOptions:function(select){
			select.appendChild(this._createFieldValueOption(this._strings.ALLPEOPLE,'FIELD_USER_STATE','*'));
			select.appendChild(this._createFieldValueOption(this._strings.EXCLUDEINACTIVE,'FIELD_USER_STATE','active'));
			//select.appendChild(this._createOption(this._strings.INACTIVEUSERSPROFILESONLY,'FIELD_USER_STATE:inactive'));
		},
		
		_addWikisOptions:function(select){
			select.appendChild(this._createOption(this._strings.EVERYTHINGWIKIS,'wikis'));
			select.appendChild(this._createOption(this._strings.WIKISONLY,'wikis:wiki'));
			select.appendChild(this._createOption(this._strings.PAGESWIKIS,'wikis:page'));
			select.appendChild(this._createOption(this._strings.FILESWIKIS,'wikis:file'));
		}
	});
	
	return typeFilter;
});
