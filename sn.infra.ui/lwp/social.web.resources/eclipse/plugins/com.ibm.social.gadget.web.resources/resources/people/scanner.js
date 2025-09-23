/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.gadget.people.scanner");

dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("com.ibm.social.gadget.people._vcard_utils");

com.ibm.social.gadget.people.scanner = 
{
	scan : function(domNode, isNonGadget) {
		domNode = dojo.byId(domNode);
		
		if(isNonGadget) {
			if(typeof window.SemTagSvc !== "undefined") {
				com.ibm.social.gadget.people._vcard_utils.finalize_biz_vcards(domNode);
			} else {
				com.ibm.social.gadget.people._vcard_utils.finalize_plain_vcards(domNode);
			}
		}else {
			if(typeof window.cre$ !== "undefined" && typeof window.cre$.people !== "undefined") {
				this.scanCreGadget_(domNode);
			} else {
				com.ibm.social.gadget.people._vcard_utils.finalize_plain_vcards(domNode);
			}
		}
	},
	findVcards_:function(domNode){
		// initially, create an array of nodes to be processed, ignore nodes that have already been processed
		var people = [];
		var vCardNodes = dojo.query(".vcard", domNode);
		vCardNodes = dojo.filter(vCardNodes, function(vCard){
			if(typeof dojo.query("> a > span.photo", dojo.query(".vcard")[2])[0] === "undefined"){
				var person = {"uid":dojo.query(".x-lconn-userid", vCard)[0].innerHTML, "displayName":dojo.query(".fn", vCard)[0].innerHTML/* ignore additional params for initial impl, "email":dojo.query(".email", vCard)[0].innerHTML*/};
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
				if(dojo.config.isDebug) {
					console.debug("inside PeopleService");
				}
				try{
					peopleService.createPeople(peopleNodes.people).then(function(result){
							var peopleParams = dojo.map(result, function(person, index){
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
					if(dojo.config.isDebug) {
						console.debug("Exception in scan:");
					}
					console.dir(e);
				}
			});
		}
	}
};