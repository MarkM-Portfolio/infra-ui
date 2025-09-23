/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.bizCard.profiles.bizCardSpec");

dojo.require("lconn.profiles.bizCard.bizCard");

(function(bizCard) {

	describe("the interface of lconn.profiles.bizCard.bizCard", function() {
		it("implements the expected methods", function() {
			expect(bizCard.renderBizCard).toEqual(jasmine.any(Function));
			expect(bizCard.renderMiniBizCard).toEqual(jasmine.any(Function));
			expect(bizCard.update).toEqual(jasmine.any(Function));
		});
	});

}(lconn.profiles.bizCard.bizCard));
