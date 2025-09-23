/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.unit.as.EntryPost.EntryPostView");

dojo.require("com.ibm.social.test.unit.as.EntryPost.PrettyJSON");

/**
 * Display the Entry Post Page and Control the event 
 * The json data to post is loaded from TempleteEntries according to Entry Set selection box 's value
 * and some value of the pre-defined entry will be changed based on system and login user 's information
 * @author Tao Shang
 */
dojo.declare("com.ibm.social.test.unit.as.EntryPost.EntryPostView", null, {
	
	// current time
	isoDate : null,
	
	// Profiles URL
	profilesUrl :  null,
	
	// Homppage URL
	hpUrl : null,
	
	// Activity Stream URL
	asUrl : null,
	
	// Microblogin API URL
	mbUrl : null,
	
	// Current to post URL
	postUrl : null,
	
	postType : null,
	
	// unique uuid for entry's id
	id : null,
	
	// inline editor 
	editor : null,
	
	// div includes the inline editor
	editBox : null,
	
	//Sample Entries
	sampleEntries : null,
	
	// Entry in Editing
	currentEntry : null,
	
	// entry for mark post
	markASEntry : null,
	
	//Entry ID for mark
	entryIds : null,
	
	totalTimes : 0,
	
	postedTimes: 0,
	
	postFailedTimes: 0,
	
	/*
	 * Set the editorBox DIV
	 * @param editorbox - the dom of the div
	 */
	constructor : function(editorbox) {
		
		this.editBox = editorbox;
	},
	
	/*
	 * Called as soon as the page is loaded 
	 */
	onLoad : function(){
		this.profilesUrl = this.getServiceUrl(lconn.core.config.services.profiles);

		this.hpUrl = this.getServiceUrl(lconn.core.config.services.homepage);

		this.asUrl = this.getServiceUrl(lconn.core.config.services.opensocial) + "/rest/activitystreams/@me/@all/@all";
		
		this.mbUrl = this.getServiceUrl(lconn.core.config.services.opensocial) + "/rest/ublog/";
		
		com.ibm.social.test.unit.as.EntryPost.prettyJSON = new com.ibm.social.test.unit.as.EntryPost.PrettyJSON();
		
		dojo.byId("loadingImg").src = this.getServiceUrl(lconn.core.config.services.webresources) +  "/web/com.ibm.lconn.core.styles.oneui3/images/loading.gif";
		
		dojo.byId("user").innerHTML = lconn.homepage.userName + ", " + user + ", " + userid;
		
		// populate generator selector
		var select = dojo.byId("entryset");
		
		for (var key in window.testASEntries){
			select.options[select.length] = new Option(key, key);
		}
		
		this.sampleEntries = dojo.toJson(window.testASEntries);
		this.markASEntry = {"id":"","actor":{"id":""},"verb":"","object":{"id":""},"connections":{"saved":"true","actionable":"true"}};
		this.entryIds = [];
		
		this._show();
		this.changeEntry();
		dojo.byId("mbMessage").value = dojo.toJson( window.mbStatusTemplate);
		dojo.connect(dojo.byId('entryset'),"onchange", dojo.hitch(this, "changeEntry"));
		dojo.connect(dojo.byId('postBtn'), "onclick", dojo.hitch(this, "onPostBtnClick"));
		dojo.connect(dojo.byId('postTypeAS'), "onclick", dojo.hitch(this, "onAPITypeChanged"));
		dojo.connect(dojo.byId('postTypeMB'), "onclick", dojo.hitch(this, "onAPITypeChanged"));
		
		dojo.connect(this.editor,"onClick", dojo.hitch(this, "_connectionclick"));
				
	},
	
	onAPITypeChanged : function(){
		
		if(dojo.byId('postTypeMB').checked){
			dojo.addClass(dojo.byId('asDiv'),"lotusHidden");
			dojo.removeClass(dojo.byId('mbDiv'),"lotusHidden");
		} else {
			dojo.addClass(dojo.byId('mbDiv'),"lotusHidden");
			dojo.removeClass(dojo.byId('asDiv'),"lotusHidden");
		}
		
		
	},
	
	/*
	 * Called when Post button clicked
	 */
	onPostBtnClick : function() {
		this.postType = "AS";
		if(dojo.byId('postTypeMB').checked) {
			
			this.postType = "MB";
		}
		if(this.postType == "AS" && this.editor.editing){
			this.editor.save();
		}
		dojo.empty("message");
		dojo.removeClass("loderbody","lotusHidden");
		dojo.byId("postBtn").disabled = true;

		this.totalTimes = dojo.byId("postTimes").value;
		this.postedTimes = 0;
		this.postFailedTimes = 0;
		if(dojo.byId("toSave").checked) {
			this.markASEntry.connections.saved = "true";

		} else {
			delete this.markASEntry.connections.saved;
		}
		
		if(dojo.byId("toAction").checked) {
			this.markASEntry.connections.actionable = "true";

		} else {	
			delete this.markASEntry.connections.actionable;
		}
		dojo.byId("toSave").disabled = true;
		dojo.byId("toAction").disabled = true;
		if(this.postType == "AS") {
			this.currentEntry = dojo.fromJson(this.editor.attr('value'));
			this.postUrl = this.asUrl;
			
		} else {
			this.currentEntry = dojo.fromJson(dojo.byId("mbMessage").value);
			this.postUrl = this.mbUrl + userid + "/@all";
		}
		
		/* If we're using the Custom Content feed then set the content attribute
		 * to the entered HTML/plain text.
		 */
		if (dojo.byId("entryset").value === "Custom Content") {
			this.currentEntry.content = dojo.byId("customHtml").value;
		}	
			
		this.postData();
	},
	
	/*
	 *  Ajax post json to activity stream
	 */
	postData  : function() {
		dojo.xhrPost({
			url: this.postUrl ,
			headers: {"Content-Type": "application/json"},
			postData: dojo.toJson(this.currentEntry),
			load: dojo.hitch(this,function(data) {
				this.postedTimes++;
				if(this.markASEntry.connections.actionable || this.markASEntry.connections.saved ) {
					var result = dojo.fromJson(data);
					if(result["entry"] && result.entry["id"]) {
						
						this.addMarkData(result.entry.id);
					}
				} 
				this.toNextPost();
				
				
			}),
			error: dojo.hitch(this,function(err) {

				this.postedTimes++;
				
				this.postFailedTimes++;
			    this.toNextPost();
				
			})
		});
	
	},
	
	/*
	 *  Ajax post json to activity stream
	 */
	addMarkData  : function(itemUID) {
			this.entryIds.push(itemUID);
	
	},
	/*
	 *  Ajax post json to activity stream
	 */
	postMarkData  : function() {
		dojo.xhrPost({
			url: this.asUrl + "/" + this.entryIds.shift() + "?X-HTTP-Method-Override=PUT",
			headers: {"Content-Type": "application/json"},
			postData: dojo.toJson(this.markASEntry),
			load: dojo.hitch(this,function(data) {

				console.debug(data);
				if(this.entryIds.length >0){
					this.postMarkData();
				} else {
					this.showResult();
				}
			}),
			error: dojo.hitch(this,function(err) {

				console.debug(err);
				if(this.entryIds.length >0){
					this.postMarkData();
				} else {
					this.showResult();
				}
				
			})
		});
	
	},
	
	/*
	 *  Ajax post json to activity stream
	 */
	postMarkDataForMB  : function(storyID) {
		dojo.xhrPost({
			url: this.asUrl + "/" +storyID + "?X-HTTP-Method-Override=PUT",
			headers: {"Content-Type": "application/json"},
			postData: dojo.toJson(this.markASEntry),
			load: dojo.hitch(this,function(data) {

				console.debug(data);
				if(this.entryIds.length >0){
					this.retrieveStoryId();
				} else {
					this.showResult();
				}
			}),
			error: dojo.hitch(this,function(err) {

				console.debug(err);
				if(this.entryIds.length >0){
					this.retrieveStoryId();
				} else {
					this.showResult();
				}
				
			})
		});
	
	},
	
	retrieveStoryId : function(){
		
		dojo.xhrGet({
			url: this.asUrl + "?rollup=true&filterBy=object&filterOp=equals&filterValue=" + this.entryIds[0] ,
			handleAs: "json",
			load: dojo.hitch(this,function(data) {

				console.debug(data);
				if(this.entryIds.length >0){
					if(data.entry.length == 0) {
						setTimeout(dojo.hitch(this, function() {
							this.retrieveStoryId();
						}), 200);
					} else {
						this.postMarkDataForMB(data.entry[0].id);
						this.entryIds.shift();
					}
				} else {
					this.showResult();
				}
			}),
			error: dojo.hitch(this,function(err) {

				console.debug(err);
				if(this.entryIds.length >0){
					this.postMarkData();
				} else {
					this.showResult();
				}
				
			})
		});
		
	},
	
	/*
	 *  Post again	
	 */
	
	toNextPost : function() {
		

		if(this.postedTimes >= this.totalTimes) {
			if(this.entryIds.length >0){
					setTimeout(dojo.hitch(this, function() {
						if(this.postType == "AS") {
							this.postMarkData();
						} else {
							this.retrieveStoryId();
						}
					}), 400);
					
			} else {
					this.showResult();
			}
		} else {
			if(this.postType == "AS"){
				this.changeEntryID();
			}
			this.postData();
		}
	
	},
	
	/*
	 *  Show post result on page
	 */
	showResult : function(){
	
		var messageNode = dojo.byId("message");
		dojo.addClass("loderbody","lotusHidden");

		messageNode.appendChild(document.createTextNode("Posted Successfully : " + (this.postedTimes- this.postFailedTimes) + " ; Failed : " + this.postFailedTimes + " .  "));
		
		if(this.postFailedTimes < this.totalTimes){
			dojo.create("a", {href: this.hpUrl+ "/web/updates/#imFollowing/all", innerHTML: " Visit ActivityStream", target: "_blank"}, messageNode);
		}	

		dojo.byId("postBtn").disabled = false;
		dojo.byId("toSave").disabled = false;
		dojo.byId("toAction").disabled = false;
		dojo.byId("postTimes").value = 1;
		dojo.byId("toSave").checked = false;
		dojo.byId("toAction").checked = false;
		if(this.postType == "AS"){
			//reset IDs for next post button clicked event
			this.changeEntryID();
			var sdata = com.ibm.social.test.unit.as.EntryPost.prettyJSON.format(this.currentEntry);
			this.editor.attr('value',sdata);
		}
		
	
	},
	
	/*
	 * return Service URL
	 * 
	 * @param service - service key 
	 */
	getServiceUrl : function(service) {
		
		return lconn.core.url.getServiceUrl(service).uri;
		
	},
	
	/*
	 * Check whether to change the value of the attribute
	 * @param obj - json object
	 * @param attr - the attribute of the obj to check  
	 */
	_checkToSet : function(obj , attr){
		if(attr in obj && obj[attr] ==""){
			return true;
		} else {
			return false;
		}
	
	},
	
	/*
	 * Called when Entry Selection Box is changed.
	 * The inline editor box 's content will be reloaded according to user's choice.
	 * Time , ID and some blank value like "" will be replaced based on login user's info
	 */
	changeEntry : function(){
		
		var toEdit = this.editor.editing;
		if(toEdit){
			this.editor.cancel();
		}
		var data = dojo.fromJson(this.sampleEntries)[dojo.byId("entryset").value];
		
		this.isoDate = dojo.date.stamp.toISOString(new Date());
		this.id = dojox.uuid.generateTimeBasedUuid();
		
		if("published" in data) {
			data.published = this.isoDate;
		}
		
		if("url" in data) {
			data.url= this.asUrl + "/" + this.id;
		}
		
		if("target" in data ) {
			if(this._checkToSet(data.target,"url")) {
				data.target.url = this.profilesUrl + "/html/profileView.do?userid=" + userid;
			}
			if(this._checkToSet(data.target,"id")){
				data.target.id = userid;
			}
			if(this._checkToSet(data.target,"displayName")){
				data.target.displayName = lconn.homepage.userName;
			}
		}
		if("actor" in data){
			if(this._checkToSet(data.actor ,"id")) {
				data.actor.id = userid;
			}
			if(this._checkToSet(data.actor,"displayName" )) {
				data.actor.displayName =lconn.homepage.userName;
			}
		}
		if("provider" in data) {
			if(this._checkToSet(data.provider,"url")) {
				data.provider.url = this.getServiceUrl(lconn.core.config.services.news);
			
			}
		}		
		
		if("generator" in data) {
			if(this._checkToSet(data.generator,"id")) {
				data.generator.id = this.id;
			
			}
		}	
		if(this._checkToSet(data,"updated")) {
			data.updated = this.isoDate;
		}
		
		if("connections" in data) {
			if(this._checkToSet(data.connections,"rollupid")) {
				data.connections.rollupid = this.id;
			}
		
		}
		if("openSocial" in data) {
			if("embed" in data.openSocial){
				if("context" in data.openSocial.embed){
					if(this._checkToSet(data.openSocial.embed.context, "connectionsContentUrl")) {
					
						data.openSocial.embed.context.connectionsContentUrl = this.profilesUrl + "/atom/mv/theboard/entry.do?entryId=" + this.id;
					
					}
					
					if(this._checkToSet(data.openSocial.embed.context, "published")) {
					
						data.openSocial.embed.context.published = this.isoDate;
					
					}
					
					if(this._checkToSet(data.openSocial.embed.context, "itemUrl")){
						
						data.openSocial.embed.context.itemUrl = this.profilesUrl + "/html/profileView.do?userid="+ userid +"&entryid=" + this.id;
					}
				
					if(this._checkToSet(data.openSocial.embed.context, "id")){
						
						data.openSocial.embed.context.id = this.id;
					}
				
				
				}
			
			
			}
		
		
		
		}
		
		if("object" in data) {
			if("embed" in data.object) {
				if(this._checkToSet(data.object.embed,"gadget")){
					data.object.embed.gadget = this.getServiceUrl(lconn.core.config.services.webresources) + "/web/com.ibm.social.ee/StatusUpdate.xml"
				}
				if("context" in data.object.embed){
					if(this._checkToSet(data.object.embed.context,"connectionsContentUrl")) {
						data.object.embed.context.connectionsContentUrl = this.profilesUrl + "/atom/mv/theboard/entry.do?entryId=" + this.id;
					}
					if(this._checkToSet(data.object.embed.context,"published")) {
						data.object.embed.context.published = this.isoDate;
					}
					if("actor" in data.object.embed.context) {
						if(this._checkToSet(data.object.embed.context.actor,"id")){
							data.object.embed.context.actor.id = userid;
						}
						if(this._checkToSet(data.object.embed.context.actor,"displayName")){
							data.object.embed.context.actor.displayName = lconn.homepage.userName;
							
						}
					}
					
					if(this._checkToSet(data.object.embed.context,"title")){
						data.object.embed.context.title = lconn.homepage.userName;
					}
					
					if(this._checkToSet(data.object.embed.context ,"id")) {
						data.object.embed.context.id = this.id;
					
					}
					
					if(this._checkToSet(data.object.embed.context ,"itemUrl")) {
						data.object.embed.context.itemUrl = this.profilesUrl + "/html/profileView.do?userid=" + userid +  "&entryid="+ this.id;
					
					}
				}
				
			}

			if("author" in data.object) {
					if(this._checkToSet(data.object.author,"id")) {
						data.object.author.id = userid;
					}
					if(this._checkToSet(data.object.author,"displayName")) {
						data.object.author.displayName = lconn.homepage.userName;
					}
			
			}
		
			if(this._checkToSet(data.object,"displayName")){
				data.object.displayName = lconn.homepage.userName;
			}
			
			if(this._checkToSet(data.object,"published")){
				data.object.published = this.isoDate;
			}
			
			if(this._checkToSet(data.object,"id")){
				data.object.id = this.id;
			}
			
			if(this._checkToSet(data.object , "url")) {
				data.object.url = this.profilesUrl + "/html/profileView.do?userid=" + userid +  "&entryid="+this.id;
			
			}
		}
		
		if(dojo.byId('entryset').value == 'Entry with Link' ) {
			var userLink = "<span class='vcard'><a class='fn url' title='This is a link to the profile of " + lconn.homepage.userName +
								".' href='"+ this.profilesUrl +"/html/profileView.do?userid=" + userid + "'><span class='photo' src='"+
								this.profilesUrl +"/photo.do?userid=" + userid +"' alt='This is a photo of "+ lconn.homepage.userName +
								".' style='display : none'></span>" + lconn.homepage.userName + "</a><span class='x-lconn-userid' style='display : none'>" + 
								userid+ "</span></span> ";
			data.title = userLink + data.title;
			
		}
		
		if (dojo.byId("entryset").value === "Custom Content") {
			dojo.removeClass(dojo.byId("customHtmlField"),"lotusHidden");
		} else {
			dojo.addClass(dojo.byId("customHtmlField"),"lotusHidden");
		}
		
		var sdata = com.ibm.social.test.unit.as.EntryPost.prettyJSON.format(data);
		
		this.editor.attr('value',sdata);
		
		if(toEdit){
			this.editor.edit();
		}
	
	},
	
	/*
	 * Change all IDs in entry for posting multiple times
	 */
	changeEntryID : function(){
		
		
		var data = this.currentEntry;
		
		this.isoDate = dojo.date.stamp.toISOString(new Date());
		this.id = dojox.uuid.generateTimeBasedUuid();

		if("published" in data) {
			data.published = this.isoDate;
		}
		
		if("url" in data) {
			data.url= this.asUrl + "/" + this.id;
		}
			
		
		if("generator" in data) {
			if("id" in data.generator) {
				data.generator.id = this.id;
			
			}
		}	
		if("updated" in data) {
			data.updated = this.isoDate;
		}
		
		if("connections" in data) {
			if("rollupid" in data.connections) {
				data.connections.rollupid = this.id;
			}
		}
		if("openSocial" in data) {
			if("embed" in data.openSocial){
				if("context" in data.openSocial.embed){
					if("connectionsContentUrl" in  data.openSocial.embed.context) {
					
						data.openSocial.embed.context.connectionsContentUrl = this.profilesUrl + "/atom/mv/theboard/entry.do?entryId=" + this.id;
					
					}
					
					if("published" in data.openSocial.embed.context) {
					
						data.openSocial.embed.context.published = this.isoDate;
					
					}
					
					if("itemUrl" in data.openSocial.embed.context){
						
						data.openSocial.embed.context.itemUrl = this.profilesUrl + "/html/profileView.do?userid="+ userid +"&entryid=" + this.id;
					}
				
					if("id" in data.openSocial.embed.context){
						
						data.openSocial.embed.context.id = this.id;
					}
				
				
				}
			
			
			}
		
		}
		
		if("object" in data) {
			if("embed" in data.object) {
			
				if("context" in data.object.embed){
					if("connectionsContentUrl" in data.object.embed.context) {
						data.object.embed.context.connectionsContentUrl = this.profilesUrl + "/atom/mv/theboard/entry.do?entryId=" + this.id;
					}
					if("published" in data.object.embed.context) {
						data.object.embed.context.published = this.isoDate;
					}

					if("id" in data.object.embed.context ) {
						data.object.embed.context.id = this.id;
					
					}
					
					if("itemUrl" in data.object.embed.context) {
						data.object.embed.context.itemUrl = this.profilesUrl + "/html/profileView.do?userid=" + userid +  "&entryid="+ this.id;
					
					}
				}
				
			}

			if("published" in data.object){
				data.object.published = this.isoDate;
			}
			
			if("id" in data.object){
				data.object.id = this.id;
			}
			
			if("url" in data.object ) {
				data.object.url = this.profilesUrl + "/html/profileView.do?userid=" + userid +  "&entryid="+this.id;
			
			}
		}
	
	},
	
	/*
	 * Create the inline editor box . Only called when page is loading
	 */
    _show : function() {
         this.editor = new dijit.InlineEditBox({
			  id : "postdatajson", autoSave : false, buttonSave : "Save",
			  buttonCancel : "Cancel", width : "100%",height:"600px",editor:'dijit.form.Textarea', editorParams:{height: '', extraPlugins: ['dijit._editor.plugins.AlwaysShowToolbar']}
         	},
         	this.editBox
         );
	},
	
	/*
	 * Called when inline editor is clicked to ensure the 'Save' button is active.
	 * Changed the 'Save' and 'Cancel' button to use oneUI sytle.
	 */
	_connectionclick : function(){
		
		setTimeout(dojo.hitch(this, function(){
		
			this.editor.wrapperWidget.saveButton.attr("disabled", false);
			this.editor.wrapperWidget.saveButton.domNode.childNodes[0].className = "";
			this.editor.wrapperWidget.saveButton.domNode.childNodes[0].childNodes[0].className = "";
			this.editor.wrapperWidget.saveButton.domNode.childNodes[0].childNodes[0].childNodes[0].className = "lotusBtn";
			this.editor.wrapperWidget.cancelButton.domNode.childNodes[0].className = "";
			this.editor.wrapperWidget.cancelButton.domNode.childNodes[0].childNodes[0].className = "";
			this.editor.wrapperWidget.cancelButton.domNode.childNodes[0].childNodes[0].childNodes[0].className = "lotusBtn";
			
			}), 200);
				
	}
});