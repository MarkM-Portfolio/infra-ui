<%
	response.setContentType("application/atom+xml;charset=\"UTF-8\"");
	response.setStatus(409);
%>
<div>409 sent!; Received content-type: <%= request.getHeader("Content-Type") %></div>