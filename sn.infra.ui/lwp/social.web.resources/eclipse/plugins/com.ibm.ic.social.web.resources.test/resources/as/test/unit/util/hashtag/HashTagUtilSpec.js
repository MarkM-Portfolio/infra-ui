/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojox/validate/web",
	"ic-as/util/hashtag/HashtagUtil"
], function(web, util) {

	/**
	 * Jasmine spec for {@link lconn.core.widget.mentions.URLMentionsNode}
	 *
	 **/

		var commId = 101;
		var regExCommId = new RegExp(commId);
		var regExUrl = /href="(.*?)\?(.*?)"/;
		var regExTagText = new RegExp(">(.*)</a>");
		var hashtag = "#hashtag";
		var tagText = " dennis carey ";
		var orig = "##hashtag";
		var hashtags = ["hashtag1", "hashtag2", "F$hash1t/ag", "#hash"];
		var htmlContent = "this is #hashtag1 and this is #hashtag2, another #F$hash1t/ag, finally ##hash: wonder will they be linkified";

		var node;

		describe("the com.ibm.social.as.util.hashtag.HashtagUtil class", function() {
			it("implements the expected methods", function() {
				expect(util.getSearchHashtagUrl).toEqual(jasmine.any(Function));
				expect(util.linkifyHashtags).toEqual(jasmine.any(Function));
				expect(util.linkifyHashtag).toEqual(jasmine.any(Function));
				expect(util.createAnchorLink).toEqual(jasmine.any(Function));

			});
		});

		describe("the com.ibm.social.as.util.hashtag.HashtagUtil linkifyHashTag", function() {
			it("correctly linkifys hashtags", function() {
				var output = util.linkifyHashtag(hashtag, tagText, commId, orig);
				var urlResult = regExUrl.exec(output); //if valid link urlResult[1] gives url, urlResult[2] gives param list (e.g. "communityUuid=101&filter=all#tag=%23%23dennis&tab=StatusUpdates")
				var tagTextResult = regExTagText.exec(output);
				expect(tagText).toBe(tagTextResult[1]);
				expect(dojox.validate.isUrl(urlResult[1])).toBe(true);
				expect(regExCommId.test(urlResult[2])).toBe(true);
			});
		});

		describe("the com.ibm.social.as.util.hashtag.HashtagUtil linkifyHashTags", function() {
			it("correctly linkifys hashtags, multiple", function() {
				var urlResultArr, hrefCount = 0;
				var regExUrl = /href="(.*?)\?(.*?)"/g;

				var output = util.linkifyHashtags(htmlContent, hashtags, commId);

				while ((urlResultArr = regExUrl.exec(output)) !== null) {
					hrefCount++;
				}
				expect(hrefCount).toBe(4);
			});
		});
});
