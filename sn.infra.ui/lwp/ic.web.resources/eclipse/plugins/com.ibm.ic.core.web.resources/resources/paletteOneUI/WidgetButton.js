define([
	"dojo",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/_base/window",
	"dojo/i18n!ic-core/paletteOneUI/nls/WidgetButton",
	"dojo/on",
	"dojo/parser",
	"dojo/string",
	"dojo/text!ic-core/paletteOneUI/templates/WidgetButton.html",
	"dojo/topic",
	"dijit/_Contained",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/locale"
], function (dojo, domAttr, declare, i18n, lang, domClass, windowModule, i18nWidgetButton, on, parser, string, template, topic, _Contained, _Templated, _Widget, locale) {

	/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
	
	// FIXME: in Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
	// The paletteOneUI code makes the assumption that properties are scalar values. This code must
	// be entirely refactored.
	
	/**
	 * Button widget for the widget palette
	 * @class ic-core.paletteOneUI.WidgetButton
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 * @extends dijit._Contained
	 */
	var WidgetButton = declare(// widget name and class
	"lconn.core.paletteOneUI.WidgetButton", // superclass
	 [_Widget, _Templated, _Contained], // properties and methods
	 /** @lends ic-core.paletteOneUI.WidgetButton.prototype */
	{
	   // summary: Dojo widget representing a widget button in the palette, following OneUI design
	
	   // widgetItem: dojo.data.Item
	   //     item associated to this button. Used to build markup and published when clicked
	   widgetItem: null,
	
	   // widgetIconNode: DOMNode
	   //     dojo attach point
	   widgetIconNode: null,
	
	   // ADD_WIDGET_EVENT: Const String
	   //     Name of the event published when the use clicks the "Add Widget to Page" button
	   ADD_WIDGET_EVENT: "/ic-core/palette/addWidget",
	
	   // _onClickHandler: handler returned by dojo.connect
	   //      Used to disconnect from the onclick event
	   _onClickHandler: null,
	
	   // _onKeyDownHandler: handler returned by dojo.connect
	   //      Used to disconnect from the onkeydown event
	   _onKeyDownHandler: null,
	
	   // initialStatus: Boolean
	   //     Whether the button is initially enabled (true)
	   initialStatus: null,
	
	   plusIconNode: null,
	   titleNodeSpan: null,
	   titleContainerNode: null,
	
	   // title: String
	   //     Widget title currently displayed
	   title: null,
	
	   // _addingWidget: Boolean
	   //     Used to ignore fast clicks on the button
	   _addingWidget: false,
	
	   // _isEnabled: Boolean
	   //     Current status of the button
	   _isEnabled: false,
	
	   _resourceBundle: null,
	
	   templateString: template,
	
	   postCreate: function(){
	      // summary: post create initialization
	      this.inherited("postCreate", arguments);
	
	      if ((this.widgetItem != null) && (typeof this.widgetItem.iconUrl != "undefined") && (typeof this.widgetItem.iconUrl[0] != "undefined")) {
	    	  // if current widget is layout widget
	    	  if((typeof this.widgetItem.widgetType != "undefined") && (typeof this.widgetItem.widgetType[0] != "undefined") && (this.widgetItem.widgetType[0] == "layout")){
	    		  this._buildIconNode(this.widgetItem.iconUrl, this.widgetItem.iconAlt);
	    	  }
	    	  else
	              this._buildIconNode(this.widgetItem.iconUrl, this._resourceBundle.ICON_ALT);
	      }
	
	      this._updateTitle();
	      this._updateDescription();
	
	      this._isEnabled = !this.initialStatus;
	
	      if (this.initialStatus) {
	         this.enableButton();
	      }
	      else {
	         this.disableButton();
	      }
	   },
	
	   postMixInProperties: function(){
	      this._resourceBundle = i18nWidgetButton;
	   },
	
	   disableButton: function(){
	      if (this._isEnabled) {
	         if (this._onClickHandler) {
	            this._onClickHandler.remove();
	            this._onClickHandler = null;
	         }

	         if (this._onKeyDownHandler) {
	            this._onKeyDownHandler.remove();
	            this._onKeyDownHandler = null;
	         }
	
	         domClass.add(this.titleContainerNode, "lotusAdded");
	
	         // FIXME: remove references to defects from sources
	         // SPR DMCE843T89
	         domClass.add(this.titleContainerNode, "lotusDisabled");
	
	         // FIXME: what?
	         // cannot use lotusHidden on this node because of lotusIcon override
	         this.plusIconNode.style.display = "none";
	
	         domClass.add(this.titleNode, "lotusHidden");
	         domClass.remove(this.titleNodeSpan, "lotusHidden");
	
	         var addedTitle = string.substitute(this._resourceBundle.WIDGET_ADDED, [this.title]);
	         this.titleNodeSpan.innerHTML = addedTitle;
	
	         domClass.add(this.domNode, "lotusPaletteDisabledBtn");
	
	         // Change the aria-label so the widget is spoken as added. Also mark as disabled as the
	         // user can't click on it.
	         domAttr.set(this.domNode, "aria-label", addedTitle);
	         domAttr.set(this.domNode, "aria-disabled", "true");
	
	         this._isEnabled = false;
	      }
	   },
	
	   enableButton: function(opt){
	      var canHaveMultiple = (opt && opt.canHaveMultiple);
	      if (!this._isEnabled || canHaveMultiple) {
	         if (this._onClickHandler == null) {
	            this._onClickHandler = on(this.domNode, "click", lang.hitch(this, "onClick"));
	         }
	
	         if (this._onKeyDownHandler == null) {
	            this._onKeyDownHandler = on(this.domNode, "keydown", lang.hitch(this, "onKeyDown"));
	         }
	
	         this.plusIconNode.style.display = "";
	
	         //remove the message "{widget} add", only for the widgets that NOT allow multiple instances
	         if (!this._isEnabled) {
	            domClass.add(this.titleNodeSpan, "lotusHidden");
	            domClass.remove(this.titleNode, "lotusHidden");
	
	            domClass.remove(this.titleContainerNode, "lotusDisabled");
	
	            this.titleNode.innerHTML = this.title;
	
	            domClass.remove(this.titleContainerNode, "lotusAdded");
	
	            domClass.remove(this.domNode, "lotusPaletteDisabledBtn");
	         }
	         
	         //add the message "{widget} add", only widgets that allow multiple instances will go here
	         if(opt && opt.showMsg){
	            domClass.add(this.titleContainerNode, "lotusAdded");
	            domClass.add(this.titleNode, "lotusHidden");
	            domClass.remove(this.titleNodeSpan, "lotusHidden");
	            
	            var addedTitle = string.substitute(this._resourceBundle.WIDGET_ADDED,[this.title]);
	            this.titleNodeSpan.innerHTML = addedTitle;
	         }
	
	         this._isEnabled = true;
	      }
	   },
	
	   _buildIconNode: function(/* String */imgUrl, /* String */ altText){
	      // summary: build span/img nodes used to display the widget icon
	
	      var spanNode = windowModule.doc.createElement("span");
	      var imgNode = windowModule.doc.createElement("img");
	      
	      // In Dojo 1.3, properties of DataStore items are no longer scalar values, but arrays.
	      // This property needs a forced cast to string in IE9 
	      domAttr.set(imgNode, "src", imgUrl.toString());
	      // To comply with RPT: For decorative images that should be ignored 
	      // by assistive technologies, image alt text must be set to the 
	      // empty string, and no title attribute must be specified.
	      domAttr.set(imgNode, "alt", "");
	
	      spanNode.appendChild(imgNode);
	      this.widgetIconNode.appendChild(spanNode);
	   },
	
	   _updateTitle: function(){
	      if (this.widgetItem != null) {
	         this.title = this.widgetItem.name[0];
	
	         this.titleNode.innerHTML = this.title;
	         domAttr.set(this.titleNode, "title", this.widgetItem.desc[0]);
	       
	         var addedTitle = string.substitute(this._resourceBundle.WIDGET_ADDED, [this.title]);
	         domAttr.set(this.titleNodeSpan, "title", addedTitle);
	         //dojo.attr(this.titleNodeSpan, "alt", this.title);
	       
	         var ariaLabel = string.substitute(this._resourceBundle.ADD_INFO_2, [this.title]);
	         domAttr.set(this.domNode, "aria-label", ariaLabel);
	      }
	   },
	
	   /**
	    * FIXME: if no longer used, remove
	    * No longer used. CSS styling in use instead (text-overflow: ellipsis).
	    */
	   _cropTitle: function(title){
	      var displayedTitle = "";
	
	      var maxChar;
	      // SPR TSOE7THBSV - Japonese chars are wider
	      if (locale.getLanguage() === "ja"){
	         maxChar = 9;
	      } else {
	         maxChar = 20;
	      }
	
	      // crop to 20 chars
	      if (title != null && title.length > maxChar) {
	         // 18 + 3 = 21 but dots are narrower so we can display one more char...
	         displayedTitle = title.substr(0, maxChar-2);
	         displayedTitle += "...";
	      }
	      else {
	         displayedTitle = title;
	      }
	      
	      return displayedTitle;
	   },
	
	   _updateDescription: function(){
	      if ((this.widgetItem != null) && (this.widgetItem.desc != null)) {
	         domAttr.set(this.domNode, "title", this.widgetItem.desc[0]);
	      }
	   },
	
	   onKeyDown: function(evt) {
	      var key = evt && ( evt.keyCode || evt.which );
	      if ( key === 13 || key === 32 ) { // response to Enter or Space
	         this.onClick();
	      }
	   },
	
	   onClick: function(evt){
	      if (!this._addingWidget) {
	         this._addingWidget = true;
	         try {
	            if (this.widgetItem != null) {
	               topic.publish(this.ADD_WIDGET_EVENT, this.widgetItem);
	               // show that the widget has been added, without disabling the button for now
	               domClass.remove(this.titleContainerNode, "lotusDisabled");
	               domClass.add(this.titleContainerNode, "lotusAdded");
	            }
	         }
	         catch (e) {
	            // ignore
	         }
	         finally {
	            this._addingWidget = false;
	         }
	      }
	   }
	});
	
	return WidgetButton;
});
