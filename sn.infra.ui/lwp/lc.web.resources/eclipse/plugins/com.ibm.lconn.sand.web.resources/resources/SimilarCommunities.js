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

dojo.provide("lconn.sand.SimilarCommunities"); 

dojo.require("dijit.Dialog");

dojo.require("dijit.form.Button");

dojo.require("lconn.sand.sandConsts");
dojo.require("lconn.sand.Community");

dojo.declare("lconn.sand.SimilarCommunities", 
		[dijit.Dialog],  
		{
	templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
	templatePath: dojo.moduleUrl("lconn.sand","templates/SimilarCommunities.html"),
	widgetsInTemplate: true,
	_blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),

	iContext: null,
	entries: null,
				
populate: function(cuids, members){
	dojo.connect(this.hideSimsBtn, "onclick", this, "hide");

	this.clear();
	for (var i=0; i < cuids.length; i++) {
		var commWidget = new lconn.sand.Community({communityUuid: cuids[i].nodeValue, members: this.members});
		this.comEntries.appendChild(commWidget.domNode);
	}
},

clear: function () {
	if (this.comEntries.hasChildNodes() ) {
    	while ( this.comEntries.childNodes.length >= 1 ) {
        	this.comEntries.removeChild( this.comEntries.firstChild );       
    	} 
	}
}
});
