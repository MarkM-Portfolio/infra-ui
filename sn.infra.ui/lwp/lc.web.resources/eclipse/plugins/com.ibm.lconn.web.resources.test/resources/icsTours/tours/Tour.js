/* Copyright IBM Corp. 2012, 20156  All Rights Reserved.              */
/*
dojo.provide("lconn.test.icsTours.tours.tours");
dojo.require("lconn.test.icsTours.tours.hopscotch");
dojo.require("lconn.test.icsTours.tours.examples.example1");
*/
dojo.provide("lconn.test.icsTours.tours.tour");
dojo.require("dojo/_base/declare");
dojo.require("lconn.test.icsTours.tours.hopscotch");

dojo.declare("lconn.test.icsTours.tours.Tour", null, {
		
		startTour : function(tour){
			hopscotch.startTour(tour);
		},
	
		setData : function(){
	
		},
	
		getData : function(){
	
		},
});