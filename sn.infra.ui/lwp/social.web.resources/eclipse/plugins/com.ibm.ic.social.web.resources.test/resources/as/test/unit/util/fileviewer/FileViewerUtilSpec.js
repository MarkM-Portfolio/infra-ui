/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([	
	"ic-as/util/fileviewer/FileViewerUtil",
	"dojo/has"
], function(FileViewerUtil, has) {
		// Feeds needed
		window.activityStreamAbstractHelper = {
			isGadget: false
		};
		
		var testObj;		
		describe("the ic-as/util/fileviewer/FileViewerUtil class", function() {
			it("implements the expected methods", function() {
				expect(FileViewerUtil.launchFileViewer).toEqual(jasmine.any(Function));
				expect(FileViewerUtil.isFileOverlayEnabled).toEqual(jasmine.any(Function));				
			});
			it("throws an error if viewer is not available", function() {
				try{
					FileViewerUtil.launchFileViewer('');	
				}catch(err){
					expect(err).not.toBe(null);
				}				
			});
			it("return false for fileViewer enabled when generator is profiles", function() {				
				expect(FileViewerUtil.isFileOverlayEnabled('profiles')).not.toBeTruthy();					
			});
			it("return true for fileViewer enabled when generator is files", function() {	
				has.add("fileviewer-everywhere", true);
				has.add("fileviewer-everywhere-activitystream", true);
				expect(FileViewerUtil.isFileOverlayEnabled('files')).toBeTruthy();					
			});
		});		

});
