/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.CMISService");
dojo.require("lconn.share.util.dom");

dojo.declare("lconn.share.bean.CMISService", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   getUrlUnfiledCollection: function() {
      if(!this.urlUnfiledCollection)
         this.urlUnfiledCollection = lconn.share.util.dom.xpathString(this.e, "/app:service/app:workspace/app:collection[cmisra:collectionType/text() = 'unfiled']/@href");
      return this.urlUnfiledCollection;
   },
   getUrlQueryCollection: function() {
      if(!this.urlQueryCollection)
         this.urlQueryCollection = lconn.share.util.dom.xpathString(this.e, "/app:service/app:workspace/app:collection[cmisra:collectionType/text() = 'query']/@href");
      return this.urlQueryCollection;
   },

   getUrlNonce: function() {
      return this.getLink("http://www.ibm.com/xmlns/prod/sn/cmis/nonce", "text/plain");
   },
   getLink: function(rel, type) {
      if(rel && type)
         return lconn.share.util.dom.xpathString(this.e, "/app:service/app:workspace/atom:link[@rel='"+rel+"' and @type='"+type+"']/@href");
      else
         return lconn.share.util.dom.xpathString(this.e, "/app:service/app:workspace/atom:link[@rel='"+rel+"']/@href");
   },
   
   getUriTemplate: function(type) {
      if (!this._uriTemplates)
         this._uriTemplates = {};
      if (typeof this._uriTemplates[type] == "undefined")
         this._uriTemplates[type] = lconn.share.util.dom.xpathString(this.e, "/app:service/app:workspace/cmisra:uritemplate[cmisra:type/text() = '"+type+"']/cmisra:template/text()");
      return this._uriTemplates[type];
   },
   
   getUri: function(templateType, templateParams) {
      var template = this.getUriTemplate(templateType);
      if(!template)
         return template;
      
      templateParams = templateParams || {};
      return this._substitute(template, templateParams);
   },
   
   _SUBSTITUTION: /\{([^\}]+)\}/g,
   _substitute: function(template, map) {
      var last = 0;
      var retval = [];
      while (r = this._SUBSTITUTION.exec(template)) {
         retval.push(template.substring(last,r.index));
         last = r.index+r[0].length;
         var value = map[r[1]];
         if (typeof value != "undefined" && value != null)
            retval.push(value.toString());
      }
      retval.push(template.substring(last));
      return retval.join("");
   },

   
   getCapabilities: function() {
      if(!this.capabilities) {
         this.capabilities = {};
         var qud = lconn.share.util.dom;
         var nodes = qud.xpathNodes(this.e, "/app:service/app:workspace/cmisra:repositoryInfo/cmis:capabilities/*");
         for(var n=null, i=0; n = nodes[i++];) {
            var name = n.nodeName;
            var value = qud.getTextContent(n);
            this.capabilities[name] = value;
         }
      }
      return this.capabilities;
   }
});
