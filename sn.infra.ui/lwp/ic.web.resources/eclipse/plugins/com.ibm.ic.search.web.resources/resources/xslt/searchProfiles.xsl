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

	<xsl:param name="Profiles"/>

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

	<xsl:param name="rec0"/>
	<xsl:param name="rec1"/>
	<xsl:param name="rec2"/>
	<xsl:param name="rec3"/>
	<!-- request filter -->
	<xsl:param name="filter" />
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
	<xsl:param name="noTag"/>
	<xsl:param name="noDate"/>
	<xsl:param name="noPeople"/>
	<xsl:param name="relevanceAlt"/>
	<xsl:param name="firstnameAlt"/>
	<xsl:param name="lastnameAlt"/>
	<xsl:param name="twistyAlt"/>
	<xsl:param name="inactive"/>
	<xsl:param name="MsgHeading"/>
	<xsl:param name="TmpIndexingDifficulties"/>
	<xsl:param name="ResultNotFound"/>
	<xsl:param name="MulTmpIndexingDifficulties"/>

	<!-- Meta -->
	<xsl:param name="Comments"/>
	<xsl:param name="Members" />	
	<xsl:param name="Tags"/>
	<xsl:param name="TagsMore"/>
	
	<!-- Profiles specific -->
	<xsl:param name="Phone"/>
	<xsl:param name="Email"/>
	
	<!-- Bookmark extra tags info -->
	<xsl:param name="tagsAreFrom"/>
	<xsl:param name="bookmarksTitle"/>
	<xsl:param name="communitiesTitle"/>
	<xsl:param name="activitiesTitle"/>
	<xsl:param name="help"/>
	
	<!-- extra params -->
	<xsl:param name="newStyle"/>
	<xsl:param name="communitiesURL"/>
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
					<xsl:if test="count(atom:entry) &gt; 0">
						<div class="lotusSort"></div>
					</xsl:if>
				</div>
				<xsl:call-template name="profilesResult"/>
				<xsl:if test="$totalResults &gt; 0">
					<xsl:call-template name="bottomPagination"/>
				</xsl:if>
				
				<div style="margin-bottom:10px;margin-top:10px;">

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

	<xsl:template name="profilesResult">
		<xsl:variable name="startIndex" select="/atom:feed/os:startIndex"/>
		<xsl:variable name="totalResults" select="/atom:feed/os:totalResults"/>
		<xsl:variable name="itemsPerPage" select="/atom:feed/os:itemsPerPage" />
		<xsl:choose>
			<xsl:when test="count(atom:entry)=0">
				<xsl:call-template name="noResultsTemplate"/>
			</xsl:when>
			<xsl:otherwise>
				<table class="lotusTable" border="0" cellspacing="0" cellpadding="0" role="presentation">
					<xsl:for-each select="atom:entry">
						<tr>
							<xsl:attribute name="class">
								<xsl:if test="$newStyle = 'true'">icConnectOnChildFocus </xsl:if>
								<xsl:if test="position() = 1">lotusFirst </xsl:if>
								<xsl:if test="atom:author/snx:userState = 'inactive'">lotusDim</xsl:if>
							</xsl:attribute>
							<xsl:if test="$newStyle = 'true'">
								<xsl:attribute name="onclick"><![CDATA[var a = __isContainedInChildAnchor(this, event.target || event.srcElement) ? null : this.querySelector(".icSearchMainAction"); a && a.click()]]></xsl:attribute>
							</xsl:if>
							<td class="lotusFirstCell" width="65" height="65" alt="">
								<div class="lconnProfilesPhotoContainer otherPeople64 otherPeople64-NoPhotoPerson55">
									<xsl:if test="atom:author/snx:userState = 'inactive'">
										<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
									</xsl:if>
									<img width="55" height="55" alt="">
										<xsl:attribute name="src">
											<xsl:value-of select="atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/image']/@href"/>
										</xsl:attribute>
									</img>
								</div>
							</td>
							<xsl:choose>
								<xsl:when test="$newStyle = 'true'">
									<td>
										<xsl:if test="atom:author/snx:userState = 'inactive'">
											<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
										</xsl:if>
										<div class="icSearchTitle">
											<h4>
												<xsl:choose>
													<xsl:when test="atom:author/snx:userState = 'active'">
														<span class="vcard lotusPerson">
																<a class="icSearchMainAction fn lotusPerson bidiAware hasHover">
																	<xsl:attribute name="href">
																		<xsl:value-of select="atom:link/@href" />
																	</xsl:attribute>
																	<xsl:value-of select="atom:title"/>
																</a>
																<span class="x-lconn-userid" style="display:none;"><xsl:value-of select="atom:author/snx:userid"/></span>
															</span>
													</xsl:when>
													<xsl:otherwise>
														<a class="icSearchMainAction">
															<xsl:attribute name="href">
																<xsl:value-of select="atom:link/@href" />
															</xsl:attribute>
															<xsl:value-of select="substring-before($inactive,'{0}')"/>
															<xsl:value-of select="atom:title"/>
															<xsl:value-of select="substring-after($inactive,'{0}')"/>
														</a>
													</xsl:otherwise>
												</xsl:choose>
											</h4>
										</div>
										<div class="lotusMeta">
											<ul class="lotusInlinelist">
												<xsl:variable name="entryMail" select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div/xhtml:a[@class='email']"/>
												<xsl:variable name="entryTitle" select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='title']"/>
												<xsl:variable name="entryPhone" select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='tel']/xhtml:span[@class='value']"/>
												<xsl:if test="$entryMail">
													<li>
														<xsl:attribute name="class">lotusFirst</xsl:attribute>
														<a>
															<xsl:attribute name="href">mailto:<xsl:value-of select="$entryMail"/></xsl:attribute>
															<xsl:value-of select="$entryMail"/>
														</a>
													</li>
												</xsl:if>
												<xsl:if test="$entryTitle">
													<li>
														<xsl:if test="not ($entryMail)">
															<xsl:attribute name="class">lotusFirst</xsl:attribute>
														</xsl:if>
														<span>
															<xsl:value-of select="$entryTitle"/>
														</span>
													</li>
												</xsl:if>
												<xsl:if test="$entryPhone">
													<li>
														<xsl:if test="not ($entryMail) and not ($entryTitle)">
															<xsl:attribute name="class">lotusFirst</xsl:attribute>
														</xsl:if>
														<span><xsl:value-of select="$Phone"/></span>&#160;
														<xsl:value-of select="$entryPhone"/>
													</li>
												</xsl:if>
												<xsl:if test="count(atom:category[not(@scheme)]) &gt; 0">
													<li class="icSearchTitle">
														<xsl:if test="not ($entryMail) and not ($entryTitle) and not ($entryPhone)">
															<xsl:attribute name="class">lotusFirst icSearchTitle</xsl:attribute>
														</xsl:if>
														<xsl:call-template name="tagBuilder" />
														<xsl:call-template name="bookmarkHelpBuilder"/>
													</li>
												</xsl:if>
											</ul>
										</div>
										<div>
											<span class="lotusLeft profilesLocationContainer">
												<xsl:value-of select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='location']"/>
											</span>
										</div>
									</td>
								</xsl:when>
								<xsl:otherwise>
									<td>
										<xsl:if test="atom:author/snx:userState = 'inactive'">
											<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
										</xsl:if>
										<h4>
											<xsl:choose>
												<xsl:when test="atom:author/snx:userState = 'active'">
													<span class="vcard lotusPerson">
															<a class="fn lotusPerson bidiAware hasHover">
																<xsl:attribute name="href">
																	<xsl:value-of select="atom:link/@href" />
																</xsl:attribute>
																<xsl:value-of select="atom:title"/>
															</a>
															<span class="x-lconn-userid" style="display:none;"><xsl:value-of select="atom:author/snx:userid"/></span>
														</span>
												</xsl:when>
												<xsl:otherwise>
													<a>
														<xsl:attribute name="href">
															<xsl:value-of select="atom:link/@href" />
														</xsl:attribute>
														<xsl:value-of select="substring-before($inactive,'{0}')"/>
														<xsl:value-of select="atom:title"/>
														<xsl:value-of select="substring-after($inactive,'{0}')"/>
													</a>
												</xsl:otherwise>
											</xsl:choose>
										</h4>
										<div>
											<span class="lotusLeft">
												<xsl:value-of select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='title']"/>
											</span><br />
											<span class="lotusLeft profilesLocationContainer">
												<xsl:value-of select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='location']"/>
											</span>
										</div>
									</td>
									<td class="lotusLastCell">
										<xsl:if test="atom:author/snx:userState = 'inactive'">
											<xsl:attribute name="style">filter: alpha(opacity = 50);</xsl:attribute>
										</xsl:if>
										<xsl:if test="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='tel']">
											<div>
												<span><xsl:value-of select="$Phone"/></span>&#160;
												<strong>
													<xsl:value-of select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div[@class='tel']/xhtml:span[@class='value']"/>
												</strong>
											</div>
										</xsl:if>
										<xsl:for-each select="atom:content/xhtml:div/xhtml:span[@class='vcard']/xhtml:div">
											<xsl:if test="xhtml:a[@class='email']">
												<div>
													<span><xsl:value-of select="$Email"/></span>&#160;
													<a>
														<xsl:attribute name="href">mailto:<xsl:value-of select="xhtml:a[@class='email']"/></xsl:attribute>
														<strong>
															<xsl:value-of select="xhtml:a[@class='email']"/>
														</strong>
													</a>
												</div>
											</xsl:if>
										</xsl:for-each>
										<xsl:if test="count(atom:category[not(@scheme)]) &gt; 0">
											<div>
												<xsl:call-template name="tagBuilder" />
												<xsl:call-template name="bookmarkHelpBuilder"/>
											</div>
										</xsl:if>
									</td>
								</xsl:otherwise>
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
			</xsl:otherwise>
		</xsl:choose>
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
				<xsl:attribute name="id">bookmarkHelpButton_<xsl:number value="position()"/></xsl:attribute>
				<xsl:attribute name="href">javascript:;</xsl:attribute>
				<xsl:attribute name="onclick">MenuPopup.showMenu('bookmarkHelp_<xsl:number value="position()"/>', event,{'focus':this}); return false;</xsl:attribute>
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
			<div wairole="alert" role="wairole:alert" class="lotusHelp" style="display:none">
				<xsl:attribute name="id">bookmarkHelp_<xsl:number value="position()"/></xsl:attribute>
				<div class="lotusInfoBox">
					<h2><xsl:value-of select="$tagsAreFrom"/></h2>
					<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='dogear'">
						<xsl:value-of select="$bookmarksTitle"/><br/>
					</xsl:if>
					<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities:bookmark'">
						<xsl:value-of select="$activitiesTitle"/><br/>
					</xsl:if>
					<xsl:if test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:bookmark'">
						<xsl:value-of select="$communitiesTitle"/><br/>
					</xsl:if>
				</div>
			</div>
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
										<xsl:attribute name="aria-pressed">false</xsl:attribute>
										<xsl:attribute name="aria-label">
											50
											<xsl:value-of select="substring-after($MsgItems,'{0}')"/>e
										</xsl:attribute>
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
		<xsl:if test="@service = 'profiles'">
			<xsl:value-of select="$Profiles"/>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>