<?xml version="1.0"?>

<!-- Copyright IBM Corp. 2015  All Rights Reserved.                    -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" doctype-system="http://www.w3.org/TR/html4/loose.dtd" doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN"/>

<xsl:template match="Books">
  <table>
    <tr>
      <th></th>
      <th>Author</th>
      <th>Title</th>
    </tr>
    <xsl:for-each select="Item">
      <tr>
        <td><xsl:number value="position()"/></td>
        <td><xsl:value-of select="Author"/></td>
        <td><xsl:value-of select="Title"/></td>
      </tr>
    </xsl:for-each>
  </table>
</xsl:template>

</xsl:stylesheet>
