/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2010, 2021                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

   /**
    * Legacy widget to filter and select a list of items used in Activities.
    * This widget allows single or multiple selection based on the value of the
    * <code>isSingleSelect</code> property. Each time an item is selected, the
    * <code>personSelected()</code> event is fired, with two arguments: the
    * item selected, and a flag set to <code>true</code> if the element is
    * selected, <code>false</code> if deselected.
    * <p>
    * The widget is hidden by default <em>(what were they thinking?)</em> and
    * must be displayed by calling its method <code>getList()</code>. Callers
    * must set a <code>feedFunction</code> member function that accepts a page
    * number as first argument, and a callback as second argument. The callback
    * accepts a JSON object with a <code>names</code> member, consisting of an
    * array of objects with a <code>name</code>, <code>userid</code> and an
    * optional <code>disabled</code> properties.
    * <p>
    * If the property <code>groupOptions</code> is set to an array of objects
    * with a <code>name</code> and <code>value</code> properties, it shows a
    * dropdown. Callers can connect to the <code>groupChanged()</code> event
    * to be notified of the change and receive the selected group as argument.
    * Note that the widget itself won't do anything when the user chooses a
    * different group. It's up to the caller to do something &mdash; typically
    * set a different <code>feedFunction</code>.
    * 
    * @class lconn.core.FilteringCheckbox
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @extends lconn.core.Res
    */

   dojo.provide("lconn.core.FilteringCheckbox");

   dojo.require("dijit._Widget");
   dojo.require("dijit._Templated");
   dojo.require("lconn.core.Res");
   dojo.require("dojo.regexp");
   dojo.require("lconn.core.HTMLUtil");
   dojo.require("lconn.core.globalization.bidiUtil");

   var bidiUtil = lconn.core.globalization.bidiUtil;

   // Widget declaration object
   var w = /** @lends lconn.core.FilteringCheckbox.prototype */
   {
      templatePath : dojo.moduleUrl("lconn.core", "templates/FilteringCheckbox.html")
   };

   // BASE CLASS SETTINGS

   // RESOURCE KEYS
   w.rs_filterListPrompt = "rs_filterListPrompt";
   w.rs_navPrevLabel = "rs_navPrevLabel";
   w.rs_navNextLabel = "rs_navNextLabel";
   w.rs_pagepos = "rs_pagepos";
   w.rs_loading = "rs_loading";
   w.rs_filterGroupLabel = "rs_filterGroupLabel";

   // OTHER MEMBERS
   w.gotList = false;
   w.oldTextValue = "";
   /** Form has seen input */
   w.dirty = false;
   /** current page of widget */
   w.currPage = 1;
   /** object containing list of currently selected people */
   w.peopleSelected = null;
   /** current list of people for this page */
   w.peopleList = null;
   /** the current timer for the auto name filter */
   w.filterTimer = null;
   /** how much time to wait before filtering the list after typing */
   w.autoFiltertime = 200;
   /**
    * The title to be used for logically labeling the controls in this form
    * (legend of a fieldset)
    */
   w.controlsLegend = "";
   /**
    * function that takes the current page number and a callback that will give
    * a feed of members to select from
    */
   w.feedFunction = null;
   /** If the form should be checkboxes or radio buttons. */
   w.isSingleSelect = false;
   /** When in single select mode, the text for the default option */
   w.defaultSelectText = null;
   /** When in single select mode, the value for the default option */
   w.defaultSelectValue = null;
   /** The last person selected (if any) {uuid:xxx,name:xxx} */
   w.lastPersonSelected = null;
   /**
    * Array of objects that will be used for the group selector. If null, group
    * selector will be hidden. Object form: name - group name to display value -
    * value to associate with the displayed name
    */
   w.groupOptions = null;

   w.scrollVertical = true;
   /* Flag to enable left and right arrow keys to select items */
   w.scrollHorizontal = true;

   w.firstIndex = null;
   /* Used in keyboard nav for checkboxes, current index */
   w.index = 0;
   /* List of ids to track the focusing items */
   w.indexingList = new Array();
   /* Currently focused element */
   w.currentFocusItem = null;

   // Attachpoints
   w.domNode = null;
   w.notifyList_AP = null;
   w.notifyPaging_AP = null;
   w.filterTextbox_AP = null;
   w.notifyControlsLegend_AP = null;

   w.postMixInProperties = function postMixInProperties() {
      this.loadDefaultBundle();
      var b = this.resBundle;

      // re-init resource members with actual localized strings.
      this.rs_filterListPrompt = b[this.rs_filterListPrompt];
      this.rs_navPrevLabel = b[this.rs_navPrevLabel];
      this.rs_navNextLabel = b[this.rs_navNextLabel];
      this.rs_pagepos = b[this.rs_pagepos];
      this.rs_loading = b[this.rs_loading];
      this.rs_filterGroupLabel = b[this.rs_filterGroupLabel];

   };

   w.postCreate = function postCreate() {
      this.showDefaultOption = this.defaultSelectText || this.defaultSelectValue;
      this.notifyControlsLegend_AP.innerHTML = this.controlsLegend;

      this.reset();

      // We only want keyboard navigation if the list is checkboxes, not on
      // radiobuttons.
      if (!this.isSingleSelect) {
         this.connect(this.notifyList_AP, "onkeydown", this, "onKeyDown");
      }
      // for text direction processing
      this.connect(this.filterTextbox_AP, "onkeyup", function() {
         bidiUtil.inputRTLProcessing(this.filterTextbox_AP);
      });
   };

   /** The keyboard handler for the checbox arrow navigation */
   w.onKeyDown = function onKeyDown(event) {
      var dk = dojo.keys;

      var nextArrow = dojo._isBodyLtr() ? dk.RIGHT_ARROW : dk.LEFT_ARROW;
      var prevArrow = dojo._isBodyLtr() ? dk.LEFT_ARROW : dk.RIGHT_ARROW;

      switch (event.keyCode) {
         case this.scrollHorizontal ? nextArrow : -1:
         case this.scrollVertical ? dk.DOWN_ARROW : -1:
            dojo.stopEvent(event);
            this.focusNextItem();
            break;
         case this.scrollHorizontal ? prevArrow : -1:
         case this.scrollVertical ? dk.UP_ARROW : -1:
            dojo.stopEvent(event);
            this.focusPrevItem();
            break;
      }

   };

   /** Called for the previous item in the list */
   w.focusPrevItem = function focusPrevItem() {
      // console.log("prev");
      // console.log("indexingList length: " + this.indexingList.length);

      if (this.index == 0) {
         // console.log("Index not changed");
      }
      else {
         // Get the current item selected
         var current = dojo.byId(this.indexingList[this.index]);
         this.index--;

         // Get what should be the next item
         var newItem = dojo.byId(this.indexingList[this.index]);

         // Swap the indexes
         newItem.setAttribute("tabindex", "0");
         current.setAttribute("tabindex", "-1");
         // Put focus on the new item
         newItem.focus();

      }
   };

   /** Called for the next item in the list focus */
   w.focusNextItem = function focusNextItem() {
      // console.log("next");
      // console.log("indexingList length: " + this.indexingList.length);

      if (this.index == this.indexingList.length - 1) {
         // console.log("Index not changed");
      }
      else {
         // Get the current item selected
         var current = dojo.byId(this.indexingList[this.index]);
         this.index++;

         var newItem = dojo.byId(this.indexingList[this.index]);

         newItem.setAttribute("tabindex", "0");
         current.setAttribute("tabindex", "-1");
         newItem.focus();

      }
   };

   /**
    * Method that sets the index of the currently focused and returns the
    * element
    */
   w.getCurrentSelected = function getCurrentSelected() {
      var listOfChecks = dojo.query("input[type='checkbox']", this.notifyList_AP);
      for (var i = 0; i < listOfChecks.length; i++) {
         if (listOfChecks[i].getAttribute("tabindex") == 0) {
            this.currentFocusItem = listOfChecks[i];
            this.index = i;
            return listOfChecks[i];
         }

      }
   };

   /** Populate the select form with the data from the feed function */
   w.getList = function getList() {
      if (!this.gotList) {
         this.gotList = true;
         this.access_AP.innerHTML = this.notifyList_AP.innerHTML = this.rs_loading;
         this.feedFunction(this.currPage, dojo.hitch(this, "parsePeople"));
      }
      dojo.removeClass(this.domNode, "lotusHidden");
   };

   /** Give focus to this widget */
   w.setFocus = function setFocus() {
      if (this.groupOptions) {
         dijit.focus(this.groupSelect_AP);
      }
      else {
         dijit.focus(this.filterTextbox_AP);
      }
   }

   /** Get if the form has been modified */
   w.isDirty = function isDirty() {
      return this.dirty;
   };

   /**
    * Disable or enable the form
    * 
    * @param {Boolean}
    *           disabled set true if the form should be disabled, false if
    *           enabled.
    */
   w.setDisabled = function setDisabled(disabled) {
      var members = document.getElementsByName(this.id + "notifyPerson");
      var buttons = document.getElementById(this.id + "pagingButtons");
      if (disabled) {
         dojo.addClass(this.notifyList_AP, "disabled");
         if (buttons)
            dojo.addClass(buttons, "lotusHidden");
      }
      else {
         dojo.removeClass(this.notifyList_AP, "disabled");
         if (buttons)
            dojo.removeClass(buttons, "lotusHidden");
      }
      this.filterTextbox_AP[(disabled ? "setAttribute" : "removeAttribute")]('disabled', true);
      this.groupSelect_AP[(disabled ? "setAttribute" : "removeAttribute")]('disabled', true);
      for (var i = 0; i < members.length; i++) {
         // do nothing if checkbox should always be disabled
         if (!dojo.hasAttr(members[i], "alwaysDisable")) {
            members[i][(disabled ? "setAttribute" : "removeAttribute")]('disabled', true);
            var label = document.getElementById(members[i].id + "Label");
            if (label) {
               label[(disabled ? "setAttribute" : "removeAttribute")]('disabled', true);
            }
            if (disabled) {
               members[i].checked = false;
            }
            else {
               members[i].checked = !!this.peopleSelected[members[i].value];
            }
         }
      }
   };

   /** Reset the form to original state */
   w.reset = function reset() {
      this.currPage = 1;
      this.gotList = false;
      this.peopleList = null;
      this.peopleSelected = {};
      this.filterTextbox_AP.value = this.rs_filterListPrompt;
      dojo.addClass(this.filterTextbox_AP, "lotusInactive");
      this.oldTextValue = "";
      if (this.filterTimer) {
         window.clearTimeout(this.filterTimer);
      }
      // if person selected not set, and single select, pick default person
      if (this.isSingleSelect) {
         if ((!this.lastPersonSelected || !this.lastPersonSelected.uuid) && this.showDefaultOption) {
            this.lastPersonSelected = {
               uuid : this.defaultSelectValue,
               name : this.defaultSelectText
            };
         }
         if (this.lastPersonSelected && this.lastPersonSelected.uuid) {
            this.peopleSelected[this.lastPersonSelected.uuid] = this.lastPersonSelected.name;
         }
      }

      if (this.groupOptions) {
         this.groupSelect_AP.options.length = 0;
         for (var i = 0; i < this.groupOptions.length; ++i) {
            this.groupSelect_AP.options[this.groupSelect_AP.options.length] = new Option(this.groupOptions[i].name, this.groupOptions[i].value);
         }
         this.groupSelect_AP.style.display = "";
         dojo.query(".lotusSearch", this.domNode).addClass("hasGroup");
      }
      this.access_AP.innerHTML = "";
   };

   /**
    * Set the selected item as selected or unselected. Does not fire
    * personSelected. For single select you can only select an item, not
    * deselect.
    * 
    * @param {Object}
    *           itemObj an object representing the item with properties uuid -
    *           the uuid of the item to select
    * @param {Boolean}
    *           selected true to select, false to remove selection
    */
   w.selectItem = function selectItem(itemObj, selected) {
      var item = dojo.byId(this.id + "notifyCheckbox" + itemObj.uuid);
      if (item) {
         item.checked = selected;
      }
      this._setItemSelected(itemObj, selected);
   };

   /**
    * Listen to this method to be notified when the user selects someone from
    * the group drowpdown.
    * 
    * @param {Object}
    *           group value of the group option
    */
   w.groupChanged = function groupChanged(group) {};

   /**
    * Listen to this method to determine when a user is selected/deselected
    * 
    * @param {Object}
    *           person the person object
    * @param {Boolean}
    *           selected true if selected, false otherwise
    */
   w.personSelected = function personSelected(person, selected) {};

   /* get the selected group when selection changes */
   w._optionChanged = function _optionChanged(event) {
      var option = this.groupSelect_AP.options[this.groupSelect_AP.selectedIndex];
      // reset page num
      this.currPage = 1;
      this.groupChanged({
         name : option.text,
         value : option.value
      });
   };

   /* ready the search field when focused */
   w.readySearch = function readySearch(event) {
      if (dojo.hasClass(this.filterTextbox_AP, "lotusInactive")) {
         window.setTimeout(dojo.hitch(this, function() {
            this.filterTextbox_AP.select();
         }), 0);
      }
   };

   w.timedFilter = function timedFilter(event) {
      dojo.removeClass(this.filterTextbox_AP, "lotusInactive");
      dojo.removeClass(this.notifyList_AP, "lconnReady");
      if (this.filterTimer) {
         // reset the timer when the user types so we don't search too often
         window.clearTimeout(this.filterTimer);
         this.filterTimer = null;
      }
      this.filterTimer = window.setTimeout(dojo.hitch(this, 'filterNames'), this.autoFiltertime);
   };

   w._onBlur = function _onBlur(event) {
      // keep the inactive class turned on if user blurs without a change
      if (this.filterTextbox_AP.value == this.rs_filterListPrompt) {
         dojo.addClass(this.filterTextbox_AP, "lotusInactive");
      }
   };

   w.filterNames = function filterNames(event) {
      if (this.peopleList && this.filterTextbox_AP && this.filterTextbox_AP.value != this.oldTextValue
            && this.filterTextbox_AP.value != this.rs_filterListPrompt) {
         this.oldTextValue = this.filterTextbox_AP.value;
         this.showList(this.peopleList);
      }
   };

   w.parsePeople = function parsePeople(feed) {
      this.peopleList = feed;
      this.showList(feed);
   };

   w.showList = function showList(feed) {
      // clear the old list
      this.notifyList_AP.innerHTML = "";
      if (feed) {
         var userid, node, opt, label, searchRegex, searchString;
         if (!dojo.hasClass(this.filterTextbox_AP, "lotusInactive")) {
            searchString = this.filterTextbox_AP.value;
         }
         if (searchString) {
            // SPR #SYEE7S3S9V escape regex chars
            searchString = dojo.regexp.escapeString(searchString);
            var tokens = searchString.replace(/\s+/g, " ").split(" ");
            searchString = "(?=.*" + tokens.join(")(?=.*") + ")";
            searchRegex = new RegExp(searchString, "i");
         }

         var totalResults = feed.totalResults || feed.names.length
         var numResults = feed.names.length;
         this._currPeople = {};
         // if single select, setup the default option on first page only
         if (this.isSingleSelect && this.showDefaultOption) {
            ++totalResults;
            if (this.currPage == 1 && !searchRegex) {
               var fakeperson = this._getDefaultPerson();
               this.createOption(fakeperson);
               ++numResults;
            }
         }
         // Add the rest of the names
         for (var i = 0; i < feed.names.length; i++) {
            if (searchRegex) {
               var eml = feed.names[i].email;
               if (eml)
                  eml = eml.substring(0, eml.indexOf("@"));
               // skip names that don't match the search term
               if (!searchRegex.test(feed.names[i].name) && !searchRegex.test(eml)) {
                  --numResults;
                  continue;
               }
            }

            if (i == 0) {
               this.firstIndex = this.id + "notifyCheckbox" + feed.names[i].userid;
            }
            this.indexingList[i] = this.id + "notifyCheckbox" + feed.names[i].userid;

            this.createOption(feed.names[i]);
         }
         if (numResults == 0) {
            this.notifyList_AP.innerHTML = this.resBundle.rs_noResults;
         }
         dojo.addClass(this.notifyList_AP, "lconnReady");

         // show paging, if needed
         if (feed.hasNext || feed.hasPrev) {
            this.notifyPaging_AP.innerHTML = "";
            var pagingText = "";
            if (feed.startIndex && feed.totalResults) {
               var pageStart = feed.startIndex;
               var pageEnd = pageStart + feed.names.length - 1;
               pagingText = dojo.string.substitute(this.rs_pagepos, [
                     pageStart,
                     pageEnd,
                     feed.totalResults
               ]);
            }
            var pages = document.createTextNode(pagingText);
            var buttons = document.createElement('ul');
            buttons.id = this.id + "pagingButtons";
            buttons.className = "lotusRight lotusInlinelist";

            var link = document.createElement('a');
            link.innerHTML = this.rs_navNextLabel;
            link.href = "javascript:void(0)";
            link.onclick = dojo.hitch(this, "notifyNext");
            // RTC 63768 Added role button
            link.setAttribute("role", "button");
            var next = document.createElement('li');
            next.appendChild(link);

            link = document.createElement('a');
            link.innerHTML = this.rs_navPrevLabel;
            link.href = "javascript:void(0)";
            link.onclick = dojo.hitch(this, "notifyPrev");
            // RTC 63768 Added role button
            link.setAttribute("role", "button");
            var prev = document.createElement('li');
            prev.appendChild(link);

            if (feed.hasPrev) {
               buttons.appendChild(prev);
               dojo.addClass(prev, "lotusFirst");
            }
            if (feed.hasNext) {
               buttons.appendChild(next);
               if (!feed.hasPrev) {
                  dojo.addClass(next, "lotusFirst");
               }
            }
            this.notifyPaging_AP.appendChild(buttons);
            this.notifyPaging_AP.appendChild(pages);
            dojo.removeClass(this.notifyPaging_AP, "lotusHidden");
         }
         else {
            dojo.addClass(this.notifyPaging_AP, "lotusHidden");
         }

         // update accessibility text
         this.access_AP.innerHTML = dojo.string.substitute(this.resBundle.rs_numResults, [
               numResults,
               totalResults
         ]);
      }

      if (this.isSingleSelect) {
         this.getCurrentSelected();
      }
   };

   /**
    * Create one of the options for the select
    * 
    * @param {Object}
    *           person the person
    */
   w.createOption = function createOption(person) {
      var username = person.name;
      var userid = person.userid;
      var node, opt, label;
      var id = userid;
      // this class has a bug where it takes in a userid, but gives a uuid. Fix
      // this madness by sending both.
      person.uuid = userid;

      this._currPeople[userid] = person;

      node = document.createElement('div');
      node.className = "lotusLeft";
      if (this.isSingleSelect) {
         if (dojo.isIE < 9) {
            opt = document.createElement('<input type="radio" name="assignToGroup" />');
         }
         else {
            opt = document.createElement('input');
         }
         opt.type = "radio";
         opt.name = "assignToGroup";
      }
      else {
         node.className = "lconnNotify lotusLeft";
         if (dojo.isIE < 9) {
            opt = document.createElement("<input name='" + this.id + "notifyPerson'>");
         }
         else {
            opt = document.createElement('input');
            opt.setAttribute("name", this.id + "notifyPerson");
         }
         opt.className = "lotusLeft";
         opt.type = "checkbox";
      }
      opt.id = this.id + "notifyCheckbox" + id;
      opt.value = userid;
      this.connect(opt, 'onclick', "setValue");
      this.connect(opt, 'onclick', 'setDirty');
      label = document.createElement('label');
      label.innerHTML = bidiUtil.enforceTextDirection(lconn.core.HTMLUtil.escapeText(username));
      label.htmlFor = opt.id;
      label.id = opt.id + "Label";
      label.className = "lotusCheckbox";
      dojo.style(label, "position", "static");
      // RTC 53486 - Long names don't display in the box with 23 or more
      // characters, adding hover text.
      label.title = bidiUtil.enforceTextDirection(username);
      if (!this.isSingleSelect) {
         dojo.addClass(label, "lotusLeft");
      }
      if (person.disabled) {
         opt.setAttribute("disabled", true);
         label.setAttribute("disabled", true);
         opt.setAttribute("alwaysDisable", true);
         label.setAttribute("alwaysDisable", true);
      }
      node.appendChild(opt);
      node.appendChild(label);
      this.notifyList_AP.appendChild(node);

      if (this.isSingleSelect) {
         dojo.create("div", {
            "class" : "lotusClear"
         }, this.notifyList_AP);
      }

      if (this.peopleSelected[userid]) {
         if (person.disabled) {
            // person is disabled, need to remove the old selection
            if (this.isSingleSelect) {
               if (this.showDefaultOption) {
                  var dperson = this._getDefaultPerson();
                  // need to select the default option, if there is one
                  this.selectItem(dperson, true);
                  // fire to notify subscribers
                  this.personSelected(dperson, true);
               }
               else {
                  console.warn("selected item is disabled and no default selection. select state inavlid.")
               }
            }
            else {
               this._doSelectPerson(person, false);
            }
         }
         else {
            // SPR #DJOS7NWRZ2: for IE checked has to be set after adding to dom
            opt.checked = true;
         }
      }
   };

   /* set the form dirty */
   w.setDirty = function setDirty() {
      this.dirty = true;
   };

   w.setValue = function setValue(event) {
      var person;
      if (this._currPeople[event.target.value]) {
         person = this._currPeople[event.target.value];
      }
      else {
         // this should not happen - somehow a person was selected that we don't
         // have an entry for
         person = {
            uuid : event.target.value,
            name : document.getElementById(event.target.id + "Label").innerHTML
         };
      }
      this._doSelectPerson(person, event.target.checked)
   };

   w._doSelectPerson = function _doSelectPerson(person, selected) {
      if(!selected) {
		   var selectAll = document.getElementById('select_all');
         if(selectAll) {
            selectAll.checked = false;
         }
      }
      this._setItemSelected(person, selected);
      this.personSelected(person, selected);
   };

   w._setItemSelected = function _setItemSelected(person, selected) {
      if (this.isSingleSelect) {
         // remove old person
         if (this.lastPersonSelected && this.lastPersonSelected.uuid) {
            delete this.peopleSelected[this.lastPersonSelected.uuid];
         }
         // set new person
         this.lastPersonSelected = person;
         this.peopleSelected[person.uuid] = person.name;
      }
      else {
         if (selected) {
            this.peopleSelected[person.uuid] = person.name;
         }
         else {
            delete this.peopleSelected[person.uuid];
         }
      }
   };

   w._getDefaultPerson = function _getDefaultPerson() {
      return {
         name : this.defaultSelectText,
         userid : this.defaultSelectValue,
         uuid : this.defaultSelectValue
      };
   }

   w.clearSearch = function clearSearch() {
      dojo.addClass(this.filterTextbox_AP, "lotusInactive");
      this.filterTextbox_AP.value = this.rs_filterListPrompt;
   };

   w.notifyNext = function() {
      this.clearSearch();
      // clear the old list
      this.notifyList_AP.innerHTML = "";

      ++this.currPage;
      this.gotList = false;
      this.getList();
   };

   w.notifyPrev = function() {
      this.clearSearch();
      // clear the old list
      this.notifyList_AP.innerHTML = "";

      if (this.currPage > 1) {
         --this.currPage;
      }
      this.gotList = false;
      this.getList();
   };

   dojo.declare("lconn.core.FilteringCheckbox", [
         dijit._Widget,
         dijit._Templated,
         lconn.core.Res
   ], w);

})();
