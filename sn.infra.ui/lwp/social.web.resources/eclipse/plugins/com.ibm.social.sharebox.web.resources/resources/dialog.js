/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.dialog");
dojo.require("com.ibm.social.sharebox.controls.ShareboxDialog");

(function(){
   
   var sbd = com.ibm.social.sharebox;
      sbd._instance = null;
      sbd._ctxInstance = null;
      sbd.GLOBAL = sbd.controls.GLOBAL;
      sbd.COMMUNITY = sbd.controls.COMMUNITY;
      sbd.INIT_CTX_COMPLETE = "com/ibm/social/sharebox/dialog/initContextComplete";
      sbd.INIT_GLOBAL_COMPLETE = "com/ibm/social/sharebox/dialog/initGlobalComplete";
   sbd._isGlobal = function(ctx) {
      return !(ctx && ctx.type && (ctx.type != sbd.GLOBAL));
   };
   sbd._getInstance = function(ctx) {
		  var inst = null;
	      if(!sbd._isGlobal(ctx)) {
	    	 inst = sbd._ctxInstance;
	         if(!inst) {
	            inst = sbd._ctxInstance = new com.ibm.social.sharebox.controls.ShareboxDialog(ctx);
	    		dojo.publish(sbd.INIT_CTX_COMPLETE);
	         }
	      }
	      else {
	         inst = sbd._instance;
	         if(!inst) {
	    	    inst = sbd._instance = new com.ibm.social.sharebox.controls.ShareboxDialog(ctx);
	    	    dojo.publish(sbd.INIT_GLOBAL_COMPLETE);
	         }
	      }
	      return inst;
   };
   sbd._instanceOpen = function() {
	   return (sbd._ctxInstance && sbd._ctxInstance.isOpen()) || 
	      (sbd._instance && sbd._instance.isOpen());
   };
   sbd._instanceInited = function(ctx) {
	   return sbd._isGlobal(ctx) ? (sbd._instance != null): (sbd._ctxInstance != null);
   };
   sbd.init = function(ctx) {
      if(!sbd._initInProgress) {
         sbd._initInProgress = true;
         if(!sbd._instanceInited(ctx)) {
            sbd._getInstance(ctx);
         }
         sbd._initInProgress = false;
      }
      return;
   };
   sbd._openDialog = function(ctx) {
       dojo.publish("com/ibm/social/sharebox/dialog/opening");
       sbd._getInstance(ctx).open();
   };
   sbd.show = function(ctx) {
      if(!sbd._showInProgress) {
         sbd._showInProgress = true;
         if(!sbd._instanceOpen()) {
        	if(!sbd._initInProgress) {
        		sbd._openDialog(ctx);
        		sbd._showInProgress = false;
        	} else {
        		dojo.subscribe(sbd._isGlobal(ctx) ?
        				sbd.INIT_GLOBAL_COMPLETE : sbd.INIT_CTX_COMPLETE, dojo.hitch(null, function(sbd, ctx) {
        					sbd._openDialog(ctx);
        					sbd._showInProgress = false;
        				}, sbd, ctx));
        	}
         } else {
        	 sbd._showInProgress = false;
         }
	  } else
		  return;
   };

   sbd.hide = function(ctx) {
      sbd._getInstance(ctx).close();
   };
})();
