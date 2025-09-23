<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2017                                    
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%--
--%><%@ page contentType="text/html;charset=UTF-8" 
%>
<%
    // Use HttpServletRequest.logout() because some TAI's don't support /ibm_security_logout
	request.logout();
	
	String redirectParameter = (String)request.getParameter("post_logout_redirect_uri");
	
	if (redirectParameter == null) {
		redirectParameter = "/";
	}
	
	response.sendRedirect(redirectParameter);
%>
