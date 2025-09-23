/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/i18n!./nls/strings',
   'dojo/i18n!./nls/widgets',
   './WidgetPlacement',
   'ic-gadget/util/trace',
   'ic-ui/DialogUtil'/*,
   'lconn.comm.community',
   'lconn.communities.bizCard.core',
   'lconn.communities.bizCard.dialogs.deleteConfirmWidget'*/
], function(lang, winModule, i18nstrings, i18nwidgets,
   wp, logger, DialogUtil/*, community, bizCardCommCore,
   deleteConfirmWidget*/) {

   /**
    * IBM Connections Widget Framework
    * 
    * WidgetPlacementComm is WidgetPlacement injected with Communities specific 
    * code, Communities code should use this as dependency to WidgetPlacement.
    * 
    * @namespace ic-core.WidgetPlacementComm
    * @author Qi Xi <xiqish@cn.ibm.com>
    */

   /*var win = winModule.global;

   var messages = i18nwidgets,
       coreMessages = i18nstrings;

   var _canAddWidget = function(widgetDef, widgetInstance, opts) {
      // for externally visible community, see if Widget is allowed to be added
      var bizCardCommCore = lang.getObject('lconn.communities.bizCard.core');
      var bizCardCommunity = (bizCardCommCore ? bizCardCommCore.community : null);
      if (bizCardCommunity && bizCardCommunity.externalAllowed) {
         if (widgetDef.showInExternalCommunities === 'false') {
            return false;
         }
      }
      return true;
   };
   wp.utils.registerFilter('canAddWidget', lang.hitch(wp, _canAddWidget));

   var _canRemoveWidget = function(widgetDef, widgetInstance, opts) {
      // If removing the files widget, make sure the media gallery widget is
      // not present
      if (opts.removeWidgetData) {
         if (widgetInstance.defIdRef === 'Files' && wp.utils.getWidgetInstance('MediaGallery')) {
            logger.log('Skipping removal of Files widget since MediaGallery widget is present.');
            return false;
         }
      }
      return true;
   };
   wp.utils.registerFilter('canRemoveWidget', lang.hitch(wp, _canRemoveWidget));

   var _postRemoveWidget = function(widgetInstance) {
      if (!widgetInstance)
         return;

      var defId = widgetInstance.defIdRef,
          instanceId = widgetInstance.instanceId || defId;

      try {
         // If we're on the Status Updates page, return to the overview
         if (defId === 'StatusUpdates') {
            win.location.href = win.WidgetPlacementConfig.applicationContext 
                              + '/service/html/communityview?communityUuid=' 
                              + win.WidgetPlacementConfig.resourceId;
         }
      } catch (e) {
         logger.error(e);
      }
   };
   wp.utils.registerCallback('removeWidget', lang.hitch(wp, _postRemoveWidget));

   var _isWidgetRemovalAccepted = function(instanceId, removeData, callback) {
      if (removeData) {
         // Show simple confirmation dialog for sub-community widget.
         var widgetInstance = wp.utils.getWidgetInstance(instanceId);
         var defId = widgetInstance.defIdRef;
         if (defId === 'FeaturedSurvey' || defId === 'LinkedQuickrCommunityLib'
               || wp.showFullWidgetDeleteConfirmation(defId) === false) {
            DialogUtil.prompt(messages['deleteWidget'],
               messages['confirmDeleteWidget'],
               coreMessages['rs_ok'],
               messages['cancel'],
               callback,
               null);
         }
         else {
            // Show delete or hide confirmation dialog with callback.
            var deleteOrHideCallback = function ( isDelete ) {
               if ( isDelete ) {
                  callback(true);
               } else {
                  callback(false);
                  wp.removeWidget(instanceId, false, false);
               }
            };
            var deleteConfirmWidget = lang.getObject('lconn.communities.bizCard.dialogs.deleteConfirmWidget');
            var dlg = new deleteConfirmWidget({
               communityTitle : wp.utils.getWidgetName(null, widgetInstance),
               callback : deleteOrHideCallback,
               userName : communityActionData.userName
            });
            dlg.show();
         }
      }
      else {
         DialogUtil.prompt(messages['hideWidget'], messages['hideWidgetMsg'], messages['hide'], messages['cancel'], callback, null);
      }
   };
   wp.utils.registerFilter('isWidgetRemovalAccepted', lang.hitch(wp, _isWidgetRemovalAccepted));

   var _handleSearchRequest = function(opts) {
      var attributesMap = [ {
         entryName : 'searchKeywords',
         entryValue : opts.query,
         component : 'communities:content',
         selectTabInst : opts.tabinst,
         selectTab : opts.tab
      }
      ];
      var community = lang.getObject('lconn.comm.community');
      community.handleSearchRequestbyGeneral(attributesMap);
   };
   wp.utils.registerHandler('handleSearchRequest', lang.hitch(wp, _handleSearchRequest));*/
   
   return wp;
});