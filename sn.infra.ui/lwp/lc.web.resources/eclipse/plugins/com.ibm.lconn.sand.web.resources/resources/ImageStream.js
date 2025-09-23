/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.ImageStream");

dojo.require("com.ibm.social.layout.people");
dojo.require("com.ibm.lconn.layout.people");

dojo.requireLocalization("lconn.sand", "ImageStream");
 
dojo.declare("lconn.sand.ImageStream", [dijit._Widget, dijit._Templated],{
	
	_blankIcon: dojo.config.blankGif,
	data: [],
	_position: 0,
	templatePath: dojo.moduleUrl("lconn.sand", "templates/ImageStream.html"),
	strings: null,
	
	postMixInProperties: function(){
		if (!this.strings){
			this.strings = dojo.i18n.getLocalization("lconn.sand", "ImageStream");
		}
	},
	
	postCreate: function(){
		this._position = 0;
		this._update();
	},
	
	_getPhotoUrl: function(item) {
		return com.ibm.social.layout.people.getImageUrl({userid: item.uid}, 32);
	},
	
	getCurrentItem: function(){
		if (this.data && this._position < this.data.length){
			return this.data[this._position];
		}
	},
	
	_getProfileLink : function(item) {
		
		var returnNode = dojo.create("span");
		
		var genNode = com.ibm.social.layout.people.createLink({name: item.name, userid: item.uid});
		var aIdNodes = dojo.query(".x-lconn-userid", genNode);
		if (aIdNodes.length > 0) {
			aIdNodes[0].parentNode.removeChild(aIdNodes[0]);
			returnNode.appendChild(aIdNodes[0]);
		}
		returnNode.appendChild(genNode);
		
		return returnNode;
	},
	
	_next : function(){
		if(this._position+1 === this.data.length) {
			this._position=0;
		} else {
			this._position++;
		}
		this._update();
		this.onNext();
	},
	
	_previous : function(){
		if(this._position === 0) {
			this._position = this.data.length-1;
		} else {
			this._position--;
		}
		this._update();
		this.onPrevious();
	},
	
	_update : function(){
		if (!this.data || this.data.length < this._position){
			return;
		}
		
		var currentItem = this.getCurrentItem();
		
		// main image
		dojo.attr(this.StreamImgMain,"src",this._getPhotoUrl(currentItem));
		dojo.attr(this.StreamImgMain,"alt", currentItem.name);

		// main image caption
		dojo.empty(this.StreamMainName);
		var genProfLink = this._getProfileLink(currentItem).children;
		while(genProfLink.length > 0) {
			var node = genProfLink[0];
			node.parentElement.removeChild(node);
			this.StreamMainName.appendChild(node);
		}
		
		// previous
		if(this.data.length>1) {
			var prevPos;
			if(this._position===0) {
				prevPos=this.data.length-1;
			} else {
				prevPos = this._position-1;
			}
			dojo.attr(this.StreamImgPrev,"src",this._getPhotoUrl(this.data[prevPos]));
			dojo.attr(this.StreamImgPrev,"alt", this.data[prevPos].name);
			dojo.style(this.StreamButtonPrev,"display","");
		} else {
			dojo.attr(this.StreamImgPrev,"src",this._blankIcon);
			dojo.style(this.StreamButtonPrev,"display","none");
		}
		
		// next
		if(this.data.length>1) {
			var nextPos;
			if(this._position+1===this.data.length) {
				nextPos=0;
			} else {
				nextPos = this._position+1;
			}
			dojo.attr(this.StreamImgNext,"src",this._getPhotoUrl(this.data[nextPos]));
			dojo.attr(this.StreamImgNext,"alt", this.data[nextPos].name);
			dojo.style(this.StreamButtonNext,"display","");
		} else {
			dojo.attr(this.StreamImgNext,"src",this._blankIcon);
			dojo.style(this.StreamButtonNext,"display","none");
		}

		// business card
		try {
			SemTagSvc.parseDom(null, this.domNode);
		} catch(e) {
			//
		}
	},
	
	onNext: function(){},
	
	onPrevious: function(){}
		
});
