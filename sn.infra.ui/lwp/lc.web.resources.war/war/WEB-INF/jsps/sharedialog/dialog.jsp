<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2013                                          
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" 
%><%@ taglib prefix="lc-nav" uri="http://www.ibm.com/lconn/tags/corenav" 
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<lc-ui:stylesheets />
	<link rel="stylesheet" type="text/css" href="../web/com.ibm.social.sharebox/css/iframeDialog.css"></link>
	
	<lc-ui:dojo include="com.ibm.social.sharebox.iframe" />
	<script type="text/javascript">
	   dojo.addOnLoad(function() {
	      com.ibm.social.sharebox.iframe.init();
	   });
	</script>
</head>
<body id="body" class="lotusui lotusui30dojo lotusui30 lotusui30_fonts lotusui30_body <lc-ui:languageClassname />">
</body>
</html>