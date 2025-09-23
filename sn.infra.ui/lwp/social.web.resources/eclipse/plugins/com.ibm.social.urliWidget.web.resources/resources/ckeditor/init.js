/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
define([
        "dojo",
        "dojo/aspect",
        "lconn.box/ckeditor/link",
        "lconn.box/ckeditor/embed",
        "lconn.core/ckeditor"
        ],
function(dj, aspect,link, embedPreview, ckeditor) {
   
   aspect.after(ckeditor, "cbCustomConfigApplied", function(opts) {
      var isLite;
      var isTrue;
      if (dj.exists("lite", opts)){
         isLite = opts.lite;
       }
      if(dj.exists("lconn.share.util.configUtil.isBoxlinksEnabledForCkeditor")){
         isTrue = lconn.share.util.configUtil.isBoxlinksEnabledForCkeditor();
       }
      if (!isLite && isTrue) {
         link.addPlugin(opts);
         if(opts.toolbar !== "CommToolbar" &&  (lconn.calendar === undefined || lconn.calendar && lconn.calendar.ckeditor === undefined)){
            embedPreview.addPlugin(opts);
         }
         
      }

   });
})
