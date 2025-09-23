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
 * Internal helper that hooks into the Wikis application
 */
var helper = dojo.provide("com.ibm.social.appext.hooks.wikis");

dojo.require("com.ibm.social.appext.wikis");
dojo.require("lconn.wikis.scenes.WikiPage");

helper.applyPageActions = function() {
   helper._applyPageActions.apply(lconn.wikis.scenes.WikiPage, arguments);
   
   var args = dojo._toArray(arguments), div = args[1], item = args[2];
   
   for (var i = 0, btn, btns = com.ibm.social.appext.wikis.getButtons(); i < btns.length; i++) {
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
};

dojo.addOnLoad(function(){
   // Store a reference to old method
   helper._applyPageActions = lconn.wikis.scenes.WikiPage.applyPageActions;
   // Redeclare method
   lconn.wikis.scenes.WikiPage.applyPageActions = helper.applyPageActions;
});

})();
