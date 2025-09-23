/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.sharedLC"); 

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.sand.sandAll");
dojo.require("lconn.sand.Subject");

dojo.requireLocalization("lconn.sand", "ui");

/**
 * Things in Common widget
 */
dojo.declare("lconn.sand.sharedLC", 
		[dijit._Widget, dijit._Templated],  
		{
	_blankIcon: dojo.config.blankGif,
	
	// Points to the html template of the widget
	templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
	templatePath: dojo.moduleUrl("lconn.sand", "templates/SharedLC.html"),	
	 
	widgetsInTemplate: true,
	
	// my details
	profileSelfUid: null,
	// current person's details
	profileTargetUid: null,
	
	serviceUrl: null, // initialized on creation
	
	previousData: null,
	xmlDoc: null,

	targetName: null,
	isEmpty: true, // is the widget empty? (no connections found)
	
	constructor: function( ) {
		lconn.sand.sandAll.loadAllStringIntoObject(this);
	},
	
	populate: function() {
		if (!this.profileSelfUid) { // (user hasn't signed-in)
			dojo.style(this.message, "display", "block");
			dojo.style(this.loading, "display", "none");
			return;
		}	
		dojo.style(this.message, "display", "none");
		dojo.style(this.loading, "display", "block");
		
		// Hide widget if I'm looking at my profile
		if (this.profileSelfUid == this.profileTargetUid) {
			this.hide();
			return;
		}
		
		// Call Search to request things in common between self & target person:
		dojo.xhrGet({
			url: this.serviceUrl,
			handleAs: "text",
	        htmlContainerElemId: this.iContext.getElementById("_"+this.iContext.widgetId+"_root"),
			load: dojo.hitch(this, this.onSandDataLoaded),
	        error: dojo.hitch(this, this._xhrError),
			content: {
				social: ['{"type": "personUserID", "id": "'+this.profileSelfUid+'"}', 
				         '{"type": "personUserID", "id": "'+this.profileTargetUid+'"}']
				}
		});
	},
	
	_subjectHandles: [],
	_clearSubjects: function() {
		dojo.forEach(this._subjectHandles, dojo.destroy);
		this._subjectHandles = [];
		this.container.innerHTML = "";	
	},

	onSandDataLoaded: function(data, ioArgs) {
		var tmpStr = data;
		
		data = lconn.core.xslt.loadXmlString(data);
		if(lconn.core.xpath.isIE11()) {
			data = lconn.core.xpath.loadDOMIE11(tmpStr);
		}
		
		var lcSandStrings = dojo.i18n.getLocalization("lconn.sand", "ui");
		
		dojo.style(this.loading, "display", "none");
		dojo.style(this.container, "display", "");
		
		this._clearSubjects();

		
			// build Subject.widget for each subject
		this.subjects = [
						 [[lcSandStrings.sand_Community,lcSandStrings.sand_Communities],"Util/Community"],
						 [[lcSandStrings.sand_Discussion,lcSandStrings.sand_Discussions],"Document/ForumThread"],
  						 [[lcSandStrings.sand_Blog,lcSandStrings.sand_Blogs],"Document/Blog"],
						 [[lcSandStrings.sand_Wiki,lcSandStrings.sand_Wikis],"Document/Wiki"],
						 [[lcSandStrings.sand_Activity,lcSandStrings.sand_Activities],"Group/Activity"],
 						 [[lcSandStrings.sand_File,lcSandStrings.sand_Files],"Document/File"],
 						 [[lcSandStrings.sand_Bookmark,lcSandStrings.sand_Bookmarks],"Document"],
						 [[lcSandStrings.sand_Tag,lcSandStrings.sand_Tags], "Tag", "<span class=\"subject-item lotusTags\"><a href=\"javascript:;\">", "</a></span>", ", "]
						];
		
		var iSubject;
		var hasOpenSubject = false;
		var iSubjectToOpen = null;
		var displayFullSubject = (dojo.byId(this.iContext.widgetId+"_TabItem") != null); // we are being displayed in the multi-tab widget which is wide and has room for full subject
		
		// if(dojo.config.isDebug) {
		//console.debug("this.subjects.length:", this.subjects.length);
		// }
		for (var i=0, len=this.subjects.length; i < len; i++) {
			iSubject = new lconn.sand.Subject({});

			iSubject.setSubject(this.subjects[i][0], 
								{typeString:this.subjects[i][1], 
								itemPrefix: this.subjects[i][2], 
								itemSuffix: this.subjects[i][3],
								itemSeperator: this.subjects[i][4],
								xmlData: data},
								displayFullSubject
								);

			if (iSubject.itemsNum > 0) {
				dojo.style(iSubject.domNode, "display", "");
				this.isEmpty = false;
				// remember to expand the first subject with items later on if no other section is open
				if (!hasOpenSubject && !iSubject.isCollapsed()) hasOpenSubject = true;
				if (iSubjectToOpen == null) iSubjectToOpen = iSubject;
			}
			dojo.place(iSubject.domNode, this.container, "last");
			this._subjectHandles.push(iSubject);
		}
		
		// expand the first subject with items
		if (!hasOpenSubject && iSubjectToOpen != null) iSubjectToOpen.toggle();
		
		if (this.isEmpty == true) {
			this.showMessage(lcSandStrings.sand_NothingInCommon);
		}
	},
	
	showMessage: function (msgHTML) {
		dojo.attr(this.message, {innerHTML: msgHTML});
		dojo.style(this.message, "display", "");
	},

	hide: function () {
		dojo.style(this.domNode,"display","none");		
	},
	
	destroy: function() {
		this.inherited(arguments);
		this._clearSubjects();
	},
	
	_xhrError: function(data, ioArgs) {
		
		if (data && data.status === 503){
			dojo.style(this.loading,"display","none");
			this.showMessage(this.ticUnavailable);
			return;
		}
		
		if (this.iContext){
			ioArgs.args.htmlContainerElemId = dojo.byId("_"+this.iContext.widgetId+"_root");
		}
		lconn.core.errorhandling.DefaultXHRErrorHandler(data, ioArgs);
	}
	
});
