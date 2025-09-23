/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2001, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*version 1.07.2 5/5/08*/
/* lconn.core.Menu

	CS 5/7/08
	showed the iframe using the dojo.appear effect also, to keep it from appearing before the popup element and hiding the popup appear affect.
	
	CS 5/5/08
	fixed iframe positioning in IE.  Needed to write out style attributes after the iframe and container elements were written to the page.
	
	CS 4/26/08
	Added iframe that is positioned behind the popup for accessibility in High Contrast mode.  Rather than rely on testing for high contrast, we just do this for every popup. 
  
   Begin Comment Port - VB
   
   Port to Dojo 1.0.2: Vincent Burckhardt (VB)
   		- Removed dependencies on prototype.js for the fading effects. Use of dojo.fadeIn and dojo.fadeOut instead
   		- Replaced some parts of the code with equivalent dojo functions when possible
   		- Switched to the Dojo syntax to declare classes
   		- All the functionalities of the popup stay the same
   
   Begin Comment Port - VB
   
   Author: Tim Finley (finleyt@us.ibm.com)
   Based off of Chris Samoiloff's menu.js  
   
   A small library to help display "modal" and "modeless" popups. Note these are not
   the true definition of modal and modeless, but close enough.
   
   For "modal" popups use the Popup object. These popups will not disappear unless you
   explicitly call Popup.hide( <id> )
   
   For "modeless" popups use the MenuPopup object. Only one "modeless" popup can be open
   at a time. Also these popus will automatically disappear if the user presses ESC or
   clicks the mouse anywhere on the page (other than the popup).
   
   !!! IMPORTANT NOTES !!!
   
   For Popups to work every popup needs to have certain styles. I recommend to make your
   popup html like this:
   
	   <div id="popupId" class="popup">
	   		... popup contents ...
	   </div>
   
   And use the following CSS styles
   
	   .popup { position: absolute;
	   			left: -9999px;
	   			z-index: 200;
	   			
	   			// These last styles are optional, just my suggested defaults
	   			background-color: white;
	            width: 20em;
	            float: none;
	            text-align: left;
	          }
   
   For MenuPopups to work you need to use this javascript. I haven't included it in this
   js file just in case you already have functions for doc onclick or onkeyup. 
   
		document.onclick = function () {
			MenuPopup.hideMenu();
		};
		document.onkeyup = function ( event ) {
			MenuPopup.hideOnKeypress( event );
		};
	
	!!! !!!
   
   
   Examples:
   
   This will show a popup. Note the third parameter is optional.
   
   		Popup.show( <idOfPopup>, event, { focus: <Element to focus on popup close. If you
                                                  care to return focus then most of the time
                                                  you'll pass "this" here>,
                                          state: { <This state is used to store data that
                                                    other javascript code may need to use.
                                                    Use this instead of setting global
                                                    variables> }
   		} );
   
   This will hide a popup.
   
	   Popup.hide( <idOfPopup> );
   
   This will show a the object with id 'helpbubbleId' as a MenuPopup, the options are the
   same as above.
   
	   MenuPopup.showMenu( 'helpbubbleId', event, { focus: this } );
   
   Some added functions, by Chris S, 1/9/08
		
		MenuPopup.showMenu('helpbubbleId', event, {{placement:xyvalues, closeFunction:'functionName(\'param1\', param2)'})
   			placement - xyvalues are sent as a string, delimited by a comma (or a variable that contains that string).  Examples ("left, bottom" or "left, above" or exact pixels like "20,50") x constants are left and right.  y constants are top, bottom, and above (above positions the whole menu above the trigger element)
			functionName - this allows you to pass a function (with its parameters), which will be executed when the menu closes.  Uses for this are to reset UI that was changed programatically when the menu was displayed.

   VB : Added 1/18/08. Possibility to pass a "pointer" for closeFunction. Example:
                    function testCloseFct(st){
			alert(st);
		}	
		var someStr = "Hello World"; 
		var closeFctPtr = dojo.hitch(null, "testCloseFct", someStr);
		MenuPopup.showMenu('helpbubbleId', event, {{placement:xyvalues, closeFunction:closeFctPtr})

		
   This will hide the currently open MenuPopup (since only one is open at a time).
   
   		MenuPopup.hide();
 

   Some other useful functions are
   		Popup.getState( <id> ) - return the saved state of a particular popup
   		Popup.getReturnFocus() - return focus that will be set after the popup closes
   		Popup.setReturnFocus() - change the return focus
   		Popup.isOpen( <id> )   - see if a particular popup is open
   		
   		MenuPopup.getState( )  - get the state of the currently open MenuPopup
   		MenuPopup.isOpen()     - check to see if there is a MenuPopup open
   		
   
*/

dojo.provide("lconn.core.Menu");

dojo.declare("lconn.core.PopupClass", null, {
	
	open: { },		//array of the open popups
	returnFocusElement: false,
	numOpenPopups: 0,
	passedState: { },
	toggler: null,
	
	CONTAINER: 'oa-popup-container',
	BACKGROUND: 'oa-popup-iframe',
	
	constructor: function( ) {
		
	},
	
	show: function ( id, event, options ) {	
		options = options || {};		
		/* don't open the menu if it was previously open. This will cause clicking the link
	       to open the menu twice to toggle the popup */
		
		if (this.isOpen(id)){
			this.hide( id );			
		} else {
			if ( options.focus ) {
				this.returnFocusElement = options.focus;
			}
			
			//if (dojo.hasClass(dojo.body(), "dijit_a11y")) this.setHighContrast(true);
			
			event = dojo.fixEvent(event);
					
			var eventSource = event.target // ) ? event.target : event.srcElement; /*gets event target, depending on browser*/
			var popupElement = dojo.byId(id);
			
				
			
			var openPopupArray = {
				element: popupElement,
				state: options.state || {},
				placement: options.placement || "",
				callFunction: options.closeFunction || ""
			};
			
			var popupContainer = this.getPopupContainer();
			popupContainer.appendChild(popupElement); 
			var popupBackground = this.getPopupBackground();		
			
			this.open[ id ] = openPopupArray;			
			this.numOpenPopups++;			
			this.sizeBackground(popupElement, popupBackground, eventSource, event);
			var position = this.calculatePosition( popupElement, eventSource, event, openPopupArray.placement);
			new Popup.Effect.Appear( id, position.left, position.top );	
			new Popup.Effect.Appear( this.BACKGROUND, position.left, position.top );
			dojo.stopEvent(event);
		}//end if	
	},	
	
	hide: function ( id, options ) {
		var element = dojo.byId(id);
		dojo.byId(this.BACKGROUND).style.display="none";
		new Popup.Effect.Fade(element);
		var popup = this.open[id];
		
		this.numOpenPopups--;
		
		if ( this.numOpenPopups == 0 && this.returnFocusElement ) {
			dojo.byId(this.returnFocusElement).focus();
			this.returnFocusElement = false;
		}
		
		this.open[ id ] = false;
		
		if (dojo.isString(popup.callFunction))
			eval(popup.callFunction)//this runs a close function, if one was passed from the menu open call.  You need to include parameters with the function, if they are required.
		else if (dojo.isFunction(popup.callFunction))
			popup.callFunction();		
	},
	
	isOpen: function ( id ) {
		var popup = this.open[ id ];
		return popup != false && popup !== null && popup !== undefined;		
	},
	
	getState: function( id ) {
		return this.open[ id ].state;
	},
	
	getReturnFocus: function() {
		return this.returnFocusElement;
	},
	
	clearReturnFocus: function() {
		var returnFocus = this.returnFocusElement;
		this.returnFocusElement = false;
		return returnFocus;
	},
	
	getPopupBackground: function ( ) {
	
		var popupBackground = dojo.byId(this.BACKGROUND);		
		if ( popupBackground == null ) {		
			var popupBackground = dojo.doc.createElement("iframe");
			popupBackground.setAttribute( 'id', this.BACKGROUND );
			popupBackground.setAttribute('frameBorder', 'no');
			popupBackground.setAttribute('tabindex', '-1');
			popupBackground.src = 'javascript:""';
			// and we need to make the popupBackground "layer" right under the popup container, whose z-index is 900
			//popupBackground.setAttribute( 'style', 'position: absolute; left: 0; top: 0; z-index:899;' );
			document.body.appendChild( popupBackground );
			//sometimes it's less buggy to set attributes after the element is added to the page.
			popupBackground = dojo.byId(this.BACKGROUND);
			popupBackground.style.position="absolute";
			popupBackground.style.left="0";
			popupBackground.style.top="0";
			popupBackground.style.zIndex="1000";
		}else{
			popupBackground.style.display="block";
		}//end if
		
		return popupBackground;
		
	},
	
	getPopupContainer: function ( ) {
	
		var popupContainer = dojo.byId(this.CONTAINER);
		
		if ( popupContainer == null ) {
		
			var popupContainer = document.createElement( 'div' );
			popupContainer.setAttribute( 'id', this.CONTAINER );
			
			// Make the popupContainer be a separate containg block with a high z-index
			// This is necessary since separate containing blocks have separate z orderings
			// and we need to make the popupContainer "layer" on top of everything else
			//popupContainer.setAttribute( 'style', 'position: absolute; left: 0; top: 0; z-index: 900;' );
			document.body.appendChild( popupContainer ); 
			//sometimes it's less buggy to set attributes after the element is added to the page.
			popupBackground = dojo.byId(this.CONTAINER);
			popupBackground.style.position="absolute";
			popupBackground.style.left="0";
			popupBackground.style.top="0";
			popupBackground.style.zIndex="1100";
		}
		
		return popupContainer;
		
	},
	
	menuGetOffsetTop: function (pElem,pOTOP){
		//this function is called recursively until we get to the body element.  Not needed for absolutely positioned items.
		var offset = 0;
		var curElem = pElem;
		while (curElem){
			offset += curElem.offsetTop;
	   		curElem = curElem.offsetParent;
	   		if (curElem) offset -= curElem.scrollTop;
	   	}
		return offset;
	},
	
	menuGetOffsetLeft: function (pElem,pOLEFT){
		//this function is called recursively until we get to the body element. Not needed for absolutely positioned items.
		var offset = 0;
		var curElem = pElem;
		while (curElem){
			offset += curElem.offsetLeft;
	   		curElem = curElem.offsetParent;
	   		if (curElem) offset -= curElem.scrollLeft;
	   	}
		return offset;
	},
	
	/* Calculate postion will ensure that the popup is placed on the screen near the clicked element,
	   according to the following rules. 
	   
	   If the whole popup will fit on screen where it was intended (just below the clicked element) this
	   fuction will return those x and y values.
	   
	   If the popup will appear below the bottom of the page (part of the popup is cut off the bottom)
	   then the popup will appear above the clicked element, except...
	   
	   If when the popop is displayed above the element it cuts cut off the top of the page, or the general case
	   the popup has a height larger than the page then the popup will just appear flush to the top of the page.
	   
	   These rules also apply similarly to the left-right of the page.
	   
	   To sum it up, this just trys to display as much of the popup as possible preventing overlapping the edges
	   of the page when possible.
    */
		
	calculatePosition: function ( popupElement, eventSource, event, placement ) {
		//sets the menu position
		//normal position is a tad offset from the element that triggered the menu
		
		// to get the position for the drop down menu in case of RTL and LTR
		
		//sets the menu position
		//normal position is a tad offset from the element that triggered the menu
		
		// to get the position for the drop down menu in case of RTL and LTR
		var menuLeftOffset;
		//no offset if we have been passed placement values
		if (placement==""){
			if( typeof( bidir) != "undefined" && bidir != null && bidir =='rtl') {
				menuLeftOffset = (popupElement.offsetWidth > 0)? popupElement.offsetWidth : 175; // assume default value for menu if offsetWidth is zero. 		
				menuLeftOffset = 24 - menuLeftOffset;
			}else{
				menuLeftOffset = eventSource.offsetWidth - 24	;
			}
		
			var popupY = ( this.menuGetOffsetTop(eventSource,0) + eventSource.offsetHeight - 10);	
			var popupX = ( this.menuGetOffsetLeft(eventSource,0) + menuLeftOffset);
		}else{//placement has a value
			menuLeftOffset=0;
			var placementArray=placement.split(",");
			//left coordinate
			switch (placementArray[0]){
				case "left":
					popupX=this.menuGetOffsetLeft(eventSource,0);
					break;
				case "right":
					popupX=this.menuGetOffsetLeft(eventSource,0) + eventSource.offsetWidth;
					break;
				default:
					popupX=parseInt(placementArray[0]);
			}//end switch
			//top coordinate
			switch (placementArray[1]){
				case "above":
					popupY=this.menuGetOffsetTop(eventSource,0) - popupElement.offsetHeight;
					break;
				case "top":
					popupY=this.menuGetOffsetTop(eventSource,0);
					break;
				case "bottom":
					popupY=this.menuGetOffsetTop(eventSource,0) + eventSource.offsetHeight;
					break;
				default:
					popupY=parseInt(placementArray[1]);
			}//end switch
		}//end if
		
		//check to make sure position is not offscreen and adjust, if it is
		
		// IE vs Firefox properties
		var body = document.documentElement ? document.documentElement : document.body;
		var windowHeight = window.innerHeight ? window.innerHeight : body.clientHeight;
		var windowWidth = window.innerWidth ? window.innerWidth : body.clientWidth;
		var scrollX = document.all ? document.body.scrollLeft : window.pageXOffset;
		var scrollY = document.all ? document.body.scrollTop : window.pageYOffset;
		if ((popupY + popupElement.offsetHeight) > (windowHeight + scrollY) ) popupY -= popupElement.offsetHeight;	
		if ((popupX + popupElement.offsetWidth) > (windowWidth + scrollX) ) popupX -= popupElement.offsetWidth;
		
		//check to make sure our adjustments didn't result in values less than the scrolled edge of the page
		if (popupY < scrollY) popupY = scrollY;
		if (popupX < scrollX) popupX = scrollX;
		
		// VB: fix for Safari
		if (dojo.isSafari){
			popupX += scrollX;
			popupY += scrollY;			
		}
		
		return { left: popupX  + "px", top: popupY + "px" };
	},
	
	sizeBackground: function (popupElement, popupBackground, eventSource, event) {
		popupBackground.width=popupElement.offsetWidth;
		popupBackground.height=popupElement.offsetHeight;
	}});


dojo.declare("lconn.core.MenuPopupClass", lconn.core.PopupClass, 
	{
		currentMenu: false,
		
		hideMenu: function(options){
			if ( this.currentMenu ) {
				this.hide( this.currentMenu );
				this.currentMenu = false;
			}
		},
		
		showMenu: function(id, event, options){
			var tempCurrentMenu = this.currentMenu;
			this.hideMenu();
			
			// if you are trying open the existing menu then don't reshow it (causing it to toggle off)
			if ( id != tempCurrentMenu ) {
				this.currentMenu = id;
				this.show( id, event, options );
			}			
		},
		
		hideOnKeypress: function(event){
			if( typeof(event) != "undefined" && event !== null && event.keyCode == Event.KEY_ESC) {
				MenuPopup.hideMenu();
			}
		},
		
		isMenuOpen: function(){			
			if ( this.currentMenu ) {
				return true;
			}
			return false;			
		},
		
		getState: function(){
			if ( this.currentMenu ) {
				return this.open[ this.currentMenu ].state;
			}
		}});

Popup = new lconn.core.PopupClass();
MenuPopup = new lconn.core.MenuPopupClass();

/* Custom Popup Effects */




Popup.Effect = {};

Popup.Effect.DURATION = 250;

/* Fade out the popup to 0 opacity and move it off the page
   We can't set display: none since that will break our offset
   calculations in some Firefox versions */
Popup.Effect.Fade = function(element) {	
  element = dojo.byId(element);
  var oldOpacity = dojo.style(element, "opacity");
  
  var anim = dojo.fadeOut({node: element, duration: Popup.Effect.DURATION})
  
  dojo.connect(anim, "onEnd", function(){
  					dojo.style(element, "opacity", oldOpacity);
					dojo.style(element, "top", "-9999px")
  				});
  
  anim.play();
}

/* Fade in the popup and move it to (x,y) on the page */
Popup.Effect.Appear = function(element, x, y) {
	element = dojo.byId(element);	
	
	dojo.style(element, "opacity", 0);	
	dojo.style(element, "left", x);
	dojo.style(element, "top", y);	
	dojo.fadeIn({node: element, duration: Popup.Effect.DURATION}).play();	
}
