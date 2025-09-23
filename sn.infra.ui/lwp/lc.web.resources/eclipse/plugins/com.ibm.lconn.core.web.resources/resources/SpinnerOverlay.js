/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.SpinnerOverlay");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.Res");

/**
 * The load animation shows a spinner and says "loading". It is used for ajax
 * loading.
 * 
 * @class lconn.core.SpinnerOverlay
 */

dojo
      .declare("lconn.core.SpinnerOverlay",
         [
               dijit._Widget,
               lconn.core.Res,
               dijit._Templated
         ],
         /** @lends lconn.core.SpinnerOverlay.prototype */
         {
            // BASE CLASS SETTINGS
            templateString : "<div class='SpinnerOverlay' dojoAttachPoint='root_AP'><div style='${spinnerDisplay}' class='spinner'>&nbsp;</div><div dojoAttachPoint='loadingText_AP'>${rs_loading}</div></div>",

            // RESOURCE KEYS
            rs_loading : 'rs_loading',

            hasSpinner : true, // Pass false here if you want it to just say
            // "loading..."
            spinnerDisplay : '',

            // to be run by Res at runtime
            postMixInProperties : function() {
               this.rs_loading = this.getString(this.rs_loading);
               if (!this.hasSpinner) {
                  this.spinnerDisplay = "display: none;";
               }
            },

            // OTHER MEMBERS
            overlaidNode : null, // the node that this overlay will cover

            postCreate : function() {},

            showSpinner : function() {
               this.root_AP.style.display = "block";
               if (this.overlaidNode) {
                  // If there is an overlaid node, dim it and set width to its
                  // width
                  dojo.addClass(this.overlaidNode, "fadedOut");
                  // check position of overlaid node
                  try {
                     var divInfo = dojo.position(this.overlaidNode, true);
                  }
                  catch (e) {
                     console.error(e);
                  }
                  if (divInfo && divInfo.h > 0) {
                     // if overlaid node is visible, position absolute over top
                     // of it
                     this.root_AP.style.position = "absolute";
                     dojo.style(this.root_AP, {
                        left : Math.round(divInfo.x) + "px",
                        top : Math.round(divInfo.y) + "px",
                        width : Math.round(divInfo.w) + "px",
                        height : Math.round(divInfo.h) + "px"
                     });
                  }
                  else {
                     // otherwise just position relative & auto width
                     this.root_AP.style.height = "auto";
                     this.root_AP.style.width = "auto";
                     this.root_AP.style.position = "relative";
                  }
               }
               else {
                  // just display a normal spinner
                  this.root_AP.style.position = "static";
                  this.root_AP.style.width = "auto";
                  this.root_AP.style.height = "auto";
               }
            },

            hideSpinner : function() {
               this.root_AP.style.display = "none";
               this.root_AP.style.position = "static";
               this.root_AP.style.width = "1px";
               this.root_AP.style.height = "1px";

               if (this.overlaidNode) {
                  dojo.removeClass(this.overlaidNode, "fadedOut");
               }
            }

         });
