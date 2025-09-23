<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- ***************************************************************** -->
<!--                                                                   -->
<!-- IBM Confidential                                                  -->
<!--                                                                   -->
<!-- OCO Source Materials                                              -->
<!--                                                                   -->
<!-- Copyright IBM Corp. 2011, 2015                                    -->
<!--                                                                   -->
<!-- The source code for this program is not published or otherwise    -->
<!-- divested of its trade secrets, irrespective of what has been      -->
<!-- deposited with the U.S. Copyright Office.                         -->
<!--                                                                   -->
<!-- ***************************************************************** -->

<xsl:stylesheet version="1.0" 
       xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
       xmlns:atom="http://www.w3.org/2005/Atom"
       xmlns:app="http://www.w3.org/2007/app">

<xsl:template match="/">
   <ul>
      <xsl:for-each select="/atom:feed/atom:entry">
      <li>
        <xsl:element name="span"> 
        <xsl:value-of select="atom:title"/>
        </xsl:element>     
        <xsl:element name="a"> 
        <xsl:attribute name="href">javascript:viewForumEEInline('<xsl:value-of select="atom:link[@rel='alternate']/@href" />');</xsl:attribute>
         <xsl:attribute name="style">
           <xsl:value-of select="'margin-left: 10px; margin-right: 15px;'" />
        </xsl:attribute>
        <xsl:value-of select="'Inline (Dojo)'"/>
        </xsl:element>
        <xsl:element name="a"> 
        <xsl:attribute name="href">javascript:viewForumEEGadgetiFrame('<xsl:value-of select="atom:link[@rel='alternate']/@href" />');</xsl:attribute>
        <xsl:attribute name="style">
           <xsl:value-of select="'margin-right: 15px;'" />
        </xsl:attribute>        
        <xsl:value-of select="'Standalone (OpenSocial)'"/>
        </xsl:element>      
        <xsl:element name="a"> 
        <xsl:attribute name="href">javascript:showReplies('<xsl:value-of select="atom:id" />', &quot;<xsl:value-of select="atom:title" />&quot;);</xsl:attribute>
        <xsl:value-of select="'Show Replies'"/>
        </xsl:element>            
      </li>
      </xsl:for-each>
   </ul>
</xsl:template>
</xsl:stylesheet>