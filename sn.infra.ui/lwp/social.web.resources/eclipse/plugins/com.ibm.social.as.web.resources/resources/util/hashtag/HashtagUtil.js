/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.hashtag.HashtagUtil");

dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("dojo.i18n");
dojo.require("dojox.html.entities");
dojo.requireLocalization("com.ibm.social.as", "activitystream");

/**
 * Utility class for dealing with hashtags.
 * @author Robert Campion
 */
dojo.declare("com.ibm.social.as.util.hashtag.HashtagUtil", null,
{

	/**
	 * Get the search URL we'll use for searching tags.
	 * If this is a Community SU, we will link to Communities search
	 * else we will link to global search
	 * @param communityId optional communityId if SU is community related
	 * @param tag - original unescaped tag to sub in - will be encoded
	 * @returns {String}
	 */
	getSearchHashtagUrl: function(communityId, tag){
		// Community search url will be different for every community
		if ( communityId ) {
			return lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri +
					"/service/html/community/updates?communityUuid=" + communityId +
					"&filter=all#tag="+encodeURIComponent(tag)+"&tab=StatusUpdates";
		}

		var constraint = encodeURIComponent("{\"type\":\"category\",\"values\":[\"Tag/" + tag + "\"]}");
		return lconn.core.url.getServiceUrl(lconn.core.config.services.search).uri +
				"/web/search?scope=status_updates&constraint="+constraint;
	},

	/**
	 * Linkify all hash tags. Essentially wraps all hash tags in links, E.g:
	 *
	 *   "This is a #hash tag"
	 *
	 * will be changed to:
	 *
	 *   "This is a <a href='...'>#hash</a> tag"
	 *
	 */
	linkifyHashtags: function(htmlContent, tagsArray, commId){
				
		// If we don't have any tags then we can't do any processing.
		if (tagsArray && tagsArray.length != 0) {

			// Sort the tags so the longest tags are matched first.
			tagsArray.sort(function(a,b) { return b.length > a.length;});
			
			// keep a copy of the original array
			var originalTagsArray = tagsArray?tagsArray.slice():tagsArray;
			
			// encode tag array
			for (var i=0; tagsArray && i < tagsArray.length; i++){
				tagsArray[i] = dojox.html.entities.encode(tagsArray[i]);
			}

			// Since special characters like german words (eg: schön, hässlich) are not in encoding format from api
			// So we are decoding and encoding here
			htmlContent = dojox.html.entities.decode(htmlContent);
			htmlContent = dojox.html.entities.encode(htmlContent);

			// Use a temporary div to resolve any HTML entities
			var origContent = htmlContent;

			if ( !htmlContent && htmlContent !== "" ) {
				htmlContent = origContent;
			} else {
				// Convert all # that signify hashtags to ## so we can tell which tags have been linkified.
				// Search for all #hashtags that don't have a
				// letter, dijit or '/' before it (may be URL)
				htmlContent = htmlContent.replace(new RegExp("(^|[^\\w\\d/])#", "g"),
					function(marker) { return marker.replace("#","##"); }
				);

				// Now, this is hideous, but we face some problems...
				// - The tags are lowercased on backend in English
				// - The tags in text are not lowercased.
				// - JS RegEx seems to be locale aware, so doing case-insensitive
				//    search for the tags in the text may now work (where English
				//    lowercase does not match locale lowercase - Turkish)
				// So, we have to
				// - lowercase the status udpate (in English)
				// - search for the lowercased tag
				// - use the positions found in lowercased SU to update non-lowercased one
				// Testcase - Turkish 4 i's, two upper, lower. Lowercase to one in English.

				var newContent;

				// Text we are working with (regular & lowercase), updated after each tag
				var preSubstText = htmlContent;
				var preSubstTextLower = preSubstText.toLowerCase();

				// For all the tags
				for(var i = 0; i < tagsArray.length; i++){
					var tag = tagsArray[i];
					var originalTag = originalTagsArray[i];

					var re = new RegExp("##" + this.regexEscapeTag(tag), "ig");

					var match;
					var curPos = 0; // current position in SU
					var tmpNew = "";

					while ( match = re.exec(preSubstTextLower) ) {
						// get the actual tag text (tag itself is lowercased)
						// strip off one of ##, allow for remaining in length
						var tagText = preSubstText.substr(match.index+1, tag.length+1);

						// copy up-to start of tag from non-lowered text to newContent
						tmpNew += preSubstText.substring(curPos, match.index);

						// add on linkified hashtag to new content
						tmpNew += this.linkifyHashtag(match[0], tagText, commId, originalTag);

						// set curPos in non-lowered, non-linkified text
						curPos = match.index + 2 + tag.length;
					}

					if ( tmpNew ) {
						tmpNew += preSubstText.substr(curPos); // copy in remaining text
						newContent = tmpNew;
						preSubstText = tmpNew;
						preSubstTextLower = tmpNew.toLowerCase();
					}
				}

				if ( newContent ) {
					htmlContent = newContent;
				}

				// need to revert any double # that might be left over
				htmlContent = htmlContent.replace(new RegExp("(^|[^\\w\\d/])##", "g"),
						function(marker) { return marker.replace("##","#"); }
				);
			}
			// again decode the htmlcontent to render on th UI
			htmlContent = dojox.html.entities.decode(htmlContent);
		}

		// Return the (potentially) modified HTML content
		return htmlContent;
	},

	/**
	 * Linkify a single passed hashtag and return it.
	 * @param hashtag {String}
	 * @returns {String}
	 */
	linkifyHashtag: function(hashtag, tagText, commId, origUnescapedTag){
		// Remove the doubled #.
		hashtag = hashtag.replace(/##/,"#");

		// Save the first char if needed.
		var firstChar = "";
		// If the # isn't the first char
		if(hashtag.indexOf("#") > 0){
			// Save the first char
			firstChar = hashtag.charAt(0);
			// Remove the first char
			hashtag = hashtag.substring(1);
		}

		var titleText = "";

		// Resource bundle
		var strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");

		if(strings && strings.hashtagTitle){
			titleText = dojo.string.substitute(strings.hashtagTitle, [origUnescapedTag]);
		}
		var linkTagOptions = {
			title: titleText,
			tag: origUnescapedTag
		};

		return firstChar + this.createAnchorLink(tagText, commId, origUnescapedTag, linkTagOptions);
	},


	/**
	 * linkify the necessary components to create a hash tag anchor
	 */
	createAnchorLink: function(tagText, commId, origUnescapedTag, options){
		var hashLink = dojo.create("a", options);
		hashLink.href = this.getSearchHashtagUrl(commId, origUnescapedTag);
		hashLink.innerHTML = tagText;

		return hashLink.outerHTML || new XMLSerializer().serializeToString(hashLink);
	},

	/**
	 * Since our tag might contain characters that are special characters in a
	 * RegEx, we need to escape those characters before building RegEx to search
	 * for the tag
	 * @param tag {String}
	 * @returns {String}
	 */
	regexEscapeTag: function(tag) {
		var specialChars = ["(", ")", "[", "]", "{", "}","/", "\\", ".", "*", "+", "?", "|", "$", "^"];
		var specialsRE = new RegExp("(\\" + specialChars.join("|\\") + ")", "g");
		return tag.replace(specialsRE, "\\$1");
	}
});
