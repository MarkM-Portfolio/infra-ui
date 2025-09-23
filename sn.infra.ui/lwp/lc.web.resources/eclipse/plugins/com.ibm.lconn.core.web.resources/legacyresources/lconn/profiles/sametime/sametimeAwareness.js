/* Copyright IBM Corp. 2001, 2015  All Rights Reserved.              */

(function(){

dojo.provide("lconn.profiles.sametime.sametimeAwareness");
dojo.require("lconn.core.bizCard.bizCardUtils");

dojo.requireLocalization("lconn.profiles.bizCard", "ui");

dojo.require("lconn.core.util.html");

lconn.profiles.sametime.sametimeAwareness = {
   messages: dojo.i18n.getLocalization("lconn.profiles.bizCard", "ui"),

   elementId: null,
   sametimeServiceRootURL: "http://localhost:59449/stwebapi/",
   hcardServiceRootURL:null,
   isInited: false,
   profileSametimeAwarenessSet: false,
   bizCardSametimeAwarenessSet: false,
   inputType: "email",
   debug: false,
   
   _availableUsers: [],
   
	isEnabled: function() {
		return dojo.exists("sametimeAwarenessConfig") && (sametimeAwarenessConfig.secureUse || sametimeAwarenessConfig.unsecureUse);
	},

	isAvailable: function(username) {
		var ret = (this.isEnabled() && typeof sametime_invoke == "function");
		
		if (ret && username) {
			ret = !!(this._availableUsers[username]);
		}
		
		return ret;
	},

	openChat: function(target) {
		if (this.isAvailable(target)) {
			sametime_invoke('chat', target);
		}
	},
   
   initIMService: function(sametimeAwarenessConfig){
      if(sametimeAwarenessConfig.secureUse && sametimeAwarenessConfig.secureURL && sametimeAwarenessConfig.secureURL != ""){
         this.sametimeServiceRootURL = sametimeAwarenessConfig.secureURL;
      }else if(sametimeAwarenessConfig.unsecureUse && sametimeAwarenessConfig.unsecureUrl && sametimeAwarenessConfig.unsecureUrl != ""){
         this.sametimeServiceRootURL = sametimeAwarenessConfig.unsecureUrl;
      }
      
      if(sametimeAwarenessConfig.inputType != null)
         this.inputType = sametimeAwarenessConfig.inputType;
         
      this.isInited = true;
      
      if(typeof(Status) == "undefined") {
         lconn.core.bizCard.bizCardUtils.loadScript(this.sametimeServiceRootURL + "getStatusNonDojo.js");
         
         // NOTE: RTL version of main.css does not exist from the STWEBAPI, thus, we need to provide it from profiles
         // and just override those styles that affect horizontal direction.  See SPR#THSE7WBRET and SPR#THSE7WBR6X
         lconn.core.bizCard.bizCardUtils.loadCss(this.sametimeServiceRootURL + "main.css");
         if( typeof(profiles_isBidiRTL) != "undefined" && profiles_isBidiRTL ) { // load the profiles made sametime rtl css if we are in rtl bidi mode
            if( !this.hcardServiceRootURL ) this.hcardServiceRootURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
            if( this.hcardServiceRootURL && this.hcardServiceRootURL != "undefined")   lconn.core.bizCard.bizCardUtils.loadCss(this.hcardServiceRootURL + "/css/sametime/main_rtl.css");
         }
      }
   },
   
   initBizCardIMService: function(person){
      if(person.X_bizCardSecureSTAwareness && person.X_bizCardLocation && person.X_bizCardLocation.secure && person.X_bizCardLocation.secure != ""){
         this.sametimeServiceRootURL = person.X_bizCardLocation.secure;
      }else if(person.X_bizCardSTAwareness && person.X_bizCardLocation && person.X_bizCardLocation.unsecure && person.X_bizCardLocation.unsecure != ""){
         this.sametimeServiceRootURL = person.X_bizCardLocation.unsecure;
      }
      
      if(person.X_bizCardSTInputType != null)
         this.inputType = person.X_bizCardSTInputType;
      
      this.isInited = true;
      
      if(typeof(Status) == "undefined") {
         lconn.core.bizCard.bizCardUtils.loadScript(this.sametimeServiceRootURL + "getStatusNonDojo.js");
         // NOTE: RTL version of main.css does not exist from the STWEBAPI, thus, we need to provide it from profiles
         // and just override those styles that affect horizontal direction.  See SPR#THSE7WBRET and SPR#THSE7WBR6X
         lconn.core.bizCard.bizCardUtils.loadCss(this.sametimeServiceRootURL + "main.css");
         if( typeof(profiles_isBidiRTL) != "undefined" && profiles_isBidiRTL ) {  // load the profiles made sametime rtl css if we are in rtl bidi mode
            if( !this.hcardServiceRootURL ) this.hcardServiceRootURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
            if( this.hcardServiceRootURL && this.hcardServiceRootURL != "undefined") lconn.core.bizCard.bizCardUtils.loadCss(this.hcardServiceRootURL + "/css/sametime/main_rtl.css");
         }  
      }
   },
   
   loadProfilesIMStatus: function(applicationContext, displayedUser){
      var messages = this.messages;
      this.elementId = displayedUser.loadAwarenessInto;
      
      var userLookupKey = "";
      if(lconn.profiles.sametime.sametimeAwareness.inputType == "uid"){
         userLookupKey = displayedUser.uid;
      }else{
         userLookupKey = displayedUser.email;
      }
         
      if(this.debug) console.log("loadProfilesIMStatus: starting using " + lconn.profiles.sametime.sametimeAwareness.inputType);
      var url = lconn.profiles.sametime.sametimeAwareness.sametimeServiceRootURL + "getstatus/";
      url += userLookupKey + "?jsonp=lconn.profiles.sametime.sametimeAwareness.setSametimeStatus&time=" + new Date().getTime();
         
      var delaySametimeAwarenessLookup = function()
      {
         lconn.core.bizCard.bizCardUtils.loadScript(url);
         lconn.profiles.sametime.sametimeAwareness.pollSametimeStatus(url, "window.lconn.profiles.sametime.sametimeAwareness.profileSametimeAwarenessSet == true");
      };        
      
      var checkIfStatusLoaded = function()
      {
         var element = document.getElementById(lconn.profiles.sametime.sametimeAwareness.elementId);
         if(typeof(Status) == "undefined" || element.innerHTML.indexOf(messages.loadingSTStatus) != -1)
         {
            if(this.debug) console.log("checkIfStatusLoaded: asking st for status expired");
            element.innerHTML = messages.noStatuAvailable;
            element.className = "awareness offline"; //put the x beside the message
            //support older st clients
            if(typeof(getStatusImgUrl) != "undefined")   element.style.backgroundImage = "url(" + getStatusImgUrl("offline") + ")";
         }
      };
         
      setTimeout(checkIfStatusLoaded, 10000);   
      setTimeout(delaySametimeAwarenessLookup, 5000); 
   },
   
   pollSametimeStatus: function(urlToPoll, test){
      var stIntervalId = "";
      stIntervalId = setInterval(dojo.hitch(this, function() {     
         var newTime = new Date().getTime();
         if(window.Status == null || Status.getStyleForStatus == null)
            lconn.core.bizCard.bizCardUtils.loadScript(this.sametimeServiceRootURL + "getStatusNonDojo.js?time=" + newTime);
         if(urlToPoll)
         {
            if(this.debug) console.log("pollSametimeStatus: new url: " + urlToPoll + "&tempDate=" + newTime);
               lconn.core.bizCard.bizCardUtils.loadScript(urlToPoll + "&tempDate=" + newTime);
         }
      }),5000);
   },
   
   invokeSametimeAwareness: function (person) 
   {
      if(this.isInited != true){
            this.initBizCardIMService(person);
            
      }
      lconn.core.utilities.processUntilAvailable(dojo.hitch(this,this.invokeSametimeAwarenessForPerson), "window.Status != null", person, false /* do not throw if test clause not found */);
    },
   
   invokeSametimeAwarenessForPerson: function(person){
       
        var userKey = "";
         if(this.inputType == "uid"){
           userKey = person.uid;
         }else{
            userKey = person.email.internet;
         }   
         
       var url = this.sametimeServiceRootURL + "getstatus/";
         url += userKey + "?jsonp=lconn.profiles.sametime.sametimeAwareness.loadBizCardStatus&time=" + new Date().getTime();
         
          lconn.core.bizCard.bizCardUtils.loadScript(url);
         this.pollSametimeStatus(url, "window.lconn.profiles.sametime.sametimeAwareness.bizCardSametimeAwarenessSet == true");
       },
   
   setSametimeStatus: function(person){

      if(this.tried == null) this.tried = 0;
      if(person.status == 0 && this.tried < 5)
      {
         this.tried++;
         return;
      }
      this.tried = 0;
      
      var messages = this.messages;
      var currentDiv = document.getElementById(this.elementId);
      if(person.error != null  || person.statusMessage == null || person.statusMessage == "" ){
        if(this.debug) console.log("setSametimeStatus: no status");
         currentDiv.innerHTML = messages.noStatuAvailable;
         currentDiv.className = "awareness offline"; //put the x beside the message
         //support older st clients
         if(typeof(getStatusImgUrl) != "undefined")   currentDiv.style.backgroundImage = "url(" + getStatusImgUrl("offline") + ")";
		 
		 this._availableUsers[person.username] = false;
      }else{
         this.profileSametimeAwarenessSet = true;
       if(this.debug) console.log("setSametimeStatus: profileSametimeAwarenessSet set to true");
       if(window.Status == null)
              if(this.debug) console.log("setSametimeStatus: st code has not been loaded");
         if (currentDiv.getAttribute("className") != null) { //IE Status     
               try{
                  //support older st clients
                  if(typeof(getStatusImgUrl) != "undefined")   currentDiv.style.backgroundImage = "url(" + getStatusImgUrl(person.status) + ")";   
                  currentDiv.className = "awareness " + Status.getStyleForStatus(person.status);                        
				  currentDiv.onclick = function() { 
                        sametime_invoke("chat", person.username); 
                        };   
                  if(person.statusMessage != null && person.statusMessage != ""){  
                     currentDiv.title = person.statusMessage;
                     currentDiv.innerHTML =  "&nbsp;"+lconn.core.util.html.encodeHtml(person.statusMessage);
					 this._availableUsers[person.username] = true;
                  }else if(person.status != null && person.status > 0){  
                     currentDiv.title = "";
                     currentDiv.innerHTML =  "&nbsp;";
					 this._availableUsers[person.username] = true;
                  }else{
                     currentDiv.title = messages.noStatuAvailable;
                     currentDiv.innerHTML =  messages.noStatuAvailable;
					 this._availableUsers[person.username] = false;
                  }
            }catch(exception1){
              if(this.debug) console.log("setSametimeStatus: an error has occurred in st code loading.");
            }                 
            }
         else{
               //support older st clients
               if(typeof(getStatusImgUrl) != "undefined")   currentDiv.style.backgroundImage = "url(" + getStatusImgUrl(person.status) + ")";   
               currentDiv.setAttribute("class", "awareness " + Status.getStyleForStatus(person.status));
               currentDiv.setAttribute("onclick", "sametime_invoke('chat', '" + person.username + "');");
			   
               if(person.statusMessage != null && person.statusMessage != ""){
                  currentDiv.innerHTML =  "&nbsp;"+lconn.core.util.html.encodeHtml(person.statusMessage);
                  currentDiv.setAttribute("title", person.statusMessage);
				  this._availableUsers[person.username] = true;
               }else if(person.status != null && person.status > 0){ 
                  currentDiv.innerHTML =  "&nbsp;";
                  currentDiv.setAttribute("title", "");
				  this._availableUsers[person.username] = true;
               }else{
                  currentDiv.innerHTML =  messages.noStatuAvailable;
                  currentDiv.setAttribute("title", messages.noStatuAvailable);
				  this._availableUsers[person.username] = false;
            }
         }
      }
   },

   loadBizCardStatus: function(person) {
      if(this.tried == null) this.tried = 0;
      if(person.status == 0 && this.tried < 5) {
         this.tried++;
         return;
      }
      this.tried = 0;
      if(person.error != null || person.statusMessage == null || person.statusMessage == "" ){
         //do nothing
      }else{
         var element = document.getElementById(person.username+"vcardNameElem");
         this.bizCardSametimeAwarenessSet = true;
         if(element != null){
            element.className = " awareness " + Status.getStyleForStatus(person.status);
            element.setAttribute("userId",person.username);
            //support older st clients
            if(typeof(getStatusImgUrl) != "undefined")   element.style.backgroundImage = "url(" + getStatusImgUrl(person.status) + ")";      
            element.onclick = function() { 
               var userid = this.getAttribute("userId");
               sametime_invoke("chat", userid); 
            };
         }
         var vcardCommentElem = dojo.byId(person.username+"vcardCommentElem");
         var ChatActionElem = dojo.byId(person.username+"ChatAction");
         var ChatActionMoreElem = dojo.byId(person.username+"ChatActionMore");
                  
         if(vcardCommentElem != null) {
            vcardCommentElem.style.display="block";
            dojo.byId(person.username+"vcardStStatusElem").innerHTML = "&nbsp;"+lconn.core.util.html.encodeHtml(person.statusMessage);
         }
         if(ChatActionElem != null) {           
            ChatActionElem.style.display='';
         }
         if(ChatActionMoreElem != null) {           
            ChatActionMoreElem.style.display='';
         }
      }
   }
}// end of sametime awareness

})();
