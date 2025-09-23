/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.sharebox.controls.GadgetContentPane");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.incontext.util.html");

dojo.declare("com.ibm.social.sharebox.controls.GadgetContentPane", [dijit.layout.ContentPane, dijit._Templated], {
   templatePath: dojo.moduleUrl("com.ibm.social.sharebox", "controls/templates/GadgetContentPane.html"),
   title: null,
   gadgetId: null,
   gadgetXmlUrl: null,
   actionId: null,
   isDirty: false,
   loadingGifUrl: null,
   blankGifUrl: null,
   // Make this a no-op
   _setContentAttr: function() {},

   createGadget: function(container, context, inline) {
     com.ibm.social.incontext.util.html.showLoading(this.loadingDiv);
      var renderParams = {width: "500px", height: "auto", userPrefs: context};
      var lang = dojo.attr(dojo.doc.documentElement, "lang");
      var dir = dojo.attr(dojo.doc.documentElement, "dir");
      var country = "";
      if (netJazzAjaxConfig){
         if (netJazzAjaxConfig.params && (netJazzAjaxConfig.params.length>1)) {
            var p = dojo.queryToObject(netJazzAjaxConfig.params);
            if (p.country)
               country = p.country;
            if (p.lang)
               lang = p.lang;
         }
      }
      
      if (dojo.config.isDebug) {
          dojo.mixin(renderParams.userPrefs, {"debug": "true" });
      }
      dojo.mixin(renderParams.userPrefs, {"loadingGifUrl": this.loadingGifUrl});
      dojo.mixin(renderParams.userPrefs, {"blankGifUrl": this.blankGifUrl});
      dojo.mixin(renderParams.userPrefs, {"highContrast": com.ibm.social.incontext.util.html.isHighContrast()});
      this.renderHandler = container.loadWidget({definitionUrl: this.gadgetXmlUrl,
          placement: this.gadgetNode,
          componentType: "gadget",
          instanceData: {
               renderType: (inline ? "inline" : "default"),
               renderParams: renderParams,
               viewParams: {
                   lang: lang,
                   country: country, 
                   dir: dir,
                   locale: dojo.locale
                },
                callback: dojo.hitch(this, function(inline) {
                 if(!inline) {
                    var iframes = dojo.query("iframe", this.domNode);
                    if(iframes.length > 0) {
                      //dojo.attr(iframes[0], "aria-live", "off");
                      dijit.setWaiRole(iframes[0], "presentation");
                    }
                    var resizeTopic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.gadgetNode.id, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
                    function publishResizeEvent() {
                       dojo.publish("com/ibm/social/sharebox/pane/resized");
                    }
                    dojo.subscribe(resizeTopic, publishResizeEvent);
                    dojo.connect(this, "onShow", null, publishResizeEvent);
                 }
                 this.hideLoading();
                }, inline)
          }});
   },
   hideLoading: function() {
     dojo.style(this.loadingDiv, "display", "none");
     dojo.style(this.gadgetDiv, "display", "");
   },
   
   getGadgetId: function() {
      return this.gadgetId;
   },
   destroy: function () {
      if (this.renderHandler) {
        this.renderHandler.unload();
          delete this.renderHandler;
      }
      this.inherited(arguments);
   }
});
