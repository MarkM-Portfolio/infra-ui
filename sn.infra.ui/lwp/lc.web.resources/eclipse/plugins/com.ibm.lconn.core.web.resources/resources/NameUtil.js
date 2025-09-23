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

dojo.provide("lconn.core.NameUtil");

dojo.require('lconn.core.HTMLUtil');

lconn.core.NameUtil = {
    getHTML: function(name, email, userid, /*string, opt.*/ id, /*bool, opt*/ nameIsHTML) {
        var escName;
        var escUserid = lconn.core.HTMLUtil.escapeText(userid);
        if (email){
            var escEmail = lconn.core.HTMLUtil.escapeText(email);
            if ( name )
                escName = (nameIsHTML ? name : lconn.core.HTMLUtil.escapeText(name));
            else
                escName = escEmail;      
            return '<span' + (id ? ' id="' + id + '"' : '') + '><span class="vcard"><span class="fn person lotusPerson bidiAware">' + escName + '</span><span class="email" style="display: none;">' + escEmail + '</span><span class="x-lconn-userid" style="display: none;">' + escUserid + '</span></span></span>';
        }
        else{
            var escName;
            var escInUserid = lconn.core.HTMLUtil.escapeInlineText(userid);
            if ( name )
                escName = (nameIsHTML ? name : lconn.core.HTMLUtil.escapeText(name));
            else
                escName = escUserid;    
            return '<span' + (id ? ' id="' + id + '"' : '') + '><span class="vcard"><span class="fn person lotusPerson bidiAware">' + escName + '</span><span class="x-lconn-userid" style="display: none;">' + escUserid + '</span></span></span>';
        }
    }
};
