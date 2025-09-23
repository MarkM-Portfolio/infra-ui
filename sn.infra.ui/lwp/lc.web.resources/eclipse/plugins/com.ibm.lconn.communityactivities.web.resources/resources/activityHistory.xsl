<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Copyright IBM Corp. 2008, 2015  All Rights Reserved.              -->
<xsl:stylesheet version="1.0" xmlns:f="http://www.w3.org/2005/Atom"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
    <xsl:output method='html' version='1.0' encoding='UTF-8'
        indent='yes' />
    <xsl:template match="/">
        <div class="ActivityHistory">
            <ul class="lotusList">
                <xsl:apply-templates select="/f:feed/f:entry" />
            </ul>
        </div>
    </xsl:template>
    <xsl:template match="f:entry">
        <li>
            <xsl:attribute name="class">
            <xsl:text>event_</xsl:text>
            <xsl:value-of
                select="./f:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term" />
                <xsl:if test="position() = 1">
                <xsl:text> lotus_first</xsl:text>
                </xsl:if>
                </xsl:attribute>
            <div class="icon"></div>
            <div class="lotusMeta">
                <span>
                    <xsl:choose>
                        <xsl:when test="./f:summary[@type='text']">
                            <xsl:call-template name="newline-to-break">
                                <xsl:with-param name="text">
                                    <xsl:call-template name="make-dojo-safe">
                                        <xsl:with-param name="text"
                                            select="./f:summary"/>
                                    </xsl:call-template>
                                </xsl:with-param>
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">escapedMarkup</xsl:attribute>
                            <xsl:call-template name="make-dojo-safe">
                                <xsl:with-param name="text" select="./f:summary"/>
                            </xsl:call-template>
                        </xsl:otherwise>
                    </xsl:choose>
                </span>
                <xsl:text> </xsl:text>
                <span class="date atomDate">
                    <xsl:value-of select="./f:updated" />
                </span>
            </div>
        </li>
    </xsl:template>

    <xsl:template name="newline-to-break">
        <xsl:param name="text" select="." />
        <xsl:choose>
            <xsl:when test="contains($text, '&#xa;')">
                <xsl:value-of select="substring-before($text, '&#xa;')" />
                <br />
                <xsl:call-template name="newline-to-break">
                    <xsl:with-param name="text"
                        select="substring-after($text,'&#xa;')" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="make-dojo-safe">
         <xsl:param name="text" select="." />
         <xsl:param name="noescape" select="no"/>
        <xsl:choose>
            <xsl:when test="contains($text, '${')">
                <xsl:value-of select="substring-before($text, '${')"/>
                <xsl:text>${ </xsl:text>
                <xsl:call-template name="make-dojo-safe">
                    <xsl:with-param name="text"
                        select="substring-after($text,'${')" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>
