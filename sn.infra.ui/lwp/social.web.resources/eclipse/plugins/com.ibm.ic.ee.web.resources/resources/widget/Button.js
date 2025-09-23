/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/config",
	"dojo/on",
	"dijit/focus",
	"dijit/form/DropDownButton"
], function (dojo, declare, config, on, focusUtils, DropDownButton) {

	declare("com.ibm.social.ee.widget.DropDownButton", [DropDownButton], {
	   tooltip: "",
	   a11yLabel: "",
	   showMenuLabel: "",
	   dropDownIcon: "lotusArrow lotusDropDownSprite eeDropDown",   
	   templateString: '<span style="vertical-align: top; margin: 0" class="dijitInline dijitDropDownButton" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"><span class="dijitInline"><button class="lotusBtn" type="${type}" title="${tooltip}" dojoAttachPoint="focusNode,titleNode,_arrowWrapperNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"><span id="${id}_label"><span dojoAttachPoint="containerNode, _popupStateNode"></span></span><img src="${blankIcon}" waiRole="presentation" alt="" aria-label="${showMenuLabel}" role="presentation" class="${dropDownClass} ${dropDownIcon}"/><span class="lotusAltText" waiRole="presentation" role="presentation">&nbsp;&#9660;</span></button></span></span>',
	   buildChildren: function(){
	
	   },
	   postMixInProperties: function() {
	      this.dropDownClass = "eeDropDownArrow";
	      this.blankIcon = config.blankGif;
	      this.inherited(arguments);
	   },
	   
	   toggleDropDown: function(){
	      // summary: toggle the drop-down widget; if it is up, close it, if not, open it
	      if(this.disabled || this.readOnly){ return; }
	      focusUtils.focus(this.popupStateNode);
	      var dropDown = this.dropDown;
	      if(!dropDown){ return; }
	      if(!this._opened){
	         if (dropDown._scrollableChildren && dropDown._scrollableChildren.length < 1)
	         {
	            this.buildChildren();
	         }
	         // If there's an href, then load that first, so we don't get a flicker
	         if(dropDown.href && !dropDown.isLoaded){
	            var self = this;
	            var handler = on(dropDown, "Load", function(){
	               handler.remove();
	               self.openDropDown();
	            });
	            dropDown._loadCheck(true);
	            return;
	         }else{
	            this.openDropDown();
	         }
	      }else{
	         this.closeDropDown();
	      }
	   }
	});
	return com.ibm.social.ee.widget.Button;
});
