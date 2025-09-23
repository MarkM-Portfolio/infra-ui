/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Connections Search Bar widget
 * @class lconn.core.SearchBar
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @extends lconn.core.peopleFinder.directory.PeopleFinderSearchBox
 * @author Ryan Silva <rsilva@us.ibm.com>
 */

dojo.provide("lconn.core.SearchBar");

dojo.require("dijit._Templated");
dojo.require("dijit.Menu");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.TextBox");

dojo.require("lconn.core.typeahead.TypeAheadManager");
dojo.require("lconn.core.peopleFinder.directory.PeopleFinderService");
dojo.require("lconn.core.quickResults.QuickResultsService");

dojo.requireLocalization("lconn.core","SearchBar");

dojo.declare("lconn.core.SearchBar", [lconn.core.typeahead.TypeAheadManager, dijit._Templated], /** @lends lconn.core.SearchBar.prototype */ {

   templatePath: dojo.moduleUrl("lconn.core", "templates/SearchBar.html"),

    //NOTE:
    //Should you introduce a customizable name for the field that contains the query term in SearchBar.js
    //(right now, its name is the immutable "query") it will be "param", and will be written to Javascript
    //by ExternalSearchTag. This a requirement in order for task 8404 to work correctly for Wikis/Files

    //Parameters to be passed in

    //localOptions: array
    //  localOptions is an array of objects which will be used to initialize several
    //  menu items in the scope drop down of the search bar.  Shown are several supported
    //  options, however note that the entire object will be passed in as the parameter
    //  object to dijit.MenuItem so you may use that to your advantage.
    //  Example:
    //  [ {
    //      //A resourced string which will be used as the MenuItem label
    //      label:      myResourcedLabel,
    //
    //      //CSS class to use for the icon
    //      iconClass:  'lconnSprite lconnSprite-iconActivities16',
    //
    //      //When this menu item is selected, a hidden input field named 'scope' is set
    //      //to (in this example) 'keyword'.
    //      scope:      'keyword',
    //
    //      //Specify a post URL to use especially for this menu item.  If none is given,
    //      //it will use localSearchUrl (see below).  (OPTIONAL)
    //      action:     '/profiles/html/keywordSearch.do',
    //
    //      //Optionally specify whether this option should GET or POST
    //      method: "GET"   (or "POST")
    //
    //      //Boolean, specify true for one of your options to make it the default one
    //      //  If no default option is true, "all connections" will be the default.
    //      defaultOption:    true
    //  } ]
    localOptions: [],

    //thirdPartySearchEngines: array
    //thirdPartySearchEngines is an array of objects which will be used to initialize several
    // menu items in the scope drop down of the search bar. Shown are several supported
    // options, however note that the entire object will be passed in as the parameter
    // object to dijit.MenuItem so you may use that to your advantage.
    // Example:
    // [ {
    // //A resourced string which will be used as the MenuItem label
    // label: myResourcedLabel,
    //
    // //CSS class to use for the icon
    // iconClass: 'lconnSprite lconnSprite-iconActivities16',
    //
    // //When this menu item is selected, a hidden input field named 'scope' is set
    // //to (in this example) 'keyword'.
    // scope: 'keyword',
    //
    // //Specify a post URL to use especially for this menu item. If none is given,
    // //it will use localSearchUrl (see below). (OPTIONAL)
    // action: 'www.ibm.com/search',
    //
    // //Boolean, specify true for one of your options to make it the default one
    // // If no default option is true, "all connections" will be the default.
    // defaultOption: true
    // } ]
    thirdPartySearchEngines: [],

    //globalOptions: Object[]
    //  globalOptions is a private internal array.  It contains objects which describe both the
    //  label and feature keyword for each application which is available to search.
    //  There is no need to specify it as constructor argument.
    globalOptions: [],

    // showAllFeatures: boolean
    //  This should be set to true if you want to have the global options array populated
    //  with all features that are installed in Connections.
    showAllFeatures: false,

    //localAction: string
    //  The URL to which this form should post if one of the localOptions are selected
    //  Posts two parameters: query and scope (scope is set by selectedOption.scope)
    localAction: '',

    //searchContextPath: string
    //  The context path of the common search app.  For example, "/search".
    //  You should get this value from lotusConnections-config.xml, by calling
    //  (in java) something like this: ConnConfig.INSTANCE.getServerURL("search", "");
    searchContextPath: '',

    //STRINGS
    _strings: dojo.i18n.getLocalization("lconn.core","SearchBar"),

    //Array containing dijit.MenuItem
    menuItems: [],
    featureIcons: {
        allareas:       'lconnSprite lconnSprite-iconConnections16',
        activities:     'lconnSprite lconnSprite-iconActivities16',
        blogs:          'lconnSprite lconnSprite-iconBlogs16',
        communities:    'lconnSprite lconnSprite-iconCommunities16',
        dogear:         'lconnSprite lconnSprite-iconBookmarks16',
        all_files:      'lconnSprite lconnSprite-iconFiles16',
        ecm_files:      'lconnSprite lconnSprite-iconFiles16',
        files:          'lconnSprite lconnSprite-iconFiles16',
        forums:         'lconnSprite lconnSprite-iconForums16',
        profiles:       'lconnSprite lconnSprite-iconProfiles16',
        wikis:          'lconnSprite lconnSprite-iconWikis16',
        status_updates: 'lconnSprite lconnSprite-iconStatusUpdate16'
    },
    selectedOption: null,   //dijit.MenuItem
    textBox: null,          //lconn.core.TextBox

    //globalAction: string
    //  You don't need to pass this in.  It will be computed from search context path.
    //  The URL to which this form should post if one of the global options are selected
    //  Posts two parameters: query and component (component is set by selectedOption.feature)
    globalAction: '',

    //advancedSearchUrl: string
    //  You don't need to pass this in.  It will be computed from search context path.
    //  The URL of the advanced search page.  The browser will forward here if the advanced
    //  search option of the global menu is selected
    advancedSearchUrl: '',

    SEARCH_DIRECTORY: "directory",
    SEARCH_ADVANCED: 'searchAdvancedIdentifier',
    SEARCH_POST_PATH: '/web/search',    //appended to searchContextPath
    SEARCH_ADVANCED_PATH: '/web/jsp/advancedSearch.jsp',    //appended to searchContextPath

    //Return focus to menu when an option is selected rather than jumping to the textbox
    focusScopeMenuOnSelect: false,

    postCreate: function() {

        this.TAdropdownAnchor = this.formNode;
        this.TAscopeLabelNode = this.currScopeLabelNode;
        var pfService = new lconn.core.peopleFinder.directory.PeopleFinderService();
        pfService.startup();
        var qrService = new lconn.core.quickResults.QuickResultsService();
        qrService.startup();
        this.TAservicesList = [qrService, pfService];

        if ( this.searchContextPath ) {
            this.globalAction = this.searchContextPath + this.SEARCH_POST_PATH;
            this.advancedSearchUrl = this.searchContextPath + this.SEARCH_ADVANCED_PATH;
        }

        this.textBox = new lconn.core.TextBox({
            shadowText: this._strings.LABEL_SEARCH,
            textBoxClass: 'lotusText',
            name: 'query',
            title: this._strings.LABEL_SEARCH,
            value: this.searchFor
        }, this.textNode);

        this.TAtextField = this.textBox.textbox;

        if (!this.globalOptions) {
         this.globalOptions = [];
        }

        // Unless the globalOptions array is empty, only contains a single entry or showAllFeatures is false, populate with all services.
        if (this.globalOptions.length <= 1 && !this.showAllFeatures){
           this.globalOptions = [];
        } else if(this.globalOptions.length < 1 || this.showAllFeatures) {
            var services = lconn.core.config.services;

            if (services.files && services.ecm_files){
                // If files and ecm_files are installed, only show all_files.
                delete this.featureIcons.files;
                delete this.featureIcons.ecm_files;
            }

            this.globalOptions = [];
            for (var featureName in this.featureIcons) {
                if (this.featureIcons.hasOwnProperty(featureName)){
                  var serviceName = featureName;
                  if (featureName === "status_updates") {
                     serviceName = "microblogging";
                  }
                    var featureInstalled = services[serviceName] || (featureName === "all_files" && services.files && services.ecm_files);
                    if (featureInstalled){
                        this.globalOptions.push({label: this._strings["LABEL_"+featureName.toUpperCase()], feature: featureName});
                    }
                }
            }
        }

        //Add All Connections option
        this.globalOptions.splice(0, 0, {
            label:      this._strings.LABEL_ALLCONNECTIONS,
            feature:    'allareas',
            iconClass: 'lconnSprite lconnSprite-iconConnections16',
            'class': 'lotusAlignLeft'
        });

        this.inherited(arguments);

        //Set the default
        this.showDefaultOption();
    },

    changeLocalOptions: function(newLocalOptions) {
        this.localOptions = newLocalOptions;
        if ( this.scopeMenu ) {
            this.scopeMenu.destroyRecursive();
            this.scopeMenu = null;
            this.menuItems = [];
        }
        this.showDefaultOption();
    },

    showDefaultOption: function() {
        for ( var i in this.localOptions ) {
            if ( this.localOptions[i].defaultOption ) {
                this.selectOption(this.localOptions[i], false);
                return;
            }
        }
        //If we made it this far then no local options were the default.
        //  Try and set "all connections" as the default
        if ( this.globalOptions && this.globalOptions.length > 0 ) {
            this.selectOption(this.globalOptions[0], false);
        }
    },

    getScopeMenu: function() {
        if ( !this.scopeMenu ) {
            this.scopeMenu = new dijit.Menu({
                "class": "lotusNavMenu lconnSearchScope",
                onItemClick: dojo.hitch(this, "selectOption")
            });
            this.connect(this.scopeMenu, '_onBlur', 'closeMenu');
            this.menuItems = [];

            var options = this.localOptions;

            for ( var i in options ) {
                options[i].parentMenu = this.scopeMenu;
                this.menuItems.push(new dijit.MenuItem(options[i]));
            }

            if ( options && options.length && this.globalOptions.length > 0 ) {
                this.menuItems.push(new dijit.MenuSeparator({parentMenu: this.scopeMenu}));
            }

            options = this.globalOptions;
            if(options.length > 0){
               for ( var i in options ) {
                   if ( options[i].feature && this.featureIcons[options[i].feature] ) {
                       options[i].parentMenu = this.scopeMenu;
                       options[i].iconClass = this.featureIcons[options[i].feature];
                       this.menuItems.push(new dijit.MenuItem(options[i]));
                   }
               }
            }
            var thirdPartyOptions = this.thirdPartySearchEngines;

            if ( (thirdPartyOptions != null) && (thirdPartyOptions.length > 0) ) {
               this.menuItems.push(new dijit.MenuSeparator({parentMenu: this.scopeMenu}));

               for(var i=0; i<thirdPartyOptions.length; i++){
                  thirdPartyOptions[i].parentMenu = this.scopeMenu;
                     this.menuItems.push(new dijit.MenuItem(thirdPartyOptions[i]));
               }
            }

            if ( this.globalOptions.length > 0 ) {
                this.menuItems.push(new dijit.MenuSeparator({parentMenu: this.scopeMenu}));

                this.menuItems.push(new dijit.MenuItem({
                    label: this._strings.LABEL_ADVANCED,
                    feature: this.SEARCH_ADVANCED,
                    'class': 'lotusAlignLeft'
                }));
            }

            for ( var i= 0; i < this.menuItems.length; i++ ) {
                if(this.menuItems[i].iconNode){
                    this.menuItems[i].iconNode.setAttribute("role","presentation");
                }
                this.scopeMenu.addChild(this.menuItems[i]);
            }
        }

        return this.scopeMenu;
    },

    openMenu: function(evt) {
        var menu = this.getScopeMenu();

        dijit.popup.open({
            popup: menu,
            around: this.scopeNode,
            //Specify how the popup should align with the button that was clicked
            orient: (dojo._isBodyLtr() ? {'BL':'TL', 'BR':'TR', 'TL':'BL', 'TR':'BR'} :
                              {'BR':'TR', 'BL':'TL','TR':'BR', 'TL':'BL'}),
            onCancel: dojo.hitch(this,'_cancelMenu')
        });

        //Must focus here or else clicking off won't blur and won't cause it to close
        menu.focus();

        //Focus on the last selected filter option
        if(this.selectedOption._created){
            menu.focusChild(this.selectedOption);
        }

        dojo.stopEvent(evt);
    },

    openMenuA11y: function(evt){
        if(evt.keyCode == dojo.keys.ENTER || evt.charCode == dojo.keys.SPACE ||
                evt.keyCode==dojo.keys.DOWN_ARROW || evt.keyCode==dojo.keys.UP_ARROW) {
          this.openMenu(evt);
        }
    },

    _cancelMenu: function _cancelMenu(){
        dijit.popup.close(this.getScopeMenu());
        dijit.focus(this.scopeNode);
    },

    closeMenu: function() {
        if ( this.scopeMenu ) {
            dijit.popup.close(this.scopeMenu);
        }
    },

    onSelectOption: function(item, evt) {
        this.selectOption(item, true);
    },

    selectOption: function(item, focusTextbox) {
        //disable the people finder if typeahead is disabled
        this.TAdisable = !(item.allowTypeahead) && (typeof(item.allowTypeahead) == "boolean");

        this.closeMenu();

        this.selectedOption = item;

        if ( item.feature && item.feature == this.SEARCH_ADVANCED ) {
            location.href = this.advancedSearchUrl;
            return;
        }

        this.currScopeLabelNode.innerHTML = item.label;

        this.currScopeIconNode.className = 'lotusIcon';

        if ( item.iconClass ) {
            dojo.addClass(this.currScopeIconNode, item.iconClass);
        }

        if ( item.scope ) {
            this.scopeInputNode.value = item.scope;
            this.featureInputNode.value = item.feature ? item.feature : '';
        } else if ( item.feature ) {
            if ( item.feature == 'allareas' ) {
                this.featureInputNode.value = '';
            } else {
                this.featureInputNode.value = item.feature;
            }
            this.scopeInputNode.value = '';
        }

        if ( item.action ) {
         if (item.scope == "extkeyword"){
               this.formNode.method = "GET";
                this.formNode.action = item.action;
         }
         else {
            this.formNode.method = "POST";
               this.formNode.action = item.action;
         }
        } else if ( item.feature ) {
            this.formNode.method = "GET";
            this.formNode.action = this.globalAction;
        } else {
            this.formNode.method = "POST";
            this.formNode.action = this.localAction;
        }

        //Allow method to be passed by the item and override the default.
        if ( item.method && item.method == "GET" || item.method == "POST" ) {
            this.formNode.method = item.method;
        }

        this.TAupdateCurrentScope();

        if(focusTextbox){
            if(this.focusScopeMenuOnSelect){
                try{
                    this.scopeNode.focus();
                }catch(e){
                    this.textBox.focus();
                }
            }else{
                this.textBox.focus();
            }
        }
    },

    setSelectedFeature: function(/*String*/feature){
      if (!this.scopeMenu){
         // Force the loading of the feature icons
         this.getScopeMenu();
      }
      // Iterate through global options and select the option if found.
      for (var i in this.globalOptions){
         if (this.globalOptions[i].feature === feature){
            this.selectOption(this.globalOptions[i],false);
            return;
         }
      }
      // Otherwise, select the first global option.
      if (this.globalOptions && this.globalOptions[0]){
         this.selectOption(this.globalOptions[0],false);
      }
    },

    isThirdPartySearchEngineSelected: function(){
        var isThirdPartySearchEngine = false;
        var currentSelectedScopeLabel = this.selectedOption.label;

        for (var i=0; i<this.thirdPartySearchEngines.length && !isThirdPartySearchEngine; i++) {
            isThirdPartySearchEngine = (this.thirdPartySearchEngines[i].label == currentSelectedScopeLabel);
        }

        return isThirdPartySearchEngine;
    },

    submitForm: function(evt) {
        this.textBox.setHiddenValue();

        var str = this.textBox.getValue();
        str = dojo.string.trim(str); // trim it
        if (str) {
         if ( this.onSubmit() ) {
                if (this.isThirdPartySearchEngineSelected()) {
                  location.href = this.selectedOption.action+encodeURIComponent(this.textBox.hiddenbox.value);
                } else if(this.selectedOption.feature && this.selectedOption.feature == this.SEARCH_DIRECTORY) {
                  var url = this.selectedOption.action;
                  if (this.selectedOption.valueReplaceParam) {
                      url = url.replace(new RegExp("\{" + this.selectedOption.valueReplaceParam + "\}", "gi"), encodeURIComponent(str));
                  }
                  window.location.href = url;
                } else {
                  var endsWith = function endsWith(str, suffix) {
                      return str.indexOf(suffix, str.length - suffix.length) !== -1;
                  }

                  if (endsWith(this.formNode.action, this.SEARCH_POST_PATH)){
                     // Search API uses scope as the name of the parameter to filter by feature
                     dojo.attr(this.featureInputNode, "name", "scope");
                     if(!this.scopeInputNode.value) {
                         // Disable inputs not used by Search API
                         dojo.attr(this.scopeInputNode, "disabled", true);
                     }
                     if (this.textBox.textbox){
                        dojo.attr(this.textBox.textbox, "disabled", true);
                     }
                  }
                  this.formNode.submit();
                }
            }
        }

        if ( evt ) {
            dojo.stopEvent(evt);
        }
        return false;
    },

    getValue: function() {
        return this.textBox.getValue();
    },

    setValue: function(/*String*/ value) {
      this.textBox.setValue(value);
    },

    clearValue: function() {
        return this.textBox.clearValue();
    },

    /**
     * event for form onsubmit.  We don't want to
     */
    formSubmitted: function(evt) {
        this.submitForm();
        dojo.stopEvent(evt);
    },

    /**
     * Override this function if you want to run some special javascript when the form is submitted.
     * Return false if you don't want to actually perform a full form submit.
     * Return true if you do.
     */
    onSubmit: function() {
        //Override me
    },

    search: function() {
      this.submitForm();
    },

    // override the parent method to manage placeholder
    TAisPlaceholderActive: function() {
      return this.textBox.shadowTextOn;
    }
});
