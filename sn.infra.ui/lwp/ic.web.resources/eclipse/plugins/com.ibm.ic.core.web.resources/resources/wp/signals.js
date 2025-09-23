/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/Stateful'
], function(Stateful) {

   var signals = new Stateful({
         initialLoad : null,
         currentFullpageWidgetInstanceId : null,
         onlyFullPageWidgetLoaded : false,
         registerCloseViewFunction : null,
         isInWidgetFullpageMode : false,
         addWidgetInProgress : false,
         removeWidgetInProgress : false,
         currentNode : null,
         URLChangeCallBack : []
       });
   
   return signals;

});