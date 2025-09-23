<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Copyright IBM Corp. 2010, 2017  All Rights Reserved.              -->

<xsl:stylesheet version="1.0" xmlns:f="http://www.w3.org/2005/Atom"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
    <xsl:output method='html' version='1.0' encoding='UTF-8'
        indent='yes' />
    <xsl:template match="/">
        <xsl:variable name="numEntries" select="count(/f:feed/f:entry)" />
        <div class="ActivityList" id="welcomePanel" style="display:none">
            <div class="lotusWelcomeBox" aria-labelledby="welcomeHeading" role="region" >
                <span>
                    <h2 id="welcomeHeading" class="lotusHeading">${rs_actListFtUX_9}</h2>
                    <p>${rs_actListFtUxLL_2}</p>
                    <ul>
                        <li id="activityWelcomeMsg1">
                            <xsl:attribute name="aria-label">
                                <xsl:text>${rs_actListFtUxLL_1_title}</xsl:text>
                            </xsl:attribute>
                            ${rs_actListFtUxLL_1_text}
                        </li>
                        <li id="activityWelcomeMsg2">
                            <xsl:attribute name="aria-label">
                                <xsl:text>${rs_actListFtUxLL_4_title}</xsl:text>
                            </xsl:attribute>
                            ${rs_actListFtUxLL_4_text}
                        </li>
                        <li id="activityWelcomeMsg3">
                            <xsl:attribute name="aria-label">
                                <xsl:text>${rs_actListFtUxLL_6_title}</xsl:text>
                            </xsl:attribute>
                            ${rs_actListFtUxLL_6_text}
                        </li>
                    </ul>
                </span> 
                <a id="closeActivityWelcomePanel" class="lotusBtnImg lotusClose" href="javascript:void(0);">
                    <xsl:attribute name="title">
                        <xsl:text>${rs_closeWelcomePanel}</xsl:text>
                    </xsl:attribute>
                    <img class="communityImage">
                        <xsl:attribute name="aria-label">
                            <xsl:text>${rs_closeWelcomePanel}</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="alt">
                            <xsl:text>${rs_closeWelcomePanel}</xsl:text>
                        </xsl:attribute>
                    </img>
                    <span class="lotusAltText">X</span>
                </a>
            </div> 
        </div>
        <div id="widgetHeadline" class="lotusHeader" style="display:none">
            <h1 id="widgetTitle">${rs_activityWidgetTitle}
            </h1>
            <p id="widgetDescription">${rs_activityWidgetDescription}
            </p>
        </div>
        <xsl:choose>
            <xsl:when test="$numEntries">
                <!-- When there are entries, show full version -->
                <div id="startActivity" class="lotusChunk activitiesTopButton" style="display: none;">
                    ${rs_startActivity}
                </div>
                <!--  top paging section -->
                <span id="activityTopPaging" style="display: none;">
                    <div class="lotusPaging">
                        <div class="lotusLeft pagePos">
                        </div>
                        <ul class="lotusInlinelist lotusRight pageNav">
                        </ul>
                    </div>
                </span>
                <!-- List Section -->
                <div class="lotusChunk">
                    <table id="activitiesListTable" style="TABLE-LAYOUT: fixed;" class="lotusTable ActivityList" border="0"
                        cellspacing="0" cellpadding="0" summary="" role="presentation">
                        <tbody>
                            <xsl:apply-templates
                                select="/f:feed/f:entry" />
                        </tbody>
                    </table>
                </div>
                <!-- Activity paging section -->
                <span id="activityBottomPaging" style="display: none;">
                    <div class="lotusPaging">
                        <div class="lotusLeft pagePos">
                        </div>
                        <ul class="lotusInlinelist lotusRight pageNav">
                        </ul>
                    </div>
                </span>
                <!-- View all button -->
                <span id="viewAllActivities" style="display: none;">
                    <div class="lotusBorderTop lotusMeta lotusTiny" style="height:1em; margin: 5px 0">
                        <div class="lotusLeft activitiesBottomButton">
                            <a href="#activityFullpage" class="lotusAction lconnFontNormalNarrow" 
                                onclick="return iContext.iScope().showFullpage();">
                                <span>${rs_viewAll}
                                    </span>
                                <!-- <span>
                                    (
                                    <xsl:value-of
                                        select="/f:feed/os:totalResults" />
                                    )
                                </span> -->
                            </a>
                        </div>
                    </div>
                </span>
                <!-- variables -->
                <xsl:if test="/f:feed/f:link[@rel='next']">
                    <span id="hasNext" class="lotusHidden" />
                </xsl:if>
                <xsl:if test="/f:feed/f:link[@rel='previous']">
                    <span id="hasPrevious" class="lotusHidden" />
                </xsl:if>
                <span id="totalResults" class="lotusHidden">
                    <xsl:value-of select="/f:feed/os:totalResults" />
                </span>
                <span id="numEntries" class="lotusHidden">
                    <xsl:value-of select="$numEntries" />
                </span>
            </xsl:when>
            <xsl:otherwise>
                <!-- no activity list -->
                <div class="lotusChunk">
                    <table class="lotusTable ActivityList" border="0"
                        cellspacing="0" cellpadding="0" summary="" id="noActivitiesTable" role="presentation">
                        <tbody>
                            <tr class="lotusFirst">
                                <td width="20" class="lconnHideNarrow">
                                    <img alt="" class="communityImage lconnSprite lconnSprite-iconActivities16" />
                                </td>
                                <td>
                                    <span id="noActivitiesCanCreate"
                                        style="display:none;">
                                        ${rs_activityWidgetBriefDescription}
                                    </span>
                                    <span id="noActivities">
                                        ${rs_noActivities}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="startActivity" class="lotusChunk activitiesBottomButton" style="display:none;">
                    ${rs_startFirstActivity}
                </div>
            </xsl:otherwise>
        </xsl:choose>        
        <ul class="lotusFeeds lotusInlinelist" id="activityFeeds" style="display:none;">
            <li class="lotusFirst">
            <a id="activityCompletedLink" href="javascript:;" 
               class="lotusAction ">
               <img class="communityImage lconnSprite lconnSprite-iconCompleted16" alt=""/>
                ${rs_completedActivityLink}
            </a>
            </li>
            <li class="lotusFirst">
            <a class="lotusAction" id="activityFeedLink">
                <xsl:attribute name="href">
                <xsl:choose>
                <xsl:when test="/f:feed/f:link[@rel='first']">
                    <xsl:value-of
                    select="/f:feed/f:link[@rel='first']/@href" />
                        </xsl:when>
                        <xsl:otherwise><xsl:value-of
                    select="/f:feed/f:link[@rel='self']/@href" /></xsl:otherwise>
                        </xsl:choose>
                </xsl:attribute>
                <img class="communityImage lconnSprite lconnSprite-iconFeed12" alt=""/>
                <xsl:text> ${rs_activityFeedLink}</xsl:text>
            </a>
            </li>
        </ul>
    </xsl:template>

    <xsl:template match="f:entry">
        <tr class="lotusActivityName">
            <xsl:if test="position() = 1">
                <xsl:attribute name="class">
                <xsl:text>lotusFirst</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:variable name="priority"
                select="./f:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@term" />
            <xsl:variable name="flags"
                select="./f:category[@scheme='http://www.ibm.com/xmlns/prod/sn/flags']/@term" />
            <xsl:variable name="canEdit"
                select="contains(./snx:permissions,'edit_activity')" />
            <xsl:variable name="canDelete"
                select="contains(./snx:permissions,'delete_activity')" />
            <xsl:variable name="isOwner"
                select="contains(./snx:permissions,'activity_owner')" />

            <!--  get the icon for the activity status -->
            <xsl:variable name="icon">
                <xsl:choose>
                    <xsl:when test="$flags='completed'">
                        <xsl:text>iconCompleted16</xsl:text>
                    </xsl:when>
                    <xsl:when test="$flags='deleted'">
                        <xsl:text>iconTrashCan16</xsl:text>
                    </xsl:when>
                    <xsl:when test="$flags='template'">
                        <xsl:choose>
                            <xsl:when test="$priority='3000'">
                                <!-- favorite -->
                                <xsl:text>iconFavTemplate16</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>iconCopy16</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:when test="$priority='2000'">
                        <xsl:text>iconPriorityMedium16</xsl:text>
                    </xsl:when>
                    <xsl:when test="$priority='3000'">
                        <xsl:text>iconPriorityHigh16</xsl:text>
                    </xsl:when>
                    <xsl:when test="$priority='0'">
                        <xsl:text>iconTunedOut16</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>iconActivities16</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <!-- Set alt icon -->
            <xsl:variable name="iconAlt">
                <xsl:choose>
                    <xsl:when test="$flags='completed'">
                        <xsl:text>${rs_normalPri}</xsl:text>
                    </xsl:when>
                    <xsl:when test="$flags='deleted'">
                        <xsl:text>${rs_normalPri}</xsl:text>
                    </xsl:when>
                    <xsl:when test="$flags='template'">
                        <xsl:choose>
                            <xsl:when test="$priority='3000'">
                                <!-- favorite -->
                                <xsl:text>${rs_normalPri}</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>${rs_normalPri}</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:when test="$priority='2000'">
                        <xsl:text>${rs_medPri}</xsl:text>
                    </xsl:when>
                    <xsl:when test="$priority='3000'">
                        <xsl:text>${rs_highPri}</xsl:text>
                    </xsl:when>
                    <xsl:when test="$priority='0'">
                        <xsl:text>${rs_tunedOutPri}</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>${rs_normalPri}</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <td width="20" class="lconnHideNarrow">
                <img class="communityImage lconnSprite lconnSprite-{$icon}" alt="{$iconAlt}" />
                <span class="lotusAltText"><xsl:value-of select="$iconAlt" /></span>
            </td>
            <td>
                <div id="{./snx:activity}-headline">
                    <span class="priority lotusHidden">
                        <xsl:value-of select="$priority" />
                    </span>
                    <h4 class="lotusBreakWord">
                        <!--
                            a href="{./f:link[@rel='alternate' and
                            @type='text/html']/@href}"
                        -->
                        <a
                            url="/service/html/mainpage#activitypage,{./snx:activity}"
                            class="activityLink">
                            <xsl:value-of select="./f:category[@scheme]" />
                            <xsl:call-template name="make-dojo-safe">
                                <xsl:with-param name="text" select="./f:title" />
                            </xsl:call-template>
                        </a>
                        <xsl:if test="./f:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type'][@term='activity']">
                            <span class="cnxnsType lotusMeta">${rs_shared}</span>
                        </xsl:if>
                    </h4>
                </div> <!-- end div class="activitySummary" -->
            </td>
            <td width="20" class="lotusAlignRight lotusLastCell lotusTiny">
                <a href="#" role="button"
                    onclick="return iContext.iScope().toggleDetails('{./snx:activity}',event);"
                    class="lotusAction activityMoreButton">                    
                    <xsl:attribute name="title">
                         <xsl:text>${rs_moreInfo}</xsl:text>
                    </xsl:attribute>
                    <img class="communityImage lotusIcon16 lotusIconShow">
                        <xsl:attribute name="alt">
                             <xsl:text>${rs_more}</xsl:text>
                        </xsl:attribute>
                    </img>
                    <!-- RTC 71154 Using the old icon now <span class="activityMoreLinkText">${rs_more}</span> -->
                </a>
            </td>
        </tr>
        <tr class="lotusDetails">
            <td class="lotusFirstCell lconnHideNarrow"></td>
            <td class="lotusLastCell" id="{./snx:activity}-summary">
                <div class="lotusMeta" role="list">
                    <span class="updatedBySection" role="listitem"><xsl:apply-templates select="./f:contributor"/></span>
                    <span class="lotusDivider" role="presentation"><xsl:text> | </xsl:text></span>
                    <span class="atomDate" role="listitem"><xsl:value-of select="./f:updated"/></span>
                    <xsl:if test="./f:category[not(@scheme)]">
                        <span class="lotusDivider" role="presentation"><xsl:text> | </xsl:text></span>
                        <span class="lotusTags" role="listitem">
                            <span>${rs_actTags}
                                </span>
                            <span role="list">
                                <xsl:for-each
                                    select="./f:category[not(@scheme)]">
                                    <span role="listitem"><a href="#"
                                        onclick="iContext.iScope().handleTagLink(event)">
                                      <xsl:call-template name="make-dojo-safe">
                                        <xsl:with-param name="text"
                                                        select="@term" />
                                      </xsl:call-template>
                                    </a></span>
                                    <xsl:if test="position() != last()">
                                        <span class="presentation"><xsl:text>${rs_actTagsDelim} </xsl:text></span>
                                    </xsl:if>
                                </xsl:for-each>
                            </span>
                        </span>
                    </xsl:if>
                    
                    <xsl:if test="./snx:duedate">
                        <span class="lotusDivider" role="presentation">
                            <xsl:text> | </xsl:text>
                        </span>
                        <span class="dueDate atomDate" role="listitem">
                            <xsl:value-of select="./snx:duedate" />
                        </span>
                    </xsl:if>
                </div>
                <span id="{./snx:activity}-details" style="display: none">
                    <div id="{./snx:activity}-historyList"
                        style="display:none">
                        <span class="historyNotLoaded" />
                    </div>
                    <xsl:if
                        test="normalize-space(./f:content) or normalize-space(./f:summary)">
                        <div id="{./snx:activity}-description" class="summary">
                            <span>
                                <xsl:attribute name="class">
                                    <xsl:choose>
                                        <xsl:when test="(./f:content[@type='html'] or ./f:summary[@type='html'])">
                                          <xsl:text>escapedMarkup</xsl:text>
                                        </xsl:when>
                                        <xsl:when test="system-property('xsl:vendor')='libxslt' and (./f:content[@type='text'] or ./f:summary[@type='text'])">
                                            <xsl:text>unconvertedNewline</xsl:text>
                                        </xsl:when>
                                    </xsl:choose>
                                 </xsl:attribute>
                                <xsl:choose>
                                    <xsl:when
                                        test="./f:content[@type='text']">
                                        <xsl:call-template
                                            name="newline-to-break">
                                            <xsl:with-param name="text" >
                                                <xsl:call-template name="make-dojo-safe">
                                                <xsl:with-param
                                                    name="text" select="./f:content" />
                                                </xsl:call-template>
                                            </xsl:with-param>
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:when
                                        test="./f:summary[@type='text']">
                                        <xsl:call-template
                                            name="newline-to-break">
                                            <xsl:with-param name="text" >
                                                <xsl:call-template name="make-dojo-safe">
                                                <xsl:with-param
                                                    name="text" select="./f:summary" />
                                                </xsl:call-template>
                                            </xsl:with-param>
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:when test="./f:content">
                                        <xsl:call-template
                                            name="make-dojo-safe">
                                            <xsl:with-param name="text"
                                            select="./f:content/node()"/>
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:call-template
                                            name="make-dojo-safe">
                                            <xsl:with-param name="text"
                                            select="./f:summary/node()"/>
                                        </xsl:call-template>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </span>
                            <xsl:if test="./f:link[@rel='enclosure']">
                                <a href="javascript:;" class="moreDescription" 
                                  onclick="iContext.iScope().handleMoreDescription(event,'{./f:link[@rel='enclosure']/@href}','{./f:link[@rel='enclosure']/@type}');">
                                    <xsl:text>${rs_linkMore}</xsl:text>
                                </a>
                            </xsl:if>
                        </div>  <!-- end div class="summary" -->
                    </xsl:if>
                    <xsl:if test="./f:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type'][@term='activity']">
                    <a href="#" id="{./snx:activity}-removeAct"
                        onclick="return iContext.iScope().removeCommunity('{./snx:activity}',event);"
                        class="lotusAction activityRemoveButton lotusHidden">                    
                        <xsl:attribute name="title">
                             <xsl:text>${rs_removeActFromComm}</xsl:text>
                        </xsl:attribute>
                        ${rs_removeActFromComm}</a>
                   </xsl:if>
                </span> <!-- end span  -->
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="f:contributor">
        <span class="vcard">
            
            <xsl:attribute name="username">
                <xsl:value-of select="./f:name" />
            </xsl:attribute>
            <xsl:attribute name="userid">
                <xsl:value-of select="./snx:userid" />
            </xsl:attribute>
        </span><!-- end div vcard -->
    </xsl:template>

    <xsl:template name="newline-to-break">
        <xsl:param name="text" select="." />
        <xsl:choose>
            <xsl:when test="system-property('xsl:vendor')='libxslt'">
                <xsl:value-of select="$text"/>
            </xsl:when>
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
