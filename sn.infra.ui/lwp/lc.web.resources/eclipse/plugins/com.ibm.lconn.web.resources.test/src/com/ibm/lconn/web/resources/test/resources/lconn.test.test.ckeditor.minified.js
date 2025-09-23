/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


;if(!dojo._hasResource["lconn.test.test.ckeditor"]){
dojo._hasResource["lconn.test.test.ckeditor"]=true;
(function(){
var _1=dojo.provide("lconn.test.test.ckeditor");
var _2=dojo.create("div",{style:{"display":"none"}});
dojo.mixin(_1,{CKEDITOR:{version:"this.is.a.mock",config:{},NODE_ELEMENT:1,NODE_TEXT:3,plugins:{add:function(_3,_4){
if(_1.CKEDITOR.plugins.registered[_3]){
throw "The resource <"+_3+"> is already registered";
}
_1.CKEDITOR.plugins.registered[_3]=_4;
},registered:{},reset:function(){
this.registered={};
}},_eventHandlers:{},on:function(_5,_6){
this._eventHandlers[_5]=_6;
},fire:function(_7,_8){
if(this._eventHandlers[_7]){
this._eventHandlers[_7].call(this,_8);
}
},dom:{range:function(el){
_1.CKEDITOR.dom.range.el=el;
this.moveToElementEditEnd=function(el){
_1.CKEDITOR.dom.range.end=el;
};
this.select=function(){
_1.CKEDITOR.dom.range.selected=true;
};
this.setStartBefore=function(el){
this.startsBefore=el;
};
this.setStartAfter=function(el){
this.startsAfter=el;
};
this.setEndAfter=function(el){
this.endsAfter=el;
};
this.deleteContents=function(){
this.deletedContents=true;
};
},text:function(_9){
this.$=document.createTextNode(_9);
this.appendTo=function(el){
el.$.appendChild(this.$);
};
this.insertAfter=function(_a){
if(_a&&_a.getParent()){
_a.$.parentNode.insertBefore(this.$,_a.$.nextSibling);
}
};
},element:function(_b,_c){
_c=_c||document;
this.$=_b.nodeType?_b:_c.createElement(_b);
this.setText=function(_d){
while(this.$.childNodes.length){
this.$.removeChild(this.$.childNodes[0]);
}
this.$.appendChild(document.createTextNode(_d));
};
this.setAttribute=function(_e,_f){
this.$.setAttribute(_e,_f);
};
this.insertAfter=function(_10){
if(_10&&_10.getParent()){
_10.$.parentNode.insertBefore(this.$,_10.$.nextSibling);
}
};
this.remove=function(){
if(this.$.parentNode){
this.$.parentNode.removeChild(this.$);
}
return this.$;
};
this.getParent=function(){
return this.$.parentNode;
};
this.getDocument=function(){
return this.$.ownerDocument;
};
},walker:function(_11){
this.previous=function(){
return _11.getFirst();
};
}},getSelection:function(){
var _12={getRanges:function(){
var _13=new _1.CKEDITOR.dom.range();
_13.endContainer=new CKEDITOR.dom.element("a",document);
_13.startContainer=new CKEDITOR.dom.element("p",document);
_13.endOffset=1;
_13.startOffset=0;
return new Array(_13);
}};
return _12;
},insertElement:function(el){
if(el){
_2.appendChild(el.$);
}
this.lastInserted=el;
},insertText:function(_14){
var el=new this.dom.text(_14);
this.insertElement(el);
this.lastInserted=el;
},document:window.document,container:{$:window.document.body}}});
_1.CKEDITOR.dom.element.createFromHtml=function(_15){
var _16=dojo.toDom(_15);
return {$:_16,replace:function(_17){
return true;
},setAttribute:function(a,b){
return null;
}};
};
return _1;
}());
}

