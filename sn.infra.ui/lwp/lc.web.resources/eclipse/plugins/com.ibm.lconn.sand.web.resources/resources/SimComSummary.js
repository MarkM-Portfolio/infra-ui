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

dojo.provide("lconn.sand.SimComSummary"); 

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.xpath");

dojo.require("lconn.sand.sandConsts");
dojo.require("lconn.sand.SimilarCommunities");

dojo.declare("lconn.sand.SimComSummary", 
		[dijit._Widget, dijit._Templated],  
		{
	templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
	templatePath: dojo.moduleUrl("lconn.sand","templates/SimComSummary.html"),
	//templatePath: window.lcSandUIRoot + "templates/SimComSummary.html",
	widgetsInTemplate: true,
	_blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),

	CLIENT: "SimComSummary version 1.0",
		
	iContext: null,
	members: null,
	tags: null,
	
	dlg: null,
			
populate: function(title, members, description, tags) {

	dojo.connect(this.viewLink, "onclick", this, "viewComs");

	this.members = members;
	this.tags = tags;
	
	var queryString = "";
	if (title) {
		queryString += title + " ";
	}
	
	if (description) { 
		queryString += description + " ";
	}
		
	var tagString = "";
	if (tags) {
		for (var tag in tags) {
			queryString += " " + tag;
			tagString += "&tag:" + tag;
		}
	}
	
	var membersString = "";
	if (members) {
		for (var person in members) {
			membersString += "&person:" + person;
		}
	}
	
	var handleAsType = "xml";
	var sonarLoadCallback = this.sonarLoad;
	
	if(lconn.core.xpath.isIE11()) {
		handleAsType = "text";
		sonarLoadCallback = this.sonarLoadAsTextOnIE11;
	}
	
	dojo.xhrGet({
		url: window.sandBackEndRoot + "/api/sand/recommend?user="+window.userid+"&relweightConf=all" + membersString + tagString,
		handleAs: handleAsType,
		load: dojo.hitch(this, sonarLoadCallback),
		error: dojo.hitch(this, this.xhrError), 
		content: {client:this.CLIENT,
				  query: queryString,
				  type:"Group-Community"} 
	});
},

sonarLoadAsTextOnIE11: function(data) {
    // the response is text, and must be turned to XML
	var dom = lconn.communities.catalog.util.loadDOMIE11(data);
    this.sonarLoad(dom);
},

sonarLoad: function (data) {
	this.data = data;
	
	var numCommunities = 0;
	var temp = lconn.core.xpath.selectSingleNode("/ass:ResultSet/openSearch:totalResults/text()", data, sandConsts.NAME_SPACES);
	if(temp != null)
		numCommunities = temp.nodeValue;
	if (numCommunities > 0) {
		this.content.style.display = "block";
		
		this.simText.innerHTML  = "There " +
								((numCommunities > 1) ? "are" : "is") +
								"<span class='lotusBold'> " + 
								numCommunities +
								" similar " +
								((numCommunities > 1) ? "communities" : "community") +
								"</span> to the one you are about to create." 		
	} else {
		if(this.content)
			this.content.style.display = "none";
	}
		
},

viewComs: function () {
	var cuids = lconn.core.xpath.selectNodes("/ass:ResultSet/ass:results/ass:entry/ass:link/@communityID", this.data, sandConsts.NAME_SPACES);
	if (!this.dlg) {
		this.dlg = new lconn.sand.SimilarCommunities();
	}
	this.dlg.populate(cuids, this.members);
	this.dlg.show();
}	
});
