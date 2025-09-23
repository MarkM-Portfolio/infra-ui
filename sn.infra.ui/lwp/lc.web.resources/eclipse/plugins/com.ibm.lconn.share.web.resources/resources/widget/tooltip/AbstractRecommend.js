/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.AbstractRecommend");
dojo.require("lconn.share.widget.tooltip.DialogBase");

dojo.declare("lconn.share.widget.tooltip.AbstractRecommend", lconn.share.widget.tooltip.DialogBase, {
   label: null,
   width: 250,
   alwaysReload: true,
   limitPeopleList: 25,

   /* Initialize this widget with the same strings that are passed to lconn.share.widget.AbstractRecommendInfo" */
      
   /**
    * These members sets the handle type for the parent object, and also allows other ioArgs to be passed (mixed in to the call to dojo.xhrGet)
    * 
    * ioArgs: {noStatus: true, handleAs: "json"},
    * handleAs: "json",
    */

   /**
    * Parse the server response and return an object with the necessary info from the response
    * <pre>
    * getInfo: function(response, ioArgs) {
    *    return {
    *       canRecommend: true,
    *       isUserRecommended: false,
    *       users: [{id: 'asingh', name: 'Allie Singh'}, ...],
    *       timesRated: 10
    *    }
    * },
    * </pre>
    */
    
   /**
    * Implement this method to make the people's names links.  The user object is the one created during getInfo().  The a is
    * the href.  Be sure to set the classname to lotusPerson and to make sure the SemTagSvc registers the link.
    * 
    * <pre>
    * generateLinkToPerson: function(user, a) {},
    * </pre> 
    */
      
   renderHtml: function(response, ioArgs) {
      var info = this.info = this.getInfo(response, ioArgs);
      var isUserRecommended = info.isUserRecommended;
      var canRecommend = info.canRecommend;
      var users = info.users;
      var visibleUsers = Math.min(users.length, this.limitPeopleList);
      var totalRecommenders = info.timesRated;
      var otherRecommenders = totalRecommenders - (isUserRecommended ? 1 : 0);

      // when we render the tooltip, use the latest info to update the caller 
      this.onrecommend(isUserRecommended, totalRecommenders);

      var nls = this.nls;
      var d = document;
      var el = d.createElement("div");
         el.className = "lotusHelp";
         var style = el.style;
         //TODO: remove when style fixes are made part of core OneUI
         style.position = "relative";style.width = "auto";style.top = "0";
         if (this.width) style.width = this.width+"px";
         var div = d.createElement("div");
            div.className = "lotusInfoBox";

            var labelMany = nls.LABEL_A_MANY;
            var labelOne = nls.LABEL_A_ONE;
            if (canRecommend) {
               var labelMany = nls.LABEL_R_MANY;
               var labelOne = nls.LABEL_R_ONE;
               var recommender = this.recommender = this.createRecommendToggle(d, div, isUserRecommended, totalRecommenders);
               this.connect(recommender, "onrecommend", "onrecommend");
            }
            else if (otherRecommenders == 0) {
               var divr = div.appendChild(d.createElement("div"));
               divr.appendChild(d.createTextNode(nls.NOT_RECOMMENDED));
            }
            
            if (otherRecommenders > 0) {
               var divr = div.appendChild(d.createElement("div"));
                  if (canRecommend)
                     divr.className = "lotusChunk";
               divr.appendChild(d.createTextNode(otherRecommenders > 1 ? dojo.string.substitute(labelMany, [dojo.number.format(otherRecommenders)]) : labelOne));
               var ul = d.createElement("ul");
                  ul.className = "lotusList XlotusCompactList";
                  if (visibleUsers > 5) {
                     ul.style.overflowY = "scroll";
                     ul.style.height = "100px";
                  }
                  for (var i=0;i<visibleUsers;i++) {
                     var li = ul.appendChild(d.createElement("li"));
                     var tn = d.createTextNode(users[i].name);
                     if (this.generateLinkToPerson) {
                        var a = d.createElement("a");
                           this.generateLinkToPerson(users[i], a);
                           a.appendChild(tn);
                        li.appendChild(a);
                     }
                     else
                        li.appendChild(tn);
                  }
                  var hidden = otherRecommenders - visibleUsers;
                  if (hidden > 0) {
                     var li = ul.appendChild(d.createElement("li"));
                     li.className = "lotusMeta";
                     li.appendChild(d.createTextNode(
                        hidden == 1 
                           ? nls.LABEL_HIDDEN_ONE 
                           : dojo.string.substitute(nls.LABEL_HIDDEN_MANY, [dojo.number.format(hidden)])
                        ));
                  }
                  ul.firstChild.className = "lotusFirst";
               div.appendChild(ul);
            }
         el.appendChild(div);
      return el;
   },
   
   getErrorMessage: function(error) {
      return this.nls.ERROR_RETRIEVE;
   },
   
   onrecommend: function(isUserRecommended, timesRated) {
      var l = this._launcher;
      if (l && l.onrecommend)
         l.onrecommend(isUserRecommended, timesRated);
   }
});
