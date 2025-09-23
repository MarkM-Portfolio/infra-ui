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

dojo.provide("lconn.core.Paging");

dojo.require("dojo.string");
dojo.require("dojo.query");
dojo.require("dijit._Widget");
dojo.require("lconn.core.Res");

/**
 * Render the center paging control in the OneUI style.
 * 
 * FIXME: this module is inconsistent. Rename class to lconn.core.Paging, rename
 * file to CenterPaging.
 * 
 * @class lconn.core.CenterPaging
 * @extends dijit._Widget
 * @extends lconn.core.Res
 */
dojo.declare("lconn.core.CenterPaging", [ dijit._Widget, lconn.core.Res ], /** @lends lconn.core.CenterPaging.prototype */ {

    _rendered : 0,
    /** the currently selected page number */
    currentPage : 1,
    /** the maximum page number */
    maxPage : 10,
    /** If ture, render a bottom control, otherwise a top control. False by default. */
    isBottom: false,
    /**
     * Use this url as the href for links in this control, replacing ${0} with
     * the selected pae number.
     */
    url: "#",
    /**
     * If true, the widget won't navigate to the supplied url.  The url will
     * still be used as the href in urls to allow for opening in new windows/tabs.
     * false by default.
     */
    stopNavigation: false,

    buildRendering : function() {
        this.inherited(arguments);
        this.loadDefaultBundle();
        if(this.isBottom){
            this.domNode= dojo.create("div");

            //create jump control
            var input = "<input id='"+this.id+"-jumper' type='text' value='"+this.currentPage+"' aria-label='"+this.resBundle.rs_jumpPageLabel+"'>";
            this.domNode.innerHTML = dojo.string.substitute(this.resBundle.rs_jumpPage,[input, this.maxPage]);
            var x = dojo.query("input", this.domNode)
            this.connect(x[0],"onkeypress","_jumpKeypress");
        }else{
            this.domNode = dojo.create("ul");
            dojo.addClass(this.domNode,"lotusInlinelist pageListNode")

            // render start
            this._createListItem(1,'lotusFirst');
            if (this.currentPage <= 4) {
                var i;

                for (i = 2; i <= 5; i++) {
                        this._createListItem(i);
                }
            } else {
                this._createDummyListItem();
            }

            // render middle
            if (this.currentPage <= 4 && this.maxPage > 4) {
                this._createDummyListItem();
            } else if (this.currentPage < this.maxPage - 3) {
                this._createListItem(this.currentPage - 2,'lotusFirst');
                for (i = this.currentPage - 1; i - 2 <= this.currentPage; i++) {
                        this._createListItem(i);
                }
            }

            // render end
            if (this.currentPage >= this.maxPage - 3) {
                this._createListItem(this.maxPage - 5,'lotusFirst');
                for (i = this.maxPage - 4; i <= this.maxPage; i++) {
                        this._createListItem(i);
                }
            } else if (this.currentPage > 4) {
                this._createDummyListItem();
            }
            this._createListItem(this.maxPage,'lotusLast');
        }
    },

    focus : function(){
      if (this._focusNode){
         this._focusNode.focus();
      } else {
         var filters = dojo.query("a", this.domNode);
         if (filters && filters.length > 0){
            filters[0].focus();
         }
      }
    },

    /** dummy method for listening to page number requests */
    onPageSelected: function(pagenum){},

    _createDummyListItem : function(){
        if (this._rendered >= this.maxPage)
           return;

        var li = dojo.create("li", {innerHTML : '...'});
        dojo.addClass(li,"lotusLast");
        dojo.place(li, this.domNode);
    },

    _createListItem : function(pageNo,className) {
        if (pageNo <= 0 || pageNo <= this._rendered || pageNo > this.maxPage) {
            return;
        }

        var li = dojo.create("li");
        if (pageNo != this.currentPage) {

            if (pageNo === 1){
                li.innerHTML = this.resBundle.rs_pageLabel+"&nbsp;";
            }

            var a = dojo.create("a", {innerHTML : pageNo});
            if (pageNo === this.currentPage - 1){
               this._focusNode = a;
            }
            a.setAttribute("href", dojo.string.substitute(this.url,[pageNo]));
            this.connect(a,'onclick','_onPageClick');
            dojo.place(a, li);
        } else {
            if (pageNo === 1){
                li.innerHTML = this.resBundle.rs_pageLabel+"&nbsp;"+pageNo;
            } else {
                li.innerHTML = pageNo;
            }
        }

        if (className){
            dojo.addClass(li,className);
        }
        dojo.place(li, this.domNode);

        this._rendered = pageNo;
    },

    _onPageClick: function(event){
        if(this.stopNavigation){
            dojo.stopEvent(event);
        }
        this.onPageSelected(dojo.trim(event.target[dojo.isIE?'innerText':'textContent']));
    },

    _jumpKeypress: function(event){
        if ( event.keyCode == dojo.keys.ENTER ) {
            dojo.stopEvent(event);
            var num = parseInt(dojo.byId(this.id+"-jumper").value);
            if(num>0 && num<=this.maxPage){
                this.onPageSelected(num);
                if(!this.stopNavigation){
                    window.location = dojo.string.substitute(this.url,[num]);
                }
            }
        }
    }
});
