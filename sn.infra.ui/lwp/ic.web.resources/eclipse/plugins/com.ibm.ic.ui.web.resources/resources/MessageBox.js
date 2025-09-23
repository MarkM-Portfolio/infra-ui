/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/dom-construct", // domConstruct.create, domConstruct.place
   "dojo/i18n",
   "dojo/_base/lang", // lang.mixin, lang.partial, lang.isFunction, lang.isString
   "dojo/dom-class", // domClass.add, domClass.remove, domClass.toggle
   "dojo/_base/declare",
   "dojo/dom", // dom.byId
   "dojo/i18n!./nls/MessageBox",
   "dojo/_base/window", // windowModule.doc.createTextNode
   "dojo/text!./templates/MessageBox.html",
   "dojo/topic",
   "dijit/registry", // registry.getUniqueId
   "dijit/_Templated",
   "dijit/_Widget"
], function (dojo, domConstruct, i18n, lang, domClass, declare, dom, messages, windowModule, template, topic, registry, _Templated, _Widget) {

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
    * and publishes a topic <code>ic-ui/message/closed</code> passing itself as argument.
    *
    * <h3>Examples</h3>
    *
    * <h4>Simple error message</h4>
    *
    * <pre>
    * require(['ic-ui/MessageBox'], function(MessageBox) {
    *    new MessageBox({
    *       _strings: {
    *          icon_alt: "Error",
    *          a11y_label: "Error:"
    *       },
    *       type: MessageBox.TYPE.ERROR,
    *       msg: "An error occurred. You can't dismiss me so easily."
    *    }, node1);
    * });
    * </pre>
    *
    * <h4>Dismissable success message</h4>
    *
    * <pre>
    * require(['ic-ui/MessageBox'], function(MessageBox) {
    *    new MessageBox({
    *       canClose: true,
    *       _strings: {
    *          icon_alt: "Success",
    *          a11y_label: "Success:",
    *          close_btn_title: "Close",
    *          close_btn_alt: "Close"
    *       },
    *       type: MessageBox.TYPE.SUCCESS,
    *       msg: "Everybody loves success messages. You will hardly dismiss me.",
    *       focusPostClose: nodeToFocusAfterCloseForA11y
    *    }, node2);
    * });
    * </pre>
    *
    * <h4>Warning message with Show More</h4>
    *
    * <pre>
    * require(['ic-ui/MessageBox'], function(MessageBox) {
    *    new MessageBox({
    *       _strings: {
    *          icon_alt: "Warning",
    *          a11y_label: "Warning:"
    *       },
    *       type: MessageBox.TYPE.WARNING,
    *       msg: "It's a long story...",
    *       msgMore: "It's really a long long story!",
    *    }, node3);
    * });
    * </pre>
    *
    * @class ic-ui.MessageBox
    */

   /**
    * Emitted when a MessageBox widget is closed
    * @event ic-ui/message/closed
    */

   /**
    * @typedef MessageBoxType
    * @property {Number} ERROR Error message type
    * @property {Number} WARNING Warning message type
    * @property {Number} INFO Informational message type
    * @property {Number} SUCCESS Success message type
    * @property {Number} SHARED_EXTERNAL Shared externally message type for content shared with visitors
    */
   var _t = { ERROR: 0, WARNING: 1, INFO: 2, SUCCESS: 3, SHARED_EXTERNAL: 4 };

   /*
    * Reference markup:
    *
    * <div class="lotusMessage2" role="alert">
    *    <img class="lotusIcon lotusIconMsgError" src="${_blankGif}" alt="Error" />
    *    <span class="lotusAltText">Error:</span>
    *    <div class="lotusMessageBody">This is an error message. It is the default message type.</div>
    *    <a href="javascript:;" class="lotusDelete" role="button" title="Close">
    *       <img alt="Close" src="${_blankGif}" />
    *       <span class="lotusAltText">X</span>
    *    </a>
    * </div>
    */

   var MessageBox = declare("com.ibm.oneui.controls.MessageBox", [_Widget, _Templated], /** @lends ic-ui.MessageBox.prototype */ {

      /** Must be one of the constants from coreui.MessageBox.TYPE. Default is ERROR. */
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
      templateString: template,
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
                  this._strings = lang.mixin({}, this.messages[type], this._strings);
               }
            }
         }
         this._strings = lang.mixin({}, this.messages.common, this._strings);

         if (this.srcNodeRef && this.srcNodeRef.id) {
            // Generate an id for the widget if the original source node already had an id.
            // Do this to avoid that the id is duplicated to the synthesized srcNodeRef.
            registry.remove(this.id);
            this.id = registry.getUniqueId(this.declaredClass.replace(/\./g, "_"));
            registry.add(this);
         }

         this.srcNodeRef = domConstruct.create("div", {}, this.srcNodeRef); // adapt old API

         if (this.msgMore) {
            this.showMoreClass = "";
         }

         this.inherited(arguments);

         switch (this.type) {
            case _t.ERROR: domClass.add(this.imgNode, "lotusIconMsgError"); break;
            case _t.WARNING: domClass.add(this.imgNode, "lotusIconMsgWarning"); domClass.add(this.domNode, "lotusWarning"); break;
            case _t.INFO: domClass.add(this.imgNode, "lotusIconMsgInfo"); domClass.add(this.domNode, "lotusInfo"); break;
            case _t.SHARED_EXTERNAL: domClass.add(this.imgNode, "lconnIconMsgSharedExternal"); domClass.add(this.domNode, "lconnSharedExternal"); break;
            default: domClass.add(this.imgNode, "lotusIconMsgSuccess"); domClass.add(this.domNode, "lotusSuccess"); break;
         }

         if (this.msg) {
            var msgNode, m = this.msg, n = dom.byId(m);
            if (lang.isFunction(m)){
               msgNode = m.call(this, this.d || windowModule.doc);
            } else if (n && n.nodeType) { // Fixes a bug in dojo.byId returning everything that is not a string
               msgNode = n;
            } else if (lang.isString(m)) {
               msgNode = windowModule.doc.createTextNode(m);
            } else { // You should not get here
               console.warn('MessageBox: msg should be a string, a DOM node or an id of a DOM node, or a function returning a DOM node.');
               msgNode = dojo._toDom('<!-- No message -->');
            }
            domConstruct.place(msgNode, this.msgBody, "only");
         }

         // Setting the containerNode ensures destroyRecursive destroys the children
         this.containerNode = this.domNode;
      },
      /**
       * Performs post creation initialization
       */
      postCreate: function() {
         if (this.canClose) {
            domClass.remove(this.closeBtn, "lotusHidden");
            this.connect(this.closeBtn, "onclick", "close");
         }
      },
      /**
       * Closes this message box
       * @param {Event} [e] Event
       */
      close: function(e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         domClass.add(this.domNode, "lotusHidden");
         if (this.focusPostClose) {
            setTimeout(lang.partial(dijit.focus, this.focusPostClose), 100);
         }
         this.onClose();
      },
      /**
       * @fires ic-ui/message/closed
       */
      onClose: function() {
         topic.publish("ic-ui/message/closed", this);
         this.destroy();
      },
      /**
       * Handles the Show More / Show Less actions
       */
      showMoreLessClicked: function(){
         domClass.toggle(this.showMoreMessageNode, "lotusHidden");
         domClass.toggle(this.showMoreNode, "lotusHidden");
         domClass.toggle(this.showLessNode, "lotusHidden");
      }
   });

   // Add as class constant TYPE
   /**
    * @const TYPE
    * @type MessageBoxType
    * @memberof ic-ui.MessageBox
    */
   lang.mixin(MessageBox, {TYPE: _t});

   return MessageBox;
});
