/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.             */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/string",
	"ic-core/Paging"
], function (declare, lang, domConstruct, domClass, string, CenterPaging) {
	
	var Paging = declare(
		"lconn.search.Paging",
		CenterPaging,
	{
		performPagination: function(){}, 	// Function callback to perform pagination of search results
		_nextNode: null,
		_prevNode: null,
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this.url = "javascript:;";
			this.stopNavigation = true;
		},
		
		postCreate: function() {
			if(this._prevNode && this._nextNode && this._prevNode.innerHTML && this._nextNode.innerHTML) {
				var prevLi = domConstruct.create("li", {"class": "icPrev lotusFirst", innerHTML: this._prevNode.innerHTML});
				var nextLi = domConstruct.create("li", {"class": "icNext", innerHTML: this._nextNode.innerHTML});
				domConstruct.place(prevLi, this.domNode, "first");
				domConstruct.place(nextLi, this.domNode);
			}
		},
	
		onPageSelected: function(pageNo) {
			this.performPagination(pageNo, this.id);
		},
		
		_createListItem: function(pageNo, className) {
			if(!this._nextNode || !this._prevNode) {
				this.inherited(arguments);
				return;
			}
			if (pageNo <= 0 || pageNo <= this._rendered || pageNo > this.maxPage) {
				return;
			}
			
			var li = domConstruct.create("li");
			if (pageNo != this.currentPage) {
				var a = domConstruct.create("a", {innerHTML: pageNo});
				if (pageNo === this.currentPage - 1){
					this._focusNode = a;
				}
				a.setAttribute("href", string.substitute(this.url, [pageNo]));
				this.connect(a, 'onclick', '_onPageClick');
				domConstruct.place(a, li);
			} else {
				li.innerHTML = pageNo;
				domClass.add(li, "icSelected");
			}
			
			domClass.add(li, "icNoBorder");
			if (className && pageNo !== 1){
				domClass.add(li, className);
			}
			domConstruct.place(li, this.domNode);
			
			this._rendered = pageNo;
		}
	
	});
	
	return Paging;
});
