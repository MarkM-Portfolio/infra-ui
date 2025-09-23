/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function() {

   dojo.provide("lconn.share.widget.FileDateFormatter");

   dojo.require("dojo.html");
   dojo.require("dojo.string");
   dojo.require("dijit._WidgetBase");
   dojo.require("dojox.html.entities");
   dojo.require("lconn.share.util.DateFormat");
   dojo.require("lconn.core.util.text");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.config.services");

   /**
    * File Date Formatter Widget allows the display of the date, the profile
    * user and the business card (popup)
    * <p>
    * Usage (see "lconn.share.widget.FileThumbnail" for an example):
    * <p>
    * provide the following properties:
    * <dl>
    * <dt>profileName</dt>
    * <dd>an object with "id" and "name" of the profile to display</dd>
    * <dt>date</dt>
    * <dd>the Date in JSON format (for example new Date().toJSON())</dd>
    * <dt>isUpdated</dt>
    * <dd>true if the file has been updated ("date" is the modified date),
    * false if we have just a first version of the file ("date" is the creation
    * date)</dd>
    * <dt>showBizCard</dt>
    * <dd>true to display the business card, false to display just the name and
    * the anchor</dd>
    * <dt>i18n</dt>
    * <dd>the the native language support data expected (nls_profile,
    * nls_dateFormatFileCreated, nls_dateFormatFileModified)</dd>
    * </dl>
    * <p>
    * Example:
    * 
    * <pre>
    * &lt;span data-dojo-type=&quot;lconn.share.widget.FileDateFormatter&quot;
    *       data-dojo-props=&quot;
    *          profileName: {id: 1, name: 'Davide Riso'},
    *          date: '2014-03-05T11:19:11.765Z',
    *          isUpdated: true/false,
    *          showBizCard: true/false&quot;,
    *          i18n: {nls_profile: '...', nls_dateFormatFileCreated: {DAY: '...', FULL: '...', MONTH: '...', TODAY: '...', YEAR: '...', YESTERDAY: '...'}, nls_dateFormatFileModified:  {DAY: '...', FULL: '...', MONTH: '...', TODAY: '...', YEAR: '...', YESTERDAY: '...'}}
    * &gt;&lt;/span&gt;
    * </pre>
    * 
    * The HTML generated is based on the following documentation:
    * http://www-10.lotus.com/ldd/lcwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.5+Documentation#action=openDocument&amp;res_title=Integrating_the_Profiles_business_card_ic45&amp;content=pdcontent
    * 
    * @author Davide Riso &lt;davide.riso@ie.ibm.com&gt;
    * @namespace lconn.share.widget.FileDateFormatter
    */
   dojo.declare("lconn.share.widget.FileDateFormatter", [ dijit._WidgetBase
   ], {

      /** an object with "id" and "name" of the profile to display */
      profileName : {},

      /** the Date in JSON format (for example new Date().toJSON()) */
      date : "",

      /**
       * true if the file has been updated ("date" is the modified date), false
       * if we have just a first version of the file ("date" is the creation
       * date)
       */
      isUpdated : false,

      /**
       * true to display the business card, false to display just the name and
       * the anchor
       */
      showBizCard : false,

      /**
       * i18n: the the native language support data expected (nls_profile,
       * nls_dateFormatFileCreated, nls_dateFormatFileModified)
       */
      i18n : {},

      /** Set-up */
      postCreate : function() {
         this.inherited(arguments);
         var labelsDateFormatter = (this.isUpdated) ? this.i18n.nls_dateFormatFileModified : this.i18n.nls_dateFormatFileCreated;
         var dateFormatted = new lconn.share.util.DateFormat(dojo.date.stamp.fromISOString(this.date)).formatByAge(labelsDateFormatter);
         var urlProfile = lconn.core.url.rewrite(lconn.core.url.getServiceUrl(lconn.core.config.services.profiles) + "/html/profileView.do", {
            userid : this.profileName.id
         });
         // In SmartCloud, BSS allows users to have tags/javascript in display
         // name and each application is expected to handle that.
         var profileNameAriaLabel = dojox.html.entities.encode(this.profileName.name);
         var profileNameTrimmed = lconn.core.util.text.trimToLength(profileNameAriaLabel, 45);
         if (this.showBizCard) {
            dojo.addClass(this.domNode, "vcard");
            var businessCard = '<a class="fn url" href="' + urlProfile + '" aria-label="'
                  + dojo.string.substitute(this.i18n.nls_profile, [ profileNameAriaLabel
                  ]) + '">' + profileNameTrimmed + '</a><span class="x-lconn-userid" style="display: none;">' + this.profileName.id + '</span>';
            dojo.html.set(this.domNode, dojo.string.substitute(dateFormatted, {
               user : businessCard
            }));
            if (window.SemTagSvc !== undefined) {
               setTimeout(dojo.hitch(this, function() {
                  SemTagSvc.parseDom(null, this.domNode);
               }), 500);
            }
            else {
               console.warn('Object "SemTagSvc" not found. Business Card not available.');
            }
         }
         else if (!this.suppressUserLink) {
            var anchor = '<a href="' + urlProfile + '" aria-label="' + dojo.string.substitute(this.i18n.nls_profile, [ profileNameAriaLabel
            ]) + '">' + profileNameTrimmed + '</a>';
            dojo.html.set(this.domNode, dojo.string.substitute(dateFormatted, {
               user : anchor
            }));
         }
         else {
            dojo.html.set(this.domNode, dateFormatted.replace("${user}", profileNameTrimmed));
         }
      }
   });

}());
