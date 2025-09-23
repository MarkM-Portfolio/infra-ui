/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
      'dojo/_base/declare',
      'dojo/_base/lang',
      'dojo/dom-construct',
      'dojo/dom-class',
      'dojo/dom-style',
      'dojo/dom-attr',
      'dojo/on',
      'dojo/string',
      'dojo/topic',
      'dijit/focus',
      '../paletteOneUI/WidgetButton',
      'dojo/text!./templates/ChangeLayoutButton.html',
      'dojo/i18n!./nls/ChangeLayoutButton',
      "../theme"
], function(declare, lang, domConstruct, domClass, domStyle, domAttr, on,
   string, topic, focus, WidgetButton, template, i18nchangeLayoutButton, theme) {

   var ChangeLayoutButton = declare(

   // widget name and class
   'lconn.core.palette.ChangeLayoutButton',

   // superclass
   WidgetButton,

   // properties and methods
   {
      // summary: Override WidgetButton to always hide "Added to your page" and
      // "+" button
      templateString : template,

      defaultWidgetLabelNode : null,

      postCreate: function(){
         // summary: post create initialization
         this.inherited("postCreate", arguments);
         
    	 //gatekeeper: communities-new-widget-layouts
    	 var is_communities_new_widget_layouts = false;
    	 if ( typeof gatekeeperConfig != "undefined" && gatekeeperConfig['communities-new-widget-layouts'] )
    	 	 is_communities_new_widget_layouts = true;
 
         var isHikari = theme.isHikariTheme();

         //Default text is not displayed beside default layout when using hikari theme
    	 if(is_communities_new_widget_layouts === false || isHikari === false)
             this._updateDefaultHint();
      },

      postMixInProperties: function() {
         this.inherited("postMixInProperties", arguments);
         lang.mixin(this._resourceBundle, i18nchangeLayoutButton);
      },

      disableButton : function() {
         if (this._isEnabled) {
            if (this._onClickHandler != null) {
               this._onClickHandler.remove();
               this._onClickHandler = null;
            }

            domClass.add(this.titleContainerNode, "lotusAdded");
            // cannot use lotusHidden on this node because of lotusIcon override
            domStyle.set(this.plusIconNode, "display", "none");

            domClass.add(this.titleNode, "lotusHidden");
            domClass.remove(this.titleNodeAdded, "lotusHidden");
            focus.focus(this.titleNodeAdded);
            domAttr.set(this.titleNodeSpan, "innerHTML", this.title);

            domClass.add(this.domNode, "lotusPaletteDisabledBtn");

            this._isEnabled = false;
         }
      },

      enableButton : function() {
         if (!this._isEnabled) {
            if (this._onClickHandler == null) {
               this._onClickHandler = on(this.domNode, "click", lang.hitch(this, 'onClick'));
            }

            domClass.add(this.titleNodeAdded, "lotusHidden");
            domClass.remove(this.titleNode, "lotusHidden");
            domAttr.set(this.titleNode, "innerHTML", this.title);

            domClass.remove(this.titleContainerNode, "lotusAdded");
            domClass.remove(this.domNode, "lotusPaletteDisabledBtn");

            this._isEnabled = true;
         }
      },

      _buildIconNode : function(/* String */imgUrl, /* String */altText) {
         // summary: build span/img nodes used to display the widget icon

         var spanNode = domConstruct.create('span');
         domConstruct.create('img', {
            src : imgUrl.toString(),
            alt : altText.toString(),
            title : altText.toString()
         }, spanNode);

         if (dojo.isIE == 6) {
            // Although setTimeout is set to run at 0 here, it actually waits
            // until the browser finishes some other tasks before executing.
            // Problem was that image wasn't loaded in time before rendering.
            // This fix is only required for IE6.
            setTimeout(lang.hitch(this, function() {
               this.widgetIconNode.appendChild(spanNode);
            }), 0);
         }
         else {
            // Just add normally
            this.widgetIconNode.appendChild(spanNode);
         }
      },

      _updateTitle : function() {
         if (this.widgetItem != null) {
            this.title = this.widgetItem.name[0];
            domAttr.set(this.titleNode, "innerHTML", this.widgetItem.name[0]);
         }
         this.updateLabel();
      },

      _updateDescription : function() {
    	 //gatekeeper: communities-new-widget-layouts
    	 var is_communities_new_widget_layouts = false;
    	 if ( typeof gatekeeperConfig != "undefined" && gatekeeperConfig['communities-new-widget-layouts'] )
    	 	 is_communities_new_widget_layouts = true;

         var isHikari = theme.isHikariTheme();

         if ((this.widgetItem != null) && (this.widgetItem.desc != null)) {
            var widgetNameInDesc = this.widgetItem.desc[0];
            var desc = '';

            if (is_communities_new_widget_layouts && isHikari) {
                desc = string.substitute(this._resourceBundle['LAYOUT_DESCRIPTION'], [widgetNameInDesc]);
            } else {
            	if (this.widgetItem.isDefault && this.widgetItem.isDefault[0]) {
                    desc = string.substitute(this._resourceBundle['DEFAULT_LAYOUT_DESC'], [widgetNameInDesc]);
                 } else {
                    desc = string.substitute(this._resourceBundle['LAYOUT_DESC'], [widgetNameInDesc]);
                 }
            }
            domAttr.set(this.domNode, 'title', desc);
            domAttr.set(this.domNode, 'alt', desc);
         }
      },

      _updateDefaultHint : function() {
         if ( this.widgetItem && this.widgetItem.isDefault && this.widgetItem.isDefault[0] ) {
            domClass.remove(this.defaultWidgetLabelNode, "lotusHidden");
         }
      },

      updateLabel : function() {
         this.layoutAddedDescNode.innerHTML = this._resourceBundle.WIDGET_THIS_LAYOUT;
         if (this.titleNodeAdded != null) {
            var label = string.substitute(this._resourceBundle.WIDGET_LAYOUT_ADDED, [ this.title ]);
            this.titleNodeAdded.setAttribute('aria-label', label);
         }
      },

      onClick : function(evt) {
         if (!this._addingWidget) {
            this._addingWidget = true;
            try {
               if (this.widgetItem != null) {
                  topic.publish(this.ADD_WIDGET_EVENT, this.widgetItem);
               }
            }
            catch (e) {
               /* ignore */
            }
            finally {
               // show that the widget has been added, without disabling the
               // button for now
               this._addingWidget = false;
            }
         }
      }
   });

   return ChangeLayoutButton;
});
