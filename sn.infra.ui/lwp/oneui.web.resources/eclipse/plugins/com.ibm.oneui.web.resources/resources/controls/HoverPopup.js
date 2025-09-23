/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
dojo.provide("com.ibm.oneui.controls.HoverPopup");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

(function() {
	
dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.oneui.controls", "HoverPopup");

var DEFAULT_MAX_WIDTH = 500;
var DEFAULT_MAX_HEIGHT = 350;
var EXTRA_POPUP_PADDING = 2;
var HORIZONTAL_MARGIN = 50;
var VERTICAL_MARGIN = 20;
var MIN_EDGE = 10;

// in IE the polling loop is used for achieving the max-width, so a faster loop is required
var VALIDATE_POLL_INTERVAL = dojo.isIE ? 200 : 500;

var messages = dojo.i18n.getLocalization("com.ibm.oneui.controls", "HoverPopup");

var masterPopup;

/*
 * PROVISIONAL: This API is considered provisional and may be changed or removed in the
 * future with minimal or no warning.
 */

/**
 * @class com.ibm.oneui.controls.HoverPopup
 */
dojo.declare("com.ibm.oneui.controls.HoverPopup", dijit._Widget, /** @lends com.ibm.oneui.controls.HoverPopup.prototype */ {
	/*
	 * The HoverPopup is a more sophisticated version of a basic tooltip. Must like a tooltip, it is associated
	 * to a given dom node and is shown when the user hovers their mouse over it. Its defining quality is that
	 * it remains open when the user moves their mouse from the hovered artifact and into the popup itself. This
	 * allows the content of the popup to be interactive, contain links, etc.
	 * 
	 * To attach a popup to a node, you simply instantiate a HoverPopup and pass a reference to the desired node
	 * to the contructor in the 'around' parameter. This will connect the necessary listeners to the node and
	 * will differ creation of the nodes for the popup itself until the user hovers the target.
	 * 
	 * around (node or string array): Array containing node references or node ids. Can also pass a single
	 * 		reference/id. This is the only required field for the constructor and will be deleted after
	 * 		it is read upon creation.
	 * 
	 * html (string): Can be used to create a basic popup that contains html. If specified, no createContents
	 * 		method is necessary.
	 * createContents (function): A function that will be called before the popup is opened for the first
	 * 		time. It will be passed one argument, which will be a reference to the popup widget. Consumers
	 * 		must return a valid dom node in this method. The default implementation returns a node populated
	 * 		based on the html attribute. If this method is overriden, the html property will be ignored. If
	 * 		defered population is required, a dom node is still required to be returned and its content can
	 *		be updated after the data is available by holding a reference to the node and repopulating it
	 *		later.
	 * onOpen (function): A function that will be called before the popup is opened. It will be passed two
	 * 		arguments. The first is a reference to the popup widget, the second is the time the popup last
	 * 		opened.
	 * onClose (function): A function that will be called before the popup is closed. It will be passed one
	 * 		argument, which will be a reference to the popup widget.
	 * 
	 * openDelay (int): Time (in milliseconds) node must be hovered before popup opens.
	 * closeDelay (int): Delay (in milliseconds) before popup closes after mouse out.
	 * 
	 * persist (boolean): If true, the popup will stay open when the mouse is over it (default true).
	 * enabled (boolean): If false, the popup will not display on hover (default true).
	 * programmatic (boolean): If true, the popup will only be opened/closed by programmatic calls (default
	 * 		false).
	 * orientation (char): Force the tip to open to the left/right of the node (valid values are "L" or "R").
	 * 
	 * @since 0.7
	 */
	content: null, // reference to the dom node that will be displayed in the tooltip
	around: null,
	
	html: null,
	onOpen: null,
	onClose: null,
	onVisible: null,
	
	openDelay: 600,
	closeDelay: 800,
	
	maxWidth: DEFAULT_MAX_WIDTH,
	maxHeight: DEFAULT_MAX_HEIGHT,
	fixedMaxHeight: false,
	
	persist: true,
	enabled: true,
	programmatic: false,
	orientation: null,

	// A string that describes the title of the opened popup.  If null, the title attribute will be used
	dialogTitle: messages.popup,
	dialogLabelledBy: false,

	// The distance in pixels to offset the popup from the launcher - applied after all other calculations
	offset: 0,
	//Used to hide specific CSS that we may want to override or control in a subclass
	hideCSS: false,
	
	// PUBLIC API
	
	/*
	 * Can be called to programatically open the tooltip. This is only intended to be called programatically if
	 * the widget is configured to be used this way (this.programatic is set to true). Must supply the node to
	 * position the popup around (target). If no target is supplied, but the popup is only connected to one node,
	 * that node will be used as the target automatically.
	 */
	open: function(target) {
		if (!this.isEnabled())
			return;
		if (!target) {
			if (this._aroundNodes && this._aroundNodes.length == 1)
				target = this._aroundNodes[0];
			else
				return;
		}
		if (this._openTimer) {
			clearTimeout(this._openTimer);
			delete this._openTimer;
		}
		var m = this._getMasterPopup();
		if (m._showing && m._showing.programmatic === "block") {
			// if there is a programmatic hover showing that's configured to block other hovers, abort the open call
			return;
		}
		if (m._showing === this) {
			if (this._target === target) {
				// don't open the popup if it points to the current item
				if (dojo.isFunction(this.onVisible))
					this.onVisible(this);
				return;
			}
			this.close();
		}
		if (this.persist) {
			this._events = [];
			this._events.push(this.connect(m.domNode, "onmouseover", this._hoverPopup));
			this._events.push(this.connect(m.domNode, "onmouseout", this._mouseOutPopup));
			this._events.push(this.connect(m.domNode, "onhover", this._hoverPopup));
			this._events.push(this.connect(m.domNode, "onunhover", this._unHoverPopup));
		}
		this._isOpen = true;
		this._target = target;
		if (this._lastOpen == -1 && this.createContents) {
			this.content = this.createContents(this);
			if (!this.content) {
				console.error("HoverPopup: The createContents function must return a valid dom node.");
				this.close();
				return;
			}
		}
		if (this.onOpen && dojo.isFunction(this.onOpen))
			this.onOpen(this,this._lastOpen);
		this._lastOpen = new Date().getTime();

		m.setContent(this.content);
		if (this.onContentSet && dojo.isFunction(this.onContentSet))
		   this.onContentSet();
		var closeNode = m.closeNode;
		if (closeNode) {
			closeNode.style.display = this.hideClose ? "none" : "";
			dojo.attr(closeNode, "tabIndex", this.closeTabIndex || 0);
		}
		
		this._doManagedConnects();
		m.show(target, this);
		dijit.setWaiState(target, "owns", this.id + "_popup");
		this._validate();
	},
	
	/*
	 * Can be called to programatically close the tooltip. This is only intended to be called programatically if
	 * the widget is configured to be used this way (this.programatic is set to true).
	 */
	close: function(e, clicked) {
		if (!clicked && this.clickToClose)
			return;
		this.clickToClose = false;
		
		if (this._closeTimer) {
			clearTimeout(this._closeTimer);
			delete this._closeTimer;
		}
		if (this._validateTimeout) {
			clearTimeout(this._validateTimeout);
			delete this._validateTimeout;
		}
		if (this._events) {
			while (this._events.length > 0)
				this.disconnect(this._events.pop())
		}
		var m = this._getMasterPopup();
		// abort if this hover is not showing
		if (m._showing !== this)
			return;
		this._doManagedDisconnects();
		this._isOpen = false;
		if (this.onClose && dojo.isFunction(this.onClose))
			this.onClose(this);
		this._target = null;
		m.hide();
	},
	
	clickClose: function(e) {
		if (e) dojo.stopEvent(e);
		this.close(e, true);
	},
	
	isOpen: function(around) {
		if (!this._isOpen)
			return false;
		if (around)
			return around === this._target;
		return true;
	},
	
	/*
	 * Defines an event handler that will only be active while the popup is open. The widget is responsible for
	 * connecting/disconnecting the handler every time the popup is opened/closed. Takes the same parameters as
	 * dojo.connect.
	 */
	managedConnect: function(obj, event, context, method, dontFix) {
		var args = {arg1: obj, arg2: event, arg3: context, arg4: method, arg5: dontFix};
		this._mConnects.push(args);
		if (this._isOpen)
			this._doManagedConnect(args);
	},
	
	/*
	 * This is called by the widget before it responds to mouse over events on nodes the popup is connected to.
	 * The default implementation just returns the this.enabled flag. This function can be overriden if consumers
	 * want to use a more dynamic solution than manually toggling the enabled flag.
	 */
	isEnabled: function() {
		return this.enabled;
	},
	
	/*
	 * This is called by the widget at the start of the position function to allow it to update the maxWidth and
	 * maxHeight parameters.
	 */
	updateDimensions: function(viewportDimensions, absoluteNodePosition, relativeNodePosition) {
	},
		
	/*
	 * This is called by the framework to position the popup around the hovered node and ensure it is fully visible.
	 * Since some popups are populated lazily, it may need to be run again once the content is available. Consumers
	 * can call it with no arguments while the popup is open to rerun the logic. This will ensure the popup is
	 * contained within the viewport and will ensure it is scrolled to the top (since the scrollbar is reused for
	 * all HoverPopups).
	 */
	position: function(node) {
		var master = this._getMasterPopup();
		if (!node) {
			if (!this._isOpen || !this._target)
				return;
			node = this._target;
		}
		var documentPosition = dojo.position(node, true);
		var viewportPosition = dojo.position(node, false);
		var documentAbs = dojo.position(document.body);
		// FIXME: Failing testcase #26 due to position inconsistencies in RTL mode w/ scrolling
		// var documentAbs = dojo.position(document.body, true);
		var documentWidth = documentAbs.w;
		
		var relativeToDocumentLeft = documentPosition.x;
		var relativeToDocumentTop = documentPosition.y;
		var relativeToViewportLeft = viewportPosition.x;
		var relativeToViewportTop = viewportPosition.y;
		var launcherWidth = viewportPosition.w;
		var launcherHeight = viewportPosition.h;
				
		var viewport = dijit.getViewport();
		var viewportWidth = viewport.w;
		var viewportHeight = viewport.h;
		var viewportLeft = viewport.l;
		var viewportTop = viewport.t;
		// FIXME: Failing testcase #26
		// var viewportLeft = documentAbs.x;
		// var viewportTop = documentAbs.y;
		
		
		this.updateDimensions(viewport, documentPosition, viewportPosition);
		
		var effectiveMaxWidth = this.effectiveMaxWidth = Math.min(this.maxWidth, viewportWidth - 60);
		var effectiveMaxHeight = this.effectiveMaxHeight = Math.min(this.maxHeight, viewportHeight - 30);

		var contentWrapper = master.contentWrapper;
		var content = master.content;
		var wrapper = master.wrapper;
		var domNode = master.domNode;
		var arrow = master.arrow;
		var domNodeStyle = domNode.style;

		// precalc dimensions for arrows
		var arrowDimensions = this._dimArrow;
		if (!arrowDimensions) {
			arrowDimensions = this._dimArrow = {};
			var originalClassName = wrapper.className;
			wrapper.className = originalClassName + " lotusPopupLeft";
			arrowDimensions.left = dojo.marginBox(arrow);
			// Assume left and right arrows are the same dimensions
			//wrapper.className = originalClassName + " lotusPopupRight";
			//arrowDimensions.right = dojo.marginBox(arrow);
			wrapper.className = originalClassName + " lotusPopupBottom";
			arrow.className = arrow.className + " "; // IE8, trigger reflow
			arrowDimensions.bottom = dojo.marginBox(arrow);
			wrapper.className = originalClassName;
		}
		// precalc border dimensions
		var borderDimensions = this._dimBorders;
		if (!borderDimensions) {
			var contentPosition = dojo.position(content);
			var nodePosition = dojo.position(domNode);
			var left = contentPosition.x - nodePosition.x;
			var top = contentPosition.y - nodePosition.y; 
			borderDimensions = this._dimBorders = {
				l: left,
				t: top,
				r: nodePosition.w - contentPosition.w - left,
				b: nodePosition.h - contentPosition.h - top
			} 
		}
		
		if (!dojo.isIE || dojo.isIE >= 8) {
			contentWrapper.style.maxWidth = effectiveMaxWidth == DEFAULT_MAX_WIDTH ? "" : (effectiveMaxWidth + "px");
		}
		if (!this.fixedMaxHeight)
		   contentWrapper.style.maxHeight = effectiveMaxHeight == DEFAULT_MAX_HEIGHT ? "" : (effectiveMaxHeight + "px");

		var orientation = this.orientation;
		switch (orientation) {
			// horizontal
			case 'L':
			case 'l':
				var left = true;
				break;
			case 'R':
			case 'r':
				var left = false;
				break;
			default:
				var l = relativeToViewportLeft;
				var r = viewportWidth - relativeToViewportLeft - launcherWidth;
				//FIXME: wrong in IE8 (IE7 compat) RTL, needs fixing
				var left = l > r;
		}
		if ("BbTt".indexOf(orientation) != -1) {
			// clientWidth can be wrong in IE8
			// since master.content is overflow hidden, using scrollWidth is okay
			var maxW = Math.min(effectiveMaxWidth, wrapper.scrollWidth);
			var onTop = orientation == "t" || orientation == "T";
			
			dojo.addClass(wrapper, /*onTop ? "lotusPopupTop" : */"lotusPopupBottom");
			
			var center = relativeToDocumentLeft + launcherWidth / 2;
			var halfArrowWidth = arrowDimensions.bottom.w / 2;
			var halfWidth = maxW / 2;

			domNodeStyle.top = (viewportTop + relativeToViewportTop + launcherHeight + this.offset) + "px"; // add 10px to account for arrow
			if (left) {
				var leftEdge = Math.min(documentWidth - MIN_EDGE - maxW, center - halfWidth);
				domNodeStyle.left = leftEdge + "px";
			}
			else {
				var leftEdge = Math.max(MIN_EDGE, center - halfWidth);
				domNodeStyle.left = leftEdge + "px";
			}
			arrow.style.left = Math.max(center - halfArrowWidth - leftEdge - borderDimensions.l, 0) + "px";
			arrow.style.right = "auto";
		}
		else {
			var arrowDim = arrowDimensions.left;
			//var choice = dojo._isBodyLtr() ? left : !left;
			var orientations = left ? {"TL":"TR","BL":"BR"} : {"TR":"TL","BR":"BL"};  
			var result = dijit.placeOnScreenAroundRectangle(domNode, {
					x: relativeToDocumentLeft - arrowDim.w - this.offset + borderDimensions.l, 
					y: relativeToDocumentTop, 
					width: launcherWidth + (arrowDim.w + this.offset - borderDimensions.l)*2,
					height: launcherHeight
				}, orientations);
			var corner = result.aroundCorner;
			var onRight = ('R' == corner.charAt(1));
			var onTop = ('T' == corner.charAt(0));
			if(!this.hideCSS) {
			   if (dojo._isBodyLtr())
			      dojo.addClass(wrapper, onRight ? "lotusPopupRight" : "lotusPopupLeft");
			   else
			      dojo.addClass(wrapper, onRight ? "lotusPopupLeft" : "lotusPopupRight");
			}
			var popupHeight = result.h;
			var resultTop = result.y;
			var halfLauncherHeight = launcherHeight / 2;
			var halfArrowHeight = arrowDim.h / 2;
			var launcherOffset = Math.round(halfArrowHeight - halfLauncherHeight);
			var availableSpace = onTop ? (resultTop - viewportTop) : (viewportTop + viewportHeight - resultTop - popupHeight);
			if (launcherHeight > popupHeight) {
				var halfPopupHeight = popupHeight / 2;
				var adjustment = Math.round(halfLauncherHeight - halfPopupHeight);
				var arrowAdjustment = Math.round(halfPopupHeight - halfArrowHeight);
			}
			else {
				var adjustment = Math.min(availableSpace, halfArrowHeight);
				var arrowAdjustment = Math.round(adjustment - launcherOffset);
			}
			if (result.overflow > 0) {
				var delta = result.overflow;
				if (onTop)
					adjustment += delta;
				arrowAdjustment += delta;
			}
			
			arrow.style[onTop ? "top" : "bottom"] = Math.max(arrowAdjustment - borderDimensions[onTop ? 't' : 'b'], 0) + "px";
			arrow.style[onTop ? "bottom" : "top"] = "auto";
			domNodeStyle.top = resultTop + ((onTop ? -1 : 1) * adjustment) + "px";
			if (left) {
				domNodeStyle.right = (documentWidth - result.x - result.w + (dojo._isBodyLtr() ? 0 : documentAbs.x)) + "px";
				domNodeStyle.left = "auto";
			}
				
			/*if (left) {
				// more room on left
				var x = viewportWidth - relativeToDocumentLeft;
				var relX = viewportWidth - relativeToViewportLeft;
				var max = viewportWidth - maxW - HORIZONTAL_MARGIN;
				if (relX > max) {
					var d = relX - max
					x -= d;
				}
				domNodeStyle.right = (x + ARROW_WIDTH) + "px"; // add 10px to account for arrow
				dojo.addClass(wrapper, "lotusHoverLeft");
			}
			else {
				// more room on right
				var x = relativeToDocumentLeft + launcherWidth;
				var relX = relativeToViewportLeft + launcherWidth;
				var max = viewportWidth - maxW - HORIZONTAL_MARGIN;
				if (relX > max) {
					var d = relX - max;
					x -= d;
				}
				domNodeStyle.left = (x + ARROW_WIDTH) + "px"; // add 10px to account for arrow
				dojo.addClass(wrapper, "lotusHoverRight");
			}
			if (d && d > launcherWidth)
				arrow.style.display = "none";
			
			// vertical
			var spaceAbove = relativeToViewportTop;
			var spaceBelow = viewportHeight - relativeToViewportTop - launcherHeight;
			var popupHeight = content.clientHeight;
			var halfLauncherHeight = launcherHeight / 2;
			var minimumArrowSeparation = ARROW_HEIGHT - halfLauncherHeight;
			if (spaceBelow > spaceAbove) {
				// more room below
				if (spaceAbove < (VERTICAL_MARGIN + HALF_ARROW_HEIGHT)) {
					// if we're very close to the top of the viewport, ignore the margin we'd usually try to add
					var relativePopupTop = relativeToDocumentTop 
				}
				if (spaceAbove > minimumArrowSeparation) {
					var maximumPopupHeight = viewportHeight - Math.min(effectiveMaxHeight, popupHeight) - VERTICAL_MARGIN;
					if (spaceAbove - minimumArrowSeparation > maximumPopupHeight) {
						var relativePopupTop = relativeToDocumentTop - spaceAbove + maximumPopupHeight;
						var relativeArrowTop = relativeToViewportTop + halfLauncherHeight - maximumPopupHeight - 7;
					} else {
						var relativePopupTop = relativeToDocumentTop - minimumArrowSeparation;
						var relativeArrowTop = 4;
					}
				}
				domNodeStyle.top = relativePopupTop + "px";
				arrow.style.top = relativeArrowTop + "px";
			}
			else {
				// more room above
				spaceBelow = viewportHeight - relativeToDocumentTop - launcherHeight;
				// viewport height minus document height
				var wt = window.top;
				var bottom = viewportHeight - (wt.innerHeight && wt.scrollMaxY ? wt.dijit.getViewport().spaceBelow + wt.scrollMaxY : wt.document.body.scrollHeight);
				if (spaceBelow > bottom + minimumArrowSeparation) {
					var min = Math.min(effectiveMaxHeight, popupHeight) + VERTICAL_MARGIN;
					if (spaceAbove + launcherHeight < min) {
						minimumArrowSeparation = min - spaceAbove - launcherHeight;
						var relativeArrowBottom = minimumArrowSeparation + halfLauncherHeight - 8;
					} else {
						var relativeArrowBottom = 7;
					}
					var relativePopupBottom = spaceBelow - minimumArrowSeparation;
				} else {
					var relativePopupBottom = bottom;
					var relativeArrowBottom = minimumArrowSeparation - spaceBelow;
				}
				domNodeStyle.bottom = relativePopupBottom + "px";
				arrow.style.bottom = relativeArrowBottom + "px";
			}*/
		}
		contentWrapper.scrollTop = 1; // workaround a scrollbar display bug in FF
		contentWrapper.scrollTop = 0;
		if (dojo.isIE < 8) {
			// force a reflow of the content in IE7
			content.className = content.className;
		}
	},

	/*
	 * Destroys the widget.
	 */
	destroy: function() {
		if (this._isOpen)
			this.close();
		this.content = null;
		this._doManagedDisconnects();
		this.inherited(arguments);
	},
	
	// INTERNAL FUNCTIONS
	
	_getMasterPopup: function() {
		if (!masterPopup)
			masterPopup = new com.ibm.oneui.controls.internal._MasterPopup();
		return masterPopup;
	},
	
	postCreate: function() {
		this._lastOpen = -1;
		this._aroundNodes = [];
		this._aConnects = [];
		this._mConnects = [];
		this._mHandlers = [];
		this._attachArounds();
		
		this.createManagedConnects();
	},
	
	createManagedConnects: function() {
	},
	
	// default implementation of createContents
	// fills the tooltip with the html attribute if it has been provided
	createContents: function(tip) {
		var d = dojo.create("div");
		if (this.html)
			d.innerHTML = this.html;
		return d;
	},
	
	_attachArounds: function() {
		var a = this.around;
		if (dojo.isArray(a)) {
			for (var i = 0; i < a.length; i++)
				this._attachAround(a[i]);
		}
		else
			this._attachAround(a);
		delete this.around;
	},

	_attachAround: function(c) {
		if (!c)
			return;
		if (c.nodeType)
			var node = c;
		else
			var node = dojo.byId(c);
		if (node) {
			var aConnects = this._aConnects;
			this._aroundNodes.push(node);
			dijit.setWaiRole(node, "button");
			aConnects.push(this.connect(node, "onmouseover", this._hover));
			aConnects.push(this.connect(node, "onmouseout", this._mouseOut));
			aConnects.push(this.connect(node, "onhover", this._hover));
			aConnects.push(this.connect(node, "onunhover", this._unHover));
			if (this._clickAround)
				aConnects.push(this.connect(node, "onclick", this._clickAround));
		}
	},
	
	setAround: function(arounds) {
		this._aroundNodes = [];
		dojo.forEach(this._aConnects, this.disconnect, this);
		this._aConnects = [];
		this.around = arounds;
		// if the window is open when arounds are adjusted, and the new around is not visible,
		// close
		if (this._isOpen && this._target && dojo.indexOf(arounds, this._target) == -1)
			this.close();
		this._attachArounds();
	},
	
	_doManagedConnects: function() {
		for (var i = 0; i < this._mConnects.length; i++) {
			this._doManagedConnect(this._mConnects[i]);
		}
	},
	
	_doManagedConnect: function(args) {
		this._mHandlers.push(dojo.connect(args.arg1, args.arg2, args.arg3, args.arg4, args.arg5));
	},
	
	_doManagedDisconnects: function() {
		while (this._mHandlers.length > 0)
			dojo.disconnect(this._mHandlers.pop());
	},
	
	_validate: function() {
		if (dojo.isDescendant(this._target, document.body) == true) {
			// in IE, use js to obey the max-width due to scrollbar bugs
			// see work item 54939
			if (dojo.isIE < 8) {
				var m = this._getMasterPopup();
				var c = m.content;
				var cw = m.contentWrapper;
				// use maxWidth-1 to tell the difference between natural size and the case where we hit the max width
				cw.style.width = (c.clientWidth >= (this.effectiveMaxWidth-1) - (m._scrollbarSize || 0)) ? this.effectiveMaxWidth + "px" : "";
				if (!m._scrollbarSize && cw.clientWidth != cw.offsetWidth) {
					m._scrollbarSize = cw.offsetWidth - cw.clientWidth;
				}
			}
			this._validateTimeout = setTimeout(dojo.hitch(this,this._validate),VALIDATE_POLL_INTERVAL);
			return;
		}
		this.close();
	},
	
	_mouseOut: function(e) {
		// need to use == true since isDescendant returns -1 when it catches an exception
		// see http://trac.dojotoolkit.org/ticket/5464
		if(dojo.isDescendant(e.relatedTarget, e.target) == true){
			return;
		}
		this._unHover(e);
	},
	
	_hover: function(e) {
		if (this.programmatic)
			return;
		if(this._closeTimer){
			clearTimeout(this._closeTimer);
			delete this._closeTimer;
		}
		if (!this._isOpen && !this._openTimer) {
			var target = e.target;
			this._openTimer = setTimeout(dojo.hitch(this,function(){
				this.open(this._determineTarget(target));
			}), this.openDelay);
		}
	},
	
	_unHover: function(e) {
		if (this.programmatic)
			return;
		if(this._openTimer){
			clearTimeout(this._openTimer);
			delete this._openTimer;
		}
		this._closeTimer = setTimeout(dojo.hitch(this, function() {
			if (!this._isTipHovered) {
				this.close();
			}
		}), this.closeDelay)
	},
	
	_hoverPopup: function(e) {
		this._isTipHovered = true;
	},
	
	_mouseOutPopup: function(e) {
		if(dojo.isDescendant(e.relatedTarget, this._getMasterPopup().domNode) == true){
			// false event; just moved from target to target child; ignore.
			return;
		}
		this._unHoverPopup(e);
	},
	
	_unHoverPopup: function(e) {
		this._isTipHovered = false;
		if (e.relatedTarget == this._target || dojo.isDescendant(e.relatedTarget, this._target) == true) {
			// moved from tooltip back to connectNode; ignore.
			return;
		}
		this._unHover(e);
	},
	
	_determineTarget: function(/*DomNode*/ target) {
		if (!target)
			return target;
		var newTarget = null;
		for (var i = 0; i < this._aroundNodes.length; i++) {
			if (!this._aroundNodes[i])
				continue;
			// if the target is this connect node, return it
			if (this._aroundNodes[i] == target)
				return target;
			// if the target is a descendant of this connect node
			// make sure we return the lowest level connect node that is a parent of the target
			// (e.g. as close to the target as possible)
			if (dojo.isDescendant(target, this._aroundNodes[i]) == true &&
					(!newTarget || dojo.isDescendant(this._aroundNodes[i], newTarget) == true)) {
				newTarget = this._aroundNodes[i];
			}
		}
		// return the suitable parent if one was found or the original target otherwise
		return newTarget ? newTarget : target;
	}
	
});

var _popupStack = [];

dojo.declare("com.ibm.oneui.controls.internal._MasterPopup", [dijit._Widget, dijit._Templated], {
	zIndex: 10000,
	templatePath: dojo.moduleUrl("com.ibm.oneui","controls/templates/HoverPopup.html"),
	messages: messages,
	
	postCreate: function() {
		dojo.style(this.domNode, {display: "none", zIndex: this.zIndex});
		// if multiple master popups exist, a popup can request positioning before others 
		var location = dojo.query(".dijitPopup", document.body)[0];
		var place = this.place;
		if (!location || !place) {
			location = dojo.body();
			place = null;
		}
		dojo.place(this.domNode, location, place);
	},
	
	show: function(target, source) {
		if (this._showing) {
			this._showing.close();
		}
		this._showing = source;
		var domNode = this.domNode;
		var wrapper = this.wrapper;
		var documentWrapper = this.documentWrapper;
		wrapper.id = source.id + "_popup";
		if(!this._showing.dialogLabelledBy) {
			dijit.setWaiState(wrapper, "label", source.dialogTitle !== null ? source.dialogTitle : source.title || "");
			if (documentWrapper)
				dijit.setWaiState(documentWrapper, "label", source.dialogTitle !== null ? source.dialogTitle : source.title || "");
		}
		
		if (source.customClass)
			dojo.addClass(wrapper, source.customClass);
		domNode.style.visibility = "hidden";
		domNode.style.display = "block";
		if (this.zIndex && !domNode.style.zIndex)
		   domNode.style.zIndex = this.zIndex;
		try {
			source.position(target);
			domNode.style.visibility = "";
			if (dojo.isFunction(source.onVisible))
				source.onVisible(source);
			dijit.setWaiState(wrapper, "hidden", "false");
			_popupStack.push(this);
		} catch (e) {
			// suppress errors in IE when the connected node is hidden, see work item 66523
			source.close();
			if (dojo.config.isDebug)
				console.error(e);
		}
	},
	
	hide: function() {
		// recursively close any currently open popups above us
		for (var i=0; i<_popupStack.length; i++)
			if (_popupStack[i] == this) {
				var next = _popupStack[i+1];
				if (next && next._showing)
					next._showing.close();
				_popupStack.pop();
			}
		
		var domNodeStyle = this.domNode.style;
		domNodeStyle.cssText = "";
		domNodeStyle.display = "none";
		
		this.arrow.style.cssText = "";
		this.contentWrapper.style.cssText = "";
		
		var wrapper = this.wrapper;
		dijit.setWaiState(wrapper, "hidden", "true");
		if(!this._showing.dialogLabelledBy) {
			dijit.setWaiState(wrapper, "label", "");
		}
		
		dojo.removeClass(wrapper, ["lotusPopupLeft", "lotusPopupRight", "lotusPopupBottom"]);
		if (this._showing && this._showing.customClass)
			dojo.removeClass(wrapper, this._showing.customClass);
		this._showing = null;
	},
	
	setContent: function(newNode) {
		if (this.content.firstChild)
			this.content.replaceChild(newNode, this.content.firstChild);
		else
			this.content.appendChild(newNode);
	},
	
	clickClose: function(event) {
		if (this._showing)
			this._showing.clickClose(event);
	}
});

/**
 * Return the currently open popup that contains the given node.
 * @function _getPopupForNode
 * @memberof com.ibm.oneui.controls.internal
 * @param {Node} target Target node
 */
com.ibm.oneui.controls.internal._getPopupForNode = function(target) {
	for (var i=0,l=_popupStack.length; i<l; i++) {
		var masterPopup = _popupStack[i];
		if (dojo.isDescendant(target, masterPopup.domNode))
			return masterPopup._showing;
	}
}

})();
