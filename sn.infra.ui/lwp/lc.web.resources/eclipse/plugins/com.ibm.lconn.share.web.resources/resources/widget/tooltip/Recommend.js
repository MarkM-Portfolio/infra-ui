/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.Recommend");
dojo.require("lconn.share.widget.tooltip.AbstractRecommend");
dojo.require("lconn.share.widget.Recommend");

/**
 * An implementation of the recommendation popup that is specific to Files/Wikis
 */
dojo.declare("lconn.share.widget.tooltip.Recommend", lconn.share.widget.tooltip.AbstractRecommend, {
   ioArgs: {noStatus: true, handleAs: "json"},
   handleAs: "json",
   autofocus: false,
   
   getInfo: function(response, ioArgs) {
      // ensure the authenticated user is not in the list of users to show
      var items = dojo.filter(response.items, function(i) {
         var b = (i.id == this.authenticatedUserId);
         if (b)
            response.recommended = true;
         return !b;
      }, this);
      
      // if we retrieved extra items, trim anything over the limit
      items.length = Math.min(items.length, this.limitPeopleList);
         
      return {
         canRecommend: this.canRecommend,
         isUserRecommended: !!response.recommended,
         users: items,
         timesRated: response.totalSize
      }
   },

   createRecommendToggle: function(d, el, isUserRecommended, timesRated) {
      var args = {
         baseClass: "lotusRecommend", 
         timesRated: timesRated,
         userRecommended: isUserRecommended,
         net: this.net
      };
      if (this.toggleArgs)
         dojo.mixin(args, this.toggleArgs);
      return new lconn.share.widget.Recommend(args, el.appendChild(d.createElement("label")));
   }
});
