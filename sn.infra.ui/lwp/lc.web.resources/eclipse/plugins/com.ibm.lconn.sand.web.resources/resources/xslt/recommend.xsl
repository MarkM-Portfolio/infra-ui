<?xml version="1.0" encoding="utf-8"?>

<!-- Copyright IBM Corp. 2001, 2015  All Rights Reserved.              -->

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:ibmss="http://www.ibm.com/search/social/2011"
	xmlns:ibmsc="http://www.ibm.com/search/content/2010"
	xmlns:openSearch="http://a9.com/-/spec/opensearch/1.1/"
	xmlns:relevance="http://a9.com/-/opensearch/extensions/relevance/1.0/"
	xmlns:snx="http://www.ibm.com/xmlns/prod/sn" 
	xmlns:spelling="http://a9.com/-/opensearch/extensions/spelling/1.0/"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	exclude-result-prefixes="xhtml atom xsl atom ibmss ibmsc openSearch relevance snx spelling">
	
	<xsl:output method="html" encoding="utf-8" />

	<xsl:param name="activity"/>
	<xsl:param name="blog"/>
	<xsl:param name="bookmark"/>
	<xsl:param name="community"/>
	<xsl:param name="file"/>
	<xsl:param name="forum"/>
	<xsl:param name="wiki"/>
	<xsl:param name="blankIcon"/>
	<xsl:param name="tic"/>
	<xsl:param name="pic"/>
	<xsl:param name="profileUrl"/>
	<xsl:param name="remove"/>
	
	<xsl:template match="/atom:feed">
		<xsl:call-template name="recommendEntry"/>
	</xsl:template>

	<xsl:template name="recommendEntry">
		<div class="totalResults">
			<xsl:value-of select="count(atom:entry)"/>
		</div>
		<div role="list" class="lotusChunk">
			<table class="lotusTable" cellspacing="0" role="presentation">
				<xsl:for-each select="atom:entry">
					<tr class="{atom:id} rec" role="listitem">
						<td style="width: 19px;">
						   <xsl:call-template name="iconChooser"/>
						</td>
						<td class="lotusMeta">
							<a target="_blank" aria-describedby="lconnRecommendLinkDescription">
								<xsl:attribute name="href">
									<xsl:value-of select="atom:link/@href"/>
								</xsl:attribute>
								<xsl:attribute name="title">
									<xsl:value-of select="atom:title"/>
								</xsl:attribute>
								<xsl:choose>
									<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='files' 
									or atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis:file'">
										<xsl:attribute name="dir">ltr</xsl:attribute>
									</xsl:when>
									<xsl:otherwise>
										<xsl:attribute name="class">bidiAware</xsl:attribute>
									</xsl:otherwise>
								</xsl:choose>
								<xsl:value-of select="atom:title"/>
							</a>
							<xsl:if test="ibmss:entity_evidence[@type='tag']">
								<div>
									<a href="javascript:void(0);" class="person sand_tic lotusAction" action="{atom:id}" role="button" aria-haspopup="true"><xsl:value-of select="count(ibmss:entity_evidence[@type='tag'])"/></a>
									<div style="display:none;" class="tic_evidence {atom:id}">
										<div role="list">
											<xsl:for-each select="ibmss:entity_evidence[@type='tag']"><span role="listitem"><xsl:value-of select="@id"/></span><xsl:if test="position()!=last()">, </xsl:if></xsl:for-each>
										</div>
									</div>
								</div>
							</xsl:if>
							<xsl:if test="ibmss:entity_evidence[@type='personUserID']">
								<div>
									<a href="javascript:void(0);" class="person sand_pic lotusAction" action="{atom:id}" role="button" aria-haspopup="true"><xsl:value-of select="count(ibmss:entity_evidence[@type='personUserID'])"/></a>
									<div style="display:none;" class="pic_evidence {atom:id}">
										<ul class="lotusList">
											<xsl:for-each select="ibmss:entity_evidence[@type='personUserID']">
												<li class="lotusLeft">
													<span class="vcard">
														<xsl:choose>
															<xsl:when test="string-length($profileUrl) = 0">
																<span class="fn bidiAware">
																	<xsl:value-of select="text()"/>
																</span>
															</xsl:when>
															<xsl:otherwise>
																<a class="fn bidiAware">
																	<xsl:attribute name="href">
																		<xsl:value-of select="$profileUrl"/><xsl:value-of select="@id"/>
																	</xsl:attribute>
																	<xsl:value-of select="text()"/>
																</a>
															</xsl:otherwise>
														</xsl:choose>
														<span class="x-lconn-userid" style="display:none;"><xsl:value-of select="@id"/></span>
													</span>
												</li>
											</xsl:for-each>
										</ul>
									</div>
								</div>
							</xsl:if>
						</td>
						<td>
							<a role="button" tabindex="-1" href="javascript:;" class="lotusAccess feedback">
								<xsl:attribute name="action"><xsl:value-of select="atom:id"/></xsl:attribute>
								<xsl:value-of select="$remove"/>
							</a>
							<a role="button" href="javascript:;" class="lotusDelete sprite feedback" style="visibility: hidden; margin-top:2px;">
								<xsl:attribute name="aria-label"><xsl:value-of select="$remove"/></xsl:attribute>
								<xsl:attribute name="title"><xsl:value-of select="$remove"/></xsl:attribute>
								<xsl:attribute name="action"><xsl:value-of select="atom:id"/></xsl:attribute>
								<img>
									<xsl:attribute name="src"><xsl:value-of select="$blankIcon"/></xsl:attribute>
									<xsl:attribute name="action"><xsl:value-of select="atom:id"/></xsl:attribute>
									<xsl:attribute name="alt"><xsl:value-of select="$remove"/></xsl:attribute>
								</img>
								<span class="lotusAltText">X</span>
							</a>
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</div>
	</xsl:template>

	<xsl:template name="iconChooser">
		<img>
			<xsl:attribute name="src">
				<xsl:value-of select="$blankIcon"/>
			</xsl:attribute>
			<xsl:choose>
				<!-- blogs result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='blogs'">
					<xsl:attribute name="class">
						lconnSprite lconnSprite-iconBlogs16
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$blog"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$blog"/>
					</xsl:attribute>
				</xsl:when>
				<!-- files result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='files'">
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="ibmsc:field[@id='fileExtension']">
								lconn-ftype16 lconn-ftype16-<xsl:value-of select="ibmsc:field[@id='fileExtension']"/> 
							</xsl:when>
							<xsl:otherwise>lconnSprite lconnSprite-iconFiles16</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$file"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$file"/>
					</xsl:attribute>
				</xsl:when>
				<!-- forums result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='forums'">
					<xsl:attribute name="class">
						lconnSprite lconnSprite-iconForums16
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$forum"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$forum"/>
					</xsl:attribute>
				</xsl:when>
				<!-- wikis result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='wikis'">
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="ibmsc:field[@id='fileExtension']">
								lconn-ftype16 lconn-ftype16-{ibmsc:field[@id='fileExtension']} 
							</xsl:when>
							<xsl:otherwise>lconnSprite lconnSprite-iconWikis16</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$wiki"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$wiki"/>
					</xsl:attribute>
				</xsl:when>
				<!-- dogear result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='dogear'">
					<xsl:attribute name="class">
						lconnSprite lconnSprite-iconBookmarks16
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$bookmark"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$bookmark"/>
					</xsl:attribute>
				</xsl:when>
				<!-- activities result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='activities'">
					<xsl:attribute name="class">
						lconnSprite lconnSprite-iconActivities16
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$activity"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$activity"/>
					</xsl:attribute>
				</xsl:when>
				<!-- community result -->
				<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities'">
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:feed'">
								lconnSprite lconnSprite-iconFeed16 
							</xsl:when>
							<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:forum'">
								lconnSprite lconnSprite-iconForums16	
							</xsl:when>
							<xsl:when test="atom:category[@scheme='http://www.ibm.com/xmlns/prod/sn/component']/@term='communities:bookmark'">
								lconnSprite lconnSprite-iconBookmarks16
							</xsl:when>
							<xsl:otherwise>
								lconnSprite lconnSprite-iconCommunities16
							</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$community"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$community"/>
					</xsl:attribute>
				</xsl:when>
				<!-- default -->
				<xsl:otherwise>
					<xsl:attribute name="class">
						lconnSprite lconnSprite-iconCommunities16
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="$community"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="$community"/>
					</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</img>
	</xsl:template>
</xsl:stylesheet>
