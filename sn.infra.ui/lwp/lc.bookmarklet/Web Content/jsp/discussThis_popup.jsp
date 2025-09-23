<%@ page session="false" contentType="text/html; charset=UTF-8" buffer="48kb" %>
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

<%@ taglib prefix="coreui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %>
<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="hu" 			uri="http://www.ibm.com/bookmarklet/tags/htmlutil" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		  
<%-- checkVersion should be set true, if version check is needed. --%>
<c:set var="checkVersion" value="%{'false'}" /> 
<c:set var="appName" value="bookmarklet" />
		  
<html xmlns="http://www.w3.org/1999/xhtml" lang="${locale}">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<title><fmt:message key="jsp.discussThis.pageTitle" /></title>
		<%@ include file="../cnx8ui.jsp" %>
		<link rel="shortcut icon" href="<lc-cache:uri template="{webResourcesRoot}/web/com.ibm.oneui3.styles/imageLibrary/Branding/Other/ConnectionsBlue16.ico" />" type="image/x-icon">
		<bidi:direction />
		<coreui:dojo include="lconn.bookmarklet.app">
			djConfig.parseEnabled = false;			
		</coreui:dojo>
		<coreui:stylesheets />
		<coreui:serviceLink serviceName="communities" var="urlCommunitiesProxied" useProxy="true" />
		<coreui:serviceLink serviceName="forums" var="urlForumsProxied" useProxy="true" />
		<script type="text/javascript">
			var topicContent;
			var typeAhead;
			var comment ; 
			var emptyTitleErrorMsgBox;
			var invalidForumErrorMsgBox;
			var externallySharedWarningMsgBox;
			
			function fillDialog(data) {
			    // Input text for new title;
			    // leave it blank.
			    // dojo.byId("name").value = data.title;
			    
			    // Presentation for the discuss content. The content is renderred via HTML. It's only readable.
				var topicName = dojo.byId("topicName");
				topicName.innerHTML = "";
				dojo.place(document.createTextNode(data.title), topicName);
		
				var topicDescription = dojo.byId("topicDescription");
				if (data.findBy == "DF") {
				    topicDescription.innerHTML = data.description;
				} else {
				    dojo.place(document.createTextNode(data.description), topicDescription);
				}				
				
				if (data.findBy == 'meta') {
				   if (data.find == "video") {
				       if (data.video) {
                           var topicVideo = dojo.byId('topicVideo');
                           topicVideo.innerHTML = '<iframe width="'+data.videoWidth+'" height="'+data.videoHeight+'" src="'+data.video+'" frameborder="0" allowfullscreen></iframe>';
    		           }
                    } else {
                       if (data.image) {
				           var topicImage = dojo.byId('topicImage');
				           topicImage.innerHTML = '<img alt="" src="'+data.image+'"></img>';
				       }
                    }  
				}
		
				var topicAttachments = dojo.byId("topicAttachments");
				topicAttachments.innerHTML = data.attachments;
		
				if (data.date && data.author) {
				    var topicDate = dojo.byId("topicDate");
					topicDate.innerHTML = data.date;
					var topicAuthor = dojo.byId("topicAuthor");
					topicAuthor.innerHTML = data.author;					
				} else {
					dojo.byId("topicMeta").style.display = "none";
				}
			}
			
			function forumTypeChanged() {
				var externallySharedWarning = dojo.byId("externallySharedWarning");
				externallySharedWarning.style.display = "none";
				
				dojo.byId("typeahead").value = "";
				typeAhead.updateHintText('<fmt:message key="jsp.discussThis.forums.hint" />', true);
				typeAhead.store.clear();
				typeAhead.store.url = "${urlForumsProxied}/ajax/forumTypeAhead?view=" + dojo.byId("view").value;
			}
			
	    //disable the submit button.
	 	function disableSubmit(){ 
			var addPost=dojo.byId("addPost");
			var canclePost=dojo.byId("canclePost");
			dojo.addClass(addPost, "lotusBtnDisabled");
			dojo.addClass(canclePost, "lotusBtnDisabled");
			addPost.disabled="disabled";
			canclePost.disabled="disabled";
			var savingImg = dojo.byId("discussThisSavingImg");
			dojo.removeClass(savingImg, "lotusHidden");
			var savingText = dojo.byId("discussThisSavingText");
			dojo.removeClass(savingText, "lotusHidden");
    	} 
    
    	//enable the submit button.
    	function enableSubmit() { 
			var addPost=dojo.byId("addPost");
			var canclePost=dojo.byId("canclePost");
			dojo.removeClass(addPost, "lotusBtnDisabled");
			dojo.removeClass(canclePost, "lotusBtnDisabled");
			addPost.disabled = "";
			canclePost.disabled = "";
			var savingImg=dojo.byId("discussThisSavingImg");
			dojo.addClass(savingImg, "lotusHidden");
			var savingText=dojo.byId("discussThisSavingText");
			dojo.addClass(savingText, "lotusHidden");
    	}
    	
			function save() {
				disableSubmit();
				var error = false;				
				var parentId = dojo.byId("parentId").value;
				var parent = dojo.byId("typeahead").value;
				var emptyForumError = dojo.byId("invalidForumError");
				if (parentId == "" || parent == "") {
					emptyForumError.style.display = "block";
					error = true;
				} else
					emptyForumError.style.display = "none";
				
				var title = dojo.byId("name").value;
				var emptyTitleError = dojo.byId("emptyTitleError");
				if (title == "") {
					emptyTitleError.style.display = "block";
					error = true;
				} else
					emptyTitleError.style.display = "none";
				
				if (error) {
					enableSubmit();
					goTop();
					return false;
				}
				//var comment = dojo.byId("comment").value;
				if(comment && comment.getContent)
					topicContent.comment = comment.getContent();
				else
					topicContent.comment = dojo.byId("comment").value;
				topicContent.newTitle = title;
				var pin = dojo.byId("pinCheckbox");
				var question = dojo.byId("questionCheckbox");
				var topicFeed = topicContent.getTopicFeed(question.checked, pin.checked);
				dojo.xhrPost({
					url: "${urlForumsProxied}/atom/topics?forumUuid=" + parentId,
					postData: topicFeed,
					contentType:"application/atom+xml",
					handleAs: "xml",
					load: function(result) {
						var newTopicEntry = result.documentElement;
						var newTopicLink = dojo.query("link[rel='alternate'][type='text/html']", newTopicEntry)[0].getAttribute("href");
						window.open(newTopicLink, "_blank");
						window.close();
					},
					error: function(err) {
						enableSubmit();
						console.log("<fmt:message key="jsp.discussThis.error.createTopicError" />");
					}
				});
			}
			
			function authError() {
				dojo.byId("sessionExpiredError").style.display = "block";
				goTop();
			}
	
			function cancel() {
				window.close();
			}
			
			function goTop() {
				window.location = "#";
			}			
			
			dojo.addOnLoad( function() {				
				var json = dojo.fromJson(window.name);
				
				var data = {};
				data.topicLink = decodeURIComponent(json.topicLink);
				data.parentName = decodeURIComponent(json.parentName);
				data.parentImg = decodeURIComponent(json.parentImg);
				data.parentLink = decodeURIComponent(json.parentLink);
				data.title = decodeURIComponent(json.name);
				data.description = decodeURIComponent(json.description);
				data.date = decodeURIComponent(json.date);
				data.author = lconn.core.HTMLUtil.escapeText(decodeURIComponent(json.author));
				data.attachments = decodeURIComponent(json.attachments);
				data.findBy = decodeURIComponent(json.findBy);
				data.find = decodeURIComponent(json.find);
				data.favicon = decodeURIComponent(json.favicon);
				data.image = decodeURIComponent(json.image);
				data.video = decodeURIComponent(json.video);
				data.videoWidth = decodeURIComponent(json.videoWidth);
				data.videoHeight = decodeURIComponent(json.videoHeight);
				
				fillDialog(data);				
				topicContent = new lconn.bookmarklet.TopicContent(data);
	
				var url = "${urlForumsProxied}/ajax/forumTypeAhead?view=" + dojo.byId("view").value;
				var store = new lconn.core.TypeAheadDataStore({url: url, queryParam: 'search', timeout:10000}, null);
				var args = {
					minChars: 2,
					searchDelay: 600,
					hideEmptyResults: true,
					inputClass: 'lotusText',
					store: store,
					forumsUrl: '${urlForumsProxied}',
					communitiesUrl: '${urlCommunitiesProxied}',
					hintText: '<fmt:message key="jsp.discussThis.forums.hint" />',
					authErrorCallback: dojo.hitch(this, authError)
				};
				var typeAheadInput = dojo.byId("typeahead");
				typeAhead = new lconn.bookmarklet.DiscussThisTypeAhead(args, typeAheadInput);

				// ignore the default error message
				typeAhead.invalidMessage = "";
				// override default validator so that only items listed in type ahead are valid
				typeAhead.validator = function(value) {
					var parentId = dojo.byId("parentId").value;
					var parent = dojo.byId("typeahead").value;
					return !(parentId == "" || parent == "");
				};

				typeAhead.onSelect = function(item) {
					var item = typeAhead.getItem();
					dojo.byId("parentId").value = item.id;
					var pinNode = dojo.byId("pinCheckbox");					
					if (item.canPin) {
						pinNode.disabled = "";
					} else {
					    pinNode.checked = false;
						pinNode.disabled = "true";
					}
					// force validation after item selected
					this.validate(true);
					comment.handleMention();
					
					checkCommunityType(item.communityUuid);
				};
				
				typeAhead.preSearch = function() {
					dojo.byId("parentId").value = "";					
				};	
				
				typeAhead.onBlur = function() {
				    if (!dojo.byId("parentId").value) {
				        typeAhead.domNode.value="";
				    }			
				};	
				comment = new lconn.bookmarklet.DiscussThisComment({
					node:dojo.byId("comment"),
					forumContext:"${urlForumsProxied}",
					isExternalUser:"${userExternal}"
				});
			});	
			
			function checkCommunityType(commUuid){
				var args = {
					url: "${urlCommunitiesProxied}" + "/service/atom/community/instance",
		            content: { communityUuid:commUuid },
		            handleAs: "text",
					handle: function(data){
								if(data.toString().indexOf("<snx:isExternal>true</snx:isExternal>") != -1)
									isExternal = true;
								else
									isExternal = false;
									
								var externallySharedWarning = dojo.byId("externallySharedWarning");
								if (isExternal)
									externallySharedWarning.style.display = "block";
								else
									externallySharedWarning.style.display = "none";
							}
				}; 
				dojo.xhrGet(args);
			}
			
			dojo.addOnLoad(function() {
				var ciaa = com.ibm.ajax.auth;
				ciaa.interceptDojoXhr(function(){return true;});
				ciaa.setAuthenticationHandler(function(response, ioArgs, onauthenticated){
					authError();
				});
			});
			
			//change html's lang attribute
			dojo.addOnLoad(function() {
				dojo.attr(dojo.query("html")[0],"lang",djConfig.locale);
			});
		
			// two error message box
			dojo.addOnLoad(function(){
				if(!emptyTitleErrorMsgBox){
					emptyTitleErrorMsgBox = new com.ibm.oneui.controls.MessageBox({
					msg: "<fmt:message key="jsp.discussThis.error.emptyTitle" />"
					}, dojo.byId('emptyTitleError'));
					dojo.addClass(dojo.query(".lotusMessage2",dojo.byId('emptyTitleError'))[0],"bookmarkletErrorMsgBox");
				}
				if(!invalidForumErrorMsgBox){
					invalidForumErrorMsgBox = new com.ibm.oneui.controls.MessageBox({
					msg: "<fmt:message key="jsp.discussThis.error.invalidForum" />"
					}, dojo.byId('invalidForumError'));
					dojo.addClass(dojo.query(".lotusMessage2",dojo.byId('invalidForumError'))[0],"bookmarkletErrorMsgBox");
				}
			});
			
			// one warning message box
			dojo.addOnLoad(function(){
				if(!externallySharedWarningMsgBox){
					externallySharedWarningMsgBox = new com.ibm.oneui.controls.MessageBox({
					type: com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
					msg: "<fmt:message key="jsp.discussThis.warning.externallyShared" />"
					}, dojo.byId('externallySharedWarning'));
					dojo.addClass(dojo.query(".lotusMessage2",dojo.byId('externallySharedWarning'))[0],"bookmarkletWarningMsgBox");
				}
			});
		</script>
	</head>

	<body class="tundra lotusui lotusui30_body lotusui30_fonts lotusui30 lotusui30dojo lotusSpritesOn">
		<jsp:include page="/nav/templates/dialogHeader.jsp" />
		<div class="discussThis" style="min-width:740px;">
			<form accept-charset="UTF-8" action="javascript:;" method="post" name="disucssThisForm" id="disucssThisForm" class="lotusForm2" role="form" aria-describedby="formDesc" aria-live="assertive">
				<div class="lotusFormTitle">
					<h1 class="lotusHeading2"><fmt:message key="jsp.discussThis.title" /></h1>
				</div>				
				<div class="lotusFormBody">
					<c:if test="${checkVersion=='true'}" >
						<script>
							var forumUrl = "";
							if(location.href.indexOf("https")!=-1){
								forumUrl = lconn.core.config.services.forums.secureUrl;
							}else{
								forumUrl = lconn.core.config.services.forums.url;
							}
						</script>
						<div id="messageInfo" class="lotusMessage lotusWarning" role="alert">
							<img class="lconnSprite lconnSprite-iconWarning16" src="<lc-ui:blankGif />" alt="icon"/>
							<span>									
								<fmt:message key="jsp.warning.version.confict2" >
									<fmt:param>
										<fmt:message key="jsp.discussThis.title" />
									</fmt:param>
									<fmt:param>
										<a href="javascript:;" onclick="window.open(forumUrl+'/html/bookmark');return false;"><fmt:message key="jsp.warning.version.here"/></a>
									</fmt:param>
								</fmt:message>
							</span>
							<a class='lotusDelete' title='<fmt:message key='jsp.posting.message.close'/>' role='button' href='javascript:;' onclick="dojo.byId('messageInfo').style.display='none';"><img src='<lc-ui:blankGif />' /></a>
						</div>
					</c:if>
					<div class="lotusMessage2 lotusHidden"></div>
				    <div id="sessionExpiredError" class="lotusFormError lotusHidden" role="alert">
						<img class="lconnSprite lconnSprite-iconError16" alt="<fmt:message key="jsp.discussThis.error" />" title="<fmt:message key="jsp.discussThis.error" />" src="<lc-ui:blankGif />" />
						<span class="lotusAltText"><fmt:message key="jsp.discussThis.label.error" /></span>
						<fmt:message key="jsp.discussThis.error.sessionexpired" />
						<a href="javascript:location.reload();"><fmt:message key="jsp.login.submit" /></a>
					</div>
					
				    <div id="formDesc"><p><fmt:message key="jsp.discussThis.description" /></p></div>
					
					<div class="lotusFormField">
					    <label id="discussTopicSummary" style="display:none"><fmt:message key="jsp.discussThis.label.topicSummary" /></label>
						<fieldset class="lotusFieldset" role="document" aria-describedBy="discussTopicSummary" aria-labelledby="discussTopicSummary">
							<legend><fmt:message key="jsp.discussThis.lagend.topicContent" /></legend>
							<div><h2 id="topicName"></h2></div>
							<div class="lotusMeta" id="topicMeta">
								<fmt:message key="jsp.discussThis.posted" />
								<span class="formatDate" id="topicDate"></span>
								<span class="lotusDivider" role="presentation">|</span>
								<fmt:message key="jsp.discussThis.by" /> <span id="topicAuthor"></span>
							</div>
							<div id="topicDescription"></div>
							<div id="topicVideo"></div>
							<div id="topicImage"></div>
							<div id="topicAttachments"></div>
						</fieldset>
					</div>
					<div id="emptyTitleError" class="lotusFormError lotusHidden" role="alert">
						<!-- <img class="lconnSprite lconnSprite-iconError16" alt="<fmt:message key="jsp.discussThis.error" />" title="<fmt:message key="jsp.discussThis.error" />" src="<lc-ui:blankGif />" />
						<span class="lotusAltText"><fmt:message key="jsp.discussThis.error" /></span>
						<fmt:message key="jsp.discussThis.error.emptyTitle" />
						-->
					</div>
					<div class="lotusFormField">
						<label for="name"><span class="lotusFormRequired" title="<fmt:message key="jsp.common.requireField"/>">*</span><fmt:message key="jsp.discussThis.label.title" /></label>
						<div>						    
							<input type="text" id="name" name="name" class="lotusText" aria-required="true" />							
						</div>
					</div>
					<div id="invalidForumError" class="lotusFormError lotusHidden" role="alert">
						<!-- <img class="lconnSprite lconnSprite-iconError16" alt="<fmt:message key="jsp.discussThis.error" />" title="<fmt:message key="jsp.discussThis.error" />" src="<lc-ui:blankGif />" />
						<span class="lotusAltText"><fmt:message key="jsp.discussThis.label.error" /></span>
						<fmt:message key="jsp.discussThis.error.invalidForum" /> 
						-->
					</div>
					<div id="externallySharedWarning" class="lotusWarning lotusHidden" role="alert">
						<!-- <img class="lotusIcon lotusIconMsgWarning" alt="<fmt:message key="jsp.discussThis.warning" />" title="<fmt:message key="jsp.discussThis.warning" />" src="<lc-ui:blankGif />" />
						<span class="lotusAltText"><fmt:message key="jsp.discussThis.warning" /></span>
						<fmt:message key="jsp.discussThis.warning.externallyShared" />
						-->
					</div>
					<div class="lotusFormField">
						<table cellspacing="0" role="presentation" width="100%">
							<tr>
								<td <c:if test="${userExternal}">style="width:0px;padding:0px;"</c:if>>
								    <c:if test="${userExternal}">
								        <div style="display:none">
								    </c:if>
									<label for="view"><fmt:message key="jsp.discussThis.label.forums" /></label>
									<div>
										<select name="view" id="view" onchange="forumTypeChanged();">
											<option value="owner"><fmt:message key="jsp.discussThis.forums.own" /></option>
											<option value="member" <c:if test="${userExternal}">selected="true"</c:if>><fmt:message key="jsp.discussThis.forums.member" /></option>
											<option value="following"><fmt:message key="jsp.discussThis.forums.follow" /></option>
											<c:if test="${!lotusLiveEnable}">
											<option value="public"><fmt:message key="jsp.discussThis.forums.public" /></option>
											</c:if>
										</select>
									</div>
									<c:if test="${userExternal}">
                                        </div>
                                    </c:if>
								
								<c:if test="${!userExternal}">
								<td>
									<span class="lotusDivider" ></span>
								</td>
								</c:if>
								<td <c:if test="${userExternal}">width="100%"</c:if><c:if test="${!userExternal}">width="81%"</c:if>>
									<label for="typeahead"><span class="lotusFormRequired" title="<fmt:message key="jsp.common.requireField"/>">*</span><fmt:message key="jsp.discussThis.label.forum" /></label>
									<div>
										<input id="typeahead"/>
										<input type="hidden" id="parentId" name="parentId" />
									</div>
								</td>
							</tr>
						</table>
					</div>
					
					<div class="lotusFormField">
						<nobr>						
						<input type="checkbox" id="questionCheckbox" class="lotusCheckbox" />
						<label for="questionCheckbox" class="lotusCheckbox"><fmt:message key="jsp.discussThis.markQuestion" /></label>
					    </nobr>
					    <span class="lotusDivider"></span>	
					    <nobr>						
						<input type="checkbox" id="pinCheckbox" class="lotusCheckbox" />
						<label for="pinCheckbox" class="lotusCheckbox"><fmt:message key="jsp.discussThis.pin" /></label>
					    </nobr>
					</div>
					<div class="lotusFormField">
						<label for="comment"><fmt:message key="jsp.discussThis.label.addComment" /></label>
						<div>
							<textarea id="comment" rows="2"></textarea>
						</div>
					</div>				
					
					<div class="lotusFormField lotusMeta" title="<fmt:message key="jsp.common.legend"/>"><fmt:message key="jsp.common.required"/></div>
					
					<div class="lotusFormFooter lotusAlignRight">						
						<img id="discussThisSavingImg"  src="<lc-ui:blankGif />" class="lotusLoading lotusHidden" alt="" role="presentation">	
						<span id="discussThisSavingText" class="lotusHidden"><fmt:message key="jsp.discussThis.Saving"/></span>
						<input id="addPost" type="button" class="lotusBtn" value="<fmt:message key="jsp.discussThis.save" />" onclick="save();" />
						<input id="canclePost" type="button" class="lotusBtn" value="<fmt:message key="jsp.discussThis.cancel" />" onclick="cancel();" />
					</div>
				</div>
			</form>
		</div>
	</body>
</html>
