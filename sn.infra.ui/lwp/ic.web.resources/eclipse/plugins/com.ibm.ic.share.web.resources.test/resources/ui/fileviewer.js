/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojox/xml/parser",
   "ic-share/fileviewer/FileViewer",
   "dojo/text!./fileviewer_data.xml",
   "dojo/text!./fileviewer_data_cswg.xml",
   "dojo/dom",
   "dojo/dom-construct",
   "dojo/dom-class",
   "dojo/on",
   "dojo/_base/event",
   "dojo/query",
   "dojo/_base/lang",
   "dojo/domReady!"
], function (parser, FileViewer, dreadnoughtData, cswgData, dom, domConstruct, domClass, on, event, query, lang) {
   var File = lconn.share.bean.File;
   
   function renderList(data, container) {
      var feed = parser.parse(data),
         people = lang.getObject("com.ibm.lconn.layout.people"),
         semTagSvc = lang.getObject("SemTagSvc"),
         args = {},
         viewer;
      
      if (people) {
         args.createPersonLink = function (person) {
            return people.createLink(person);
         };
      }
      
      if (semTagSvc) {
         args.attachBizCard = function (node) {
            domClass.add(node, "vcard");
            semTagSvc.onTagChanged(node, true);
         };
      }

      args.formatDateByAge = function(date, strings) {
         var dateFormat = new lconn.share.util.DateFormat(date);
         return dateFormat.formatByAge(strings);
      };

      args.htmlSubstitute = lconn.core.util.html.substitute;
      
      args.isAuthenticated = function() { return true; };

      viewer = FileViewer.create(args);
      
      query("entry", feed).forEach(function (entry) {
         var file, id, item, link;
         
         file = FileViewer.createConnectionsFile(File.createBean(entry));
         id = viewer.addFile(file);
         
         item = domConstruct.create("li", {}, container);
         
         link = domConstruct.create("a", {
            href: "#",
            innerHTML: file.args.name
         }, item);
         
         on(link, "click", function (ev) {
            event.stop(ev);
            try {
               viewer.open(id);
            } catch (ex) {
               console.error(ex);
            }
         });
      });
   }
   
   setTimeout(function () {
      renderList(dreadnoughtData, dojo.byId("file-list-dreadnought"));
      renderList(cswgData, dojo.byId("file-list-cswg"));
   }, 1);
});
