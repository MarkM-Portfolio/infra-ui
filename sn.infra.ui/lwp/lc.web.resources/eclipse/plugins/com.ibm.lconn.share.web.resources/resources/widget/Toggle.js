/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.Toggle");
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.Toggle", null, {
   /*
   baseClass: "lotusToggle",
   topic: "lconn/share/action/toggle",
   // each state must contain:
   //   tooltip: shown as hover text on the link
   //   altText: shown as the alt text for the image
   //   className: the CSS classes that apply to this state
   states: [
      {className: "lotusSprite lotusPinIndeterminate"}, // state 0 is the indeterminate state
      {className: "lotusSprite lotusPinOn"}, // state 1 is the "on" state
      {className: "lotusSprite lotusPinOff"} // state 2 is the "off" state
   ],
   */
   
   destroy: function() {
      if (this._topic) dojo.unsubscribe(this._topic);
   },
   
   initToggle: function(topic, baseClass, states, childNode) {
      this._topic = dojo.subscribe(topic, this, "toggle");
      
      this._templates = [];
      this._states = states;
      this._baseClass = baseClass;
      
      var d = dojo.doc;
      var template = d.createElement("a");
         template.className = baseClass;
         template.href = "javascript:;";
         dojo.attr(template, "topic", topic);
         var img = template.appendChild(d.createElement("img"));
            img.src = dojo.config.blankGif;
         var span = template.appendChild(d.createElement("span"));
            span.className = "lotusAltText";
         if (childNode) {
        	template.appendChild(childNode);
         }
         
         dijit.setWaiRole(template, "button");

      for (var i=0,state; state=states[i]; i++) {
         var a = template.cloneNode(true);
         a.title = state.tooltip;
         dijit.setWaiState(a, "label", state.tooltip);
         var img = a.firstChild;
         img.alt = state.tooltip;
         img.className = state.className;
         var span = img.nextSibling;
         span.appendChild(d.createTextNode(state.altText));
         if (lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
        	a.lastChild.className = state.className;
         }
         this._templates.push(a);
      }
   },
   
   createToggle: function(state) {
      state = state || 0;
      var t = this._templates[state];
      var n = t.cloneNode(true);
      n._state = state;
      return n;
   },
   
   toggle: function(el, e) {
      if (e) dojo.stopEvent(e);
      var state = el._state;
      // indeterminate state links cannot be clicked
      if (!(state > 0))
         return;
      // only links matching this core item can be clicked
      if (el.className != this._baseClass)
         return;
      
      var isOn = (state == 1);
      this.updateToggle(el, !isOn);
      
      this.onToggle(el, !isOn);
   },
   
   updateToggle: function(el, isOn) {
      var newIndex = isOn ? 1 : 2;
      var newState = this._states[newIndex];
      el._state = newIndex;
      el.title = newState.tooltip;
      dijit.setWaiState(el, "label", newState.tooltip);
      var img = el.firstChild;
      img.className = newState.className;
      img.alt = "";
      if (lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
      	 el.replaceChild(this._templates[newIndex].childNodes[1].cloneNode(true), el.childNodes[1]);
      }
      el.replaceChild(this._templates[newIndex].lastChild.cloneNode(true), el.lastChild);
   },
   
   onToggle: function(el, isOn) {
   }
});
