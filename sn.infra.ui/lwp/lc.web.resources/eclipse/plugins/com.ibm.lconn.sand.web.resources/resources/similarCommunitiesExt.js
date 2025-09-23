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

dojo.provide("lconn.sand.similarCommunitiesExt");
dojo.provide("sand"); //FIXME: this is too generic, Similar Communities should be referenced in a more specific fashion
//FIXME: I believe this is dead code and can be removed

dojo.require("dijit.dijit");

sand.similarCommunitiesFormPopup = function(){
	//PUBLIC DOM IDS are:
	//CreateCommunityInfoArea
	//addCommunityName
	//dojo widget: autocompletetags, addCommunityDescription
	console.log('hello');

	dojo.registerModulePath('lconn.sand', window.lcSandUIRoot + "js_src/lconn/sand");
	dojo.require("lconn.sand.sandAll");
	dojo.require("lconn.core.xpath");
	dojo.require("lconn.sand.SimComSummary");
	

	var title = dojo.byId('addCommunityName').value;
	var description = dijit.byId('addCommunityDescription').getValue(false);
	var tagString = dojo.byId('autocompletetags').value;
	if (tagString && tagString != "") {
		var tags=tagString.split(" ");
	} else {
		var tags=null;
	}

	var addComMembers_W = dijit.byId("addComMembersWidget");
	addComMembers_W.setHiddenFields();    
    var people = [];
    var members = addComMembers_W.getMembers();
    if (members && members != "") {
    	people = members.split(",");
    }
    var owners =  addComMembers_W.getOwners();
    if (owners && owners != "") { 	      
    	people = people.concat(members.split(","));
    }        
	
	var simComSummary = dijit.byId("simComWidgetId");
	
	if (!simComSummary) {
		simComSummary = new lconn.sand.SimComSummary({id:"simComWidgetId"});
		dojo.byId("CreateCommunityInfoArea").appendChild(simComSummary.domNode);
	}	

	if (title && title != "" ||
		description && description != "" ||
		tags ||
		people.length > 0) {

		simComSummary.populate(title, people, description, tags); 
	} else {
		simComSummary.hide();
	}
};

sand.similarCommunitiesFormPopup1 = function(){
	
	alert('hello1');
};
