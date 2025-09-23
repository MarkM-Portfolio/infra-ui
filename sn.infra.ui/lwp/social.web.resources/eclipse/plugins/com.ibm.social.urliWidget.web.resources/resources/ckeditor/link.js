/* Copyright IBM Coshrp. 2011, 2015  All Rights Reserved.              */

define([ "dojo",
         "dojo/i18n",
         "dojo/i18n!ic-extension-box/community/nls/app",
         "lconn.box/util/filepicker",
         "lconn.core/ckeditor"
        ],
function(dj, dji18n, dji18nApp, boxFilePicker,ckeditor) {
   
   var linkfrombox = {
         
      _nls : dji18nApp,
   
      _name : "linkfrombox",
      
      addPlugin : function(opts){

         if(!opts || !opts.menus || opts.toolbar === "Large"){
           return;
        }  
        if (dj.exists("menus.link.commands", opts) && opts.menus.link.commands.indexOf("linkfrombox") === -1) {
           opts.menus.link.commands.push('linkfrombox');
        }

        ckeditor.addExtraPlugin(this.getName(), opts);
        
         if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered && CKEDITOR.plugins.registered[this._name])
           return; 

        this._addPlugin(opts);

        CKEDITOR.on("instanceLoaded", function(evt) {
           console.debug("[linkfrombox] instanceLoaded is received");

           // Disable 'linkfrombox' by default
           var commands = [];
           if (dj.exists("editor.config.menus.link.commands", evt)) {
              commands = evt.editor.config.menus.link.commands;
           }

           var index = commands.indexOf("linkfrombox");
           if (index != -1) {
               commands.splice(index, 1);
           }
           var appName = evt.editor.name;
           lconn.core.util.services.isEnabled("box").then(function(appName, result) {
              if(result && appName !== "addCommunityDescription") {
                 var community = dj.getObject("lconn.communities.bizCard.core.community");
                  if (community) {
                    commands.push("linkfrombox");
                  }
                  else {
                     dj.subscribe("lconn/communities/bizcard/community/set", function() {
                        commands.push("linkfrombox");
                     }.bind(this))
                  }
              }
              else {
                 console.debug("[linkfrombox] is disabled")
              }
           }.bind(this, appName))
        }.bind(this));
     },
      
      _addPlugin : function(opts) {
         
      	 var webresources = lconn.core.config.services.webresources; 
    	 var wrUri = webresources.secureEnabled ? webresources.secureUrl : webresources.url;

    	 if (dojo.exists("skin.addIcon", CKEDITOR))
            CKEDITOR.skin.addIcon('linkfrombox', wrUri + '/web/lconn.box/img/Box_16.svg');

         CKEDITOR.on('instanceCreated',function (evt){
            evt.editor.on('langLoaded', function(evt){
               CKEDITOR.skin.icons['linkfrombox'].path = wrUri + '/web/lconn.box/img/Box_16.svg';
            });      
         });
         
         CKEDITOR.plugins.add(this._name, {
            icons:'linkfrombox',
            
            init: function(editor) {
               
               if(!editor){
                  console.warn("editor is wrong");
                  return;
               }
           	   var webresources = lconn.core.config.services.webresources; 
        	   var wrUri = webresources.secureEnabled ? webresources.secureUrl : webresources.url;

               var el = document.getElementsByTagName('html')[0];
               if( el && el.dir === "rtl"){
                  editor.addContentsCss( wrUri + '/web/lconn.box/css/ckeditorRTL.css');
               
               }
               else {
                  editor.addContentsCss( wrUri + '/web/lconn.box/css/ckeditor.css');
               }
               
               editor._linkFilepicker = new boxFilePicker({

                  success : function(response) {
                     
                     if(!response){
                        console.warn("the response from boxselect is wrong");
                        return;
                     }
                     
                     for (var i = 0; i < response.length; i++) {
                        if(!response[i].url || !response[i].name){
                           continue;
                        }
                        this.insertToCKEditor(editor, response[i].name, response[i].url, response[i].type);
                     }
                  }.bind(this),
                  
                  clientId : 'pttmlzu911ctqzi20r6lfrkbe8em6xy7'
               })

               editor.ui.addButton('linkfrombox', {

                  label : this._nls.rs_linkfrombox_label,
                  command : 'linkfrombox'
               });

               editor.addCommand('linkfrombox', {
                  
                  exec : function(editor) {
                     try {
                        editor._linkFilepicker.open();
                     } catch (e) {
                        console.log(e);
                     }
                  }.bind(this)
               });
            }.bind(this)
         });
      },

      getName : function() {
         return this._name;
      },

      _getExtension : function(name) {
         return lconn.share.util.text.getExtension(name);
      },

      insertToCKEditor : function(editor, name, url, type) {
         var doc = editor.document;
         var spanBox = new CKEDITOR.dom.element('span', doc);
         spanBox.setAttribute("contenteditable", "false");
         spanBox.setAttribute("class", "lconnFileLinkContainer  lconnBoxFileLinkContainer");

            // Add icon
            var spanImg = new CKEDITOR.dom.element('span', doc);
            spanImg.setAttribute("class", "iconSpan");

               var img = new CKEDITOR.dom.element('img', doc);
               img.setAttribute("src", dojo.config.blankGif);
               img.setAttribute("aria-hidden", "true");
                  if(type === "folder"){
                     img.setAttribute("class", "lconnFileLinkIcon lconn-ftype32 ftype32_folder");
                  }
                  else {
                     img.setAttribute("class", "lconnFileLinkIcon lconn-ftype32 lconn-ftype32-" + this._getExtension(name));
                  }

               img.appendTo(spanImg);
            spanImg.appendTo(spanBox);
               
            // Add name
            var spanA = new CKEDITOR.dom.element('span', doc);
            spanA.setAttribute("class", "linkNameSpan");
               var aName = new CKEDITOR.dom.element('a', doc);
               aName.setAttribute("href", url);
               aName.setAttribute("target", "_blank");
			   aName.setAttribute("rel", "nofollow noopener noreferrer");
               aName.setAttribute("title", lconn.core.util.html.formatFilename(name));
               var txt = new CKEDITOR.dom.text(lconn.core.util.html.formatFilename(name), doc);
               txt.appendTo(aName);
               aName.appendTo(spanA);
            spanA.appendTo(spanBox);
            
         editor.insertElement(spanBox);
      }
   }

   return linkfrombox;

})
