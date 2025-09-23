/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.util.MessageBox");

dojo.require("lconn.core.Res");
dojo.require("com.ibm.oneui.controls.MessageBox");

/**
 * A utility to render message boxes
 * <p>
 * The need for this utility is questionable. Please instantiate the
 * {@see com.ibm.oneui.controls.MessageBox} widget directly.
 * 
 * @namespace lconn.core.util.MessageBox
 */
(function(lang, dom, domConstruct, registry, MessageBoxUtil, MessageBox, Res) {

   var rs_icon_alt = {};
   var rs_a11y_label = {};
   var rs_close = "";
   var _isBundleLoaded = false;
   var _types = [
         "ERROR",
         "WARNING",
         "INFO",
         "SUCCESS"
   ];

   // INITIALIZE RESOURCES
   var _loadBundle = function() {
      if (_isBundleLoaded)
         return;

      var res = new Res();
      res.loadDefaultBundle();
      var b = res.resBundle;

      _isBundleLoaded = true;

      rs_icon_alt.SUCCESS = b.rs_messagebox_success_icon_alt;
      rs_a11y_label.SUCCESS = b.rs_messagebox_success_a11y_label;
      rs_icon_alt.ERROR = b.rs_messagebox_error_icon_alt;
      rs_a11y_label.ERROR = b.rs_messagebox_error_a11y_label;
      rs_icon_alt.INFO = b.rs_messagebox_info_icon_alt;
      rs_a11y_label.INFO = b.rs_messagebox_info_a11y_label;
      rs_icon_alt.WARNING = b.rs_messagebox_warning_icon_alt;
      rs_a11y_label.WARNING = b.rs_messagebox_warning_a11y_label;

      rs_close = b.rs_messagebox_close_btn_title;

   };

   var _checkType = function(type) {
      for ( var t in _types)
         if (_types[t] == type)
            return false;
      return true;
   }

   function getArgs(args, mix) {
      return lang.mixin(args ? lang.clone(args) : {}, mix);
   }

   /**
    * @memberof lconn.core.util.MessageBox
    * @function displayMessage
    * @param targetID
    *           {String} Where the message div will be placed.
    * @param msgID
    *           {String} The message div ID that you want to create, for
    *           creating different widget.
    * @param location
    *           {String} Where to put the msg div in target div.
    * @param msg
    *           {Object} The message you want to show.
    * @param type
    *           {String} The message type. { "ERROR", "WARNING", "INFO",
    *           "SUCCESS" }
    * @param canClose
    *           {String} Whether the box can be closed.
    */
   MessageBoxUtil.displayMessage = function(args, targetID) {
      args = getArgs(args);

      var msgID = args.id;

      var location = args.location || "last";
      var msg = args.msg;
      var type = args.type;
      if (!type || _checkType(type))
         type = "SUCCESS";
      var cc = args.canClose !== undefined ? args.canClose : true;

      var ia = args.icon_alt;
      var al = args.a11y_label;
      var cba = args.close_btn_alt;
      var cbt = args.close_btn_title;

      _loadBundle();

      if (targetID == null || msgID == null || location == null || msg == null || type == null)
         return;

      var msgNode = registry.byId(msgID);
      if (registry.byId(msgID) != null)
         msgNode.destroy();

      var messageDiv = domConstruct.create("div", {
         "aria-live" : "rude"
      }, dom.byId(targetID), location);
      args = lang.mixin(args, {
         canClose : cc,
         type : MessageBox.TYPE[type],
         msg : msg,
         _strings : {
            icon_alt : ia || rs_icon_alt[type],
            a11y_label : al || rs_a11y_label[type],
            close_btn_alt : cba || rs_close,
            close_btn_title : cbt || rs_close
         }
      });
      return new MessageBox(args, messageDiv);
   };

   /**
    * Shorthand for displayMessage with args.type = "INFO"
    * 
    * @memberof lconn.core.util.MessageBox
    * @function info
    * @param targetID
    *           {String} Where the message div will be placed.
    * @param msgID
    *           {String} The message div ID that you want to create, for
    *           creating different widget.
    * @param location
    *           {String} Where to put the msg div in target div.
    * @param msg
    *           {Object} The message you want to show.
    * @param type
    *           {String} The message type. { "ERROR", "WARNING", "INFO",
    *           "SUCCESS" }
    * @param canClose
    *           {String} Whether the box can be closed.
    */
   MessageBoxUtil.info = function(args, targetID) {
      MessageBoxUtil.displayMessage(getArgs(args, {
         type : "INFO"
      }), targetID);
   };

   /**
    * Shorthand for displayMessage with args.type = "ERROR"
    * 
    * @memberof lconn.core.util.MessageBox
    * @function error
    * @param targetID
    *           {String} Where the message div will be placed.
    * @param msgID
    *           {String} The message div ID that you want to create, for
    *           creating different widget.
    * @param location
    *           {String} Where to put the msg div in target div.
    * @param msg
    *           {Object} The message you want to show.
    * @param type
    *           {String} The message type. { "ERROR", "WARNING", "INFO",
    *           "SUCCESS" }
    * @param canClose
    *           {String} Whether the box can be closed.
    */
   MessageBoxUtil.error = function(args, targetID) {
      MessageBoxUtil.displayMessage(getArgs(args, {
         type : "ERROR"
      }), targetID);
   };

   /**
    * Shorthand for displayMessage with args.type = "SUCCESS"
    * 
    * @memberof lconn.core.util.MessageBox
    * @function success
    * @param targetID
    *           {String} Where the message div will be placed.
    * @param msgID
    *           {String} The message div ID that you want to create, for
    *           creating different widget.
    * @param location
    *           {String} Where to put the msg div in target div.
    * @param msg
    *           {Object} The message you want to show.
    * @param type
    *           {String} The message type. { "ERROR", "WARNING", "INFO",
    *           "SUCCESS" }
    * @param canClose
    *           {String} Whether the box can be closed.
    */
   MessageBoxUtil.success = function(args, targetID) {
      MessageBoxUtil.displayMessage(getArgs(args, {
         type : "SUCCESS"
      }), targetID);
   };

   /**
    * Shorthand for displayMessage with args.type = "WARNING"
    * 
    * @memberof lconn.core.util.MessageBox
    * @function warning
    * @param targetID
    *           {String} Where the message div will be placed.
    * @param msgID
    *           {String} The message div ID that you want to create, for
    *           creating different widget.
    * @param location
    *           {String} Where to put the msg div in target div.
    * @param msg
    *           {Object} The message you want to show.
    * @param type
    *           {String} The message type. { "ERROR", "WARNING", "INFO",
    *           "SUCCESS" }
    * @param canClose
    *           {String} Whether the box can be closed.
    */
   MessageBoxUtil.warning = function(args, targetID) {
      MessageBoxUtil.displayMessage(getArgs(args, {
         type : "WARNING"
      }), targetID);
   };

}(dojo, dojo, dojo, dijit, lconn.core.util.MessageBox, com.ibm.oneui.controls.MessageBox, lconn.core.Res));
