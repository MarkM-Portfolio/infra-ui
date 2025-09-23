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

var relatedBookmarklet = {	
	version: '4.5',
	
	openWindow: function(targetBookmarklet) {
		
		var findScript = false;
		var src;
		var ver;
		var scripts = document.getElementsByTagName('script');
		for (var i=scripts.length-1;i>=0;i--) {
			src = scripts[i].src;
			// Before 4.5, the ver is null
			ver = scripts[i].ver;
			if (src) {
				if (!findScript){
					if (src.match(/tools\/rlet\.js(\?.*)?$/)) {
						relatedBookmarklet.version = ver;
						findScript = true;
					}
				}
                if(findScript) break;
			}
		}
		var verArg="";
		if(ver)
			verArg = "?ver="+ver;
		
		var e = encodeURIComponent;
		var iWidth = 760;
		var iHeight = 550;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
		var url = targetBookmarklet + "/relatedCommunity/popup";
		if (this.exist("dojo")) {
			var c = this.getCommuityData();
			url += "?uuid=" + e(c.uuid);
			url += "&name=" + e(c.name);
			url += "&baseUrl=" + e(c.baseUrl);
			url += "&type=" + e(c.type);
			if(ver)
				url += "&ver="+ver;
		}
		window.open(url, "_blank",'toolbars=no,scrollbars=yes,resizable=yes,width='+iWidth+',height='+iHeight+',top='+iTop+',left='+iLeft);
	},

	getCommuityData: function() {
		var community = {uuid:'', baseUrl:'', name:'', type:''};
		if (this.getCommunityFor40(community) 
		        || this.getCommunityFor40beta(community)
				|| this.getCommunityForLotusLive(community) 
				|| this.getCommunityFor301(community)
				|| this.getCommunityFor25(community)) {
			return community;
		}		
		return community;		
	},
	
	getCommunityFor40: function(community) {
		var result = true;
		if (!this.fetchValue(community, "uuid", "ic_comm_communityUuid")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "baseUrl", "ic_comm_communitiesSvcRef")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "name", "ic_comm_communityName")) {
			result = false;
		}
		
		if (this.fetchValue(community, "type", "ic_comm_communityType")) {
			result = false;
		}			
		return result;
	},
	
	getCommunityFor40beta: function(community) {
		var result = true;
		if (!this.fetchValue(community, "uuid", 
				"currentCommunityUuid", 
				"communityUuid", 
				"lconn.communities.bizCard.core.community.uuid")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "baseUrl", 
				"commContextPath")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "name", 
				"origCommunityName")) {
			result = false;
		}
		
		if (this.fetchValue(community, "type", 
				"communityType", 
				"origCommunityType")) {
			result = false;
		}			
		return result;
	},
	
	getCommunityForLotusLive: function(community) {
	    var result = true;
		if (!this.fetchValue(community, "uuid", 
				"currentCommunityUuid", 
				"communityUuid", 
				"lconn.communities.bizCard.core.community.uuid")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "baseUrl", 
				"commContextPath")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "name", 
				"origCommunityName")) {
			result = false;
		}
		
		if (this.fetchValue(community, "type", 
				"communityType", 
				"origCommunityType")) {
			result = false;
		}			
		return result;
	},
	
	getCommunityFor301: function(community) {
		var result = true;
		if (!this.fetchValue(community, "uuid", 
				"currentCommunityUuid", 
				"communityUuid", 
				"lconn.communities.bizCard.core.community.uuid")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "baseUrl", 
				"commContextPath")) {
			result = false;
		}
		
		if (!this.fetchValue(community, "name", 
				"origCommunityName")) {
			result = false;
		}
		
		if (this.fetchValue(community, "type", 
				"communityType", 
				"origCommunityType")) {
			result = false;
		}			
		return result;
	},
	
	getCommunityFor25: function(community) {
		return false;
	},
	
	fetchValue:function(community, property, values) {
		var hasValue = false;
		for (var i=2; i<arguments.length; i++) {
			if (this.exist(arguments[i])&& this.valueOf(arguments[i])) {
				community[property] = this.valueOf(arguments[i]);
				hasValue=true;
				break;
			}
		}			
		return hasValue;
	},
	
	exist:function(classPath) {
	    var paths = classPath.split(".");
		var exists = true;
		var temp = window;
		for (var i = 0; i<paths.length; i++) {
		    if (temp[paths[i]]) {
		    	temp = temp[paths[i]];
			} else {
			    exists = false;
				break;
			}
		}		
		return exists;
	},
	
	valueOf:function(classPath) {
		var paths = classPath.split(".");
		var value = null;
		var temp = window;
		for (var i = 0; i<paths.length; i++) {
			temp = temp[paths[i]];
		}
		if (temp) {
			value = temp;
		}
		return value;
	}
};

if (typeof(targetBookmarklet) == "string") {
	relatedBookmarklet.openWindow(targetBookmarklet);
	targetBookmarklet=null;
}