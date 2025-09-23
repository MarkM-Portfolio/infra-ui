/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.Subject"); 

dojo.require("lconn.sand.sandConsts");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.util.html");

dojo.requireLocalization("lconn.sand", "ui");

dojo.declare("lconn.sand.Subject", 
		[dijit._Widget, dijit._Templated],  
		{
	templateString: "",
	templatePath: dojo.moduleUrl("lconn.sand","templates/Subject.html"),
	widgetsInTemplate: true,
	_blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),

	// how many to show in subject, when expanded
	itemsNum: null,
	itemsNumDefault: 15, 
	// how many (max) to show when hit "show all/more" (even if XML offers more)
	itemNumsMax: 20, 
	itemTitleLengthMax: 20,
	titleString: null,
	
	itemPrefix: '<li class="lotusBorderBottom">',
	itemSuffix: "</li>",
	itemSeperator: "",
	twistySymbol_Closed: "&gt;",
	twistySymbol_Opened: "v",
	
	lcSandStrings: null,
	KEY_ENTER: 0x0D,
	
	postCreate: function() {
		this.lcSandStrings = dojo.i18n.getLocalization("lconn.sand", "ui");
		
		dojo.connect(this.twistyArea, "onclick", dojo.hitch(this, "toggle"));
		dojo.attr(this.twistySymbol, "innerHTML", this.twistySymbol_Closed);
		dojo.attr(this.twistyArea,"title",this.lcSandStrings.sand_ExpandSection);
	},
		
	setSubject: function (titleString, items, displayFullSubject) {
		var bDisplayFullSubject = false;
		if( typeof(displayFullSubject) != "undefined") bDisplayFullSubject = (displayFullSubject == true);
		
		// read different prefix/suffix (i.e. for Tags)
		if (items.itemPrefix != null &&	
			items.itemSuffix != null) {
			this.itemPrefix = items.itemPrefix;
			this.itemSuffix = items.itemSuffix;
		}
		if (items.itemSeperator != null) {
			this.itemSeperator = items.itemSeperator;
		}
			
		this.xmlData = items.xmlData;
		
		this.xmlDataSubset = lconn.core.xpath.selectNodes(
				"/atom:feed/atom:entry/atom:category[@term='"+ items.typeString +"']",
				this.xmlData, 
				sandConsts.NAME_SPACES);
		
		
		
		// how many items in this subject
		this.itemsNum = this.xmlDataSubset.length;
		
		// adjust IDs to fit LC widget twisty styles:
		if (this.itemsNum > 1) {
			this.titleString = titleString[1];
		} else {
			this.titleString = titleString[0];
		}
		
		dojo.attr(this.subjectArea,"id",this.titleString + "Area");
		dojo.attr(this.subjectItemsArea,"id",this.titleString + "SubArea");
		dojo.attr(this.subjectItems,"id",this.titleString + "SubItems");
	
		dojo.attr(this.twistyTitle,"innerHTML",this.titleString + "&nbsp;(" + this.itemsNum.toString() + ")");
		
		// set subject's items
		var itemsHTML = "";
		this.subjectItems.innerHTML = "";
		
		for (var i=0; i < this.itemsNum; i++) {
			
			var itemLink = null;
			// if a link exists
			if (lconn.core.xpath.selectSingleNode("../atom:link", 
							this.xmlData, 
							sandConsts.NAME_SPACES, 
							this.xmlDataSubset[i])) {
				// attach link to title
				itemLink = lconn.core.xpath.selectSingleNode("../atom:link", 
							this.xmlData, 
							sandConsts.NAME_SPACES, 
							this.xmlDataSubset[i]).getAttribute("href");
			}
			
			
			var itemTitle = "";
			try {
				if (dojo.isEdge) {
					itemTitle = lconn.core.xpath.selectSingleNode("../atom:title", 
														this.xmlData, 
														sandConsts.NAME_SPACES, 
														this.xmlDataSubset[i]).childNodes[0].wholeText;
				} else {
					itemTitle = lconn.core.xpath.selectSingleNode("../atom:title/text()", 
														this.xmlData, 
														sandConsts.NAME_SPACES, 
														this.xmlDataSubset[i]).nodeValue;
				}
			} catch (e) {

			}
			
			var itemTitleAttr = lconn.core.util.html.encodeHtmlAttribute(itemTitle);
			itemTitle = lconn.core.util.html.encodeHtml(itemTitle);
			
			if (itemLink) {
				// display a linked item
				itemsHTML = 
					this.itemPrefix + 
					"<a href=\"" + itemLink +  
					"\" title=\"" + itemTitleAttr +"\">" +
					(bDisplayFullSubject? itemTitle : this.shortenString(itemTitle, this.itemTitleLengthMax)) +
					"</a>" +
					this.itemSuffix; 
			} else {
				// just display the title of the item
				itemsHTML = 
					this.itemPrefix + 
					"<span role=\"presentation\" title=\""+ itemTitleAttr +"\">" + 
					(bDisplayFullSubject? itemTitle : this.shortenString(itemTitle, this.itemTitleLengthMax)) +
					"</span>" +
					this.itemSuffix;
			}
			
			// + seperator, if not last item
			if (i!=(this.itemsNum-1) && i!=(this.itemsNumDefault-1)) {
				itemsHTML += 
					this.itemSeperator;// + "\n"; // "e.g. ", "
			} //else itemsHTML += "\n";		
			
			//strip out any role=group where there is no aria label
			var stripEmptyRoleGroup_ = function(el) {
				try {
					dojo.query("*[role='group']", el).forEach(function(node) {
						if (!dojo.hasAttr(node, "aria-label") && !dojo.hasAttr(node, "aria-labelledby")) {
							dojo.removeAttr(node, "role");
						}
					});
				} catch (e) {}
			};
			
			// choose where to add this item (initial/rest)
			if (i < this.itemsNumDefault || 
				(this.itemsNum == (this.itemsNumDefault+1)) 
				// if only 1 over max, show it (instead of "more" link)
				) {
				// add to initially expanded list
				this.subjectItems.innerHTML += itemsHTML;
				stripEmptyRoleGroup_(this.subjectItems);
			} else {
				// add to expanded list
				this.restSubjectItems.innerHTML += itemsHTML;
				stripEmptyRoleGroup_(this.restSubjectItems);
			}
			
			//console.log ("itemsHTML "+ i + ": " + itemsHTML);
		} // end of for...next on all item nodes.
		
		// add restLink + restDiv (hidden)
		if (this.restSubjectItems.innerHTML.length > 0) {
			
			var theRestLink = dojo.create("li", {
				"id": this.id + "restLink",
				"class": "lotusTiny"
			}, this.subjectItems);
			dojo.create("a",{
				"href": "javascript:;",
				"innerHTML": dojo.string.substitute(this.lcSandStrings.sand_More, {restItemsNum: (this.itemsNum - this.itemsNumDefault)})
			}, theRestLink);
			dojo.connect(theRestLink, "onclick", dojo.hitch(this, "_showRestItems"));
			
			// add seperator between default to rest items
			if (this.itemSeperator != "") {
				this.restSubjectItems.innerHTML = 
					this.itemSeperator + this.restSubjectItems.innerHTML;
			}
		}

		
		//add classes to first and last li element
		if(this.restSubjectItems.children.length > 1) {
			this.restSubjectItems.children[0].className += " lotusFirst";
		}
		if(this.restSubjectItems.children.length > 0) {
			var length = this.restSubjectItems.children.length - 1;
			this.restSubjectItems.children[length].className += " lotusLast";
		}
		
		if(this.subjectItems.children.length > 1) {
			this.subjectItems.children[0].className += " lotusFirst";
		}
		if(this.subjectItems.children.length > 0) {
			var length = this.subjectItems.children.length - 1;
			this.subjectItems.children[length].className += " lotusLast";
		}
	},
	
	toggle: function () {
		setTimeout(dojo.hitch(this, this._toggleTwisty));
	},
	
	isCollapsed: function() {
		return dojo.hasClass(this.twistyImg, "lotusTwistyClosed");
	},
	
	_toggleTwisty: function() {			
		if (this.isCollapsed()) {
			dojo.style(this.subjectItemsArea,"display","");
			dojo.removeClass(this.twistyImg, "lotusTwistyClosed");
			dojo.addClass(this.twistyImg, "lotusTwistyOpen");
			dojo.attr(this.twisty, "aria-expanded", "true");
			this.twisty.removeChild(this.twistySymbol);
			this.twistySymbol.innerHTML = this.twistySymbol_Opened;
			this.twisty.insertBefore(this.twistySymbol, this.twistyImg);
			dojo.attr(this.twisty, "title", this.lcSandStrings.sand_CollapseSection);
		} else {		
			dojo.style(this.subjectItemsArea,"display","none");
			dojo.removeClass(this.twistyImg, "lotusTwistyOpen");
			dojo.addClass(this.twistyImg, "lotusTwistyClosed");
			dojo.attr(this.twisty, "aria-expanded", "false");
			this.twisty.removeChild(this.twistySymbol);
			this.twistySymbol.innerHTML = this.twistySymbol_Closed;
			this.twisty.insertBefore(this.twistySymbol, this.twistyImg);
			dojo.attr(this.twisty, "title", this.lcSandStrings.sand_ExpandSection);
		}
	},	
	
	_showRestItems: function() {
		dojo.style(this.id+"restLink","display","none");
		dojo.style(this.subjectItems,"margin-bottom","0px");
		dojo.style(this.restSubjectItems,"display","");
	},
	
	shortenString: function (stringToShorten, maxLength) {
		if (stringToShorten.length > maxLength)
			return (stringToShorten.substr(0, maxLength) + "...");
		else 
			return stringToShorten;
	}

});
