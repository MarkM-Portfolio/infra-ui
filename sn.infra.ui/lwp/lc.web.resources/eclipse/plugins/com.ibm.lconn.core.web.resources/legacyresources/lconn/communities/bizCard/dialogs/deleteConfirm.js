/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.dialogs.deleteConfirm");

dojo.require("dijit.Dialog");
dojo.require("dojox.html.entities");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("lconn.communities.bizCard.dialogs.deleteConfirm", [dijit.Dialog], {
	
	stringResources: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),
	templateString: 
		'<div dojoAttachPoint="containerNode" id="dialog_communities" class="lotusui30dojo lotusDialogWrapper" tabindex="-1" role="dialog" waiState="labelledby-${id}_title" aria-labelledby="${id}_title"  aria-describedby="warning">\
			<div dojoAttachPoint="dialogBorder" class="lotusDialogBorder" style="width:inherit; height:inherit">\
				<div class="lotusDialog lotusForm2 _lotusDelete"> \
					<div dojoAttachPoint="titleBar" class="lotusDialogHeader"> \
						<div dojoAttachPoint="titleNode" id="${id}_title" class="lotusHeading">${dlgTitle}</div> \
						<a class="lotusDialogClose" role="button" href="javascript:;" title="Close" dojoAttachEvent="onkeypress:onEnterCancelClicked,onclick:onCancelClicked" >\
							<img alt="Close" src="'+ dojo.config.blankGif + '"/>\
							<span class="lotusAltText" >X</span>\
						</a> \
					</div>\
					<div style="overflow:hidden"> \
						<div class="lotusErrorBox lotusui30_layout">\
							<div class="lotusErrorContent">\
								<img alt="" class="iconsMessages48 iconsMessages48-msgError48" src="' + dojo.config.blankGif + '">\
								<div class="lotusErrorForm">\
									<span id="warning">\
										<div class="lotusMessage2" style="margin:0px; top:0px; padding:10px">\
											<span style="font-size:150%">${warning}</span>\
											<br>\
											<span style="font-size:200%">${communityTitleFinal}</span>\
											<div>\
											<p><b dojoAttachPoint="subcommunities"></b></p>\
											</div>\
										</div>\
										<div style="clear:both"></div>\
										<br>\
										<span dojoAttachPoint="signDirection">\
										</span>\
										<br><br>\
										<span dojoAttachPoint="capitalizationWarning">\
									</span>\
									<br>\
									<div id="communityNameLabel" class="lotusFormField">\
										<label role="presentation" class="lotusFloat" style="margin-left: 0px; width:200px">${communityName}</label>\
                                        <div class="lotusFieldWrapper"><span dojoAttachPoint="communityTitleDisplay"></span></div>\
									</div>\
									<div class="lotusFormField">\
										<label class="lotusFloat" style="margin-left: 0px; width:200px"><span class="lotusFormRequired">* </span>${confirmCommunityName}</label>\
										<div class="lotusFieldWrapper">\
											<input type="text" dojoAttachPoint="communityInputField" aria-required="true" aria-labelledby="communityNameLabel" value="" name="communityName" id="communityInputField" class="lotusText bidiAware" dojoAttachEvent="oninput:onCommunityChange"><br><br><br>\
										</div>\
									</div>\
									<div id="signatureNameLabel" class="lotusFormField">\
										<label role="presentation" class="lotusFloat" style="margin-left: 0px; width:200px">${nameTitle}</label>\
										<div class="lotusFieldWrapper">${userNameDisplay}</div>\
									</div>\
									<div class="lotusFormField">\
										<label class="lotusFloat" style="margin-left: 0px; width:200px"><span class="lotusFormRequired">*</span>${signatureTitle}</label>\
										<div class="lotusFieldWrapper">\
											<input type="text" dojoAttachPoint="nameInputField" aria-required="true" aria-labelledby="signatureNameLabel" value="" name="signature" id="signature" class="lotusText bidiAware" dojoAttachEvent="oninput:onNameChange"><br><br><br>\
										</div>\
										<div class="lotusFormField lotusMeta">* ${required}</div> \
									</div>\
								</div>\
							</div>\
						</div>\
					</div><!--end lotusDialogContent-->\
					<div class="lotusDialogFooter">\
						<button dojoAttachPoint="okButtonNode" class="lotusBtn lotusBtnDisabled" aria-disabled="true" dojoAttachEvent="onclick:onOkClicked">${okButtonValue}</button>\
						<button dojoAttachPoint="closeButtonNode" dojoAttachPoint="closeText" name="yourButtonName"class="lotusBtn" dojoAttachEvent="onclick:onCancelClicked">${closeButtonValue}</button>\
					</div>\
				</div>\
			</div><!--end lotusDialogBorder-->\
		</div>',
		
		userName: "TBD",
		communityTitle: "COMMUNITY TITLE",
		nameCorrect: false, // true iff the name typed in by the user matches their name.
		communityNameCorrect: false, //true iff the Community name typed in by the user matches their Community's name
		numSubs: 0,
		callback: null, // Method to callback if user deletes.
		communityName: "",
		confirmCommunityName: "",
		
		
		postMixInProperties: function() {
		
		// Handle HTML characters in name
		//
		this.userName = dojox.html.entities.encode(this.userName);
		
		this.communityTitleFinal = lconn.core.globalization.bidiUtil.enforceTextDirection(this.communityTitle);
		this.communityTitleFinal = dojox.html.entities.encode(this.communityTitleFinal);
			
	// Replace template params;
	
		this.dlgTitle = dojo.string.substitute(this.stringResources["label.deleteConfirm.dlgTitle"], [this.communityTitleFinal]);
		this.warning = this.stringResources["label.deleteConfirm.warning"];
		this.nameTitle = this.stringResources["label.deleteConfirm.nameTitle"];
		this.signatureTitle = this.stringResources["label.deleteConfirm.signatureTitle"];
		this.okButtonValue = this.stringResources["label.deleteConfirm.okButtonValue"];
		this.closeButtonValue = this.stringResources["label.deleteConfirm.closeButtonValue"];
		this.communityName = this.stringResources["label.deleteConfirm.communityNameTitle"];
		this.confirmCommunityName = this.stringResources["label.deleteConfirm.communityNameConfirm"];
		this.capitalizationWarning = this.stringResources["label.deleteConfirm.capitalizationWarning"];
		this.required = this.stringResources["label.deleteConfirm.required"];
		
		this.inherited(arguments);
	
		
	},
	
	postCreate: function() {
	
		// If using IE, need to attach listen for onpropertychange event.
		//
		if (dojo.isIE) {
		// Use onpropertychange for IE, instead of oninput for all other browsers.
			dojo.connect(this.nameInputField, "onpropertychange", this, "onNameChange"); 
			dojo.connect(this.communityInputField, "onpropertychange", this, "onCommunityChange"); 
			
			// Override One UI width of 500px for IE
			dojo.style(this.dialogBorder, "width", "auto");
			dojo.style(this.dialogBorder, "height", "auto");
			
			//for rtl, we need to set this width explicitly so IE renders it correctly.
			if (!dojo._isBodyLtr()) {
				var newwidth = Math.max(dojo.coords(this.titleNode).w, 600); //make sure it's at least 600px
				dojo.query(".lotusFormField", this.domNode).forEach(function(node) {
					dojo.style(node, "width", newwidth + "px");
				});
			}			
		}
		
		if (this.numSubs == 1) {
			dojo.html.set(this.subcommunities, this.stringResources["label.deleteConfirm.oneSubCommunity"]);
		}
		else if (this.numSubs > 1) {
			dojo.html.set(this.subcommunities, dojo.string.substitute(this.stringResources["label.deleteConfirm.multipleSubCommunities"], [this.numSubs]));
		}
		
		this.inherited(arguments);
		//https://jira.cwp.pnp-hcl.com/browse/CNXSERV-13693:  Dialog box is not showing special chars correctly
		this.titleNode.innerHTML = lconn.core.globalization.bidiUtil.enforceTextDirection(this.communityTitle);

				// Replace attach points
		this.communityTitleDisplay.innerHTML = lconn.core.globalization.bidiUtil.enforceTextDirection(this.communityTitle);
		this.userNameDisplay.innerHTML = lconn.core.globalization.bidiUtil.enforceTextDirection(this.userName);
		this.signDirection.innerHTML = this.stringResources["label.deleteConfirm.signDirection"];
	
	
		dojo.removeClass(this.containerNode, "dijitContentPane"); 
		this._enableDeleteButton();
		
		// Connect to setup so we can connect to the dojo animation
		// 'onend' call and set the focus to the first text input
		// when animation is done.
		dojo.connect(this, "_setup", dojo.hitch(this, "_setupOverride"));
		
		// Bidi support
        lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.formNode);
	},
	
	// Event handlers.
	onOkClicked: function() {
		this._destroy();
		if (this.callback != null) {
			this.callback();
		}
	},
	
	onEnterCancelClicked: function(keyEvent) {
		if (keyEvent.keyCode == 13) {// Enter key, do the cancel
			this.onCancelClicked();
		}
	},
	
	onCancelClicked: function() {
		this._destroy();
	},
	
	onNameChange: function(event) {
		if (dojox.html.entities.decode(this.userName) == event.target.value) {
			this.nameCorrect = true;
		}
		else {
			this.nameCorrect = false;
		}
		this._enableDeleteButton();
	},
	
	onCommunityChange: function(event) {
		if (dojox.html.entities.decode(this.communityTitle) == event.target.value) {
			this.communityNameCorrect = true;
		}
		else {
			this.communityNameCorrect = false;
		}
		this._enableDeleteButton();
	},
	
	/*
		Enable or disable delete button
	*/
	_enableDeleteButton: function() {
		okButton = this.okButtonNode;
		bntDisabledClass = "lotusBtnDisabled";
		if (this.nameCorrect == true && this.communityNameCorrect == true) {
			dojo.attr(okButton, {"class": "lotusBtn", "aria-disabled": "false"});
			okButton.disabled = false;
		}
		else {
			dojo.attr(okButton, {"class": "lotusBtn lotusBtnDisabled", "aria-disabled": "true"});
			okButton.disabled = true;
		}
	},
	
	/**
	* Override Dojo _size function for dialog.js.  It's setting position to "relative" which causes
	* FF to not show dialog correctly on RedHat system.
	*/

	_size: function() {
		var result = this.inherited(arguments);
		this.domNode.style.position = "absolute";
		return(result);
	},
	
	// Override the show method so we can override the
	// onEnd method to set the focus to the community input text field.
	//
	_setupOverride: function() {
		var handle = dojo.connect(this._fadeIn, "onEnd", function() {
			dojo.byId("communityInputField").focus();
			dojo.disconnect(handle);
		});
	},
	//
	// Have to do hide, then destroy for underlay to be removed.
	//
	_destroy: function() {
		this.hide();
		this.destroyRecursive();
	}
});

