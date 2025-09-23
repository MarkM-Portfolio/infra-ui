<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<%--wscExemptBegin--%>
<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2006, 2015                                    --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>
<%--wscExemptEnd--%>

<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"			uri="http://java.sun.com/jstl/fmt" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title><fmt:message key="jsp.close.title"  /></title>
	<%@ include file="../cnx8ui.jsp" %>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>thanks</title>
	<script type="text/javascript">
		var handleLoad = function() {
			<c:choose>
				<c:when test="${empty goback}">
					try {
						window.close();
					} catch(e){} 
					try{
						parent.editSaved();
					}catch(e){} 
					<c:if test="${servletPath != '/postFeed'}">
					try {
						if (window.opener) {
							if (window.opener.document.getElementById('REFRESH_URL')){
								window.opener.location.href = window.opener.document.getElementById('REFRESH_URL').href;
							}
						}
							//window.opener.location.reload(true);
					} catch(e){}
					</c:if>
				</c:when>
				<c:otherwise>
					window.location.href = '<c:out escapeXml="false" value="${goback}"/>';
				</c:otherwise>
			</c:choose>
			return false;
		}
	</script>
</head>	

<body onLoad="return handleLoad();">
<h1><img src="<c:url value="/images/progressIndicator.gif"/>" alt="Thank You"/></h1>
</body>
</html>
