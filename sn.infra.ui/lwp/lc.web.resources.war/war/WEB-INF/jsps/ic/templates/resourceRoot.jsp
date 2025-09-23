<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2011, 2015                                    
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%-- 
--%><%@ page contentType="text/json;charset=UTF-8" import="com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper,com.ibm.lconn.core.web.css.ThemeConfiguration,com.ibm.lconn.core.web.gatekeeper.LCUXFeatures,java.io.IOException"%><%--
--%><%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %><%--
--%><%@ taglib prefix="core" uri="http://www.ibm.com/lconn/tags/components"%><%--
--%><%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %><%--
--%><%@ taglib prefix="lc-fn" uri="http://www.ibm.com/lconn/tags/corefn" %><%--
--%>{<%--
--%>"versionStamp":"<lc-cache:versionStamp />",<%--
--%>"scripts":${scriptData},<%--
--%>"css":${cssData},<%--
--%>"http":${httpConf},<%--
--%>"https":${httpsConf},<%--
--%>"preloadJS": <%= (VenturaConfigurationHelper.Factory.getInstance().getPreloadJS()) ? "true" : "false" %>,<%--
--%>"preloadJSSafari": <%= (VenturaConfigurationHelper.Factory.getInstance().getPreloadJSSafari()) ? "true" : "false" %>,<%--
Comment: This was using the S2S request to determine if the client needed to use SSL, changing to just tell the client if SSL is forced
--%>"isSSL": <%= VenturaConfigurationHelper.Factory.getInstance().getForceConfidentialCommunications() ? true : false %>,<%--
--%>"theme": "<%=com.ibm.lconn.core.web.css.ThemeConfiguration.getDefaultThemeId()%>",<%--
--%>"gatekeeper": ${gatekeeperConf}<%--
--%>}
