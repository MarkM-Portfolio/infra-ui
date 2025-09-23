/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.KeyNavigatable');

/**
 * Provide methods which a widget need to support keyboard navigation.
 * 
 * We could use dojo's _KeyNavMixin in the future.
 * 
 */
dojo.declare("lconn.share.widget.KeyNavigatable", null, {

   /**
    * Implement a method if a widget need to handle it.
    * 
    * _onUpArrow(evt)
    * 
    * _onDownArrow(evt)
    * 
    * _onLeftArrow(evt)
    * 
    * _onRightArrow(evt)
    * 
    * _onSpace(evt)
    * 
    * _onEnter(evt)
    * 
    * _onHome(evt)
    * 
    * _onEnd(evt)
    * 
    */
   _onKeydown : function(evt) {
      if (!evt)
         return;

//             console.log( this.declaredClass + "._onKeydown (" + evt.keyCode + "," +
//             evt.altKey + ") on " + evt.target.id );
      var target = evt.target;
      if (!target)
         return;

      switch (evt.keyCode) {
      case dojo.keys.UP_ARROW:
         if (typeof this._onUpArrow == "function") {
            this._onUpArrow(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.DOWN_ARROW:
         if (typeof this._onDownArrow == "function") {
            this._onDownArrow(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.LEFT_ARROW:
         if (dojo.isBodyLtr()) {
            if (typeof this._onLeftArrow == "function") {
               this._onLeftArrow(evt);
               dojo.stopEvent(evt);
            }
         } else {
            if (typeof this._onRightArrow == "function") {
               this._onRightArrow(evt);
               dojo.stopEvent(evt);
            }
         }
         break;
      case dojo.keys.RIGHT_ARROW:
         if (dojo.isBodyLtr()) {
            if (typeof this._onRightArrow == "function") {
               this._onRightArrow(evt);
               dojo.stopEvent(evt);
            }
         } else {
            if (typeof this._onLeftArrow == "function") {
               this._onLeftArrow(evt);
               dojo.stopEvent(evt);
            }
         }
         break;
      case dojo.keys.SPACE:
         if (typeof this._onSpace == "function") {
            this._onSpace(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.ENTER:
         if (typeof this._onEnter == "function") {
            this._onEnter(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.HOME:
         if (typeof this._onHome == "function") {
            this._onHome(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.END:
         if (typeof this._onEnd == "function") {
            this._onEnd(evt);
            dojo.stopEvent(evt);
         }
         break;
      case dojo.keys.ESCAPE:
         if (typeof this._onEscape == "function") {
            this._onEscape(evt);
         }
         break;
      default:
         return;
      }
   }
});
