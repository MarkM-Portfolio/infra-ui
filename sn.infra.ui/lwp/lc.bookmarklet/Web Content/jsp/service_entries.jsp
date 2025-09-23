<%@ page session="false" contentType="application/json; charset=UTF-8" buffer="48kb" %>
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
<%@ taglib prefix="fn" 			uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 			uri="http://java.sun.com/jsp/jstl/fmt" %>
{}&&{
	entries:[
		<c:forEach var="entry" items="${service_entries}" varStatus="vs">
			{label: '<c:out escapeXml="false" value="${entry.titleWithSlashes}" />', 
			 value: '<c:choose><c:when test="${service == 'ownerCommunities'}"><c:out value="${entry.communityId}"></c:out></c:when><c:when test="${service == 'communities'}"><c:out value="${entry.communityId}"></c:out></c:when> <c:when test="${service == 'activities'}"><c:out value="${entry.activityId}"></c:out></c:when><c:when test="${service == 'blogs'}"><c:out value="${entry.entryPostUrl}"></c:out></c:when> <c:otherwise /></c:choose>'}<c:if test="${not vs.last}">,</c:if>
		</c:forEach>
	]
}
