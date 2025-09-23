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

dojo.provide("com.ibm.social.incontext.util.urn");

/* globals com */

(function(){

    var urn = com.ibm.social.incontext.util.urn;

    /**
     * Utility class to extract IDs from URNs.
     *
     * eg to get an orgID from an orgIdURN use com.ibm.social.incontext.util.urn.getOrganizationIdFromURN(urnString)
     *
     * This utility can be extended to handle more URN patterns by adding patterns and getters.
     */

    // common prefix for connections URNs
    var COMMON_IC_URN_PREFIX = "urn:lsid:lconn.ibm.com:";

    // orgId URN prefix
    // urn:lsid:lconn.ibm.com:connections.organization:20000122
    var ORGANIZATION_ID_PREFIX = COMMON_IC_URN_PREFIX + "connections.organization:";

    /**
     * Extracts an ID from an URN string that starts with a given prefix
     *
     * @private
     * @param {string} urnString - the complete URN string
     * @param {string} urnPrefix - the URN string prefix
     * @returns {string} - the ID of the resource
     */
    var getIdFromURN = function(urnString, urnPrefix){

        if(!urnString || !urnPrefix || urnString.indexOf(urnPrefix)!== 0){
            return null;
        }

        return urnString.substring(urnPrefix.length);
    };

    /**
     * Extracts an orgId from an URN string that starts with an orgId prefix
     *
     * @param {string} urnString - the complete URN string
     * @returns {string} - the orgId of the resource
     */
    urn.getOrganizationIdFromURN = function(urnString){

        return getIdFromURN(urnString, ORGANIZATION_ID_PREFIX);
    };

})();

