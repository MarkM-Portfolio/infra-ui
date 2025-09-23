<?xml version="1.0" encoding="utf-8"?>
<!-- Copyright IBM Corp. 2001, 2015  All Rights Reserved.              -->

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:a="http://www.w3.org/2005/Atom"
    xmlns:app="http://purl.org/atom/app#"
    xmlns:snx="http://www.ibm.com/xmlns/prod/sn"
    xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:thr="http://purl.org/syndication/thread/1.0"
    exclude-result-prefixes="a app snx os xhtml thr">

    <xsl:output method="html" encoding="utf-8" />

    <xsl:param name="choice" />
    <xsl:param name="openActNewWindowStr" />
    <xsl:param name="openHighPrioActNewWindowStr" />
    <xsl:param name="openTodoNewWindowStr" />
    <xsl:param name="openNewWindowStr" />

    <xsl:template match="/a:feed">
        <xsl:choose>
            <xsl:when test="$choice = 'todos'">
                [
                    <xsl:call-template name="activities_todo" />
                ]
            </xsl:when>
            <xsl:otherwise>

                <xsl:choose>
                    <xsl:when test="$choice = 'responses'">
                        <xsl:call-template name="responses">
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:when test="$choice = 'activities'">
                        <xsl:call-template name="activities" />
                    </xsl:when>
                    <xsl:when test="$choice = 'activities-list'">
                        <xsl:call-template name="activities-list" />
                    </xsl:when>
                    <xsl:otherwise>
                            <xsl:call-template name="highPriorityReponses">
                            </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="activities_todo">
        <xsl:for-each select="/a:feed/a:entry[a:category[@term='todo']]" >
            {"title":"<xsl:value-of select='a:title'/>","dueDate":"<xsl:value-of select='snx:duedate'/>","link":"<xsl:value-of select="a:link[@rel='alternate' and @type='text/html']/@href" />","assignedTo":"<xsl:value-of select="snx:assignedto/@userid" />"}<xsl:if test="position() != last()">,</xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="responses">
        <xsl:for-each select="/a:feed/a:entry">
            <xsl:call-template name="response">
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>


    <xsl:template name="response">
        <xsl:param name="id" select="thr:in-reply-to/@ref" />
        <xsl:param name="idActivity" select="thr:in-reply-to/@source" />

        <xsl:if test="(a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term != 'activity')
                and (snx:depth > 1)" >

        <xsl:variable name="this-id" select="generate-id(.)"/>

        <div class="entry">
            <xsl:if test="snx:icon">
            <div class="icons" style="height: 20px;">
                <img alt="" title="" border="0" style="margin-right:5px;">
                    <xsl:attribute name="src">
                        <xsl:value-of select="snx:icon" />
                    </xsl:attribute>
                </img>
            </div>
            </xsl:if>
            <div class="entryBodySmall">
                <h4>
                    <a href="#" target="_blank" class="bidiAware">
                        <xsl:attribute name="href">
                            <xsl:value-of select="a:link[@rel='alternate']/@href" />
                        </xsl:attribute>
                         <xsl:attribute name="aria-describedby">
                            <xsl:value-of select="concat($this-id,'_datestamp',' ',$this-id,'_content',' ',$this-id,'_summary',' ',$this-id,'_openNewWindow')"/>
                         </xsl:attribute>
                        <xsl:value-of select="a:title" />
                    </a>
                </h4>
                <span class="lotusAccess" role="presentation">
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat($this-id,'_openNewWindow')" />
                    </xsl:attribute>
                    <xsl:value-of select="$openNewWindowStr" />
                </span>
                <span role="list">
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
                    <span class="divider lotusLeft" role="img" aria-hidden="true">|</span>
                    <span class="activities-date meta" role="presentation">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($this-id,'_datestamp')"/>
                        </xsl:attribute>
                        <xsl:value-of select="a:published"/>
                    </span>
                </span>
                <br/>

                <xsl:choose>
                    <xsl:when test="a:content">
                        <xsl:choose>
                            <xsl:when test="a:content != ' '">
                                <p class="activities-escape-html bidiAware" style="margin-bottom:5px;" role="presentation">
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="concat($this-id,'_content')"/>
                                    </xsl:attribute>
                                    <xsl:value-of
                                        select="a:content" />
                                </p>
                            </xsl:when>
                            <xsl:when test="a:summary != ''">
                                <p class="activities-escape-html bidiAware" style="margin-bottom:5px;" role="presentation">
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="concat($this-id,'_summary')"/>
                                    </xsl:attribute>
                                    <xsl:value-of
                                        select="a:summary" />
                                </p>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                </xsl:choose>

                <span class="activities-activity-details">
                    <xsl:attribute name="id">
                        <xsl:value-of select="snx:activity"/>
                    </xsl:attribute>
                </span>
            </div>
        </div>

        </xsl:if>
    </xsl:template>

    <xsl:template name="highPriorityReponses">
        <xsl:for-each select="/a:feed/a:entry">
            <xsl:call-template name="highPriorityResponse">
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="highPriorityResponse">
        <xsl:param name="id" select="thr:in-reply-to/@source" />

        <xsl:if test="(/a:feed/a:entry[a:id=$id])
            and (/a:feed/a:entry[a:id=$id]/a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@label = 'High')">
            <div class="entry">
                <xsl:variable name="this-id" select="generate-id(.)"/>

                <xsl:if test="snx:icon">
                <div class="icons">
                    <img alt="" title="" border="0"  class="lotusLeft" style="margin-right:5px;">
                        <xsl:attribute name="src">
                            <xsl:value-of select="snx:icon" />
                        </xsl:attribute>
                    </img>
                </div>
                </xsl:if>
                <div class="entryBodySmall">
                    <h4>
                        <a href="#" target="_blank" class="bidiAware">
                            <xsl:attribute name="href">
                                <xsl:value-of select="a:link[@rel='alternate']/@href" />
                            </xsl:attribute>
                            <xsl:attribute name="aria-describedby">
                                <xsl:value-of select="concat($this-id,'_datestamp',' ',$this-id,'_content',' ',$this-id,'_summary',' ',$this-id,'_openNewWindow')"/>
                            </xsl:attribute>
                            <xsl:value-of select="a:title" />
                        </a>
                    </h4>
                    <span class="lotusAccess" role="presentation">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($this-id,'_openNewWindow')" />
                        </xsl:attribute>
                        <xsl:value-of select="$openNewWindowStr" />
                    </span>
                    <span role="list">
                        <span class="lotusLeft" role="listitem">
                            <span class="vcard">
                                <span class="x-lconn-username lotusHidden">
                                    <xsl:value-of select="a:author/a:name"/>
                                </span>
                                <span class="x-lconn-userid lotusHidden">
                                    <xsl:value-of select="a:contributor/snx:userid"/>
                                </span>
                            </span>
                        </span>
                        <span class="divider lotusLeft" role="img" aria-hidden="true">|</span>
                        <span class="activities-date meta" role="presentation">
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat($this-id,'_datestamp')"/>
                            </xsl:attribute>
                            <xsl:value-of select="a:published"/>
                        </span>
                    </span>
                    <br />

                    <xsl:choose>
                        <xsl:when test="a:content">
                            <xsl:choose>
                                <xsl:when test="a:content != ' '">
                                    <p class="activities-escape-html bidiAware" style="margin-bottom:5px;">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="concat($this-id,'_content')"/>
                                        </xsl:attribute>
                                        <xsl:value-of
                                            select="a:content" />
                                    </p>
                                </xsl:when>
                                <xsl:when test="a:summary != ''">
                                    <p class="activities-escape-html bidiAware" style="margin-bottom:5px;">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="concat($this-id,'_summary')"/>
                                        </xsl:attribute>
                                        <xsl:value-of
                                            select="a:summary" />
                                    </p>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>

                    <img alt="" title="" class="lotusLeft activities-icon" style="margin-right:5px;">
                        <xsl:attribute name="src">
                            <xsl:value-of select="/a:feed/a:entry[a:id=$id]/snx:icon"/>
                        </xsl:attribute>
                    </img>
                        <a target="_blank" class="action bidiAware">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/a:feed/a:entry[a:id=$id]/a:link[@type='application/xhtml+xml']/@href"/>
                            </xsl:attribute>
                            <xsl:attribute name="title">
                                <xsl:value-of select="$openHighPrioActNewWindowStr" />
                            </xsl:attribute>
                        <xsl:value-of select="/a:feed/a:entry[a:id=$id]/a:title"/>
                    </a>
                </div>
            </div>
        </xsl:if>

    </xsl:template>

    <xsl:template name="activities">
        <xsl:for-each select="/a:feed/a:entry">
            <div class="entry">
                <xsl:variable name="this-id" select="generate-id(.)"/>

                <xsl:if test="snx:icon">
                <div class="icons" style="height:20px">
                    <img alt="" title="" border="0" style="margin-right:5px;">
                        <xsl:attribute name="src">
                            <xsl:value-of select="snx:icon" />
                        </xsl:attribute>
                    </img>
                </div>
                </xsl:if>
                <div class="entryBodySmall">
                    <h4>
                        <a href="#" target="_blank" class="bidiAware">
                            <xsl:attribute name="href">
                                <xsl:value-of select="a:link[@type='application/xhtml+xml']/@href" />
                            </xsl:attribute>
                            <xsl:attribute name="aria-describedby">
                                <xsl:value-of select="concat($this-id,'_datestamp',' ',$this-id,'_content',' ',$this-id,'_summary',' ',$this-id,'_openNewWindow')"/>
                            </xsl:attribute>
                            <xsl:value-of select="a:title" />
                        </a>
                    </h4>
                    <span class="lotusAccess" role="presentation">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($this-id, '_openNewWindow')" />
                        </xsl:attribute>
                        <xsl:choose>
                            <xsl:when test="a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@label = 'High'">
                                <xsl:value-of select="$openHighPrioActNewWindowStr" />
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="$openActNewWindowStr" />
                            </xsl:otherwise>
                        </xsl:choose>
                    </span>
                    <span role="list">
                        <span class="lotusLeft" role="listitem">
                            <span class="vcard">
                                <span class="x-lconn-username lotusHidden">
                                    <xsl:value-of select="a:contributor/a:name"/>
                                </span>
                                <span class="x-lconn-userid lotusHidden">
                                    <xsl:value-of select="a:contributor/snx:userid"/>
                                </span>
                            </span>
                        </span>
                        <span class="divider lotusLeft" role="img" aria-hidden="true">|</span>
                        <span class="activities-date meta" role="presentation">
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat($this-id,'_datestamp')"/>
                            </xsl:attribute>
                            <xsl:value-of select="a:updated"/>
                        </span>
                    </span>
                    <br />
                    <xsl:choose>
                        <xsl:when test="a:content">
                            <xsl:choose>
                                <xsl:when test="a:content != ' '">
                                    <p class="activities-escape-html bidiAware">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="concat($this-id,'_content')"/>
                                        </xsl:attribute>
                                        <xsl:value-of
                                            select="a:content" />
                                    </p>
                                </xsl:when>
                                <xsl:when test="a:summary != ''">
                                    <p class="activities-escape-html bidiAware">
                                        <xsl:attribute name="id">
                                            <xsl:value-of select="concat($this-id,'_summary')"/>
                                        </xsl:attribute>
                                        <xsl:value-of
                                            select="a:summary" />
                                    </p>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>
                </div>
            </div>

        </xsl:for-each>
    </xsl:template>

    <xsl:template name="activities-list">
        <xsl:for-each select="/a:feed/a:entry">
            <div>
                <xsl:attribute name="class">
                    <xsl:value-of select="snx:activity"/>
                </xsl:attribute>
                <img alt="" title="" role="presentation" class="lotusLeft activities-icon" style="margin-right:5px;">
                    <xsl:attribute name="src">
                        <xsl:value-of select="snx:icon"/>
                    </xsl:attribute>
                </img>
                <a target="_blank" class="action activities-link bidiAware">
                    <xsl:attribute name="href">
                        <xsl:value-of select="a:link[@type='application/xhtml+xml']/@href"/>
                    </xsl:attribute>
                    <xsl:attribute name="act_priority">
                        <xsl:value-of select="a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@label" />
                    </xsl:attribute>
                    <xsl:value-of select="a:title"/>
                </a>
            </div>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
