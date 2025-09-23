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
--%><%@page import="java.util.ArrayList"%>
<%@page import="com.ibm.lconn.core.web.util.services.ServiceReferenceUtil"%>
<%@ page contentType="text/json;charset=UTF-8" %><%-- com.ibm.social.ee.gadget.Bootstrap
--%><%!
	String getJsBundleAsString(){
	
		String jsBundle = "";
		final String SEP = ",";
		
		ArrayList<String> jsBundleArray = getJsBundleArray();
		
		for(String script : jsBundleArray){
			jsBundle += script + SEP;
		}
		// remove last '~'
		if(jsBundle.contains(SEP)){
			jsBundle = jsBundle.substring(0, jsBundle.lastIndexOf(SEP));
		}
		 
		return jsBundle;
	}

	ArrayList<String> getJsBundleArray(){
		
		// build script array
		ArrayList<String> jsBundleArray = new ArrayList<String>();
		
		jsBundleArray.add("com.ibm.social.ee.gadget.Bootstrap");

		boolean filesEnabled = ServiceReferenceUtil.isServiceEnabled(ServiceReferenceUtil.Service.FILES);
		
		if(filesEnabled){
			jsBundleArray.add("com.ibm.social.ee.widget.FileLoader");	
		}
		
		return jsBundleArray;
	}
%><% 
	// jsBundle isn't working for lists, so for now lets build the string ourselves
	String jsBundle = getJsBundleAsString();
	//always have gadget check for theme at the client and fallback to default id pipelined in
   	String theme = "{theme}";

	request.setAttribute("jsBundle", jsBundle);
	request.setAttribute("cssBundles", java.util.Arrays.asList(
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/package3{rtl}.css{etag}",
		"/web/_style?include=com.ibm.lconn.core.styles.oneui3/base/connectionsCore{rtl}.css{etag}",
		"/web/_lconntheme/" + theme + ".css?version=oneui3{rtlTF}{etag}",
      "/web/_style?include=com.ibm.lconn.core.styles.oneui3/sprites{rtl}.css{etag}",
      "/web/_lconnappstyles/" + theme + "/eeStyles.css?version=oneui3{rtlTF}{etag}"));
%>