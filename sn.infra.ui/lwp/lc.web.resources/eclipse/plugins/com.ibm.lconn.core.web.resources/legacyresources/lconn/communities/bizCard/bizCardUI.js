/* Copyright IBM Corp. 2001, 2015  All Rights Reserved.              */
dojo.provide("lconn.communities.bizCard.bizCardUI");

dojo.require("lconn.core.bizCard.bizCardUtils");

dojo.require("lconn.core.HTMLUtil");
dojo.require("lconn.communities.bizCard.core"); //TODO: this dependency needs to be moved into a different location

dojo.requireLocalization("lconn.communities.bizCard", "ui");

lconn.communities.bizCard.bizCardUI = {
	messages: dojo.i18n.getLocalization("lconn.communities.bizCard", "ui"),
	
	mainNodeId: "bc_document_node_comm",
	
    getMenuData: function(community, bidi, menuItems, selector, header, footer) {
    
    	var messages = this.messages;
        var overViewString = messages['label.overview'];
            var tempppp = "";
            if(lconn.core.bizCard.bizCardUtils.standaloneCSSloaded)
                tempppp = " lotusui";
            
            var escapedCommunityName = lconn.core.HTMLUtil.escapeInlineText(community.name);
                
            header.write("<div id='container "+tempppp+"' style='width: 32em; border: 1px solid #e0e0e0; -moz-border-radius:7px;background-color:#F5F8FF;padding:10px 0px 8px 10px;'>");
            
            header.write("  <div id='navigationLinks' style='clear:left; border-bottom:1px solid #e0e0e0;padding: 0px 0pt 5px 0px;margin:0;'>");
            header.write("      <a href='" + community.homeOverviewUrl +"' title=\""+overViewString+"\" class='action'>"+overViewString+"</a>");
            this.writeLinksforPopupCard(header, community);
            header.write("  </div><br/>");       
               
            if(community.imageUrl != null && community.imageUrl != "")
                header.write("  <img src='" + community.imageUrl + "' alt=\""+escapedCommunityName+"\" title=\""+escapedCommunityName+"\" height='95' width='95' style='float:left;margin: 0px 10px 10px 10px; padding:2px !important; border:1px solid #c2c2c2;background-color:#fff;'/>");
            header.write("  <div  style='height:9em;overflow:hidden;'>");
            header.write("  <h2 style='font-size:1.1em;margin:0;margin-right:20px;padding:0;'>"+community.name + "<span id='membersCount' style='font-size:.9em;color:#999;font-weight:normal;'> (" + community.membercount + " "+messages['label.members']+")</span></h2>");
            if(community.tags != null && community.tags != "")
                header.write("  <div style='font-size:.9em;color:#999;padding:0;margin:0;'>"+messages['label.tags']+" "+community.tags + "</div>");
            if(community.description != null && community.description != "")
            {
                header.write("  <p id='communityDescription' style='font-size:.9em;padding:3px 5px 0 0;margin:0;'>");
                header.write("      " + community.description);
                header.write("  </p>                        ");
            }
            header.write("  </div>                      ");
            header.write("</div><!-- end container -->");
    },  
    
    getInlineMarkup: function (comm, bidi, buffer, selectedWidgetId) {
    
    	//LEFTNAV Switch to dropdown version if enabled
    	if (comm.showNewNavigation) {
    		this.getInlineMarkupDropdown(comm, bidi, buffer, selectedWidgetId);
    		return;
    	}
    
    	var messages = this.messages;
        var header = buffer;
        var showLinks = ((!dojo.cookie)?true:(dojo.cookie("community.inline.card.links") != 0));
        
        var styles1 = "";
        var temp222 = messages['label.collapse'];
        var twistyType = "lotusTwistyOpen";
        if(showLinks)
            twistyType = "lotusTwistyOpen";
        else
        {
            twistyType = "lotusTwistyClosed";
            styles1 = 'style="display: none"';
            temp222 = messages['label.expand'];
        }
            
		//Defect #86482 - Force the line height to 1 for images in the card
		header.write('<style>.lotusui30 img.lotusForceLineHeight { line-height: 1; }</style>');
		
        if(lconn.core.bizCard.bizCardUtils.standaloneCSSloaded)
        {
			header.write('<div id="' + this.mainNodeId + '" role="document" style="width:220px">');
        }
            
        header.write('<div class="lotusMenu" role="navigation" aria-label="'+ messages['label.nav.landmark.comm']+'"><div class="lotusBottomCorner"><div class="lotusInner">');
        header.write(lconn.communities.bizCard.core.addParentCommunity(comm));
        header.write('<div class="lotusMenuSection">');
        header.write('<h3 class=""><div class="lotusIndent10"><a id="'+comm.uuid+'_twisty" class="lotusSprite lotusArrow '+twistyType+'" href="javascript:lconn.communities.bizCard.core.toggleSection(\''+comm.uuid+"_twisty"+'\',\''+comm.uuid+"_comm_appLinks"+'\',\''+comm.uuid+"_commAltText"+'\',\''+"community.inline.card.links"+'\');" title="'+temp222+'"><span id="'+comm.uuid+'_commAltText" class="lotusAltText">&#x25bc;</span></a>');
        header.write('<table cellpadding="0" cellspacing="0" class="lotusLayout" role="presentation" width="155px"><tr><td>');
        header.write('<a href="'+comm.homeUrl+'" class="discussCommunityLink lotusBold" title="'+messages['tooltip.startpage']+'">');
        if(comm.communityType != "public")
        {
            var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup");
            {
                if(comm.communityType == "private") {
                    header.write("<img class='iconsStates16 iconsStates16-CheckedOut' src='" + dojo.config.blankGif + "' alt='"+messages['label.private.community.alt.text']+"' title='"+messages['label.private.community.alt.text']+"' /> ");                     
                }
                else {
                    header.write("<img class='lconnSprite lconnSprite-iconModeratedCommunity16' src='" + dojo.config.blankGif + "' alt='"+messages['label.moderated.community.alt.text']+"' title='"+messages['label.moderated.community.alt.text']+"' /> ");                       
                }
            }
         
            // Determine if auto loading of images has been disabled
            var bodyElement = document.getElementsByTagName("body")[0];
            if (dojo.hasClass(bodyElement, "lotusImagesOff")) 
            {            
                // Force a line break so the alt text will not collide with the title
                header.write('<br>');
            }
        }
                
        header.write(comm.name+'</a>');
        header.write('</td></tr></table>');
        header.write('</div>');
        header.write('</h3>');
        header.write('<div id="'+comm.uuid+'_comm_appLinks" class="lotusMenuSubsection" '+styles1+'>');
        header.write('<ul id="bizCardNav" role="toolbar" aria-label="'+ messages['label.nav.landmark.comm']+'">');
        var escapedCommunityName = lconn.core.HTMLUtil.escapeInlineText(comm.name);
        header.write('<li class="lconnCommLogo" role="presentation" tabindex="-1"><a title="'+messages['tooltip.startpage']+'" href="'+comm.homeUrl+'" tabindex="-1"><img src="'+ comm.imageUrl + '" width="155" height="155" alt="'+messages['tooltip.startpage']+'" class="discussCommunityLogo lotusForceLineHeight" /></a></li>');
        this.writeLinks(header, comm, selectedWidgetId, showLinks);
      
      if (comm.metricsEnabled) {
          header.write('<li role="button"');
          if(selectedWidgetId == "metrics")
             header.write(' class="lotusSelected" ');
    	  header.write("><a href='" + comm.metricsServiceUrl.replace("${0}", comm.uuid) + "' title='" + messages['label.metrics.link'] +"'>" + messages['label.metrics.link'] +"</a></li>");
      }
      
      if (comm.moderateEnabled) {
          header.write('<li role="button"');
          if(selectedWidgetId == "moderation")
             header.write(' class="lotusSelected" ');
    	  header.write("><a href='" + comm.moderationServiceUrl + comm.uuid + "' title='" + messages['label.moderation.link'] +"'>" + messages['label.moderation.link'] +"</a></li>");
      }

      
      header.write('</ul>');
       header.write('</div><!--end subsection-->');
       header.write('</div><!--end section-->');
       header.write(lconn.communities.bizCard.core.addSubCommunities(comm));
       header.write('</div></div></div><!--end menu-->');
       


		if (lconn.core.bizCard.bizCardUtils.standaloneCSSloaded) {
			header.write('</div>');
			var mainNodeId_ = this.mainNodeId;
			var setClass_ = function() {
				var el = dojo.byId(mainNodeId_);
				if (!el) {
					setTimeout(setClass_, 250);
					return;
				}
				
				var addClass = " lotusui lotusui30dojo lotusui30_body lotusui30_fonts lotusui30 lotusSpritesOn";
				if(dojo.isIE == 7)
					addClass += " lotusui_ie lotusui_ie7";
				else if(dojo.isIE)
					addClass += " lotusui_ie";
					
				el.className += addClass;
			};
			
			setClass_();
		}
    },  
	
	getInlineMarkupDropdown: function (comm, bidi, buffer, selectedWidgetId) {

    	//TABBEDNAV Clear top banner before building tabbed menus
    	if (comm.showTabbedNavigation) {
    		lconn.communities.bizCard.core.clearTopBanner();
    	}

		var messages = this.messages;
		var header = buffer;
		var showLinks = ((!dojo.cookie)?true:(dojo.cookie("community.inline.card.links") != 0));

		var styles1 = "";
		var temp222 = messages['label.collapse'];
		var twistyType = "lotusTwistyOpen";
		if(showLinks)
			twistyType = "lotusTwistyOpen";
		else
		{
			twistyType = "lotusTwistyClosed";
			styles1 = 'style="display: none"';
			temp222 = messages['label.expand'];
		}

		//Defect #86482 - Force the line height to 1 for images in the card
		header.write('<style>.lotusui30 img.lotusForceLineHeight { line-height: 1; }</style>');

		if(lconn.core.bizCard.bizCardUtils.standaloneCSSloaded)
		{
			header.write('<div id="' + this.mainNodeId + '" role="document" style="width:220px">');
		}

		header.write('<div class="lotusMenu" role="navigation" aria-label="'+ messages['label.nav.landmark.comm']+'"><div class="lotusBottomCorner"><div class="lotusInner">');
		header.write('<div class="lotusMenuSection">');
		header.write('<div id="'+comm.uuid+'_comm_appLinks" class="lotusMenuSubsection" '+styles1+'>');
		header.write('<ul id="bizCardNav" role="toolbar" aria-label="'+ messages['label.nav.landmark.comm']+'">');
		var escapedCommunityName = lconn.core.HTMLUtil.escapeInlineText(comm.name);
		header.write('<li class="lconnCommLogo" role="presentation" tabindex="-1"><a title="'+messages['tooltip.startpage']+'" href="'+comm.homeUrl+'" tabindex="-1"><img src="'+ comm.imageUrl + '" width="155" height="155" alt="'+messages['tooltip.startpage']+'" class="discussCommunityLogo lotusForceLineHeight" /></a></li>');
		header.write('</ul>');
		
		// Hidden dropdown menu
        if (window.gatekeeperConfig && window.gatekeeperConfig['catalog-card-updated']) {
        	header.write('<label id="applicationDropdownLabel" class="comm-dropdown-label" for="leftNavMenu">' + messages['label.community.applications'] + '</label>');
        }
		header.write('<div class="lotusHidden" id="leftNavMenu">');
		header.write('<ul id="bizCardNavMenu" role="toolbar" aria-label="'+ messages['label.nav.landmark.comm']+'">');
		this.writeLinks(header, comm, selectedWidgetId, showLinks);

		if (comm.metricsEnabled) {
			header.write('<li role="button"');
			if(selectedWidgetId == "metrics") {
				header.write(' class="lotusSelected" ');
			}
			header.write("><a href='" + comm.metricsServiceUrl.replace("${0}", comm.uuid) + "' title='" + messages['label.metrics.link'] +"'>" + messages['label.metrics.link'] +"</a></li>");
		}

	  	if (comm.moderateEnabled) {
		  	header.write('<li role="button"');
		  	if(selectedWidgetId == "moderation") {
			 	header.write(' class="lotusSelected" ');
			}
		  	header.write("><a href='" + comm.moderationServiceUrl + comm.uuid + "' title='" + messages['label.moderation.link'] +"'>" + messages['label.moderation.link'] +"</a></li>");
	  	}

	  	header.write('</ul>');
	  	header.write('</div><!--end subsection-->');
	  	header.write('</div><!--end section-->');
	   	header.write('</div>');
	   	
	    // Make sure menu has some room to expand downward
		var lotusMain = dojo.byId("lotusMain");
		if (!lotusMain) {
			lotusMain = dojo.query(".lotusMain")[0];
		}		
		if (lotusMain) {					
			lotusMain.style.overflowY = "visible";
			lotusMain.style.minHeight = "800px";					
		}
	    
	   	// Display navigation menu button
	   	this.writeSelectedLink(header, comm, selectedWidgetId, showLinks);	   
	   
		// Display subcommunities menu button
        if (window.gatekeeperConfig && window.gatekeeperConfig['catalog-card-updated']) {
        	header.write('<label id="subcommunityDropdownLabel" class="lotusHidden comm-dropdown-label" for="dropdownSubMenuContainer">' + messages['label.community.subcommunities'] + '</label>');
        }
		header.write('<div id="dropdownSubMenuContainer" class="lotusHidden">');									
		header.write('<div id="dropdownSubMenuTitle">');
		header.write('<ul><li class="lotusSelected" id="dropdownSubMenuTitleLink">');
		header.write('<a href="javascript:;" title="" id="dropdownSubMenuTitleLinkAnc" aria-haspopup="true">');
		header.write('<div id="dropdownSubMenuSelection"></div>');
		header.write('<span class="lotusRight"><span id="dropdownSubMenuIcon" class="lotusSprite lotusArrow lotusTwistyOpen"><span class="lotusAltText">&#9660;</span></span></span>');
		header.write('</a></li></ul>');
		header.write('</div>');									
		header.write('<div id="dropdownSubMenu" class="lotusHidden">');					
		header.write('<div id="subcommArea">');
		header.write(lconn.communities.bizCard.core.addSubCommunities(comm));
	   	header.write('</div><!--end section-->');
		header.write('</div>');
		header.write('</div>');
		header.write('</div></div></div><!--end menu-->');
		
		if (lconn.core.bizCard.bizCardUtils.standaloneCSSloaded) {
			header.write('</div>');
			var mainNodeId_ = this.mainNodeId;
			var setClass_ = function() {
				var el = dojo.byId(mainNodeId_);
				if (!el) {
					setTimeout(setClass_, 250);
					return;
				}

				var addClass = " lotusui lotusui30dojo lotusui30_body lotusui30_fonts lotusui30 lotusSpritesOn";
				if(dojo.isIE == 7)
					addClass += " lotusui_ie lotusui_ie7";
				else if(dojo.isIE)
					addClass += " lotusui_ie";

				el.className += addClass;
			};

			setClass_();
		}
	},  

    writeLinksforPopupCard: function(buffer, community)
    {
        for (var i = 0; community.links != null && i < community.links.length; i++)
            buffer.write("&nbsp;&nbsp;|&nbsp;<a href='" + community.links[i].url +"' title='"+community.links[i].label+"' class='action'>"+community.links[i].label+"</a>");
    },
    
    // Compose the document title to match the selected page 
    composePageTitle: function(communityName, pageName)
	{     							
		var titleString = this.messages['label.window.title'];
		var escCommunityName = "";
		var escPageName      = "";
		
		if (communityName) {
			escCommunityName = lconn.core.HTMLUtil.escapeInlineText(communityName);
		}
		if (pageName) {
			escPageName = lconn.core.HTMLUtil.escapeText(pageName);
		}
		return dojo.string.substitute(titleString, [escCommunityName, escPageName]);	
  	},  
  	
	// Write the link for just the selected widget
	writeSelectedLink: function(header, community, selectedWidgetId, showLinks)
	{	
		var messages = this.messages; 
		var label;
		
		// Since metrics and moderation aren't true widgets we won't find them in the widget links table	
		header.write('<div id="dropdownNavMenuContainer">');
		if (selectedWidgetId == "metrics" || selectedWidgetId == "moderation") {
			header.write('<div id="dropdownNavMenuTitle">');	
			header.write('<ul><li class="lotusSelected" id="dropdownNavMenuTitleLink">');	
			if (selectedWidgetId == "metrics") {
				label = lconn.core.HTMLUtil.escapeText(messages['label.metrics.link']);	
			}
			else {
				label = lconn.core.HTMLUtil.escapeText(messages['label.moderation.link']);	
			}
			header.write('<a href="javascript:void(0);" title="" id="dropdownNavMenuTitleLinkAnc" aria-haspopup="true">');			
			header.write('<div id="dropdownNavMenuSelection">'+label+'</div>');
			header.write('<span class="lotusRight"><span id="dropdownNavMenuIcon" class="lotusSprite lotusArrow lotusTwistyOpen"><span class="lotusAltText">&#9660;</span></span></span>');				
			header.write('</a></li></ul>');	
			header.write('</div>');
		}
		
		// Otherwise search through widgets for a match
		else { 
			//  Default to Overview page is no widget match is found
			var label = messages['label.overview'];
			for (var i=0; community.links != null && i < community.links.length; i++)
			{
				var link = community.links[i];			
				if (selectedWidgetId == link.id) {							
					label = lconn.core.HTMLUtil.escapeText(link.label);								
					break;				
				}
			}	
			// Write selected link
			header.write('<div id="dropdownNavMenuTitle">');	
			header.write('<ul><li class="lotusSelected" id="dropdownNavMenuTitleLink">');												
			header.write('<a href="javascript:void(0);" title="" id="dropdownNavMenuTitleLinkAnc" aria-haspopup="true">');			
			header.write('<div id="dropdownNavMenuSelection">'+label+'</div>');
			header.write('<span class="lotusRight"><span id="dropdownNavMenuIcon" class="lotusSprite lotusArrow lotusTwistyOpen"><span class="lotusAltText">&#9660;</span></span></span>');				
			header.write('</a></li></ul>');	
			header.write('</div>');
		}
		header.write('</div>');		
	},
	
	// Write all links
    writeLinks: function(header, community, selectedWidgetId, showLinks)
    {
    	var messages = this.messages;            
    	// COMMUNITY-169# Hide Community Overview Page  . If highlights is the landing page, then automatically hide the overview page
    	var urlHighlights="";
    	var highlightsAddedAsFirstTab = false;
    	for(var i = 0;community.links!=null&&i<community.links.length;i++)
    	{
    		var link = community.links[i];
    		if (link.id == "Highlights") {
    			urlHighlights = link.url;
    			//check if gatekeeperConfig['communities-highlights-as-overview'] is set , then add Highlights as 1st Tab 
    			if(typeof gatekeeperConfig != "undefined" && typeof gatekeeperConfig['communities-highlights-as-overview'] != "undefined" && gatekeeperConfig['communities-highlights-as-overview'] ){
    				this.writeLink(link, header, selectedWidgetId);
    				highlightsAddedAsFirstTab = true;
    			}
				break;
    		}
    	}
    	// community.startPage = "" if overview is selected as landing page
        if(urlHighlights.indexOf(community.startPage) == -1 || community.startPage.length ==0 ){
        	header.write('<li role="button"><a href="' + community.homeOverviewUrl +'" title="'+messages['tooltip.overview']+'">'+messages['label.overview']+'</a></li>');
    	}
    	
        // Place Updates Links after Overview
        for (var i = 0; community.links != null && i < community.links.length; i++)
        {
			var link = community.links[i];
            if(link.id=="RecentUpdates" || link.id=="StatusUpdates") {
				this.writeLink(link, header, selectedWidgetId); 
            }
        }
		// Then write members link
		for (var i=0; community.links != null && i < community.links.length; i++)
		{
			var link = community.links[i];
			if (link.id == "Members") {
				this.writeLink(link, header, selectedWidgetId);
				break;
			}
		}
		
		// Then write banner links, followed by col1, col2,and col3 links	
		this.writeColLinks(community, header, selectedWidgetId, "banner", highlightsAddedAsFirstTab);
		this.writeColLinks(community, header, selectedWidgetId, "col1", highlightsAddedAsFirstTab);
		this.writeColLinks(community, header, selectedWidgetId, "col2" ,highlightsAddedAsFirstTab);
		this.writeColLinks(community, header, selectedWidgetId, "col3" ,highlightsAddedAsFirstTab);
		return;
	},
	
	writeColLinks: function(community, header, selectedWidgetId, colString , highlightsAddedAsFirstTab) {
		for (var i = 0; community.links != null && i < community.links.length; i++)
        {
			var link = community.links[i];
            if(link.id!="RecentUpdates" && link.id!="StatusUpdates" && link.id!="Members" && link.id!="Highlights" ) {
				if (link.uiLocation.indexOf(colString) != -1) {
					this.writeLink(link, header, selectedWidgetId);
				}
            }
            // check if highlights is not added already above
            if (link.id=="Highlights"  && !highlightsAddedAsFirstTab){
            	if (link.uiLocation.indexOf(colString) != -1) {
					this.writeLink(link, header, selectedWidgetId);
				}
            }
        }
	},
	
	writeLink: function(link, header, selectedWidgetId) {
		header.write('<li role="button" widgetdefid="' + link.id + '"');
		if(selectedWidgetId == link.id)
			header.write(' class="lotusSelected" ');
		var label = lconn.core.HTMLUtil.escapeText(link.label);
		header.write('><a href="' + link.url + '" title="'+ label +'">'+label+'</a></li>');
	},

    addCommunityActionsMenu: function(community)
    {      
      	community.showGoToComm = true;
      	lconn.communities.bizCard.core.community = community;
        dojo.publish("lconn/communities/bizcard/community/set", [community]);
      	if(lconn.communities.bizCard.core.isNotEmpty(community.unfollowUrl)) {
         	dojo.publish("lconn.comm.commFollowed", [community.uuid]);
        }
        
        // Build Follow Actions Menu, use separate try/catch blocks so
        // that a single error doesn't bring down all navigation
        try {
      		lconn.communities.bizCard.core.addFollowActionsMenuUI(community);
      	}
      	catch (e) {}
      	
      	// Build Actions Menu
      	try {
      		lconn.communities.bizCard.core.addCommunityActionsMenuUI(community);
		}
		catch (e) {}
      
    	try {
    		//TABBEDNAV Display tabbed top navigation
			if (community.showTabbedNavigation) {
	    		
				//PMR 48174,122,000, Need to render actions menu on external sites
				if(dojo.byId('isExternalApp')){
					lconn.communities.bizCard.core.addCommunityNavMenuUI("dropdownNavMenuTitle", community);
				}
				else{
					lconn.communities.bizCard.core.writeTabbedNavigation(community);
				}
				
			}
			//LEFTNAV Display dropdown left navigation
			else if (community.showNewNavigation) {
				lconn.communities.bizCard.core.addCommunityNavMenuUI("dropdownNavMenuTitle", community);
			}			
		}
		catch (e) {console.log(e);}
    }
}
