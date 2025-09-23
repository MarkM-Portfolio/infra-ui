<%-- ********************************************************************* --%><%--
--%><%--                                                                   --%><%--
--%><%-- HCL Confidential                                                  --%><%--
--%><%--                                                                   --%><%--
--%><%-- OCO Source Materials                                              --%><%--
--%><%--                                                                   --%><%--
--%><%-- Copyright HCL Technologies Limited 2022                           --%><%--
--%><%--                                                                   --%><%--
--%><%-- The source code for this program is not published or otherwise    --%><%--
--%><%-- divested of its trade secrets, irrespective of what has been      --%><%--
--%><%-- deposited with the U.S. Copyright Office.                         --%><%--
--%><%--                                                                   --%><%--
--%><%-- ***************************************************************** --%><%--
--%><%
    if (request.getAttribute("requestUser") == null || ((String)request.getAttribute("requestUser")).isEmpty()) {
        String requestUser = request.getRemoteUser();
        request.setAttribute("requestUser", requestUser);
    }
%><%--
--%><%@ include file="/nav/templates/cnx8-react.jspf" %>