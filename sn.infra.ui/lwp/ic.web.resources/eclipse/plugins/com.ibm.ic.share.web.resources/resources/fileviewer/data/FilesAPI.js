/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojox/xml/parser",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/date/stamp",
  "dojo/Deferred",
  "../network/request",
  "dojo/_base/lang",
  "../util/network",
  "../util/url",
  "./FileEntryDataStore"
], function (declare, parser, array, domAttr, stamp, Deferred, request, lang, networkUtil, urlUtil, FileEntryDataStore) {
  "use strict";

  var NS, File;

  NS = {
    TD: {LONG: "urn:ibm.com/td", SHORT: "td"},
    SNX: {LONG: "http://www.ibm.com/xmlns/prod/sn", SHORT: "snx"}
  };

  File = declare([], {
    constructor: function (xml) {
      this.xml = xml;
    },

    getName: function () {
      return this._getChildTextNS("label", NS.TD);
    },

    getExtension: function () {
      return this._getExtension(this.getName());
    },

    getSize: function () {
      return parseInt(this._getLinkAttrByRel("enclosure", "length"), 10);
    },

    getTotalSize: function () {
      return this._getChildTextNS("totalMediaSize", NS.TD);
    },

    getId: function () {
      return this._getChildTextNS("uuid", NS.TD);
    },

    getDateCreated: function () {
      return this._getChildDate("created");
    },

    getDateModified: function () {
      return this._getChildDate("modified");
    },

    getAuthor: function () {
      return this._getUser("author");
    },

    getModifier: function () {
      return this._getUser("modifier", NS.TD);
    },

    isEncrypted: function () {
      return this._getChildTextNS("encrypt", NS.TD) === "true";
    },
    
    getVisibility: function () {
      return this._getChildTextNS("visibility", NS.TD);
    },

    getTypeId: function () {
      return this._getChildTextNS("objectTypeId", NS.TD);
    },

    getDownloadUrl: function () {
      return this._getLinkAttrByRel("enclosure", "href");
    },
    
    getDownloadUrlByShareLink: function (query) {
       var url = this._getLinkAttrByRel("enclosure", "href");
       url = urlUtil.rewrite(url, query);
       return url;
    },

    getWebUrl: function () {
      return this._getLinkAttrByRel("alternate", "href");
    },

    getThumbnailUrl: function () {
      return this._getLinkAttrByRel("thumbnail", "href");
    },
    
    getThumbnailUrlByShareLink: function (query) {
      var url = this._getLinkAttrByRel("thumbnail", "href");
      url = urlUtil.rewrite(url, query);
      return url;
    },
    
    getAlternateUrl: function () {
      return this._getLinkAttrByRel("alternate", "href");
    },
    
    getRecommendationUrl: function () {
      return this._getLinkAttrByRel("recommendation", "href");
    },
    
    getUrlEntry: function () {
      return this._getLinkAttrByRel("self", "href");
    },

    getVersionCount: function() {
      return this._getChildTextNSScheme("rank", NS.SNX, "versions");
    },
    
    getVersion: function () {
      return this._getChildTextNS("versionLabel", NS.TD);
    },

    getRatingCount: function () {
      return this._getChildTextNSScheme("rank", NS.SNX, "recommendations");
    },
    
    getCommentCount: function () {
      return this._getChildTextNSScheme("rank", NS.SNX, "comment");
    },

    getTimesDownloaded: function () {
      return this._getChildTextNSScheme("rank", NS.SNX, "hit");
    },

    getTimesDownloadedAnonymously: function () {
      return this._getChildTextNSScheme("rank", NS.SNX, "anonymous_hit");
    },
    getDescription: function() {
      return this._getChildText("summary");
    },
    getMimeType: function() {
       return this._getLinkAttrByRel("enclosure", "type");
    },
    
    getMalwareScanState: function() {
       return this._getChildTextNS("malwareScanState", NS.TD);
    },
    
    getTags: function() {
      var tags = [];
      var elements = this.xml.getElementsByTagName("category");
      array.forEach(elements, function(element){
        if(element.getAttribute("scheme") == null) {
          tags.push(element.getAttribute("term"));
        }
      });
      return tags;
      
    },
    getLibraryType: function () {
      return this._getChildTextNS("libraryType", NS.TD);
    },
    getLibraryId: function () {
       return this._getChildTextNS("libraryId", NS.TD);
    },
    
    getPropagation: function () {
      return this._getChildTextNS("propagation", NS.TD) === "true";
    },
    
    getPermissions: function () {
      var permissions = {}, permissionsString;

      permissionsString = this._getChildTextNS("permissions", NS.TD);
      if (permissionsString) {
        array.forEach(permissionsString.split(", "), function (permission) {
          if (permission) {
            permissions[permission] = true;
          }
        });
      }

      return permissions;
    },
    
    isExternal: function () {
      return this._getChildTextNS("isExternal", NS.SNX) === "true";
    },

    _getExtension: function (name) {
      var index = name.lastIndexOf(".");

      if (index < 0) {
        return "";
      }

      return name.slice(index + 1);
    },

    _getLinkAttrByRel: function (rel, attr) {
      var links = array.filter(this.xml.getElementsByTagName("link"), function (link) {
        return link.getAttribute("rel") === rel;
      });

      return links[0] ? links[0].getAttribute(attr) : "";
    },

    _getChildText: function (tagName, parent) {
      return this._getChildTextNS(tagName, undefined, parent);
    },

    _getChildTextNS: function (tagName, namespace, parent) {
      var node = this._getFirstTag(tagName, namespace, parent);

      if (node) {
        return parser.textContent(node);
      }
    },

    _getChildTextNSScheme: function(tagname, namespace, scheme, parent) {
      if(!parent) {
        parent = this.xml;
      }
      var parsedValue = "";
      
      var elements = this._getAllTags(tagname, namespace, parent);
      var url = namespace.LONG + '/' + scheme;
      array.forEach(elements, function(element){
        if (element.attributes.scheme && element.attributes.scheme.value === url) {
          parsedValue = parser.textContent(element); 
        }
      });
      return parsedValue;
    },

    _getChildDate: function (tagName) {
      return stamp.fromISOString(this._getChildTextNS(tagName, NS.TD));
    },

    _getUser: function (tagName, namespace) {
      var parent = this._getFirstTag(tagName, namespace);

      if (!parent) {
        return {};
      }

      return {
        name: this._getChildText("name", parent),
        id: this._getChildTextNS("userid", NS.SNX, parent),
        email: this._getChildText("email", parent),
        userState: this._getChildTextNS("userState", NS.SNX, parent)
      };
    },

    _getFirstTag: function (tagName, namespace, parent) {
      return this._getAllTags(tagName, namespace, parent)[0];
    },
    
    _getAllTags: function (tagName, namespace, parent) {
      if (!parent) {
        parent = this.xml;
      }

      if (namespace) {
        return (lang.isFunction(parent.getElementsByTagNameNS)) ? 
          parent.getElementsByTagNameNS(namespace.LONG, tagName) :
          parent.getElementsByTagName(getNSPrefix(parent, namespace) + tagName); 
          
      }

      return parent.getElementsByTagName(tagName);
    }
  });
  
  function getNSPrefix(el, namspace) {
    for (var nsNode=el, defaultNS=null; nsNode && !defaultNS && nsNode.nodeType == 1; nsNode = nsNode.parentNode) {
      defaultNS = nsNode.getAttribute("xmlns");
    }
    var prefix = (defaultNS == namspace.LONG) ? "" : (namspace.SHORT + ":");
    return prefix;
  }

  function fromEntryXML(xml) {
    if (typeof xml === "string") {
      xml = parser.parse(xml);
    }

    return new File(xml);
  }

  function fromEntryURL(url) {
    var deferred = new Deferred();

    request(url, {
      handleAs: "xml",
      withCredentials: true,
      query: {
        acls: true,
        includeNotification: true,
        includePolicy: true,
        includeRecommendation: true,
        includeTags: true,
        includeLibraryInfo: true,
        includeDownloadInfo: true,
        inline: true,
        rank: true
      }
    }).then(function (xml) {
      var file = fromEntryXML(xml);

      // Allow this XML to be cached briefly
      FileEntryDataStore._cachedEntry = {
        loadTime: (new Date()).getTime(),
        fileId: file.getId(),
        content: xml
      };

      deferred.resolve(file);
    }, function (error) {
      deferred.reject(networkUtil.parseError(error));
    });

    return deferred;
  }
  
  function fromEntryURLByShareLink(url, headers) {
    var deferred = new Deferred();

    request(url, {
      handleAs: "xml",
      withCredentials: true,
      headers: headers,
    }).then(function (xml) {
      var file = fromEntryXML(xml);

      // Allow this XML to be cached briefly
      FileEntryDataStore._cachedEntry = {
        loadTime: (new Date()).getTime(),
        fileId: file.getId(),
        content: xml
      };

      deferred.resolve(file);
    }, function (error) {
      deferred.reject(networkUtil.parseError(error));
    });

    return deferred;
  }

  return {
    fromEntryXML: fromEntryXML,
    fromEntryURL: fromEntryURL,
    fromEntryURLByShareLink: fromEntryURLByShareLink,

    _getTestInstance: function () {
      return new File();
    }
  };
});
