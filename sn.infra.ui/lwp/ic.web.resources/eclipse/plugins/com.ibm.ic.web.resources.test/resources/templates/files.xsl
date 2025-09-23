<?xml version="1.0" encoding="utf-8"?>
<!-- Copyright IBM Corp. 2008, 2015  All Rights Reserved.              -->






<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:a="http://www.w3.org/2005/Atom"
    xmlns:r="http://purl.org/atompub/rank/1.0"
    xmlns:app="http://purl.org/atom/app#"
    xmlns:snx="http://www.ibm.com/xmlns/prod/sn"
    xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:thr="http://purl.org/syndication/thread/1.0"
    xmlns:td="urn:ibm.com/td"
    xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/"
    exclude-result-prefixes="a app snx os xhtml thr opensearch r td">

    <xsl:output method="html" encoding="utf-8" />

    <xsl:param name="tags" />
    <xsl:param name="noRecommendAlt" />
    <xsl:param name="recommendAlt" />
    <xsl:param name="fullRecommendAlt" />
    <xsl:param name="noCommentsAlt" />
    <xsl:param name="commentsAlt" />
    <xsl:param name="filesMode" />
    <xsl:param name="downloadAlt"/>
    <xsl:param name="addedText"/>
    <xsl:param name="modifiedText"/>
    <xsl:param name="publicIconAlt"/>
    <xsl:param name="publicTitle"/>
    <xsl:param name="privateIconAlt"/>
    <xsl:param name="privateTitle"/>
    <xsl:param name="sharedIcon"/>
    <xsl:param name="sharedIconAlt"/>
    <xsl:param name="sharedTitle"/>
    <xsl:param name="downloadText"/>
    <xsl:param name="downloadIconAlt"/>
    <xsl:param name="blankGifPath"/>
    <xsl:param name="isLTR"/>

    <xsl:template match="/a:feed">
            <xsl:apply-templates select="opensearch:totalResults" />
            <xsl:apply-templates select="a:entry" />
    </xsl:template>


    <xsl:template match="a:link"><xsl:value-of select="@href"/></xsl:template>
    <xsl:template match="opensearch:totalResults"><span class="meta totalEntries" style="display : none"><xsl:value-of select="."></xsl:value-of></span></xsl:template>
    <xsl:template match="a:entry">

        <xsl:variable name="name" select="a:title" />
        <xsl:variable name="rtlName" select="concat('&#8234;', translate($name, ' ', '&#160;'), '&#8236;')" />
        <xsl:variable name="ltrName" select="translate($name, ' ', '&#160;')" />

        <div class="entry">
                <div class="icons">
                    <a target="_blank">
                        <xsl:attribute name="href">
                            <xsl:value-of select="concat(a:link[@rel='enclosure']/@href,'?errorPage=true') "/>
                        </xsl:attribute>
                        <img class="quickrIcon lconn-ftype32 filesDownloadIcon"
                            width="32" height="32">
                            <xsl:attribute name="src">
                                <xsl:value-of select="$blankGifPath" />
                            </xsl:attribute>

                            <xsl:attribute name="alt">
                                <xsl:value-of select="a:link[@rel='enclosure']/@title"/>
                            </xsl:attribute>
                            <xsl:attribute name="title">
                                <xsl:choose>
                                    <xsl:when test="$isLTR='true'">
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:when>
                                    <xsl:when test="$isLTR='false'">
                                        <xsl:value-of select="$rtlName"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                            <span class="lotusAltText">
                                <xsl:value-of select="$downloadIconAlt"/>
                            </span>
                        </img>
                    </a>
                </div>
                <div class="entryBody filesEntryBody">
                    <!--
                    <div>
                        <h4 style="margin-bottom:5px;" dojoType="lconn.homepage.html.WidgetLink">
                            <xsl:attribute name="linkUrl"><xsl:value-of select="a:link[./@rel='alternate']/@href" /></xsl:attribute>
                            <xsl:attribute name="linkTitle"><xsl:value-of select="a:title"/></xsl:attribute>
                            <xsl:attribute name="linkLabel">
                                <xsl:value-of select="a:title"/>
                            </xsl:attribute>
                        </h4>
                    </div>
                    -->

                    <h4 style="margin-bottom:5px;">
                        <a target="_blank" class="bidiSTT_URL">
                            <xsl:attribute name="href"><xsl:apply-templates select="a:link[./@rel='alternate']" /></xsl:attribute>
                            <xsl:attribute name="title">
                                <xsl:choose>
                                    <xsl:when test="$isLTR='true'">
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:when>
                                    <xsl:when test="$isLTR='false'">
                                        <xsl:value-of select="$rtlName"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="substring-before(substring($rtlName,1,40),' ')=''">
                                    <xsl:value-of select="substring($rtlName,1,40)"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="$rtlName"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    </h4>

                    <span role="list">
                        <a class="meta fileSize" name="{$downloadText}" style="display: none" role="listitem">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="concat(a:link[@rel='enclosure']/@href,'?errorPage=true') "/>
                                </xsl:attribute>
                            <xsl:attribute name="title">
                                <xsl:choose>
                                    <xsl:when test="$isLTR='true'">
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:when>
                                    <xsl:when test="$isLTR='false'">
                                        <xsl:value-of select="$rtlName"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="$ltrName"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="$filesMode='MyFiles'">
                                    <xsl:value-of select="td:totalMediaSize"/>
                                </xsl:when>
                                <xsl:otherwise>
                                &#160;
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    <xsl:choose>
                        <xsl:when test="$filesMode='MyFiles'">
                            <span class="lotusRight divider" role="img" aria-hidden="true">&#160;</span>
                            <span class="lotusRight meta" role="listitem">
                                <xsl:choose>
                                    <xsl:when test="td:visibility = 'public'">
                                        <img class="lconnSprite lconnSprite-iconPublic16 fileSprite"
                                             height="16" width="16"
                                             alt="{$publicIconAlt}" title="{$publicIconAlt}">
                                            <xsl:attribute name="src">
                                                <xsl:value-of select="$blankGifPath" />
                                            </xsl:attribute>
                                        </img>
                                        <span class="lotusAltText" tabIndex="-1"><xsl:value-of select="$publicIconAlt"/></span>
                                    </xsl:when>
                                    <xsl:when test="td:visibility = 'private'">
                                        <img class="lconnSprite lconnSprite-iconPrivate16 fileSprite"
                                             height="16" width="16"
                                             alt="{$privateIconAlt}"
                                             title="{$privateIconAlt}">
                                            <xsl:attribute name="src">
                                                <xsl:value-of select="$blankGifPath" />
                                            </xsl:attribute>
                                        </img>
                                        <span class="lotusAltText" tabIndex="-1">
                                            <xsl:value-of select="$privateIconAlt"/>
                                        </span>
                                    </xsl:when>
                                    <xsl:when test="td:visibility = 'shared'">
                                        <img class="lconnSprite lconnSprite-iconShared16 fileSprite">
                                            <xsl:attribute name="src">
                                                <xsl:value-of select="$blankGifPath" />
                                            </xsl:attribute>
                                            <xsl:attribute name="alt">
                                                <xsl:value-of select="$sharedIconAlt"/>
                                                <xsl:value-of select="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/share']"/>
                                            </xsl:attribute>
                                            <xsl:attribute name="title">
                                                <xsl:value-of select="$sharedIconAlt"/>
                                                <xsl:value-of select="snx:rank[@scheme='http://www.ibm.com/xmlns/prod/sn/share']"/>
                                            </xsl:attribute>
                                        </img>
                                        <span class="lotusAltText" tabIndex="-1"><xsl:value-of select="$sharedIconAlt"/></span>
                                    </xsl:when>
                                </xsl:choose>
                            </span>
                        </xsl:when>
                        <xsl:otherwise>
                        </xsl:otherwise>
                    </xsl:choose>
                    <span class="lotusLeft" role="listitem">
                        <span class="vcard">
                            <span class="x-lconn-username lotusHidden">
                                <xsl:value-of select="a:author/a:name"/>
                            </span>
                            <span class="x-lconn-userid lotusHidden">
                                <xsl:value-of select="a:author/snx:userid"/>
                            </span>
                        </span>
                    </span>
                    <span class="lotusLeft divider" role="img" aria-hidden="true">|</span>
                    <span class ="meta fileDate" role="listitem">
                            <xsl:choose>
                                <xsl:when test="$filesMode='MyFiles'">
                                    <span class="meta created" style="display : none"><xsl:value-of select="a:published"/></span>
                                    <span class="meta modified" style="display: none"><xsl:value-of select="td:modified"/></span>
                                </xsl:when>
                                <xsl:when test="$filesMode='SharedFiles'">
                                    <span class="meta created" style="display : none"><xsl:value-of select="a:published"/></span>
                                    <span class="meta modified" style="display: none"><xsl:value-of select="td:modified"/></span>
                                </xsl:when>
                                <xsl:otherwise>
                                </xsl:otherwise>
                            </xsl:choose>
                    </span>
                </span>
            </div> <!-- close div class entryBody -->
        </div> <!-- close div class entry -->
    </xsl:template>

</xsl:stylesheet>
