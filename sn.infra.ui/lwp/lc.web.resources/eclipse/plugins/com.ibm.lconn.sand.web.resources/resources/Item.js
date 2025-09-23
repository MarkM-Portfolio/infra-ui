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

dojo.provide("lconn.sand.Item"); 
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.sand.PersistTooltip");
dojo.require("lconn.sand.sandConsts");

window.ICONS = [];
window.ICONS["Document"] = "../../../images/icon-logo-dogear.gif";
window.ICONS["Document/Blog"] = "../../../images/icon-logo-blogs.gif";
window.ICONS["Document/ForumThread"] = "../../../images/icon-logo-forum.gif";
window.ICONS["Document/File"] = "../../../images/icon-logo-files.gif";
window.ICONS["Document/Wiki"] = "../../../images/icon-logo-wiki.gif";
window.ICONS["Group/Community"] = "../../../images/icon-logo-communities.gif";
window.ICONS["Group/Activity"] = "../../../images/icon-logo-activities.gif";

window.ALTS = [];
window.ALTS["Document"] = "Bookmark";
window.ALTS["Document/Blog"] = "Blog";
window.ALTS["Document/ForumThread"] = "Forum thread";
window.ALTS["Document/File"] = "File";
window.ALTS["Document/Wiki"] = "Wiki";
window.ALTS["Group/Community"] = "Community";
window.ALTS["Group/Activity"] = "Activity";

window.ASSOCS = [];
window.ASSOCS["Document"] = ["tagger"];
window.ASSOCS["Document/Blog"] = ["author", "commenter", "tagger"];
window.ASSOCS["Document/ForumThread"] = ["author", "commenter", "tagger"];
window.ASSOCS["Document/File"] = ["author", "commenter", "tagger"];
window.ASSOCS["Document/Wiki"] = ["author", "tagger"];
window.ASSOCS["Group/Community"] = ["author", "member", "tagger"];
window.ASSOCS["Group/Activity"] = ["author", "member", "tagger"];

window.ASSOC_STRS = [];
window.ASSOC_STRS["tagger"] = "tagged";
window.ASSOC_STRS["author"] = "authored";
window.ASSOC_STRS["commenter"] = "commented";
window.ASSOC_STRS["member"] = "are members";

dojo.declare("lconn.sand.Item", 
		[dijit._Widget, dijit._Templated],  
		{
			templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
			templatePath: dojo.moduleUrl("lconn.sand","templates/Item.html"),
			widgetsInTemplate: true,
						
			titleText: null, //  Title
			titleLink: null, //  Link
			
			evMembersId: null,
			evTagsId: null,
			evMax: 25,
			
			xmlPosition: null,
			
			constructor: function () {

				this.data = null;
				this.connections = new Array(); // .connect references for .disconnect
				this.tags = null; 
				this.people = null; 
				
				this.toolTip_prefix = "<div id=\"popupHelp\" class=\"lotusHelp\" style=\"width:135px;position:relative; top:-1px; left:-1px; margin-bottom:-2px; margin-right:-2px; font-size:0.85em;\"><div class=\"lotusInfoBox\">";
				this.toolTip_suffix = "</div></div>";
			},

			populate: function (data, allData, showIcon, userTags) {

				this.data = data;
				this.allData = allData;
				this.showIcon = showIcon;
				
				this.type =
					lconn.core.xpath.selectSingleNode("ass:category[@scheme='http://www.ibm.com/xmlns/prod/sn/doctype']/@term", 
							this.allData, 
							sandConsts.NAME_SPACES, this.data).nodeValue;
					
				this.computePeopleAssocs();
				this.computeTagsAssocs(userTags);
								
				this.setTitle();
				
				if (this.showIcon) {
					this.setIcon();
				}
								
				this.setRemove();	
			}, 
			
			computePeopleAssocs: function () {
				var assocs = window.ASSOCS[this.type];
				if(assocs != null)
				for (var i=0, len = assocs.length; i < len && (!this.people || this.people.length == 0); i++) {  
					this.people =
						lconn.core.xpath.selectNodes("ass:contributor/ass:associations[ass:association='" + assocs[i]+"'] | ass:author/ass:associations[ass:association='"+assocs[i]+"']",
													  this.allData,sandConsts.NAME_SPACES,this.data);
					if (this.people) {
						this.assoc = assocs[i];
					}				
				}
				for (var i=0; this.people != null && i < this.people.length; i++) {
					this.people[i]=lconn.core.xpath.selectSingleNode("../ass:name/text()",this.allData,sandConsts.NAME_SPACES,this.people[i]).nodeValue;				
				}
			},
			
			computeTagsAssocs: function (userTags) {
				this.tags = [];
				var tagInd = 0;
				var tagNodes = 
						lconn.core.xpath.selectNodes("ass:category/@escValue",
							this.allData, sandConsts.NAME_SPACES, this.data);
				for (var i = 0; i < tagNodes.length; i++) {
					var tag = tagNodes[i].nodeValue;
					if (userTags[tag]) {
						this.tags[tagInd++] = tag;
					}
				}
			},
			
			destroy: function() {
				// clear connections:
				dojo.disconnect(this.connections["remove"]);
				this.connections.pop();
				
				// cont.
				this.inherited(arguments);
			},
			
			setTitle: function() {
				// set Title
				this.titleLink = 
					lconn.core.xpath.selectSingleNode("ass:link/@href", 
							this.allData, 
							sandConsts.NAME_SPACES, this.data).nodeValue;
				
				var titleNode =
					lconn.core.xpath.selectSingleNode("ass:title/text()", 
							this.allData, 
							sandConsts.NAME_SPACES, this.data);
				if (titleNode) {
					this.titleText = titleNode.nodeValue;
				} else {
					this.titleText = this.titleLink;
				}

				this.itemTitle.innerHTML = "<a target=\"_blank\" href=\"" + this.titleLink + "\">" + this.titleText + "</a>";
			},
			
			setIcon: function() {
				var uri = window.ICONS[this.type];
				this.itemIcon.style.display = "none";
				if(uri) {
					this.itemIcon.style.display = "";
					this.itemIcon.src = dojo.moduleUrl("lconn.sand", uri);
					this.itemIcon.title = window.ALTS[this.type];						
				}				
			},
			
			setRemove: function() {
							
				this.connections["remove"] = dojo.connect(this.itemRemove, "onclick", this, "removeRecommendation");
			},
			
			removeRecommendation: function () {
				
				dojo.publish("requestToRemoveRecommendation", [this]);
			},
			
			setEvidence: function() {
				
				this.itemEvidence.innerHTML = "";
				var evMembers = "";
				var evTags = "";
				
				if (this.people != null && this.people.length > 0) {
					
					this.evMembersId = this.domNode.id + "_members";
					
					evMembers = 
						"<a id=\""+ this.evMembersId +"\" href=\"javascript:;\">" + 
						this.people.length + 
						" contact" + (this.people.length>1 ? "s" : "") + 
						"</a> " + window.ASSOC_STRS[this.assoc] + "<br/>";
					
					this.itemEvidence.innerHTML += evMembers;
				}
				
				if (this.tags.length > 0) {
					
					this.evTagsId = this.domNode.id + "_tags";
					
					var evTags = "<a id=\""+ this.evTagsId +"\" href=\"javascript:;\">" + 
						this.tags.length + 
						" tag" + (this.tags.length>1 ? "s" : "") +
						"</a> in common<br/>";
						
					this.itemEvidence.innerHTML += evTags;
					
				}
				setTimeout(dojo.hitch(this, this.startup), 0);
				
			},
					
			evLoad: function(nodeList, seperator) {
			
				var evString = "";
				for (var i=0, len = Math.min(nodeList.length, this.evMax); i < len; i++) {
					evString += nodeList[i];
					// don't show seperator after last item
					if (i < len-1) {
						evString += seperator;
					}					
				}
				// limit number of evidence in popup
				if (nodeList.length > this.evMax) {
					evString += " and " + (nodeList.length - this.evMax)+ " more";
				}
				
				return evString;
				
			},
			
			
			startup: function() {
				this.inherited("startup", arguments);
				
				if (this.evMembersId != null) {
					var ttPeople = 
							new lconn.sand.PersistTooltip(
								{label: this.toolTip_prefix + 
										this.evLoad(this.people, "<br />") + 
										this.toolTip_suffix, 
								connectId: [this.evMembersId]});
					
					ttPeople.startup();	
				}
				
				if (this.evTagsId != null) {
					var ttTags = 
							new lconn.sand.PersistTooltip(
								{label:	this.toolTip_prefix + 
										this.evLoad(this.tags, ", ") +
										this.toolTip_suffix, 
								connectId: [this.evTagsId]});
									
					ttTags.startup();
				}
				
				
			}

		});
