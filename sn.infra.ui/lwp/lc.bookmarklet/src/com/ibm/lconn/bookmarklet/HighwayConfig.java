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
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.connections.highway.client.api.HighwayAdminClient;
import com.ibm.connections.highway.client.api.HighwaySetup;
import com.ibm.connections.highway.common.api.HighwayException;
import com.ibm.connections.highway.common.api.HighwaySettingNames;
import com.ibm.connections.highway.common.api.HighwayUserSessionInfo;

public class HighwayConfig {

	private static final Log logger = LogFactory.getLog(HighwayConfig.class);

	private static String SETTINGS_DOGEAR_ALLOW_STANDALONE = "dogear.allow.standalone";
	private static HighwayAdminClient client = HighwaySetup.getHighwayAdminClient("dogear");
	private HighwayUserSessionInfo highwaySession = null;

	private Boolean isExternalUser = null;
	private Boolean allowStandAlone = null;
	

	public HighwayConfig(HttpServletRequest request) throws ServletException {
		highwaySession = HighwaySetup.createUserInfoFromRequest(request);
	}

	public HighwayConfig(String extId, String orgId) throws ServletException {
		highwaySession = HighwaySetup.createUserSessionInfo(extId, orgId);
	}
	

	public boolean isExternalUser() {
		if(logger.isDebugEnabled()) {
			for(String role : highwaySession.getRoles()) {
				logger.debug("role: " + role);
			}
		}
		if (isExternalUser == null) {
			isExternalUser = highwaySession.getRoles().contains(HighwaySettingNames.EXTERNALUSER_ROLE);
		} else {
			isExternalUser = false;
		}
		return isExternalUser;
	}

	public boolean allowStandAloneBookmarks() {
		if (allowStandAlone == null) {
			try {
				allowStandAlone = !"false".equalsIgnoreCase((String) client.getSetting(highwaySession, SETTINGS_DOGEAR_ALLOW_STANDALONE));
			} catch (HighwayException e) {
				logger.error("error occurs while get setting:", e);
				allowStandAlone = true;
			}
		}
		return allowStandAlone;
	}


}
