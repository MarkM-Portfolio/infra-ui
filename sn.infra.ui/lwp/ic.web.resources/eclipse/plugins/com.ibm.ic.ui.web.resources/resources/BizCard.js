/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/_base/window",
   "dojo/_base/event",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/dom-style",
   "dojo/html",
   "dojo/dom-geometry",
   "dijit/TooltipDialog",
   "dijit/_WidgetsInTemplateMixin",
   "dojo/text!./templates/BizCard.html",
   "dojo/i18n!./nls/BizCard", // native language support messages
   "ic-ui/Icon",
   "ic-ui/bizCard/TextList",
   "ic-ui/bizCard/IconList"
], function(declare, lang, darray, win, event, domAttr, domClass, domStyle, html, domGeom, TooltipDialog, _WidgetsInTemplateMixin, template, nlsMessages) {

   /**
    * BizCard allows the display of a popup/mini business card for Connections, SmartCloud, MailNext, etc.
    * @author Davide Riso <davide.riso@ie.ibm.com> 
    * @class ic-ui.BizCard
    */
   return declare([TooltipDialog, _WidgetsInTemplateMixin], /** @lends ic-ui.BizCard.prototype */ {

      /** the id of this widget, used inside the html template */
//      id: 'ic-bizCard-widget',
      
      /** the key/value object passed by the container */
      key: null,
      
      /** the value with the data */
      value: null, 
      
      /** flag to verify if the front side of the card is visible */
      isLoading: null, 
      
      /** flag to verify if the front side of the card is visible */
      isFrontSide: null, 
      
      /** flag to verify if the front side of the card is collapsed or expanded */
      isCollapsed: null, 
      
      /** html template of the widget */
      templateString: template,
      
      /** CSS class required by the elements which display a text in high contrast mode */
      hcClass: 'hc',
      
      iconListActionsData: null,
      
      textListActionsData: null,
      
      textListViewsData: null,
      
      

      
      /** i18n - make native language support messages available on "this" */ 
      postMixInProperties: function() {
         this.inherited(arguments);
         lang.mixin(this, nlsMessages);
         

      },      
      
      
      /** Set-up */
      postCreate: function() {
         this.inherited(arguments);
         if (this.key) {
            this.update(this.key);
         }
      },
      
      /** use the key passed to query (ajax) and display in the UI the data returned */
      update: function(key) {
         this.key = key;
         console.log('data passed by the container: '+ JSON.stringify(this.key));
         // display of the loading panel (this.loading)
         this.isLoading = true;
         this.isFrontSide = true;
         this.updateView();
         //return;
         
         // possible URL here
         //http://connections.swg.usma.ibm.com/profiles/json/semanticTagProfileView.do?email=r2ctest1@us.ibm.com&callback=myCallback&includeFeatures=base,sametimeStatus,sametiMemeetingStatus,socialContactInfo,photoInfo,localTime
         
         // TODO verify if the data for that profile/contact is already loaded. 
         // Otherwise, reset the data in the card, make the call to get the data based on the key
         // We'll consider also the x-domain use case so the data will be managed as follows.
         // http://dojotoolkit.org/documentation/tutorials/1.9/jsonp/
            /*
            X_lconn_userid - the userid that works across all connections applications.
            fn - The full name of the user
            photo - URL to the photo
            email.internet - Email of the user
            X_inDirectory - Whether the user was found in the profiles directory
            X_isFollowed - Whether the current user is following this user
            title - Job title/role
            org - Company name/Organization
            adr.work.locality - Company city (or equivalent)
            adr.work.region - Company state (or equivalent)
            adr.work.country_name - Company country
            tel.work - Telephone number
            tel.mobile - Mobile number
            tel.fax - Fax number
            */
         
         // test data
         
         this.value = {
               X_lconn_userid: 'ca31e740-1a30-102d-8306-b31a12142572',
               fn: 'Andrew Smith',
               photo: '../../com.ibm.lconn.core.styles.test/bizCard/avatar.gif',
               email: {
                  internet: "andrew_smith_account_manager@greenwell.com"
               },
               X_inDirectory: true,
               X_isFollowed: false,
               title: 'Account Manager, Alpha Division, Sales Group North America',
               org: 'Greenwell Company Name Is Long And Runs On',
               adr: {
                  work: {
                     region: "North Carolina",
                     country_name: "United States"
                  }
               },
               tel: {
                  work: "+ 001 512-090-8020"
               },
               time: 1180955100000, // can Bob pass the formatted time? ie. "2:00pm"
               X_building_name: 'MG2',
               X_building_floor: '4F',
               X_office: '241',
               
               // status saved, so passed by Bob Barber
               X_isCollapsed: false,
               // status saved, so passed by Bob Barber
               X_isVisitor: true
         };
         
         this.isLoading = false;
         
         var error = false;
         if (error) {
            // TODO - display standard message in case of error
            this.isCollapsed = true;
            this.setContent('<p style="padding: 15px;">A profile does not exist for this person</p>');
            return;
         }
         
         if (this.value) {
            // set the isCollapsed boolean flag, default true
            this.isCollapsed = this.value.X_isCollapsed;
            
            // reset the fields in the UI
            this.resetUI();
            // front side
            this.updateFrontSide();
            // back side
            this.updateBackSide();
            
            this.updateListsData();
            
            // update the actions (icons)
            this.iconListActions.update(this.iconListActionsData);
            
            // update the textual lists on the back-side of the card
            this.backTextListActions.update(this.textListActionsData);
            this.backTextListViews.update(this.textListViewsData);
  
            // hide the loading panel (this.loading)
            this.updateView();
         }
      },
      
      updateListsData: function() {
         
         this.iconListActionsData = [
         {
           type: 'link',
           text: 'Invite to meeting',
           ariaText: 'aria invite to meeting',
           iconUrl:'../../com.ibm.lconn.core.styles/images/businessCard/e-meeting_new.png',
           linkUrl: 'http://www.ibm.com'
        },
        {
           type: 'link',
           text: 'Invite to meeting',
           iconUrl:'../../com.ibm.lconn.core.styles/images/businessCard/e-meeting_new.png',
           linkUrl: 'http://www.ibm.com',
           disabled: true
        },
        {
           type: 'link',
           text: 'Start Chat, I am Available',
           ariaText: 'aria I am available',
           iconUrl:'../../com.ibm.lconn.core.styles/images/businessCard/chat_new.png',
           linkUrl: 'http://www.ibm.com',
           parameters: {squareSametime:'available'}
        },
        {
           type: 'toggle',
           textStatusTrue: 'Stop Following',
           textStatusFalse: 'Follow',
           iconStatusTrue: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/16/Check-3-icon.png',
           iconStatusFalse: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/16/Check-2-icon.png',
           urlStatusTrue: '../data/abstractListUnfollow.json',
           urlStatusFalse: '../data/abstractListFollow.json', 
           status: true
        },
        {
           type: 'toggle',
           textStatusTrue: 'Stop Following',
           textStatusFalse: 'Follow',
           ariaTextStatusTrue: 'aria Stop following',
           ariaTextStatusFalse: 'aria follow',
           iconStatusTrue: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/16/Check-3-icon.png',
           iconStatusFalse: 'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/16/Check-2-icon.png',
           urlStatusTrue: '../data/abstractListUnfollow.json',
           urlStatusFalse: '../data/abstractListFollow.json', 
           status: true
         }];
                                         

         this.textListActionsData = [{
             type: 'link',
             text: 'Click me',
             ariaText: 'aria Click me',
             linkUrl: 'http://www.ibm.com',
             target:'_blank'
          },
          {
             type: 'link',
             text: 'Click me instead',
             linkUrl: 'http://www.google.com'
          },
          {
             type: 'toggle',
             textStatusTrue: 'Stop following',
             textStatusFalse: 'Follow',
             ariaTextStatusTrue: 'Following Status',
             ariaTextStatusFalse: 'Following Status',
             urlStatusTrue: '../data/abstractListUnfollow.json',
             urlStatusFalse: '../data/abstractListFollow.json', 
             status: true
          },
          {
             type: 'toggle',
             textStatusTrue: 'pressed',
             textStatusFalse: 'unpressed',
             urlStatusTrue: '../data/abstractListUnfollow.json',
             urlStatusFalse: '../data/abstractListFollow.json', 
             status: false
             }];
                               
      // more links here                 
      this.textListViewsData =  [];
         
      },
      
      /** reset all the fields in the UI */
      resetUI: function() {
         // avatar
         domStyle.set(this.avatar, "backgroundImage", "");
         domStyle.set(this.avatar, "backgroundRepeat", "");
         domStyle.set(this.avatar, "backgroundColor", ""); // reset of this, in case there's a background color (missing avatar)
         html.set(this.avatar, ''); // reset of this, in case there's a text inside (missing avatar)
         
         // front side top
         html.set(this.frontFullName, '');
         html.set(this.frontCompanyRole, '');
         html.set(this.frontCompanyName, '');
         // front side bottom
         html.set(this.frontCompanyLocationTime, '');
         html.set(this.frontCompanyBuildingFloorOffice, '');
         html.set(this.frontEmail, '');
         html.set(this.frontTelephone, '');
         // back side
         html.set(this.backFullName, '');
      },
      
      /** updates the avatar image */
      updateAvatar: function() {
         // avatar
         domStyle.set(this.avatar, "backgroundImage", "url('"+this.value.photo+"')");
         domStyle.set(this.avatar, "backgroundRepeat", "no-repeat");
      },
      
      /** updates the front-side fields */
      updateFrontSide: function() {
         // avatar
         this.updateAvatar();
         // front side top
         html.set(this.frontFullName, this.value.fn);
         
         domStyle.set(this.frontIcon.domNode, 'display', (this.value.X_isVisitor) ? '' : 'none');
         html.set(this.frontCompanyRole, this.value.title);
         html.set(this.frontCompanyName, this.value.org);
         
         // front side bottom
         html.set(this.frontCompanyLocationTime, this.generateRegionCountryTimeString());
         html.set(this.frontCompanyBuildingFloorOffice, this.generateBuildingFloorOfficeString());
         html.set(this.frontEmail, this.value.email.internet);
         domAttr.set(this.frontEmail, 'title', this.bc_sendMail.replace("%0", this.value.email.internet));
         html.set(this.frontTelephone, this.value.tel.work); 
      },
      
      /** updates the back-side fields */
      updateBackSide: function() {
         html.set(this.backFullName, this.value.fn);
      },
      
      /** generate the string which uses 3 different fields (BiDi managed) */
      generateRegionCountryTimeString: function() {
         var stringRCT = '';
         var arrRC = [];
         if (domGeom.isBodyLtr()) {
            if (this.value.adr.work.region) {
               arrRC.push(this.value.adr.work.region);
            }
            if (this.value.adr.work.country_name) {
               arrRC.push(this.value.adr.work.country_name);
            }         
            stringRCT = arrRC.join(', ');
            if (this.value.time) {
               if (stringRCT.length !== 0) {
                  stringRCT += ' - ';
               }
//               var dateTime = new Date(this.value.time);
               // TODO format date
               stringRCT += '1:00pm'; 
            }
         }
         else { // TODO RTL
            stringRCT = '<NOT IMPLEMENTED>';
         }
         return stringRCT;
      },
      
      /** generate the string which uses 3 different fields (BiDi managed) */
      generateBuildingFloorOfficeString: function() {
         var frontCompanyBFO = [];
         if (this.value.X_building_name) {
            frontCompanyBFO.push(domGeom.isBodyLtr() ? this.bc_building + this.value.X_building_name : this.value.X_building_name + this.bc_building);
         }
         if (this.value.X_building_floor) {
            frontCompanyBFO.push(domGeom.isBodyLtr() ? this.bc_floor + this.value.X_building_floor : this.value.X_building_floor + this.bc_floor);
         }
         if (this.value.X_office) {
            frontCompanyBFO.push(domGeom.isBodyLtr() ? this.bc_office + this.value.X_office : this.value.X_office + this.bc_office);
         }
         if (!domGeom.isBodyLtr()) { // RTL
            frontCompanyBFO.reverse();
         }
         return frontCompanyBFO.join(' | ');
      },      
      
      /** updates the view considering the flags isLoading, isFrontSide, isCollapsed  */
      updateView: function() {
         if (this.isLoading) {
            domStyle.set(this.front, 'display', 'none');
            domStyle.set(this.back, 'display', 'none');
            domStyle.set(this.loading, 'display', 'block');
         }
         else {
            domStyle.set(this.loading, 'display', 'none');
            this.updateVisibilityFrontBack();
         }
      },

      /** updates the view considering the flags isFrontSide, isCollapsed  */
      updateVisibilityFrontBack: function() {
         if (this.isFrontSide) {
            domStyle.set(this.back, 'display', 'none');
            domStyle.set(this.front, 'display', '');
            this.updateVisibilityBottom();
         }
         else {
            domStyle.set(this.back, 'height', this.front.offsetHeight + 'px');
            domStyle.set(this.front, 'display', 'none');
            domStyle.set(this.back, 'display', '');
         }
      },
      
      /** updates the view considering the flag isCollapsed (first verify that the front-side is displayed) */
      updateVisibilityBottom: function() {
         if (this.isFrontSide) {
            if (this.isCollapsed) {
               domClass.replace(this.expandCollapse, 'collapsed', 'expanded');
               domAttr.set(this.expandCollapse, 'title', this.bc_expand);
               domStyle.set(this.frontBottom, 'display', 'none');
            }
            else {
               domClass.replace(this.expandCollapse, 'expanded', 'collapsed');
               domAttr.set(this.expandCollapse, 'title', this.bc_collapse);
               domStyle.set(this.frontBottom, 'display', '');
            }
         }
      },
      
      /** toggle to expand/collapse the front-side */
      toggleExpandCollapse: function(e) {
         this.isCollapsed = !this.isCollapsed;
         this.updateVisibilityBottom();
      },
      
      /** toggle to show/hide the front/back side */
      toggleFrontBack: function(e) {
         this.isFrontSide = !this.isFrontSide;
         this.updateVisibilityFrontBack();
      }
   });
});
