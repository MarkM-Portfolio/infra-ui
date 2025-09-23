/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.MessageBox");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.registry");
dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.oneui.controls", "MessageBox");

/**
 * This class provides a handy widget that renders a OneUI message box.
 * <p>
 * Messages provide the user with information after performing an action.
 * The messages fall into four categories - error, warnings, informational and success.
 * The default message type is an error message. All messages may have an optional close icon.
 * <p>
 * Refer to the {@link http://rtpgsa.ibm.com/projects/o/oneui/development/OneUI_3.0.x_daily/docInternal/components/messages.htm|Internal OneUI Documentation}
 * for more details.
 * <p>
 * This widget offers a method implementors can connect() to in order to capture the close event, onClose(),
 * and publishes a topic <code>com/ibm/oneui/message/closed</code> passing itself as argument.
 * 
 * <h3>Examples</h3>
 * 
 * <h4>Simple error message</h4>
 * 
 * <pre>
 * new com.ibm.oneui.controls.MessageBox({
 *    _strings: {
 *       icon_alt: "Error",
 *       a11y_label: "Error:"
 *    },
 *    type: com.ibm.oneui.controls.MessageBox.TYPE.ERROR,
 *    msg: "An error occurred. You can't dismiss me so easily."
 * }, node1);
 * </pre>
 * 
 * <h4>Dismissable success message</h4>
 *
 * <pre>
 * new com.ibm.oneui.controls.MessageBox({
 *    canClose: true,
 *    _strings: {
 *       icon_alt: "Success",
 *       a11y_label: "Success:",
 *       close_btn_title: "Close",
 *       close_btn_alt: "Close"
 *    },
 *    type: com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS,
 *    msg: "Everybody loves success messages. You will hardly dismiss me.",
 *    focusPostClose: nodeToFocusAfterCloseForA11y
 * }, node2);
 * </pre>
 *
 * <h4>Warning message with Show More</h4>
 *
 * <pre>
 * new com.ibm.oneui.controls.MessageBox({
 *    _strings: {
 *       icon_alt: "Warning",
 *       a11y_label: "Warning:"
 *    },
 *    type: com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
 *    msg: "It's a long story...",
 *    msgMore: "It's really a long long story!",
 * }, node3);
 * </pre>
 *
 * @class com.ibm.oneui.controls.MessageBox
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @author David McMullin <dmcmulli@ie.ibm.com>
 */

/**
 * Emitted when a MessageBox widget is closed
 * @event com/ibm/oneui/message/closed
 */
(function(window, document) {

   /**
    * @typedef MessageBoxType
    * @property {Number} ERROR Error message type
    * @property {Number} WARNING Warning message type
    * @property {Number} INFO Informational message type
    * @property {Number} SUCCESS Success message type
    * @property {Number} SHARED_EXTERNAL Shared externally message type for content shared with visitors
    */
   var _t = { ERROR: 0, WARNING: 1, INFO: 2, SUCCESS: 3, SHARED_EXTERNAL: 4 };

   var messages = dojo.i18n.getLocalization("com.ibm.oneui.controls", "MessageBox");

   /* 
    * Reference markup:
    * 
    * <div class="lotusMessage2" role="alert">
    *    <img class="lotusIcon lotusIconMsgError" src="../../css_OneUI-3.0.3_20120503-0300/images/blank.gif" alt="Error" />
    *    <span class="lotusAltText">Error:</span>
    *    <div class="lotusMessageBody">This is an error message. It is the default message type.</div>
    *    <a href="javascript:;" class="lotusDelete" role="button" title="Close">
    *       <img alt="Close" src="../../css_OneUI-3.0.3_20120503-0300/images/blank.gif" />
    *       <span class="lotusAltText">X</span>
    *    </a>
    * </div>
    */
   
   dojo.declare("com.ibm.oneui.controls.MessageBox", [dijit._Widget, dijit._Templated], /** @lends com.ibm.oneui.controls.MessageBox.prototype */ {
      
      /** Must be one of the constants from com.ibm.oneui.controls.MessageBox.TYPE. Default is ERROR. */
      type: _t.ERROR,
      /** Set to true if the user should be able to dismiss this message box. Defaults to false. */
      canClose: false,
      /** 
       * Can be any of: 
       * <ol><li>A sentence displayed by this message box. Keep reasonably short.</li>
       * <li>A function that accepts document as its parameter, returns a node that will be appended in the message box as message.</li>
       * <li>A node representing a formatted message, e.g.:<pre>
       * &lt;div&gt;
       * &lt;p&gt;First line&lt;/p&gt;
       * &lt;p&gt;Second line&lt;/p&gt;
       * &lt;/div&gt;
       *
       * </pre> that will be displayed within the message box.</li></ol>
       */
      msg: "",
      /**
       * Optional string including extra information. If provided a show more/less link will be used to access it.
       * @type {String}
       */
      msgMore: "",
      /** @type {String} */
      showMoreClass: "lotusHidden",
      /** @type {Object} */
      messages: messages,
      /** Implementors MAY provide these strings */
      _strings: {
         /*
          icon_alt: "Alt text of message type icon, e.g. 'Error'",
          a11y_label: "Preamble for message, required for accessibility, e.g. 'Error:'",
          close_btn_title: "Tooltip of close button, e.g. 'Close'. Required only if canClose is true",
          close_btn_alt: "Alt text of close button icon, e.g. 'Close'. Required only if canClose is true"
         */
      },
      /** @type {String} */
      templatePath: dojo.moduleUrl("com.ibm.oneui", "controls/templates/MessageBox.html"),
      /** @type {Node} */
      msgBody: null,
      /** @type {Node} */
      closeBtn: null,
      /** @type {Node} */
      imgNode: null,
      /** @type {Node} */
      showMoreMessageNode: null,
      /** @type {Node} */
      showMoreNode: null,
      /** @type {Node} */
      showLessNode: null,
      /**
       * Set the focus back to caller, the dom node focusPostClose will get focus after the message is closed. 
       * Suggest to provide this node when canClose is true to comply with AVT
       * @type {Node}
       */
      focusPostClose: null,
      
      /**
       * Handles the Show More / Show Less actions
       */
      buildRendering: function() {
         // allow the caller to override any strings
         var type;
         for (type in _t) {
            if (_t.hasOwnProperty(type)) {
               if (this.type == _t[type]) {
                  this._strings = dojo.mixin({}, this.messages[type], this._strings);
               }
            }
         }
         this._strings = dojo.mixin({}, this.messages["common"], this._strings);

         if (this.srcNodeRef.id) {
            // Generate an id for the widget if the original source node already had an id.
            // Do this to avoid that the id is duplicated to the synthesized srcNodeRef.
            dijit.registry.remove(this.id);
            this.id = dijit.registry.getUniqueId(this.declaredClass.replace(/\./g, "_"));
            dijit.registry.add(this);
         }

         this.srcNodeRef = dojo.create("div", {}, this.srcNodeRef); // adapt old API

         if (this.msgMore) {
            this.showMoreClass = "";
         }

         this.inherited(arguments);
         
         switch (this.type) {
            case _t.ERROR: dojo.addClass(this.imgNode, "lotusIconMsgError"); break;
            case _t.WARNING: dojo.addClass(this.imgNode, "lotusIconMsgWarning"); dojo.addClass(this.domNode, "lotusWarning"); break;
            case _t.INFO: dojo.addClass(this.imgNode, "lotusIconMsgInfo"); dojo.addClass(this.domNode, "lotusInfo"); break;
            case _t.SHARED_EXTERNAL: dojo.addClass(this.imgNode, "lconnIconMsgSharedExternal"); dojo.addClass(this.domNode, "lconnSharedExternal"); break;
            default: dojo.addClass(this.imgNode, "lotusIconMsgSuccess"); dojo.addClass(this.domNode, "lotusSuccess"); break;
         }

         if (this.msg) {
            var msgNode, m = this.msg, n = dojo.byId(m);
            if (dojo.isFunction(m)){
               msgNode = m.call(this, this.d || dojo.doc);
            } else if (n && n.nodeType) { // Fixes a bug in dojo.byId returning everything that is not a string
               msgNode = n;
            } else if (dojo.isString(m)) {
               msgNode = dojo.doc.createTextNode(m);
            } else { // You should not get here
               console.warn('MessageBox: msg should be a string, a DOM node or an id of a DOM node, or a function returning a DOM node.');
               msgNode = dojo._toDom('<!-- No message -->');
            }
            dojo.place(msgNode, this.msgBody, "only");
         }

         // Setting the containerNode ensures destroyRecursive destroys the children
         this.containerNode = this.domNode;
      },
      /**
       * Performs post creation initialization
       */
      postCreate: function() {
         if (this.canClose) {
            dojo.removeClass(this.closeBtn, "lotusHidden");
            this.connect(this.closeBtn, "onclick", "close");
         }
      },
      /**
       * Closes this message box
       * @param {Event} [e] Event
       */
      close: function(e) {
         if (e) dojo.stopEvent(e);
         dojo.addClass(this.domNode, "lotusHidden");
         if (this.focusPostClose)
            setTimeout(dojo.partial(dijit.focus, this.focusPostClose), 100);
         this.onClose();
      },
      /**
       * @fires com/ibm/oneui/message/closed
       */
      onClose: function() {
         dojo.publish("com/ibm/oneui/message/closed", [this]);
         this.destroy();
      },
      /**
       * Handles the Show More / Show Less actions
       */
      showMoreLessClicked: function(){
         dojo.toggleClass(this.showMoreMessageNode, "lotusHidden");
         dojo.toggleClass(this.showMoreNode, "lotusHidden");
         dojo.toggleClass(this.showLessNode, "lotusHidden");
      }
   });
   
   // Add as class constant TYPE
   /**
    * @const TYPE
    * @type MessageBoxType
    * @memberof com.ibm.oneui.controls.MessageBox
    */
   dojo.mixin(com.ibm.oneui.controls.MessageBox, {TYPE: _t});
   
// Create a closure on window and document so we're safe in case custom code tampers with them
})(window, document);
