<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.io.File" %>

<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2010, 2015                                    --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>

<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"     uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ taglib prefix="fmt"    uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bidi"   uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %>

<%@page import="com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper" %>
<%@page import="com.ibm.ventura.internal.config.api.VenturaConfigurationProvider"%>
<%
VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();

String serviceName = "bookmarklet";
String contextPath = null;

if(provider.isSecureServiceEnabled(serviceName)) {
	contextPath = provider.getSecureServiceURL(serviceName).toString();
} else {
	contextPath = provider.getServiceURL(serviceName).toString();
}

request.setAttribute("loginPostUri", contextPath + "/j_security_check");
request.setAttribute("loginError", Boolean.valueOf(request.getParameter("error")));
request.setAttribute("loginUri", contextPath + "/login");

if (request.isSecure() || !provider.isSecureServiceEnabled(serviceName)) {
	%><jsp:forward page="/nav/templates/login.jsp" /><% 
}
else {
	%><jsp:forward page="/nav/templates/loginRedirect.jsp" /><% 
}			
			
%>