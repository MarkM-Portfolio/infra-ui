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
--%><%@ page contentType="text/json;charset=UTF-8" %><%-- com.ibm.social.ee.gadget.Bootstrap
--%><% 
	String theme = com.ibm.lconn.core.web.css.ThemeConfiguration.getDefaultThemeId();
	//put placeholder if no theme defined - the client can override
  	if(theme == null || "".equals(theme) || "none".equals(theme)){
  		theme = "{theme}";
  	}
	request.setAttribute("jsBundle", "lconn.news.microblogging.sharebox.sharebox");
	request.setAttribute("cssBundles", java.util.Arrays.asList(
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/package3{rtl}.css{etag}",
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/connectionsCore{rtl}.css{etag}",
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/sprites{rtl}.css{etag}",	
		"/web/_lconntheme/" + theme + ".css?version=oneui3{rtlTF}{etag}",
		"/web/_style?include=com.ibm.lconn.core.styles/base/applications/profiles.css&version=oneui3{rtlTF}{etag}"));
%>