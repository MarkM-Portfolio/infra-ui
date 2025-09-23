/* Copyright IBM Corp. 2008, 2016  All Rights Reserved.              */
define([
        "dojo/query",
        "dojo/on",
        "dojo/dom",
        "dojo/dom-class",
        "dojo/_base/config",
        "dojo/keys",
        "dijit/Dialog",
        "dojo/dom-construct",
        "dojo/i18n!ic-core/nls/strings",
        "dojo/string",
        "dojo/_base/lang",
        "dojox.uuid.generateTimeBasedUuid",
        "ic-core/PeopleTypeAhead",
        "ic-core/PeopleDataStoreOpenSocial",
        "ic-core/PeopleDataStore",
        "ic-core/TypeAhead",
        "ic-core/lcTextArea/widgets/BasicTextBox",
        "ic-core/strings"
        
], function(query, on, dom, domClass, keys, Dialog, domConstruct, i18nstrings, string, lang, generateTimeBasedUuid, PeopleTypeAhead, PeopleDataStoreOpenSocial, PeopleDataStore, TypeAhead, BasicTextBox, strings) {
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
		noOptions : false,

		/**
		 * Visitor Model Invite constructor function
		 */
		constructor : function(options){
			this.containerNode = options.containerNode || null;
			this.typeaheadContext = options.typeaheadContext || null;
			this.typeaheadFunc = options.typeaheadFunc || null;
			this.typeaheadSubFunc = options.typeaheadSubFunc || null;
			this.noOptions = options.noOptions || false;

			if (options.mainContentTitle){this.mainContentTitle = options.mainContentTitle};
			if (options.typeAheadLabel){this.typeAheadLabel = options.typeAheadLabel};
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
		
		initResStrings : function() {
			var nls = i18nstrings;
        	this.mainContentTitle		= nls.rs_vmmainContentTitle;
        	this.mainContentDesc  		= nls.rs_vmmainContentDesc;
        	this.typeAheadLabel   		= nls.rs_vmtypeAheadLabel;
			this.groupTypeAheadLabel	= nls.rs_vmgroupTypeAheadLabel;
			this.typeAheadRoleLabel		= nls.rs_vmtypeAheadRoleLabel;
			this.groupTypeAheadRoleLabel= nls.rs_vmgroupTypeAheadRoleLabel;
			this.taNoResultsText		= nls.rs_vmtaNoResults;
			this.taHeaderText			= nls.rs_vmtaHeader;
			this.addUserText			= nls.rs_vmaddUser;
			this.radioSectionTitle		= nls.rs_vmradioSectionTitle;
			this.radioOneText			= nls.rs_vmradioOne;
			this.radioTwoText			= nls.rs_vmradioTwo;
			this.twistyTextA			= nls.rs_vmtwistyA;
			this.twistyTextB			= nls.rs_vmtwistyB;
			this.message				= nls.rs_vmmessage;
			this.textAreaStartText		= nls.rs_vmtextAreaStartText;
			this.checkboxLabel			= nls.rs_vmcheckboxLabel;
			this.saveText				= nls.rs_vmsave;
			this.inviteText				= nls.rs_vminvite;
			this.cancelText				= nls.rs_vmcancel;
			this.userContentTitle		= nls.rs_userContentTitle;
			this.addUserText			= nls.rs_vmaddUser;
			this.backText				= nls.rs_vmback;
			},
		
		/**
		 * Public show function, calls private _show function
		 */
		show : function(){
			dialogUtils.show();
		},
		
		/**
		 * Shows control
		 */
		_show : function(){
			if(this.containerNode){
				// Display the HTML inline
				dialogUtils.displayInline();
			}
			else{
				// Display the dialogContainer
				this.dialog = dialogUtils.getDialog();
				dialogUtils.displayDialog();
			}

			// Connect the invite html to the actions
			dialogUtils.connectDom();
		},
		
		setOptionsPanel : function(){
			if(this.noOptions){
				document.getElementById("optionsPanel").style.display = "none";
			}
		},

		/**
		 * Calls for a new dialog to be created, then attaches invite
		 * HTML template
		 */
		_displayDialog : function(){
			var dialogContainer = query('.lotusDialogContent', this.dialog.containerNode)[0];
			if(dialogContainer){
				var HTML = string.substitute(dojo.cache("lconn.core", "visitorModel/templates/inviteDialog.html"), lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
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
			dialogUtils.toggleTypeaheadDisplay("inv");
			this.dialog.show();
			this.setOptionsPanel();
		},
		
		/**
		 * Attaches invite HTML template to inline containerNode
		 */
		_displayInline : function(){
			var HTML = string.substitute(dojo.cache("lconn.core", "visitorModel/templates/inviteDialog.html"), lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
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
			 })).concat(string.substitute(dojo.cache("lconn.core", "visitorModel/templates/footerDialog.html"), lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
				 checkboxLabel : this.checkboxLabel
			  })));
			//this.containerNode.style.backgroundColor = 'white;';
			this.containerNode.innerHTML = HTML;
			this.setOptionsPanel();
		},
		
		/**
		 * Connect DOM event handling
		 */
		_connectDom : function() {
			dialogUtils.selectedUsers = [];
			var containerNode = this.containerNode || this.dialog.containerNode;
			this.titleNode = query("h1 .title", containerNode)[0];
			if(!this.titleNode){
				this.titleNode = domConstruct.create("h1", {'class' : "title lotusFormTitle"});
				domConstruct.place(this.titleNode, containerNode, 0);
			}
			this.titleNode.textContent = this.mainContentTitle
			//these are dialog dependent
			this.contentNode = query(".lotusDialogContent", containerNode)[0];
			this.footerNode = query(".lotusDialogFooter", containerNode)[0];

			this.mainContent = query(".mainContent", containerNode)[0];
			this.userContent = query(".userContent", containerNode)[0];
			this.mainButtons = query(".mainButtons", containerNode)[0];
			this.userButtons = query(".userButtons", containerNode)[0];

			this.submitNode = query(".submit", containerNode)[0];
			this.submitNode.value = this.inviteText;
			this.cancelNode = query(".cancel", containerNode)[0];
			this.cancelNode.value = this.cancelText;
			this.addNode = query(".createUser", containerNode)[0];
			this.addNode.value = this.addUserText;
			this.twistyNode = query('.twisty', containerNode)[0];
			this.twistyContent = query('.twistyContent', containerNode)[0];
			this.submitUserNode = query(".submitUser", containerNode)[0];
			this.submitUserNode.value = this.addUserText;
			this.backNode = query(".back", containerNode)[0];
			this.backNode.value = this.backText;

			if(this.dialog){
				this.dialogBorder = query(".lotusDialogBorder", containerNode)[0];
				this.closeBtn = query(".lotusDialogClose", containerNode)[0];
				this.dialogBorder.style.width = "680px";

			}else{
				on(this.cancelNode, 'onclick', this, function(){
					this.containerNode.innerHTML = '';
					dialogUtils.selectedUsers = [];
				});
			}

			// Connect radio buttons
			on(dom.byId("vmInviteType"), 'onclick', this, function(){
				dialogUtils.toggleTypeaheadDisplay("inv");
			});

			on(dom.byId("vmAddType"), 'onclick', this, function(){
				dialogUtils.toggleTypeaheadDisplay("add");
			});

			// Create Typeahead is none supplied
			if (this.typeaheadFunc == null) {
				dialogUtils.createTextBox();
				dialogUtils.createTypeAhead();
				on(this.addNode, 'onclick', this, function(){dialogUtils.toggleContentDisplay()});
				on(this.backNode, 'onclick', this, function(){dialogUtils.toggleContentDisplay()});
				on(this.typeahead, 'onSelect', this, this.updateSelection);
			}

			var optionalMailBtn = dom.byId("vmOptionalMailBtn");
			if (optionalMailBtn) {
				on(optionalMailBtn, 'onclick', this, dialogUtils.toggleMailMessage);
			}
			on(this.submitNode, 'onclick', this, this.onSubmit);
			this.initResStrings();
		},

		/**
		 * Reinitialize form values
		 */
		_resetBackFieldValues : function() {
			var first = query(".newUserFirst", this.containerNode)[0];
			var last =  query(".newUserLast", this.containerNode)[0];
			var organization = query(".newUserOrg", this.containerNode)[0];
			var Email = query(".newUserEmail", this.containerNode)[0];
			first.value = "";
			last.value = "";
			organization.value = "";
			Email.value = "";
		},
		
		/**
		 * Display Visitor Model Dialog
		 */
		displayDialog : function() {
		   this.dialog = dialogUtils.getDialog(this.mainContentTitle);
		   var bundle = i18nstrings.getLocalization('lconn.core', 'strings');

		   domConstruct.place(document.createTextNode(this.mainContentTitle), this.dialog.titleNode, "only");
		   dijit.setWaiState(this.dialog.titleBar, "label", this.mainContentTitle);

		  on(this.dialog.typeahead, 'onSelect', this, this.updateSelection);
		  on(this.dialog.submitNode, 'onclick', this, this.onSubmit);
		  on(this.dialog.addNode, 'onclick', this, dialogUtils.toggleContentDisplay);
		  on(this.dialog.backNode, 'onclick', this, dialogUtils.toggleContentDisplay);
		  dom.byId("dialogUtils.selectedUsers" + dialogUtils.randomTestNum).style.borderBottom = "1px solid #cccccc";

		  if(dom.byId("dialogUtils.selectedUsers" + dialogUtils.randomTestNum).innerHTML == ''){
			  dom.byId("dialogUtils.selectedUsers" + dialogUtils.randomTestNum).innerHTML = "</br>";
		  }
		  dom.byId("dialogUtils.selectedUsers" + dialogUtils.randomTestNum).style.borderBottom = "1px solid #cccccc";
		  dialogUtils.createTextBox();

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
				 domClass.addClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
				 dlg.submitNode.disabled = "disabled";
			  },
			  /**
			   * Enables the dialog's submit button
			   */
			  enableSubmit : function() {
				 domClass.removeClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
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
		  var textArea = query(".textBoxArea", this.containerNode)[0];
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

			var taArea = query(".userTypeAhead", this.containerNode)[0];
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
			var addUserView = query(".userContent", this.dialog.containerNode)[0];
			var userHtml = string.substitute(dialogUtils.userTemplate, lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
				instanceID : dialogUtils.randomTestNum
			 }));
			addUserView.innerHTML = userHtml;
			//add fields to new page.
			if(this.userContentFields != null && this.userContentFields.length > 0){
				var userTable = dom.byId('userFields' + dialogUtils.randomTestNum);
				var row = null;
				for(var e = 0; e < this.userContentFields.length; e++){
					row = domConstruct.create('tr');
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
			var invitePanel = dom.byId("vmInvitePanel");
			var addPanel = dom.byId("vmAddPanel");

			// Display invite members panel
			if (type=='inv') {
				this.currentPanel = type;
				addPanel.style.display = 'none';
				if (this.inviteTypeAhead == null) {
					var typeaheadContainer = dom.byId("vmInviteMembersWidget");
					var memberListContainer = dom.byId("vmInvitationListContainer");
					var memberList = dom.byId("vmInvitationList");
					this.inviteTypeAhead = this.typeaheadFunc.call(this.typeaheadContext, "inv", typeaheadContainer, memberListContainer, memberList, null);
				}

				// Change submit button label to "Invite"
				var vmSubmitBtn = dom.byId("vmSubmitBtn");
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
					var typeaheadContainer = dom.byId("vmAddMembersWidget");
					var memberListContainer = dom.byId("vmMemberListContainer");
					var memberList = dom.byId("vmMemberList");
					var groupsContainer = dom.byId("vmAddGroupsWidget");      	
					this.addTypeAhead = this.typeaheadFunc.call(this.typeaheadContext, "add", typeaheadContainer, memberListContainer, memberList, groupsContainer);
				}

				// Handle LDAP groups
				if (this.groupSupport) {

					// Select Typeahead
					dialogUtils.toggleGroups("people");

					// Turn on selector
					var selectorDiv = dom.byId("vmPeopleGroupSelectDiv");
					var selector = dom.byId("vmPeopleGroupSelect");
					if (selectorDiv) {
						selectorDiv.style.display="inline-block";
						on(selector, 'onchange', this, function() {
							dialogUtils.toggleGroups(selector.value);
						});
					}

				}

				// Handle people but not groups
				else {
					var peopleTA = dom.byId("vmAddMembersWidget");
					if (peopleTA){
						peopleTA.style.display = "inline-block";
						peopleTA.removeAttribute('aria-hidden');
					}
				}

				// Change submit button label to "Save"
				var vmSubmitBtn = dom.byId("vmSubmitBtn");
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

			var roleLabelContainer = dom.byId("vmRoleLabelContainer");
			if (roleLabelContainer){
				roleLabelContainer.style.display = "inline-block";
			}

			// Handle People
			if (useTA == "people") {

				// Hide Groups and show People TA
				var groupTALabel = dom.byId("vmGTALabel");
				if (groupTALabel){
					groupTALabel.style.display = "none";
				}		
				var groupRoleLabel = dom.byId("vmGRoleLabel");
				if (groupRoleLabel){
					groupRoleLabel.style.display = "none";
				}					
				var groupTA = dom.byId("vmAddGroupsWidget");
				if (groupTA) {
					groupTA.style.display = "none";
					groupTA.setAttribute('aria-hidden',true);
				}
				var selectMem = dom.byId("groupSelect");
				if (selectMem) {
					selectMem.style.display = "none";
				}
				var peopleTALabel = dom.byId("vmTALabel");
				if (peopleTALabel){
					peopleTALabel.style.display = "inline";
				}						
				var selectType = dom.byId("vmPeopleGroupSelect");
				if (selectType) {
					selectType.value = "people";
				}					
				var peopleRoleLabel = dom.byId("vmRoleLabel");
				if (peopleRoleLabel){
					peopleRoleLabel.style.display = "inline";
				}							
				var peopleTA = dom.byId("vmAddMembersWidget");
				if (peopleTA){
					peopleTA.style.display = "inline-block";
					peopleTA.removeAttribute('aria-hidden');
				}
			}

			// Handle Groups
			else if (useTA == "groups") {

				// Hide People and show Groups TA
				var peopleTALabel = dom.byId("vmTALabel");
				if (peopleTALabel){
					peopleTALabel.style.display = "none";
				}	
				var peopleRoleLabel = dom.byId("vmRoleLabel");
				if (peopleRoleLabel){
					peopleRoleLabel.style.display = "none";
				}	
				var peopleTA = dom.byId("vmAddMembersWidget");
				if (peopleTA){
					peopleTA.style.display = "none";
					peopleTA.setAttribute('aria-hidden',true);
				}
				var groupTALabel = dom.byId("vmGTALabel");
				if (groupTALabel){
					groupTALabel.style.display = "inline";
				}
				var selectType = dom.byId("vmPeopleGroupSelect");
				if (selectType) {
					selectType.value = "groups";
				}					
				var groupRoleLabel = dom.byId("vmGRoleLabel");
				if (groupRoleLabel){
					groupRoleLabel.style.display = "inline";
				}
				var groupTA = dom.byId("vmAddGroupsWidget");
				if (groupTA) {
					groupTA.style.display = "inline-block";
					groupTA.removeAttribute('aria-hidden');
				}
				var selectMem = dom.byId("groupSelect");
				if (selectMem) {
					selectMem.style.display = "none";
				}

				// Put groups after members
				var memberListContainer = dom.byId("vmMemberListContainer");
				var groupListContainer  = query(".groupListContainer")[0];
				domConstruct.place(groupListContainer, memberListContainer, "after");
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
				dialogUtils.resetBackFieldValues();
			}
		},

		/**
		 * Show the optional mail message textarea when clicked.
		 */
		_toggleMailMessage : function(){
			var optionalMailBtn = dom.byId("vmOptionalMailBtn");
			if (optionalMailBtn) {
				optionalMailBtn.style.display = "none";
			}

			var optionalMail = dom.byId("vmOptionalMail");
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
				for(var i = 0; i < dialogUtils.selectedUsers.length; i++){
					users = users + "," + dialogUtils.selectedUsers[i] + " ";
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
				dialogUtils.selectedUsers = [];
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
			var copyNode = query('.copyCheckbox', this.containerNode)[0];
			if(copyNode){
				return copyNode.checked;
			}
			return null;
		},

		/**
		 * Gets the value of the radio button selection
		 */
		getRadioValue : function(){
			var radioNodes = query(".lotusCheckbox", this.containerNode);
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
			var userContainer =  query(".selectedUsers", this.containerNode)[0];
			userContainer.align = 'center';
			userContainer.width = '90%';
			userContainer.style.border = "1px solid #cccccc";
			if(dialogUtils.selectedUsers && dialogUtils.selectedUsers.indexOf(selection.name) > -1){
				console.log("User " + selection.name + " has already been selected.... hide from results??");
			}else{
				dialogUtils.addUserTag(selection);
			}
			this.typeahead.setDisplayedValue('');
		},

		/**
		 * Creates a new user tag based off the typeAhead selection and adds it to the selectedUser list.
		 */
		_addUserTag : function(selection){
			dialogUtils.selectedUsers.push(selection.name);
			var userContainer =  query(".selectedUsers", this.containerNode)[0];
			var tagContainer = domConstruct.create("div", {});
			if(dialogUtils.selectedUsers.length > 1){
				tagContainer.innerHTML = '</br>';
			}else{
				userContainer.innerHTML = '';
			}
			var newTag = domConstruct.create("a",  {
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

			domConstruct.place(newTag, tagContainer, 0);
			domConstruct.place(tagContainer, userContainer, 0);
			on(newTag, 'onclick', this, dialogUtils.removeUserTag);
		},

		/**
		 * Removes a selected user tag when they are clicked on.
		 */
		_removeUserTag : function(e){
			var userContainer =  query(".selectedUsers", this.containerNode)[0];
			var selectedUser = null;
			var targetNode = (e && e.target) ? e.target : null;
			if(targetNode){
				if(targetNode.tagName == 'B'){targetNode = targetNode.parentNode.parentNode;}
				if(targetNode.tagName == 'SPAN'){targetNode = targetNode.parentNode;}
				selectedUser = targetNode.textContent.substring(0, targetNode.textContent.length - 2);
				if(selectedUser && dialogUtils.selectedUsers && dialogUtils.selectedUsers.indexOf(selectedUser) > -1){
					dialogUtils.selectedUsers.splice(dialogUtils.selectedUsers.indexOf(selectedUser), 1);
					if(targetNode.nextSibling && targetNode.nextSibling.tagName == 'BR'){
						targetNode.nextSibling.remove();
					}
					targetNode.remove();
					if(dialogUtils.selectedUsers.length == 0){
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
		   var dk = keys;
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
		   var blankGif = (config.blankGif || require.toUrl("dojo", "resources/blank.gif"));
		   var html = string.substitute(dojo.cache("lconn.core", "visitorModel/templates/dialog.html"),, lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
			  blankGif : blankGif
		   }));
		   var dlg = new dijit.Dialog();
		   dlg.containerNode.innerHTML = html;
		   dojo.addClass(dlg.containerNode,"inviteDialog");
		   dlg.titleBar.style.display = 'none';
		   dlg.titleBar = query("h1", dlg.containerNode)[0];
		   dlg.closeBtn = query(".lotusDialogClose", dlg.containerNode)[0];
		   var footerNode = query('.lotusDialogFooter', dlg.containerNode)[0];
		   if(footerNode){
				html = string.substitute(dojo.cache("lconn.core", "visitorModel/templates/footerDialog.html"),, lang.mixin(i18nstrings.getLocalization('lconn.core', 'strings'), {
				 checkboxLabel : this.checkboxLabel
				}));
				footerNode.innerHTML = html;
		   }
		   dlg.cancelNode = query(".lotusDialogFooter .cancel", dlg.containerNode)[0];
		   on(dlg.closeBtn, 'onkeypress', this, this.dialogKeyListener);
		   on(dlg.closeBtn, 'onclick', this, this.onCancel);
		   on(dlg.cancelNode, 'onclick', this, this.onCancel);
		   return dlg;
		}
	 });