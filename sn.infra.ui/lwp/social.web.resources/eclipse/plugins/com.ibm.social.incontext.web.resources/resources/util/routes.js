/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*																	 */
/* @author Marco Vicente                                             */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.routes");
dojo.require("lconn.core.auth");
dojo.require("com.ibm.social.as.util.RouteHelper");

/* globals com, lconn */

(function(){

    var routes = com.ibm.social.incontext.util.routes;

    /**
     * Common object to handle routing across widgets and gadgets.
     * The idea would be that common features would get their route info from here.
     * At the moment this is mostly handling the use of oauth on community member checking, the logic being:
     *
     * 1) activity stream
     * useOauth is a property from XhrHandler, so we retrieve it from there. two usual scenarios would be AS running
     * as a widget on homepage (no oauth) or in as a standalone gadget (with oauth)
     *
     * 2) global sharebox
     * doesn't use oauth, the XhrHandler won't be in context
     *
     * 3) embedded experience
     * although it uses oauth, XhrHandler won't be in context, and at the moment the EE is handling
     * the oauth routing itself through com.ibm.social.ee.widget.MentionsCommunityMemberChecker,
     * by overriding the _networkGet method.
     */

    /**
     * Returns a route helper object that handles connections endpoints and access levels (eg oauth, anonymous)
     *
     * @returns {com.ibm.social.as.util.RouteHelper}
     */
    routes.getRouteHelper = function(){

        var xhrHandler = dojo.getObject("com.ibm.social.as.util.xhr.XhrHandler");

        var useOauth = xhrHandler && xhrHandler.useOauth;

        var loggedUser = lconn.core.auth.getUser();

        var cfg = {
            userInfo : loggedUser
        };

        var options = {
            useOAuth : useOauth,
            cfg: cfg
        };

        return new com.ibm.social.as.util.RouteHelper(options);
    };

})();

