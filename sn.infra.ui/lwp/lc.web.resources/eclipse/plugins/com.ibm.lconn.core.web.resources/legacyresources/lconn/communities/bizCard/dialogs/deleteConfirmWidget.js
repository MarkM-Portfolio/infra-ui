/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.dialogs.deleteConfirmWidget");

dojo.require("dijit.Dialog");
dojo.require("dojox.html.entities");
dojo.require("lconn.communities.bizCard.dialogs.deleteConfirmTrash");
dojo.requireLocalization("lconn.communities.bizCard", "ui");

dojo.declare("lconn.communities.bizCard.dialogs.deleteConfirmWidget", [lconn.communities.bizCard.dialogs.deleteConfirmTrash], {
	postMixInProperties: function() {
		var hideFunction = dojo.hitch(this, "onHideClicked");
		this.inherited(arguments);
		
		this.warning = this.stringResources["label.deleteWidgetConfirm.warning"];
		this.communityName = this.stringResources["label.deleteWidgetConfirm.communityName"];
		this.confirmCommunityName = this.stringResources["label.deleteWidgetConfirm.confirmCommunityName"];
		this.understandTitle = this.stringResources["label.deleteWidgetConfirm.understandTitle"];
        this.communityTitle = lconn.core.HTMLUtil.escapeText(this.communityTitle);                
        this.communityTitleDisplay = this.communityTitle;        
        this.dlgTitle = dojo.string.substitute(this.stringResources["label.deleteWidgetConfirm.dlgTitle"], [this.communityTitle]);        
	},
	
	postCreate: function() {
		this.inherited(arguments);
		this.signDirection.innerHTML = dojo.string.substitute(this.stringResources["label.deleteWidgetConfirm.signDirection2"], ['"' + this.id +'"']);
		this.capitalizationWarning.innerHTML = this.stringResources["label.deleteConfirm.capitalizationWarning"];
	},
	
	// Event handlers.
	// Pass false to callback to indicate the user wants to do a Hide widget instead of delete.
	onHideClicked: function() {
		this._destroy();
		if (this.callback != null) {
			this.callback(false); // Indicate doing a hide
		}
	},
	
	onOkClicked: function() {
		this._destroy();
		if (this.callback != null) {
			this.callback(true); // Indicate doing a remove
		}
	}
});

