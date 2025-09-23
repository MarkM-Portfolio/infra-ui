/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.test.util.TestHelper");
dojo.require("dojox.xml.parser");
dojo.require("lconn.share.bean.File");

(function() {
   var TestHelper = lconn.share.test.util.TestHelper;
   var parser = dojox.xml.parser;
   var File = lconn.share.bean.File;
   
   TestHelper.loadFileContent = function(/* Object */ fileData, /* Integer [Optional] */ entryPosition) {
      if(!entryPosition) {
         entryPosition = 0;
      }
      
      if(entryPosition < 0) {
         throw {name: "IndexOutOfBoundsException", description: "Entry Position is less than 0."};
      }
      
      var xml = parser.parse(fileData.content);
      var entries = xml.getElementsByTagName("entry");
      
      if(entryPosition >= entries.length) {
         throw {name: "IndexOutOfBoundsException", description: "Entry Position is greater than the number of entries (" + entries.length + ")."};
      }
      
      var entry = entries[entryPosition];
      var bean = File.createBean(entry);
      return bean;
   };
}());
