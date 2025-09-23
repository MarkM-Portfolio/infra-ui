<%@ page session="false" contentType = "text/html; charset=UTF-8" %>
<%--wscExemptBegin--%>
<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- HCL Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright HCL Technologies Limited 2006, 2019                     --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>
<%--wscExemptEnd--%>

<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"			uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="jwr" uri="http://jawr.net/tags"%>
<%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%
String langCookieName = com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper.Factory.getInstance().getLanguageSelectorSettings().getCookieName();
if (langCookieName == null || "".equals(langCookieName)){
	langCookieName = "lang";
}
javax.servlet.http.Cookie[] cookies = request.getCookies();
for(int i=0;i<cookies.length;i++){
	if (langCookieName.equals(cookies[i].getName())){
		javax.servlet.jsp.jstl.core.Config.set(request, javax.servlet.jsp.jstl.core.Config.FMT_LOCALE, cookies[i].getValue());
		break;
	}
}
%>
<c:if test="$(lang==null">
<fmt:setBundle basename="com.ibm.lconn.bookmarklet.resources.resources" var="lang" scope="session"/>
</c:if>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>

		<title><fmt:message key="jsp.login.title" /></title>
		<%@ include file="../cnx8ui.jsp" %>
		<bidi:direction />
		<lc-ui:stylesheets />
	</head>

<body class="lotusLogin lotusui" onload="if (document.getElementById) document.getElementById( 'j_username' ).focus();">
<div class="lotusLoginBox">


	<div class="lotusLoginContent">
		<img src="<c:url value="/jsp/styles/images/iconConnectionsJumboBlue.png" />" alt="<fmt:message key = "jsp.login.connections.logo" />" title="<fmt:message key = "jsp.login.connections.logo" />" />
		<div class="lotusLoginForm">
			<h1><fmt:message key = "jsp.ibm.bookmarks" /></h1>
			<h2>
				<!-- <fmt:message key="jsp.login.intro"/> -->
				&nbsp;
			</h2>
			<form method="post" action="j_security_check">
				<div>
					<label for="j_username"><fmt:message key="jsp.login.label.user" /><br/><img class="lotusIcon" src="<c:url value="/jsp/styles/images/iconError.gif" />" alt="<fmt:message key="jsp.loginerror.error.alt" />" title="<fmt:message key="jsp.loginerror.error.alt" />" /><span class="lotusFormError"><fmt:message key="jsp.loginerror.error" /></span></label>
					<input class="lotusText" type="text" id="j_username" name="j_username" />
				</div>

				<div>
					<label for="j_password"><fmt:message key="jsp.login.password" /></label>
					<input class="lotusText"  type="password" id="j_password" name="j_password" />
				</div>
				<div>
					<input type="submit" id="button" value="<fmt:message key="jsp.login.submit" />" name="login" />
				</div>
			</form>
		</div><!-- end loginText -->


		<div class="lotusDescription">
			&nbsp;
			<!-- <h2><fmt:message key="jsp.login.bookmarklet.use" /></h2> -->
			<!-- <p><fmt:message key="jsp.login.bookmarklet.collab" /></p> -->
		</div>
		</div>

		<table class="lotusLegal" cellspacing="0">
		<tr>
			<td><img class="brandingLogos30 brandingLogos30-ibmLogoBlack30" src="<lc-ui:blankGif />" alt="HCL" /></td>
			<td class="lotusLicense"><fmt:message key="jsp.login.copyright.text" /></td>
		</tr>
		</table>
	</div><!-- end loginBox -->
</div>
<script type="text/javascript">
function checkHighContrast() {
	var vTestHC=document.createElement("div");
	vTestHC.style.border='1px solid';
	vTestHC.style.borderColor='red green';
	vTestHC.style.position='absolute';
	vTestHC.style.height='5px';
	vTestHC.style.top='-999px';
	vTestHC.style.backgroundImage='url<lc-ui:blankGif />)';
	document.body.appendChild(vTestHC);
	var vStyle=null;
	try{
		vStyle=document.defaultView.getComputedStyle(vTestHC, "");
	}catch(e){
		vStyle=vTestHC.currentStyle;
	}
	if (vStyle) {
		var vTestImg=vStyle.backgroundImage;
		if ((vStyle.borderTopColor==vStyle.borderRightColor) || (vTestImg != null && (vTestImg == "none" || vTestImg == "url(invalid-url:)"))){
			document.getElementsByTagName("body")[0].className+=" lotusImagesOff";
		}
	}
}
checkHighContrast();
</script>
</body>
</html>
