/* Copyright IBM Corp. 2008, 2016  All Rights Reserved.              */

dojo.provide("lconn.test.visitorModel.VisitorModelDialog");

dojo.require("dijit.Dialog");
dojo.require("dojo.i18n");
dojo.require("dojo.string");
dojo.require("dojox.uuid.generateTimeBasedUuid");

dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.PeopleDataStoreOpenSocial");
dojo.require("lconn.core.PeopleDataStore");
dojo.require("lconn.core.TypeAhead");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox")

dojo.requireLocalization("lconn.core", "strings");

dojo.declare("lconn.test.visitorModel.VisitorModelDialog", null,
	/** @lends lconn.test.visitorModel.VisitorModelDialog.prototype */
	{
		// Current displayed panel (inv or add)
		currentPanel: "inv",

		// TypeAhead controls passed in via parent application
		typeaheadContext : null,
		typeaheadFunc : null,
		dialog : null,
		containerNode :  null,
		addTypeAhead : null,
		inviteTypeAhead : null,
		groupSupport: false,

		// String resources
		mainContentTitle : "Invite or Add Members",
		mainContentDesc : "Invite members to give them the opportunity to join in the community. Add members to automatically include them.",
		typeAheadLabel : "Name or Email: ",
		groupTypeAheadLabel : "Name: ",
		typeAheadRoleLabel : " as ",
		groupTypeAheadRoleLabel : " as Members ",
		taNoResultsText : "No Results TA MEssage",
		taHeaderText : "TA header Text",
		addUserText : "Add",
		radioSectionTitle : "Member Options:",
		radioOneText : "Send invitations to join the community",
		radioTwoText : "Automatically add users to community",
		twistyTextA : "Add an Optional Message",
		twistyTextB : "Remove additional text",
		message : "Message:",
		textAreaStartText : "test shadowText for visInvitation...",
		checkboxLabel : "Send me a copy",
		saveText : "Save",
		inviteText : "Invite",
		cancelText : "Cancel",
		userContentTitle : "Enter Information",
		addUserText : "Create User",
		backText : "Back",

		// Arrayfor selected users
		_selectedUsers : [],

		// NEEDSWORK: We need to resource strings and remove hardcoded styles
		_inlineTemplate : [
		   '<div class="mainContent" role="presentation" width="100%">',
				'<div>${mainContentDesc}</div></br>',
				'<div>',
					'<div class="inviteOptions"><b>${radiosTitle}</b></div>',
					'<input type="radio" class="lotusCheckbox" name="memberOptions" id="vmInviteType" value="invite" checked="true"/>${radio1text}</br>',
					'<input type="radio" class="lotusCheckbox" name="memberOptions" id="vmAddType" value="add" />${radio2text}</br></br>',
				'</div>',
				'<div id="vmInvitePanel" style="display:none">',
					'<div class="lotusBold" style="display:inline-block;vertical-align:top;padding-top:10px">${taLabel}</div><div style="display:inline-block"><div id="vmInviteMembersWidget" ></div></div></br>',
					'<span id="invitationListContainerExternal">',
						'<div class="field" id="vmInvitationListContainer" style="display:none;">',
							'<div id="vmInvitationList" class="memberList" aria-labelledby="addMembersWidget" role="listbox"></div>',  		
						'</div>',
					'</span>',
					'<table width="100%" class="lotusHidden">',
						'<tr><td style="text-align:left"><b>${taLabel}</b></td><td><div class="userTypeAhead"></div></td><td><input style="text-align:right" type="button" class="lotusFormButton createUser" /><td></tr>',
						'<tr><td colspan="3" style="text-align:center"><div class="selectedUsers"></div></td></tr>',
					'</table>',								
				'</div>',
				'<div id="vmAddPanel" style="display:none">',
					'<div class="lotusBold" style="vertical-align:top;padding-top:7px;display:inline-block"><span id="vmTALabel">${taLabel}</span><span id="vmGTALabel" style="display:none">${gtaLabel}</span></div>',
					'<div id="vmPeopleGroupSelectDiv" style="display:none;vertical-align:top;margin-top:6px">',
						'<select style="margin:0 5px 0 5px;" id="vmPeopleGroupSelect" style="display:inline-block">',
						'<option value="people" selected="selected">people</option>',
						'<option value="groups">groups</option>',
					'</select></div>',
					'<div id="vmRoleLabelContainer" style="vertical-align:top;padding-top:8px;display:none"><span id="vmRoleLabel">${taRoleLabel}</span><span id="vmGRoleLabel">${gtaRoleLabel}</span></div>',
					'<div style="display:none" id="vmAddMembersWidget" ></div>',
					'<div style="display:none" id="vmAddGroupsWidget" ></div>',
					'<span id="memberListContainerExternal">',
						'<div class="field" id="vmMemberListContainer" style="display:none;">',
							'<div id="vmMemberList" class="memberList" aria-labelledby="addMembersWidget" role="listbox"></div>',  		
						'</div>',
					'</span></br>',
					'<table width="100%" class="lotusHidden">',
						'<tr><td style="text-align:left"><b>${taLabel}</b></td><td><div class="userTypeAhead"></div></td><td><input style="text-align:right" type="button" class="lotusFormButton createUser" /><td></tr>',
						'<tr><td colspan="3" style="text-align:center"><div class="selectedUsers"></div></td></tr>',
					'</table>',
				'</div>',
				'<div class="lotusFormFieldRow">',
					'<span><a id="vmOptionalMailBtn" role="button" href="javascript:;" class="lotusAction">${textDisplayText}</a></span>',
					'<div id="vmOptionalMail" style="display:none">',
						'<div class="lotusBold">${messageText}</div>',
						'<textarea class="lotusText bidiAware" style="width:640px"></textarea>',								
					'</div>',
				'</div>',
			'</div>',
			'<div class="userContent" align="center" width="100%" style="display: none" role="presentation">',
				'<table class="userTable" >',
					'<tr><td>First Name:</td><td><input class="newUserFirst" type="text" /></td></tr>',
					'<tr><td>Last Name:</td><td><input class="newUserLast" type="text" /></td></tr>',
					'<tr><td>Organization:</td><td><input class="newUserOrg" type="text" /></td></tr>',
					'<tr><td>Email:</td><td><input class="newUserEmail" type="text" /></td></tr>',
				'</table>',
			'</div>'
		].join(''),

		// Html text template for invitation footer / submission buttons
		_footerTemplate : [
			'<table align="center" class="footerTable" width="100%">',
				'<tr class="lotusFormFieldRow">',
					'<td class="lotusFormFooter commFormFooter" align="right"><input type="button" class="lotusFormButton submit" id="vmSubmitBtn"/> <input type="button" class="lotusFormButton cancel" id="vmCancelBtn"/></td>',
					'<td class="buttonContainer userButtons" style="display: none" align="right"><input type="button" class="lotusFormButton submitUser" /> <input type="button" class="lotusFormButton back" /></td>',
				'</tr>',
			'</table>'
		].join(''),

		// Html text template for dialog shell
		_dialogTemplate : [
				  '<div class="lotusDialogBorder">',
					  '<div class="lotusDialog" style="zoom:1" role="application">',
						  '<div class="lotusDialogHeader" style="cursor:move">',
							  '<h1 class="lotusHeading"><span class="title"/></h1>',
							  '<a class="lotusDialogClose" role="button" href="javascript:;" title="${rs_close}">',
								'<img src="${blankGif}" alt="${rs_close}"/>',
								'<span class="lotusAltText">X</span>',
							  '</a>',
						  '</div>',
						  '<div class="lotusDialogContent" role="presentation"></div>',
						  '<div class="lotusDialogFooter" style="border-top:0px" role="presentation"></div>',
					  '</div>',
				  '</div>'
		].join(''),

		/**
		 * Visitor Model Invite constructor function
		 */
		constructor : function(options){
			this.containerNode = options.containerNode || null;
			this.typeaheadContext = options.typeaheadContext || null;
			this.typeaheadFunc = options.typeaheadFunc || null;
			this.typeaheadSubFunc = options.typeaheadSubFunc || null;

			if (options.mainContentTitle){this.mainContentTitle = options.mainContentTitle};
			if (options.typeAheadLabel){this.typeAheadLabel = options.typeAheadLabel};
			if (options.taNoRestulsText){this.taNoResultsText = options.taNoRestulsText};
			if (options.typeAheadLabel){this.typeAheadLabel = options.typeAheadLabel};
			if (options.groupTypeAheadLabel){this.groupTypeAheadLabel  = options.groupTypeAheadLabel};   			
			if (options.typeAheadRoleLabel){this.typeAheadRoleLabel = options.typeAheadRoleLabel}; 			
			if (options.groupTypeAheadRoleLabel){this.taHeaderText = options.groupTypeAheadRoleLabel};
			if (options.taNoRestulsText){this.taNoResultsText = options.taNoRestulsText};   						
			if (options.taHeaderText){this.taHeaderText = options.taHeaderText};
			if (options.addUserText){this.addUserText = options.addUserText};
			if (options.radioSectionTitle){this.radioSectionTitle = options.radioSectionTitle};
			if (options.radioOneText){this.radioOneText = options.radioOneText};
			if (options.radioTwoText){this.radioTwoText = options.radioTwoText};
			if (options.twistyTextA){this.twistyTextA = options.twistyTextA };
			if (options.twistyTextB){this.twistyTextB = options.twistyTextB};
			if (options.textAreaStartText){this.textAreaStartText = options.textAreaStartText};
			if (options.checkboxLabel){this.checkboxLabel = options.checkboxLabel};
			if (options.submitText){this.submitText = options.submitText}
			if (options.saveText){this.saveText = options.saveText};
			if (options.inviteText){this.inviteText = options.inviteText};
			if (options.cancelText){this.cancelText = options.cancelText};
			if (options.userContentTitle){this.userContentTitle = options.userContentTitle};
			if (options.addUserText){this.addUserText = options.addUserText};
			if (options.backText){this.backText = options.backText};  	
			this.userContentFields = options.userContentFields || ["User Email", "First Name", "Last Name", "Organization"];
		},

		/**
		 * Public show function, calls private _show function
		 */
		show : function(){
			this._show();
		},

		/**
		 * Shows control
		 */
		_show : function(){

			if(this.containerNode){
				// Display the HTML inline
				this._displayInline();
			}
			else{
				// Display the dialogContainer
				this.dialog = this._getDialog();
				this._displayDialog();
			}
			// Connect the invite html to the actions
			this._connectDom();
			

		},

		/**
		 * Calls for a new dialog to be created, then attaches invite
		 * HTML template
		 */
		_displayDialog : function(){
			var dialogContainer = dojo.query('.lotusDialogContent', this.dialog.containerNode)[0];
			if(dialogContainer){
				var HTML = dojo.string.substitute(this._inlineTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
					mainContentDesc : this.mainContentDesc,
					taLabel : this.typeAheadLabel,
					gtaLabel : this.groupTypeAheadLabel,
					taRoleLabel : this.typeAheadRoleLabel,
					gtaRoleLabel : this.groupTypeAheadRoleLabel,
					radiosTitle : this.radioSectionTitle,
					radio1text : this.radioOneText,
					radio2text : this.radioTwoText,
					textDisplayText : this.twistyTextA,
					messageText : this.message
				 }));
				// Place invite template inside the dialog container
				dialogContainer.innerHTML = HTML;
			}
		
			this._toggleTypeaheadDisplay("inv");
		},
		
		/**
		 * Attaches invite HTML template to inline containerNode
		 */
		_displayInline : function(){
			var HTML = dojo.string.substitute(this._inlineTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
				mainContentDesc : this.mainContentDesc,
				taLabel : this.typeAheadLabel,
				gtaLabel : this.groupTypeAheadLabel,
				taRoleLabel : this.typeAheadRoleLabel,
				gtaRoleLabel : this.groupTypeAheadRoleLabel,                    
				radiosTitle : this.radioSectionTitle,
				radio1text : this.radioOneText,
				radio2text : this.radioTwoText,
				textDisplayText : this.twistyTextA,
				messageText : this.message
			 })).concat(dojo.string.substitute(this._footerTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
				 checkboxLabel : this.checkboxLabel
			  })));
			//this.containerNode.style.backgroundColor = 'white;';
			this.containerNode.innerHTML = HTML
		},
		
		/**
		 * Connect DOM event handling
		 */
		_connectDom : function() {
			this._selectedUsers = [];
			var containerNode = this.containerNode || this.dialog.containerNode;
			this.titleNode = dojo.query("h1 .title", containerNode)[0];
			if(!this.titleNode){
				this.titleNode = dojo.create("h1", {'class' : "title lotusFormTitle"});
				dojo.place(this.titleNode, containerNode, 0);
			}
			this.titleNode.textContent = this.mainContentTitle
			//these are dialog dependent
			this.contentNode = dojo.query(".lotusDialogContent", containerNode)[0];
			this.footerNode = dojo.query(".lotusDialogFooter", containerNode)[0];

			this.mainContent = dojo.query(".mainContent", containerNode)[0];
			this.userContent = dojo.query(".userContent", containerNode)[0];
			this.mainButtons = dojo.query(".mainButtons", containerNode)[0];
			this.userButtons = dojo.query(".userButtons", containerNode)[0];

			this.submitNode = dojo.query(".submit", containerNode)[0];
			this.submitNode.value = this.inviteText;
			this.cancelNode = dojo.query(".cancel", containerNode)[0];
			this.cancelNode.value = this.cancelText;
			this.addNode = dojo.query(".createUser", containerNode)[0];
			this.addNode.value = this.addUserText;
			this.twistyNode = dojo.query('.twisty', containerNode)[0];
			this.twistyContent = dojo.query('.twistyContent', containerNode)[0];
			this.submitUserNode = dojo.query(".submitUser", containerNode)[0];
			this.submitUserNode.value = this.addUserText;
			this.backNode = dojo.query(".back", containerNode)[0];
			this.backNode.value = this.backText;

			if(this.dialog){
				this.dialogBorder = dojo.query(".lotusDialogBorder", containerNode)[0];
				this.closeBtn = dojo.query(".lotusDialogClose", containerNode)[0];
				this.dialogBorder.style.width = "680px";

			}else{
				dojo.connect(this.cancelNode, 'onclick', this, function(){
					this.containerNode.innerHTML = '';
					this._selectedUsers = [];
				});
			}

			// Connect radio buttons
			dojo.connect(dojo.byId("vmInviteType"), 'onclick', this, function(){
				this._toggleTypeaheadDisplay("inv");
			});

			dojo.connect(dojo.byId("vmAddType"), 'onclick', this, function(){
				this._toggleTypeaheadDisplay("add");
			});

			// Create Typeahead is none supplied
			if (this.typeaheadFunc == null) {
				this._createTextBox();
				this._createTypeAhead();
				dojo.connect(this.addNode, 'onclick', this, function(){this._toggleContentDisplay()});
				dojo.connect(this.backNode, 'onclick', this, function(){this._toggleContentDisplay()});
				dojo.connect(this.typeahead, 'onSelect', this, this.updateSelection);
			}

			var optionalMailBtn = dojo.byId("vmOptionalMailBtn");
			if (optionalMailBtn) {
				dojo.connect(optionalMailBtn, 'onclick', this, this._toggleMailMessage);
			}
			dojo.connect(this.submitNode, 'onclick', this, this.onSubmit);
		},

		/**
		 * Reinitialize form values
		 */
		_resetBackFieldValues : function() {
			var first = dojo.query(".newUserFirst", this.containerNode)[0];
			var last =  dojo.query(".newUserLast", this.containerNode)[0];
			var organization = dojo.query(".newUserOrg", this.containerNode)[0];
			var Email = dojo.query(".newUserEmail", this.containerNode)[0];
			first.value = "";
			last.value = "";
			organization.value = "";
			Email.value = "";
		},
		
		/**
		 * Display Visitor Model Dialog
		 */
		displayDialog : function() {
		   this.dialog = this._getDialog(this.mainContentTitle);
		   var bundle = dojo.i18n.getLocalization('lconn.core', 'strings');

		   dojo.place(document.createTextNode(this.mainContentTitle), this.dialog.titleNode, "only");
		   dijit.setWaiState(this.dialog.titleBar, "label", this.mainContentTitle);

		  dojo.connect(this.dialog.typeahead, 'onSelect', this, this.updateSelection);
		  dojo.connect(this.dialog.submitNode, 'onclick', this, this.onSubmit);
		  dojo.connect(this.dialog.addNode, 'onclick', this, this._toggleContentDisplay);
		  dojo.connect(this.dialog.backNode, 'onclick', this, this._toggleContentDisplay);
		  dojo.byId("selectedUsers" + this._randomTestNum).style.borderBottom = "1px solid #cccccc";

		  if(dojo.byId("selectedUsers" + this._randomTestNum).innerHTML == ''){
			  dojo.byId("selectedUsers" + this._randomTestNum).innerHTML = "</br>";
		  }
		  dojo.byId("selectedUsers" + this._randomTestNum).style.borderBottom = "1px solid #cccccc";
		  this._createTextBox();

		  this.dialog.submitNode.value = this.inviteText;
		  this.dialog.cancelNode.value = this.cancelText;

		  this.dialog.addNode.value = this.addUserText;
		  //if no userContentFields - then no content/user for userContent page - so hide button.
		  if(this.userContentFields == null || this.userContentFields.length == 0){
			  this.dialog.addNode.style.display = 'none';
		  }
		  this.dialog.sendNode.value = this.addUserText;
		  this.dialog.backNode.value = this.backText;

		  this.dialog.show();
		   /**
			* Dialog handle
			*
			* @namespace lconn.core.VisitorModelDialog.Handle
			*/
		   return /** @lends lconn.core.VisitorModelDialog.Handle */ {
			  /**
			   * Returns the dialog
			   * @returns the dialog
			   */
			  get : function() {
				 return dlg;
			  },

			  /**
			   * Hides the dialog
			   */
			  hide : function() {
				 dlg.hide();
			  },
			  /**
			   * Shows the dialog
			   */
			  show : function() {
				 dlg.show();
			  },
			  /**
			   * Disables the dialog's submit button
			   */
			  disableSubmit : function() {
				 dojo.addClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
				 dlg.submitNode.disabled = "disabled";
			  },
			  /**
			   * Enables the dialog's submit button
			   */
			  enableSubmit : function() {
				 dojo.removeClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
				 dlg.submitNode.disabled = "";
			  }
		   };
		},

		/**
		 * Creates the textBox displayed on the main content of visitor dialog.
		 * Customizes the textbox with params passed into dialog options
		 */
		_createTextBox : function(){ //attach basicTextBox - FIX TEST CODE SO NOT JSON/FAKE VISITORS
		  // console.log("createTextBox");
		  var onFocusCallback = function() {
			 console.log("textbox focus Callback");
		  }
		  var onBlurCallback = function() {
			  console.log("textbox blur callback");
		  }
		  var keyDownCallback = function(){
			 console.log("textbox Key down callback");
		  }
		  var dataStore = new lconn.core.PeopleDataStore({
			 queryParam : 'name',
			 url : '../ckeditor/people.json'
		  });
		  var textArea = dojo.query(".textBoxArea", this.containerNode)[0];
		  var textAreaOptions = {
			 customCSS: 'lotusTextCollapsed lconnInlineCommentCke',
			 height: '90px',
			 useRTE : true,
			 width : '100%',
			 //isEE : true,
			 shadowText : this.textAreaStartText,
			 keyDownCallback: keyDownCallback,
			 onFocusCallback : onFocusCallback,
			 onBlurCallback : onBlurCallback,
			 dataStore : dataStore,
			 textBoxRows : 8
		  };
		  if(textArea){
			this.textbox = new lconn.core.lcTextArea.widgets.BasicTextBox(textAreaOptions, textArea);
			//this.textbox.background-color = '#ff0000';
		  }
		},

		/**
		 * Create the typeAhead used on mainContent page of dialog.
		 * Customizes typeAhead based on params passed into dialog
		 * options.
		 */
		_createTypeAhead : function(){ //attach TypeAhead - FIX TEST CODE SO NOT JSON/FAKE VISITORS
			 // console.log("creating the typeAhead");
			 var osParams = {
				   filterBy: "displayName",
				   count: 15
				  };

			 var peopleStore = new lconn.core.HybridPeopleDataStoreOpenSocial({
			   url : "people.json",
			   queryParam : "name",
			   extendedTypeAheadUrl : "searchPeople.json",
			   extendedQueryParam : "filterValue",
			   openSocialParameters : osParams,
			   network : null
			});

			var taArea = dojo.query(".userTypeAhead", this.containerNode)[0];
			var args = {
			  minChars : 2,
			  searchDelay : 600,
			  multipleValues : false,
			  store : peopleStore,
			  isPersonAndGroup : false,
			  NoResultsMessage : this.taNoResultsText,
			  HeaderMessage : this.taHeaderText,
			  disableSearchDirectory : false,
			  'class' : 'typeAhead',
			  disableBizCard : true
			};
			this.typeahead = new lconn.core.PeopleTypeAhead(args, taArea);
		},

		/**
		 * Builds the secondary 'user information' form dynamically using params
		 * passed in via dialog options.
		 */
		_buildUserForm : function(){
			var addUserView = dojo.query(".userContent", this.dialog.containerNode)[0];
			var userHtml = dojo.string.substitute(this._userTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
				instanceID : this._randomTestNum
			 }));
			addUserView.innerHTML = userHtml;
			//add fields to new page.
			if(this.userContentFields != null && this.userContentFields.length > 0){
				var userTable = dojo.byId('userFields' + this._randomTestNum);
				var row = null;
				for(var e = 0; e < this.userContentFields.length; e++){
					row = dojo.create('tr');
					row.innerHTML = '<td><b>' + this.userContentFields[e] + ': </b></td><td><input type="text" id="' + this.userContentFields[e] + '{instanceID}"/></td>';
					userTable.appendChild(row);
				}
			}
		},

		/**
		 * Fires off when user clicks radio button switch between the invite and 
		 * add typeahead panels 
		 */
		_toggleTypeaheadDisplay : function(type){
			var invitePanel = dojo.byId("vmInvitePanel");
			var addPanel = dojo.byId("vmAddPanel");

			// Display invite members panel
			if (type=='inv') {
				this.currentPanel = type;
				addPanel.style.display = 'none';
				if (this.inviteTypeAhead == null) {
					var typeaheadContainer = dojo.byId("vmInviteMembersWidget");
					var memberListContainer = dojo.byId("vmInvitationListContainer");
					var memberList = dojo.byId("vmInvitationList");
					this.inviteTypeAhead = this.typeaheadFunc.call(this.typeaheadContext, "inv", typeaheadContainer, memberListContainer, memberList, null);
				}

				// Change submit button label to "Invite"
				var vmSubmitBtn = dojo.byId("vmSubmitBtn");
				if (vmSubmitBtn) {
					vmSubmitBtn.value = this.inviteText;
				}   
				invitePanel.style.display = '';
			}

			// Display add members panel
			else {
				
				this.currentPanel = type;
				invitePanel.style.display = 'none';   

				if (this.addTypeAhead == null) {
					var typeaheadContainer = dojo.byId("vmAddMembersWidget");
					var memberListContainer = dojo.byId("vmMemberListContainer");
					var memberList = dojo.byId("vmMemberList");
					var groupsContainer = dojo.byId("vmAddGroupsWidget");      	
					this.addTypeAhead = this.typeaheadFunc.call(this.typeaheadContext, "add", typeaheadContainer, memberListContainer, memberList, groupsContainer);
				}

				// Handle LDAP groups
				if (this.groupSupport) {

					// Select Typeahead
					this._toggleGroups("people");

					// Turn on selector
					var selectorDiv = dojo.byId("vmPeopleGroupSelectDiv");
					var selector = dojo.byId("vmPeopleGroupSelect");
					if (selectorDiv) {
						selectorDiv.style.display="inline-block";
						dojo.connect(selector, 'onchange', this, function() {
							this._toggleGroups(selector.value);
						});
					}

				}

				// Handle people but not groups
				else {
					var peopleTA = dojo.byId("vmAddMembersWidget");
					if (peopleTA){
						peopleTA.style.display = "inline-block";
						peopleTA.removeAttribute('aria-hidden');
					}
				}

				// Change submit button label to "Save"
				var vmSubmitBtn = dojo.byId("vmSubmitBtn");
				if (vmSubmitBtn) {
					vmSubmitBtn.value = this.saveText;
				} 
				addPanel.style.display = '';
			}
		},

		/**
		 * Fires off when user clicks dropdown control to switch between people and 
		 * groups
		 */         
		_toggleGroups : function(useTA) {

			var roleLabelContainer = dojo.byId("vmRoleLabelContainer");
			if (roleLabelContainer){
				roleLabelContainer.style.display = "inline-block";
			}

			// Handle People
			if (useTA == "people") {

				// Hide Groups and show People TA
				var groupTALabel = dojo.byId("vmGTALabel");
				if (groupTALabel){
					groupTALabel.style.display = "none";
				}		
				var groupRoleLabel = dojo.byId("vmGRoleLabel");
				if (groupRoleLabel){
					groupRoleLabel.style.display = "none";
				}					
				var groupTA = dojo.byId("vmAddGroupsWidget");
				if (groupTA) {
					groupTA.style.display = "none";
					groupTA.setAttribute('aria-hidden',true);
				}
				var selectMem = dojo.byId("groupSelect");
				if (selectMem) {
					selectMem.style.display = "none";
				}
				var peopleTALabel = dojo.byId("vmTALabel");
				if (peopleTALabel){
					peopleTALabel.style.display = "inline";
				}						
				var selectType = dojo.byId("vmPeopleGroupSelect");
				if (selectType) {
					selectType.value = "people";
				}					
				var peopleRoleLabel = dojo.byId("vmRoleLabel");
				if (peopleRoleLabel){
					peopleRoleLabel.style.display = "inline";
				}							
				var peopleTA = dojo.byId("vmAddMembersWidget");
				if (peopleTA){
					peopleTA.style.display = "inline-block";
					peopleTA.removeAttribute('aria-hidden');
				}
			}

			// Handle Groups
			else if (useTA == "groups") {

				// Hide People and show Groups TA
				var peopleTALabel = dojo.byId("vmTALabel");
				if (peopleTALabel){
					peopleTALabel.style.display = "none";
				}	
				var peopleRoleLabel = dojo.byId("vmRoleLabel");
				if (peopleRoleLabel){
					peopleRoleLabel.style.display = "none";
				}	
				var peopleTA = dojo.byId("vmAddMembersWidget");
				if (peopleTA){
					peopleTA.style.display = "none";
					peopleTA.setAttribute('aria-hidden',true);
				}
				var groupTALabel = dojo.byId("vmGTALabel");
				if (groupTALabel){
					groupTALabel.style.display = "inline";
				}
				var selectType = dojo.byId("vmPeopleGroupSelect");
				if (selectType) {
					selectType.value = "groups";
				}					
				var groupRoleLabel = dojo.byId("vmGRoleLabel");
				if (groupRoleLabel){
					groupRoleLabel.style.display = "inline";
				}
				var groupTA = dojo.byId("vmAddGroupsWidget");
				if (groupTA) {
					groupTA.style.display = "inline-block";
					groupTA.removeAttribute('aria-hidden');
				}
				var selectMem = dojo.byId("groupSelect");
				if (selectMem) {
					selectMem.style.display = "none";
				}

				// Put groups after members
				var memberListContainer = dojo.byId("vmMemberListContainer");
				var groupListContainer  = dojo.query(".groupListContainer")[0];
				dojo.place(groupListContainer, memberListContainer, "after");
				if (members != null) {
					members.style.display = "inline";
				}
			}
		},

		/**
		 * fFires off when user clicks button to 'add' a  new user.  Show/hides
		 * the 'userContent' or 'mainContent' regions based on whats currently displayed.
		 */
		_toggleContentDisplay : function(){
			if(this.userContent.style.display == 'none'){
				this.titleNode.textContent = this.userContentTitle;
				this.userContent.style.display = '';
				this.mainContent.style.display = 'none';
				this.userButtons.style.display = '';
				this.mainButtons.style.display = 'none';
			}else{
				this.titleNode.textContent = this.mainContentTitle;
				this.userContent.style.display = 'none';
				this.mainContent.style.display = '';
				this.userButtons.style.display = 'none';
				this.mainButtons.style.display = '';
				this._resetBackFieldValues();
			}
		},

		/**
		 * Show the optional mail message textarea when clicked.
		 */
		_toggleMailMessage : function(){
			var optionalMailBtn = dojo.byId("vmOptionalMailBtn");
			if (optionalMailBtn) {
				optionalMailBtn.style.display = "none";
			}

			var optionalMail = dojo.byId("vmOptionalMail");
			if (optionalMail) {
				optionalMail.style.display = "block";
			}
		},

		/**
		 * Submits the form data from the dialog, then clears the form.
		 */
		onSubmit : function(){

			// If a submit function was provided, use it
			if (this.typeaheadSubFunc) {

				// Submit data
				this.typeaheadSubFunc.call(this.typeaheadContext, this.currentPanel);

				// Clear dialog
				if(this.dialog){
					this.dialog.destroy();
					this.dialog = null;	
				}else{
					if (this.containerNode) {
						this.containerNode.innerHTML = "";
					}
				}
			}

			// Otherwise use the default submission code
			else {
				var users = '';
				for(var i = 0; i < this._selectedUsers.length; i++){
					users = users + "," + this._selectedUsers[i] + " ";
				}
				var inviteText = null;
				if(this.twistyContent.style.display != 'none' && this.textbox.getValue() != this.textAreaStartText){
					alert("users: " + users + " | invite type: " + this.getRadioValue() + " | PC: " + this.getPersonalCopy() + " | text: " + this.textbox.getValue());
				}else{
					alert("users: " + users + " | invite type: " + this.getRadioValue() + " | PC: " + this.getPersonalCopy());
				}
				if(this.dialog){
					this.dialog.hide();
				}else{
					if (this.containerNode) {
						this.containerNode.innerHTML = "";
					}
				}
				this._selectedUsers = [];
			}
		},

		/**
		 * cancels the add / invite form
		 */
		onCancel : function(){
			// Clear dialog
			if(this.dialog){
				this.dialog.destroy();
				this.dialog = null;	
			}
			else{
				if (this.containerNode) {
					this.containerNode.innerHTML = "";
				}
			}
		},

		/**
		 * Returns true if checkbox is checked, false if unchecked
		 */
		getPersonalCopy : function(){
			var copyNode = dojo.query('.copyCheckbox', this.containerNode)[0];
			if(copyNode){
				return copyNode.checked;
			}
			return null;
		},

		/**
		 * Gets the value of the radio button selection
		 */
		getRadioValue : function(){
			var radioNodes = dojo.query(".lotusCheckbox", this.containerNode);
			if(radioNodes){
				for(var t=0; t < radioNodes.length; t++){
					if(radioNodes[t].checked){
						return radioNodes[t].value;
					}
				}
			}
			return null;
		},
		
		/**
		 * Udpates the list of selected users
		 */
		updateSelection : function(selection){
			var userContainer =  dojo.query(".selectedUsers", this.containerNode)[0];
			userContainer.align = 'center';
			userContainer.width = '90%';
			userContainer.style.border = "1px solid #cccccc";
			if(this._selectedUsers && this._selectedUsers.indexOf(selection.name) > -1){
				console.log("User " + selection.name + " has already been selected.... hide from results??");
			}else{
				this._addUserTag(selection);
			}
			this.typeahead.setDisplayedValue('');
		},

		/**
		 * Creates a new user tag based off the typeAhead selection and adds it to the selectedUser list.
		 */
		_addUserTag : function(selection){
			this._selectedUsers.push(selection.name);
			var userContainer =  dojo.query(".selectedUsers", this.containerNode)[0];
			var tagContainer = dojo.create("div", {});
			if(this._selectedUsers.length > 1){
				tagContainer.innerHTML = '</br>';
			}else{
				userContainer.innerHTML = '';
			}
			var newTag = dojo.create("a",  {
				"class" : "lotusFilter filterSpacing",
				"title" : "Remove " + selection.name,
				"aria-label" : "Remove " + selection.name,
				"role": "button",
				"id": "tagID" + selection.name
			});
			newTag.innerHTML = selection.name + ' <span class="fieldDelText" title="Remove ' + selection.name + '"><b>X</b></span>';
			newTag.style.border = "1px solid #cccccc";
			newTag.style.cursor = "pointer";
			if(selection.external){
				newTag.style.backgroundColor = 'yellow';
			}

			dojo.place(newTag, tagContainer, 0);
			dojo.place(tagContainer, userContainer, 0);
			dojo.connect(newTag, 'onclick', this, this._removeUserTag);
		},

		/**
		 * Removes a selected user tag when they are clicked on.
		 */
		_removeUserTag : function(e){
			var userContainer =  dojo.query(".selectedUsers", this.containerNode)[0];
			var selectedUser = null;
			var targetNode = (e && e.target) ? e.target : null;
			if(targetNode){
				if(targetNode.tagName == 'B'){targetNode = targetNode.parentNode.parentNode;}
				if(targetNode.tagName == 'SPAN'){targetNode = targetNode.parentNode;}
				selectedUser = targetNode.textContent.substring(0, targetNode.textContent.length - 2);
				if(selectedUser && this._selectedUsers && this._selectedUsers.indexOf(selectedUser) > -1){
					this._selectedUsers.splice(this._selectedUsers.indexOf(selectedUser), 1);
					if(targetNode.nextSibling && targetNode.nextSibling.tagName == 'BR'){
						targetNode.nextSibling.remove();
					}
					targetNode.remove();
					if(this._selectedUsers.length == 0){
						userContainer.style.border = "0px";
					}
				}
			}
		},

		/**
		 * keyListener for any key input on the dialog.
		 */
		dialogKeyListener : function(evt) {

		   // Handles keyboard events
		   var key = evt.keyCode || evt.charCode;
		   var dk = dojo.keys;
		   switch (key) {
			  case dk.SPACE:
				 evt.preventDefault();
				 this.onCancel();
			  default:
		   }
		},

	   /**
		 * Utility used by the public dialog functions to return a dialog
		 * object. Maintains one dialog object for re-use unless there is
		 * one open, in which case it will create another one and add it to
		 * the array. Cleans up closed dialogs at the top of the stack which
		 * are closed.
		 */
		_getDialog : function() {
		   var blankGif = (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif"));
		   var html = dojo.string.substitute(this._dialogTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
			  blankGif : blankGif
		   }));
		   var dlg = new dijit.Dialog();
		   dlg.containerNode.innerHTML = html;
		   dlg.titleBar.style.display = 'none';
		   dlg.titleBar = dojo.query("h1", dlg.containerNode)[0];
		   dlg.closeBtn = dojo.query(".lotusDialogClose", dlg.containerNode)[0];
		   var footerNode = dojo.query('.lotusDialogFooter', dlg.containerNode)[0];
		   if(footerNode){
				html = dojo.string.substitute(this._footerTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
				 checkboxLabel : this.checkboxLabel
				}));
				footerNode.innerHTML = html;
		   }
		   dlg.cancelNode = dojo.query(".lotusDialogFooter .cancel", dlg.containerNode)[0];
		   dojo.connect(dlg.closeBtn, 'onkeypress', this, this.dialogKeyListener);
		   dojo.connect(dlg.closeBtn, 'onclick', this, this.onCancel);
		   dojo.connect(dlg.cancelNode, 'onclick', this, this.onCancel);
		   return dlg;
		}
	 });