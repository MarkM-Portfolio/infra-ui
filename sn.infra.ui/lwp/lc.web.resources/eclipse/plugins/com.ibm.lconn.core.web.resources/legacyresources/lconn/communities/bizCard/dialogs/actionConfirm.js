/* Copyright IBM Corp. 2012, 2018  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.dialogs.actionConfirm");

dojo.require("dijit.Dialog");
dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("lconn.communities.bizCard.dialogs.actionConfirm", [dijit.Dialog], {
	stringResources: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),

  // Dialog Template
  templateString:
		'<div dojoAttachPoint="containerNode" id="dialog_communities" class="lotusui30dojo lotusDialogWrapper" tabindex="-1" waiRole="dialog" waiState="labelledby-${id}_title">\
            <div style="width:600px" aria-labelledby="${id}_title" role="region">\
				<div dojoAttachPoint="dialogBorder" class="lotusDialogBorder" aria-labelledby="${id}_content">\
					<div class="lotusDialog lotusForm2 lotusLeftLabels _lotusDelete"> \
						<div dojoAttachPoint="titleBar" class="lotusDialogHeader"> \
							<div dojoAttachPoint="titleNode" id="${id}_title" class="lotusHeading">${dlgTitle}</div> \
							<a class="lotusDialogClose" role="button" href="javascript:;" title="${closeAnchorTitle}"  dojoAttachEvent="onkeypress:onEnterCancelClicked,onclick:onCancelClicked">\
								<img dojoAttachEvent="onclick:onCancelClicked" alt="${closeImageAltText}" src="'+ dojo.config.blankGif + '"/>\
								<span class="lotusAltText">X</span>\
							</a> \
						</div>\
						<div>\
              <div class="lotusDialogContent" id="${id}_content">\
								${dlgContent}\
							</div><!--end lotusDialogContent-->\
						</div>\
						<div class="lotusDialogFooter">\
							<button dojoAttachPoint="okButtonNode" class="lotusBtn" dojoAttachEvent="onclick:onOkClicked">${okButtonValue}</button>\
							<button dojoAttachPoint="closeButtonNode" dojoAttachPoint="closeText" class="lotusBtn" dojoAttachEvent="onclick:onCancelClicked">${closeButtonValue}</button>\
						</div>\
					</div>\
				</div><!--end lotusDialogBorder-->\
			</div>\
		</div>',

		callback: null, // Method to callback if user deletes.
		dlgContent: null,

  // Replace template params
  postMixInProperties: function() {
    this.closeButtonValue = this.stringResources["label.actionConfirm.closeButtonValue"];
		this.closeAnchorTitle = this.closeImageAltText = this.stringResources["label.msgbox.close"];
		this.inherited(arguments);
	},

	postCreate: function() {
	  // This class causes a scroll bar to appear.
		dojo.attr(this.dialogBorder, "style", {width: "auto"}); // Override lotusui_ie setting in Connections to 500px width

		this.inherited(arguments);
		dojo.removeClass(this.containerNode, "dijitContentPane");
	},

	// Event handlers.
	onOkClicked: function() {
		this.hide();
		if (this.callback != null) {
			this.callback();
		}
	},

  // Close dialog
	onCancelClicked: function() {
		this.hide();
	},

  // Close dialog
	onEnterCancelClicked: function(keyEvent) {
		if (keyEvent.keyCode == 13) {// Enter key, do the cancel
			this.onCancelClicked();
		}
	}
});
