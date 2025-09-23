/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/_base/window",
  "dojo/dom-attr",
  "dojo/has",
  "dojo/query",
  "dojo/string",
  "dojo/topic",
  "dojo/dom-construct",
  "../config/globals",
  "./url",
  "./history"
], function (dojo, array, lang, windowModule, domAttr, has, query, string, topic, domConstruct, globals, urlUtil,
  historyUtil) {

  var htmlUtil;
  htmlUtil = {
    setText: function (node, text) {
      domConstruct.empty(node);
      htmlUtil.appendText(node, text);
    },
    appendText: function (node, text) {
      node.appendChild(document.createTextNode(text));
    },
    SUBSTITUTION: /\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
    substitute: function(d, el, template, map, transform, thisObject, sub) {
      var re = sub || htmlUtil.SUBSTITUTION;
      el = el || d.createDocumentFragment();
      var last = 0;
      while (r = re.exec(template)) {
        el.appendChild(d.createTextNode(template.substring(last,r.index)));
        last = r.index+r[0].length;
        var key = r[1];
        var format = r[2];
        var value = lang.getObject(key,false,map);
        if (typeof value == "function")
          value = value.apply(thisObject || map, [key, format]);
        if(format){ value = lang.getObject(format,false,thisObject)(value);}
        if(transform){ value = transform(value, key); }
        if (typeof value != "undefined" && value != null) {
          if (value.nodeType > 0)
            el.appendChild(value);
          else
            el.appendChild(d.createTextNode(value.toString()));
        }
      }
      el.appendChild(d.createTextNode(template.substring(last)));
      return el;
    },

    EMBEDDED_URL_PATTERN: /(^|[\s])(([a-zA-Z]+:\/\/|www\.|mailto:)[^\s]+)/i,
    URL_PUNCTUATION_BACKTRACK: /[\.,\!;\:\'\"]+$/,
    createTextNode: function createTextNode_$17(d, el, text, skipLineBreaks) {
      if (!text)
        return;
      text = lang.trim(text);
      if (text.length > 0) {
        var sections = text.split("\u000A");
        array.forEach(sections, function(text, i, arr) {
          var match, backtrack;
          while (match = htmlUtil.EMBEDDED_URL_PATTERN.exec(text)) {
            var previous = text.substring(0, match.index) + match[1];

            var baseHref = match[2];
            if (backtrack = htmlUtil.URL_PUNCTUATION_BACKTRACK.exec(baseHref))
              baseHref = baseHref.substring(0,backtrack.index);
            text = text.substring(previous.length+baseHref.length);

            var isWWW = (match[3] && match[3].toLowerCase() == "www.");
            var isMailto = (match[3] && match[3].toLowerCase() == "mailto:");
            var href = isWWW ? "http://"+baseHref : baseHref;
            if (isMailto)
              baseHref = baseHref.substring(7);

            if (previous.length > 0) {
              htmlUtil.appendText(el, text);
            }

            var a = domConstruct.create("a");
            a.href = href;
            htmlUtil.appendText(a, baseHref);
            el.appendChild(a);            
          }
          if (text.length > 0) {
            htmlUtil.appendText(el, text);
          }
          //el.appendChild(d.createTextNode(text));
          if (i < arr.length - 1)
            el.appendChild(!skipLineBreaks ? d.createElement("br") : d.createTextNode(" "));
        });
      }
    },

    /**
     * Write a string to the DOM such that there are the maximum number of sequential non-breakable (by the browser) characters is
     * breakLength (defaults to 10).
     */
    breakString: function breakString_$8(s, d, el, breakLength) {
      if (!s)
        return;
      breakLength = breakLength || 10;
      var b = new RegExp("[^\\s]{"+(breakLength+1)+"}", "g");
      var r;
      var start=0,end;
      if (dojo.isIE || dojo.isWebKit)
        while (r = b.exec(s)) {
          end = --b.lastIndex;

          // If the terminating character is a high surrogate, increment the end to grab the low surrogate
          var code = s.charCodeAt(end-1);
          if (code >= 55296 && code < 56192)
            end++;
          //fix for PMR 04794,999,856
          if (code == 3588)
            end++;
          //fix for IC 91730, when splitting R2 characters, do so in groups of three
          for (var i=0; i < s.length - 2; i++) {
            if (s.charCodeAt(i) == 3619 && s.charCodeAt(i+1) == 3639 && s.charCodeAt(i+2) == 3656) {
              end = 9;
              break;
            } else {
              el.appendChild(d.createElement("wbr"));
            }
          }
          el.appendChild(d.createTextNode(s.substring(start, end)));
          start = end;
        }
      else
        while (r = b.exec(s)) {
          end = --b.lastIndex;

          // If the terminating character is a high surrogate, increment the end to grab the low surrogate
          var code = s.charCodeAt(end-1);
          if (code >= 55296 && code < 56192)
            end++;
          //fix for PMR 04794,999,856
          if (code == 3588)
            end++;
          //fix for IC 91730, when splitting R2 characters, do so in groups of three
          for (var i=0; i < s.length - 2; i++) {
            if (s.charCodeAt(i) == 3619 && s.charCodeAt(i+1) == 3639 && s.charCodeAt(i+2) == 3656) {
              end = 9; //Instead of end = 10. This allows the substring to break at the end of the
              //group of 3 unicodes required to make an R2 character.
              break;
            } else {
              el.appendChild(d.createElement("wbr"));
            }
          }
          el.appendChild(d.createTextNode(s.substring(start, end)+"\u200B"));
          start = end;
        }
      el.appendChild(d.createTextNode(s.substring(end)));
      return el;
    },
    
    generateLinkToUser: function (user, parent) {
      var userLink = domConstruct.create("span");

      domConstruct.create("span", {
        className: "x-lconn-userid",
        style: "display: none;",
        innerHTML: user.id
      }, userLink);

      if (!lang.isFunction(globals.createPersonLink)) {
        userLink.appendChild(document.createTextNode(user.name));
      } else {
        userLink.appendChild(globals.createPersonLink(user));

        if (lang.isFunction(globals.attachBizCard)) {
          globals.attachBizCard(userLink);
        }
      }
      
      if (parent) {
        parent.appendChild(userLink);
      }
      
      return userLink;
    },
    
    processLink: function (a) {
      var backgroundPageUrl = historyUtil.backgroundPageUrl,
        linkTarget = a.href,
        openInNewWindow = true;
      
      if (linkTarget.indexOf("javascript:") === 0) {
        openInNewWindow = false;
      } else if (urlUtil.isCommunityUrl(backgroundPageUrl) && urlUtil.isCommunityUrl(linkTarget) && lang.isFunction(this._getWidgetDefId) &&
                 urlUtil.getParameters(backgroundPageUrl).communityUuid === urlUtil.getParameters(linkTarget).communityUuid) {
        var backgroundWidgetId = urlUtil.getHashParameters(backgroundPageUrl).fullpageWidgetId;
        var targetWidgetId = urlUtil.getHashParameters(linkTarget).fullpageWidgetId;
        if (!targetWidgetId || (this._getWidgetDefId(targetWidgetId) === "Files" && (!backgroundWidgetId || backgroundWidgetId === targetWidgetId))) {
          openInNewWindow = false;
        }
        
      } else if (urlUtil.isSamePage(backgroundPageUrl, linkTarget)) {
        openInNewWindow = false;
      }
      
      if (openInNewWindow) {
        a.setAttribute("target", "_blank");
      }
    },
    
    _getWidgetDefId: lang.getObject("lconn.core.WidgetPlacement.getWidgetDefId")
  };

  return htmlUtil;
});
