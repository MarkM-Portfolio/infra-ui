<?xml version="1.0" encoding="utf-8"?>
<!-- Copyright IBM Corp. 2007, 2015  All Rights Reserved.              -->

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:app="http://www.w3.org/2007/app"
	xmlns:snx="http://www.ibm.com/xmlns/prod/sn"
	xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:thr="http://purl.org/syndication/thread/1.0"
	xmlns:relevance="http://a9.com/-/opensearch/extensions/relevance/1.0/"
	xmlns:gsdate="http://www.ibm.com/xmlns/gs/date"
	xmlns:ass="http://www.ibm.com/xmlns/ass"
	xmlns:sn="http://www.ibm.com/xmlns/prod/sn"
	xmlns:sp="http://a9.com/-/opensearch/extensions/spelling/1.0/"
	xmlns:ibmsc="http://www.ibm.com/search/content/2010"
	exclude-result-prefixes="atom app snx os xhtml thr relevance ass gsdate sp ibmsc">

	<xsl:output method="html" encoding="utf-8" />

	<!-- Months for date cloud -->
	<xsl:param name="Jan"/>
	<xsl:param name="Feb"/>
	<xsl:param name="Mar"/>
	<xsl:param name="Apr"/>
	<xsl:param name="May"/>
	<xsl:param name="Jun"/>
	<xsl:param name="Jul"/>
	<xsl:param name="Aug"/>
	<xsl:param name="Sep"/>
	<xsl:param name="Oct"/>
	<xsl:param name="Nov"/>
	<xsl:param name="Dec"/>

	<xsl:param name="domNodeId"/>
	<xsl:param name="blankIcon"/>

	<xsl:param name="communityActivity"/>
	<xsl:param name="communityBlog"/>
	<xsl:param name="communityFile"/>
	<xsl:param name="communityWiki"/>
	<xsl:param name="communityForum"/>
	<xsl:param name="communityFeed"/>
	<xsl:param name="communityBookmark"/>

	<!-- function to perform -->
	<xsl:param name="action" />
	<!-- nls string from dojo -->
	<xsl:param name="PagingTop"/>
	<xsl:param name="PagingBottom"/>
	<xsl:param name="MsgPrevious"/>
	<xsl:param name="MsgNext"/>
	<xsl:param name="MsgPage"/>
	<xsl:param name="MsgResults" />
	<xsl:param name="MsgShow" />
	<xsl:param name="MsgItems" />
	<xsl:param name="People" />
	<xsl:param name="NoResultsMessage"/>
	<xsl:param name="LastUpdated"/>
	<xsl:param name="NoDescription"/>
	<xsl:param name="MoreStatusUpdates"/>
	<xsl:param name="ViewAll"/>
	<xsl:param name="MsgLatestStatusUpdate"/>
	<xsl:param name="MsgHeading"/>
	<xsl:param name="TmpIndexingDifficulties"/>
	<xsl:param name="ResultNotFound"/>
	<xsl:param name="MulTmpIndexingDifficulties"/>
	
	<!-- Result icon labels-->
	<xsl:param name="Activities"/>
	<xsl:param name="Blogs"/>
	<xsl:param name="Bookmarks"/>
	<xsl:param name="Communities"/>
	<xsl:param name="Feeds"/>
	<xsl:param name="Events"/>
	<xsl:param name="Files"/>
	<xsl:param name="Forums"/>
	<xsl:param name="Profiles"/>
	<xsl:param name="Wiki"/>
	<xsl:param name="StatusUpdates"/>
	
	<xsl:param name="noTag"/>
	<xsl:param name="noDate"/>
	<xsl:param name="noPeople"/>
	<xsl:param name="ratingAlt"/>
	<xsl:param name="relevanceAlt"/>
	<xsl:param name="dateAlt"/>
	<xsl:param name="twistyAlt"/>
	<xsl:param name="commentOn"/>
	<xsl:param name="BookmarkThisResult"/>
	<xsl:param name="inactive"/>
	
	<!-- Meta -->
	<xsl:param name="Bookmarkers"/>
	<xsl:param name="OnePerson"/>
	<xsl:param name="OneComment"/>
	<xsl:param name="Comments"/>
	<xsl:param name="Tags"/>
	<xsl:param name="TagsMore"/>
	<xsl:param name="fromAnActivity"/>
	<xsl:param name="fromABlog"/>
	<xsl:param name="fromAnIdeationBlog"/>
	<xsl:param name="fromAForum"/>
	<xsl:param name="fromAWiki"/>
	<xsl:param name="fromACommunity"/>
	<xsl:param name="Votes"/>
	<xsl:param name="OneVote"/>
	<xsl:param name="Graduated"/>
	<xsl:param name="EventDateOn"/>
	<xsl:param name="EventRepeats"/>
	<xsl:param name="EventIsAllDay"/>
	<xsl:param name="DocumentTypePrefix"/>
	<xsl:param name="YouAreAuthor"/>
	<xsl:param name="YouAreContributor"/>
	<xsl:param name="YouAreOwner"/>
	<xsl:param name="YouAreMember"/>

	<!-- Result type -->
	<xsl:param name="Activity"/>
	<xsl:param name="ActivityBookmark"/>
	<xsl:param name="ActivityComment"/>
	<xsl:param name="ActivityEntry"/>
	<xsl:param name="ActivitySection"/>
	<xsl:param name="ActivityFile"/>
	<xsl:param name="ActivityTodo"/>
	<xsl:param name="Blog"/>
	<xsl:param name="BlogEntry"/>
	<xsl:param name="BlogComment"/>
	<xsl:param name="Bookmark"/>
	<xsl:param name="CalendarEvent"/>
	<xsl:param name="Comment"/>
	<xsl:param name="Community"/>
	<xsl:param name="Entry"/>
	<xsl:param name="Feed"/>
	<xsl:param name="File"/>
	<xsl:param name="Forum"/>
	<xsl:param name="ForumCategory"/>
	<xsl:param name="ForumTopic"/>
	<xsl:param name="ForumTopicWithAttachment"/>
	<xsl:param name="ForumAttachment"/>
	<xsl:param name="Idea"/>
	<xsl:param name="IdeationBlog"/>
	<xsl:param name="IdeaComment"/>
	<xsl:param name="Profile"/>
	<xsl:param name="StatusUpdate"/>
	<xsl:param name="WikiFile"/>
	<xsl:param name="WikiType"/>
	<xsl:param name="WikiPage"/>
	
	<!-- Bookmark extra tags info -->
	<xsl:param name="tagsAreFrom"/>
	<xsl:param name="bookmarksTitle"/>
	<xsl:param name="communitiesTitle"/>
	<xsl:param name="activitiesTitle"/>
	<xsl:param name="help"/>
	
	<!-- extra params -->
	<xsl:param name="shouldShowPersonalization"/>
	<xsl:param name="newStyle"/>
	<xsl:param name="communitiesURL"/>
	<xsl:param name="isRbLEnabled"/>
	<xsl:param name="isResultLimitEnabled"/>
	<xsl:param name="resultLimitMessage"/>
	<xsl:param name="resultLimitSubMessage"/>
	
	<xsl:template match="sn:error">
		<xsl:if test="$action!='suggest'">
			<xsl:variable name="trace" select="/sn:error/sn:trace"/>
			<xsl:variable name="message" select="/sn:error/sn:message"/>
			<xsl:variable name="code" select="/sn:error/sn:code"/>
			<div class="lotusMessage">
					<div class="lotusLeft lconnSprite lconnSprite-iconError16">&#160;</div>
					<span>
						<strong><xsl:value-of select="$code"/></strong>:
						<xsl:value-of select="$message"/>
					</span>
					<div style="display: none"><xsl:value-of select="$trace"/></div>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="/atom:feed">
		<xsl:choose>
			<xsl:when test="$action='date'">
				<xsl:call-template name="dateCloud"/>
			</xsl:when>
			<xsl:when test="$action='people'">
				<xsl:call-template name="personCloud"/>
			</xsl:when>
			<xsl:when test="$action='suggest'">
				<xsl:call-template name="didYouMeanTemplate"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="totalResults" select="/atom:feed/os:totalResults"/>
				<xsl:call-template name="promotedStatusUpdates"/>
				<div class="lotusHeader lconnSearchResultsHeading">
					<h1 style="display: inline-block">
						<xsl:value-of select="$MsgHeading" />
					</h1>
					<xsl:if test="($totalResults &gt; 0) and ($newStyle = 'true')">
						<xsl:call-template name="topResultCount" />
					</xsl:if>
				</div>
				<div class="icPageControls lconnClearFix">
					<xsl:if test="$totalResults &gt; 0">
						<xsl:choose>
							<xsl:when test="$newStyle = 'true'">
								<xsl:call-template name="newTopPagination"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:call-template name="topPagination"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if test="atom:entry">
						<div class="lotusSort"></div>
					</xsl:if>
				</div>
				<xsl:choose>
					<xsl:when test="atom:entry">
						<xsl:call-template name="resultBuilder"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="noResultsTemplate"/>
					</xsl:otherwise>
				</xsl:choose>
				
				<xsl:if test="$totalResults &gt; 0">
					<xsl:call-template name="bottomPagination"/>
				</xsl:if>
				
				<div style="margin-bottom:10px;margin-top:10px;">

					<xsl:if test="count(/atom:feed/os:serviceWithIndexingDifficulties) &gt; 2">
						<xsl:call-template name="multipleResultsNotFound"/>
					</xsl:if>
					
					<xsl:if test="count(/atom:feed/os:serviceWithIndexingDifficulties)=2">
						<xsl:call-template name="twoResultsfound"/>
					</xsl:if>
						
					<xsl:if test="count(/atom:feed/os:serviceWithIndexingDifficulties)=1">
						<xsl:call-template name="oneResultNotFound"/>
					</xsl:if>
				</div>
				
				<xsl:if test="atom:updated and string-length(atom:updated)!=0">
					<div class="lotusMeta">
						<xsl:value-of select="$LastUpdated"/>&#160;
						<span class="searchDateClass">
							<xsl:value-of select="atom:updated"/>
						</span>
					</div>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="resultBuilder">
		<xsl:variable name="startIndex" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="totalResults" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="itemsPerPage" select="/atom:feed/os:itemsPerPage" />
		<table class="lotusTable" border="0" cellspacing="0" cellpadding="0" role="presentation">
			<xsl:for-each select="atom:entry">
				<tr>
					<xsl:variable name="primaryComponent" select="atom:category[ibmsc:field[@id='primaryComponent']]/@term" />
					<xsl:choose>
						<xsl:when test="($newStyle = 'true') and (position() = 1)">
							<xsl:attribute name="class">icConnectOnChildFocus lotusFirst</xsl:attribute>
						</xsl:when>
						<xsl:when test="$newStyle = 'true'">
							<xsl:attribute name="class">icConnectOnChildFocus</xsl:attribute>
						</xsl:when>
						<xsl:when test="position() = 1">
							<xsl:attribute name="class">lotusFirst</xsl:attribute>
						</xsl:when>
					</xsl:choose>
					<xsl:if test="$newStyle = 'true'">
						<xsl:attribute name="role">link</xsl:attribute>
						<xsl:attribute name="onclick"><![CDATA[var a = __isContainedInChildAnchor(this, event.target || event.srcElement) ? null : this.querySelector(".icSearchMainAction"); a && a.click()]]></xsl:attribute>
					</xsl:if>
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">blogs</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='profiles'">
							<xsl:choose>
								<xsl:when test="position()=1 and atom:author/snx:userState = 'inactive'">
									<xsl:attribute name="class">lotusDim lotusFirst</xsl:attribute>
								</xsl:when>
								<xsl:when test="atom:author/snx:userState = 'inactive'">
									<xsl:attribute name="class">lotusDim</xsl:attribute>
								</xsl:when>
							</xsl:choose>
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">profiles</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">wiki</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='files'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">files</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='ecm_files'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">files</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='forums'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">forums</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='calendar'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">calendar</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='status_updates'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">status_update</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="starts-with($primaryComponent,'activities') or starts-with($primaryComponent,'communities:activities')">
							<xsl:choose>
								<xsl:when test="$primaryComponent = 'activities:bookmark' or $primaryComponent = 'communities:activities:bookmark'">
									<xsl:call-template name="resultBody">
										<xsl:with-param name="resultType">bookmark</xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="resultBody">
										<xsl:with-param name="resultType">activities</xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="starts-with($primaryComponent,'communities')">
							<xsl:choose>
								<xsl:when test="$primaryComponent = 'communities:bookmark'">
									<xsl:call-template name="resultBody">
										<xsl:with-param name="resultType">bookmark</xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="resultBody">
										<xsl:with-param name="resultType">communities</xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='dogear'">
							<xsl:call-template name="resultBody">
								<xsl:with-param name="resultType">bookmark</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
					</xsl:choose>
				</tr>
			</xsl:for-each>
			<xsl:if test="($isResultLimitEnabled = 'true') and (($totalResults - ($startIndex + $itemsPerPage)) &lt; 0) and ($totalResults &gt; 0) and (($totalResults mod 1000) = 0)">
				<tr class="icLastPageMessage">
					<td colspan="2">
						<div class="icSearchTitle">
							<h4><xsl:value-of select="$resultLimitMessage"/></h4>
						</div>
						<div>
							<span class="lotusMeta">
								<xsl:value-of select="substring-before($resultLimitSubMessage,'{resultNumber}')"/>
								<xsl:value-of select="$totalResults"/>
								<xsl:value-of select="substring-after($resultLimitSubMessage,'{resultNumber}')"/>
							</span>
						</div>
					</td>
				</tr>
			</xsl:if>
		</table>
	</xsl:template>
	
	<xsl:template name="promotedStatusUpdates">
		<xsl:if test="/atom:feed/snx:promotedStatusUpdates/atom:entry">
			<div class="lconnPromotedStatusUpdatesContainer">
				<div class="lotusHeader lconnClearFix">
					<h1><xsl:value-of select="$MsgLatestStatusUpdate" /></h1>
					<xsl:if test="/atom:feed/snx:promotedStatusUpdates/os:totalResults &gt; 1">
						<a class="icViewAll" href="javascript:;">
							<xsl:attribute name="onclick">
								if (typeof updateSearchTab == "undefined"){
									var originalFilter = searchObject.APIHandler.getComponentFilter();
									searchObject.performFilter('status_updates', false);
									if (originalFilter == "communities"){
										searchObject.APIHandler.setParent("communities");
									} 
									searchObject.updatePage();
								} else {
									/* Switch "This Community" search tab */
									updateSearchTab("StatusUpdates");
								}
							</xsl:attribute>
							<xsl:variable name="viewAllParsed">
								<xsl:value-of select="substring-before($ViewAll,'{0}')"/>
								<xsl:value-of select="/atom:feed/snx:promotedStatusUpdates/os:totalResults"/>
								<xsl:value-of select="substring-after($ViewAll,'{0}')"/>
							</xsl:variable>
							<xsl:value-of select="substring-before($viewAllParsed,'{span}')"/>
							<span>
								<xsl:variable name="viewAllParsed2">
									<xsl:value-of select="substring-after($viewAllParsed,'{span}')"/>
								</xsl:variable>
								<xsl:value-of select="substring-before($viewAllParsed2,'{/span}')"/>
							</span>
							<xsl:value-of select="substring-after($viewAllParsed,'{/span}')"/>
						</a>
					</xsl:if>
				</div>
				<table class="lotusTable" border="0" cellspacing="0" cellpadding="0" role="presentation">
					<xsl:for-each select="/atom:feed/snx:promotedStatusUpdates/atom:entry">
						<tr>
							<xsl:attribute name="class">promotedStatusUpdate 
								<xsl:if test="$newStyle = 'true'">
									icConnectOnChildFocus 
									<xsl:if test="position() = 1">
										lotusFirst
									</xsl:if>
								</xsl:if>
							</xsl:attribute>
							<xsl:if test="$newStyle = 'true'">
								<xsl:attribute name="onclick">window.location='<xsl:value-of select="atom:link/@href" />'</xsl:attribute>
							</xsl:if>
							<xsl:choose>
								<xsl:when test="position() &gt; 3 and position() = last()">
	
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="resultBody">
										<xsl:with-param name="resultType">status_update</xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</tr>
					</xsl:for-each>
				</table>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template name="resultBody">
		<xsl:param name="resultType"/>

		<!-- main column section -->
		<xsl:if test="($resultType = 'status_update') or ($newStyle = 'true')">
			<td class="lotusFirstCell" width="65" height="55">
				<xsl:call-template name="createEntryImage">
					<xsl:with-param name="resultType" select="$resultType"/>
				</xsl:call-template>
			</td>
		</xsl:if>
		<td>
			<xsl:choose>
				<xsl:when test="($resultType != 'status_update') and ($newStyle != 'true')">
					<xsl:attribute name="colspan">2</xsl:attribute>
					<xsl:attribute name="class">lotusFirstCell lotusLastCell</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">lotusLastCell</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="$resultType = 'profiles' and atom:author/snx:userState = 'inactive'">
				<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
			</xsl:if>
			<div class="icSearchTitle">
				<xsl:choose>
					<xsl:when test="$resultType='profiles' and atom:author/snx:userState = 'active'">
						<h4 class="lotusLeft">
							<span class="vcard lotusPerson">
								<a class="icSearchMainAction fn lotusPerson bidiAware hasHover">
									<xsl:attribute name="href">
										<xsl:value-of select="atom:link/@href" />
									</xsl:attribute>
									<xsl:value-of select="atom:title"/>
								</a>
								<span class="x-lconn-userid" style="display:none;"><xsl:value-of select="atom:author/snx:userid"/></span>
							</span>
						</h4>
					</xsl:when>
					<xsl:when test="$resultType='status_update'">
						<div class="lotusLeft lconnSearchHighlight lconnStatusUpdateTitle">
							<xsl:if test="($resultType = 'status_update') and ($newStyle = 'true')">
								<xsl:call-template name="personCardbuilder" />
							</xsl:if>
							<a>
								<xsl:attribute name="href"><xsl:value-of select="atom:link/@href" /></xsl:attribute>
								<xsl:attribute name="class">icStatusUpdate icSearchMainAction</xsl:attribute>
								<xsl:value-of select="atom:title"/>
							</a>
						</div>
					</xsl:when>
					<xsl:when test="$resultType = 'communities'">
						<h4 class="lotusLeft">
							<a class="icSearchMainAction">
								<xsl:attribute name="href">
									<xsl:value-of select="atom:link/@href" />
								</xsl:attribute>
								<xsl:if test="($isRbLEnabled = 'true') and (ibmsc:field[@id='FIELD_LIST_WHEN_PRIVATE'] = 'true') and not(atom:author)">
									<xsl:attribute name="class">icSearchMainAction icRbLAction</xsl:attribute>
									<div class="rbl" style="display: none;">
										<span class="uuid"><xsl:value-of select="atom:id"/></span>
										<span class="name"><xsl:value-of select="atom:title"/></span>
										<span class="desc"><xsl:value-of select="atom:summary"/></span>
									</div>
								</xsl:if>
								<xsl:value-of select="atom:title"/>
							</a>
						</h4>
						<xsl:if test="$shouldShowPersonalization = 'true'">
							<xsl:call-template name="addPersonilizedEvidence">
								<xsl:with-param name="resultType"><xsl:value-of select="$resultType"/></xsl:with-param>
							</xsl:call-template>
						</xsl:if>
					</xsl:when>
					<xsl:otherwise>
						<h4 class="lotusLeft">
							
							<xsl:if test="$resultType='files' or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis:file'">
								<xsl:attribute name="dir">ltr</xsl:attribute>
							</xsl:if>
							
							<a class="icSearchMainAction">
								<xsl:attribute name="href">
									<xsl:value-of select="atom:link/@href" />
								</xsl:attribute>
								<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:reply'">
									<xsl:value-of select="$commentOn"/>
								</xsl:if>
								
								<xsl:if test="$resultType='profiles'">
									<xsl:value-of select="substring-before($inactive,'{0}')"/>
								</xsl:if>
								<xsl:value-of select="atom:title"/>
								<xsl:if test="$resultType='profiles'">
									<xsl:value-of select="substring-after($inactive,'{0}')"/>
								</xsl:if>
							</a>
						</h4>
						<xsl:if test="$shouldShowPersonalization = 'true'">
							<xsl:call-template name="addPersonilizedEvidence">
								<xsl:with-param name="resultType"><xsl:value-of select="$resultType"/></xsl:with-param>
							</xsl:call-template>
						</xsl:if>
					</xsl:otherwise>
				</xsl:choose>
				
				<xsl:call-template name="ratingIcon"/>
			</div>
			
			<xsl:if test="not ($resultType='profiles' 
										and not (string-length(atom:content/xhtml:div/xhtml:span/xhtml:div[@class='title'])!=0)
										and not (string-length(atom:content/xhtml:div/xhtml:span/xhtml:div[@class='location'])!=0)
										and count(atom:category[not(@scheme)]) = 0 
										)">
				<div class="lotusMeta icSearchDetails">
					<ul class="lotusInlinelist lotusClear" role="list">
						<xsl:choose>
							<xsl:when test="$resultType='calendar'">
								<li class="lotusFirst lotusBold" role="listitem">
									<xsl:value-of select="substring-before($EventDateOn,'{0}')"/>
									<span class="searchDateClass">
										<xsl:value-of select="ibmsc:field[@id='eventStartDate']"/>
									</span>
									<xsl:value-of select="substring-after($EventDateOn,'{0}')"/>
								</li>
								
								<xsl:choose>
									<xsl:when test="ibmsc:field[@id='isEventAllDay'] = 'true'">
										<li role="listitem">
											<xsl:value-of select="$EventIsAllDay"/>
										</li>
									</xsl:when>
								</xsl:choose>
								
								<xsl:choose>
									<xsl:when test="ibmsc:field[@id='isEventRepeating'] = 'true'">
										<li role="listitem">
											<xsl:value-of select="$EventRepeats"/>
										</li>
									</xsl:when>
								</xsl:choose>
								
								<xsl:choose>
									<xsl:when test="ibmsc:field[@id='location']">
										<li role="listitem">
											<xsl:value-of select="ibmsc:field[@id='location']"/>
										</li>
									</xsl:when>
								</xsl:choose>
								
								<li role="listitem">
									<xsl:call-template name="personCardbuilder" />
								</li>
							</xsl:when>
							<xsl:when test="$resultType='communities'">
								<xsl:choose>
									<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:entry'">
										<xsl:variable name="peoplecount" select="snx:membercount"/>
										<xsl:choose>
											<xsl:when test="$peoplecount = 1">
												<li class="lotusFirst members" role="listitem">
													<xsl:value-of select="$OnePerson"/>
												</li>
											</xsl:when>
											<xsl:when test="$peoplecount &gt; 1">
												<li class="lotusFirst members" role="listitem">
													<xsl:value-of select="substring-before($People,'{0}')"/>
													<xsl:value-of select="$peoplecount" />
													<xsl:value-of select="substring-after($People,'{0}')"/>
												</li>
											</xsl:when>
										</xsl:choose>
										<li role="listitem">
											<xsl:if test="not(atom:author)">
												<xsl:attribute name="class">lotusHidden</xsl:attribute>
											</xsl:if>
											<xsl:call-template name="personCardbuilder"/>
										</li>
									</xsl:when>
									<xsl:otherwise>
										<li class="lotusFirst" role="listitem">
											<xsl:if test="not(atom:author)">
												<xsl:attribute name="class">lotusHidden</xsl:attribute>
											</xsl:if>
											<xsl:call-template name="personCardbuilder"/>
										</li>
									</xsl:otherwise>
								</xsl:choose>
								<li class="searchDateClass" role="listitem">
									<xsl:value-of select="atom:updated"/>
								</li>
							</xsl:when>
							<xsl:when test="$resultType='bookmark'">
								<li class="lotusFirst" role="listitem">
									<xsl:choose>
										<xsl:when test="ibmsc:field[@id='dogearURL'] and (count(atom:contributor)+count(atom:author)) &gt; 1">
											<span>
												<xsl:value-of select="substring-before($People,'{0}')"/>
												<a>
													<xsl:attribute name="href"><xsl:value-of select="ibmsc:field[@id='dogearURL']"/></xsl:attribute>
													<xsl:value-of select="count(atom:contributor)+count(atom:author)"/>
													<xsl:value-of select="substring-after($People,'{0}')"/>
												</a>
											</span>
										</xsl:when>
										<xsl:when test="ibmsc:field[@id='dogearURL'] and (atom:authorsCount &gt; 1)">
											<span>
												<xsl:value-of select="substring-before($People,'{0}')"/>
												<a>
													<xsl:attribute name="href"><xsl:value-of select="ibmsc:field[@id='dogearURL']"/></xsl:attribute>
													<xsl:value-of select="atom:authorsCount"/>
													<xsl:value-of select="substring-after($People,'{0}')"/>
												</a>
											</span>
										</xsl:when>
										<xsl:otherwise>
											<xsl:call-template name="personCardbuilder"/>
										</xsl:otherwise>
									</xsl:choose>
								</li>
								<li class="searchDateClass" role="listitem">
									<xsl:value-of select="atom:updated"/>
								</li>
							</xsl:when>
							<xsl:when test="$resultType='profiles'">
								<xsl:if test="string-length(atom:content/xhtml:div/xhtml:span/xhtml:div[@class='title'])!=0">
									<li class="lotusFirst" role="listitem">
										<xsl:value-of select="atom:content/xhtml:div/xhtml:span/xhtml:div[@class='title']"/>
										&#160;
									</li>
								</xsl:if>
							</xsl:when>
							<xsl:otherwise>
								<xsl:if test="(string-length(atom:author/atom:name)&gt;0) and not ($resultType='status_update' and $newStyle = 'true')">
									<li class="lotusFirst" role="listitem">
										<xsl:call-template name="personCardbuilder" />
									</li>
								</xsl:if>
								<li role="listitem">
									<xsl:attribute name="class">
										searchDateClass
										<xsl:if test="string-length(atom:author/atom:name)=0 or ($resultType='status_update' and $newStyle = 'true')">
											lotusFirst
										</xsl:if>
									</xsl:attribute>
									<xsl:value-of select="atom:updated"/>
								</li>
								<xsl:call-template name="commentCount"></xsl:call-template>
								<xsl:call-template name="objectReference"></xsl:call-template>
							</xsl:otherwise>
						</xsl:choose>
						
						<xsl:call-template name="ecmDocumentTypeBuilder">
							<xsl:with-param name="ecmDocumentType" select="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/ecmdocumenttype']"/>
							<xsl:with-param name="isFirst" select="true()"/>
						</xsl:call-template>
						
						<xsl:if test="count(atom:category[not(@scheme)]) &gt; 0">
							<xsl:if test="$resultType!='status_update'">
								<li role="listitem">
									<xsl:if test="($resultType='profiles' 
												and not (string-length(atom:content/xhtml:div/xhtml:span/xhtml:div[@class='title'])!=0)
												and not (string-length(atom:content/xhtml:div/xhtml:span/xhtml:div[@class='location'])!=0) 
												)">
										<xsl:attribute name="class">lotusFirst</xsl:attribute>
									</xsl:if>
									
									<xsl:call-template name="tagBuilder" />
									<xsl:call-template name="bookmarkHelpBuilder"/>
								</li>
							</xsl:if>
						</xsl:if>
					</ul>
				</div>
			</xsl:if>
			
			<xsl:if test="$resultType='bookmark'">
				<div class="lotusClear lconnSearchBookmarkUrl">
					<xsl:value-of select="atom:link/@href"/>
				</div>
			</xsl:if>
			
			<xsl:call-template name="resultSummary">
				<xsl:with-param name="resultType" select="$resultType"/>
			</xsl:call-template>
		</td>
	</xsl:template>
	
	<xsl:template name="createEntryImage">
		<xsl:param name="resultType"/>
		
		<xsl:choose>
			<xsl:when test="$resultType = 'status_update' or $resultType = 'profiles'">
				<div class="lconnStatusUpdatePhotoContainer otherPeople64 otherPeople64-NoPhotoPerson55">
					<span class="x-lconn-userid" style="display: none;">
						<xsl:value-of select="atom:author/snx:userid"/>
					</span>
				</div>
			</xsl:when>
			<xsl:when test="$resultType = 'communities'">
				<img alt="{$Communities}" title="{$Communities}" src="{$communitiesURL}/service/html/image?communityUuid={atom:id}&amp;showDefaultForNoPermissions=true" style="max-width: 55px; max-height: 55px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'files'">
				<xsl:variable name="fileExt">
					<xsl:value-of select="ibmsc:field[@id='fileExtension']"/>
				</xsl:variable>
				<xsl:attribute name="style">padding-left: 5px;</xsl:attribute>
				<img class="lconn-ftype64 lconn-ftype64-{$fileExt}" alt="{$Files}" title="{$Files}" src="{$blankIcon}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'activities'">
				<img class="lconnSprite-iconActivities40" alt="{$Activities}" title="{$Activities}" src="{$blankIcon}" style="margin-left: 7px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'bookmark'">
				<img class="lconnSprite-iconBookmarks40" alt="{$Bookmarks}" title="{$Bookmarks}" src="{$blankIcon}" style="margin-left: 7px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'blogs'">
				<img class="lconnSprite-iconBlogs40" alt="{$Blogs}" title="{$Blogs}" src="{$blankIcon}" style="margin-left: 7px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'forums'">
				<img class="lconnSprite-iconForums40" alt="{$Forums}" title="{$Forums}" src="{$blankIcon}" style="margin-left: 7px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'calendar'">
				<img class="lconnSprite-iconCalendar40" alt="{$Events}" title="{$Events}" src="{$blankIcon}" style="margin-left: 7px;"/>
			</xsl:when>
			<xsl:when test="$resultType = 'wiki'">
				<xsl:choose>
					<xsl:when test="ibmsc:field[@id='fileExtension']">
						<xsl:attribute name="style">padding-left: 5px;</xsl:attribute>
						<img class="lconn-ftype64 lconn-ftype64-{ibmsc:field[@id='fileExtension']}" alt="{$Wiki}" title="{$Wiki}" src="{$blankIcon}"/>
					</xsl:when>
					<xsl:otherwise>
						<img class="lconnSprite-iconWikis40" alt="{$Wiki}" title="{$Wiki}" src="{$blankIcon}" style="margin-left: 7px;"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="commentCount">
		<xsl:choose>
			<xsl:when test="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment'] = 1">
				<li role="listitem" class="comments">
					<xsl:value-of select="$OneComment"/>
				</li>
			</xsl:when>
			<xsl:when test="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment'] &gt; 1">
				<li role="listitem" class="comments">
					<xsl:value-of select="substring-before($Comments,'{0}')"/>
					<xsl:value-of select="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/comment']"/>
					<xsl:value-of select="substring-after($Comments,'{0}')"/>
				</li>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="objectReference">
		<xsl:if test="ibmsc:field[@id='FIELD_OBJECT_REF_DISPLAY_NAME'] and ibmsc:field[@id='FIELD_OBJECT_REF_URL']">
			<li role="listitem">
				<a>
					<xsl:attribute name="href">
						<xsl:value-of select="ibmsc:field[@id='FIELD_OBJECT_REF_URL']"></xsl:value-of>
					</xsl:attribute>
					<xsl:value-of select="ibmsc:field[@id='FIELD_OBJECT_REF_DISPLAY_NAME']"></xsl:value-of>
				</a>
			</li>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="bookmarkHelpBuilder">
		<xsl:if test="((atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='dogear'
							and count(atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']) &gt; 1) 
						or (atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:bookmark'
							and count(atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']) &gt; 2)
						or (atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:bookmark'
							and count(atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']) &gt; 2)
						) 
					and atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/accesscontrolled']/@term='public'">
			&#160;
			<a role="button">
				<xsl:attribute name="class">lconnSearchBookmarkHelpButton</xsl:attribute>
				<xsl:attribute name="href">javascript:;</xsl:attribute>
				<img src="{$blankIcon}" class="lconnSprite lconnSprite-iconHelp16">
					<xsl:attribute name="title">
						<xsl:value-of select="$help"/>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$help"/>
					</xsl:attribute>
				</img>
				<span class="lotusAltText">?</span>
			</a>
			<div style="display:none">
				<span class="lotusLeft lconnSearchBookmarkHelpText">
					<ul>
						<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='dogear'">
							<li><xsl:value-of select="$bookmarksTitle"/></li>
						</xsl:if>
						<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:bookmark'">
							<li><xsl:value-of select="$activitiesTitle"/></li>
						</xsl:if>
						<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:bookmark'">
							<li><xsl:value-of select="$communitiesTitle"/></li>
						</xsl:if>
					</ul>
				</span>
			</div>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="resultSummary">
		<xsl:param name="resultType"/>
		<div class="lotusClear">
			<span class="lconnSearchComponentCategory">
				<xsl:if test="$newStyle != 'true'">
					<xsl:call-template name="resultIcon">
						<xsl:with-param name="resultType" select="$resultType"/>
					</xsl:call-template>
				</xsl:if>
				<xsl:call-template name="parentageMeta">
					<xsl:with-param name="resultType" select="$resultType"/>
				</xsl:call-template>
				<xsl:call-template name="resultTypeLabel">
					<xsl:with-param name="resultType" select="$resultType"/>
				</xsl:call-template>
			</span>
			<xsl:choose>
				<xsl:when test="string-length(atom:summary)!=0">
					<xsl:if test="$resultType = 'status_update'">
						<ul style="display: inline" class="lotusInlinelist" role="presentation">
							<li class="lotusMeta lconnSearchHighlight"><xsl:value-of select="$Comment"/></li>
						</ul>
					</xsl:if>
					<span class="lotusMeta lconnSearchHighlight bidiAware">
						<xsl:value-of select="atom:summary"/>
					</span>&#160;
				</xsl:when>
				<xsl:when test="$resultType != 'status_update'">
					<em class="lotusMeta">
						<xsl:value-of select="$NoDescription"/>
					</em>
				</xsl:when>
			</xsl:choose>
		</div>
		<xsl:if test="ibmsc:field[@id='commentsSummary'] and not ($resultType = 'status_update')">
			<div class="lotusClear">
				<span class="lotusMeta lconnSearchHighlight"><xsl:value-of select="$Comment"/>&#160;<xsl:value-of select="ibmsc:field[@id='commentsSummary']"/></span>&#160;
			</div>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="resultIcon">
		<xsl:param name="resultType" />
		<xsl:choose>
			<xsl:when test="$resultType = 'blogs'">
				<img class="lconnSprite lconnSprite-iconBlogs16" 
						src="{$blankIcon}" alt="{$Blogs}" title="{$Blogs}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'profiles'">
				<xsl:choose>
					<xsl:when test="position()=1 and atom:author/snx:userState = 'inactive'">
						<xsl:attribute name="class">lotusDim lotusFirst</xsl:attribute>
					</xsl:when>
					<xsl:when test="atom:author/snx:userState = 'inactive'">
						<xsl:attribute name="class">lotusDim</xsl:attribute>
					</xsl:when>
				</xsl:choose>
				<xsl:if test="atom:author/snx:userState = 'inactive'">
					<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
				</xsl:if>
				<img class="lconnSprite lconnSprite-iconProfiles16" 
					src="{$blankIcon}" alt="{$Profiles}" title="{$Profiles}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'wiki'">
				<xsl:choose>
					<xsl:when test="ibmsc:field[@id='fileExtension']">
						<img class="lconn-ftype16 lconn-ftype16-{ibmsc:field[@id='fileExtension']}" 
							src="{$blankIcon}" alt="{$Wiki}" title="{$Wiki}"/>
					</xsl:when>
					<xsl:otherwise>
						<img class="lconnSprite lconnSprite-iconWikis16" 
							src="{$blankIcon}" alt="{$Wiki}" title="{$Wiki}"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$resultType = 'files'">
				<xsl:choose>
					<xsl:when test="ibmsc:field[@id='fileExtension']">
						<img class="lconn-ftype16 lconn-ftype16-{ibmsc:field[@id='fileExtension']}" 
							src="{$blankIcon}" alt="{$Files}" title="{$Files}"/>
					</xsl:when>
					<xsl:otherwise>
						<img class="lconnSprite lconnSprite-iconFiles16" 
							src="{$blankIcon}" alt="{$Files}" title="{$Files}"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$resultType = 'activities'">
				<img class="lconnSprite lconnSprite-iconActivities16" 
					src="{$blankIcon}" alt="{$Activities}" title="{$Activities}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'forums'">
				<img class="lconnSprite lconnSprite-iconForums16" 
					src="{$blankIcon}" alt="{$Forums}" title="{$Forums}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'calendar'">
				<img class="lconnSprite lconnSprite-iconCalendar16" 
					src="{$blankIcon}" alt="{$Events}" title="{$Events}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'status_updates'">
				<img class="lconnSprite lconnSprite-iconStatusUpdate16" src="{$blankIcon}" alt="{$StatusUpdate}" title="{$StatusUpdate}"/>
			</xsl:when>
			<xsl:when test="$resultType = 'communities'">
				<xsl:choose>
					<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:feed'">
							<img class="lconnSprite lconnSprite-iconFeed16" 
								src="{$blankIcon}" alt="{$Feeds}" title="{$Feeds}"/>
					</xsl:when>
					<xsl:otherwise>
							<img class="lconnSprite lconnSprite-iconCommunities16" 
								src="{$blankIcon}" alt="{$Communities}" title="{$Communities}"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$resultType = 'bookmark'">
				<img class="lconnSprite lconnSprite-iconBookmarks16" src="{$blankIcon}" alt="{$Bookmarks}" title="{$Bookmarks}"/>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="parentageMeta">
		<xsl:param name="resultType" />
		<xsl:variable name="primaryComponent" select="atom:category[ibmsc:field[@id='primaryComponent']]/@term" />
		<xsl:choose>
			<xsl:when test="ibmsc:field[@id='blogURL']">
				<span class="lotusMeta">
					<xsl:call-template name="communityParent"></xsl:call-template>
					<a class="icGreyText">
						<xsl:attribute name="href">
							<xsl:value-of select="ibmsc:field[@id='blogURL']"/>
						</xsl:attribute>
						
						<xsl:choose>
							<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:idea'">
								<xsl:value-of select="$fromAnIdeationBlog"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$fromABlog"/>
							</xsl:otherwise>
						</xsl:choose>
					</a> > 
				</span>
			</xsl:when>
			<xsl:when test="ibmsc:field[@id='forumURL']">
				<span class="lotusMeta">
					<xsl:call-template name="communityParent"></xsl:call-template>
					<a class="icGreyText">
						<xsl:attribute name="href">
							<xsl:value-of select="ibmsc:field[@id='forumURL']"/>
						</xsl:attribute>
						<xsl:value-of select="$fromAForum"/>
					</a> > 
				</span>
			</xsl:when>
			<xsl:when test="ibmsc:field[@id='wikiURL']">
				<span class="lotusMeta">
					<xsl:call-template name="communityParent"></xsl:call-template>
					<a class="icGreyText">
						<xsl:attribute name="href">
							<xsl:value-of select="ibmsc:field[@id='wikiURL']"/>
						</xsl:attribute>
						<xsl:value-of select="$fromAWiki"/>
					</a> > 
				</span>
			</xsl:when>
			<xsl:when test="(starts-with($primaryComponent,'activities') or starts-with($primaryComponent,'communities:activities')) 
								and ibmsc:field[@id='activityURL']">
				<span class="lotusMeta">
					<xsl:call-template name="communityParent"></xsl:call-template>
					<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:entry'
								or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:task' 
								or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:section'
								or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:file'
								or $primaryComponent='activities:bookmark' or $primaryComponent='communities:activities:bookmark'">
						<a class="icGreyText">
							<xsl:attribute name="href">
								<xsl:value-of select="ibmsc:field[@id='activityURL']"/>
							</xsl:attribute>
							<xsl:value-of select="$fromAnActivity"/>
						</a> > 
					</xsl:if>
					
					<xsl:if test="ibmsc:field[@id='activityEntryURL'] and $primaryComponent='activities:bookmark'">
						<a class="icGreyText">
							<xsl:attribute name="href">
								<xsl:value-of select="ibmsc:field[@id='activityEntryURL']"/>
							</xsl:attribute>
							<xsl:value-of select="$Entry"/>
						</a> > 
					</xsl:if>
				</span>
			</xsl:when>
			<xsl:when test="snx:communityUuid 
					and not (atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:entry')">
				<span class="lotusMeta">
					<xsl:call-template name="communityParent"></xsl:call-template>
				</span>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="communityParent">
		<xsl:variable name="primaryComponent" select="atom:category[ibmsc:field[@id='primaryComponent']]/@term" />
		<xsl:if test="snx:communityUuid and not (ibmsc:field[@id='container_type']='stand-alone') 
				and not ($primaryComponent='communities:entry') and starts-with($primaryComponent,'communities')">
			<a class="icGreyText">
				<xsl:attribute name="href">
					<xsl:value-of select="atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/container' and @type='text/html']/@href"/>
				</xsl:attribute>
				<xsl:value-of select="$fromACommunity"/>
			</a> > 
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="resultTypeLabel">
		<xsl:param name="resultType"/>
		<xsl:choose>
			<xsl:when test="$resultType='activities'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:task'">
							<xsl:value-of select="$ActivityTodo"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:activity'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:community_activity'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:community_activity+members'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:explicit_membership_community_activity'">
							<xsl:value-of select="$Activity"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:bookmark'">
							<xsl:value-of select="$ActivityBookmark"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:section'">
							<xsl:value-of select="$ActivitySection"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:reply'">
							<xsl:value-of select="$ActivityComment"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:file'">
							<xsl:value-of select="$ActivityFile"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$ActivityEntry"/>
						</xsl:otherwise>
					</xsl:choose>
				</span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='blogs'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:ideationblog'">
							<xsl:value-of select="$IdeationBlog"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:idea'">
							<xsl:value-of select="$Idea"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:comment'">
							<xsl:value-of select="$IdeaComment"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:entry'">
							<xsl:value-of select="$BlogEntry"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:comment'">
							<xsl:value-of select="$BlogComment"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$Blog"/>
						</xsl:otherwise>
					</xsl:choose>
				</span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='calendar'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='calendar'">
							<xsl:value-of select="$CalendarEvent"/>
						</xsl:when>
					</xsl:choose>
				</span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='communities'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:entry'">
							<xsl:value-of select="$Community"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:feed'">
							<xsl:value-of select="$Feed"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:bookmark'">
							<xsl:value-of select="$Bookmark"/>
						</xsl:when>
					</xsl:choose>
				</span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='bookmark'">
				<span class="lotusMeta"><xsl:value-of select="$Bookmark"/></span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='files'">
				<span class="lotusMeta"><xsl:value-of select="$File"/></span>&#160;
			</xsl:when>
			<xsl:when test="$resultType='forums'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='forums:forum'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:forums:forum'
										">
							<xsl:value-of select="$Forum"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='forums:category'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:forums:category'
										">
							<xsl:value-of select="$ForumCategory"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='forums:file'
										or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:forums:file'
										">
							<a class="icGreyText">
								<xsl:attribute name="href">
									<xsl:value-of select="ibmsc:field[@id='topicURL']"/>
								</xsl:attribute>
								<xsl:value-of select="$ForumTopicWithAttachment"/>
							</a> > 
							<xsl:value-of select="$ForumAttachment"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$ForumTopic"/>
						</xsl:otherwise>
					</xsl:choose>
				</span>&#160;	
			</xsl:when>
			<xsl:when test="$resultType='profiles'">
				<span class="lotusMeta">
					<xsl:value-of select="$Profile"/>
				</span>&#160;	
			</xsl:when>
			<xsl:when test="$resultType='wiki'">
				<span class="lotusMeta">
					<xsl:choose>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis:wiki'">
							<xsl:value-of select="$WikiType"/>
						</xsl:when>
						<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis:file'">
							<xsl:value-of select="$WikiFile"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$WikiPage"/>
						</xsl:otherwise>
					</xsl:choose>
				</span>&#160;	
			</xsl:when>
			<xsl:when test="$resultType='status_update'">
				<span class="lotusMeta">
					<xsl:value-of select="$StatusUpdate"/>
				</span>&#160;	
			</xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="ratingIcon">
		<xsl:if test="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']
					and (snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations'] &gt; 0
					or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:idea')">
			<span class="lotusRight lotusNowrap">
				<xsl:choose>
					<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:idea'">
						<xsl:if test="string-length(ibmsc:field[@id='ideaGraduated'])!=0">
							<span class="lotusMeta lconnSearchIdeaGraduated">
							<xsl:value-of select="$Graduated"/>
							</span>
						</xsl:if>
						<span class="lotusMeta">
							<xsl:choose>
								<xsl:when test="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations'] = 1">
									<xsl:value-of select="$OneVote"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="substring-before($Votes,'{0}')"/>
									<xsl:value-of select="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']"/>
									<xsl:value-of select="substring-after($Votes,'{0}')"/>
								</xsl:otherwise>
							</xsl:choose>
						</span>
					</xsl:when>
					<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs:ideationblogs:ideationblog'">
					</xsl:when>
					<xsl:otherwise>
						<div class="searchLikesControlContainer">
							<xsl:attribute name="rank">
								<xsl:value-of select="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/recommendations']"/>
							</xsl:attribute>
						</div>
					</xsl:otherwise>
				</xsl:choose>
			</span>
		</xsl:if>
	</xsl:template>

	<!-- person cloud -->
	<xsl:template name="personCloud">
		<xsl:choose>
			<xsl:when test="count(ibmsc:facets/ibmsc:facet[@id='Person']/ibmsc:facetValue)=0">
				<span class="lconnEmpty"><xsl:value-of select="$noPeople"/></span>
			</xsl:when>
			<xsl:otherwise>
				<ul class="lotusList">
					<xsl:for-each select="ibmsc:facets/ibmsc:facet[@id='Person']/ibmsc:facetValue">
						<li class="lotusMeta">
							<xsl:attribute name="class">
								<xsl:number value="position()"/>-<xsl:value-of select="@weight"/>
							</xsl:attribute>
							<xsl:call-template name="personFacetCardbuilder"></xsl:call-template>
						</li>
					</xsl:for-each>
				</ul>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- Date cloud -->
	<xsl:template name="dateCloud">
		<xsl:choose>
			<xsl:when test="count(ibmsc:facets/ibmsc:facet[@id='Date']/ibmsc:facetValue)=0">
				<span class="lconnEmpty"><xsl:value-of select="$noDate"/></span>
			</xsl:when>
			<xsl:otherwise>
				<ul class="lotusList">
					<xsl:for-each select="ibmsc:facets/ibmsc:facet[@id='Date']/ibmsc:facetValue">
						<li class="lotusYearEntry">
							<xsl:attribute name="id">y<xsl:value-of select="@label" /></xsl:attribute>
							<a href="javascript:;" aria-expanded="false" role="button"
								class="lotusSprite lotusArrow lotusTwistyClosed">
								<xsl:attribute name="title">
									<xsl:value-of select="substring-before($twistyAlt,'{0}')"/>
									<xsl:value-of select="@label"/>
									<xsl:value-of select="substring-after($twistyAlt,'{0}')"/>
								</xsl:attribute>
								<span class="lotusAltText">+/-</span>
							</a>
							<a class="searchYearLink" href="javascript:;">
								<xsl:attribute name="onclick">
										javascript:searchObject.performDateFilter('<xsl:value-of select="@id" />');
								</xsl:attribute>
								<xsl:value-of select="@label" />
							</a>
							<ul class="lotusList lotusMonthTree" style="display:none;">
								<xsl:attribute name="id">m<xsl:value-of select="@label" /></xsl:attribute>
								<xsl:for-each select="ibmsc:facetValue">
									<li class="lotusMonthEntry">
									<xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute>
										<a class="searchMonthLink" href="javascript:;">
											<xsl:attribute name="onclick">
													javascript:searchObject.performDateFilter('<xsl:value-of select="@id"/>');
											</xsl:attribute>
											<xsl:choose>
													<xsl:when test="@label='01'"><xsl:value-of select="$Jan"/></xsl:when>
													<xsl:when test="@label='02'"><xsl:value-of select="$Feb"/></xsl:when>
													<xsl:when test="@label='03'"><xsl:value-of select="$Mar"/></xsl:when>
													<xsl:when test="@label='04'"><xsl:value-of select="$Apr"/></xsl:when>
													<xsl:when test="@label='05'"><xsl:value-of select="$May"/></xsl:when>
													<xsl:when test="@label='06'"><xsl:value-of select="$Jun"/></xsl:when>
													<xsl:when test="@label='07'"><xsl:value-of select="$Jul"/></xsl:when>
													<xsl:when test="@label='08'"><xsl:value-of select="$Aug"/></xsl:when>
													<xsl:when test="@label='09'"><xsl:value-of select="$Sep"/></xsl:when>
													<xsl:when test="@label='10'"><xsl:value-of select="$Oct"/></xsl:when>
													<xsl:when test="@label='11'"><xsl:value-of select="$Nov"/></xsl:when>
													<xsl:when test="@label='12'"><xsl:value-of select="$Dec"/></xsl:when>
											</xsl:choose>
										</a>
									</li>
								</xsl:for-each>
							</ul>
						</li>
					</xsl:for-each>
				</ul>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- person card stanza builder-->
	<xsl:template name="personCardbuilder">
		<xsl:if test="string-length(atom:author/atom:name)&gt;0">
			<span>
				<xsl:attribute name="class">
					lotusPerson
					<xsl:choose>
						<xsl:when test="atom:author/snx:userState != 'active'">
							lotusPersonInactive
						</xsl:when>
						<xsl:otherwise>
							vcard
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<a class="fn lotusPerson bidiAware" href="javascript:;">
					<xsl:variable name="escapedParameterValue">
						<xsl:call-template name="escapeQuotes">
							<xsl:with-param name="value"><xsl:value-of select="atom:author/snx:userid"/></xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
				
					<xsl:attribute name="onclick">
						javascript:searchObject.performPersonFilter('<xsl:value-of select="$escapedParameterValue"/>');
					</xsl:attribute>
					
					<xsl:if test="atom:author/snx:userState != 'active'">
						<xsl:value-of select="substring-before($inactive,'{0}')"/>
					</xsl:if>
					<xsl:value-of select="atom:author/atom:name"/>
					<xsl:if test="atom:author/snx:userState != 'active'">
						<xsl:value-of select="substring-after($inactive,'{0}')"/>
					</xsl:if>
				</a>
				<xsl:if test="string-length(atom:author/snx:userid)&gt;0">
					<span class="x-lconn-userid" style="display:none">
						<xsl:value-of select="atom:author/snx:userid"/>
					</span>
				</xsl:if>
			</span>
		</xsl:if>
	</xsl:template>
	
	<!-- person facet card builder-->
	<xsl:template name="personFacetCardbuilder">
		<xsl:if test="string-length(@label)&gt;0">
			<span>
				<xsl:attribute name="class">lotusPerson vcard</xsl:attribute>
				<a class="fn lotusPerson bidiAware" href="javascript:;">
					<xsl:variable name="escapedParameterValue">
						<xsl:call-template name="escapeQuotes">
							<xsl:with-param name="value"><xsl:value-of select="substring-after(@id,'Person/')"/></xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
				
					<xsl:attribute name="onclick">
						javascript:searchObject.performPersonFilter('<xsl:value-of select="$escapedParameterValue"/>');
					</xsl:attribute>
					<xsl:value-of select="@label"/>
				</a>
				<xsl:if test="string-length(@id)&gt;0">
					<span class="x-lconn-userid" style="display:none">
						<xsl:value-of select="substring-after(@id,'Person/')" />
					</span>
				</xsl:if>
			</span>
		</xsl:if>
	</xsl:template>

	<!-- tag strip builder for results -->
	<xsl:template name="tagBuilder">
		<span>
			<xsl:variable name="tagNum">
				<xsl:choose>
					<xsl:when test="atom:tagsCount">
						<xsl:value-of select="atom:tagsCount"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="count(atom:category[not(@scheme)])"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:variable name="t1">
				<xsl:value-of select="substring-before($TagsMore,'{0}')"/>
				<xsl:value-of select="$tagNum - 3"/>
				<xsl:value-of select="substring-after($TagsMore,'{0}')"/>
			</xsl:variable>
			<xsl:if test="$tagNum &gt; 0">
				<xsl:value-of select="$Tags"/>&#160;
					<ul class="lotusInlinelist" style="display:inline">
						<xsl:for-each select="atom:category[not(@scheme)]">
							<xsl:if test="position() &lt;= 3">
								<li style="padding:0px">
									<xsl:attribute name="class">
										<xsl:choose>
											<xsl:when test="position()!=last()">
												lotusFirst
											</xsl:when>
											<xsl:otherwise>
												lotusLast
											</xsl:otherwise>
										</xsl:choose>
									</xsl:attribute>
									<a href="javascript:;">
									
										<xsl:variable name="escapedParameterValue">
											<xsl:call-template name="escapeQuotes">
												<xsl:with-param name="value"><xsl:value-of select="@term"/></xsl:with-param>
											</xsl:call-template>
										</xsl:variable>
									
										<xsl:attribute name="onclick">
											searchObject.performTagFilter('<xsl:value-of select="$escapedParameterValue"/>');
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:value-of select="@term"/>
										</xsl:attribute>
										<xsl:attribute name="class">
											<xsl:if test="ibmsc:field[@id='highlight']">
												lconnSearchHighlight 
											</xsl:if>
										bidiAware
										</xsl:attribute>
										<xsl:value-of select="@term"/>
									</a><xsl:if test="position() &lt; 3 and position()!=last()">,&#160;</xsl:if>
								</li>
							</xsl:if>
						</xsl:for-each>
					</ul>
				<xsl:if test="$tagNum &gt; 3">&#160;<xsl:value-of select="$t1"/></xsl:if>
			</xsl:if>
		</span>
	</xsl:template>
	
	<!-- ECM Document Type strip builder for results 	-->
	<xsl:template name="ecmDocumentTypeBuilder">
		<xsl:param name="ecmDocumentType"/>
		<xsl:param name="isFirst"/>
		<xsl:if test="$ecmDocumentType and $isFirst">
				<li role="listitem">
					<xsl:value-of select="$DocumentTypePrefix"/>&#160;
					<a href="javascript:;">
						<xsl:variable name="escapedParameterValue">
							<xsl:call-template name="escapeQuotes">
								<xsl:with-param name="value"><xsl:value-of select="$ecmDocumentType/@term"/></xsl:with-param>
							</xsl:call-template>
						</xsl:variable>
						<xsl:attribute name="onclick">
							searchObject.performEcmDocumentTypeFilter('<xsl:value-of select="$escapedParameterValue"/>');
						</xsl:attribute>
						<xsl:attribute name="alt">
							<xsl:value-of select="$ecmDocumentType/@label"/>
						</xsl:attribute>
						<xsl:value-of select="$ecmDocumentType/@label"/>
					</a>
					<xsl:call-template name="ecmDocumentTypeBuilder">
						<xsl:with-param name="ecmDocumentType" select="$ecmDocumentType/atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/ecmdocumenttype']"/>
						<xsl:with-param name="isFirst" select="false()"/>
					</xsl:call-template>
				</li>
		</xsl:if>
		<xsl:if test="$ecmDocumentType and not ($isFirst)">
				 &gt;&#160;<a href="javascript:;">
				 	<xsl:variable name="escapedParameterValue">
						<xsl:call-template name="escapeQuotes">
							<xsl:with-param name="value"><xsl:value-of select="$ecmDocumentType/@term"/></xsl:with-param>
						</xsl:call-template>
					</xsl:variable>
					<xsl:attribute name="onclick">
						searchObject.performEcmDocumentTypeFilter('<xsl:value-of select="$escapedParameterValue"/>');
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$ecmDocumentType/@label"/>
					</xsl:attribute>
					<xsl:value-of select="$ecmDocumentType/@label"/>
				</a>
				<xsl:call-template name="ecmDocumentTypeBuilder">
					<xsl:with-param name="ecmDocumentType" select="$ecmDocumentType/atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/ecmdocumenttype']"/>
					<xsl:with-param name="isFirst" select="false()"/>
				</xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<!-- top result count -->
	<xsl:template name="topResultCount">
		<xsl:param name="nodeClass" select="''"/>
		<xsl:variable name="start" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="t1">
			<xsl:value-of select="substring-before($MsgResults,'{0}')"/>
			<xsl:value-of select="$start"/>
			<xsl:value-of select="substring-after($MsgResults,'{0}')"/>
		</xsl:variable>
		<xsl:variable name="t2">
			<xsl:value-of select="substring-before($t1,'{1}')"/>
			<xsl:choose>
				<xsl:when test="not (($start + $ps) &gt; $total)">
					<xsl:value-of select="($start + $ps)-1" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$total"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="substring-after($t1,'{1}')"/>
		</xsl:variable>
		<xsl:variable name="t3">
			<xsl:value-of select="substring-before($t2,'{2}')"/>
			<xsl:value-of select="$total"/>
			<xsl:value-of select="substring-after($t2,'{2}')"/>
		</xsl:variable>
		<div class="icCounts {$nodeClass}" aria-live="assertive" aria-relevant="all">
			<xsl:value-of select="substring-before($t3,'{span}')"/>
			<span>
				<xsl:variable name="t3Parsed">
					<xsl:value-of select="substring-after($t3,'{span}')"/>
				</xsl:variable>
				<xsl:value-of select="substring-before($t3Parsed,'{/span}')"/>
			</span>
			<xsl:value-of select="substring-after($t3,'{/span}')"/>
		</div>
	</xsl:template>
	
	<!-- top pagination bar -->
	<xsl:template name="topPagination">
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="maxPage">
			<xsl:choose>
				<xsl:when test="($total mod $ps) &gt; 0">
					<xsl:value-of select="floor($total div $ps) + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="floor($total div $ps)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<div class="lotusPaging" role="navigation">
			<xsl:attribute name="aria-label"><xsl:value-of select="$PagingTop" /></xsl:attribute>
			<xsl:call-template name="topResultCount">
				<xsl:with-param name="nodeClass">lotusLeft</xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="paginationBlock">
				<xsl:with-param name="position">Top</xsl:with-param>
			</xsl:call-template>
			<div class="pagingContainer">
				<xsl:attribute name="maximum">
					<xsl:value-of select="$maxPage"/>
				</xsl:attribute>&#160;
			</div>
		</div>
	</xsl:template>
	
	<xsl:template name="newTopPagination">
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="maxPage">
			<xsl:choose>
				<xsl:when test="($total mod $ps) &gt; 0">
					<xsl:value-of select="floor($total div $ps) + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="floor($total div $ps)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<div class="lotusPaging icPagination" role="navigation">
			<xsl:attribute name="aria-label"><xsl:value-of select="$PagingTop" /></xsl:attribute>
			<div class="pagingContainer">
				<xsl:attribute name="maximum">
					<xsl:value-of select="$maxPage"/>
				</xsl:attribute>
				<xsl:call-template name="PrevNextBlock">
					<xsl:with-param name="position">Top</xsl:with-param>
				</xsl:call-template>
			</div>
		</div>
	</xsl:template>

	<!-- bottom pagination bar -->
	<xsl:template name="bottomPagination">
		<xsl:variable name="start" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="page" select="round($start div $ps) + 1" />
		<xsl:variable name="maxPage">
			<xsl:choose>
				<xsl:when test="($total mod $ps) &gt; 0">
					<xsl:value-of select="floor($total div $ps) + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="floor($total div $ps)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<div class="lotusPaging" role="navigation">
			<xsl:attribute name="aria-label"><xsl:value-of select="$PagingBottom" /></xsl:attribute>
			<div class="lotusLeft">
				<xsl:value-of select="substring-before($MsgItems,'{0}')"/>
					<ul class="lotusInlinelist" role="presentation">
						<xsl:attribute name="aria-label"><xsl:value-of select="$MsgShow" /></xsl:attribute>
						<li class="lotusFirst"><xsl:value-of select="$MsgShow" />&#160;</li>
						<li class="lotusFirst" role="presentation">
							<xsl:choose>
								<xsl:when test="$ps=10">
									<xsl:attribute name="role">button</xsl:attribute>
									<xsl:attribute name="aria-pressed">true</xsl:attribute>
									<xsl:attribute name="aria-disabled">true</xsl:attribute>
									10</xsl:when>
								<xsl:otherwise>
									<a href="javascript:;" role="button" id="{$domNodeId}_PageSize_10">
										<xsl:attribute name="aria-pressed">false</xsl:attribute>
										<xsl:attribute name="aria-label">
											10
											<xsl:value-of select="substring-after($MsgItems,'{0}')"/>e
										</xsl:attribute>
										<xsl:attribute name="onclick">
											javascript:searchObject.setPageSize(10,"<xsl:value-of select="$domNodeId"/>_PageSize_25");
										</xsl:attribute>10</a>
								</xsl:otherwise>
							</xsl:choose>
						</li><li role="presentation">
							<xsl:choose>
								<xsl:when test="$ps=25">
									<xsl:attribute name="role">button</xsl:attribute>
									<xsl:attribute name="aria-pressed">true</xsl:attribute>
									<xsl:attribute name="aria-disabled">true</xsl:attribute>
									25</xsl:when>
								<xsl:otherwise>
									<a href="javascript:;" role="button" id="{$domNodeId}_PageSize_25">
										<xsl:attribute name="aria-pressed">false</xsl:attribute>
										<xsl:attribute name="aria-label">
											25
											<xsl:value-of select="substring-after($MsgItems,'{0}')"/>e
										</xsl:attribute>
										<xsl:attribute name="onclick">
											javascript:searchObject.setPageSize(25,"<xsl:value-of select="$domNodeId"/>_PageSize_50");
										</xsl:attribute>25</a>
								</xsl:otherwise>
							</xsl:choose>
						</li><li role="presentation">
							<xsl:choose>
								<xsl:when test="$ps=50">
									<xsl:attribute name="role">button</xsl:attribute>
									<xsl:attribute name="aria-pressed">true</xsl:attribute>
									<xsl:attribute name="aria-disabled">true</xsl:attribute>
									50</xsl:when>
								<xsl:otherwise>
									<a href="javascript:;" role="button" id="{$domNodeId}_PageSize_50">
										<xsl:attribute name="aria-label">
											50
											<xsl:value-of select="substring-after($MsgItems,'{0}')"/>e
										</xsl:attribute>
										<xsl:attribute name="aria-pressed">false</xsl:attribute>
										<xsl:attribute name="onclick">
											javascript:searchObject.setPageSize(50,"<xsl:value-of select="$domNodeId"/>_PageSize_10");
										</xsl:attribute>50</a>
								</xsl:otherwise>
							</xsl:choose>
						</li>
						<li class="lotusLast"><xsl:value-of select="substring-after($MsgItems,'{0}')"/></li>
					</ul>
			</div>
			<xsl:call-template name="paginationBlock">
				<xsl:with-param name="position">Bottom</xsl:with-param>
			</xsl:call-template>
		</div>
	</xsl:template>

	<!-- pagination numbering -->
	<xsl:template name="PrevNextBlock">
		<xsl:param name="position"/>
		<xsl:variable name="start" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="page" select="round($start div $ps) + 1" />
		<xsl:variable name="maxPage">
			<xsl:choose>
				<xsl:when test="($total mod $ps) &gt; 0">
					<xsl:value-of select="floor($total div $ps) + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="floor($total div $ps)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<span>
			<xsl:choose>
				<xsl:when test="$start = 1">
					<xsl:value-of select="$MsgPrevious"/>
				</xsl:when>
				<xsl:otherwise>
					<a href="javascript:;" id="{$domNodeId}_Paging{$position}_Previous">
						<xsl:attribute name="onclick">
							javascript:searchObject.performPagination(<xsl:value-of select="$page -1"/>);
						</xsl:attribute>
						<xsl:attribute name="title">
							<xsl:value-of select="$MsgPrevious"/>
						</xsl:attribute>
						<xsl:value-of select="$MsgPrevious"/>
					</a>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<span>
			<xsl:choose>
				<xsl:when test="($start + $ps) > $total">
					<xsl:value-of select="$MsgNext"/>
				</xsl:when>
				<xsl:otherwise>
					<a href="javascript:;" id="{$domNodeId}_Paging{$position}_Next">
						<xsl:attribute name="onclick">
							javascript:searchObject.performPagination(<xsl:value-of select="$page + 1"/>);
						</xsl:attribute>
						<xsl:attribute name="title">
							<xsl:value-of select="$MsgNext"/>
						</xsl:attribute>
						<xsl:value-of select="$MsgNext"/>
					</a>
				</xsl:otherwise>
			</xsl:choose>
		</span>
	</xsl:template>
	
	<xsl:template name="paginationBlock">
		<xsl:param name="position"/>
		<xsl:variable name="start" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="total" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="ps" select="/atom:feed/os:itemsPerPage" />
		<xsl:variable name="page" select="round($start div $ps) + 1" />
		<xsl:variable name="maxPage">
			<xsl:choose>
				<xsl:when test="($total mod $ps) &gt; 0">
					<xsl:value-of select="floor($total div $ps) + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="floor($total div $ps)"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<ul class="lotusRight lotusInlinelist">
			<li class="lotusFirst">
				<xsl:choose>
					<xsl:when test="$start = 1">
						<xsl:value-of select="$MsgPrevious"/>
					</xsl:when>
					<xsl:otherwise>
						<a href="javascript:;" id="{$domNodeId}_Paging{$position}_Previous">
							<xsl:attribute name="onclick">
								javascript:searchObject.performPagination(<xsl:value-of select="$page -1"/>);
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="$MsgPrevious"/>
							</xsl:attribute>
							<xsl:value-of select="$MsgPrevious"/>
						</a>
					</xsl:otherwise>
				</xsl:choose>
			</li>
			<li>
				<xsl:choose>
					<xsl:when test="($start + $ps) > $total">
						<xsl:value-of select="$MsgNext"/>
					</xsl:when>
					<xsl:otherwise>
						<a href="javascript:;" id="{$domNodeId}_Paging{$position}_Next">
							<xsl:attribute name="onclick">
								javascript:searchObject.performPagination(<xsl:value-of select="$page + 1"/>);
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="$MsgNext"/>
							</xsl:attribute>
							<xsl:value-of select="$MsgNext"/>
						</a>
					</xsl:otherwise>
				</xsl:choose>
			</li>
		</ul>
	</xsl:template>
	
	<!-- Utility template to escape quotes in strings -->
	<xsl:template name="escapeQuotes">
		<xsl:param name="value"/>
 
		<xsl:variable name="backslashQuote">&#92;&#39;</xsl:variable>
		<xsl:variable name="singleQuote">&#39;</xsl:variable>
 
		<xsl:choose>
 
			<xsl:when test="string-length($value) &gt; 0 and contains($value, $singleQuote)">
				<xsl:value-of disable-output-escaping="yes" select="concat(substring-before($value, $singleQuote), $backslashQuote)"/>
 
				<xsl:call-template name="escapeQuotes">
					<xsl:with-param name="value" select="substring-after($value, $singleQuote)"/>
				</xsl:call-template>
			</xsl:when>
 
			<xsl:otherwise>
				<xsl:value-of disable-output-escaping="yes" select="$value"/>
			</xsl:otherwise>
			
		</xsl:choose>
	</xsl:template>

	<xsl:template name="noResultsTemplate">
		<div class="lconnEmpty" aria-relevant="all" aria-live="assertive">
			<span><xsl:value-of select="$NoResultsMessage"/></span>
		</div>
	</xsl:template>
	
	<xsl:template name="didYouMeanTemplate">
		<xsl:if test="/atom:feed/sp:spelling">
			<xsl:value-of select="/atom:feed/sp:spelling/sp:suggestion"/>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="multipleResultsNotFound">
		<strong><xsl:value-of select="$ResultNotFound"/></strong>
		<div>
			
			<xsl:value-of select="substring-before($MulTmpIndexingDifficulties,'{0}')"/>
			
			<xsl:variable name="multipleServices">
				<xsl:for-each select="/atom:feed/os:serviceWithIndexingDifficulties">
					
					<xsl:if test="position() &lt; count(/atom:feed/os:serviceWithIndexingDifficulties) -1 ">
						<xsl:if test="@service != 'calendar'">
							<xsl:call-template name="getTranslatedServiceName"/>&#44;
						</xsl:if>
					</xsl:if>
					<xsl:if test="position() = count(/atom:feed/os:serviceWithIndexingDifficulties) -1">
						
						<xsl:if test="@service != 'calendar'">
							<xsl:call-template name="getTranslatedServiceName"/>&#160;&#38;
						</xsl:if>
					</xsl:if>
					<xsl:if test="position() = count(/atom:feed/os:serviceWithIndexingDifficulties)">
						<xsl:call-template name="getTranslatedServiceName"/>
					</xsl:if>
				</xsl:for-each>
				
			</xsl:variable>
			
			<xsl:value-of select="substring($multipleServices,0,string-length($multipleServices)+1)"/>
			<xsl:value-of select="substring-after($MulTmpIndexingDifficulties,'{0}')"/>
		</div>
	</xsl:template>
	
	<xsl:template name="twoResultsfound">
		<strong><xsl:value-of select="$ResultNotFound"/></strong>
			<div>
				<xsl:value-of select="substring-before($MulTmpIndexingDifficulties,'{0}')"/>
				
				<xsl:variable name="service">
					<xsl:for-each select="/atom:feed/os:serviceWithIndexingDifficulties">
						<xsl:if test="@service != 'calendar'">
							<xsl:call-template name="getTranslatedServiceName"/>&#160;&#38;
						</xsl:if>
					</xsl:for-each>
				</xsl:variable>
				<xsl:value-of select="substring($service,0, string-length($service)-2)"/> 
				<xsl:value-of select="substring-after($MulTmpIndexingDifficulties,'{0}')"/>
			</div>
	</xsl:template>
	
	<xsl:template name="oneResultNotFound">
		<strong><xsl:value-of select="$ResultNotFound"/></strong>
			<div>
				<xsl:for-each select="/atom:feed/os:serviceWithIndexingDifficulties">
					
					<xsl:variable name="tempDiff1">
						<xsl:value-of select="substring-before($TmpIndexingDifficulties,'{0}')"/>
						<xsl:call-template name="getTranslatedServiceName"/>
					</xsl:variable>
					
					<xsl:variable name="tempDiff2">
						<xsl:value-of select="substring-after($TmpIndexingDifficulties,'{0}')"/>	
					</xsl:variable>
					
					<xsl:variable name="tempDiff3">
						<xsl:value-of select="substring-before($tempDiff2,'{1}')"/>
					</xsl:variable>
					
					<xsl:value-of select="$tempDiff1"/>
					<xsl:value-of select="$tempDiff3"/>
					<xsl:value-of select="@daysWithDifficulties"/>
					<xsl:value-of select="substring-after($TmpIndexingDifficulties,'{1}')"/>
				</xsl:for-each>
			</div>
	</xsl:template>
	
	<xsl:template name="getTranslatedServiceName">
		<xsl:if test="@service = 'activities'">
			<xsl:value-of select="$Activities"/>
		</xsl:if>
		<xsl:if test="@service = 'blogs'">
			<xsl:value-of select="$Blogs"/>
		</xsl:if>
		<xsl:if test="@service = 'communities'">
			<xsl:value-of select="$Communities"/>
		</xsl:if>
		<xsl:if test="@service = 'dogear'">
			<xsl:value-of select="$Bookmarks"/>
		</xsl:if>
		<xsl:if test="@service = 'files'">
			<xsl:value-of select="$Files"/>
		</xsl:if>
		<xsl:if test="@service = 'forums'">
			<xsl:value-of select="$Forums"/>
		</xsl:if>
		<xsl:if test="@service = 'profiles'">
			<xsl:value-of select="$Profiles"/>
		</xsl:if>
		<xsl:if test="@service = 'status_updates'">
			<xsl:value-of select="$StatusUpdates"/>
		</xsl:if>
		<xsl:if test="@service = 'wikis'">
			<xsl:value-of select="$Wiki"/>
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="addPersonilizedEvidence">
		<xsl:param name="resultType"/>
		<xsl:variable name="evidence" select="ibmsc:personalizationEvidence/ibmsc:association/@type"  />
		<div class="lotusMeta lconnSearchPersonalization">
			<xsl:choose>
				<xsl:when test="$evidence = 'author'">
					<xsl:choose>
						<xsl:when test="$resultType = 'communities' or $resultType = 'wiki' or $resultType = 'activities'">
							<xsl:value-of select="$YouAreOwner"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$YouAreAuthor"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:when test="$evidence = 'contributor'">
					<xsl:choose>
						<xsl:when test="$resultType = 'communities' or $resultType = 'wiki' or $resultType = 'activities'">
							<xsl:value-of select="$YouAreMember"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="$YouAreContributor"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
			</xsl:choose>
		</div>
	</xsl:template>
</xsl:stylesheet>