<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2014                                          
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" 
%><%@ taglib prefix="lc-nav" uri="http://www.ibm.com/lconn/tags/corenav" 
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  	<!--[if IE 6]><script>document.getElementsByTagName("html")[0].className+=" lotusui_ie lotusui_ie6";</script><![endif]-->
    <!--[if IE 7]><script>document.getElementsByTagName("html")[0].className+=" lotusui_ie lotusui_ie7";</script><![endif]-->
    <!--[if IE 8]><script>document.getElementsByTagName("html")[0].className+=" lotusui_ie8";</script><![endif]-->
    <!--[if IE 9]><script>document.getElementsByTagName("html")[0].className+=" lotusui_ie9";</script><![endif]-->
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	
	<% 
		String asModules = "com.ibm.social.as.gadget.activityStreamComponentModule";
		String includeSharebox = request.getParameter("showSharebox");
		if(includeSharebox == null || Boolean.valueOf(includeSharebox)){
			asModules += ",com.ibm.social.as.gadget.activityStreamShareBoxModule";
		}	
	%>
			
	<lc-ui:dojo include="<%=asModules %>" />

	<script type="text/javascript">
		com.ibm.social.as.gadget.component.ActivityStreamInit.start();
	</script> 			
</head>
<body class="lotusui lotusui30dojo lotusui30_body asGadget lotusui30_fonts lotusui30  lotusSpritesOn" aria-labelledby="needAuth" id="asBody">
	<div id="lotusFrame" class="lotusFrame lotusui30_layout">
		<div id="gadgetMainContent">
			<div id="loadingDiv" style="width: 100%; height: 100%; margin-top: 40px; text-align: center;">
				<img src="web/com.ibm.lconn.core.styles.oneui3/images/loading.gif"/>
			</div>
			<div id="errorDiv" class="lotusHidden" style="width: 100%; height: 100%; margin-top: 40px; text-align: center;">
				
			</div>
			<div id="lotusMain" class="lotusMain lotusHidden">
				<div id="lotusColLeft" class="lotusColLeft lotusHidden">
					<div id="viewsidenav"></div>
				</div>
				<div id="lotusContent" class="lotusContent lotusBoard activityStreamGadgetContainer" role="main">
					<div><div id="asheader"></div></div>
					<div><div id="inputForm"></div></div>
					<div><div id="messageContainer"></div></div>
					<div><div id="activityStream" class="lotusStream"></div></div>
				</div>
			</div>
		</div>
		<div id="waiting" style="display:none">
			<img class="eeOAuthImg" role="presentation" aria-hidden="true"/>
			<div class="eeOAuthBodyContent">
				<div class="eeOAuthInfo"></div>
				<div id="oAuthQuestionWait" class="lotusChunk"></div>
			</div>
		</div>
	</div>
</body>
</html>