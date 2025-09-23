<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2011, 2014                                    
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%-- 
--%><%@ page contentType="text/json;charset=UTF-8" %><%-- com.ibm.social.ee.gadget.Bootstrap
--%><% 
	request.setAttribute("jsBundle", "lconn.calendar.calendarGadgetApp");
	request.setAttribute("cssBundles", java.util.Arrays.asList(
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/package3{rtl}.css{etag}",
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/sprites{rtl}.css{etag}",
		"/web/_lconntheme/default.css?version=oneui3{rtlTF}{etag}"));
%>