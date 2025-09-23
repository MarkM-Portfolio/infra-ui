/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/request",
  "dojo/Deferred",
  "dojo/Stateful",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/query",
  "dojox/xml/parser",
  "dojo/dom-attr",
  "dojo/date/stamp",
  "../bean/File"
], function (declare, request, Deferred, Stateful, lang, array, query, parser, domAttr, stamp, FileBean) {
  "use strict";

  var NS, FileComment, FileVersion;

  NS = {
      TD: "urn:ibm.com/td",
      SNX: "http://www.ibm.com/xmlns/prod/sn"
  };

  FileComment = declare([ Stateful ], {
    constructor: function (entry) {
      this.xml = entry;

      this.uuid = this._getChildTextNS("uuid", NS.TD);
      this.content = this._getChildText("content");
      this.version = this._getChildTextNS("versionLabel", NS.TD);
      this.author = this._getUser("author");
      this.date = this._getChildDate("modified");
    },

    _getLinkAttrByRel: function (rel, attr) {
      var links = array.filter(this.xml.getElementsByTagName("link"), function (link) {
        return domAttr.get(link, "rel") === rel;
      });

      return domAttr.get(links[0], attr);
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
        userState: this._getChildTextNS("userState", NS.SNX, parent)
      };
    },

    _getFirstTag: function (tagName, namespace, parent) {
      if (!parent) {
        parent = this.xml;
      }

      if (namespace) {
        return parent.getElementsByTagNameNS(namespace, tagName)[0];
      }

      return parent.getElementsByTagName(tagName)[0];
    }
  });
  
  FileVersion = declare([ Stateful ], {
    constructor: function (entry) {
      this.xml = entry;

      this.version = this._getChildTextNS("versionLabel", NS.TD);
      this.updated = this._getChildDate("published");
      this.author = this._getUser("author");
      this.summary = this._getChildText("summary");
    },

    _getLinkAttrByRel: function (rel, attr) {
      var links = array.filter(this.xml.getElementsByTagName("link"), function (link) {
        return domAttr.get(link, "rel") === rel;
      });

      return domAttr.get(links[0], attr);
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

    _getChildDate: function (tagName) {
      return stamp.fromISOString(this._getChildTextNS(tagName, undefined));
    },

    _getUser: function (tagName, namespace) {
      var parent = this._getFirstTag(tagName, namespace);

      if (!parent) {
        return {};
      }

      return {
        name: this._getChildText("name", parent),
        userid: this._getChildTextNS("userid", NS.SNX, parent),
        userState: this._getChildTextNS("userState", NS.SNX, parent)
      };
    },

    _getFirstTag: function (tagName, namespace, parent) {
      if (!parent) {
        parent = this.xml;
      }

      if (namespace) {
        return parent.getElementsByTagNameNS(namespace, tagName)[0];
      }

      return parent.getElementsByTagName(tagName)[0];
    }
  });

  return declare([], {
    constructor: function (raw) {
      this.id = raw.args.id;
    },

    get: function (key) {
      if (key == "comments") {

        if (this._comments) {
          return this._comments;
        }
        var dataStores = new FileBean(this);
        var commentFeedDS = dataStores.get("commentFeed");

        var promise = new Deferred();

        this._comments = promise;

        commentFeedDS.fetch().then(lang.hitch(this, function (response) {
          var comments = array.map(response, function (item) {
            return new FileComment(item.xml);
          });

          this._comments = comments;
          promise.resolve(comments);
        }), function (error) {
          console.log("error", error);
          promise.reject(error);
        });

        return promise;
      }
      else if (key == "versions"){

        if (this._versions) {
          return this._versions;
        }

        var dataStores = new FileBean(this);
        var versionFeedDS = dataStores.get("versionFeed");
        
        var promise = new Deferred();

        this._versions = promise;

        versionFeedDS.fetch().then(lang.hitch(this, function (response) {
          var versions = array.map(response, function (item) {
            return new FileVersion(item.xml);
          });

          this._versions = versions;
          promise.resolve(versions);
        }), function (error) {
          console.log("error", error);
          promise.reject(error);
        });

        return promise;
      }
    }
  });
});
