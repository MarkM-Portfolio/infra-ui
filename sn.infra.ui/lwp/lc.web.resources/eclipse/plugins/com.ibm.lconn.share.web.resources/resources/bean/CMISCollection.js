/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.CMISCollection");
dojo.require("lconn.share.util.dom");

dojo.declare("lconn.share.bean.CMISCollection", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   
   getFolderEntries: function() {
      if (!this._folderEntries) {
         this._folderEntries = {};
         var qud = lconn.share.util.dom;
         var entries = qud.xpath(this.e, "/atom:feed/atom:entry");
         for(var i=0; i < entries.length; i++) {
            var e = entries[i];
            var snxType = qud.xpathString(e, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='snx:type']/cmis:value/text()");
            if(snxType)
               this._folderEntries[snxType] = e;
         }
      }
      return this._folderEntries;
   },
   
   getFolderInfo: function(snxType) {
      if (!this._folderInfo)
         this._folderInfo = {};
      if (!this._folderInfo[snxType]) {
         var entry = this.getFolderEntries()[snxType];
         if(entry) {
         	var qud = lconn.share.util.dom;
            this._folderInfo[snxType] = {
               id: qud.xpathString(entry, "cmisra:object/cmis:properties/cmis:propertyId[@propertyDefinitionId='cmis:objectId']/cmis:value/text()"),
               label: qud.xpathString(entry, "cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:name']/cmis:value/text()"),
               urlFeed: qud.xpathString(entry, "atom:link[@rel='down']/@href"),
               searchable: qud.xpathString(entry, "cmisra:object/cmis:properties/cmis:propertyBoolean[@propertyDefinitionId='snx:isValidInFolderId']/cmis:value/text()") != "false"
            };
         }
      }
      return this._folderInfo[snxType];
   }

});
