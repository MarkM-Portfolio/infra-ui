define([
	"ic-as/util/hashtag/HashtagUtil",
	"ic-test/testUtil"
], function (HashtagUtil, testUtil) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2013                                          */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	/**
	 * Hashtag Util tests.
	 */
	
	var htUtil = new HashtagUtil();
	var commId=101;
	var regExCommId = new RegExp(commId);
	var regExUrl = /href="(.*?)\?(.*?)"/;
	var regExTagText = new RegExp(">(.*)</a>");
	var hashtag="#hashtag";
	var tagText=" dennis carey ";
	var orig="##hashtag";
	var hashtags=["hashtag1", "hashtag2", "F$hash1t/ag", "#hash"];
	var htmlContent="this is #hashtag1 and this is #hashtag2, another #F$hash1t/ag, finally ##hash: wonder will they be linkified";
	
	testUtil.registerGroup("unit.as.util.hashtag.testHashtagUtil",
	    [
	        function testLinkifyHashtag(){
	            var output = htUtil.linkifyHashtag(hashtag, tagText, commId, orig);
	            var urlResult = regExUrl.exec(output); //if valid link urlResult[1] gives url, urlResult[2] gives param list (e.g. "communityUuid=101&filter=all#tag=%23%23dennis&tab=StatusUpdates")
	            var tagTextResult = regExTagText.exec(output);
	
	            doh.assertTrue(dojox.validate.isUrl(urlResult[1], "A URL should be contained in output of method linkifyHashtag"));
	            doh.assertTrue(regExCommId.test(urlResult[2]), "Community Id should be contained in output of method linkifyHashtag");
	            doh.assertEqual(tagText, tagTextResult[1], "The anchor tag should wrap the passed in tag text");
	        },
	
	        function testLinkifyHashtags(){
	            var urlResultArr, hrefCount=0;
	            var regExUrl = /href="(.*?)\?(.*?)"/g;
	
	            var output = htUtil.linkifyHashtags(htmlContent, hashtags, commId);
	
	            while ((urlResultArr = regExUrl.exec(output)) !== null)
	            {
	                hrefCount++;
	            }
	
	            doh.is(hrefCount,4, "Should be 4 links returned in html content");
	        }
	    ],
	    function setUpGroup() {
	    },
	    function tearDownGroup() {
	    }
	);
	return com.ibm.social.test.unit.as.util.hashtag.testHashtagUtil;
});