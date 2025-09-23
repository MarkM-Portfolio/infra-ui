/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.LoginPage");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("com.ibm.social.ee.widget.LoginPage", [dijit._Widget, dijit._Templated], {
   url: null,
   blankGif: null,
   net: null,
   _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").login,
   templatePath: dojo.moduleUrl("com.ibm.social.ee", "widget/templates/Login.html"),
   postCreate: function() {
      this.inherited(arguments);   
      var body = dojo.query("body")[0];
      dojo.addClass(body, "lotusLogin2");
   },
   authenticate: function(e) {
      dojo.stopEvent(e);
      var body = this._getBody();
      if(body) {
         this.net.postXml({
            url: this.url + "/j_security_check",
            handleAs: "text",
            postData: body,
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            load: dojo.hitch(this, this.authSuccess),
            error: dojo.hitch(this, this.authError)
         });
      }
      else {
         this.error.style.display = "";
      }
   },
   _getBody: function() {
      var user = dojo.byId("username").value;
      var pw = dojo.byId("password").value;
      if (user) {
        return "j_username=" + encodeURI(user) + "&j_password=" + encodeURI(pw);
      }
      return null;
         
   },
   authSuccess: function(response, opts) {},
   authError: function(error, opts) {}
});