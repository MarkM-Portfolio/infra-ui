/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/declare",
   "dojo/dom-style",
   "dojo/dom-construct",
   "dojo/dom",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/i18n!ic-extension-box/community/nls/app",
   "dojo/dom-attr",
   "dojo/string",
   "ic-ui/MessageBox",
   "dojo/text!ic-extension-box/img/Box_16.svg"
], function (djDeclare, djDomStyle, djDomConstruct, djDom, djOn, djLang, i18nApp, djDomAttr, djString, MessageBox, boxSvg) {

   return djDeclare(null, {
      nls: null,
      
      constructor: function(opts) {
         this.inherited(arguments);

         this.nls = i18nApp;
         this._app = opts.app;
         this._rootDomNode = this._app._rootDom;
         this.contentContainer = djDom.byId("content_containter");
         this.firstConfigContainer = djDom.byId("first_config_container");
         this.updateConfigContainer = djDom.byId("update_config_container");
         this.footerContainer = djDom.byId("footer_container");
         this.msgContainer = djDom.byId("msg_container");
         this.msgBoxes = {};
      },

      buildRendering: function(opt) {
         var context = this._app.getContext();
         var widgetMode = context.mode;
         var containerScene = context.container.scene;
         
         djDomConstruct.empty(this.msgContainer);

         if ("view" == widgetMode || "fullpage" == widgetMode) {
            if (!context.widgetAttributes.contentURL || context.widgetAttributes.contentURL.length == 0) {  
               this.hideUpdateConfigPane();
               this.hideFooter();
               this.hideContentPane();

               this.renderFirstConfigPane();
            }
            else {
               if ("view" == widgetMode)
                  this._setHeight(context.widgetAttributes.height || "400px");

               this.hideFirstConfigPane();
               this.hideUpdateConfigPane();
               this.hideFooter();
               
               
               this.renderContentPane();
            }
         }
         else if ("edit" == widgetMode) {            
            this._setHeight(context.widgetAttributes.height || "400px");

            if (!context.widgetAttributes.contentURL || context.widgetAttributes.contentURL.length == 0) {  
               this.hideUpdateConfigPane();
               this.hideContentPane();

               this.renderFirstConfigPane();
            }
            else {
               this.hideFirstConfigPane();
               this.hideContentPane();
               
               this.renderUpdateConfigPane();
            }

            if ("editpage" == containerScene) {
               this.renderFooter();
            }
            else {
               this.hideFooter();
            }
         }
      },
      
      renderFileNotSupportMessage: function() {
         djDomConstruct.empty(this.msgContainer);
         
         if (this.msgBoxes.wrongSelection)
            delete this.msgBoxes.wrongSelection;
         
         var msg = djString.substitute(this.nls.FILE_NOT_SUPPORTED); 
         this.msgBoxes.wrongSelection = new MessageBox({
            canClose: true,
            _strings: {
               icon_alt: "Error",
               a11y_label: "Error:",
               close_btn_title: "Close",
               close_btn_alt: "Close"
           },
           type: MessageBox.TYPE.ERROR,
           msg: msg
        }, this.msgContainer);
      }, 
      
      renderContentPane: function() {
         djDomStyle.set(this.contentContainer, "display", "");

         var iframe = this._getOrCreateIframe(this._app.getContext().widgetAttributes.contentURL); 
         
         this.contentContainer.appendChild(iframe);
      },
      
      hideContentPane: function() {
         djDomStyle.set(this.contentContainer, "display", "none");
      },

      hideFirstConfigPane: function() {
         djDomStyle.set(this.firstConfigContainer, "display", "none");
      },
      
      renderFirstConfigPane: function() {
         djDomConstruct.empty(this.firstConfigContainer);
         djDomStyle.set(this.firstConfigContainer, "display", "");

         //show icon and msg
         var d = document;

         var table = d.createElement("table");
            table.className = "lotusTable";
            table.cellPadding = table.cellPadding = 0;

            var colgroup = d.createElement("colgroup");
               var col = d.createElement("col");
               col.width = "35px";
               colgroup.appendChild(col);
               
               col = d.createElement("col");
               col.width = "100%";
               colgroup.appendChild(col);
                  
            table.appendChild(colgroup);

            var tbody = d.createElement("tbody");
               // First row, showing information
               var tr = d.createElement("tr");
               tr.className = "lotusFirst";

                  var td = d.createElement("td");
                     td.className = "lotusFirstCell";
                     djDomStyle.set(td, "width", "20px");
                     
                     this._createBoxIcon(d, td);

                  tr.appendChild(td);
               
                  var td = d.createElement("td");
                     var div = d.createElement("div");
                        div.innerHTML = this.nls.BOX_ADD_FOLDER_TO_COMMUNITY;
                     td.appendChild(div);
                  tr.appendChild(td);
               tbody.appendChild(tr);
               
               // Second row, showing setup link
               if (this._isUserLoggedIn() && this._canUserPersonalize()) {
                  var tr = d.createElement("tr");
                     tr.className = "lotusFirst";
                    
                     var td = d.createElement("td");
                        td.className = "lotusFirstCell";
                        djDomAttr.set(td, "colspan", "2");
                         
                        this._createOpenBoxPickerAction(d, td, {
                           label: this.nls.BOX_SELECT_FOLDER, 
                           clickHandler: djLang.hitch(this._app, "chooseFolder", {sourceId: this.firstConfigContainer.id})
                        });
                     tr.appendChild(td);
                   tbody.appendChild(tr);                 
               }
      
            table.appendChild(tbody);           

          this.firstConfigContainer.appendChild(table);
      },
      
      hideUpdateConfigPane: function() {
         djDomStyle.set(this.updateConfigContainer, "display", "none");
      },
      
      renderUpdateConfigPane: function() {
         djDomConstruct.empty(this.updateConfigContainer);
         djDomStyle.set(this.updateConfigContainer, "display", "");

         var d = document;
         var context = this._app.getContext();
         var table = d.createElement("table");
            table.className = "lotusTable";
            table.cellPadding = table.cellPadding = 0;
   
            var colgroup = d.createElement("colgroup");
               var col = d.createElement("col");
                  col.width = "35px";
               colgroup.appendChild(col);
            
               col = d.createElement("col");
                  col.width = "100%";
               colgroup.appendChild(col);
           table.appendChild(colgroup);
   
           var tbody = d.createElement("tbody");
              // First row, showing current folder. 
              var tr = d.createElement("tr");
                 tr.className = "lotusFirst";
                 
                 var td = d.createElement("td");
                    td.className = "lotusFirstCell";
                    djDomStyle.set(td, "width", "20px");

                    this._createBoxIcon(d, td);
                 tr.appendChild(td);               

                 var td = d.createElement("td");
                    var div = d.createElement("div");
                       var name = context.widgetAttributes.contentName || "";
                       div.innerHTML = djString.substitute(this.nls.CURRENT_FOLDER, [name]); 
                    td.appendChild(div);
                 tr.appendChild(td);
              tbody.appendChild(tr);
              
              // Second row, showing box select link
              var tr = d.createElement("tr");
                 tr.className = "lotusFirst";
                   
                 var td = d.createElement("td");
                    td.className = "lotusFirstCell";
                    djDomAttr.set(td, "colspan", "2");
                         
                    this._createOpenBoxPickerAction(d, td, {
                       label: this.nls.BOX_SELECT_DIFFERENT_FOLDER, 
                       clickHandler: djLang.hitch(this._app, "chooseFolder", {sourceId: this.updateConfigContainer.id })
                    });
                 tr.appendChild(td);
    
              tbody.appendChild(tr);                 
 
           table.appendChild(tbody);
            
          this.updateConfigContainer.appendChild(table);
      },
      
      hideFooter: function() {
         djDomStyle.set(this.footerContainer, "display", "none");
      },
      
      renderFooter: function() {
         djDomConstruct.empty(this.footerContainer);
         djDomStyle.set(this.footerContainer, "display", "");
         
         var d = document;
         var context = this._app.getContext();
         var url = context.container.url || "";

         var input = d.createElement("input");
            input.id = "btnDone";
            input.className = "lotusBtn";
            input.type = "button";
            input.value = this.nls.BOX_DONE;
         
            djOn(input, "click", djLang.hitch(this._app, "onEditDone"));
         
         this.footerContainer.appendChild(input);
      },
      
      _createBoxIcon: function(d, parentNode) {
         var img = d.createElement("div");
            img.innerHTML = boxSvg;
         parentNode.appendChild(img);
         
         return img;
      },
      
      _createOpenBoxPickerAction: function(d, parentNode, opt) {
         var a = d.createElement("a");
            a.className = "lotusAction";
            a.id = "btnSelectFolder";
            a.href = "javascript:;"
            a.innerHTML = (opt && opt.label) ? opt.label : "";
          
            if (opt && opt.clickHandler)
               djOn(a, "click", opt.clickHandler); // TODO clickHandler should take parameter indicating the source of action.
            
            djDomAttr.set(a, "role", "button");
         parentNode.appendChild(a);
         
         return a;
      }, 
      
      _getOrCreateIframe: function(contentUrl) {
         if (this.contentIframe) {
            this.contentIframe.src = this._app.convertUrlToEmbedUrl(contentUrl); 
            djDomStyle.set(this.contentIframe, "display", "");
           
            return this.contentIframe;
         }
         
         var iframe = this.contentIframe = document.createElement("iframe");
            iframe.src = this._app.convertUrlToEmbedUrl(contentUrl); 
            iframe.id = "contentiframe";
            iframe.width="100%";
            iframe.height="100%";
            
            djDomAttr.set(iframe, "allowfullscreen", "");
            djDomAttr.set(iframe, "webkitallowfullscreen", "");
            djDomAttr.set(iframe, "mozallowfullscreen", "");
            djDomAttr.set(iframe, "msallowfullscreen", "");
         
         return iframe;
      },
      
      _isUserLoggedIn: function() {
         var context = this._app.getContext();

         var notLogin = context.user["logged-in"] == "false";
         
         return !notLogin;
      },
      
      _canUserPersonalize: function() {
         var context = this._app.getContext();

         return context.user["canPersonalize"] == "true";
      },
      
      _setHeight: function(heightValue) {
         var mainElem = this._rootDomNode; 
         if (heightValue) {
             djDomStyle.set(mainElem, "height", heightValue);
             this._app.setWidgetHeight("height", heightValue);
         }
         else {
             djDomStyle.set(mainElem, "height", "");
             this._app.setWidgetHeight("height", "");
         }            
      }
   });
});