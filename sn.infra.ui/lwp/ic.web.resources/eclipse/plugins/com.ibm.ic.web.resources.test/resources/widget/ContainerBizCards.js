/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/dom-construct",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dijit/_WidgetsInTemplateMixin",
   "ic-ui/util/bizCardUtility",
   "dojo/text!./templates/ContainerBizCards.html",
   "dojo/domReady!"
], function(declare, lang, darray, domConstruct, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, businessCardUtility, /*fileThumbnail,*/ template) {

   /**
    * A container widget to display the business cards (only one widget is created).
    * @author Davide Riso <davide.riso@ie.ibm.com> 
    * @class ic-test.widget.ContainerBusinessCards
    */
   return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], /** @lends ic-test.widget.ContainerBusinessCards.prototype */ {

      /** html template of the widget */ 
      templateString: template,

      /** Set some static data to test the FileThumbnail widget. */
      postCreate: function() {
            this.inherited(arguments);

            // check the existing links and add the onclick handler
            businessCardUtility.checkAll();
            
            // create links dynamically add the onclick handler
            var spanVcard = domConstruct.create("span", {'class': 'vcard'}, this.domNode);
            var profileId = '91ae7240-8f0a-1028-737f-db07163b51b2';
            var profileNameTrimmed = 'Davide Riso';
            var businessCard = '<a class="fn url" href="javascript:void(0);" style="margin-left:20px;" aria-label="...">' + profileNameTrimmed + '</a><span class="x-lconn-userid" style="display: none;">' + profileId + '</span>';
            domConstruct.place(businessCard, spanVcard);
            
            if (businessCardUtility !== undefined) {
               setTimeout(function() {businessCardUtility.checkNode(spanVcard);}, 500);
            }
            else {
               console.warn('Object "businessCardUtility" not found. Business Card not available.');
            }
         }
      });
});
