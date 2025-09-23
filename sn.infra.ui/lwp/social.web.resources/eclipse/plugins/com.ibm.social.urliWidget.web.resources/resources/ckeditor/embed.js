/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define(
      [ "dojo",
        "ic-ui/MessageBox",
        "dojo/i18n",
        "dojo/i18n!ic-extension-box/community/nls/app",
        "lconn.box/util/filepicker",
        "dojo/_base/url",
        "lconn.core/ckeditor",
        "dojo/dom-construct",
        "dojo/string",
        "dojo/dom"
        ],
function(dj, MessageBox, dji18n, dji18nApp, boxFilePicker, djurl, ckeditor, djDomConstruct, djString, djDom) {

   var boxembedpreview = {
      /*add menu named "MenuEmbedPreview" to ckeditor's insert group,
      and add command named "embedFromBox" to the menu.*/
         
      _nls : dji18nApp,
      
      _name : "boxembedpreview",
      
      msgBoxes : {},
      
      addPlugin : function(opts){

        this._addEmbedConfig(opts);

        ckeditor.addExtraPlugin(this.getName(), opts);
       
         if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered && CKEDITOR.plugins.registered[this._name])
           return; 

        this._addPlugin(opts);

        CKEDITOR.on("instanceLoaded", function(evt) {
           console.debug("[embedfrombox] instanceLoaded is received");

           // Disable 'embedfrombox' by default
           this._deleteEmbedConfig(evt.editor.config);
           var embedMenu = evt.editor.ui.get("MenuEmbedPreview");
           this._hideBoxMenu(embedMenu);
           lconn.core.util.services.isEnabled("box").then(function(embedMenu, result){
              if(result){
                 var community = dj.getObject("lconn.communities.bizCard.core.community");
                 if (community) {
                    this._showBoxMenu(embedMenu);
                    this._addEmbedConfig(evt.editor.config);
                 }
                 else {
                    dj.subscribe ("lconn/communities/bizcard/community/set", function(embedMenu) {
                       this._showBoxMenu(embedMenu);
                       this._addEmbedConfig(evt.editor.config);
                    }.bind(this, embedMenu))
                 }
              }else {
                 console.debug("[embedfrombox] is disabled");
              }
           }.bind(this, embedMenu))
        }.bind(this));
     },

     _showBoxMenu : function(embedMenu){
        if(dj.exists("_.id", embedMenu) && dj.byId(embedMenu._.id)){
           dj.byId(embedMenu._.id).style.display="block";
        }
     },
     
     _hideBoxMenu : function(embedMenu){
        if(dj.exists("_.id", embedMenu) && dj.byId(embedMenu._.id)){
           dj.byId(embedMenu._.id).style.display="none";
        }
     },
     
     _addEmbedConfig : function(config){

        if(!config || !config.menus || config.toolbar === "Large"){
           return;
        }  
        var toolbar;
        
        if (typeof config.toolbar === "string") {
           toolbar = config["toolbar_" + config.toolbar];
        } 
        else {
           toolbar = config.toolbar;
        }
        
        for (var i = 0; i < toolbar.length; i++) {

           if (toolbar[i].name === 'insert') {
              if(toolbar[i].items.indexOf("MenuEmbedPreview") === -1){
                 toolbar[i].items.push('MenuEmbedPreview');
              }
           }
        }
        
        if (dj.exists("menus.embedPreview.commands", config) && config.menus.embedPreview.commands.indexOf("embedfrombox") === -1) {
           config.menus.embedPreview.commands.push('embedfrombox');
        }
     },

     _deleteEmbedConfig : function(config){
        if(!config || !config.menus || config.toolbar === "Large"){
           return;
        }  
        var toolbar;
        
        if (typeof config.toolbar === "string") {
           toolbar = config["toolbar_" + config.toolbar];
        } 
        else {
           toolbar = config.toolbar;
        }
        
        for (var i = 0; i < toolbar.length; i++) {
           if (toolbar[i].name === 'insert') {
              var indexMenu = toolbar[i].items.indexOf("MenuEmbedPreview");
              if(indexMenu !== -1){
                toolbar[i].items.splice(indexMenu, 1);
              }
           }
        }
        var commands = [];
        if (dj.exists("menus.embedPreview.commands", config)) {
          commands = config.menus.embedPreview.commands;
        }

        var index = commands.indexOf("embedfrombox");
        if (index != -1){
           commands.splice(index, 1);
        }
     },

      _addPlugin : function(opts) {
         
         CKEDITOR.skin.addIcon('embedfrombox', '/connections/resources/web/lconn.box/img/Box_16.svg');

         CKEDITOR.on('instanceCreated',function (evt){
            evt.editor.on('langLoaded', function(evt){
               CKEDITOR.skin.icons['embedfrombox'].path = '/connections/resources/web/lconn.box/img/Box_16.svg';
            });      
         });
         
         CKEDITOR.plugins.add(this._name, {
            
            icons:'embedfrombox',
            
            init : function(editor) {
               
               if(!editor){
                  console.warn("editor is wrong");
                  return;
               }
               
               editor._embedFilepicker = new boxFilePicker({
                        success : function(response) {
                           
                           if(!response){
                              console.warn("the response from boxselect is wrong");
                              return;
                           }
                           
                           for (var i = 0; i < response.length; i++) {
                              if(!response[i].url){
                                 continue;
                              }

                              if (response[i].type != "file") {
                                 this._alertMessage();
                                 return;
                              } else {
                                 this.insertToCKEditor(editor,response[i].url);
                              }
                           }
                        }.bind(this),
                        
                        clientId : 'pttmlzu911ctqzi20r6lfrkbe8em6xy7'
                     })

               editor.ui.addButton('embedfrombox', {
                  label : this._nls.rs_embedFromBox_label,
                  command : 'embedfrombox'
               });

               editor.addCommand('embedfrombox', {

                  exec : function(editor) {
                     try {
                        editor._embedFilepicker.open();
                     } catch (e) {
                        console.warn(e);
                     }

                  }.bind(this)
               });
            }.bind(this)
         });
      },

      getName : function() {
         return this._name;
      },

      _alertMessage : function() {
         if(!dj.byId('embedWarnMessage')){
            var embedWarnMessage = document.createElement("div");
            embedWarnMessage.setAttribute("id","embedWarnMessage");
            var parent = dj.byId("lotusContent");
            if(parent){
              djDomConstruct.place(embedWarnMessage,parent,"first");
            }
          }
         
          this.msgContainer = djDom.byId("embedWarnMessage");
          djDomConstruct.empty(this.msgContainer);

          if (this.msgBoxes.wrongSelection)
            delete this.msgBoxes.wrongSelection;

          var msg = djString.substitute(this._nls.rs_embedfolder_message); 
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
          },this.msgContainer);
      },

      _formatUrl : function(url) {
         var uri = new djurl(url);
         
         var ret = uri.scheme + "://" + uri.host;
         ret = ret + "/embed" + uri.path;
         
         if(uri.query){
            ret = ret + "&theme=dark";
         }
         else{
            ret = ret + "?theme=dark";
         }
         
         return ret;
      },

      insertToCKEditor : function(editor, url) {
         var urlFormated = this._formatUrl(url);
         var el;
         var doc = editor.document;
         el = new CKEDITOR.dom.element('iframe', doc);
            el.setAttribute("src", urlFormated);
            el.setAttribute("class", "lconnEmbededPreview");
            el.setAttribute("allowfullscreen", "");
            el.setAttribute("webkitallowfullscreen", "");
            el.setAttribute("mozallowfullscreen", "");
            el.setAttribute("msallowfullscreen", "");

         editor.insertElement(el);
      }
   }

   return boxembedpreview;
})
