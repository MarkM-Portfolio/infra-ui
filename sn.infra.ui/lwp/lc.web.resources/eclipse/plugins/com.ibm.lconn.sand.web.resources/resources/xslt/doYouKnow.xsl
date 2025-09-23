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
	exclude-result-prefixes="atom">
	
	<xsl:output method="text" encoding="utf-8" />

	<xsl:template match="/atom:feed">
		<xsl:call-template name="doYouKnow"/>
	</xsl:template>

	<xsl:template name="doYouKnow">
        
		<xsl:if test="count(atom:entry)&gt;0">
		[<xsl:for-each select="atom:entry">
			{
				name:"<xsl:call-template name="replace-string">
	                <xsl:with-param name="text" select="normalize-space(atom:author/atom:name/text())"/>
	                <xsl:with-param name="replace" select="'&quot;'" />
	                <xsl:with-param name="with" select="'\\\&quot;'"/>
	            </xsl:call-template>",
				uid:"<xsl:value-of select="atom:author/snx:userid"/>",
				evidence: [
								<xsl:for-each select="ibmss:association_evidence">
									{ename:"<xsl:value-of select="@type"/>",
									 evalue:"<xsl:value-of select="@count"/>"
									}<xsl:if test="not(position()=last())">,</xsl:if>
								</xsl:for-each>
						]
			}<xsl:if test="not(position()=last())">,</xsl:if>
		</xsl:for-each>]
		</xsl:if>
	</xsl:template>
	
    <xsl:template name="replace-string">
        <xsl:param name="text"/>
        <xsl:param name="replace"/>
        <xsl:param name="with"/>
        <xsl:choose>
            <xsl:when test="contains($text,$replace)">
                <xsl:value-of select="substring-before($text,$replace)"/>
                <xsl:value-of select="$with"/>
                <xsl:call-template name="replace-string">
                    <xsl:with-param name="text" select="substring-after($text,$replace)"/>
                    <xsl:with-param name="replace" select="$replace"/>
                    <xsl:with-param name="with" select="$with"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	
</xsl:stylesheet>
