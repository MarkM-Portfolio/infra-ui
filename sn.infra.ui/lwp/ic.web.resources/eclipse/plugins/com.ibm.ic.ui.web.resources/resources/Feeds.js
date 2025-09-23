/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/dom-construct",
   "dojo/i18n",
   "dojo/dom-class",
   "dojo/i18n!./nls/Feeds",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/text!./templates/Feeds.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-core/locale"
], function (dojo, domConstruct, i18n, domClass, i18nFeeds, declare, lang, array, template, _Templated, _Widget, localeUtil) {
   
   /**
    * @typedef FeedItem
    * @property {String} text Link text of the feed
    * @property {String} title Title of the feed
    * @property {String} type Mime type of the feed
    * @property {URL} href Url of the feed
    */
   
   /**
    * A widget that renders links to feeds, usually at the bottom of lists
    * @class ic-ui.Feeds
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var Feeds = declare("com.ibm.oneui.controls.Feeds", [_Widget, _Templated],  /** @lends ic-ui.Feeds.prototype */ {
      
      templateString: template,
      
      /**
       * Array of items representing feeds that this widget displays.
       * @type Array.<FeedItem>
       */
      items: [],
      
      _strings: i18nFeeds,
      
      postMixInProperties: function() {
         this.popupId = this.id + '_popup';
      },
      
      postCreate: function() {
         this.inherited(arguments);
         array.forEach(this.items, lang.hitch(this, function(item, i) {
            if (i > 0) {
               domConstruct.create("span", {className: "lotusDivider", role: "img", "aria-hidden": "true", innerHTML: "|"}, this.feedLinksContainer);
            }
            var a = domConstruct.create("a", {className: i === 0 ? "lotusFeed lotusAction" : "lotusAction", href: item.href, innerHTML: item.text}, this.feedLinksContainer),
               l = domConstruct.create("link", {rel: "alternate", type: item.type, title: item.title, href: item.href}, this.feedLinksContainer);
            this.decorate(a, l);
         }));
         // Arabic requires a mirrored ? sprite
         if (localeUtil.getLanguage()==='ar') {
            domClass.remove(this.iconNode, 'lconnSprite-iconHelp16');
            domClass.add(this.iconNode, 'lconnSprite-iconHelp16-ar');
         }
      },
      
      /**
       * Allows subclassers to perform custom decoration of feed links.
       * @param {Node} a The hyperlink element
       * @param {Node} l The link element
       * @abstract
       */
      decorate: function(a, l) {
         return;
      }
   });
   
   return Feeds;
});
