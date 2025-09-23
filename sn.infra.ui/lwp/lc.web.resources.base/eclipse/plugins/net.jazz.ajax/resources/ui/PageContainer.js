/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
dojo.provide("net.jazz.ajax.ui.PageContainer");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("net.jazz.ajax.ui.ErrorPage");
dojo.require("jazz.util.ResizeNotifier");
dojo.require("net.jazz.ajax.ui.PlatformUI");

dojo.declare("net.jazz.ajax.ui.PageContainer", [dijit._Widget, dijit._Templated], {
	
	// summary:
	//		a widget for displaying pages
	// usage notes:
	//		this widget contains no public methods; simply instantiate it and
	//		place it within a Jazz Framework-based application
	// since:
	//		0.6
	
	//
	// Internal and lifecycle methods; do not call directly
	//
	
	templateString: '<div><div style="clear:both, height: 0"></div></div>',
	id: "net-jazz-ajax-PageContainer",
	widgetsInTemplate: true, //TODO why?
	
	postCreate: function() {
		net.jazz.ajax.ui.PlatformUI.getWorkbench()._pageContainer = this;
	},
	
	_viewPage: function(page) {
		page = page.domNode;
		if(this._currentPage && this._currentPage === page)
			return;
		if (this._currentPage)
			this._currentPage.style.display = "none";
		page.style.display = "";
		dojo.place(page, this.domNode, "first");
		this._currentPage = page;
		window.scrollTo(0,0);
		jazz.util.ResizeNotifier.poke();
	},
	
	_viewErrorPage: function(message, finePrint, hideRunDefaultAction) {
		if (!this._errorPage)
			this._errorPage = new net.jazz.ajax.ui.ErrorPage();
		this._errorPage.setHideRunDefaultAction(hideRunDefaultAction);
		this._errorPage.setMessage(message, finePrint);
		this._viewPage(this._errorPage);
	},
	
	uninitialize: function() {
		if (this._errorPage) {
			this._errorPage.destroy();
			delete this._errorPage;
		}
	}
});