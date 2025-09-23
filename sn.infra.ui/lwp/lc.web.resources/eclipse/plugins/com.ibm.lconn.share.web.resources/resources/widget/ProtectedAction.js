/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.ProtectedAction");

/**
 * Used when an object instance should be guarded against duplicates.  If the instance
 * can have multiple simultaneous actions this class should not be used.
 */
dojo.declare("lconn.share.widget.ProtectedAction", null, {
   startAction: function() {
      if (this._actionInProgress)
         return false;
      this._actionInProgress = true;
      return true;
   },
   endAction: function() {
      this._actionInProgress = false;
   },
   isActing: function() {
      return this._actionInProgress;
   },
   enableInput: function(el) {this._toggleInput(el,true);},
   disableInput: function(el) {this._toggleInput(el,false);},
   _toggleInput: function(el,enabled) {
      var set = !enabled;
      var arr = el.getElementsByTagName("INPUT");
      for (var i=0,a; a=arr[i++];)
         if ({text:1,password:1}[a.type])
            a.readOnly = set;
         else if (a.type != "hidden" && a.type != "file") 
            a.disabled = set;
      arr = el.getElementsByTagName("TEXTAREA");
      for (var i=0,a; a=arr[i++];)
         a.readOnly = set;
      arr = el.getElementsByTagName("BUTTON");
      for (var i=0,a; a=arr[i++];)
         a.disabled = set;
      arr = el.getElementsByTagName("SELECT");
      for (var i=0,a; a=arr[i++];)
         a.disabled = set;
   }
});
