/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

/**
 * Internal helper that hooks into the Files application
 */
var helper = dojo.provide("com.ibm.social.appext.hooks.files");

dojo.require("com.ibm.social.appext.files");
dojo.require("lconn.share.scenes.actions");

helper.renderButtons = function() {
   var div = helper._renderButtons.apply(lconn.share.scenes.actions, arguments);
   
   var args = dojo._toArray(arguments), item = args[2];
   
   for (var i = 0, btn, btns = com.ibm.social.appext.files.getButtons(); i < btns.length; i++) {
      btn = btns[i];
      switch (btn.pos) {
         case "first":
            div.insertBefore(btn.btn, div.firstChild);
            break;
         case "only":
            while (div.lastChild)
               div.removeChild(div.lastChild);
            // Note there's no break; continue to append child
         case "last":
         default:
            div.appendChild(btn.btn);
      }
      // TODO: is onclick always the right event?
      dojo.connect(btn.btn, "onclick", dojo.partial(btn.fn||function(item){alert(item.getName());}, item));
   }
   
   return div;
};

/**
 * This code adds the hooks into the Files application
 */
dojo.addOnLoad(function(){
   // Store a reference to old method
   helper._renderButtons = lconn.share.scenes.actions.renderButtons;
   // Redeclare method
   lconn.share.scenes.actions.renderButtons = helper.renderButtons;
});

})();
