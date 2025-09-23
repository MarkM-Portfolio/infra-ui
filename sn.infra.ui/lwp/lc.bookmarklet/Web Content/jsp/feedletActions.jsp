<%@ page session="false" contentType="text/javascript; charset=UTF-8"
	buffer="128kb"%>
<%@ page import="com.ibm.lconn.config.ConnectionsConfiguration" %>
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
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="coreui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>

 var feedMarkletActions = {

	actions:[
		<%if(new ConnectionsConfiguration().isCommunitiesEnabled()){%>
		{
		'href':"javascript:feedMarkletActions.feedPopUp(\'%l\')",
		'text':"<coreui:escapeQuote><fmt:message key="jsp.feed.add.communities" /></coreui:escapeQuote>"
		}, <%}%>
		{'href':"%l",
		'text':"<coreui:escapeQuote><fmt:message key="jsp.feed.add.browser" /></coreui:escapeQuote>"}],
	feedPopUp:function(location) {
		var urlStr = encodeURIComponent(location);
		<%if(new ConnectionsConfiguration().isBookmarkletEnabled()){
			request.setAttribute("bookmarkServiceUrl", new ConnectionsConfiguration().getBookmarkletServiceUrl(request.isSecure()));
		%>
		window.open('${bookmarkServiceUrl}/postFeed?lang=<%=request.getLocale()%>&addToCommunities=true&ver=ignore&url='+urlStr, 'feed', 'toolbars=no,scrollbars=yes,resizable=yes,width=670,height=600');
		<%}%>
	}
}
