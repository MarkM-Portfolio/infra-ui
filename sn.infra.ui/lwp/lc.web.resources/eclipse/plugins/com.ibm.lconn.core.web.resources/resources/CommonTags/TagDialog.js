/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.CommonTags.TagDialog");

dojo.require("dijit.Dialog");
dojo.require("lconn.core.CommonTags.AjaxCall");

dojo.declare("lconn.core.CommonTags.TagDialog", [dijit._Widget], {

	 dialogTemplate : ['<div class="lotusDialogBorder" style="width: 650px;">',
                       '<div class="lotusDialog">',
                           '<div class="lotusDialogHeader">',
                              '<h1 class="lotusHeading">${nls.rs_tagDialogTitle}</h1>',
                              '<a class="lotusDialogClose" role="button" href="javascript:void(0);" title="${nls.rs_tagDialogCloseTile}">',
                                 '<img src="${_blankGif}" alt="${nls.rs_tagDialogCloseTile}" role="presentation" />',
                                 '<span class="lotusAltText">X</span>',
                              '</a>',
                           '</div>',
                           '<div class="lotusDialogContent">',                               
                               '<div class="lotusTagCloud"></div>',
                           '</div>',
                           '<div class="lotusPaging" role="navigation"><div class="lotusLeft"></div>',
                           '<ul style="" class="lotusRight lotusInlinelist">',
                               '<li class="lotusFirst" style="display:none"><a href="javascript:void(0);">${nls.rs_navPrevLabel}</a></li>',
                               '<li style="display:none"><a href="javascript:void(0);">${nls.rs_navNextLabel}</a></li>',
                           '</ul></div>',
                       '</div>',
                   '</div>'].join(''),
ajaxCall:null,
feedConverter:null,
dialog:null,
page:1,
numPerPage:100,
total:0,
totalPage:0,
tagWidget:null,
searchBox:null,
searchText:'',

postMixInProperties: function() {
   this.nls = dojo.i18n.getLocalization('lconn.core', 'strings');
},

postCreate: function(){
	this.dialog = new dijit.Dialog();
   this.dialog.containerNode.innerHTML = dojo.string.substitute(this.dialogTemplate, this);

    this.dialog.connect(dojo.query('.lotusDialogClose', this.dialog.containerNode)[0], 'onclick', 'onCancel');
    this.content = dojo.query(".lotusTagCloud", this.dialog.containerNode)[0];
    this.searchBox = dojo.query(".lotusSearch", this.dialog.containerNode)[0];
    //this.filter = dojo.query(".lotusFilters", this.searchBox)[0];
    dojo.connect(dojo.query('input[name="submit"]', this.searchBox)[0], 'onclick', dojo.hitch(this, function(evt){dojo.stopEvent(evt);this.search();}));
    this.footer = dojo.query(".lotusPaging", this.dialog.containerNode)[0];
	var previous = dojo.query('li', this.footer)[0];
	dojo.connect(dojo.query('a', previous)[0], "onclick", this, this.previous);
    var next = dojo.query('li', this.footer)[1];
	dojo.connect(dojo.query('a', next)[0], "onclick", this, this.next);
},


reset:function() {
   this.page = 1;
   this.searchText = '';
   dojo.query('input[type="text"]', this.searchBox)[0].value = '';
   //var filterDom = dojo.query(".lotusFilters", this.searchBox)[0];
   //filterDom.innerHTML = '';
   this.content.innerHTML='<img src="'+this._blankGif+'" alt="" class="lotusLoading" />'+this.nls.rs_loading;        
},

updatePageNumber:function(count) {
   this.total = count;
   this.totalPage = Math.ceil(this.total/this.numPerPage);            
   this.updateFooter();
},

updateFooter:function() {        
   var pageInfo = dojo.query('.lotusLeft', this.footer)[0];
   
   var v1 = 1 + (this.page - 1) * this.numPerPage;
   var v2 = this.page*this.numPerPage < this.total?this.page*this.numPerPage:this.total;
   var v3 = this.total;
   pageInfo.innerHTML= dojo.string.substitute(this.nls.rs_tagDialogPageInfo, [v1, v2, v3]);

   var previous = dojo.query('li', this.footer)[0];
   var next = dojo.query('li', this.footer)[1];
   if (this.page > 1) {
       dojo.addClass(previous, 'lotusFirst');
		previous.style.display='inline';
   } else {
       previous.style.display='none';
   }
	
	if (this.page == 1) dojo.addClass(next, 'lotusFirst');
	else dojo.removeClass(next, 'lotusFirst');
		
   if (this.page < this.totalPage) {			
		next.style.display='inline';
   } else {			
       next.style.display='none';
   }
},

updateContent:function(data) {
	var parsedTags = null;
	if(this.ajaxCall.HANDLE_AS == 'json'){
		parsedTags= data;
	}else{
		parsedTags = this.feedConverter.parseFeed(data);
	}	 
  
   this.content.innerHTML='';
   var tags = lconn.core.CommonTags.TagTransform.getCloudTags(parsedTags);
   for (var i=0; i<tags.length; i++) {
       var span = document.createElement('span');
       var a = document.createElement('a');
       dojo.attr(a, {
           title:tags[i].frequency,
           'class':'lotusF'+tags[i].intensityBin,
           href:'javascript:void(0);',
           innerHTML:tags[i].name
       });
       dojo.place(a, span);
       span.innerHTML = ' ' + span.innerHTML + ' ';
       a = dojo.query('a',span)[0];
       dojo.connect(a, 'onclick', dojo.hitch(this, function(evt){dojo.stopEvent(evt); this.dialog.onCancel(); this.tagWidget._addSelectedTag(dojo.string.trim(evt.target.innerHTML));}));
       dojo.place(span, this.content);
   }        
},

footerLoading:function() {
   var pageInfo = dojo.query('.lotusLeft', this.footer)[0];
   pageInfo.innerHTML = '<img alt="" src="'+this._blankGif+'" class="lotusLoading" />';
},    

requestTagsCount: function() {
   var callBack = dojo.hitch(this, this.updatePageNumber);
   this.ajaxCall.getTotalTagNumber(callBack, this.searchText);
},

requestTags: function() {
   var callBack = dojo.hitch(this, this.updateContent);
   this.ajaxCall.getPageTags(callBack, this.page, this.numPerPage, this.searchText);
},

show:function() {
   this.reset();
   this.dialog.show();    
   this.requestTags();
   this.requestTagsCount();
},

search:function() {
   this.page = 1;
   this.searchText = dojo.string.trim(dojo.query('input[type="text"]', this.searchBox)[0].value);
   dojo.query('input[type="text"]', this.searchBox)[0].value = '';
   var filterDom = dojo.query(".lotusFilters", this.searchBox)[0];
   filterDom.innerHTML = '<a href="javascript:void(0);" class="lotusFilter">'+this.searchText+'<span class="lotusClose">X</span></a>';
   dojo.connect(dojo.query('a.lotusFilter', filterDom)[0], 'onclick', this, this.cancelSearch);
   filterDom.style.display = "inline";
   this.requestTags();
   this.requestTagsCount();
},

cancelSearch:function() {
   this.page = 1;
   this.searchText = '';
   dojo.query('input[type="text"]', this.searchBox)[0].value = '';
   var filterDom = dojo.query(".lotusFilters", this.searchBox)[0];
   filterDom.innerHTML = '';
   filterDom.style.display = "none";
   this.requestTags();
   this.requestTagsCount();
},

previous:function() {	
   this.footerLoading();
   this.page --;
   this.requestTags();
   this.updateFooter();
},

next:function() {
   this.footerLoading();
   this.page ++;
   this.requestTags();
   this.updateFooter();
}

});
