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

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-class",
      "dojo/_base/lang",
      "dojo/query",
      "dojo/topic",
      "dijit/_Templated",
      "dijit/_Widget",
      "ic-core/HTMLUtil",
      "ic-core/NameUtil",
      "ic-core/Res",
      "ic-core/aria/_Helper",
      "ic-core/globalization/bidiUtil"
], function(dojo, declare, dom, domAttr, domClass, lang, query, topic, _Templated, _Widget, HTMLUtil, NameUtil, Res, _Helper, bidiUtil) {

   /**
    * A widget for showing a list of peoples' names using the lotusFilter class.
    * 
    * @class ic-core.PeopleFilterList
    * @author Alexander Rock <arock@us.ibm.com>
    */
   w = {};
   w.templateString = "<div class='lotusFilters2' aria-relevant='removals' aria-live='polite' role='listbox'></div>";

   /** display a biz card on a person's name */
   w.showBizCard = true;

   /**
    * Set focus on this node after the last item is removed.
    */
   w.focusAfterRemoveNode = null;

   /** Count of the people in the list */
   w.count = 0;

   w.postMixInProperties = function postMixInProperties() {
      this.loadDefaultBundle();
      var b = this.resBundle;
      this.rs_removeFilter = b.rs_removeFilter;
   };

   w.optionOrder = {};
   /**
    * add a person to the filter list.
    * 
    * @param personObj
    *           object representing a person with params uuid - the uuid of the
    *           person name - the display name of the person email - (optional)
    *           email address of the person noCard - (optional) don't generate a
    *           biz card for this person
    */
   w.addPerson = function addPerson(personObj) {
      if (this.count > 0) {
         // SPR #SYEE8987AB
         this.domNode.appendChild(document.createTextNode(" "));
      }
      // create filter link
      var link = document.createElement('a');
      link.className = "lotusFilter";
      link.href = "#userid";
      // #SYEE8FWLGM Communities and Groups might not have a uuid property.
      if (personObj.uuid) {
         link.id = this.id + "-filter" + personObj.uuid;
      }
      else if (personObj.userid) {
         link.id = this.id + "-filter" + personObj.userid;
      }
      else if (personObj.email) {
         link.id = this.id + "-filter" + personObj.email.replace("@", "_");
      }
      else {
      }
      link.setAttribute("role", "option");
      link.setAttribute("aria-label", "Press delete to delete " + this.rs_removeFilter + " " + personObj.name);
      this.connect(link, 'onclick', lang.hitch(this, '_onNameClick', personObj));
      this.connect(link, 'onkeydown', lang.hitch(this, '_onNameKeyDown', link, personObj));
      // actual link contents
      var span = document.createElement('span');
      if (this.showBizCard && !personObj.noCard) {
         span.innerHTML = NameUtil.getHTML(personObj.name, personObj.email, personObj.uuid);
      }
      else {
         span.innerHTML = HTMLUtil.escapeText(personObj.name);
         domClass.add(span, "bidiAware");
      }
      link.appendChild(span);
      bidiUtil.enforceTextDirectionOnPage(link);
      // close button image RTC 74069 Switching to the new one ui styles.
      var closeImg = document.createElement("img");
      closeImg.src = this._blankGif;
      closeImg.className = "lotusDelete";
      closeImg.alt = "";
      link.appendChild(closeImg);
      // high contrast close button
      var closeBttn = document.createElement('span');
      closeBttn.className = "lotusAltText";
      closeBttn.setAttribute("role", "presentation");
      // putting a second RLM after the X fixes two filters next to another in
      // IE and FF
      closeBttn.innerHTML = dojo._isBodyLtr() ? "X" : "&rlm;X&rlm;";
      link.appendChild(closeBttn);

      this.domNode.appendChild(link);

      if (this.showBizCard && window.SemTagSvc && SemTagSvc.parseDom) {
         SemTagSvc.parseDom(0, link);
      }
      query("a", link).forEach(function(node) {
         // If user have bizcard, set it can't be tabed, set link's bizCard and
         // append aria-label info
         domAttr.set(node, "tabindex", -1);
         if (!link.bizCard) {
            link.bizCard = node;

            var linkLabel = domAttr.get(link, "aria-label");
            var bizLabel = domAttr.get(node, "aria-label") || domAttr.get(node, "title");
            linkLabel = linkLabel + ", press enter to popup " + bizLabel;
            domAttr.set(link, "aria-label", linkLabel);
         }
      });

      this.optionOrder[link.id] = this.count;
      this.count++;
      this._resetKeys();
   };
   w._onNameKeyDown = function(link, personObj, e) {
      var dk = dojo.keys;

      // We are not interested in events with modifiers
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey)
         return;

      if (e.keyCode == dk.ENTER) {// press Enter to popup business card
         if (link.bizCard) {
            e.preventDefault(), e.stopPropagation();
            if (link.bizCard.click)
               link.bizCard.click();
         }
      }
      else if (e.keyCode == dk.DELETE) {// press Delete key to delete the
         // selected person
         this._onNameClick(personObj, e);
      }

   };

   /**
    * Remove a person with the given uuid from the filter list. Does not call
    * onPersonRemoved.
    * 
    * @param personObj
    *           object representing person to remove with params uuid - uuid of
    *           person to remove
    */
   w.removePerson = function removePerson(personObj) {
      // #SYEE8FWLGM Communities and Groups might have a uuid property so check
      // for userid.
      var optionId = null;
      if (personObj.uuid) {
         optionId = this.id + "-filter" + personObj.uuid;
      }
      else if (personObj.userid) {
         optionId = this.id + "-filter" + personObj.userid;
      }
      else if (personObj.email) {
         optionId = this.id + "-filter" + personObj.email.replace("@", "_");
      }
      else {
      }

      if (optionId) {
         var person = dom.byId(optionId);
         if (person) {
            this.domNode.removeChild(person);
            var order = this.optionOrder[optionId];
            var self = this;
            // for node which order is larger than removed node, set order--
            query('[role$=\'option\']', this.domNode).forEach(function(node) {
               var id = domAttr.get(node, "id");
               if (self.optionOrder[id] && self.optionOrder[id] > order)
                  self.optionOrder[id]--;
            });
            this.count--;
            if (order)
               order = order % this.count;
            this._resetKeys(order);
         }
      }
   };

   /**
    * Listen to this method for when a user clicks the "x" next to a person's
    * name
    * 
    * @param personObj
    *           the original person object
    */
   w.onPersonRemoved = function onPersonRemoved(personObj) {};

   /* respond to user click by removing person */
   w._onNameClick = function _onNameClick(personObj, event) {
      event.preventDefault(), event.stopPropagation();
      // move focus to the next item, if there is one
      if (this.count > 1) {
         this._keyHelper.focusNextItem();
      }
      else if (this.focusAfterRemoveNode) {
         // if a node was given to focus on after the last removal, focus it now
         window.setTimeout(lang.hitch(this, function() {
            dijit.focus(this.focusAfterRemoveNode);
         }), 0);
      }
      // do the removal
      this.removePerson(personObj);
      this._keyHelper.focus();
      this.onPersonRemoved(personObj);
   };

   w._resetKeys = function _resetKeys(selIdx) {
      if (this._keyHelper) {
         this._keyHelper.destroy();
      }
      if (this.count > 0) {
         // only create a keyboard helper if we have items to navigate with the
         // keyboard
         this._keyHelper = new _Helper(this.domNode, {
            containerRole : "listbox",
            itemRole : "option",
            selIdx : selIdx || -1
         });
      }
   };

   /**
    * Returns the count of people in the list
    */
   w.getCount = function getCount() {
      return this.count;
   };

   /**
    * Clears the container of all the names and resets the counter to zero.
    */
   w.reset = function reset() {
      this.domNode.innerHTML = '';
      this.count = 0;
      this._resetKeys();
   };

   var PeopleFilterList = declare("lconn.core.PeopleFilterList", [
         _Widget,
         _Templated,
         Res
   ], w);
   return PeopleFilterList;
});
