/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([ "dojo/_base/declare"
], function(declare) {

   declare("com.ibm.mm.enabler.status.StatusType", null, {
      constructor : function(/* int */id, /* String */styleClass, /* String */iconPath, /* String */colorStr) {
         this._id = id;
         this._styleClass = styleClass;
         this._iconPath = iconPath;
         this._color = colorStr; // status color fader start color for this
         // class
      }
   });

   declare("com.ibm.mm.enabler.status.StatusMessage", null, {
      constructor : function(/* int */type, /* String */message, /* String */details) {
         this._type = type;
         this._message = message;
         this._details = details;
      },
      render : function(containerNode) {

         var statusType = com.ibm.mm.enabler.status.statusTypesMap[this._type];

         // status entry base container
         var entry = document.createElement("div");
         entry.className = statusType._styleClass;

         // summary header - the colored area of each status message
         var header = document.createElement("h5");
         // Lefthandside (LHS) contains icon, message, and show/hide details
         var header_LHS = document.createElement("div");
         header_LHS.className = "statusHeaderLHS";
         var icon = document.createElement("img");
         icon.src = statusType._iconPath;
         header_LHS.appendChild(icon);
         header_LHS.appendChild(document.createTextNode(this._message));
         header.appendChild(header_LHS);
         entry.appendChild(header);

         var detailsDiv = document.createElement("div");
         detailsDiv.className = "details";
         detailsDiv.appendChild(document.createTextNode(this._details));
         entry.appendChild(detailsDiv);
         containerNode.appendChild(entry);
      }
   });

   declare("com.ibm.mm.enabler.status.StatusTypesMap", null, {
      constructor : function() {
         this._baseURL = new dojo.moduleUrl("com.ibm.mm.enabler", "iw/");
         this.error = new com.ibm.mm.enabler.status.StatusType(0, "error", this._baseURL + "error.gif", "#FF0000");
         this.warn = new com.ibm.mm.enabler.status.StatusType(1, "warning", this._baseURL + "warning.gif", "FFFF00");
         this.info = new com.ibm.mm.enabler.status.StatusType(2, "info", this._baseURL + "info.gif", "#0077FF");
         this.constants = {
            "ERROR" : "error",
            "WARN" : "warn",
            "INFO" : "info"
         };
      }
   });

   com.ibm.mm.enabler.status.statusTypesMap = new com.ibm.mm.enabler.status.StatusTypesMap();

   return com.ibm.mm.enabler.status;
});
