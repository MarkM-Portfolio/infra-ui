<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2009, 2013                                    
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%--
--%><%@ page contentType="text/html;charset=UTF-8" 
%><%@ page import="java.net.URI,
                 com.ibm.ventura.internal.config.api.VenturaConfigurationProvider,
                 com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper,
                 com.ibm.lconn.core.url.LCUrlUtil"
%><%

VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();

boolean loginFailed = Boolean.valueOf(request.getParameter("error")).booleanValue();
boolean isSecure = Boolean.TRUE.equals(request.getAttribute("isSecure"));
String redirectParameter = (String)request.getAttribute("redirectParameter");
boolean isAuthenticated = request.getRemoteUser() != null;

String serviceName = getServletContext().getInitParameter("service.name");
if (serviceName == null || serviceName.trim().length() == 0) {
   throw new ServletException("The servlet context init parameter 'service.name' must be set");
}

String loginPostUri = request.getContextPath() + "/j_security_check";

String redirectQuery = null;
String redirectBase = null;
if (redirectParameter != null) {
   URI uriRedirect = new URI(redirectParameter);
   redirectQuery = uriRedirect.getQuery();
   if (redirectQuery == null)
      redirectQuery = "";
   redirectBase = LCUrlUtil.buildRawUri(null, uriRedirect.getScheme(), uriRedirect.getRawAuthority(), uriRedirect.getRawPath(), (String)null, null).toString();
}

request.setAttribute("loginPostUri", loginPostUri);
request.setAttribute("loginError", loginFailed);

request.setAttribute("hasRedirect", (redirectParameter != null));
request.setAttribute("redirectParameter", redirectParameter);
request.setAttribute("redirectBase", redirectBase);
request.setAttribute("redirectQuery", redirectQuery);
request.setAttribute("isAuthenticated", isAuthenticated);

if (request.isSecure() || !(helper.getForceConfidentialCommunications() || provider.isSecureServiceEnabled(serviceName))) {
   %><jsp:forward page="/nav/templates/login.jsp" /><% 
}
else {
   String query = "secure=" + request.isSecure() + (loginFailed ? "&error=true" : "");
   String loginUri = provider.getSecureServiceURL(serviceName).toString() + "/login?" + query;
   request.setAttribute("loginUri", loginUri);

   %><jsp:forward page="/nav/templates/loginRedirect.jsp" /><% 
}
%>
