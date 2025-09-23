/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.palette.ChangeLayoutButton");

dojo.require("lconn.core.paletteOneUI.WidgetButton");

dojo.requireLocalization("lconn.core.palette", "ChangeLayoutButton");

dojo.declare(// widget name and class
"lconn.core.palette.ChangeLayoutButton", // superclass
 lconn.core.paletteOneUI.WidgetButton, // properties and methods
{
    // summary: Override WidgetButton to always hide "Added to your page" and "+" button
    
    templateString: null,    
    templatePath: dojo.moduleUrl("lconn.core", "palette/templates/ChangeLayoutButton.html"),

    defaultWidgetLabelNode : null,

    postCreate: function(){
       // summary: post create initialization
       this.inherited("postCreate", arguments);

       this._updateDefaultHint();
    },

    postMixInProperties: function() {
       this.inherited("postMixInProperties", arguments);
       var newResourceBundle = dojo.i18n.getLocalization("lconn.core.palette", "ChangeLayoutButton");
       dojo.mixin(this._resourceBundle, newResourceBundle);
    },

    disableButton: function(){
        if (this._isEnabled) {
            dojo.disconnect(this._onClickHandler);
            this._onClickHandler = null;
            
            dojo.addClass(this.titleContainerNode, "lotusAdded");
            // cannot use lotusHidden on this node because of lotusIcon override
            this.plusIconNode.style.display = "none";
            
            dojo.addClass(this.titleNode, "lotusHidden");
            dojo.removeClass(this.titleNodeAdded, "lotusHidden");
            dijit.focus(this.titleNodeAdded);
            this.titleNodeSpan.innerHTML = this.title;
            
            dojo.addClass(this.domNode, "lotusPaletteDisabledBtn");
            
            this._isEnabled = false;
        }
    },
    
    enableButton: function(){
        if (!this._isEnabled) {
            if (this._onClickHandler == null) {
                this._onClickHandler = dojo.connect(this.domNode, "onclick", this, "onClick");
            }
            
            dojo.addClass(this.titleNodeAdded, "lotusHidden");
            dojo.removeClass(this.titleNode, "lotusHidden");
            this.titleNode.innerHTML = this.title;
            
            dojo.removeClass(this.titleContainerNode, "lotusAdded");
            
            dojo.removeClass(this.domNode, "lotusPaletteDisabledBtn");
            
            this._isEnabled = true;
        }
    },
    
    _buildIconNode: function(/* String */imgUrl, /* String */ altText){
        // summary: build span/img nodes used to display the widget icon
        
        var spanNode = dojo.doc.createElement("span");
        var imgNode = dojo.doc.createElement("img");
        
        // no alt/title text. Img is just a decoration not carrying info.
        imgNode.src = imgUrl;
        imgNode.alt = altText;
        imgNode.title = altText;
        
        spanNode.appendChild(imgNode);
        
        if(dojo.isIE == 6){
           // Although setTimeout is set to run at 0 here, it actually waits 
           // until the browser finishes some other tasks before executing.
           // Problem was that image wasn't loaded in time before rendering.
           // This fix is only required for IE6.
           setTimeout(dojo.hitch(this, function(){
              this.widgetIconNode.appendChild(spanNode);
           }), 0);
        }else{
           // Just add normally
           this.widgetIconNode.appendChild(spanNode);
        }
    },
    
    _updateTitle: function(){
        if (this.widgetItem != null) {
            this.title = this.widgetItem.name[0];
            this.titleNode.innerHTML = this.widgetItem.name[0];
        }
        this.updateLabel();
    },
    
    _updateDescription: function(){
    	//gatekeeper: communities-new-widget-layouts
   	    var is_communities_new_widget_layouts = false;
   	    if ( typeof gatekeeperConfig != "undefined" && gatekeeperConfig['communities-new-widget-layouts'] )
   	 	    is_communities_new_widget_layouts = true;
        if ((this.widgetItem != null) && (this.widgetItem.desc != null)) {
           var widgetNameInDesc = this.widgetItem.desc[0];
           var desc = '';
           if (is_communities_new_widget_layouts) {
               if (this.widgetItem.isDefault && this.widgetItem.isDefault[0]) {
                   desc = string.substitute(this._resourceBundle['DEFAULT_LAYOUT_DESCRIPTION'], [widgetNameInDesc]);
               } else {
                  desc = string.substitute(this._resourceBundle['LAYOUT_DESCRIPTION'], [widgetNameInDesc]);
               }
           } else {
           	if (this.widgetItem.isDefault && this.widgetItem.isDefault[0]) {
                   desc = string.substitute(this._resourceBundle['DEFAULT_LAYOUT_DESC'], [widgetNameInDesc]);
                } else {
                   desc = string.substitute(this._resourceBundle['LAYOUT_DESC'], [widgetNameInDesc]);
                }
           }
           dojo.attr(this.domNode, "title", desc);
           dojo.attr(this.domNode, "alt", desc);
        }
    },

    _updateDefaultHint : function() {
       if ( this.widgetItem && this.widgetItem.isDefault ) {
          dojo.removeClass(this.defaultWidgetLabelNode, "lotusHidden");
       }
    },

    updateLabel: function(){
    	this.layoutAddedDescNode.innerHTML = this._resourceBundle.WIDGET_THIS_LAYOUT;
    	dijit.setWaiState(this.titleNodeAdded, "label", dojo.string.substitute(this._resourceBundle.WIDGET_LAYOUT_ADDED,[this.title]));
    },
    
    onClick: function(evt){
        if (!this._addingWidget) {
            this._addingWidget = true;
            try {
               if (this.widgetItem != null) {
                  dojo.publish(this.ADD_WIDGET_EVENT, [this.widgetItem]);
               }
            } catch (e) { 
               /* ignore */               
            } finally {
               // show that the widget has been added, without disabling the button for now	
               this._addingWidget = false;
            }
        }
    }
});
