/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.DiscussThisComment");

dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("dojo.io.iframe");
dojo.require('lconn.core.util.dojoPatches');
dojo.require("lconn.core.config.properties");
dojo.require("lconn.bookmarklet.Res");
dojo.requireLocalization("lconn.bookmarklet", "strings");
dojo.requireLocalization("lconn.core", "strings");

dojo.declare("lconn.bookmarklet.DiscussThisComment", null,{
	node:null,
	textBox:null,
	forumContext: null, // pass on in init
	isExternalUser: null, // pass on in init
	isMemberOfURL: "/ajax/isMemberOf",
	memberAuthCheck: "/ajax/checkMemberAuth",
	mentions:[],
	authMentions:[],
	unAuthMentions:[],
	messageTypes: {
	    ERROR: 0,
	    WARNING: 1,
	    INFO: 2,
	    CONFIRM: 3
	},
	
	
	constructor: function(args) {
        dojo.mixin(this, args);
        dojo.mixin(this, {message:dojo.i18n.getLocalization('lconn.bookmarklet', 'strings')});
        if(this.node ==  null)
    		this.node = dojo.byId("comment");
    	
    	if(this.textBox == null){
    		var options = {
    			shadowText: "",
				useRTE: lconn.core.config.properties["com.ibm.lcTextArea.widgets.Basictextbox.ckeditorlite.enabled"] === "true"
			};
    		
    		var useCKEditor = options.useRTE || lconn.core.config.features("ckeditor-lite-mentions");
    		if(useCKEditor){
    			var divForCKEditor = dojo.create("div",{"rows":2});
    			dojo.place(divForCKEditor, this.node, 'after');
    			dojo.addClass(this.node ,"lotusHidden");
    			this.node = divForCKEditor;
    		}
    		
    		this.textBox = new lconn.core.lcTextArea.widgets.BasicTextBox(options, this.node);
    		if(useCKEditor){
        		dojo.subscribe("lconn/microblogging/mention/completed", dojo.hitch(this, this.handleMention));
    		}
    		this.textBox.addMentionsCallback("onRemoveMention", dojo.hitch(this, this.handleMention));
    		//defect 143423: Discuss This Comment area shows bigger than frame
    		if(this.textBox.textAreaNode){
	    		if(this.textBox.textAreaNode.parentNode){
	    			dojo.removeClass(this.textBox.textAreaNode.parentNode,"lotusFieldEmphasis");}
	    		dojo.addClass(this.textBox.textAreaNode, "lotusFieldEmphasis");
    		}
    	}
    	
    	dojo.subscribe("lconn/core/mentions/stopTrack", dojo.hitch(this, this.handleMention));
    	
    	if(this.isExternalUser)
    		dojo.subscribe("lconn/core/mentions/started", function(mention) { mention.cancel(); });
    },
    
    getMentions: function() {
    	return this.textBox.getMentions();
    },
    
    getContent: function(){
//    	return this.textBox.textAreaNode.innerHTML;
    	return this.textBox.getValue();
    },
    
    getBasicTextBox: function(){
    	return this.textBox;
    },
    handleMention:function(){
    	var forumId = dojo.byId("parentId").value;
    	this.mentions=[];
    	if (forumId && forumId !=""){
    		var ms = this.textBox.getMentions();
    		var i = 0;
    		for(i = 0 ;i < ms.length; i++){
    			var mention =ms[i];
    			if(typeof mention=='object' && typeof mention!='string'){
    				this.mentions.push(mention.getUserId());
    			}
    		}
    		
    		dojo.xhrPost({
                url: this.forumContext + this.memberAuthCheck,
                headers: {'X-Update-Nonce': 'true'},
                content: {  forumUuid:forumId,
                			memberExIds:this.mentions
                		  },
                load: dojo.hitch(this, 'load'),
                handleAs: 'json'
            });
    			
    	}
    },
    
   load: function(response, ioArgs){
	   var items = response.items;
	   var i = 0;
	   this.authMentions =[];
	   this.unAuthMentions = [];
	   for(i=0; i< items.length; i++){
		   this.authMentions.push(items[i].userid);
	   }
	   for(i=0; i<this.mentions.length;i++){
		   var extId = this.mentions[i];
		   if(dojo.indexOf(this.authMentions, extId) < 0)
			   this.unAuthMentions.push(extId);
	   }
	   
	   var warningNames = this.removeSymbols(this.unAuthMentions);
	   var warningMsg = this.message.mentionAuthForumWarning;
	   
	   var warningNameUl = dojo.create("ul");
	   for(i=0; i<warningNames.length;i++){
		   warningNameUl.appendChild(dojo.create("li", {innerHTML: warningNames[i]}));
	   }
	   
	  if(warningNames.length > 0){
		  var warning = dojo.create("textNode", {innerHTML: warningMsg});
		  warning.appendChild(warningNameUl);
		  this.setMessage(this.messageTypes.WARNING, warning);
	  }else{
		  this.clearMessage();
	  }
	    
   },
   
   removeSymbols: function(mentions){
	   var ms = this.textBox.getMentions();
	   var names = [];
	   var i =0;
	   for(i = 0 ;i < ms.length; i++){
			var mention =ms[i];
			if(typeof mention=='object' && typeof mention!='string'){
				if(dojo.indexOf(mentions, mention.getUserId()) != -1){
					if(dojo.indexOf(names, mention.value) < 0){
						names.push(mention.value);
					}
					mention.removeSymbol();
				}else{
					mention.addSymbol();
				}
			}
		}
	   return names;
   },
   clearMessage: function(rootNode){
	   var root=rootNode;
	   var node;
	   var temps = dojo.query(".lotusMessage2", root);
       if ( temps && temps.length > 0 || dojo.hasClass(root,"lotusMessage2")){ 
           node = (temps && temps.length > 0) ? temps[0] : root;// rootNode itself may be a message node
           node.innerHTML='';
           dojo.addClass(node,"lotusHidden");
       }
   },
   setMessage: function(messageType, message, rootNode){
       var node;
       var root = rootNode;
       var icon, iconAlt, textAlt;
       
       var blankGif = dojo.config.blankGif || dijit._Widget.prototype._blankGif;
       var rs = dojo.i18n.getLocalization('lconn.core', 'strings');
       var temps = dojo.query(".lotusMessage2", root);
       if ( temps && temps.length > 0 || dojo.hasClass(root,"lotusMessage2")){ 
           node = (temps && temps.length > 0) ? temps[0] : root;// rootNode itself may be a message node
           node.innerHTML='';

           switch(messageType) {
               case this.messageTypes.ERROR:
                   node.className = 'lotusMessage2';
                   icon = 'lotusIcon lotusIconMsgError'; 
                   iconAlt =this.message.error;
                   textAlt = this.message.errorColon;
                   break;
               case this.messageTypes.WARNING:
                   node.className = 'lotusMessage2 lotusWarning';
                   icon = 'lotusIcon lotusIconMsgWarning';
                   iconAlt = this.message.warning;
                   textAlt = this.message.warningColon;
                   break;
               case this.messageTypes.INFO:
                   node.className = 'lotusMessage2 lotusInfo';
                   icon = 'lotusIcon lotusIconMsgInfo';
                   iconAlt = this.message.information;
                   textAlt = this.message.informationColon;
                   break;
               default:
                   node.className = 'lotusMessage2 lotusSuccess';
                   icon = 'lotusIcon lotusIconMsgSuccess';
                   iconAlt = this.message.success;
                   textAlt = this.message.successColon;
           }
           var iconNode = dojo.create('img',{'src':blankGif, 'class':icon, 'alt':iconAlt});
           var spanNode = dojo.create('span',{'class':'lotusAltText', 'innerHTML':textAlt});
           var messNode = dojo.create('div',{'class':'lotusMessageBody'});
           if ( message && typeof message == 'string') 
           	messNode.appendChild(document.createTextNode(message));
           else 
           	messNode.appendChild(message);
           
           node.appendChild(iconNode);
           node.appendChild(spanNode);
           node.appendChild(messNode);
           
           if(this.messageTypes.ERROR != messageType){
               var delButton = dojo.create("a",{'href':'javascript:void(0);', 
               								 'role':'button', 
               								 'title':rs.rs_close,
               								 'class':'lotusDelete'
               						    });
               dojo.connect(delButton,'onclick', function(evt){
               	node.className='lotusMessage2 lotusHidden';
               	node.innerHTML='';
               	
               } );
               var delIconNode = dojo.create('img',{'src':blankGif, 'alt':rs.rs_close});
               var delSpanNode = dojo.create('span',{'class':'lotusAltText', 'innerHTML':'X'});
               delButton.appendChild(delIconNode);
               delButton.appendChild(delSpanNode);
               
               node.appendChild(delButton);
           }
       }
   }
    
});


