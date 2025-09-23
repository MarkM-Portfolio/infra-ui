<?xml version="1.0" encoding="utf-8"?>
<!-- Copyright IBM Corp. 2007, 2015  All Rights Reserved.              -->

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:td="urn:ibm.com/td"
	xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:snx="http://www.ibm.com/xmlns/prod/sn"
	exclude-result-prefixes="atom td opensearch xhtml snx">
	
	<xsl:output method="html" encoding="utf-8" />

	<xsl:param name="blankIcon"/>
	<xsl:param name="Community"/>
	<xsl:param name="CommunityRef"/>
	<xsl:param name="File"/>
	<xsl:param name="Files"/>
	<xsl:param name="MsgPrevious"/>
	<xsl:param name="MsgItems"/>
	<xsl:param name="MsgNext"/>
	<xsl:param name="MsgShow"/>
	<xsl:param name="NextSuffix"/>
	<xsl:param name="NoResultsMessage"/>	
	<xsl:param name="PagingTop"/>
	<xsl:param name="PagingBottom"/>
	<xsl:param name="PreviousSuffix"/>
	<xsl:param name="LinkedLibraryPageSize"/>
	<xsl:param name="LinkedLibraryPrevNextPage"/>

	<xsl:template match="atom:feed">
		<xsl:choose>
			<xsl:when test="atom:entry">
				<xsl:call-template name="resultBuilder"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="noResultsTemplate"/>
			</xsl:otherwise>
		</xsl:choose>    
	</xsl:template>
			
	<xsl:template name="resultBuilder">		
    
		<xsl:variable name="totalFound" select="/atom:feed/opensearch:totalResults"/>
		<xsl:variable name="totalRequested" select="/atom:feed/opensearch:itemsPerPage" />
    
		<xsl:call-template name="topPagination"/>	
		<table class="lotusTable" border="0" cellspacing="0" cellpadding="0" role="presentation">
			<xsl:for-each select="atom:entry">
				<tr>
					<xsl:if test="position() = 1">
						<xsl:attribute name="class">lotusFirst</xsl:attribute>
					</xsl:if> 
					<xsl:if test="position() = last() and $totalFound = $totalRequested">
						<xsl:attribute name="class">lotusHidden</xsl:attribute>
					</xsl:if> 
					<td>
						<h4 class="lotusLeft">
							<a>
								<xsl:attribute name="href">
									<xsl:value-of select="atom:link/@href" />
								</xsl:attribute>								
								<xsl:attribute name="dir">ltr</xsl:attribute>								
								<xsl:value-of select="atom:title"/>						
							</a>
						</h4>
						<div class="lotusMeta">
							<ul class="lotusInlinelist" role="list" style="clear: both">
								<xsl:if test="string-length(atom:author/atom:name)&gt;0">
									<li class="searchPersonClass" role="listitem">
										<!--  Task 80492- TODO call personCardbuilder template to create biz card-->								
										<span class="searchNameClass">
                                            <xsl:value-of select="atom:author/atom:name"/>
                                        </span>
                                        
                                        <xsl:if test="string-length(atom:author/atom:email)&gt;0">
										<!--  Task 80492- TODO call personCardbuilder template to create biz card-->								
                                            <span class="searchEmailClass" style="display: none">
                                                <xsl:value-of select="atom:author/atom:email"/>
                                            </span>
                                        </xsl:if>
                                        
										<xsl:if test="string-length(atom:author/snx:userid)&gt;0">
											<span class="searchIdClass" style="display:none">
												<xsl:value-of select="atom:author/snx:userid"/>
											</span>
										</xsl:if>
                                        
									</li>
								</xsl:if>								
								<li class="searchDateClass" role="listitem">
									<xsl:value-of select="atom:updated"/>
								</li>
							</ul>
						</div>
						<div style="clear:both;">
							<span class="lconnSearchComponentCategory">
								<img class="lconn-ftype16" 
									src="{$blankIcon}" alt="{$Files}" title="{$Files}" role="presentation"/>
								<span class="lotusMeta"> 
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="$CommunityRef"/>
										</xsl:attribute>
										<xsl:value-of select="$Community"/>
									</a> > 
								</span>	
								<span class="lotusMeta"><xsl:value-of select="$File"/></span>&#160;
							</span>
						</div>
					</td>
				</tr>
			</xsl:for-each>
		</table>
 		<xsl:call-template name="bottomPagination"/>	
    </xsl:template>

	<xsl:template name="topPagination">
 		<xsl:variable name="start" select="/atom:feed/opensearch:startIndex"/>
		<xsl:variable name="totalFound" select="/atom:feed/opensearch:totalResults"/>
		<xsl:variable name="totalRequested" select="/atom:feed/opensearch:itemsPerPage" />
		
		<xsl:variable name="totalToDisplay">
			<xsl:choose>
				<xsl:when test="$totalFound = $totalRequested">
					<xsl:value-of select="$totalFound - 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$totalFound"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<div class="lotusPaging" role="navigation">
			<xsl:attribute name="aria-label">
				<xsl:value-of select="$PagingTop" />
			</xsl:attribute>
			<div class="lotusLeft" aria-live="assertive" aria-relevant="all">
				<xsl:value-of select="$start + 1"/>-
				<xsl:value-of select="$start + $totalToDisplay"/>
			</div>
			<xsl:call-template name="prevNextPage">
				<xsl:with-param name="position">Top</xsl:with-param>
			</xsl:call-template>
		</div>
    </xsl:template>

	<xsl:template name="bottomPagination">
		<xsl:variable name="totalRequested" select="/atom:feed/opensearch:itemsPerPage" />
		<xsl:variable name="PageSize">
			<xsl:value-of select="$totalRequested - 1"/>
		</xsl:variable>
		<div class="lotusPaging" role="navigation">
			<xsl:attribute name="aria-label"><xsl:value-of select="$PagingBottom" /></xsl:attribute>
			<div class="lotusLeft">
				<xsl:value-of select="substring-before($MsgItems,'{0}')"/>
				<ul class="lotusInlinelist" role="toolbar">
					<xsl:attribute name="aria-label"><xsl:value-of select="$MsgShow" /></xsl:attribute>
					<li class="lotusFirst"><xsl:value-of select="$MsgShow" />&#160;</li>
					<li class="lotusFirst" role="presentation">
						<xsl:choose>
							<xsl:when test="$PageSize=10">
								<xsl:attribute name="role">button</xsl:attribute>
								<xsl:attribute name="aria-pressed">true</xsl:attribute>
								<xsl:attribute name="aria-disabled">true</xsl:attribute>
								10
							</xsl:when>
							<xsl:otherwise>
								<a href="javascript:;" role="button"  id="{$LinkedLibraryPageSize}_10">
									<xsl:attribute name="aria-pressed">false</xsl:attribute>
									10
								</a>
							</xsl:otherwise>
						</xsl:choose>
					</li><li role="presentation">
						<xsl:choose>
							<xsl:when test="$PageSize=25">
								<xsl:attribute name="role">button</xsl:attribute>
								<xsl:attribute name="aria-pressed">true</xsl:attribute>
								<xsl:attribute name="aria-disabled">true</xsl:attribute>
								25
							</xsl:when>
							<xsl:otherwise>
								<a href="javascript:;" role="button"  id="{$LinkedLibraryPageSize}_25">
									<xsl:attribute name="aria-pressed">false</xsl:attribute>
									25
								</a>
							</xsl:otherwise>
						</xsl:choose>
					</li><li role="presentation">
						<xsl:choose>
							<xsl:when test="$PageSize=50">
								<xsl:attribute name="role">button</xsl:attribute>
								<xsl:attribute name="aria-pressed">true</xsl:attribute>
								<xsl:attribute name="aria-disabled">true</xsl:attribute>
								50
							</xsl:when>
							<xsl:otherwise>
								<a href="javascript:;" role="button"  id="{$LinkedLibraryPageSize}_50">
									<xsl:attribute name="aria-pressed">false</xsl:attribute>
									50
								</a>
							</xsl:otherwise>
						</xsl:choose>
					</li>
					<li class="lotusLast"><xsl:value-of select="substring-after($MsgItems,'{0}')"/></li>
				</ul>
			</div>
			<xsl:call-template name="prevNextPage">
				<xsl:with-param name="position">Bottom</xsl:with-param>
			</xsl:call-template>
		</div>
    </xsl:template>

	<xsl:template name="prevNextPage">
		<xsl:param name="position"/>		
		<xsl:variable name="start" select="/atom:feed/opensearch:startIndex"/>
		<xsl:variable name="totalFound" select="/atom:feed/opensearch:totalResults"/>
		<xsl:variable name="totalRequested" select="/atom:feed/opensearch:itemsPerPage" />
		<ul class="lotusRight lotusInlinelist">
			<li class="lotusFirst">
				<xsl:choose>
					<xsl:when test="$start = 0">
						<xsl:value-of select="$MsgPrevious"/>
					</xsl:when>
					<xsl:otherwise>
						<a href="javascript:;" id="{$LinkedLibraryPrevNextPage}{$position}{$PreviousSuffix}">
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
					<xsl:when test="$totalRequested &gt; $totalFound">
						<xsl:value-of select="$MsgNext"/>
					</xsl:when>
					<xsl:otherwise>
						<a href="javascript:;" id="{$LinkedLibraryPrevNextPage}{$position}{$NextSuffix}">
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
	
	<xsl:template name="noResultsTemplate">
		<div class="lconnEmpty" aria-relevant="all" aria-live="assertive">
			<span><xsl:value-of select="$NoResultsMessage"/></span>
		</div>
	</xsl:template>
    	
</xsl:stylesheet>
