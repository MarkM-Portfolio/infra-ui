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
       xmlns:app="http://www.w3.org/2007/app"
       xmlns:snx="http://www.ibm.com/xmlns/prod/sn">

<xsl:template match="/">
   <ul>
      <xsl:for-each select="/atom:feed/atom:entry">
      <li>
        <xsl:value-of select="atom:title"/>
        <xsl:element name="a">
        <xsl:attribute name="href">javascript:deleteConnection('<xsl:value-of select="atom:link[@rel='edit']/@href" />');</xsl:attribute>
        Delete
        </xsl:element>
      </li>
      </xsl:for-each>
   </ul>
</xsl:template>
</xsl:stylesheet>