/* Copyright IBM Corp. 2017  All Rights Reserved.              */

define([
  "dojo/Deferred",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/text!./templates/MenuOptionHomeLink.html",
  "dojo/text!./templates/MenuOptionHomeLinkCloud.html",
  "dojo/i18n",
  "dojo/i18n!../nls/HomeLink",
  "dijit/_Templated",
  "dijit/_Widget",
  "../url",
  "ic-core/config/services",
  "ic-core/config/properties",
  "ic-core/config/features",
  "ic-core/auth"
], function (Deferred, declare, lang, template, cloudTemplate, i18n, i18nHomeLink, _Templated, _Widget, Url, services, properties, has, auth) {
  
  /**
  * Widget representing the default home link in the user account drop down menu pointing to either:
  * the New Home View (Orient Me)
  * OR
  * the Classic Home View (Homepage activity stream)
  * Dropdown available on both Cloud navbar and OnPrem header
  *
  * @class ic-core.widget.HomeLink
  * @extends dijit._Widget
  * @extends dijit._Templated
  * @author Ileana Belfiore <belfilie@ie.ibm.com>
  */
  var HomeLink = declare("lconn.core.widget.HomeLink", [
    _Widget,
    _Templated
  ], /** @lends ic-core.widget.HomeLink.prototype */ {
    
    /**
    * Separate template paths for cloud and onprem
    *
    * @type {String}
    */
    templateString: template,
    cloud_templatePath: cloudTemplate,
  
    _strings: i18nHomeLink,
    /**
    * appName represents the name of the home link application in the drop down menu, either 'homepage' or 'orient'
    *
    * @type {String}
    */
    appName: '',
    /**
    * menuLabel holds the label string of the drop down menu
    *
    * @type {String}
    */
    menuLabel: '',
    /**
    * newHomeUrl holds the URL of the home link in the drop down menu
    *
    * @type {String}
    */
    newHomeUrl: '',
    /**
    * authToken holds the Bearer token, retrieved from pink auth service and necessary before talking userprefs service via graphql api
    *
    * @type {String}
    */
    authToken: null,
    /**
    * isCloud is determined by looking to the DeploymentModel and LotusLive properties in LCC.xml file
    *
    * @type {boolean}
    */
    isCloud: !!(properties['DeploymentModel'] === "SmartCloud" && properties['LotusLive'] === 'true'),
    /**
    * menuOption indicates what application the menu option should point to. It is initialized based on configurations settings (LCC.xml file for onprem and GK for cloud).
    * It is then overwritten based on the contents of the localstorage. If the localstorage is undefined or older than a week, the value is retrieved from the userprefs service.
    *
    * @type {String}
    */
    menuOption: (this.isCloud && has("homepage-switcher-cloud")) || (!this.isCloud && properties['com.ibm.orient.isOrientHomepage'] === 'true') ? "orient" : "homepage",
    
   /**
    * At widget initialization:
    * Select the correct template (cloud | onprem)
    * Initialize the global vars from the localstorage, if set, if not fall back to default configuration values.
    **/
    constructor: function (props) {
      if (has('trident')) {
        // if any version of IE11 (mobile, desktop, tablet) do not display the menu item as not supported by Orient
        return;
      }
      if (props.isSmartCloud) {
        this.templateString = this.cloud_templatePath;
      }

      if (window.localStorage && window.localStorage.getItem('defaultHomeLink')) {
        var defaultHomeLink = JSON.parse(window.localStorage.getItem('defaultHomeLink'));
        this.menuOption = defaultHomeLink.value;
      }
      this.initGlobalVars(this.menuOption);
    },
    
    postMixInProperties: function (props) {
      // fetch the token
      this.authToken = this.getAuthToken();
    },
    
   /**
    * Check localstorage and userprefs - update global values if needed - then update the dropdown menu
    **/
    postCreate: function() {
      this.isOrient().then(lang.hitch(this, function (isOrient) {
        var newMenuOption = isOrient ? "orient" : "homepage";
        if (this.menuOption !== newMenuOption) {
          this.initGlobalVars(newMenuOption);
        }
        this.homeLink.innerHTML = this.menuLabel;
        this.homeLink.href = this.newHomeUrl;
      }));
    },
    
   /**
    * Function to update global vars based on current default home link.
    **/
    initGlobalVars: function (newHome) {
      var strings = this._strings;
      if (newHome === "orient") {
        this.newHomeUrl = Url.getServiceUrl(services["homepage"]);
        this.menuLabel = strings.label_menu_homepage_classic_view;
        this.appName = "homepage";
      } else if (newHome === "homepage") {
        this.newHomeUrl = Url.getServiceUrl(services["orient"]) + "/";
        this.menuLabel = strings.label_menu_homepage_new_view;
        this.appName = "orient";
      }
    },
    
   /**
    * Invoked when the user has selected a new default home link from the drop down menu. Set this as the new default and redirect the user to it.
    **/
    onMenuClicked: function () {
      this.setDefaultHomeLink(this.appName).then(lang.hitch(this, function (homeLink) {
        window.location = this.newHomeUrl;
      }));
    }
  });
  
  /**
  * Utility function to retrieve the IC Bearer token. 
  * The token is read from the session storage, if present, otherwise it is retrieved from the pink auth endpoint.
  **/
  HomeLink.prototype.getAuthToken = HomeLink.getAuthToken = function () {
    var authPromise = new Deferred();

    try {
  	  if (window.sessionStorage.getItem('ic-Bearer') && window.sessionStorage.getItem('ic-user') == auth.getUser().id) {
  		console.debug('Authentication token retrieved from session storage: ' + window.sessionStorage.getItem('ic-Bearer'));
  		authPromise.resolve(window.sessionStorage.getItem('ic-Bearer'));
  	  } else {
  	    var _xhr = dojo.xhrGet({
  	      url: '/social/auth/token',
  	      error: function (error) {
  	        console.debug('Error retrieving the token');
  	        authPromise.reject(error);
  	      }
  	    });
  	    
  	    _xhr.then(function () {
  	      console.debug('Authentication token fetched from auth endpoint: ' + _xhr.ioArgs.xhr.getResponseHeader('authorization'));
  	      if (_xhr.ioArgs.xhr.getResponseHeader('authorization')) {
  	    	window.sessionStorage.setItem('ic-Bearer', _xhr.ioArgs.xhr.getResponseHeader('authorization'));
  	    	window.sessionStorage.setItem('ic-user', auth.getUser().id);
  	        authPromise.resolve(_xhr.ioArgs.xhr.getResponseHeader('authorization'));
  	      }
  	    });
  	  }
    } catch (e) {
  	  console.debug("Error accessing the session storage");
    }
    return authPromise.promise;
  }
  
  /**
  * Utility function to read the home link value from localstorage or userprefs service
  **/
  HomeLink.prototype.getDefaultHomeLink = HomeLink.getDefaultHomeLink = function () {
    var getLinkPromise = new Deferred();
    try {
      var defaultHomeLink = null;
      var homeLinkLastSavedTimestamp = null;
      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      // Read Default Home Link from localstorage.
      if (window.localStorage && window.localStorage.getItem('defaultHomeLink')) {
        defaultHomeLink = JSON.parse(window.localStorage.getItem('defaultHomeLink'));
        homeLinkLastSavedTimestamp = defaultHomeLink.timestamp;
      }
    } catch (e) {
    	this.handleLocalstorageException(e);
      }
      // If the timestamp is older than a week, read from the userprefs instead, update the localstorage and reset the timestamp.
      if (!window.localStorage || !homeLinkLastSavedTimestamp || homeLinkLastSavedTimestamp < oneWeekAgo.getTime()) {
        console.debug("Nothing in localstorage (or too old). Checking userprefs..");
        // read from user prefs
        var readPostData = {
          query: "query {" +
          "userprefs {" +
          "applications {" +
          "orient_me {" +
          "defaultHomeLink" +
          "}" +
          "}" +
          "}" +
          "}",
          variables: {}
        };
        
        this.authToken.then(function (token) {
          var _xhr = dojo.xhrPost({
            url: '/social/api/mwgraphql',
            postData: JSON.stringify(readPostData),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "authorization": token
            },
            handleAs: "json",
            load: function (response) {
              console.debug("Received response from userprefs");
              if (response.userprefs && response.userprefs.applications && response.userprefs.applications.orient_me && response.userprefs.applications.orient_me.defaultHomeLink) {
                console.debug("Received valid default home link from userprefs");
                // update the localstorage
                defaultHomeLink = {
                  value: response.userprefs.applications.orient_me.defaultHomeLink,
                  timestamp: new Date().getTime()
                };
                window.localStorage.setItem('defaultHomeLink', JSON.stringify(defaultHomeLink));
                getLinkPromise.resolve(response.userprefs.applications.orient_me.defaultHomeLink);
              } else {
                getLinkPromise.reject(new Error("user prefs doesn't have a default HomeLink defined. Rejecting promise. Fallback to default values."));
              }
            },
            error: function (error) {
              getLinkPromise.reject(error);
              console.debug('Error reading default home link from user prefs service');
            }
          });
          
          // if it looks like graphql is timing out, wait 5 seconds then reject promise. Defaults are already set anyway
          setTimeout(function() {
            if(!_xhr.isFulfilled()){
              getLinkPromise.reject(new Error("user prefs TIMED OUT. Reject promise. Fallback to default values."));
            }
          }, 5000);
        });
      }
    return getLinkPromise.promise;
  }
  
  /**
  * Utility function to write home link value to localstorage and userprefs service
  **/
  HomeLink.prototype.setDefaultHomeLink = HomeLink.setDefaultHomeLink = function (value) {
    console.debug('New default homelink to save: ' + value);
    var setLinkPromise = new Deferred();
    
    // Write default home link to localstorage, set the timestamp for expiry
    try {
      if (!window.localStorage) {
        return;
      }
      var defaultHomeLink = {
        value: value,
        timestamp: new Date().getTime()
      };
      window.localStorage.setItem('defaultHomeLink', JSON.stringify(defaultHomeLink));
      console.debug('LocalStorage write successful');
    } catch (e) {
    	this.handleLocalstorageException(e);
    }
    
    // Write default home link to user prefs service
    var writePostData = {
      operationName: "userprefsMutation",
      query: "mutation userprefsMutation($applications: InputApplicationList!){" +
      "userprefsModify(applications: $applications) {" +
      "applications {" +
      "orient_me {" +
      "defaultHomeLink" +
      "}" +
      "}" +
      "}" +
      "}",
      variables: {
        applications: {
          orient_me: {
            defaultHomeLink: value
          }
        }
      }
    };
    
    this.authToken.then(function (token) {
      var _xhr = dojo.xhrPost({
        url: '/social/api/mwgraphql',
        postData: JSON.stringify(writePostData),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "authorization": token
        },
        handleAs: "json",
        load: function (response) {
          console.debug('received valid response from graphql');
          if (response.data && response.data.userprefsModify[0] && response.data.userprefsModify[0].applications && response.data.userprefsModify[0].applications.orient_me && response.data.userprefsModify[0].applications.orient_me.defaultHomeLink) {
            console.debug('received default home link from graphql');
            setLinkPromise.resolve(response.data.userprefsModify[0].applications.orient_me.defaultHomeLink);
          } else {
            setLinkPromise.reject(new Error());
          }
        },
        error: function (error) {
          setLinkPromise.reject(error);
          console.debug('Error writing default home link from user prefs service');
        }
      });
      
      // if it looks like graphql is timing out, wait 5 seconds then resolve to value just saved to localstorage
      setTimeout(function() {
        if(!_xhr.isFulfilled()){
          console.debug("user prefs TIMED OUT. Fallback to default values.");
          setLinkPromise.resolve(value);
        }
      }, 5000);
    });
    return setLinkPromise.promise;
  }
  
  /**
  * Utility function to determine whether the default home link should be orient (based on saved user prefs and config settings i.e. admin override in LCC).
  **/
  HomeLink.prototype.isOrient = HomeLink.isOrient = function () {
    var isOrientPromise = new Deferred();
    
    return this.getDefaultHomeLink().then(function (defaultHomeLink) {
      console.debug("Fetched default home link: " + defaultHomeLink);
      
      if (!this.isCloud) { // ONPREM - read the LCC
        var isOrientHomepage = properties['com.ibm.orient.isOrientHomepage'];
        var isHomepageSwitcherEnabled = properties['com.ibm.orient.isHomepageSwitcherEnabled'];
        if (isHomepageSwitcherEnabled === 'false') { // admin override, ignore localstorage & userprefs
          isOrientPromise.resolve(isOrientHomepage === 'true');
        } else {
          isOrientPromise.resolve(defaultHomeLink === "orient" || (isOrientHomepage === 'true' && defaultHomeLink !== "homepage"));
        }
      } else if (this.isCloud && has("homepage-switcher-cloud")) { // CLOUD - read the GK flag
        isOrientPromise.resolve(defaultHomeLink === "orient");
      }
      return isOrientPromise.promise;
    }, function (error) {
      isOrientPromise.reject(error);
      console.debug('Something went wrong in the promise isOrient() ' + error);
      return isOrientPromise.promise;
    });
  }
  
  /**
  *  Utility function to handle localstorage exceptions
  * */
  HomeLink.prototype.handleLocalstorageException = HomeLink.handleLocalstorageException = function (e) {
      switch (e.code) {
      case 22: // Webkit == 22
      case 1014: // Firefox = 1014
      console.debug('LocalStorage full', e);
      break;
      case 18:
      console.debug('LocalStorage not allowed', e);
      break;
      default:
      console.debug('LocalStorage error', e);
    }
  }
  
  auth.addLogoutHandler(function () {
    try {
      window.sessionStorage.removeItem('ic-Bearer');
      window.sessionStorage.removeItem('ic-user');
    } catch (e) {
      console.log(e);
    }
  });
  
  return HomeLink;
});
