<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Copyright IBM Corp. 2008, 2015  All Rights Reserved.              -->

<xsl:stylesheet version="1.0"  
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml" 
    xmlns:iw="http://www.ibm.com/iWidget"
 >
<xsl:output method="text" />

<xsl:template name="escapeQuote">
<xsl:param name="text" />
<xsl:if test="contains($text, '&#x22;')">
    <xsl:value-of select="substring-before($text, '&#x22;')" />
            <xsl:call-template name="escapeQuote">
                <xsl:with-param name="text"><xsl:value-of  select="substring-after($text, '&#x22;')" />
                </xsl:with-param>
             </xsl:call-template>
</xsl:if>
<xsl:if test="not(contains($text, '&#x22;'))"><xsl:value-of select="$text" /></xsl:if>
</xsl:template>

<xsl:template match="/">
    <xsl:variable name="markup">
        <xsl:call-template name="escapeQuote">
            <xsl:with-param name="text">
                <xsl:value-of select="normalize-space(html/body/span[@class='iw-Content'])" />
            </xsl:with-param>
        </xsl:call-template>
     </xsl:variable>
{   
"name":"<xsl:value-of select="html/body/@title"/>",
"metaData":
{
        <xsl:for-each select="html/head/meta">
            <xsl:choose>
                <xsl:when test="position()=last()">"<xsl:value-of select="./@name"/>":"<xsl:value-of select="./@content"/>"</xsl:when>
				<xsl:otherwise>"<xsl:value-of select="./@name"/>":"<xsl:value-of select="./@content"/>",</xsl:otherwise>
            </xsl:choose>
       </xsl:for-each>
 },
"events":
{
 		"publishedEvents":
				{
                <xsl:for-each select="html/body/span[@class='iw-Events']/span[@class='iw-PublishedEvent']">
                     <xsl:choose>
                         <xsl:when test="position()=last()"> "<xsl:value-of select="@title"/>":{"eventName":"<xsl:value-of select="@title"/>","payloadType":"<xsl:value-of select="span[@class='iw-payloadType']"/>"}</xsl:when>
                         <xsl:otherwise> "<xsl:value-of select="@title"/>":{"eventName":"<xsl:value-of select="@title"/>","payloadType":"<xsl:value-of select="span[@class='iw-payloadType']"/>"},</xsl:otherwise>
                     </xsl:choose>
                 </xsl:for-each>
				},
		"handledEvents":
				{
                <xsl:for-each select="html/body/span[@class='iw-Events']/span[@class='iw-HandledEvent']">
                    <xsl:choose>
                       <xsl:when test="position()=last()">"<xsl:value-of select="@title"/>":{"eventName":"<xsl:value-of select="@title"/>","payloadType":"<xsl:value-of select="span[@class='iw-payloadType']"/>","onEvent":"<xsl:value-of select="span[@class='iw-eventHandler']"/>"}</xsl:when>
                       <xsl:otherwise> "<xsl:value-of select="@title"/>":{"eventName":"<xsl:value-of select="@title"/>","payloadType":"<xsl:value-of select="span[@class='iw-payloadType']"/>","onEvent":"<xsl:value-of select="span[@class='iw-eventHandler']"/>"},</xsl:otherwise>
                   </xsl:choose>
                </xsl:for-each>
                } 
 },
"itemSets":
{
        <xsl:for-each select="html/body/span[@class='iw-ItemSet']">
            "<xsl:value-of select="@title"/>":
                {
                    "name":"<xsl:value-of select="@title"/>",
                    "itemLists":
                                {
                                    <xsl:for-each select="span[@class='iw-Item']">
                                        <xsl:choose>
                                            <xsl:when test="position()=last()">"<xsl:value-of select="@title"/>":{"name":"<xsl:value-of select="@title"/>","values":"<xsl:value-of select="."/>"}</xsl:when>
                                            <xsl:otherwise>"<xsl:value-of select="@title"/>":{"name":"<xsl:value-of select="@title"/>","values":"<xsl:value-of select="."/>"},</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:for-each>
                                }
                 }
        </xsl:for-each>
 },  
"resources":{
        <xsl:for-each select="html/body/span[@class='iw-Resource']">
            <xsl:choose>
                   <xsl:when test="position()=last()">"<xsl:value-of select="@title"/>":{"src":"<xsl:value-of select="a[@class='iw-src']/@href"/>","name":"<xsl:value-of select="@title"/>"}</xsl:when>
                   <xsl:otherwise>"<xsl:value-of select="@title"/>":{"src":"<xsl:value-of select="a[@class='iw-src']/@href"/>","name":"<xsl:value-of select="@title"/>"},</xsl:otherwise>
             </xsl:choose>
        </xsl:for-each>
 },
 "markup":"<xsl:value-of select="translate($markup,'&quot;','\&quot;')"/>"
}
</xsl:template> 


</xsl:stylesheet>
 
