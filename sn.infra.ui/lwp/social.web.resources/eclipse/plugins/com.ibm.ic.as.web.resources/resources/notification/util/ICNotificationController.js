define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/aspect',
  'dojo/on'
], function (declare, lang, aspect, on) {
  
  var ICNotificationController = declare(null, {

    _NotificationPermissionGranted: "granted",

    /**
     * Instantiate controller and request permission for html5 notifications
     */
    constructor: function(){    
    },

    /**
     * Requests permission from the user to allow html5 notifications to be sent
     * @return {[type]} [description]
     */
    requestNotificationPermission: function(){
	    var nativeNotify = (window.Notification && Notification.permission !== 'denied') || (window.webkitNotifications && webkitNotifications.checkPermission() === 0);
	    if (!/[\?&]mode=/.test(window.location.href) && nativeNotify && Notification.permission == 'default') {
	      Notification.requestPermission();
	    }  
    },


    /**
     * Create a new native notification and set up handlers for clear and close
     * @param  {String} statusText The title of the Notification
     * @param  {String} bodyText   Body text rendered in main section of notification.
     *                             note that browsers differ in how much text will be shown
     * @param  {String} icon       Icon displayed in the notification
     * @param  {String} url        If specified will be the onclick url of the notification
     * @param  {Boolean} autoClose  Close after a period of time automatically
     * @param  {Sring} tag        Notification tag to manage repeated messages
     * @return {Notification}           HTML5 Notification object
     */
    createNative: function (statusText, bodyText, icon, url, autoClose, tag) {
      if(window.Notification && Notification.permission === this._NotificationPermissionGranted){
       
          var notifObj = this.buildHTMLNotificationObject(bodyText, icon, tag);

          var notification = new Notification(statusText || '', notifObj);
          if(autoClose){
            setTimeout(function(){
              notification.close();
            },10000);
          }  

          //Setup an click handler if a url is specified
          if(url){
            notification.onclick = function() { 
              window.location.href = url;
            };          
          }

          return notification;
      } else {
    	  this.requestNotificationPermission();
      }
    },

    /**
     * Create the object parameter for html5 notifications
     * @param  {String} bodyText Body text
     * @param  {String} icon     Icon on the popup
     * @param  {String} tag      A unique identifier for the Notification -
     *                           Helps to manage repeated notifications on a common thread
     * @return {Obj}
     */
    buildHTMLNotificationObject: function(bodyText, icon, tag){
       var notifObj = {
          lang: 'en'          
        };
        
        if(bodyText){
          notifObj.body = bodyText;
        }

        if(icon){
          notifObj.icon = icon;
        }

        if(tag){
         notifObj.tag = tag; 
        }

        return notifObj;
    }

  });
  ICNotificationController._Instance = null;
    
  ICNotificationController.getInstance = function(){
    if(ICNotificationController._Instance == null){
      ICNotificationController._Instance = new ICNotificationController();
      }
      return ICNotificationController._Instance;
  }
  
  return ICNotificationController.getInstance();
});