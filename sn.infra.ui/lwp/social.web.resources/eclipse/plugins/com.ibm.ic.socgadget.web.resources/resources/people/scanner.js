/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/config",
	"dojo/dom",
	"dojo/query",
	"ic-core/config/services",
	"ic-core/url",
	"ic-gadget/people/_vcard_utils"
], function (dojo, array, config, dom, query, services, url, _vcard_utils) {

	com.ibm.social.gadget.people.scanner = 
	{
		scan : function(domNode, isNonGadget) {
			domNode = dom.byId(domNode);
			
			if(isNonGadget) {
				if(typeof window.SemTagSvc !== "undefined") {
					_vcard_utils.finalize_biz_vcards(domNode);
				} else {
					_vcard_utils.finalize_plain_vcards(domNode);
				}
			}else {
				if(typeof window.cre$ !== "undefined" && typeof window.cre$.people !== "undefined") {
					this.scanCreGadget_(domNode);
				} else {
					_vcard_utils.finalize_plain_vcards(domNode);
				}
			}
		},
		findVcards_:function(domNode){
			// initially, create an array of nodes to be processed, ignore nodes that have already been processed
			var people = [];
			var vCardNodes = query(".vcard", domNode);
			vCardNodes = array.filter(vCardNodes, function(vCard){
				if(typeof query("> a > span.photo", query(".vcard")[2])[0] === "undefined"){
					var person = {"uid":query(".x-lconn-userid", vCard)[0].innerHTML, "displayName":query(".fn", vCard)[0].innerHTML/* ignore additional params for initial impl, "email":dojo.query(".email", vCard)[0].innerHTML*/};
					people.push(person);
					return true;
				}
				else {
					return false;
				}
			});
			return {"people":people, "nodes":vCardNodes};
		},
		scanCreGadget_:function(domNode){
			var peopleNodes = this.findVcards_(domNode);
			// if we actually have any people to be processed, continue
			if(peopleNodes.people.length>0){
				getServiceManager().getService(cre$.services.PEOPLE).then(function(peopleService){
					if(config.isDebug) {
						console.debug("inside PeopleService");
					}
					try{
						peopleService.createPeople(peopleNodes.people).then(function(result){
								var peopleParams = array.map(result, function(person, index){
									return {"person":person, "refNode":peopleNodes.nodes[index], "relPos":"replace"};
									});
								console.log("calling renderPeople with ", peopleParams);
								peopleService.renderPeople(peopleParams).then(function(people){console.log("people rendered, hurrah!", people);});
							},
							function(error){
								console.log("problem creating people... ", error);
							}
						);
					}catch(e){
						if(config.isDebug) {
							console.debug("Exception in scan:");
						}
						console.dir(e);
					}
				});
			}
		}
	};
	return com.ibm.social.gadget.people.scanner;
});
