/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.dialogs.deleteConfirmTrash");

dojo.require("dijit.Dialog");
dojo.require("lconn.communities.bizCard.dialogs.deleteConfirm");
dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("lconn.communities.bizCard.dialogs.deleteConfirmTrash", [lconn.communities.bizCard.dialogs.deleteConfirm], {
	
	stringResources: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),
	templateString: 
		'<div dojoAttachPoint="containerNode" id="dialog_communities" class="lotusui30dojo lotusDialogWrapper" tabindex="-1" role="dialog" waiState="labelledby-${id}_title" aria-describedby="warning" aria-labelledby="${id}_title">\
			<div dojoAttachPoint="dialogBorder" class="lotusDialogBorder" style="width:inherit; height:inherit">\
				<div class="lotusDialog lotusForm2 _lotusDelete"> \
					<div dojoAttachPoint="titleBar" class="lotusDialogHeader"> \
						<div dojoAttachPoint="titleNode" id="${id}_title" class="lotusHeading">${dlgTitle}</div> \
						<a class="lotusDialogClose" role="button" href="javascript:;" title="${closeAnchorTitle}" dojoAttachEvent="onkeypress:onEnterCancelClicked,onclick:onCancelClicked" >\
							<img alt="${closeImageAltText}" src="'+ dojo.config.blankGif + '"/>\
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
											<p><b dojoAttachPoint="subcommunities"></b></p>\
										</div>\
									</span>\
								</div>\
								<div style="clear:both"></div>\
								<br>\
								<div style="width:800px; word-wrap: break-word;">\
									<span dojoAttachPoint="signDirection"></span>\
								</div>\
								<br><br>\
								<div style="width:800px; word-wrap: break-word;">\
									<span dojoAttachPoint="capitalizationWarning"></span>\
								</div>\
								<br>\
								<div id="communityNameLabel" class="lotusFormField">\
									<label role="presentation" class="lotusFloat" style="margin-left: 0px; width:200px">${communityName}</label>\
                                    <div class="lotusFieldWrapper"><b><span dojoAttachPoint="communityTitleDisplay"></span></b></div>\
								</div>\
								<div class="lotusFormField">\
									<label class="lotusFloat" style="margin-left: 0px; width:200px"><span class="lotusFormRequired">* </span>${confirmCommunityName}</label>\
									<div class="lotusFieldWrapper">\
										<input type="text" dojoAttachPoint="communityInputField" aria-required="true" aria-labelledby="communityNameLabel" value="" name="communityName" id="communityInputField" class="lotusText" dojoAttachEvent="oninput:onCommunityChange"><br><br><br>\
									</div>\
								</div>\
								<div id="signatureNameLabel" class="lotusFormField">\
									<label role="presentation" class="lotusFloat" style="margin-left: 0px; width:200px">${nameTitle}</label>\
									<div class="lotusFieldWrapper"><b><span dojoAttachPoint="userNameDisplay"></span></b></div>\
								</div>\
								<div class="lotusFormField">\
									<label class="lotusFloat" style="margin-left: 0px; width:200px"><span class="lotusFormRequired">*</span>${signatureTitle}</label>\
									<div class="lotusFieldWrapper">\
										<input type="text" dojoAttachPoint="nameInputField" aria-required="true" aria-labelledby="signatureNameLabel" value="" name="signature" id="signature" class="lotusText" dojoAttachEvent="oninput:onNameChange"><br><br><br>\
									</div>\
									<div class="lotusFormField lotusMeta">* ${required}</div> \
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
		
	postMixInProperties: function() {
		this.inherited(arguments);
		
		this.closeAnchorTitle = this.closeImageAltText = this.stringResources["label.msgbox.close"];
		
		this.dlgTitle = this.stringResources["label.deleteConfirm.trash.dlgTitle"]; 
		this.warning =  this.stringResources["label.deleteConfirm.trash.warning"];
		
	},
	
	// Override the resize function.  dojo 1.10 applies position:absolute to the titlebar which causes overlaps in our dialog
	resize: function() {
		this.inherited(arguments);
		this.titleBar.style.position = "static";
	},
	
	postCreate: function() {
		this.inherited(arguments);
		this.signDirection.innerHTML = this.stringResources["label.deleteConfirm.trash.signDirection"];
		this.capitalizationWarning.innerHTML = this.stringResources["label.deleteConfirm.capitalizationWarning"];
	}
});

