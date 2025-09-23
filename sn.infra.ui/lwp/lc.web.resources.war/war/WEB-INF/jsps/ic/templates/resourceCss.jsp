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
--%><%@ page contentType="text/json;charset=UTF-8" %><%--
--%><%@ page import="java.util.*" %><%--
--%><%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" --%><%--
--%><%@ taglib prefix="core" uri="http://www.ibm.com/lconn/tags/components"%><%--
--%><%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %><%--
--%><%@ taglib prefix="lc-fn" uri="http://www.ibm.com/lconn/tags/corefn" %><%--
--%><lc-cache:versionStamp var="versionStamp"/><%--
--%>[<% 
final List<String> cssBundles = (List<String>) request.getAttribute("cssBundles");

final Map<String, String> cssBaseToID = new HashMap<String, String>();

//This is a mapping of CSS urls to id - only one of any id should be used in the Connections gadget JSP file e.g connectionsEE.jsp
//The id is required to be re-inserted by the gadget iframe to allow proper init for lconn.core.theme packages
cssBaseToID.put("/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/package3{rtl}.css{etag}", "lotusBaseStylesheet");
cssBaseToID.put("/web/_style?include=com.ibm.lconn.core.styles.oneui3/sprites{rtl}.css{etag}", "lotusSpritesStylesheet");
cssBaseToID.put("/web/_lconntheme/default.css?version=oneui3{rtlTF}{etag}", "lotusThemeStylesheet");
cssBaseToID.put("/web/_lconntheme/"+com.ibm.lconn.core.web.css.ThemeConfiguration.getDefaultThemeId()+".css?version=oneui3{rtlTF}{etag}", "lotusThemeStylesheet");
cssBaseToID.put("/web/_lconntheme/{theme}.css?version=oneui3{rtlTF}{etag}", "lotusThemeStylesheet");

// path bundles
if (cssBundles != null) {
	boolean isFirst = true;
	for (String cssBundle : cssBundles) {
		pageContext.setAttribute("cssBundleUrl", cssBundle);
		if (isFirst) {
			isFirst = false;
		} else {
			%>,<%
		}
		
		final String id = cssBaseToID.get(cssBundle);
		
		if (id != null) {
			%>["<lc-ui:escapeJavaScript>${cssBundleUrl}</lc-ui:escapeJavaScript>","<%=id%>"]<%
		} else {
			%>"<lc-ui:escapeJavaScript>${cssBundleUrl}</lc-ui:escapeJavaScript>"<%
		}
	}
}
%>]