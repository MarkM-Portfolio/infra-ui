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

define([
      "dojo/_base/lang",
      "ic-core/HTMLUtil"
], function(lang, HTMLUtil) {

   /**
    * @namespace ic-core.NameUtil
    * @deprecated Use {@see ic-ui.layout.people} instead
    */
   var NameUtil = lang.mixin(lang.getObject("lconn.core.NameUtil", true), /** @lends ic-core.NameUtil */
   {
      /**
       * @param {String}
       *           name
       * @param {String}
       *           [email]
       * @param {String}
       *           userid
       * @param {String}
       *           [id]
       * @param {Boolean}
       *           [nameIsHTML]
       */
      getHTML : function(name, email, userid, id, nameIsHTML) {
         var escName;
         var escUserid = HTMLUtil.escapeText(userid);
         if (email) {
            var escEmail = HTMLUtil.escapeText(email);
            if (name)
               escName = (nameIsHTML ? name : HTMLUtil.escapeText(name));
            else
               escName = escEmail;
            return '<span' + (id ? ' id="' + id + '"' : '') + '><span class="vcard"><span class="fn person lotusPerson bidiAware">' + escName
                  + '</span><span class="email" style="display: none;">' + escEmail + '</span><span class="x-lconn-userid" style="display: none;">' + escUserid
                  + '</span></span></span>';
         }
         else {
            var escName;
            var escInUserid = HTMLUtil.escapeInlineText(userid);
            if (name)
               escName = (nameIsHTML ? name : HTMLUtil.escapeText(name));
            else
               escName = escUserid;
            return '<span' + (id ? ' id="' + id + '"' : '') + '><span class="vcard"><span class="fn person lotusPerson bidiAware">' + escName
                  + '</span><span class="x-lconn-userid" style="display: none;">' + escUserid + '</span></span></span>';
         }
      }
   });

   return NameUtil;
});
