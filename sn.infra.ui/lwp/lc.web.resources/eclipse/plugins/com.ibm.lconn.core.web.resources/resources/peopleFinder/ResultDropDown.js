/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.peopleFinder.ResultDropDown");

dojo.require("dijit.TooltipDialog");
dojo.require("com.ibm.social.personcard.widget.PersonWidget");

dojo.require("dojo.i18n");
dojo.requireLocalization("lconn.core.peopleFinder", "ResultDropDown");

/**
 * This class will manage the rendering of People Finder results using a drop down tooltip.
 * 
 * @class lconn.core.peopleFinder.ResultDropDown
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.peopleFinder.ResultDropDown",
	[dijit.TooltipDialog], /** @lends lconn.core.peopleFinder.ResultDropDown.prototype */
{
	/**
	 * To override default drop down tooltip width (in pixels).
	 * 
	 * @default [300]
	 * @type {Number}
	 */
	width: 300,
	
	/**
	 * To customize no results message.
	 * 
	 * @type {String}
	 */
	PF_NO_RESULTS_MESSAGE: "",
	
	/**
	 * If false the no results message wont be shown.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	showNoResultsMessage: true,
	
	/**
	 * To set the drop down tooltip orientation based on dijit.popup orient property.
	 * 
	 * @see dijit.popup
	 */
	orientation: null,
	
	/**
	 * If true the person graphic will change based on the confidence.
	 * 
	 * @default [true]
	 * @type {Boolean}
	 */
	useConfidence: true,
	
	resultContainer: null,
	noResultsNode: null,
	createdWidgets: null,
	selectionArray: null,
	/**
	 * Represent the current selected item from the results list.
	 * 
	 * @readonly
	 * @type {com.ibm.social.personcard.widget.PersonWidget}
	 */
	selectedElement: null,
	
	_doNotDisplay: false,
	
	postMixInProperties: function(){
		var strings = dojo.i18n.getLocalization("lconn.core.peopleFinder", "ResultDropDown");
		if(!this.PF_NO_RESULTS_MESSAGE) {
			this.PF_NO_RESULTS_MESSAGE = strings.PF_NO_RESULTS_MESSAGE;
		}
		this.inherited(arguments);
	},
	
	buildRendering: function() {
		this.createdWidgets = [];
		this.selectionArray = [];
		
		var container = document.createElement("div");
		container.style.width = this.width + "px";
		container.style.border = "0px";
		dojo.addClass(container, "icSearchResults");
		
		this.resultContainer = document.createElement("div");
		dojo.addClass(this.resultContainer, "pfDirectoryResults");
		dojo.addClass(this.resultContainer, "lconnSearchHighlight");
		
		this.noResultsNode = document.createElement("div");
		this.noResultsNode.style.padding = "5px 10px";
		dojo.addClass(this.noResultsNode, "lotusHidden");
		this.noResultsNode.innerHTML = this.PF_NO_RESULTS_MESSAGE;
		
		container.appendChild(this.resultContainer);
		container.appendChild(this.noResultsNode);
		
		this.content = container;
		this.inherited(arguments);
	},
	
	startup: function() {
		this.containerNode.style.padding = "0px";
		this.containerNode.setAttribute("role", "listbox");
		this.containerNode.setAttribute("wairole", "listbox");
		this.containerNode.setAttribute("aria-live", "polite");
	},
	
	destroy: function() {
		dijit.popup.close(this);
		this._cleanAll();
		this.inherited(arguments);
	},
	
	showResults: function(parent, node) {
		if(this._doNotDisplay) {
			return;
		}
		
		var args = {
			parent: parent,
			popup: this,
			around: node,
			onClose: dojo.hitch(this, "_removeScrollbarFix")
		};
		if(this.orientation) {
			args.orient = this.orientation;
		}
		
		dijit.popup.open(args);
		this._addScrollbarFix();
	},
	
	closeResults: function() {
		dijit.popup.close(this);
	},
	
	_addScrollbarFix: function() {
		if(this.domNode.parentElement) {
			dojo.addClass(this.domNode.parentElement, "pfScrollbarFix");
		}
	},
	
	_removeScrollbarFix: function() {
		if(this.domNode.parentElement) {
			dojo.removeClass(this.domNode.parentElement, "pfScrollbarFix");
		}
	},
	
	_cleanAll: function() {
		//remove all element in resultContainer
		this.resultContainer.innerHTML = "";
		
		if (this.createdWidgets) {
			for (var i=this.createdWidgets.length-1; i>=0; i--) {
				this.createdWidgets[i].destroyRecursive();
			}
		}
		
		this.createdWidgets = [];
		this.selectionArray = [];
		
		if(this.noResultsNode) {
			dojo.addClass(this.noResultsNode, "lotusHidden");
		}
	},
	
	setResults: function(data) {
		this._cleanAll();
		
		if(!data || !data.data) {
			this.closeResults();
			return;
		}
		data = data.data;
		
		this._insertElements(data);
		
		this._prepareSelectionArray();
		
		this._selectElement(this.selectionArray[0]);
		
		if(data.length == 0 && this.showNoResultsMessage && this.noResultsNode) {
			dojo.removeClass(this.noResultsNode, "lotusHidden");
		}
	},
	
	_insertElements: function(elements) {
		
		for(var i=0; i<elements.length; i++) {
			var entryWidget = new com.ibm.social.personcard.widget.PersonWidget({
				userId: (elements[i].id ? elements[i].id : ""),
				displayName: (elements[i].name ? elements[i].name : ""),
				preferredName: (elements[i].preferredFirstName ? elements[i].preferredFirstName : ""),
				givenNames: (elements[i].givenNames ? elements[i].givenNames : null),
				jobResponsibility: (elements[i].jobResponsibility ? elements[i].jobResponsibility : ""),
				mail: (elements[i].email ? elements[i].email : ""),
				address: (elements[i].city ? elements[i].city : "") + (elements[i].city && elements[i].country ? ", " : "") + (elements[i].country ? elements[i].country : ""),
				phone: (elements[i].workPhone ? elements[i].workPhone : ""),
				tags: (elements[i].confidence && elements[i].confidence == "high" ? elements[i].tag : null),	//because sometimes it can return tags even if it's not high
				compact: true,
				confidence: this.useConfidence ? elements[i].confidence : "low"
			});
			entryWidget.startup();
			this.createdWidgets.push(entryWidget);
			entryWidget.domNode.setAttribute("role", "option");
			entryWidget.domNode.setAttribute("aria-describedby", this.id + "_entryAria");
			dojo.addClass(entryWidget.domNode, "pfEntry");
			this.connect(entryWidget.domNode, "onclick", dojo.hitch(this, "entrySelected", entryWidget));
			this.connect(entryWidget.domNode, "onmouseover", dojo.hitch(this, "onMouseOver", entryWidget.domNode));
			this.selectionArray.push(entryWidget.domNode);
			
			this.resultContainer.appendChild(entryWidget.domNode);
		}
	},
	
	_prepareSelectionArray: function() {
		for(var i=0; i < this.selectionArray.length; i++) {
			var element = this.selectionArray[i];
			element.setAttribute("aria-posinset", i+1);
			element.setAttribute("aria-setsize", this.selectionArray.length);
			
			if(!element.id) {
				element.setAttribute("id", this.id + "_option_" + i);
			}
		}
	},
	
	selectNextElement: function() {
		if(!this.selectedElement) {
			return;
		}
		var index = dojo.indexOf(this.selectionArray, this.selectedElement);
		var nextIndex = (this.selectionArray.length-1 > index && index >= 0) ? index + 1 : 0;
		this._selectElement(this.selectionArray[nextIndex]);
	},
	
	selectPreviousElement: function() {
		if(!this.selectedElement) {
			return;
		}
		var index = dojo.indexOf(this.selectionArray, this.selectedElement);
		var prevIndex = (this.selectionArray.length-1 >= index && index > 0) ? index - 1 : this.selectionArray.length - 1;
		this._selectElement(this.selectionArray[prevIndex]);
	},
	
	executeSelectedAction: function() {
		if(!this.selectedElement) {
			return;
		} else {
			this.selectedElement.click();
		}
		
		this._doNotDisplay = true;
		this.closeResults();
		setTimeout(dojo.hitch(this, function() {
			this._doNotDisplay = false;
		}), 500);
	},
	
	_selectElement: function(element) {
		if(this.selectedElement) {
			dojo.removeClass(this.selectedElement, "pfSelected");
			dijit.setWaiState(this.selectedElement, "selected", "false");
		}
		if(!element) {
			return;
		}
		this.selectedElement = element;
		dojo.addClass(this.selectedElement, "pfSelected");
		dijit.setWaiState(this.selectedElement, "selected", "true");
		
		setTimeout(dojo.hitch(this, "onActiveDescendantChanged", element.id), 1);
	},
	
	onMouseOver: function(element, evt) {
		dojo.stopEvent(evt);
		this._selectElement(element);
	},
	
	entrySelected: function(entry, evt) {
		dojo.stopEvent(evt);
		var person = {};
		person.displayName = entry.displayNameEscaped;
		person.userId = entry.userId;
		person.mail = entry.mail;
		//TODO add more properties?
		
		this.onPersonSelected(person);
		this.closeResults();
	},
	
	/**
	 * Method to be overriden or connected to by the subclass.
	 * Called when an entry in the drop down tooltip is selected.
	 * 
	 * @abstract
	 * @param {{displayName: String, userId: String, mail: String}} person
	 */
	onPersonSelected: function(person) {
		//Callback - nothing here
	},
	
	/**
	 * Method to be overriden or connected to by the subclass.
	 * Called when the aria-activedescendant property should be changed.
	 * 
	 * @abstract
	 * @param {String} id
	 */
	onActiveDescendantChanged: function(id) {
		//Callback - nothing here
	}
});
